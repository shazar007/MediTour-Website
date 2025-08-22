import React, { useEffect, useState } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { TbRefresh } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import NewPagination from "shared/components/NewPagination/NewPagination";
import SearchFilter from "../Components/SearchFilter";
import { AdminTable, RingLoader } from "shared/components";
import Styles from "./adminRequest.module.css";
import { getMedicineRequests } from "shared/services";
import dayjs from "dayjs";

const titles = [
  { id: 1, title: "SUBMITTED AT" },
  { id: 2, title: "REQUEST ID" },
  { id: 3, title: "MR NO." },
  { id: 4, title: "PATIENT NAME" },
  { id: 5, title: "PHARMACY BIDS" },
];

const PharmacyRequest = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [requestsForTable, setRequestsForTable] = useState<any>([]);
  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = length;

  const handleGoToDetail = (index: number) => {
    navigate("/AdminPanel/PharmacyReqDetail", { state: requests[index] });
  };

  const handleTableData = (data: any) => {
    let tempData: any = [];

    if (data?.length > 0) {
      data.map((v: any, ind: any) => {
        let date = dayjs(v?.createdAt).format("MM-DD-YYYY h:mm a");

        tempData.push([
          date,
          v?.requestId,
          v?.patientId?.mrNo,
          v?.patientId?.name,
          v?.bidCount,
        ]);
      });

      setRequestsForTable(tempData);
    }
  };

  const handleFetchRequests = (pageno: number) => {
    setLoading(true);
    getMedicineRequests(pageno)
      .then((res: any) => {
        setRequests(res?.data?.medicineRequests);
        handleTableData(res?.data?.medicineRequests);
        setLength(res?.data?.requestsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleFetchRequests(1);
  }, []);

  const handleRefresh = () => {
    setCurrentPage(1);
    handleFetchRequests(1);
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      handleFetchRequests(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      handleFetchRequests(currentPage - 1);
    }
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Medicine Requests" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(Styles.flxBetween)}>
          <div className={classNames(commonStyles.flx, commonStyles.colsm12)}>
            <p
              className={classNames(
                commonStyles.fs22,
                Styles.primarycolor,
                commonStyles.semiBold
              )}
            >
              All Medicine Requests
            </p>
            {loading ? (
              <div className={Styles.loader}>
                <RingLoader color={"#0D47A1"} size={30} />
              </div>
            ) : (
              <TbRefresh className={Styles.refresh} onClick={handleRefresh} />
            )}
            <SearchFilter
              search=""
              setSearch={() => {}}
              handleSearch={() => {}}
            />
          </div>
          <div className={classNames(commonStyles.flx)}>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, length)}
              totalItems={totalItems}
            />
          </div>
        </div>
        <div>
          <AdminTable
            titles={titles}
            data={requestsForTable}
            handleGoToDetail={handleGoToDetail}
            headerWidth={"16.66%"}
            itemWidth={"13.66%"}
          />
        </div>
      </div>
    </div>
  );
};

export default PharmacyRequest;

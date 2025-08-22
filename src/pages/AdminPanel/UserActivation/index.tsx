import React, { useEffect, useState } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import styles from "./userStyles.module.css";
import classNames from "classnames";
import commonStyles from "shared/utils/common.module.css";
import { AdminTable, PrimaryButton, RingLoader } from "shared/components";
import { accepetRequestDetails, getActivationVendor } from "shared/services";
import CustomLoader from "shared/components/New_Loader/Loader";
import NewPagination from "shared/components/NewPagination/NewPagination";
import dayjs from "dayjs";
const titles = [
  { id: 1, title: "Name" },
  { id: 2, title: "Email" },
  { id: 3, title: "Phone Number" },
  { id: 4, title: "Date" },
  { id: 5, title: "Activate User" },
];
const UserActivation = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [appointmentForTable, setAppointmentForTable] = useState([]);
  useEffect(() => {
    fetchRequest(1);
  }, []);

  const fetchRequest = (pageno: number) => {
    setLoading(true);
    getActivationVendor(pageno)
      .then((res: any) => {
        handleTableData(res?.data?.requests);
        setData(res?.data?.requests);
        setTotalItems(res?.data?.requestCount);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < totalItems) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchRequest(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchRequest(prevPage);
    }
  };

  const ClickStatus = (vendorId: any, type: any) => {
    setLoading(true);
    const params = {
      vendorId,
      vendorType: type,
    };

    accepetRequestDetails(params)
      .then(() => {
        fetchRequest(currentPage);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleTableData = (data: any) => {
    let tempData: any = [];

    if (data?.length > 0) {
      data.map((v: any, ind: any) => {
        let date = dayjs(v?.createdAt).format("MM-DD-YYYY h:mm a");

        const activationButton =
          v?.vendorId?.paidActivation === true ? (
            <p
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "10px  0",
              }}
            >
              Activated
            </p>
          ) : (
            <PrimaryButton
              children={"Activate"}
              onClick={(e: any) => {
                e.stopPropagation();
                ClickStatus(v?.vendorId?._id, v?.modelType);
              }}
            />
          );

        tempData.push([
          v?.vendorId?.name,
          v?.vendorId?.email,
          v?.vendorId?.phoneNumber,
          date,
          activationButton,
        ]);
      });

      setAppointmentForTable(tempData);
    } else {
      setAppointmentForTable([]);
    }
  };
  const handleGoToDetail = () => {};
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={styles.Navouter}>
        <AdminNavBar labelText={"User Activation"} />
      </div>
      <div className={classNames(styles.mainOuter)}>
        <div
          className={classNames(commonStyles.flxEnd)}
          style={{
            padding: "10px 0",
            zIndex: "1000",
          }}
        >
          <NewPagination
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
            startItem={(currentPage - 1) * itemsPerPage + 1}
            endItem={Math.min(currentPage * itemsPerPage, totalItems)}
            totalItems={totalItems}
          />
        </div>
        <AdminTable
          titles={titles}
          data={appointmentForTable}
          handleGoToDetail={handleGoToDetail}
          headerWidth={"16.66%"}
          itemWidth={"13.66%"}
        />
      </div>
      {loading && <CustomLoader />}
    </div>
  );
};

export default UserActivation;

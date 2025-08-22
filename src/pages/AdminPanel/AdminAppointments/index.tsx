import { useEffect, useState } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./adminAppoint.module.css";
import { TbRefresh } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import NewPagination from "shared/components/NewPagination/NewPagination";
import SearchFilter from "../Components/SearchFilter";
import { getAllAppointments } from "shared/services";
import { AdminTable, RingLoader } from "shared/components";
import dayjs from "dayjs";

const titles = [
  { id: 1, title: "DATE" },
  { id: 2, title: "MR NO." },
  { id: 3, title: "PATIENT NAME" },
  { id: 4, title: "APPOINTMENT TYPE" },
  { id: 5, title: "Dr ID" },
  { id: 6, title: "Dr NAME" },
  { id: 7, title: "STATUS" },
];

export default function AdminAppointment() {
  const [appointmentForTable, setAppointmentForTable] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [Appointment, setappointment] = useState([]);
  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const itemsPerPage = 10;
  const totalItems = length;
  const [search, setSearch] = useState("");

  const handleGoToDetail = (itemIndex: number) => {
    const originalData = Appointment[itemIndex];
    navigate("/admin/appointments/Detail", { state: originalData });
  };
  useEffect(() => {
    handleFetchAppointments(1, "");
  }, []);

  const handleRefresh = () => {
    setSearch("");
    setPageno(1);
    setCurrentPage(1);
    handleFetchAppointments(1, "");
  };

  const handleSearch = () => {
    setCurrentPage(1);
    handleFetchAppointments(1, search);
  };

  const handleTableData = (data: any) => {
    let tempData: any = [];

    if (data?.length > 0) {
      data.map((v: any, ind: any) => {
        let date = dayjs(v?.createdAt).format("MM-DD-YYYY h:mm a");

        tempData.push([
          date,
          v?.patientId?.mrNo,
          v?.patientId?.name,
          v?.appointmentType,
          v?.doctorId?.vendorId,
          v?.doctorId?.name,
          v?.status,
        ]);
      });

      setAppointmentForTable(tempData);
    } else {
      setAppointmentForTable([]);
    }
  };

  const handleFetchAppointments = (pageno: number, searchText: string) => {
    setLoading(true);
    getAllAppointments(pageno, searchText)
      .then((res: any) => {
        setappointment(res?.data.Appointments);
        handleTableData(res?.data?.Appointments);
        setLength(res?.data?.appointmentsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      handleFetchAppointments(currentPage + 1, search);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      handleFetchAppointments(currentPage - 1, search);
    }
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Appointments" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(Styles.flxBetween)}>
          <div className={classNames(commonStyles.flx)}>
            <p
              className={classNames(
                commonStyles.fs22,
                Styles.primarycolor,
                commonStyles.semiBold
              )}
            >
              All Patient Appointments
            </p>
            {loading ? (
              <div className={Styles.loader}>
                <RingLoader color={"#0D47A1"} size={30} />
              </div>
            ) : (
              <TbRefresh className={Styles.refresh} onClick={handleRefresh} />
            )}
            <SearchFilter
              vender={false}
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
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
            data={appointmentForTable}
            handleGoToDetail={handleGoToDetail}
            headerWidth={"16.66%"}
            itemWidth={"13.66%"}
          />
        </div>
      </div>
    </div>
  );
}

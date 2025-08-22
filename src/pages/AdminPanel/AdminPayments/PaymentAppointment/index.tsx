import React, { useEffect, useState } from "react";
import AdminNavBar from "../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./paymentAppointment.module.css";
import { useNavigate } from "react-router-dom";
import PaymentAptHospital from "./PaymentAptHospital";
import PaymentAptDoctor from "./PaymentAptDoctor";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import { PrimaryButton, RingLoader } from "shared/components";
import { getAllPaymentAppointment } from "shared/services";

export default function PaymentAppointment() {
  const [selectedOption, setSelectedOption] = useState("doctor");
  const [length, setLength] = useState(0);
  const [pageno, setPageno] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = length;
  const navigate = useNavigate();
  const handleGoToDetail = () => {
    navigate("/admin/Payments/ProceedPayment", {
      state: { VenderName: selectedOption, UserName: "PATIENT NAME" },
    });
  };

  const [loading, setLoading] = useState(false);
  const [PaymenAppointmentst, setPaymentAppointments] = useState([]);
  const handleFetchOrder = (option: any, pageno: number) => {
    setLoading(true);
    getAllPaymentAppointment(option, false, pageno)
      .then((res: any) => {
        setPaymentAppointments(res?.data.Appointments);
        setLength(res?.data?.appointmentsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    handleFetchOrder(selectedOption, 1);
  }, [selectedOption]);

  const handleRefresh = () => {
    handleFetchOrder(selectedOption, 1);
    setCurrentPage(1);
    setPageno(1);
    setLoading(true);
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;
    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      setLoading(true);
      handleFetchOrder(selectedOption, currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      setLoading(true);
      handleFetchOrder(selectedOption, currentPage - 1);
    }
  };
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Payments Appointment" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(commonStyles.flxBetween)}>
          <div className={classNames(commonStyles.flx)}>
            <select
              className={Styles.customSelect}
              name="PaymentType"
              id="PaymentType"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option className={Styles.customOption} value="doctor">
                Doctors
              </option>
              <option className={Styles.customOption} value="hospital">
                Hospitals
              </option>
            </select>

            {loading ? (
              <div className={Styles.loader}>
                <RingLoader color={"#0D47A1"} size={30} />
              </div>
            ) : (
              <TbRefresh className={Styles.refresh} onClick={handleRefresh} />
            )}
            <SearchFilter vender={true} checkbox={true} />
            <div style={{ marginLeft: "32px", width: "160px" }}>
              <PrimaryButton
                children={"Proceed"}
                colorType={"blue"}
                onClick={handleGoToDetail}
              />
            </div>
          </div>
          <p>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, length)}
              totalItems={totalItems}
            />
          </p>
        </div>

        {selectedOption === "doctor" ? (
          <PaymentAptDoctor Data={PaymenAppointmentst} />
        ) : (
          <PaymentAptHospital Data={PaymenAppointmentst} />
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import styles from "./adminPayment.module.css";
import { useNavigate } from "react-router-dom";
import CustomLoader from "shared/components/New_Loader/Loader";
export default function AdminPayments() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Pending");
  const handleGoToModule1 = () => {
    navigate("/admin/Payments/PaymentBooking");
  };
  const handleGoToModule2 = () => {
    navigate("/admin/Payments/PaymentOrder");
  };
  const handleGoToModule3 = () => {
    navigate("/admin/Payments/PaymentAppointment");
  };
  const handleGoToModule4 = () => {
    navigate("/admin/Payments/PaymentDonation");
  };
  const handleGoDonationComplete = () => {
    navigate("/admin/Payments/PaymentDonationComplete");
  };
  const handleGoAppointmentComplete = () => {
    navigate("/admin/Payments/PaymentAppointmentComplete");
  };
  const handleGoOrderComplete = () => {
    navigate("/admin/Payments/PaymentOrderComplete");
  };
  const handleGoBookingComplete = () => {
    navigate("/admin/Payments/PaymentBookingPending");
  };

  const handleOptionChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLoading(true);
    setSelectedOption(e.target.value);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };
  const getLabelText = () => {
    return selectedOption === "Pending"
      ? "Payment Pending"
      : "Payment Complete";
  };
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={styles.Navouter}>
        <AdminNavBar labelText={"Payments"} />
      </div>
      <div className={classNames(styles.mainOuter)}>
        <div>
          <select
            className={styles.customSelect}
            name="PaymentType"
            id="PaymentType"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option className={styles.customOption} value="Complete">
              Payments Complete
            </option>
            <option className={styles.customOption} value="Pending">
              Payments Pending
            </option>
          </select>
        </div>

        {selectedOption === "Complete" ? (
          <div className={classNames(styles.flxBetween)}>
            <div className={styles.PaymentCard}>
              <p
                className={classNames(
                  commonStyles.fs22,
                  commonStyles.semiBold,
                  styles.primarycolor
                )}
              >
                Booking
              </p>
              <ul className={styles.cardlist}>
                <li>Travel Agency</li>
                <li>Hotel</li>
                <li>Rent a Car</li>
                <li>Insurance</li>
              </ul>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <button
                  className={classNames(styles.Paybutton, styles.mtauto)}
                  onClick={handleGoBookingComplete}
                >
                  Details
                </button>
              </div>
            </div>
            <div className={styles.PaymentCard}>
              <p
                className={classNames(commonStyles.fs22, commonStyles.semiBold)}
              >
                Orders
              </p>
              <ul className={styles.cardlist}>
                <li>Laboratory</li>
                <li>Pharmacy</li>
              </ul>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <button
                  className={classNames(styles.Paybutton, styles.mtauto)}
                  onClick={handleGoOrderComplete}
                >
                  Details
                </button>
              </div>
            </div>
            <div className={styles.PaymentCard}>
              <p
                className={classNames(
                  commonStyles.fs22,
                  commonStyles.semiBold,
                  styles.primarycolor
                )}
              >
                Appointments
              </p>
              <ul className={styles.cardlist}>
                <li>Doctors</li>
                <li>Hospitals</li>
              </ul>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <button
                  className={classNames(styles.Paybutton, styles.mtauto)}
                  onClick={handleGoAppointmentComplete}
                >
                  Details
                </button>
              </div>
            </div>
            <div className={styles.PaymentCard}>
              <p
                className={classNames(
                  commonStyles.fs22,
                  commonStyles.semiBold,
                  styles.primarycolor
                )}
              >
                Donation
              </p>

              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <button
                  className={classNames(styles.Paybutton, styles.mtauto)}
                  onClick={handleGoDonationComplete}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={classNames(styles.flxBetween)}>
            <div className={styles.PaymentCard}>
              <p
                className={classNames(
                  commonStyles.fs22,
                  commonStyles.semiBold,
                  styles.primarycolor
                )}
              >
                Booking
              </p>
              <ul className={styles.cardlist}>
                <li>Travel Agency</li>
                <li>Hotel</li>
                <li>Rent a Car</li>
                <li>Insurance</li>
              </ul>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <button
                  className={classNames(styles.Paybutton, styles.mtauto)}
                  onClick={handleGoToModule1}
                >
                  Details
                </button>
              </div>
            </div>
            <div className={styles.PaymentCard}>
              <p
                className={classNames(
                  commonStyles.fs22,
                  commonStyles.semiBold,
                  styles.primarycolor
                )}
              >
                Orders
              </p>
              <ul className={styles.cardlist}>
                <li>Laboratory</li>
                <li>Pharmacy</li>
              </ul>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <button
                  className={classNames(styles.Paybutton, styles.mtauto)}
                  onClick={handleGoToModule2}
                >
                  Details
                </button>
              </div>
            </div>
            <div className={styles.PaymentCard}>
              <p
                className={classNames(
                  commonStyles.fs22,
                  commonStyles.semiBold,
                  styles.primarycolor
                )}
              >
                Appointments
              </p>
              <ul className={styles.cardlist}>
                <li>Doctors</li>
                <li>Hospitals</li>
              </ul>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <button
                  className={classNames(styles.Paybutton, styles.mtauto)}
                  onClick={handleGoToModule3}
                >
                  Details
                </button>
              </div>
            </div>
            <div className={styles.PaymentCard}>
              <p
                className={classNames(
                  commonStyles.fs22,
                  commonStyles.semiBold,
                  styles.primarycolor
                )}
              >
                Donation
              </p>

              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <button
                  className={classNames(styles.Paybutton, styles.mtauto)}
                  onClick={handleGoToModule4}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        )}
        {loading && <CustomLoader />}
      </div>
    </div>
  );
}

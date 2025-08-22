import React, { useEffect, useState } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./PaymentBookingComplete.module.css";
import { useNavigate } from "react-router-dom";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import { PrimaryButton, RingLoader } from "shared/components";
import AdminNavBar from "pages/AdminPanel/Components/AdminNavBar";
import PaymentBookingCompleteHotel from "./PaymentBookingCompleteHotel";
import PaymentBookingRentCarComplete from "./PaymentBookingRentCarComplete";
import PaymentBookingCompleteAmbulance from "./PaymentBookingCompleteAmbulance";
import { getPaymentComplete } from "shared/services";
import PaymentBookingCompleteTravel from "./PaymentBookingCompleteTravel";
import PaymentBookingCompleteInsurance from "./PaymentBookingCompleteInsurance";

export default function PaymentBookingComplete() {
  const [selectedOption, setSelectedOption] = useState("Travel Agency");
  const [loading, setLoading] = useState(false);
  const [PaymenComplete, setPaymentComplete] = useState([]);
  const [type, setType] = useState<any>("");
  const handleFetchPaymentBooking = (option: any) => {
    setLoading(true);

    getPaymentComplete(option, type, "", 1)
      .then((res: any) => {
        setPaymentComplete(res?.data.payments);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    handleFetchPaymentBooking(selectedOption);
  }, [selectedOption, type]);
  const handleRefresh = () => {
    handleFetchPaymentBooking(selectedOption);
  };
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Payments Booking Complete" />
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
              <option className={Styles.customOption} value="Travel Agency">
                Travel Agency
              </option>
              <option className={Styles.customOption} value="Hotel">
                Hotel
              </option>
              <option className={Styles.customOption} value="Rent A Car">
                Rent a Car
              </option>
              <option className={Styles.customOption} value="Insurance">
                Insurance
              </option>
              <option className={Styles.customOption} value="Ambulance Company">
                Ambulance
              </option>
            </select>

            {loading ? (
              <div className={Styles.loader}>
                <RingLoader color={"#0D47A1"} size={30} />
              </div>
            ) : (
              <TbRefresh className={Styles.refresh} onClick={handleRefresh} />
            )}
            <SearchFilter vender={true} />
          </div>

          <NewPagination />
        </div>{" "}
        {selectedOption === "Travel Agency" ? (
          <PaymentBookingCompleteTravel
            Data={PaymenComplete}
            setType={setType}
          />
        ) : selectedOption === "Insurance" ? (
          <PaymentBookingCompleteInsurance Data={PaymenComplete} />
        ) : selectedOption === "Rent A Car" ? (
          <PaymentBookingRentCarComplete Data={PaymenComplete} />
        ) : selectedOption === "Hotel" ? (
          <PaymentBookingCompleteHotel Data={PaymenComplete} />
        ) : selectedOption === "Ambulance Company" ? (
          <PaymentBookingCompleteAmbulance Data={PaymenComplete} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

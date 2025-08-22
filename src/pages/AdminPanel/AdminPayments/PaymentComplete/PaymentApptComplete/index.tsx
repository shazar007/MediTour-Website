import React, { useEffect, useState } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./PaymentAptComplete.module.css";
import { useNavigate } from "react-router-dom";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import { PrimaryButton, RingLoader } from "shared/components";
import AdminNavBar from "pages/AdminPanel/Components/AdminNavBar";
import PaymentAptCompleteHospital from "./PaymentAptCompleteHospital";
import PaymentAptCompleteDoctor from "./PaymentAptCompleteDoctor";
import { getPaymentComplete } from "shared/services";

export default function PaymentAptComplete() {
  const [selectedOption, setSelectedOption] = useState("Doctor");
  const [loading, setLoading] = useState(false);
  const [PaymenCompleteAppt, setPaymentCompleteAppt] = useState([]);
  const handleFetchOrder = (option: any) => {
    setLoading(true);
    getPaymentComplete(option)
      .then((res: any) => {
        setPaymentCompleteAppt(res?.data.payments);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    handleFetchOrder(selectedOption);
  }, [selectedOption]);

  const handleRefresh = () => {
    handleFetchOrder(selectedOption);
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Payments Appointment Complete" />
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
              <option className={Styles.customOption} value="Doctor">
                Doctor
              </option>
              <option className={Styles.customOption} value="Hospital">
                Hospital
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
          <p>
            <NewPagination />
          </p>
        </div>

        {selectedOption === "Doctor" ? (
          <PaymentAptCompleteDoctor Data={PaymenCompleteAppt} />
        ) : (
          <PaymentAptCompleteHospital Data={PaymenCompleteAppt} />
        )}
      </div>
    </div>
  );
}

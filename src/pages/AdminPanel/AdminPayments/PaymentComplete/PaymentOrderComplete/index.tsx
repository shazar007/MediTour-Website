import React, { useEffect, useState } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./PaymentOrderComplete.module.css";
import { useNavigate } from "react-router-dom";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import { PrimaryButton, RingLoader } from "shared/components";
import AdminNavBar from "pages/AdminPanel/Components/AdminNavBar";
import PaymentOrderCompleteLab from "./PaymentOrderCompleteLab";
import PaymentOrderCompletePhr from "./PaymentOrderCompletePhr";
import { getPaymentComplete } from "shared/services";

export default function PaymentOrderComplete() {
  const [selectedOption, setSelectedOption] = useState("Laboratory");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleGoToDetail = () => {
    navigate("/admin/Payments/ProceedPayment", {
      state: { VenderName: "VENDOR ", UserName: "USER NAME" },
    });
  };
  const [PaymenComplete, setPaymentComplete] = useState([]);
  const handleFetchOrder = (option: any) => {
    setLoading(true);
    getPaymentComplete(option)
      .then((res: any) => {
        setPaymentComplete(res?.data.payments);
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
        <AdminNavBar labelText="Payments Orders Complete" />
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
              <option className={Styles.customOption} value="Laboratory">
                Laboratory
              </option>
              <option className={Styles.customOption} value="Pharmacy">
                Pharmacy
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
        </div>

        {selectedOption === "Laboratory" ? (
          <PaymentOrderCompleteLab Data={PaymenComplete} />
        ) : (
          <PaymentOrderCompletePhr Data={PaymenComplete} />
        )}
      </div>
    </div>
  );
}

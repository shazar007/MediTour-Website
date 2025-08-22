import classNames from "classnames";
import Styles from "./PaymentDonationComplete.module.css";
import { useNavigate } from "react-router-dom";
import commonStyles from "shared/utils/common.module.css";
import { Checkbox } from "@mui/material";
import AdminNavBar from "pages/AdminPanel/Components/AdminNavBar";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { TbRefresh } from "react-icons/tb";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import { PrimaryButton, RingLoader } from "shared/components";
import { getPaymentComplete } from "shared/services";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function PaymentDonationComplete() {
  const [loading, setLoading] = useState(false);
  const [PaymenCompleteDonation, setPaymentCompleteDonation] = useState([]);
  const handleFetchOrder = () => {
    setLoading(true);
    const option = "Donation Company";
    getPaymentComplete(option)
      .then((res: any) => {
        setPaymentCompleteDonation(res?.data.payments);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    handleFetchOrder();
  }, []);

  const handleRefresh = () => {
    handleFetchOrder();
  };
  const navigate = useNavigate();

  const handleGoToDetailTABLE = (val: any, index: any) => {
    // const result = PaymenCompleteDonation.map((v: any, i: any) => {
    //   if (i == index) {
    //     return v;
    //   }
    // });
    navigate("/admin/Payments/PaymentComplete/Detail", {
      state: {
        heading: "Payment Donation",
        type: "Order",
        Data: val,
      },
    });
  };
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Payment Donation Complete" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(commonStyles.flxBetween)}>
          <div className={classNames(commonStyles.flx)}>
            <p
              className={classNames(
                commonStyles.fs22,
                Styles.primarycolor,
                commonStyles.semiBold
              )}
            >
              Donations
            </p>

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
        <div className={Styles.payment}>
          <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
            <p className={Styles.headerclass}>SUBMITTED AT</p>
            <p className={Styles.headerclass}>PAYMENT ID</p>
            <p className={Styles.headerclass}>VENDOR ID</p>
            <p className={Styles.headerclass}>VENDOR NAME</p>
            <p className={Styles.headerclass}>TOTAL DONORS</p>{" "}
            <p className={Styles.headerclass}>PAID AMOUNT </p>
          </div>
          <div className={Styles.tableData}>
            <table
              style={{
                margin: "0px",
                borderCollapse: "separate",
                borderSpacing: "0 4px",
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              <tbody className={Styles.wapper}>
                {PaymenCompleteDonation.map((val: any, key: any) => {
                  const Date = dayjs(val?.createdAt).format(
                    "MM-DD-YYYY,  h:mm a"
                  );
                  return (
                    <tr
                      className={Styles.tableRow}
                      key={key}
                      onClick={() => handleGoToDetailTABLE(val, key)}
                    >
                      <td className={Styles.w20}>{Date}</td>
                      <td className={Styles.w20}>{val?.paymentId}</td>
                      <td className={Styles.w20}>{val?.venderId?.venderId}</td>
                      <td className={Styles.w20}>
                        {val?.vendorId?.companyName}
                      </td>
                      <td className={Styles.w20}>{val?.noOfitems}</td>{" "}
                      <td className={Styles.w20}>{val?.payableAmount}</td>{" "}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

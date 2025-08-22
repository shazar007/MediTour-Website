import React, { useState } from "react";
import AdminNavBar from "pages/AdminPanel/Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./PaymentComplete.module.css";
import { CustomModal, PrimaryButton } from "shared/components";
import CustomTimePicker from "shared/components/TimePicker/TimePICKER2";
import Pay from "assets/images/PaymentSS.png";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { PiDownloadSimpleBold } from "react-icons/pi";

const PaymentDetailComplete = () => {
  const { state } = useLocation();
  const [showSendModel, setShowSendModel] = useState(false);

  const handleShowModel = () => {
    setShowSendModel(true);
  };
  const handleCloseModel = () => {
    setShowSendModel(false);
  };
  const handleDownload = () => {
    const imageUrl = state?.Data?.receiptImage;
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "receipt_image"; // Optional: specify a default file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const totalAmount = state?.Data?.totalAmount ?? 0;
  const totalTax = state?.Data?.totalTax ?? 0;
  const PaidAmount = totalAmount - totalTax;
  const vendorName =
    state?.Data?.vendorId?.name ||
    state?.Data?.vendorId?.pharmacyFirstName ||
    state?.Data?.vendorId?.companyName;

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText={state.heading} />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={commonStyles.flxBetween}>
          <p
            className={classNames(
              commonStyles.fs22,
              Styles.primarycolor,
              commonStyles.semiBold
            )}
          >
            Payment Details
          </p>
          <p
            className={classNames(
              commonStyles.fs18,
              Styles.colorOrder,
              commonStyles.semiBold
            )}
          >
            Payment Details
          </p>
        </div>
        <div className={classNames(commonStyles.flxBetween, Styles.mt24)}>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                VENDOR DETAILS
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  ID:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.Data?.vendorId?.venderId}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Name:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {vendorName}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Contact:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.Data?.vendorId?.phoneNumber}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Email:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.Data?.vendorId?.email}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Address:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.Data?.vendorId?.location?.address}
                </p>
              </div>
            </div>
          </div>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                TOTAL AMOUNT
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Total No. of {state.type}:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.Data?.noOfitems}
                  Payment Type{" "}
                </p>
              </div>
              {/* <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Durations:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  14 Feb 2024 07:30 - 20 Feb 2024 08:30
                </p>
              </div> */}
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Total Amount:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.Data?.totalAmount}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Total Tax:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.Data?.totalTax}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Paid Amount:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {PaidAmount}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Invoice
                </p>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.View,
                    Styles.colorGray
                  )}
                  onClick={handleShowModel}
                >
                  View
                </p>
              </div>
              <CustomModal showModal={showSendModel}>
                <img
                  src={state?.Data?.receiptImage}
                  className={Styles.Payss}
                  alt="Receipt"
                />
                <button className={Styles.btn} onClick={handleCloseModel}>
                  <p
                    className={classNames(
                      commonStyles.fs16,
                      commonStyles.medium
                    )}
                  >
                    Download
                  </p>
                  <PiDownloadSimpleBold
                    className={Styles.DownLoad}
                    onClick={handleDownload}
                  />
                </button>
              </CustomModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentDetailComplete;

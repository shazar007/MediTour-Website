import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Style from "./payment.module.css";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
const VendorPaymentDetails = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const { state } = useLocation();
  const { systemType } = useSelector((state: any) => state.root.common);
  let date = dayjs(state?.createdAt).format("MM-DD-YYYY h:mm a");
  const handleDownload = () => {
    if (state?.receiptImage) {
      window.open(state.receiptImage, "_blank");
    } else {
      alert("No receipt available.");
    }
  };
  return (
    <div className={isRtl ? commonstyles.pl36 : commonstyles.pr36}>
      <div
        className={classNames({
          [commonstyles.mnn]: systemType !== "hospital",
        })}
      >
        <div className={classNames(commonstyles.flxBetween, commonstyles.mb24)}>
          <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
            {t("paymentDetails")}
          </p>
          <p className={classNames(commonstyles.fs18, Style.colorGreen)}>
            {t("paymentId")}: {state?.paymentId}
          </p>
        </div>

        <div className={Style.outerContainer}>
          <div
            className={classNames(
              commonstyles.flx,
              commonstyles.flxBetween,
              commonstyles.flxWrap
            )}
          >
            <div
              className={classNames(
                commonstyles.col6,
                commonstyles.mt16,
                commonstyles.colsm12
              )}
            >
              <div>
                <div
                  className={classNames(
                    commonstyles.flxBetween,
                    commonstyles.mb24
                  )}
                >
                  <p
                    className={classNames(
                      commonstyles.fs14,
                      commonstyles.medium
                    )}
                  >
                    {t("paymentAt")}
                  </p>
                  <p
                    className={classNames(
                      commonstyles.fs14,
                      commonstyles.semiBold
                    )}
                  >
                    {date}
                  </p>
                </div>
              </div>

              <div
                className={classNames(
                  commonstyles.flxBetween,
                  commonstyles.mb8
                )}
              >
                <p
                  className={classNames(commonstyles.fs14, commonstyles.medium)}
                >
                  {t("totalOrders")}
                </p>
                <p
                  className={classNames(commonstyles.fs14, commonstyles.medium)}
                >
                  {state?.noOfitems}
                </p>
              </div>

              <div
                className={classNames(
                  commonstyles.flxBetween,
                  commonstyles.mb8
                )}
              >
                <p
                  className={classNames(commonstyles.fs14, commonstyles.medium)}
                >
                  {t("totalAmount")}
                </p>
                <p
                  className={classNames(commonstyles.fs14, commonstyles.medium)}
                >
                  {state?.totalAmount}
                </p>
              </div>

              <div
                className={classNames(
                  commonstyles.flxBetween,
                  commonstyles.mb24
                )}
              >
                <p
                  className={classNames(commonstyles.fs14, commonstyles.medium)}
                >
                  {t("tax")}.
                </p>
                <p
                  className={classNames(commonstyles.fs14, commonstyles.medium)}
                >
                  {state?.totalTax}
                </p>
              </div>

              <div className={classNames(commonstyles.flxBetween)}>
                <p className={classNames(commonstyles.fs14, commonstyles.bold)}>
                  {t("paidAmount")}
                </p>
                <p className={classNames(commonstyles.fs14, commonstyles.bold)}>
                  {state?.payableAmount}
                </p>
              </div>
            </div>
            <div
              className={classNames(
                commonstyles.col6,
                commonstyles.mt16,
                commonstyles.colsm12
              )}
              onClick={handleDownload}
            >
              <p
                className={classNames(
                  commonstyles.fs14,
                  commonstyles.medium,
                  commonstyles.clickable,
                  commonstyles.flxEnd
                )}
              >
                {t("downloadReceipt")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPaymentDetails;

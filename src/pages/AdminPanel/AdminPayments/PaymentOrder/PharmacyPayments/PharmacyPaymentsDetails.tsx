import React from "react";
import classNames from "classnames";
import Styles from "./Pharmacy.module.css";
import commonStyles from "shared/utils/common.module.css";
import AdminNavBar from "pages/AdminPanel/Components/AdminNavBar";
import { Style } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
export default function PharmacyPaymentsDetails() {
  const { state } = useLocation();
  let date = dayjs(state?.createdAt).format("MM-DD-YYYY h:mm a");
  return (
    <div className={commonStyles.col12}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Payments Orders" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(commonStyles.flxBetween)}>
          <p
            className={classNames(
              commonStyles.fs22,
              Styles.primarycolor,
              commonStyles.semiBold
            )}
          >
            Proceed Payment
          </p>
          <p className={classNames(commonStyles.fs18, commonStyles.semiBold)}>
            Order ID: {state?.orderId}
          </p>
        </div>
        <div className={classNames(commonStyles.flx, Styles.mt24)}>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                PHARMACY
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
                  Phar ID:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vendorId?.vendorId}
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
                  {state?.vendorId?.name}
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
                  {state?.vendorId?.email}
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
                  {state?.vendorId?.phoneNumber}
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
                  {state?.vendorId?.location?.address}
                </p>
              </div>
            </div>
          </div>{" "}
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                PATIENT
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
                  Submitted at:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {date}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  MR No:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.userId?.mrNo}
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
                  {state?.userId?.name}
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
                  {state?.userId?.phone}
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
                  {state?.userId?.email}
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className={classNames(Styles.flxstart, Styles.mt24)}>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                MEDICINES DETAILS
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(commonStyles.col12, Styles.mt16)}>
                {state?.items?.map((item: any, index: number) => (
                  <>
                    <div
                      className={classNames(
                        commonStyles.flxBetween,
                        Styles.mt16
                      )}
                    >
                      <p
                        className={classNames(
                          commonStyles.fs14,
                          commonStyles.medium
                        )}
                      >
                        {item?.itemId?.generic}- {item?.itemId?.medCode} x{" "}
                        {item?.itemId?.packSize} pack
                      </p>
                      <p
                        className={classNames(
                          commonStyles.fs14,
                          commonStyles.medium
                        )}
                      >
                        Rs. {item?.itemId?.actualPrice}
                      </p>
                    </div>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray,
                        Styles.mt8
                      )}
                    >
                      Brand - {item?.itemId?.medicineBrand}
                    </p>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        Styles.colorGray,
                        Styles.mt4
                      )}
                    >
                      Type - {item?.itemId?.medicineType}
                    </p>
                  </>
                ))}
              </div>
            </div>
          </div>{" "}
          <div style={{ width: "32.2%" }}>
            <div className={classNames(Styles.DetailCard33)}>
              <div className={Styles.headerCard}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
                >
                  ITEMS
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
                    No. of Items:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.items?.noOfItems}
                  </p>
                </div>
              </div>
            </div>{" "}
            <div className={classNames(Styles.DetailCard33, Styles.mt24)}>
              <div className={Styles.headerCard}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
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
                    Actual Amount:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.vendorId?.totalAmount}
                  </p>
                </div>
                {/* <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Meditour Amount:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    Rs. 2600
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

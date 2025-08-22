import React, { useState } from "react";
import AdminNavBar from "../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "../adminorder.module.css";
import { TbRefresh } from "react-icons/tb";
import { RxFileText } from "react-icons/rx";
import Download from "assets/images/admindownload.png";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
export default function AdPharmacyOrderDetail() {
  const { state } = useLocation();
  let date = dayjs(state?.userId?.createdAt).format("MM-DD-YYYY h:mm a");
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Orders" />
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
              Pharmacy Order Details
            </p>
            <TbRefresh className={Styles.refresh} />
          </div>
          <div className={classNames(commonStyles.flx)}>
            <p
              style={{ color: "#00B69B" }}
              className={classNames(commonStyles.f18, commonStyles.semiBold)}
            >
              Order ID: {state?.orderId}
            </p>
          </div>
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
                  Pharmacy ID:
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
              {/* <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Address:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.vendorId?.phoneNumber}
                </p>
              </div> */}
            </div>
          </div>
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
                  MR No. :
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
        </div>

        <div className={classNames(Styles.flx, Styles.mt24)}>
          <div className={classNames(Styles.labDetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                MEDICINES DETAILS
              </p>
            </div>
            <div className={Styles.DetailBody}>
              {" "}
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
          </div>
          <div style={{ width: "32.2%" }}>
            <div className={classNames(Styles.textDetailCard)}>
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
                    {state?.noOfItems}
                  </p>
                </div>
              </div>
            </div>
            <div className={classNames(Styles.textDetailCard)}>
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
                    Amount:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    Rs. {state?.totalAmount} /-
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

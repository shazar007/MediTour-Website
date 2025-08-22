import React from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./adminDonation.module.css";
import Donation1 from "assets/images/DonationCard.jpg";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
export default function DonationDetail() {
  const { state } = useLocation();
  let date = dayjs(state?.createdAt).format("MM-DD-YYYY h:mm a");
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Donations" />
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
              Details
            </p>
            {/* <TbRefresh className={Styles.refresh} /> */}
          </div>
          <div className={classNames(commonStyles.flx)}>
            <p
              style={{ color: "#00B69B" }}
              className={classNames(commonStyles.f18, commonStyles.semiBold)}
            >
              Donation ID: {state?.donationId}
            </p>
          </div>
        </div>

        <div className={classNames(commonStyles.flxBetween, Styles.mt24)}>
          <div className={classNames(Styles.w45)}>
            {" "}
            <div className={classNames(Styles.DetailCard)}>
              <div className={Styles.headerCard}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
                >
                  Donor
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
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {date}
                  </p>
                </div>
                <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    MR No.:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.mrNo}
                  </p>
                </div>
                <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Name:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.donorName}
                  </p>
                </div>
                <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Contact:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.userId?.phone}
                  </p>
                </div>
                <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Email:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.userId?.email}
                  </p>
                </div>
              </div>
            </div>
            <div className={classNames(Styles.DetailCard, Styles.mt24)}>
              <div className={Styles.headerCard}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
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
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.companyId?.vendorId}
                  </p>
                </div>
                <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Name:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.companyId?.name}
                    {}
                  </p>
                </div>
                <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Address:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.companyId?.companyAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={classNames(Styles.w50)}>
            <div className={classNames(Styles.DetailCard)}>
              <div className={Styles.headerCard}>
                <p
                  className={classNames(
                    commonStyles.fs18,
                    commonStyles.semiBold
                  )}
                >
                  PACKAGE DETAILS
                </p>
              </div>
              <div className={Styles.headerBody}>
                <div className={classNames(commonStyles.flxBetween)}>
                  <img
                    src={Donation1}
                    alt="Donation1"
                    className={Styles.donationImg}
                  />
                  <img
                    src={Donation1}
                    alt="Donation1"
                    className={Styles.donationImg}
                  />
                  <img
                    src={Donation1}
                    alt="Donation1"
                    className={Styles.donationImg}
                  />
                </div>
                <p
                  className={classNames(
                    commonStyles.medium,
                    commonStyles.fs14,
                    Styles.mt24
                  )}
                >
                  {state?.packageId?.donationTitle}
                </p>
                <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Target Audie:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.packageId?.targetAudience}
                  </p>
                </div>
                <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
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
                    {state?.packageId?.requiredAmount}
                    {}
                  </p>
                </div>
                <div
                  className={classNames(commonStyles.flxBetween, Styles.mt8)}
                >
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold
                    )}
                  >
                    Days:
                  </p>
                  <p
                    className={classNames(commonStyles.fs14, Styles.colorGray)}
                  >
                    {state?.packageId?.totalDays}
                  </p>
                </div>
                <p
                  className={classNames(
                    commonStyles.semiBold,
                    commonStyles.fs14,
                    Styles.mt24
                  )}
                >
                  Description
                </p>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.mt8,
                    Styles.colorGray
                  )}
                >
                  {state?.packageId?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

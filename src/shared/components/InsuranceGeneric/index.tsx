import React, { useState } from "react";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import style from "./index.module.css";
import { FaDownload } from "react-icons/fa6";
import Download from "assets/images/admindownload.png";
import { useTranslation } from "react-i18next";
const InsuranceGeneric = ({
  data,
  value1,
  labl1,
  value2,
  lable2,
  value3,
  lable3,
  value4,
  lable4,
  value5,
  lable5,
  tab1,
  tab2,
  tab3,
  m1,
  m1Value,
  m2,
  m2Value,
  m3,
  m3Value,
  m4,
  m4Value,
  showtab,
  tab4,
}: {
  data?: any;
  value1?: any;
  labl1?: any;
  value2?: any;
  lable2?: any;
  value3?: any;
  lable3?: any;
  value4?: any;
  lable4?: any;
  value5?: any;
  lable5?: any;
  tab1?: any;
  tab2?: any;
  tab3?: any;
  m1?: any;
  m1Value?: any;
  m2?: any;
  m2Value?: any;
  m3?: any;
  m3Value?: any;
  m4?: any;
  m4Value?: any;
  showtab?: any;
  tab4?: any;
}) => {
  const { t }: any = useTranslation();
  const [activeTab, setActiveTab] = useState(tab1);
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  const handleDownload = (fileUrl: string) => {
    const downloadLink: any = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "downloaded_file.pdf";
    document.body.appendChild(downloadLink);
    window.open(downloadLink);
  };

  const handleClaim = (fileUrl: string) => {
    const downloadLink: any = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "downloaded_file.pdf";
    document.body.appendChild(downloadLink);
    // window.open(downloadLink);
    window.open(fileUrl);
  };

  return (
    <div>
      <div>
        <div
          className={classNames(
            commonstyle.flx,
            commonstyle.flxBetween,
            commonstyle.flxWrap
          )}
        >
          <div className={classNames(style.imgcontainer)}>
            <img
              src={data?.insuranceId?.logo}
              alt="insuranceIdLogo"
              className={style.treeimg}
            />
          </div>

          <div className={classNames(commonstyle.flxCol)}>
            <>
              <p
                className={classNames(
                  commonstyle.colorGray,
                  commonstyle.fs16,
                  commonstyle.semiBold
                )}
              >
                {value1}
              </p>
              <p
                className={classNames(
                  commonstyle.colorBlue,
                  commonstyle.fs16,
                  commonstyle.semiBold
                )}
              >
                {labl1}
              </p>
            </>
            <>
              <p
                className={classNames(
                  commonstyle.colorGray,
                  commonstyle.fs16,
                  commonstyle.semiBold
                )}
                style={{ marginTop: "24px" }}
              >
                {value2}
              </p>
              <p
                className={classNames(
                  commonstyle.colorBlue,
                  commonstyle.fs16,
                  commonstyle.semiBold
                )}
              >
                {lable2}
              </p>
            </>
          </div>
          <div>
            <p
              className={classNames(
                commonstyle.colorGray,
                commonstyle.fs16,
                commonstyle.semiBold
              )}
            >
              {value3}
            </p>
            <p
              className={classNames(
                commonstyle.colorBlue,
                commonstyle.fs16,
                commonstyle.semiBold
              )}
            >
              {lable3}
            </p>
          </div>
          <div>
            <p
              className={classNames(
                commonstyle.colorGray,
                commonstyle.fs16,
                commonstyle.semiBold
              )}
            >
              {value4}
            </p>
            <p
              className={classNames(
                commonstyle.colorBlue,
                commonstyle.fs16,
                commonstyle.semiBold
              )}
            >
              {lable4}
            </p>
          </div>
          <div>
            <p
              className={classNames(
                commonstyle.colorGray,
                commonstyle.fs16,
                commonstyle.semiBold
              )}
            >
              {value5}
            </p>
            <p
              className={classNames(
                commonstyle.colorBlue,
                commonstyle.fs16,
                commonstyle.semiBold
              )}
            >
              {lable5}
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <div className={classNames(style.tabsContainer)}>
        <div className={style.tabHeader}>
          <div
            className={classNames(style.tabButton, {
              [style.activeTab]: activeTab === tab1,
            })}
            onClick={() => handleTabClick(tab1)}
          >
            {tab1}
          </div>
          <div
            className={classNames(style.tabButton, {
              [style.activeTab]: activeTab === tab2,
            })}
            onClick={() => handleTabClick(tab2)}
          >
            {tab2}
          </div>
          {
            <div
              className={classNames(style.tabButton, {
                [style.activeTab]: activeTab === tab3,
              })}
              onClick={() => handleTabClick(tab3)}
            >
              {tab3}
            </div>
          }
          {showtab && (
            <div
              className={classNames(style.tabButton, {
                [style.activeTab]: activeTab === tab4,
              })}
              onClick={() => handleTabClick(tab4)}
            >
              {tab4}
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className={style.tabContent}>
          {activeTab === tab1 && (
            <div>
              <div
                className={classNames(
                  commonstyle.flx,
                  commonstyle.flxBetween,
                  commonstyle.flxWrap
                )}
              >
                {(data?.adndCoverage || data?.icuCcuLimits) && (
                  <div>
                    <p
                      className={classNames(
                        commonstyle.colorGray,
                        commonstyle.fs16,
                        commonstyle.semiBold
                      )}
                    >
                      {m1}
                    </p>
                    <p
                      className={classNames(
                        commonstyle.colorBlue,
                        commonstyle.fs16,
                        commonstyle.semiBold
                      )}
                    >
                      {m1Value}
                    </p>
                  </div>
                )}
                <div>
                  <p
                    className={classNames(
                      commonstyle.colorGray,
                      commonstyle.fs16,
                      commonstyle.semiBold
                    )}
                  >
                    {m2}
                  </p>
                  <p
                    className={classNames(
                      commonstyle.colorBlue,
                      commonstyle.fs16,
                      commonstyle.semiBold
                    )}
                  >
                    {m2Value}
                  </p>
                </div>
                <div>
                  <p
                    className={classNames(
                      commonstyle.colorGray,
                      commonstyle.fs16,
                      commonstyle.semiBold
                    )}
                  >
                    {m3}
                  </p>
                  <p
                    className={classNames(
                      commonstyle.colorBlue,
                      commonstyle.fs16,
                      commonstyle.semiBold
                    )}
                  >
                    {m3Value}
                  </p>
                </div>
                <div>
                  <p
                    className={classNames(
                      commonstyle.colorGray,
                      commonstyle.fs16,
                      commonstyle.semiBold
                    )}
                  >
                    {m4}
                  </p>
                  <p
                    className={classNames(
                      commonstyle.colorBlue,
                      commonstyle.fs16,
                      commonstyle.semiBold
                    )}
                  >
                    {m4Value}
                  </p>
                </div>
              </div>

              <div
                className={classNames(
                  commonstyle.flx,
                  commonstyle.flxBetween,
                  commonstyle.flxWrap
                )}
              ></div>
            </div>
          )}
          {activeTab === tab2 && (
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                cursor: "pointer",
              }}
            >
              {t("downloadPolicyDocument")}
              {/* {data?.policyDocument && (
                <span
                  style={{
                    fontSize: "12px",
                    maxWidth: "30%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                  }}
                >
                  {data.policyDocument.split("/").pop()}
                </span>
              )} */}
              <img
                src={Download}
                className={style.Download}
                alt="Download"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleDownload(data?.policyDocument);
                }}
              />
            </p>
          )}
          {activeTab === tab3 &&
            (tab3 === "Claim Process" ? (
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  cursor: "pointer",
                }}
              >
                {t("downloadClaimProcess")}
                <img
                  src={Download}
                  className={style.Download}
                  alt="Download"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleClaim(data?.claimProcess);
                  }}
                />
              </p>
            ) : (
              <div>
                <div
                  className={classNames(
                    commonstyle.flx,
                    commonstyle.flxBetween,
                    commonstyle.flxWrap
                  )}
                >
                  {data?.tripCancellation && (
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <p
                        className={classNames(
                          commonstyle.colorGray,
                          commonstyle.fs16,
                          commonstyle.semiBold
                        )}
                      >
                        {t("tripCancelation")}
                      </p>
                      <p
                        className={classNames(
                          commonstyle.colorBlue,
                          commonstyle.fs16,
                          commonstyle.semiBold
                        )}
                      >
                        {data?.tripCancellation}
                      </p>
                    </div>
                  )}

                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <p
                      className={classNames(
                        commonstyle.colorGray,
                        commonstyle.fs16,
                        commonstyle.semiBold
                      )}
                    >
                      {t("flightDelay")}
                    </p>
                    <p
                      className={classNames(
                        commonstyle.colorBlue,
                        commonstyle.fs16,
                        commonstyle.semiBold
                      )}
                    >
                      {data?.flightDelay}
                    </p>
                  </div>

                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <p
                      className={classNames(
                        commonstyle.colorGray,
                        commonstyle.fs16,
                        commonstyle.semiBold
                      )}
                    >
                      {t("lossOfPassport")}
                    </p>
                    <p
                      className={classNames(
                        commonstyle.colorBlue,
                        commonstyle.fs16,
                        commonstyle.semiBold
                      )}
                    >
                      {data?.passportLoss}
                    </p>
                  </div>

                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <p
                      className={classNames(
                        commonstyle.colorGray,
                        commonstyle.fs16,
                        commonstyle.semiBold
                      )}
                    >
                      {t("delayInTheArrivalLuggage")}
                    </p>
                    <p
                      className={classNames(
                        commonstyle.colorBlue,
                        commonstyle.fs16,
                        commonstyle.semiBold
                      )}
                    >
                      {data?.luggageArrivalDelay}
                    </p>
                  </div>
                </div>

                <div
                  className={classNames(commonstyle.flx, commonstyle.flxWrap)}
                  style={{ marginTop: "10px", gap: "24px" }}
                >
                  {data?.travelStayOverOneFamMember && (
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <p
                        className={classNames(
                          commonstyle.colorGray,
                          commonstyle.fs16,
                          commonstyle.semiBold
                        )}
                      >
                        {t("travelAndStayOverOneFamilyMember")}
                      </p>
                      <p
                        className={classNames(
                          commonstyle.colorBlue,
                          commonstyle.fs16,
                          commonstyle.semiBold
                        )}
                      >
                        {data?.travelStayOverOneFamMember}
                      </p>
                    </div>
                  )}

                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <p
                      className={classNames(
                        commonstyle.colorGray,
                        commonstyle.fs16,
                        commonstyle.semiBold
                      )}
                    >
                      {t("lossOfBaggage")}
                    </p>
                    <p
                      className={classNames(
                        commonstyle.colorBlue,
                        commonstyle.fs16,
                        commonstyle.semiBold
                      )}
                    >
                      {data?.baggageLoss}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          {activeTab == tab4 && (
            <div>
              <p
                className={classNames(commonstyle.col16, commonstyle.colorGray)}
              >
                {data?.heading}
              </p>

              <p
                className={classNames(commonstyle.col16, commonstyle.colorBlue)}
              >
                {data?.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsuranceGeneric;

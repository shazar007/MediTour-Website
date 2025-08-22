import { useState } from "react";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import style from "./DetailStyle.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Footerr from "pages/Home/HomeNavBar/Footer";
import { flightDecline } from "shared/services";
import { DeleteModal } from "shared/components";
import LabDownload from "assets/images/download.png";
import dayjs from "dayjs";
import { TiTick } from "react-icons/ti";
import { useTranslation } from "react-i18next";
import DetailForm from "./DetailForm";
import Checkout from "shared/services/stripe/checkout";
import { TakeOff } from "assets/svg";
import { PiClockCountdownBold } from "react-icons/pi";

const TravelDetail = () => {
  const { t }: any = useTranslation();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [showform, setShowform] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [open, setOpen] = useState<Boolean>(false);

  let url = state?.data?.eTicket ? state?.data?.eTicket : "";
  const urlParts = state?.type === "booking" ? url?.split("/") : "";
  const fileName: any =
    state?.type === "booking"
      ? urlParts[urlParts?.length - 1]?.split("?")[0]
      : null;

  const handleAccept = () => {
    setShowform(true);
  };
  const logo = state?.data?.agencyId?.logo;
  const declineRequest = () => {
    setLoading(true);
    let params = {
      requestId: selectedRequestId,
    };

    flightDecline(params)
      .then((res: any) => {
        if (res?.data?.auth === true) {
          navigate(-1);
        }
        setShowModal(false);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const onCanelModal = () => {
    setShowModal(false);
  };
  const openModal = (requestId: any) => {
    setSelectedRequestId(requestId);
    setShowModal(true);
  };

  const checkType = state?.type === "booking";
  const items = checkType
    ? state?.data?.bidRequestId?.flightDetails
    : state?.data?.flightDetails;

  const downloadAndSaveImage = (fileUrl: string) => {
    if (!fileUrl) {
      console.error("File URL is not available.");
      return;
    }

    const downloadLink: any = document?.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "insurance_file.pdf";
    document.body.appendChild(downloadLink);
    window.open(downloadLink);

    document.body.removeChild(downloadLink);
  };
  const totalamount = Number(
    state?.data?.ticketPrice || state?.data?.dollarAmount
  );

  return (
    <div>
      <div className={classNames(style.mainConatiner, commonstyle.mb32)}>
        <div className={classNames(commonstyle.mt64)}></div>

        {open ? (
          <Checkout serviceName={"flights"} convertedAmount={totalamount} />
        ) : (
          <>
            <div className={style.mainCard}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <div className={classNames(style.imgconatiner)}>
                    <img
                      src={logo}
                      alt={items?.[0]?.companyName}
                      className={style.flyimg}
                    />
                  </div>
                  <p className={classNames(style.heading)}>
                    {state?.data?.agencyId?.name}
                    {/* {state?.data?.companyName} */}
                  </p>
                </div>

                <div>
                  <p className={style.priceValue}>
                    <span style={{ fontSize: "14px" }}>
                      {state?.type === "booking" &&
                      state?.data?.bidRequestId?.gatewayName === "stripe"
                        ? "$"
                        : "Rs"}
                    </span>
                    {state?.type === "booking"
                      ? state?.data?.bidRequestId?.gatewayName === "stripe"
                        ? state?.data?.bidRequestId?.dollarAmount
                        : state?.data?.bidRequestId?.ticketPrice
                      : state?.data?.ticketPrice}
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  width: "100%",
                }}
              >
                <p className={style.heading}>{t("flightDetails")}</p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <p className={style.heading}>{t("flightType")}:</p>

                  <p className={style.detail}>{state?.data?.requestType}</p>
                </div>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  <p className={style.heading}>{t("travelerDetails")}:</p>

                  <p className={style.detail}>{state?.totalTravelers}</p>
                </div>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  <p className={style.heading}>{t("cabinClass")}:</p>

                  <p className={style.detail}>{t("economy")}</p>
                </div>
              </div>

              <div style={{ marginTop: "16px", width: "100%" }}>
                {items?.map((flight: any, index: any) => {
                  // console.log(".....flight", index);
                  const isNotLast = index !== items.length - 1;

                  return (
                    <>
                      <div
                        className={classNames(
                          commonstyle.flx,
                          commonstyle.flxWrap,
                          commonstyle.flxBetween
                        )}
                        style={{
                          borderBottom: isNotLast
                            ? "1px dashed #7D7D7D"
                            : "none",
                          margin: isNotLast ? "16px 0" : "0",
                          paddingBottom: isNotLast ? "18px" : "0",
                          gap: "100px",
                        }}
                      >
                        <div
                          className={classNames(
                            commonstyle.col6,
                            commonstyle.colmd12,
                            commonstyle.colsm12
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              position: "relative",
                            }}
                          >
                            {/* Left City */}
                            <div
                              style={{
                                // marginRight: "10px",
                                width: "25%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                              }}
                              className={style.detail}
                            >
                              <p className={style.heading}>{t("from")}</p>

                              <p className={style.detail}>{flight?.from}</p>
                              <p className={style.detail}>
                                {dayjs(flight?.departureTime).format("h:mm a")}
                              </p>
                              <p className={style.detail}>
                                {dayjs(flight?.departureDate).format(
                                  "DD-MM-YY"
                                )}
                              </p>
                            </div>

                            {/* Plane Icon and Time */}
                            <div
                              style={{
                                position: "relative",
                                width: "50%",
                                height: "1px",
                                borderTop: "2px dotted #7D7D7D",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  position: "absolute",
                                  top: "-33px",
                                }}
                              >
                                <TakeOff />

                                <p className={style.detail}>
                                  {flight?.companyName}
                                </p>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  position: "absolute",
                                  top: "10px",
                                  alignItems: "center",
                                }}
                              >
                                <PiClockCountdownBold
                                  color="#7d7d7d"
                                  style={{ width: "16px", height: "16px" }}
                                />
                                <div className={style.heading}>
                                  {flight?.flightTime}
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                marginLeft: "40px",
                                width: "25%",

                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                              }}
                              className={style.detail}
                            >
                              <p className={style.heading}>{t("to")}</p>

                              <p className={style.detail}> {flight?.to}</p>
                              <p className={style.detail}>
                                {dayjs(flight?.arrivalTime).format("h:mm a")}
                              </p>
                              <p className={style.detail}>
                                {dayjs(flight?.arrivalDate).format("DD-MM-YY")}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={classNames(
                            commonstyle.col6,
                            commonstyle.colmd12,
                            commonstyle.colsm12
                          )}
                        >
                          <div>
                            <div
                              className={classNames(
                                commonstyle.flx,
                                commonstyle.flxBetween,
                                commonstyle.flxWrap
                              )}
                            >
                              <div className={commonstyle.col6}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  }}
                                >
                                  <p className={classNames(style.heading)}>
                                    {t("amenities")}
                                  </p>
                                  {flight?.amenities?.map(
                                    (amenity: any, i: any) => (
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "10px",
                                          alignItems: "center",
                                        }}
                                      >
                                        <TiTick size={20} color="green" />

                                        <p key={i} className={style.detail}>
                                          {amenity}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              <div className={commonstyle.col6}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                  }}
                                >
                                  <p className={classNames(style.heading)}>
                                    {t("baggage")}
                                  </p>

                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "10px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <TiTick size={20} color="green" />
                                    <p className={style.detail}>
                                      {t("noOfHandbag")}:{" "}
                                      <span className={classNames(style.value)}>
                                        {flight?.noOfHandbag}
                                      </span>
                                    </p>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "10px",
                                      alignItems: "center",
                                    }}
                                    className={style.detail}
                                  >
                                    <TiTick size={20} color="green" />
                                    <p className={style.detail}>
                                      {t("baggageWeight")}:{" "}
                                      <span className={classNames(style.value)}>
                                        {flight?.baggageWeight}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div
                className={classNames(commonstyle.mt24)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  width: "100%",
                }}
              >
                <>
                  <p className={style.heading}>{t("policies")}</p>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <p className={classNames(style.heading)}>
                      {t("cancallationDeduction")}
                    </p>
                    <p className={classNames(style.detail)}>
                      {state?.data?.flightPolicies?.cancelationDeduction}
                      {
                        state?.data?.bidRequestId?.flightPolicies
                          ?.cancelationDeduction
                      }
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <p className={classNames(style.heading)}>
                      {t("cancallationDeduction")}
                    </p>
                    <p className={classNames(style.detail)}>
                      {state?.data?.flightPolicies?.cancelationDuration}
                      {
                        state?.data?.bidRequestId?.flightPolicies
                          ?.cancelationDuration
                      }
                    </p>
                  </div>
                </>

                {state?.type === "booking" ? (
                  <>
                    <div
                      className={classNames(
                        commonstyle.col4,
                        commonstyle.colsm12
                      )}
                    >
                      <div>
                        <span
                          className={style.heading}
                          style={{
                            display: "flex",
                            justifyItems: "center",
                            alignItems: "center",

                            margin: "16px 0",
                          }}
                        >
                          {t("eTicketFile")}
                        </span>
                        {state?.data?.eTicket ? (
                          <div
                            style={{
                              width: "80%",
                              padding: "5px 16px",
                              borderWidth: "1px",
                              borderStyle: "dashed",
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: "rgba(227, 235, 237, 1)",
                              borderRadius: "8px",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              style={{
                                width: "60%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                              className={style.detail}
                            >
                              {fileName}
                            </span>

                            <button
                              onClick={() =>
                                downloadAndSaveImage(state?.data?.eTicket)
                              }
                              style={{
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              <img
                                src={LabDownload}
                                alt="Download"
                                style={{
                                  height: "20px",
                                  width: "20px",
                                  objectFit: "fill",
                                }}
                              />
                            </button>
                          </div>
                        ) : (
                          //
                          <span className={style.detail}>
                            {t("noEticketFound")}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {state?.type !== "booking" && (
                  <div className={classNames(style.btncontainer)}>
                    <button
                      className={classNames(style.firstbtn)}
                      onClick={() => openModal(state?.data?._id)}
                    >
                      {t("decline")}
                    </button>
                    <button
                      className={classNames(style.secoundbtn)}
                      onClick={handleAccept}
                      style={{
                        backgroundColor: showform ? "#CCCCCC" : undefined,
                      }}
                    >
                      {t("accept")}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {showform && (
              <DetailForm
                totalTravelers={state?.totalTravelers}
                handleAccept={handleAccept}
                fileName={fileName}
                type={state?.type}
                setOpen={setOpen}
                id={state.data._id}
                ticketPrice={state?.data?.ticketPrice}
              />
            )}
          </>
        )}
      </div>

      <DeleteModal
        modalVisible={showModal}
        handleCancel={onCanelModal}
        handleDelete={declineRequest}
        loading={loading}
      />
      <div style={{ marginTop: "60px" }}></div>
      <Footerr />
    </div>
  );
};

export default TravelDetail;

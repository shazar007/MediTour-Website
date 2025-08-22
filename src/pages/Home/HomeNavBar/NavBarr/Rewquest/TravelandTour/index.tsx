import React, { useState } from "react";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import style from "./TravelStyle.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { allBidRequest, delFlight } from "shared/services";
import { DeleteModal, RingLoader } from "shared/components";
import dayjs from "dayjs";
import { common } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import { TakeOff } from "assets/svg";

const TravelRequest = ({
  data,
  flightsRequest,
}: {
  data?: any;
  flightsRequest: any;
}) => {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const [showBids, setShowBids] = useState(false);
  const [selectFlightBid, setSelectedAmbulanceIndex] = useState<any>(null);
  const [bidData, setBidData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleBidsClick = () => {
    setShowBids(true);
  };
  const navigate = useNavigate();
  const handledetail = (travel: any, totalTravelers: any) => {
    navigate("/services/myRequest/TravellDetail", {
      state: {
        data: travel,
        totalTravelers: totalTravelers,
      },
    });
  };

  const getAllBid = async (id: any, index: any) => {
    await setBidData([]);
    setSelectedAmbulanceIndex(index);
    setLoading(true);
    const params = {
      requestId: id,
    };
    allBidRequest(params)
      .then((res: any) => {
        setBidData(res?.data?.bidRequests);
      })
      .catch((err: any) => { })
      .finally(() => {
        setLoading(false);
      });
  };
  const openModal = (requestId: any) => {
    setSelectedRequestId(requestId);
    setModalVisible(true);
  };
  const onCanelModal = () => {
    setModalVisible(false);
  };
  const deleteFlight = () => {
    setLoading(true);
    let params = {
      flightRequestsId: selectedRequestId,
    };
    delFlight(params)
      .then(() => {
        //
        // setFlightData(
        //   flightData.filter((item: any) => item._id !== selectedRequestId),
        // );
        setModalVisible(false);
        flightsRequest();
      })
      .catch((err: any) => { })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classNames(commonstyle.mt32)}>
      {/* <div className={classNames(commonstyle.container)}> */}
      <div className={classNames(style.parentcont, commonstyle.mb32)}>
        {data?.map((flight: any, index: any) => {
          let totalTravelers =
            flight?.children + flight?.infant + flight?.adult;

          return (
            <>
              <div>
                <div className={classNames(style.mainconatiner)}>
                  <div
                    className={classNames(
                      commonstyle.flx,
                      commonstyle.flxBetween,
                      commonstyle.flxWrap
                    )}
                    style={{ alignItems: "stretch" }}
                  >
                    <div
                      className={classNames(commonstyle.col8)}
                      style={{
                        height: "100%",
                      }}
                    >
                      <div
                        className={classNames(
                          commonstyle.flx,
                          commonstyle.flxBetween,
                          commonstyle.flxWrap,
                          commonstyle.col6,
                          commonstyle.colsm12
                        )}
                      >
                        <div
                          className={classNames(
                            commonstyle.col6,
                            commonstyle.colsm12
                          )}
                        >
                          <p className={classNames(style.pickdrop)}>
                            {t("flightType")}
                          </p>
                          <p className={classNames(style.pickupdetail)}>
                            {flight?.requestType}
                          </p>
                        </div>

                        <div
                          className={classNames(
                            commonstyle.col6,
                            commonstyle.colsm12
                          )}
                        >
                          <p className={classNames(style.pickdrop)}>
                            {t("traveler")}
                          </p>
                          <p className={classNames(style.pickupdetail)}>
                            {totalTravelers} {t("traveler")}
                          </p>
                        </div>
                      </div>
                      {/* 2nd row */}
                      <div>
                        {flight?.flights?.map((item: any) => {
                          return (
                            <div
                              className={classNames(
                                commonstyle.flx,
                                commonstyle.flxBetween,
                                commonstyle.flxWrap
                              )}
                              style={{
                                // padding: "10px",
                                borderBottom: "1.5px dashed #7D7D7D",

                                margin: "5px 0",
                              }}
                            >
                              <div
                                className={classNames(
                                  commonstyle.col4,
                                  commonstyle.colsm12,
                                  commonstyle.mb16,
                                  commonstyle.mt32
                                )}
                              >
                                <p className={classNames(style.pickdrop)}>
                                  {t("from")}
                                </p>
                                <p className={classNames(style.pickupdetail)}>
                                  {item?.from}
                                </p>
                              </div>
                              <div
                                className={classNames(
                                  commonstyle.col4,
                                  commonstyle.colsmm12,
                                  commonstyle.mb16,
                                  commonstyle.mt32
                                )}
                              >
                                <p className={classNames(style.pickdrop)}>
                                  {t("to")}
                                </p>
                                <p className={classNames(style.pickupdetail)}>
                                  {item?.to}
                                </p>
                              </div>

                              <div
                                className={classNames(
                                  commonstyle.col4,
                                  commonstyle.colsm12,
                                  commonstyle.mb16,
                                  commonstyle.mt32
                                )}
                              >
                                <p className={classNames(style.pickdrop)}>
                                  {t("class")}
                                </p>
                                <p className={classNames(style.pickupdetail)}>
                                  {flight?.flightClass}
                                </p>
                              </div>
                              <div
                                className={classNames(
                                  commonstyle.col4,
                                  commonstyle.colsm12,
                                  commonstyle.mb16,
                                  commonstyle.mt32
                                )}
                              >
                                <p className={classNames(style.pickdrop)}>
                                  {t("departureDate")}
                                </p>
                                <p className={classNames(style.pickupdetail)}>
                                  {dayjs(flight?.flights?.departure).format(
                                    "MM-DD-YYYY"
                                  )}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {/* 3rd row */}

                      <div>
                        {flight?.requestType === "round" && (
                          <div
                            className={classNames(
                              commonstyle.flx,
                              commonstyle.flxBetween,
                              commonstyle.flxWrap
                            )}
                            style={{
                              // padding: "10px",
                              borderBottom: "1.5px dashed #7D7D7D",
                              margin: "5px 0",
                            }}
                          >
                            {flight?.flights?.map((i: any) => {
                              console.log("i.......", i);

                              return (
                                <>
                                  <div
                                    className={classNames(
                                      commonstyle.col4,
                                      commonstyle.colsm12,
                                      commonstyle.mb16,
                                      commonstyle.mt32
                                    )}
                                  >
                                    <p className={classNames(style.pickdrop)}>
                                      {t("from")}
                                    </p>
                                    <p
                                      className={classNames(style.pickupdetail)}
                                    >
                                      {i?.to}
                                    </p>
                                  </div>
                                  <div
                                    className={classNames(
                                      commonstyle.col4,
                                      commonstyle.colsmm12,
                                      commonstyle.mb16,
                                      commonstyle.mt32
                                    )}
                                  >
                                    <p className={classNames(style.pickdrop)}>
                                      {t("to")}
                                    </p>
                                    <p
                                      className={classNames(style.pickupdetail)}
                                    >
                                      {i?.from}
                                    </p>
                                  </div>

                                  <div
                                    className={classNames(
                                      commonstyle.col4,
                                      commonstyle.colsm12,
                                      commonstyle.mb16,
                                      commonstyle.mt32
                                    )}
                                  >
                                    <p className={classNames(style.pickdrop)}>
                                      {t("class")}

                                    </p>
                                    <p
                                      className={classNames(style.pickupdetail)}
                                    >
                                      {flight?.flightClass}
                                    </p>
                                  </div>
                                </>
                              );
                            })}

                            <div
                              className={classNames(
                                commonstyle.col4,
                                commonstyle.colsm12,
                                commonstyle.mb16,
                                commonstyle.mt32
                              )}

                            >
                              <p className={classNames(style.pickdrop)}>
                                {t("returnDate")}
                              </p>
                              <p className={classNames(style.pickupdetail)}>
                                {dayjs(flight?.returnFlight).format(
                                  "DD-MM-YYYY"
                                )}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={classNames(
                        commonstyle.col3,
                        commonstyle.colsm12
                      )}
                    >
                      <div className={isRtl ? classNames(style.isRtlactionConatiner) : classNames(style.actionConatiner)}  >
                        <div className={style.iconConatiner}>
                          <div
                            className={classNames(style.icon)}
                            onClick={() => openModal(flight._id)}
                          >
                            <MdDeleteOutline color="#d2092d" size="20px" />
                          </div>
                        </div>

                        {!showBids && (
                          <div className={classNames(style.bidcontainer)}>
                            <button
                              className={classNames(style.bidsBtn)}
                              onClick={() => getAllBid(flight?._id, index)}
                            >
                              {loading && selectFlightBid === index ? (
                                <RingLoader color={"#fff"} size={30} />
                              ) : (
                                t("showOffers")
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {selectFlightBid === index && (
                    <p style={{ margin: "5px 0", color: "red" }}>


                      {loading || bidData?.length !== 0 ? null : t("noOfferFound")}


                    </p>)}
                </div>
                {selectFlightBid === index && (
                  <>
                    <div>
                      {bidData?.map((travel: any, index: any) => (
                        <div key={index}>
                          <div className={classNames(style.detailconatiner)}>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "start",
                                height: "auto",
                                flexWrap: "wrap",
                              }}
                            >
                              {/* Travel Image, Name */}
                              <div
                                className={classNames(
                                  style.responsiveCol,
                                  style.col3
                                )}
                              >
                                <div style={{ display: "flex" }}>
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "16px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      className={classNames(style.imgcontainer)}
                                    >
                                      <img
                                        src={travel?.agencyId?.logo}
                                        alt={travel?.agencyId?.name}
                                        className={style.travelimg}
                                      />
                                    </div>
                                    <div>
                                      <p
                                        className={classNames(
                                          style.pickupdetailLogo
                                        )}
                                        style={{ whiteSpace: "nowrap" }}
                                      >
                                        {travel?.agencyId?.name}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Outbound Flights */}
                              <div className={classNames(style.responsiveCol)}>
                                {travel?.flightDetails
                                  ?.slice(0, 1)
                                  .map((bids: any, index: any) => (
                                    <>
                                      <div
                                        key={`outbound-${index}`}
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          justifyContent: "space-between",
                                          height: "100%",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            gap: "10px",
                                          }}
                                        >
                                          <TakeOff
                                          // fontSize={24}
                                          // color="#7D7D7D"
                                          />
                                          <p
                                            className={style.pickdrop}
                                            style={{ whiteSpace: "nowrap" }}
                                          >
                                            {bids?.companyName}
                                          </p>
                                        </div>

                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginTop: "auto",
                                          }}
                                        >
                                          <p className={style.pickdrop}>{t("from")}</p>
                                          <p className={style.pickupdetail}>
                                            {bids.from}
                                          </p>
                                        </div>
                                      </div>
                                    </>
                                  ))}
                              </div>

                              {/* Destination */}
                              <div
                                className={classNames(style.responsiveCol)}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignSelf: "flex-end",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  {flight?.requestType !== "round" &&
                                    travel?.flightDetails
                                      ?.slice(-1)
                                      .map((bids: any, index: any) => (
                                        <React.Fragment key={index}>
                                          <p className={style.pickdrop}>{t("to")}</p>
                                          <p className={style.pickupdetail}>
                                            {bids?.to}
                                          </p>
                                        </React.Fragment>
                                      ))}

                                  {flight?.requestType === "round" &&
                                    travel?.returnFlights?.map(
                                      (bids: any, index: any) => (
                                        <React.Fragment key={index}>
                                          <p className={style.pickdrop}>{t("to")}</p>
                                          <p className={style.pickupdetail}>
                                            {bids.to}
                                          </p>
                                        </React.Fragment>
                                      )
                                    )}
                                </div>
                              </div>

                              {/* Price */}
                              <div className={classNames(style.responsiveCol)}>
                                <p className={style.pickupdetailPrice}>
                                  <span style={{ fontSize: "14px" }}>


                                    {t("rs")}
                                  </span>
                                  {travel?.ticketPrice}
                                </p>
                              </div>

                              {/* Action Button */}
                              <div
                                className={classNames(
                                  style.responsiveCol,
                                  style.col3
                                )}
                              >






                                <div className={isRtl ? classNames(style.isRtlactionConatiner) : classNames(style.actionConatiner)}  >
                                  <div className={style.iconConatiner}>

                                  </div>

                                  <div className={classNames(style.bidcontainer)}>
                                    <button
                                      className={classNames(style.bidsBtn)}
                                      onClick={() =>
                                        handledetail(travel, totalTravelers)
                                      }
                                    >
                                      {loading && selectFlightBid === index ? (
                                        <RingLoader color={"#fff"} size={30} />
                                      ) : (
                                        t("viewDetails")

                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          );
        })}
        <DeleteModal
          modalVisible={isModalVisible}
          handleCancel={onCanelModal}
          handleDelete={deleteFlight}
          loading={loading}
        />
        {/* Display travel data when the Bids button is clicked */}
      </div>
    </div>
  );
};

export default TravelRequest;
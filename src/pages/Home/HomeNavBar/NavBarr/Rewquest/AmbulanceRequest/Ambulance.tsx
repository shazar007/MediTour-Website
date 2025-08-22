import { useState } from "react";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import style from "./AmbulanceStyle.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { bidReqGet, declineAmbulance, deleteRequest } from "shared/services";
import { DeleteModal, LoadingModal, RingLoader } from "shared/components";
import { useDispatch, useSelector } from "react-redux";
import { setObj } from "shared/redux";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const Ambulance = ({ data }: { data?: any }) => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedAmbulanceIndex, setSelectedAmbulanceIndex] =
    useState<any>(null);
  const [bidData, setBidData] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [ambulanceReqId, setAmbulanceReqId] = useState<any>("");
  const [decline, setDecline] = useState<any>(false);
  const { isLoggedIn } = useSelector((state: any) => state?.root?.common);
  const handleBidsClick = async (index: any, id: any) => {
    await setBidData([]);
    setSelectedAmbulanceIndex(index);
    setLoading(true);
    let params: any = {
      requestId: id,
    };
    setTimeout(() => {
      bidReqGet(params)
        .then((res: any) => {
          const filteredBids = res?.data?.bidRequests?.filter(
            (bid: any) => bid?.status !== "rejected"
          );
          setBidData(filteredBids);
        })
        .catch((err: any) => {})
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  };

  const openModal = (id: any) => {
    setAmbulanceReqId(id);
    setModalVisible(true);
  };

  const onCanelModal = () => {
    setModalVisible(false);
  };

  const onDelete_AmbRequest = () => {
    setLoading(true);
    let params = {
      requestId: ambulanceReqId,
    };

    deleteRequest(params)
      .then((res: any) => {
        setBidData(bidData.filter((item: any) => item._id !== ambulanceReqId));
        setModalVisible(false);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const onAcceptBid = async (item: any) => {
    await dispatch(setObj(item));

    if (isLoggedIn) {
      navigate("/services/paymentDetail", {
        state: {
          serviceName: "Ambulance",
          actualAmount: item?.price,
          ambulanceId: item?._id,
        },
      });
    } else {
      navigate("/user/login");
    }
  };

  const declineRequest = (i: any) => {
    setDecline(true);
    let params = {
      requestId: i?._id,
    };
    declineAmbulance(params)
      .then((res: any) => {
        setBidData(bidData.filter((item: any) => item._id !== i?._id));
      })
      .catch((err: any) => {})
      .finally(() => {
        setDecline(false);
      });
  };

  if (decline) {
    return <LoadingModal showModal={decline} />;
  }

  return (
    <div className={classNames(style.parentcont)}>
      {data?.map((ambulance: any, index: any) => {
        return (
          <>
            <div
              key={index}
              className={classNames(style.mainconatiner, commonstyle.mb32)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  flexWrap: "wrap",
                }}
              >
                <div
                  className={classNames(commonstyle.col4, commonstyle.colsm12)}
                >
                  <p className={classNames(style.pickdrop)}>
                    {t("pickupLocation")}
                  </p>
                  <p className={classNames(style.pickupdetail)}>
                    {ambulance?.pickUp?.address}
                  </p>
                </div>
                <div
                  className={classNames(commonstyle.col4, commonstyle.colsm12)}
                >
                  <p
                    className={classNames(style.pickdrop)}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {t("dropOffLocation")}
                  </p>
                  <p className={classNames(style.pickupdetail)}>
                    {ambulance?.dropOff?.address}
                  </p>
                </div>
                <div
                  className={
                    isRtl
                      ? classNames(
                          style.RtlbuttonContainer,
                          commonstyle.col4,
                          commonstyle.colsm12
                        )
                      : classNames(
                          style.buttonContainer,
                          commonstyle.col4,
                          commonstyle.colsm12
                        )
                  }
                >
                  <div className={style.iconConatiner}>
                    <div
                      className={classNames(style.icon)}
                      onClick={() => openModal(ambulance?._id)}
                    >
                      <MdDeleteOutline color="#d2092d" size="20px" />
                    </div>
                  </div>

                  <div className={classNames(style.bidcontainer)}>
                    <button
                      className={classNames(style.bidsBtn)}
                      onClick={() => handleBidsClick(index, ambulance?._id)} // Pass index to handleBidsClick
                    >
                      {loading && selectedAmbulanceIndex === index ? (
                        <RingLoader color={"#fff"} size={30} />
                      ) : (
                        t("showOffers")
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {selectedAmbulanceIndex === index && (
              <>
                <div>
                  {bidData.map((ambulance: any, index: any) => (
                    <div key={index}>
                      <div>
                        <div className={classNames(style.detailconatiner)}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              className={classNames(
                                commonstyle.col5,
                                commonstyle.colmd6,
                                commonstyle.colsm12
                              )}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "16px",
                                  alignItems: "center",
                                }}
                              >
                                <div className={classNames(style.imgcontainer)}>
                                  <img
                                    src={ambulance?.ambulanceId?.logo}
                                    alt={`${ambulance?.name} logo`}
                                    className={style.ambulanceimg}
                                  />
                                </div>
                                <div>
                                  <p
                                    className={classNames(style.pickdrop)}
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    {ambulance?.ambulanceId?.name}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div
                              className={classNames(
                                commonstyle.col2,
                                commonstyle.colmd2,
                                commonstyle.colsm12
                              )}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  className={classNames(style.pickdrop)}
                                  style={{ fontSize: "14px" }}
                                >
                                  {/* {ambulance?.price} */}

                                  {ambulance?.ambulanceNo}
                                </p>
                              </div>
                            </div>

                            <div
                              className={classNames(
                                commonstyle.col5,
                                commonstyle.colmd6,
                                commonstyle.colsm12,
                                commonstyle.flxEnd
                              )}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <p
                                    className={classNames(style.pickdrop)}
                                    style={{ fontSize: "24px" }}
                                  >
                                    <span style={{ fontSize: "16px" }}>Rs</span>
                                    {ambulance?.price}
                                  </p>
                                </div>

                                <div
                                  className={
                                    isRtl
                                      ? classNames(
                                          style.RtlbuttonContainer,
                                          commonstyle.col4,
                                          commonstyle.colsm12
                                        )
                                      : classNames(
                                          style.buttonContainer,
                                          commonstyle.col4,
                                          commonstyle.colsm12
                                        )
                                  }
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                      alignSelf: "flex-end",
                                    }}
                                  >
                                    <div
                                      className={classNames(style.decline)}
                                      onClick={() => declineRequest(ambulance)}
                                    >
                                      {t("decline")}
                                    </div>

                                    <div
                                      className={classNames(style.bidcontainer)}
                                    >
                                      <button
                                        className={classNames(style.bidsBtn)}
                                        onClick={() => onAcceptBid(ambulance)}
                                      >
                                        {loading &&
                                        selectedAmbulanceIndex === index ? (
                                          <RingLoader
                                            color={"#fff"}
                                            size={30}
                                          />
                                        ) : (
                                          t("accept")
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ margin: "5px 0", color: "red" }}>
                  {loading || bidData?.length !== 0 ? null : t("noOfferFound")}
                </p>
              </>
            )}
          </>
        );
      })}

      <DeleteModal
        modalVisible={modalVisible}
        handleCancel={onCanelModal}
        handleDelete={onDelete_AmbRequest}
        loading={loading}
      />
    </div>
  );
};

export default Ambulance;

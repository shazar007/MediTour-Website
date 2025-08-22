import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import phramacyorder from "assets/images/phramacyorder.png";
import DoubleButton from "shared/components/Buttons/DoubleButton";
import { getAllOrders_History } from "shared/services";
import Footerr from "../../Footer";
import styles from "./orderHistory.module.css";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import CustomLoader from "shared/components/New_Loader/Loader";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
import { useDirection } from "shared/utils/DirectionContext";
import UserCard from "shared/components/A_New_Components/UserCard";
import { useSelector } from "react-redux";
import download from "assets/images/admindownload.png";
import { TiTick } from "react-icons/ti";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";

const MyOrderHome = React.memo((props) => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const location = useLocation();
  const { exchangeRate } = useSelector((state: any) => state.root.common);

  const [selected, setSelected] = useState("Laboratory");
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    if (location.state?.item) {
      setSelectedOrder(location.state.item);
      setShowDetailView(true);
    }
    setLoading(true);
    fetchOrders();
  }, [selected]);

  const handleTabChange = (tab: string) => {
    setSelected(tab);
    setShowDetailView(false);
  };

  const fetchOrders = () => {
    let params: any = {
      page: 1,
      type: selected.toLowerCase(),
    };

    getAllOrders_History(params)
      .then((res: any) => {
        setList(res?.data?.orders || []);
      })
      .catch((err: any) => {
        notifyError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoToOrderHistoryDetail = (item: any) => {
    setSelectedOrder(item);
    setShowDetailView(true);
    window.scrollTo(0, 0);
  };

  const handleDownload = (fileUrl: string) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "downloaded_file.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const renderOrderDetailView = () => {
    let dataMap = selectedOrder?.items || selectedOrder?.medicineIds;
    const gatewayName = selectedOrder?.gatewayName;
    let removeProcessFee =
      selectedOrder?.paidByUserAmount - selectedOrder?.processingFee;
    const price =
      selectedOrder?.gatewayName === "stripe"
        ? removeProcessFee
        : selectedOrder?.paidByUserAmount;

    const TotalAmount =
      gatewayName === "stripe" ? `$ ${price?.toFixed(2)}` : `PKR ${price}`;

    return (
      <div className={styles.mainContainer}>
        <div className={styles.detailsContainer}>
          <div className={styles.innercontainer}>
            <div className={styles.firstcol}>
              <div style={{ marginBottom: "10px" }}>
                <p className={styles.title}>{selectedOrder?.vendorId?.name}</p>
              </div>
              <div>
                <div style={{ marginBottom: "27px" }}>
                  <p
                    className={styles.title}
                    style={isRtl ? { lineHeight: "35px" } : {}}
                  >
                    {t("orderDetails")}
                  </p>
                </div>
                <div className={styles.itembar}>
                  <p
                    className={styles.value}
                    style={isRtl ? { lineHeight: "35px" } : {}}
                  >
                    {t("orderId")}
                  </p>
                  <p className={styles.item}>
                    {selectedOrder?.vendorId?.vendorId ||
                      selectedOrder?.requestId}
                  </p>
                </div>
                <div className={styles.itembar}>
                  <p
                    className={styles.value}
                    style={isRtl ? { lineHeight: "35px" } : {}}
                  >
                    {t("status")}
                  </p>
                  <p className={styles.item}>{selectedOrder?.status}</p>
                </div>
              </div>
              <div className={styles.itemListDetail}>
                <div
                  className={styles.title}
                  style={{ marginBottom: "27px", marginTop: "27px" }}
                >
                  {selected === "Laboratory" ? (
                    <p>{t("testDetails")}</p>
                  ) : (
                    <p>{t("medicineDetails")}</p>
                  )}
                </div>

                {dataMap?.map((item: any, index: any) => {
                  const price = item?.itemId?.userAmount || item?.id?.tpPrice;
                  const convertedAmount = exchangeRate * price;
                  const multiplyAmount = item?.quantity * convertedAmount;
                  const blinkprice = item?.quantity * price;
                  const itnitalimg = item?.id?.images?.[0];

                  const handleAmount =
                    gatewayName === "stripe"
                      ? `$ ${multiplyAmount?.toFixed(2)}`
                      : `PKR ${blinkprice}`;
                  return (
                    <div key={index} className={styles.itemDetail}>
                      <div>
                        {selected === "Laboratory" && (
                          <>
                            <div style={{ width: "100%" }}>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  marginBottom: "5px",
                                }}
                              >
                                <p className={styles.item}>
                                  <TiTick size={20} color="green" />
                                  {item?.itemId?.testDescription}
                                </p>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginTop: "5px",
                                }}
                              >
                                <p className={styles.value}>
                                  {item?.itemId?.testNameId?.name}
                                </p>
                                <p className={styles.value}>{handleAmount}</p>
                              </div>
                            </div>
                          </>
                        )}

                        {item?.id?.brand && (
                          <div className={styles.itembar} key={index}>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                              }}
                            >
                              <div className={styles.medicineImageConatiner}>
                                <img
                                  src={item?.id?.images?.[0]}
                                  alt={item?.id?.brand}
                                  className={styles.medicineImage}
                                />
                              </div>
                              <p className={styles.item}>
                                {item?.id?.brand}{" "}
                                <span>{item?.id?.strength}</span>
                              </p>
                            </div>
                            <p className={styles.value}>{handleAmount}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.separtor}></div>

            <div className={styles.secoundcol}>
              <div className={styles.secoundcolContent}>
                <div>
                  <div style={{ marginBottom: "27px" }}>
                    <p
                      className={styles.title}
                      style={isRtl ? { lineHeight: "35px" } : {}}
                    >
                      {t("paymentDetails")}
                    </p>
                  </div>
                  <div className={styles.itembar}>
                    <p className={styles.value}>{t("totalAmount")}</p>
                    <p className={styles.item}>{TotalAmount}</p>
                  </div>
                </div>

                <div>
                  {selectedOrder?.results && (
                    <div
                      style={{
                        border: "1px dashed #7D7D7D",
                        width: "100%",
                        borderColor: "blue",
                        borderRadius: "8px",
                        padding: "8px",
                        alignItems: "center",
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      onClick={() => handleDownload(selectedOrder?.results)}
                    >
                      <p style={{ color: "#7D7D7D" }}>{t("downloadResult")}</p>
                      <img
                        src={download}
                        alt="download"
                        style={{ width: "24px", height: "24px" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOrderListView = () => {
    return (
      <div>
        {loading ? (
          <CustomLoader />
        ) : list.length > 0 ? (
          list.map((order: any, index: any) => {
            let CURRENCY = order?.gatewayName === "blinq" ? "PKR " : "$ ";
            let lab =
              order?.gatewayName === "blinq"
                ? order?.totalAmount
                : order?.dollarAmount;
            let pharm =
              order?.gatewayName === "blinq"
                ? order?.amount
                : order?.dollarAmount;
            let handleAmount = selected === "Laboratory" ? lab : pharm;
            const showInitialIndex = order?.medicineIds?.[0]?.id?.productName;

            return (
              <React.Fragment key={index}>
                <UserCard
                  img={order?.vendorId?.logo || phramacyorder}
                  name={order?.vendorId?.name || showInitialIndex}
                  paid={order?.status}
                  verified={
                    selected === "Laboratory" ? "PHC Verified" : undefined
                  }
                  items={[
                    {
                      title: t("orderId"),
                      value: order?.orderId || order?.requestId,
                    },
                    { title: t("status"), value: order?.status },
                    {
                      title: t("bookingDate&Time"),
                      value: dayjs(order?.createdAt).format(
                        "DD MMM YYYY, hh:mm A"
                      ),
                    },
                    {
                      title: t("quantity"),
                      value:
                        selected === "Laboratory"
                          ? order?.items?.length
                          : order?.medicineIds?.length,
                    },
                  ]}
                  TotalAmount={handleAmount}
                  buttontext={t("details")}
                  onButtonClick={() => handleGoToOrderHistoryDetail(order)}
                />
              </React.Fragment>
            );
          })
        ) : (
          <PhysiotheristsEmpty />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <ServiceHeader
          headingBlue={t("order")}
          headingOrange={t("history")}
          desc_width="70%"
        />
        <div style={{ marginBottom: "48px" }}>
          <DoubleButton
            tab1Label="Laboratory"
            tab2Label="Pharmacy"
            onTabChange={handleTabChange}
            shift={selected}
          />
        </div>
        {showDetailView && selectedOrder
          ? renderOrderDetailView()
          : renderOrderListView()}
      </div>
      <Footerr />
    </div>
  );
});

export default MyOrderHome;

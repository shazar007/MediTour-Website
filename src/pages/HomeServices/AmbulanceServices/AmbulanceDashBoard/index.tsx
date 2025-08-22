import { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import styles from "./ambulancedashboard.module.css";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AmbulanceDASHBOARD } from "shared/services/Ambulance";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import NewPagination from "shared/components/NewPagination/NewPagination";
import dayjs from "dayjs";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import TableNew from "shared/components/A_New_Components/Table_new";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Request from "assets/images/Ambulance-Requests.png";
import Routes from "assets/images/Ambulance-routes.png";
import Payments from "assets/images/Ambulance-Payments.png";
import { useDirection } from "shared/utils/DirectionContext";
export default function AmbulanceDashBoard() {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState<any>(null);

  const DashREquest = [
    t("image"),
    t("date/Time"),
    t("_name"),
    t("pickUpLocation"),
  ];

  const { data } = useQuery({
    queryKey: ["AmbulanceDashRequest"],
    queryFn: () => AmbulanceDASHBOARD(),
    staleTime: 5 * 60 * 1000,
  });
  let tableData: any = [];

  let request = data?.data?.recentRequests;
  request?.map((v: any, ind: any) => {
    tableData.push([
      <Avatar src={v?.userId?.userImage} sx={{}} />,
      dayjs(v?.createdAt)
        .locale(isRtl ? "ur" : "en")
        .format("DD MMM - hh:mm A"),
      v?.userId?.name,
      v?.pickUp?.address,
    ]);
  });
  const handleNextPage = () => {
    if (data?.data?.nextPage) {
      setCurrentPage(data.data.nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (data?.data?.previousPage) {
      setCurrentPage(data.data.previousPage);
    }
  };

  useEffect(() => {
    if (data?.data?.totalRequests) {
      setTotalItems(data.data.totalRequests);
    }
  }, [data, totalItems]);
  const navigate = useNavigate();

  const handlegorequest = () => {
    navigate("/ambulance/request");
  };

  const handlegoOnRoutes = () => {
    navigate("/ambulance/onroutes");
  };
  const handlegopayments = () => {
    navigate("/ambulance/payments");
  };

  return (
    <>
      <div className={classNames(commonstyle.col12)}>
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? commonstyle.pl36
              : commonstyle.pr36
          }
        >
          <div className={styles.flx}>
            <div className={styles.dashCard}>
              <div className={styles.flxcard}>
                <img src={Request} alt="Request" className={styles.Icons} />
                <div>
                  <p className={styles.Value}>{data?.data?.totalRequests} </p>{" "}
                  <p className={styles.Title}>{t("requests")}</p>
                </div>
              </div>
              <div className={styles.FlxEnd} onClick={handlegorequest}>
                <p className={styles.Card_Detail}>{t("details")}</p>
                {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                  <FaArrowLeftLong className={styles.Arrow} />
                ) : (
                  <FaArrowRightLong className={styles.Arrow} />
                )}
              </div>
            </div>
            <div className={styles.dashCard}>
              <div className={styles.flxcard}>
                <img src={Routes} alt="Routes" className={styles.Icons} />
                <div>
                  <p className={styles.Value}> 33</p>{" "}
                  <p className={styles.Title}>{t("onRoute")}</p>
                </div>
              </div>
              <div className={styles.FlxEnd} onClick={handlegoOnRoutes}>
                <p className={styles.Card_Detail}>{t("details")}</p>
                {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                  <FaArrowLeftLong className={styles.Arrow} />
                ) : (
                  <FaArrowRightLong className={styles.Arrow} />
                )}
              </div>
            </div>{" "}
            <div className={styles.dashCard}>
              <div className={styles.flxcard}>
                <img src={Payments} alt="Paymentsdd" className={styles.Icons} />
                <div>
                  <p className={styles.Value}>33 </p>{" "}
                  <p className={styles.Title}>{t("payments")}</p>
                </div>
              </div>
              <div className={styles.FlxEnd} onClick={handlegopayments}>
                <p className={styles.Card_Detail}>{t("details")}</p>
                {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                  <FaArrowLeftLong className={styles.Arrow} />
                ) : (
                  <FaArrowRightLong className={styles.Arrow} />
                )}
              </div>
            </div>
          </div>
          <div className={commonstyle.outerContainer}>
            <div className={commonstyle.flxBetween}>
              <p className={classNames(commonstyle.fs14, commonstyle.semiBold)}>
                {t("recentRequest")}
              </p>
              <NewPagination
                onNext={handleNextPage}
                onPrevious={handlePreviousPage}
                startItem={(currentPage - 1) * itemsPerPage + 1}
                endItem={Math.min(currentPage * itemsPerPage, totalItems)}
                totalItems={totalItems}
              />
            </div>
            {totalItems > 0 ? (
              <TableNew
                titles={DashREquest}
                data={tableData}
                headerWidth="25%"
                itemWidth="25%"
                height="250px"
                show="default"
              />
            ) : (
              <PhysiotheristsEmpty />
            )}{" "}
          </div>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./donors.module.css";
import { donationGETALLDonations } from "shared/services/Donation";
import { RingLoader } from "shared/components";
import NewPagination from "shared/components/NewPagination/NewPagination";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { TbRefresh } from "react-icons/tb";
import TableNew from "shared/components/A_New_Components/Table_new";
import { useTranslation } from "react-i18next";

function Donors() {
  const { t, i18n }: any = useTranslation();
  const [loading, setLoading] = useState(false);
  const [donors, setDonors] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [rotation, setRotation] = useState(0);
  const rotationIncrement = 90;

  const Titles = [
    t("donorId"),
    t("donorName"),
    t("donationPurpose"),
    t("donationAmount"),
  ];

  let Donors = donors;
  let tempData: any = [];
  Donors?.map((v: any, ind: any) => {
    tempData.push([
      v?.donationId,
      v?.donorName,
      v?.donationPurpose,
      v?.gatewayName === "stripe"
        ? `$${(Math.round(v?.paidByUserAmount * 100) / 100).toFixed(2)}`
        : `Rs: ${(Math.round(v?.paidByUserAmount * 100) / 100).toFixed(2)}`,
    ]);
  });
  const FetchAllDonations = (page = 1) => {
    setLoading(true);
    donationGETALLDonations(currentPage)
      .then((res: any) => {
        if (res.data.auth === true) {
          setDonors(res.data.donations);
          setTotalDonations(res.data.totalDonations);
          setTotalPages(Math.ceil(res.data.totalDonations / itemsPerPage));
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    FetchAllDonations(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={classNames(commonstyles.col12, style.outer)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyles.pl36
            : commonstyles.pr36
        }
      >
        {" "}
        <div
          className={classNames(
            commonstyles.flx,
            commonstyles.alignItemsCenter
          )}
          style={{ gap: "16px" }}
        >
          <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
            {t("listing")}
          </p>

          {loading ? (
            <div className={style.outerRefresh}>
              <RingLoader color={"#0e54a3"} size={24} />
            </div>
          ) : (
            <div className={style.outerRefresh}>
              <TbRefresh
                color={"#7d7d7d"}
                size={24}
                style={{ transform: `rotate(${rotation}deg)` }}
                onClick={() => {
                  FetchAllDonations(currentPage);
                  setRotation((prev) => prev + rotationIncrement);
                }}
              />
            </div>
          )}
        </div>
        <div className={commonstyles.outerContainer}>
          <div className={classNames(commonstyles.flxEnd)}>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, totalDonations)}
              totalItems={totalDonations}
            />
          </div>

          {donors && donors.length > 0 ? (
            <>
              <TableNew
                titles={Titles}
                data={tempData}
                headerWidth="25%"
                itemWidth="25%"
                height="375px"
                show="default"
              />
            </>
          ) : (
            <PhysiotheristsEmpty />
          )}
        </div>
      </div>
    </div>
  );
}

export default Donors;

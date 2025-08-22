import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import dstyle from "./EduStyle.module.css";
import style from "./Help.module.css";
import { IoMdArrowForward } from "react-icons/io";
import { getPackages } from "shared/services";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "shared/components/New_Loader/Loader";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";

const DonationEdu = () => {
  const { t }: any = useTranslation();
  const { state } = useLocation();
  let item = state?.items;
  const [data, setData] = useState<any>([]);
  const [visibleCards, setVisibleCards] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useSelector((state: any) => state.root.common);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = (items: any) => {
    navigate(`/services/donation/DonationPackeg`, { state: { items } });
  };

  useEffect(() => {
    PackagesCompany();
  }, [currentPage]);

  const PackagesCompany = () => {
    setLoading(true);
    let params = {
      criteriaName: item?.criteriaName,
      page: currentPage,
    };
    getPackages(params)
      .then((res: any) => {
        setData(res?.data?.packages);
        setTotalPages(res?.data?.totalPages);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

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
    <div>
      <div>
        <ServiceHeader
          headingBlue={t("GivetheGiftofHealing")}
          headingOrange={t("MakesaDifference")}
          content={t("Yourcontributionhelps_")}
          desc_width="80%"
        />
      </div>
      {/* Cards Section */}
      <div className={classNames(commonstyles.container, commonstyles.mb32)}>
        <div className={classNames(commonstyles.flxEnd)}>
          <NewPagination
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
            startItem={(currentPage - 1) * visibleCards + 1}
            endItem={Math.min(currentPage * visibleCards, data.length)}
            totalItems={data.length}
          />
        </div>

        <p className={classNames(dstyle.cardTitle)}>{item?.criteriaName}</p>
        <div className={dstyle.cardContainer}>
          {loading ? (
            <CustomLoader />
          ) : data.length === 0 ? (
            <div
              className={classNames(commonstyles.flx, commonstyles.flxCenter)}
              style={{
                width: "100%",
                overflow: "hidden",
              }}
            >
              <div className={classNames(commonstyles.flx)}>
                <PhysiotheristsEmpty />
              </div>
            </div>
          ) : (
            <>
              {data.slice(0, visibleCards).map((item: any) => {
                const isFavorite = user?.favourites?.some(
                  (fav: any) =>
                    fav.itemId === item._id && fav.favModel === "donation"
                );
                return (
                  <div
                    className={dstyle.card}
                    onClick={() => handleCardClick(item)}
                    key={item._id}
                  >
                    <div className={dstyle.cardOverlay}>
                      <img
                        src={item?.images?.[0] || "fallback-image-url"}
                        alt="Card"
                        className={dstyle.cardImg}
                      />
                    </div>

                    <div className={dstyle.cardInnerBody}>
                      {" "}
                      <p className={dstyle.cardOverlayText}>
                        {item.donationTitle}
                      </p>
                      <div className={dstyle.cardLogoTextContainer}>
                        <img
                          src={item?.donationId?.logo || "fallback-image-url"}
                          alt="Logo"
                          className={dstyle.cardLogo}
                        />
                        <div className={dstyle.textarea}>
                          <p className={dstyle.cardTitle2}>
                            {item?.donationId?.name}
                          </p>
                          <p className={dstyle.cardSubtitle}>
                            {item?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {data.length > visibleCards && (
          <div className={dstyle.showMoreContainer}>
            <button onClick={handleNextPage} className={dstyle.showMoreButton}>
              {t("showMore")}
              <span className={dstyle.icon}>
                <IoMdArrowForward />
              </span>
            </button>
          </div>
        )}
        <div className={style.marginTopDonation}></div>
      </div>

      {/* Footer */}
      <Footerr />
    </div>
  );
};

export default DonationEdu;

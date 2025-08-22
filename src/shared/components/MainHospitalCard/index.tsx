import React, { useEffect, useState } from "react";
import CardStyless from "../../../pages/Services/DoctarServices/Cards.module.css";
import classNames from "classnames";
import CommonStyless from "shared/utils/common.module.css";
import { useNavigate } from "react-router-dom";
import { getAll_Hospitals } from "shared/services";
import PhysiotheristsEmpty from "../PhsiotheristEmpty";
import Special from "../../../assets/images/treatment 3.png";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import NewFilterSearch from "../A_New_Components/NewFilter";
import { useInfiniteQuery } from "@tanstack/react-query";
import ServiceHeader from "../ServicesHeaders";
import RingLoader from "../RingLoader";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import { RiStethoscopeLine } from "react-icons/ri";

interface MyComponentProps {
  serviceName: string;
}

const MainHospitalCard: React.FC<MyComponentProps> = ({ serviceName }) => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();
  const [showNumber, setShowNumber] = useState(false);
  const [filteredData, setFilteredData] = useState<any[] | null>(null);

  const [filters, setFilters] = useState({
    page: 1,
    lat: "",
    long: "",
    search: "",
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["hospitals", filters],
      queryFn: ({ pageParam = 1 }) => getAll_Hospitals(pageParam, filters),
      getNextPageParam: (lastPage: any) => lastPage?.nextPage || undefined,
      staleTime: 5 * 60 * 1000,
      initialPageParam: 1,
    });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleViewMoreClick = (id: number) => {
    navigate(`/services/hospital/HospitalDetail/${id}`, {
      state: { serviceName },
    });
  };

  const hospitalData =
    data?.pages?.flatMap((page: any) => page.hospitals) || [];

  const handleSearchChange = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredData(null);
      return;
    }

    const filtered = hospitalData.filter(
      (hosp: any) =>
        hosp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hosp.location.address
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        hosp.treatments.some((treatment: string) =>
          treatment.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredData(filtered);
  };

  const hospitalsToRender = filteredData ?? hospitalData;

  return (
    <div className={classNames(CommonStyless.container)}>
      <ServiceHeader
        headingBlue={t("findTheHospital_")}
        headingOrange={t("yourTreatment")}
        content={t("docServicesContent")}
      />

      <div style={{ backgroundColor: "#FDFDFD" }}>
        <NewFilterSearch
          hideFilter={true}
          onSearchChange={handleSearchChange}
        />

        <div className={classNames(CommonStyless.mb28, CommonStyless.mt28)}>
          <div className={CardStyless.cardContainer}>
            {isLoading ? (
              <div
                style={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RingLoader color={"#0D47A1"} size={50} />
              </div>
            ) : (
              <>
                {hospitalsToRender && hospitalsToRender.length > 0
                  ? hospitalsToRender.map((hosp: any, index: number) => (
                      <div key={index} className={CardStyless.cardWrapper}>
                        <div className={CardStyless.cardImageWrapper}>
                          <img
                            src={hosp?.logo}
                            alt="card img"
                            className={CardStyless.cardImage}
                          />
                        </div>
                        <div className={CardStyless.cardBody}>
                          <div className={CardStyless.hospitalInfo}>
                            <div>
                              <p className={CardStyless.hospitalName}>
                                {hosp?.name}
                              </p>
                              <p
                                style={{ marginTop: "8px" }}
                                className={CardStyless.hospitalDesp}
                              >
                                PMC {t("verified")}
                              </p>
                              <div style={{ marginTop: "16px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <img
                                    alt="hospitalSpecial"
                                    src={Special}
                                    className={CardStyless.Iconss}
                                  />
                                  <p className={CardStyless.textIcons}>
                                    {hosp?.treatmentDoctorCount}{" "}
                                    {t("specialities")}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <FaRegClock
                                    color="#7d7d7d"
                                    className={CardStyless.Iconss}
                                  />
                                  <p className={CardStyless.textIcons}>
                                    {hosp?.openTime} - {hosp?.closeTime}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <RiStethoscopeLine
                                    color="#7d7d7d"
                                    size={20}
                                  />
                                  <p className={CardStyless.textIcons}>
                                    {hosp?.doctorCount} {t("doctors")}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* <div className={CardStyless.hospitalBottom}>
                            <div>
                              <p className={CardStyless.bed}>32 {t("beds")}</p>
                              <p className={CardStyless.bedValue}>{t("total")}</p>
                            </div>
                          </div> */}
                          </div>
                          <div style={{ border: "0.5px solid #7d7d7d" }}></div>
                          <div className={CardStyless.hospitalDetail}>
                            <p>{t("featuredTreatments")}</p>
                            <div className={CardStyless.FeaturedOuter}>
                              <ul className={CardStyless.treatmentList}>
                                {hosp?.treatments?.length > 0
                                  ? hosp.treatments
                                      .slice(0, 6)
                                      .map((treatment: string, i: number) => (
                                        <li key={i}>{treatment}</li>
                                      ))
                                  : null}
                              </ul>
                              {hosp?.treatments?.length === 0 && (
                                <p style={{ color: "#0e54a3" }}>
                                  {t("noTreatmentAdded")}
                                </p>
                              )}
                            </div>

                            <div className={CardStyless.hospitalBottom2}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "start",
                                  gap: "10px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "22px",
                                    display: "flex",
                                    alignSelf: "baseline",
                                  }}
                                >
                                  <FaLocationDot
                                    className={CardStyless.Iconss}
                                  />
                                </div>
                                <p className={CardStyless.Loaction}>
                                  {hosp?.location?.address}
                                </p>
                              </div>
                              <div className={CardStyless.fllxx}>
                                <button
                                  onClick={() => handleViewMoreClick(hosp._id)}
                                  className={CardStyless.Detail}
                                >
                                  {t("details")}
                                </button>

                                {!showNumber ? (
                                  <button
                                    className={CardStyless.call}
                                    onClick={() => setShowNumber(true)}
                                  >
                                    {t("callHelpline")}
                                  </button>
                                ) : (
                                  <p
                                    className={CardStyless.Number}
                                    dir={isRtl ? "rtl" : "ltr"}
                                  >
                                    <span
                                      style={{
                                        direction: "ltr",
                                        unicodeBidi: "embed",
                                      }}
                                    >
                                      +92-42-37885101-4
                                    </span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : !isLoading && (
                      <div
                        className={classNames(
                          CommonStyless.flx,
                          CommonStyless.flxCenter
                        )}
                        style={{ width: "100%" }}
                      >
                        <PhysiotheristsEmpty />
                      </div>
                    )}
              </>
            )}
          </div>
        </div>
      </div>

      {hasNextPage && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            className={CardStyless.loadMoreButton}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? t("loading") : t("loadMore")}
          </button>
        </div>
      )}
    </div>
  );
};

export default MainHospitalCard;

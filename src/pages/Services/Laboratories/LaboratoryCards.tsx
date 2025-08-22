import classNames from "classnames";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonStyless from "shared/utils/common.module.css";
import CardStyless from "./LabCards.module.css";
import { getUser_Laboratory } from "shared/services/UserService";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import CustomLoader from "shared/components/New_Loader/Loader";
import NewFilterSearch from "shared/components/A_New_Components/NewFilter";
import { useTranslation } from "react-i18next";
import cardbranch from "assets/images/labcardzBranches.png";
import { useDirection } from "shared/utils/DirectionContext";
import { FaRegClock } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

const LaboratoryCards = () => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const { location } = useSelector((state: any) => state?.root?.common);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showNumber, setShowNumber] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    setLoading(true);
    getList();
  }, [activeTab, currentPage]);

  const handleViewMoreClick = (data: any) => {
    navigate(`/services/laboratory/LabortoryDetail`, {
      state: data,
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const filteredLabs = data?.filter((i: any) => {
    const debounceDaata = debouncedSearch?.toLowerCase();
    return i?.name?.toLowerCase().includes(debounceDaata);
  });

  const getList = () => {
    let params = {
      page: currentPage,
      itemsPerPage,
      search: searchValue,
      lat: activeTab === "Nearby" ? location?.latitude : "",
      long: activeTab === "Nearby" ? location?.longitude : "",
      filter: activeTab?.toLowerCase(),
    };
    getUser_Laboratory(params)
      .then((res: any) => {
        setData(res.data.labs);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  return (
    <div className={classNames(CommonStyless.container, CommonStyless.mt32)}>
      <div style={{ backgroundColor: "FDFDFD" }}>
        <div
          style={
            isRtl
              ? { display: "flex", alignItems: "center" }
              : {
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }
          }
        >
          <NewFilterSearch
            onSearchChange={(v) => setSearch(v)}
            hideFilter={true}
          />{" "}
        </div>

        <div className={classNames(CommonStyless.mb28, CommonStyless.mt28)}>
          <div
            style={{
              display: "flex",
              margin: "10px 0",
              justifyContent: "flex-end",
            }}
          ></div>
          <div className={CardStyless.cardContainer}>
            {filteredLabs && data.length > 0 ? (
              filteredLabs.map((card: any, index: any) => {
                return (
                  <>
                    <div key={index} className={CardStyless.cardWrapper}>
                      <div className={classNames(CardStyless.cardboady)}>
                        <div className={CardStyless.cardImageContainer}>
                          <img
                            src={card?.logo}
                            alt="Card Logo"
                            className={CardStyless.cardImage}
                          />
                        </div>

                        <div
                          className={CardStyless.carddatacolumn}
                          style={
                            isRtl
                              ? { marginRight: "12px" }
                              : { marginLeft: "12px" }
                          }
                        >
                          <div className={classNames(CardStyless.datadetails)}>
                            <p className={CardStyless.cardname}>{card?.name}</p>
                            <p
                              style={{ marginTop: "6px" }}
                              className={CardStyless.phc}
                            >
                              PHC verfied
                            </p>

                            <div className={CardStyless.datadetailsrow}>
                              <FaRegClock
                                color="#7d7d7d"
                                className={CardStyless.cardIcon}
                              />

                              <p className={CardStyless.cardicontext}>24/7</p>
                            </div>

                            <div className={CardStyless.datadetailsrow}>
                              <img
                                src={cardbranch}
                                alt="labBranchs"
                                className={CardStyless.cardIcon}
                              />

                              <p className={CardStyless.cardicontext}>
                                {card?.subLabs?.length || "1"} {t("branches")}
                              </p>
                            </div>
                          </div>

                          <div className={CardStyless.detailbottom}>
                            <div>
                              <div className={CardStyless.bottomtext}>
                                <span> {card?.tests?.length || "0"} </span>
                                <span> {t("test")}</span>
                              </div>

                              <div className={CardStyless.cardicontext}>
                                {t("total")}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={CardStyless.secoundcolumn}>
                          <div className={CardStyless.cardsperator}></div>

                          <div className={CardStyless.secoundcolumncontent}>
                            <div>
                              <p className={CardStyless.description}>
                                {t("description")}
                              </p>

                              <div className={CardStyless.bulletWrapper}>
                                <div className={CardStyless.bulletDot}></div>
                                <p className={CardStyless.bulletText}>
                                  {card?.description ||
                                    t("descriptionNotAvailable")}
                                </p>
                              </div>
                            </div>

                            <div className={CardStyless.cardsfooter}>
                              <div className={CardStyless.cardlocation}>
                                <div
                                  style={{
                                    gap: "10px",
                                    // marginRight: "10px",
                                    display: "flex",
                                    alignSelf: "flex-start",
                                  }}
                                >
                                  <MdLocationOn color="#7d7d7d" size={20} />

                                  <div style={{ width: "80%" }}>
                                    <p className={CardStyless.bulletText}>
                                      {card?.location?.address}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className={CardStyless.cardbuttoncontainer}>
                                <button
                                  className={CardStyless.carddeialbutton}
                                  onClick={() => handleViewMoreClick(card)}
                                >
                                  {t("details")}
                                </button>
                                {!showNumber && (
                                  <button
                                    className={CardStyless.cardhelplbutton}
                                    onClick={() => setShowNumber(true)}
                                  >
                                    {t("callHelpline")}
                                  </button>
                                )}

                                {showNumber && (
                                  <p dir={isRtl ? "rtl" : "ltr"}>
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
                    </div>
                  </>
                );
              })
            ) : (
              <>
                {!loading && (
                  <div
                    className={classNames(
                      CommonStyless.flx,
                      CommonStyless.flxCenter
                    )}
                    style={{
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <div className={classNames(CommonStyless.flx)}>
                      <PhysiotheristsEmpty />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {loading && <CustomLoader />}
    </div>
  );
};

export default LaboratoryCards;

import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import drimg from "assets/images/HospitalDashboard/drimg.png";
import { TiTick, TiTimes } from "react-icons/ti";
import { features } from "process";
import { getTreatmentDetail } from "shared/services";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import RingLoader from "shared/components/RingLoader";
import { TbRefresh } from "react-icons/tb";
import TreatmentDetails from "./TreatmentandDetails";
import { useTranslation } from "react-i18next";
import DoubleButton from "shared/components/Buttons/DoubleButton";
import HospitalPackages from "pages/Hospital/Surgery_Treatments/HospitalPackages";

const SurgeryData = ({
  item,
  hospPackages,
  subCategory,
  data,
  loading,
  fetchdetail,
}: any) => {
  const { t }: any = useTranslation();
  const [search, setSearch] = useState<any>("");
  const [itemset, setItem] = useState("");

  const [showModel, setShowModel] = useState(false);
  const handleshowModel = (item: any) => {
    setItem(item);
    setShowModel((prev) => !prev);
  };

  useEffect(() => {
    fetchdetail("");
  }, [item]);

  const handleSearch = () => {
    fetchdetail(search);
  };
  const handleRefresh = () => {
    setSearch("");
    fetchdetail("");
  };

  const [activeTab, setActiveTab] = useState("Hospital Packages");

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className={classNames(commonstyle.col12, style.maincontainer)}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {loading ? (
            <div style={{ marginLeft: "32px" }}>
              <RingLoader color={"#0D47A1"} size={30} />
            </div>
          ) : (
            <TbRefresh className={style.refresh} onClick={handleRefresh} />
          )}
          <SearchFilter
            vender={false}
            search={search}
            title={t("search")}
            setSearch={setSearch}
            handleSearch={handleSearch}
          />
        </div>
        <DoubleButton
          tab1Label={"Hospital Packages"}
          tab2Label={"Doctor's Packages"}
          shift={activeTab}
          onTabChange={handleTabChange}
        />

        <div className={style.cardcontainer}>
          {activeTab === "Hospital Packages" && (
            <HospitalPackages
              hospPackages={hospPackages}
              subCategory={subCategory}
            />
          )}
          {data?.length > 0 ? (
            activeTab === "Doctor's Packages" &&
            data?.map((item: any) => {
              return (
                <div className={style.card}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className={style.drimgcontainer}>
                        <img
                          src={
                            item?.doctor?.doctorImage ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                          }
                          alt="Surgery"
                          className={style.drimg}
                        />
                      </div>
                      <div className={style.textdata}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                          }}
                        >
                          <p className={style.drname}>{item.doctor?.name}</p>

                          <div className={style.featureconatiner}>
                            <p className={style.feature}>
                              {t("featuredDoctor")}
                            </p>
                          </div>
                        </div>

                        <p className={style.pmdc}>{item.Verified}</p>
                        <div>
                          <p className={style.qualification}>
                            {item.doctor?.qualifications}
                          </p>
                        </div>
                        <div className={classNames(style.bottom)}>
                          <div>
                            <p className={style.bottomtitle}>
                              {item.doctor?.clinicExperience}
                            </p>
                            <p className={style.bottomlabel}>
                              {t("experience")}
                            </p>
                          </div>
                          <div className={style.bottomseprator}> </div>
                          <div>
                            <p className={style.bottomtitle}>
                              {item.doctor?.satisfiedPatientCount}
                            </p>
                            <p className={style.bottomlabel}>
                              {t("satisfiedPatient")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={style.innercardcontainer}>
                      <div className={style.innercard}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <p>{t("basic")}</p>
                          <p>
                            <span>RS</span> <span>{item?.totalAmount}</span>
                          </p>
                        </div>
                        <div>
                          <ul
                            style={{
                              listStyle: "none",
                              padding: 0,
                              marginTop: "12px",
                            }}
                          >
                            {Object.entries(item?.treatment).map(
                              ([key, value]: any) => {
                                return (
                                  // <></>
                                  <li
                                    key={key}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    {value ? (
                                      <TiTick
                                        color="green"
                                        style={{ marginRight: "8px" }}
                                      />
                                    ) : (
                                      <TiTimes
                                        color="red"
                                        style={{ marginRight: "8px" }}
                                      />
                                    )}
                                    <p className={style.basic}>{key}</p>
                                    {/* {key !== "other" && (
                                  )}
                                  {value !== Boolean && (
                                    <p className={style.basic}>{value}</p>
                                  )} */}
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </div>
                        <div
                          style={{
                            marginTop: "15px",
                            display: "flex",
                          }}
                        >
                          {/* <button className={style.innerbtn}>
                              {t("edit")}
                            </button> */}
                          <button
                            onClick={() => handleshowModel(item)}
                            className={style.innerbtn}
                          >
                            {t("view")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <PhysiotheristsEmpty />
            </div>
          )}
        </div>
      </div>
      {showModel && (
        <TreatmentDetails
          showModel={showModel}
          setShowModel={setShowModel}
          data={itemset}
        />
      )}
    </>
  );
};

export default SurgeryData;

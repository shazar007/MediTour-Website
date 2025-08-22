import { useEffect, useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import groupimg from "assets/images/HospitalDashboard/groupDr.png";
import { FaHospital } from "react-icons/fa6";
import PatientListData from "shared/components/HospitalNewComponents/DrConsultantPatient";
import { genList } from "shared/services";
import { useTranslation } from "react-i18next";
import TopSelectedTabs from "shared/components/A_New_Components/TopSelectedTabs";

const Doctor_Patient = (props: any) => {
  const { t }: any = useTranslation();
  const [selected, setSelected] = useState<string>("All");
  const [data, setData] = useState<any>([]);
  const [listData, setListData] = useState<any>(null);
  const hnadlePateintData = (i?: any) => {
    setListData(i);
  };
  useEffect(() => {
    fetchPatient();
  }, [selected]);
  const fetchPatient = () => {
    genList(selected?.toLowerCase())
      .then((res: any) => {
        const patients = res?.data?.patients;
        if (patients && patients.length > 0) {
          setData(patients);
          setListData(patients[0]?.patient?._id);
        } else {
          setData([]);
          setListData(null);
        }
      })
      .catch((err: any) => {
        setData([]);
        setListData(null);
      })
      .finally(() => {});
  };

  function calculateAge(dateOfBirthString: string) {
    if (!dateOfBirthString) return "Date of birth not provided";
    const [day, month, year] = dateOfBirthString.split("/").map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }

  const handleTabChange = (tab: string) => {
    console.log("Active Tab:", tab);
    setSelected(tab);
  };

  return (
    <div>
      <div className={classNames(style.container)}>
        <div className={classNames(commonstyle.col12)}>
          <p
            className={classNames(
              style.heading,
              commonstyle.mt16,
              commonstyle.mb24
            )}
          >
            {t("patientList")}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{ flexGrow: 1 }}
              className={classNames(style.selctiontabConatiner)}
            >
              <div className={classNames(classNames(style.leftside))}>
                <TopSelectedTabs
                  tabs={["All", "UpComing", "Completed"]}
                  defaultTab="All"
                  onTabChange={handleTabChange}
                />
              </div>
              <div className={classNames(style.cardcontainer)}>
                {data.map((card: any, index: any) => (
                  <div
                    className={`${style.card} ${
                      listData === card?.patient?._id ? style.selectedCard : ""
                    }`}
                    key={index}
                    onClick={() => hnadlePateintData(card?.patient?._id)}
                  >
                    <div className={style.cardheader}>
                      <img
                        src={
                          card?.patient?.userImage ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                        }
                        alt="userImage"
                        className={style.cardprofile}
                      />
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <FaHospital />
                        <span className={style.cardtitle}>{t("hospital")}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: "12px",
                      }}
                    >
                      <p className={style.cardname}>{card?.patient?.name}</p>
                    </div>
                    <p className={style.cardid}>
                      <span>{t("id")}:</span>
                      <span>{card?.patient?.mrNo}</span>
                    </p>
                    <div className={style.cardbottom}>
                      <p className={style.carddate}>
                        {t("age")}: {calculateAge(card.patient?.dateOfBirth)}{" "}
                        {t("years")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={classNames(style.maincontainer)}>
              <div>
                {listData ? (
                  <>
                    <PatientListData patientId={listData} />
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      margin: "auto 0",
                    }}
                  >
                    <img
                      src={groupimg}
                      alt="groupimg"
                      className={classNames(style.drimg)}
                    />
                    <p className={style.Patient} style={{ marginTop: "16px" }}>
                      {t("noPatient")}
                    </p>
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

export default Doctor_Patient;

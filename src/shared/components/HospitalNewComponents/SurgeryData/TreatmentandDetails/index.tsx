import React, { useEffect, useRef } from "react";
import { Modal } from "@mui/material";
import classNames from "classnames";
import style from "./style.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { TiTick, TiTimes } from "react-icons/ti";
import { useTranslation } from "react-i18next";

interface Props {
  showModel: any;
  setShowModel: any;
  data?: any;
}
const TreatmentDetails: React.FC<Props> = ({
  showModel,
  setShowModel,
  data,
}) => {

  const {t} : any = useTranslation();
  const modalContentRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        setShowModel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const item = [
    {
      id: 1,
      label: "The bill includes a fee for each visit by the doctor.",
      status: true,
    },

    {
      id: 2,
      label: "Ac room is provided for the patient",
      status: true,
    },
    {
      id: 3,
      label: "Medicine are not included.",
      status: false,
    },

    {
      id: 2,
      label: "Lab test are not included",
      status: false,
    },
  ];

  
  return (
    <Modal
      open={showModel}
      onClose={() => setShowModel(false)}
      aria-describedby="modal-modal-description"
    >
      <div className={style.modal}>
        <div className={style.modalContent} ref={modalContentRef}>
          <div className={style.innerContent}>
            <div className={style.heder}>
              <p className={style.heading}>{t("treatmentDetails")}</p>

              <div
                onClick={() => setShowModel(false)}
                style={{ cursor: "pointer" }}
              >
                <IoCloseSharp size={24} />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0 12px",
                alignItems: "center",
              }}
            >
              <p className={style.drname}>{data?.doctor?.name}</p>

              <div className={style.featureconatiner}>
                <p className={style.feature}>{t("featuredDoctor")}</p>
              </div>
            </div>

            <p className={style.pmdc}>
              {data?.doctor?.hasPMDCNumber ? t("pmdcVerified") : ""}
            </p>

            <p className={style.qualification}>
              {data?.doctor?.qualifications}
            </p>

            <div className={style.bottomseprator}></div>

            <div
              style={{
                marginTop: "36px",
              }}
            >
              <div>
                <p
                  className={style.drname}
                  style={{
                    marginBottom: "16px",
                  }}
                >
                  {t("packageInclude")}
                </p>

                {Object.entries(data?.treatment).map(([key, value]: any) => {
                  if (key === "hospitalization" && typeof value === "object") {
                    return Object.entries(value).map(
                      ([subKey, subValue]: any) => (
                        <p
                          key={subKey}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "16px",
                          }}
                        >
                          {subValue ? (
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
                          <p className={style.label}>
                            {subKey === "ac"
                              ? "AC Room"
                              : subKey === "nonac"
                              ? "Non-AC Room"
                              : "Hospital Ward"}
                          </p>
                        </p>
                      )
                    );
                  } else {
                    return (
                      <p
                        key={key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "16px",
                        }}
                      >
                        {value ? (
                          <TiTick
                            color="green"
                            style={{ marginRight: "8px" }}
                          />
                        ) : (
                          <TiTimes color="red" style={{ marginRight: "8px" }} />
                        )}
                        <p className={style.label}>{key}</p>
                      </p>
                    );
                  }
                })}
              </div>
            </div>

            {data?.treatment?.other && (
              <div style={{ marginTop: "36px" }}>
                <p
                  className={style.label}
                  style={{ marginLeft: "15px", marginBottom: "5px" }}
                >
                  {t("note")}
                </p>
                <div className={style.noteContainer}>
                  <p className={style.label}>{data?.treatment?.other}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TreatmentDetails;

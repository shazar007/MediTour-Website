import React, { useState } from "react";
import CardStyless from "./doctorCard.module.css";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import { MdLocationOn } from "react-icons/md";

export default function Doctor_Card({ data, goToDetails }: any) {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();

  // console.log("data", data);
  const navigate = useNavigate();
  const handlegoDocDetail = () => {
    // navigate("/services/doctor/DoctorDetail", { state: data });
    goToDetails();
  };
  const availableDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "saturday",
    "Sunday",
  ];
  return (
    <div>
      <div className={CardStyless.DoctorCard}>
        <div className={CardStyless.DoctoriMgOuter}>
          <img
            alt="Profile"
            src={
              data?.doctorImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
            }
            className={CardStyless.DoctoriMg}
            onError={(e) =>
              (e.currentTarget.src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU")
            }
          />
        </div>
        <div className={CardStyless.Carddbody}>
          <div
            className={
              isRtl ? CardStyless.RtlDoctorInfo : CardStyless.DoctorInfo
            }
          >
            {/* Doctor's Details at the Top */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <p className={CardStyless.DoctorName}>{data?.name}</p>
                {/* <p className={CardStyless.Featured}>Featured Doctor</p> */}
              </div>
              <p className={CardStyless.verified}>PMDC {t("verified")}</p>
              <p className={CardStyless.qualification}>
                {data?.qualifications}
              </p>
            </div>

            {/* Last Section (Experience & Satisfied Patients) - This moves to the baseline */}
            <div className={CardStyless.DoctorBottom}>
              <div>
                <p className={CardStyless.FontA}>
                  {data?.clinicExperience} {t("years")}
                </p>
                <p className={CardStyless.FontB}>{t("experience")}</p>
              </div>
              {/* <div
                style={{
                  border: "0.5px solid #7d7d7d",
                  height: "30px",
                }}
              ></div>
              <div>
                <p className={CardStyless.FontA}>96% (160)</p>
                <p className={CardStyless.FontB}>Satisfied Patient</p>
              </div> */}
            </div>
          </div>

          <div className={CardStyless.border}></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "100%",
            }}
            className={CardStyless.w100}
          >
            <div>
              <p className={CardStyless.DoctorName}>{t("schedule")}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginTop: "16px",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
                className={classNames(
                  CardStyless.w75,
                  CardStyless.justifystart,
                  CardStyless.w80
                )}
              >
                {availableDays.map((dayOfWeek: string, index: number) => {
                  // Find matching availability object for the current day
                  const matchingAvailability =
                    data?.availability?.availability.find(
                      (item: any) => item.dayOfWeek === index
                    );

                  return (
                    <Tooltip
                      key={index}
                      PopperProps={{
                        sx: { ".MuiTooltip-tooltip": { bgcolor: "#0e54a3" } },
                      }}
                      title={
                        <>
                          <Typography sx={{ fontSize: "12px" }}>
                            Morning:{" "}
                            {matchingAvailability?.morning?.startTime || "--"} -{" "}
                            {matchingAvailability?.morning?.endTime || "--"}
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            Evening:{" "}
                            {matchingAvailability?.evening?.startTime || "--"} -{" "}
                            {matchingAvailability?.evening?.endTime || "--"}
                          </Typography>
                        </>
                      }
                      arrow
                    >
                      <button className={CardStyless.Schedulecard}>
                        {dayOfWeek}
                      </button>
                    </Tooltip>
                  );
                })}
                {/* {data?.availability ? (
                  availableDays.map((dayOfWeek: string, index: number) => {
                    // Find matching availability object for the current day
                    const matchingAvailability =
                      data?.availability?.availability.find(
                        (item: any) => item.dayOfWeek === index
                      );

                    return (
                      <Tooltip
                        key={index}
                        PopperProps={{
                          sx: { ".MuiTooltip-tooltip": { bgcolor: "#0e54a3" } },
                        }}
                        title={
                          <>
                            <Typography sx={{ fontSize: "12px" }}>
                              {t("morning")}:{" "}
                              {matchingAvailability?.morning?.startTime || "--"}{" "}
                              - {matchingAvailability?.morning?.endTime || "--"}
                            </Typography>
                            <Typography sx={{ fontSize: "12px" }}>
                              {t("evening")}:{" "}
                              {matchingAvailability?.evening?.startTime || "--"}{" "}
                              - {matchingAvailability?.evening?.endTime || "--"}
                            </Typography>
                          </>
                        }
                        arrow
                      >
                        <button className={CardStyless.Schedulecard}>
                          {dayOfWeek}
                        </button>
                      </Tooltip>
                    );
                  })
                ) : (
                  <div className={CardStyless.NoAvaible}>
                    <p>{t("doctorNotAvailable")}</p>
                  </div>
                )} */}
              </div>
            </div>
            <div
              className={classNames(CardStyless.flxBetween, CardStyless.mt16)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                  gap: "12px",
                  alignSelf: "baseline",
                }}
                className={CardStyless.w_400}
              >
                <MdLocationOn color="#7d7d7d" size={24} />
                <p className={CardStyless.locationss}>
                  {data?.location?.address}
                </p>
              </div>
              <button
                onClick={handlegoDocDetail}
                className={CardStyless.BookBtn}
              >
                {" "}
                {t("bookAppointment")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

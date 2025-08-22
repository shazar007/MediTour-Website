import classNames from "classnames";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";
import { useEffect, useState } from "react";
import React from "react";
import style from "./PhysioDashboard.module.css";
import commonstyles from "shared/utils/common.module.css";
import { DoctGraphDETAILSUpperPortion } from "shared/services/DoctorService";
import Pending from "assets/images/005-syringe.png";
import Appoint from "assets/images/Frameapp.png";
import wating from "assets/images/hugeicons_patient.png";
import cured from "assets/images/Frame 1597882487.png";
import { useQuery } from "@tanstack/react-query";
import { Doc_Appointment } from "pages/Doctor/Appointment";
import CustomLoader from "../New_Loader/Loader";
import { useTranslation } from "react-i18next";
import AuthCode, { AuthCodeRef } from "react-auth-code-input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../Modal";
import RingLoader from "../RingLoader";
import { set_query } from "shared/redux";
import { acceptInvitationHospital } from "shared/services";

function Doctor_Dashboard() {
  const { user, query, systemType } = useSelector(
    (state: any) => state.root.common
  );
  const { t, i18n }: any = useTranslation();
  const [open, setOpen] = useState(false);
  const AuthInputRef = React.useRef<AuthCodeRef>(null);

  const [upcoming_appointment, set_upcoming_appointment] = useState<any>({});
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const [selectedDur, setSelectedDur] = useState("today");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["DoctorDashBoard", selectedDur],
    queryFn: () => DoctGraphDETAILSUpperPortion(selectedDur),
    staleTime: 5 * 60 * 1000,
  });
  let DashDoc = data?.data;

  const handleOnChange = (res: string) => {
    setCode(res);
  };
  const onReject = () => {
    setOpen(false);
    dispatch(set_query(null));
    navigate(`/${systemType}/dashboard`);
  };

  const fetch_dashboard_details = (dur: string) => {
    setLoading(true);
    DoctGraphDETAILSUpperPortion(dur)
      .then((res: any) => {
        set_upcoming_appointment(res?.data?.upcomingAppointment);
      })
      .catch((err: any) => { })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetch_dashboard_details(selectedDur);
  }, []);
  const hospitalName = searchParams.get("hospitalName");
  const id = searchParams.get("hospitalId");
  const companyId = searchParams.get("companyId");
  const companyName = searchParams.get("companyName");
  const departmentId = searchParams.get("departmentId");

  useEffect(() => {
    const hospitalId = searchParams.get("hospitalId");
    const companyId = searchParams.get("companyId");
    if (companyId || hospitalId || query) {
      setOpen(true);
    }
  }, [query, searchParams]);

  const handleAccepet = () => {
    setLoading(true);
    let params = {
      email: user?.email,
      type: user?.doctorKind,
      code: code,
      ...(departmentId && { departmentId: departmentId }),
      ...(query?.departmentId && { departmentId: query?.departmentId }),
      ...(companyId && { docCompanyId: companyId }),
      ...(id && { hospitalId: id }),
      ...(query?.companyId && { docCompanyId: query?.companyId }),
      ...(query?.hospitalId && { hospitalId: query?.hospitalId }),
    };

    acceptInvitationHospital(params)
      .then((res: any) => {
        notifySuccess("Accepet SuccessFully");
        setOpen(false);
        dispatch(set_query(null));
        navigate(`/${systemType}/dashboard`);
      })
      .catch((err: any) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const name = companyId ? companyName : hospitalName;
  const sanitizedHospitalName = name?.trim()?.replace(/[)}]/g, "");
  return (
    <>
      <div className={classNames(commonstyles.col12)}>
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? commonstyles.pl36
              : commonstyles.pr36
          }
        >
          <div>
            {isLoading ? (
              <CustomLoader />
            ) : (
              <div className={classNames(style.Card_Wrapper)}>
                <div className={style.card_Doc}>
                  <div style={{ gap: "6px" }} className={style.flx}>
                    <img
                      src={Pending}
                      alt="pending"
                      className={style.Card_Icon}
                    />
                    <div>
                      <p className={style.Card_Values}>
                        {DashDoc?.patientCount}
                      </p>
                      <p className={style.Card_Label}>{t("patients")}</p>
                    </div>
                  </div>
                </div>
                <div className={style.card_Doc}>
                  <div style={{ gap: "6px" }} className={style.flx}>
                    <img
                      src={Appoint}
                      alt="appoint"
                      className={style.Card_Icon}
                    />
                    <div>
                      <p className={style.Card_Values}>
                        {DashDoc?.appointmentCount}
                      </p>
                      <p className={style.Card_Label}>{t("appointments")}</p>
                    </div>
                  </div>
                </div>
                <div className={style.card_Doc}>
                  <div style={{ gap: "6px" }} className={style.flx}>
                    <img
                      src={wating}
                      alt="waiting"
                      className={style.Card_Icon}
                    />
                    <div>
                      <p className={style.Card_Values}>
                        {DashDoc?.waitingPatients}
                      </p>
                      <p className={style.Card_Label}>{t("waiting")}</p>
                    </div>
                  </div>
                </div>
                <div className={style.card_Doc}>
                  <div style={{ gap: "6px" }} className={style.flx}>
                    <img src={cured} alt="cured" className={style.Card_Icon} />
                    <div>
                      <p className={style.Card_Values}>
                        {DashDoc?.curedPatientCount}
                      </p>
                      <p className={style.Card_Label}>{t("cured")}</p>
                    </div>
                  </div>
                </div>
              </div>

            )}
            <div style={{ marginTop: "24px" }}>
              <Doc_Appointment
                TableHeight="35vh"
                title={t("appoinment")}
                t={t}
              />
            </div>
          </div>
        </div>
      </div>

      <CustomModal showModal={open}>
        <div className={style.modalContainer}>
          <img
            src={
              user?.doctorImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
            }
            alt="Doctor"
            className={style.modalImage}
          />
        </div>
        <div
          className={`${style.modalName} ${user?.pmdcNumber
            ? style.modalNameWithPMDC
            : style.modalNameWithoutPMDC
            }`}
        >
          {user?.name || "Default Name"}
        </div>
        {user?.pmdcNumber && (
          <div className={style.modalPMDC}>{t("pmdcVerified")}</div>
        )}
        <div className={style.modalText}>
          {sanitizedHospitalName || query?.name}
          {t("wantToAddNetwork_")}
        </div>
        <div className={style.modalVerificationText}>{t("otpHeadDesc_")}</div>
        <AuthCode
          ref={AuthInputRef}
          allowedCharacters="numeric"
          onChange={handleOnChange}
          containerClassName={classNames(commonstyles.codeInputContainer)}
          inputClassName={classNames(commonstyles.codeInput)}
        />
        <div className={style.modalButtonContainer}>
          <button className={style.modalButtonReject} onClick={onReject}>
            {t("reject")}
          </button>
          <button
            className={style.modalButtonAccept}
            onClick={handleAccepet}
            disabled={loading}
            style={{ position: "relative" }}
          >
            {loading ? (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <RingLoader size={35} color={"#fff"} />
              </div>
            ) : (
              t("accept")
            )}
          </button>
        </div>
      </CustomModal>
    </>
  );
}

export default Doctor_Dashboard;

import { useEffect } from "react";
import style from "./style.module.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Notifications } from "shared/components";
import { Hospital_sidebarData } from "shared/utils";
import Documents from "pages/Hospital/Documents";
import PatientDetail from "pages/Hospital/PatientHistory/PatientDetail";
import PatientHistory from "pages/Hospital/PatientHistory/index";
import PrivacyPolicy from "shared/components/PrivacyPolicy";
import Chat from "shared/components/Chat";
import Profile from "shared/components/Profile";
import {
  DetailBooking,
  Doctors,
  Hospital_AppointmentDetails,
  Hospital_Appointments,
  Hospital_Dashboard,
  Hospital_Departments,
  Hospital_Payments,
  Hospital_Payments_Details,
  ManageDetails,
} from "pages";
import PaymentNavbarRoutes from "routes/Services_Routes/PaymentNavbar_Routes/PaymentNavbarRoute";
import SideBar_New from "shared/components/A_New_Components/SideBar_New";
import Hospital_Branch from "pages/Hospital/Manage_Branch";
import HospitalAppointmentBooking from "pages/Hospital/AppointmentBooking";
import Doctor_Patient from "pages/Hospital/DoctorPatient";
import SurgeryTreatmnets from "pages/Hospital/Surgery_Treatments";
import ManageDoctor from "pages/Hospital/ManageDr";
import classNames from "classnames";
import { useSelector } from "react-redux";
import Managelaboratory from "pages/Hospital/Managelaboratory";
import ManagePharmacy from "pages/Hospital/ManagePharmacy";
import HospitalSetting from "pages/Hospital/HospitalSetting";
import ManageDepartsnew from "pages/Hospital/ManageDepartsnew";
import ComapnyPayment from "pages/Hospital/ComapnyPayment";
import HospitalPaymentDetails from "pages/Hospital/HospitalPaymentDetails";
import ReScedual from "pages/Hospital/Rescedual/indes";
import ActivationCard from "shared/components/ActivationCard";
import LimitIncreasePayment from "pages/Hospital/ManageDr/LimitModel/DrlimitScreen";
import CongratsScreen from "pages/CongratsScreen";
import LanguageSelector from "shared/utils/LanguageSelector";
import { useTranslation } from "react-i18next";
import commmonStyle from "shared/utils/common.module.css";
import { useDirection } from "shared/utils/DirectionContext";

const HospitalMainRoutes = () => {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();
  const { systemType, user, token } = useSelector(
    (state: any) => state.root.common
  );
  useEffect(() => {
    if (systemType === "company") {
      navigate(`/${systemType}/ManageDoctor`);
    } else {
      navigate(`/${systemType}/dashboard`);
    }
  }, []);
  return (
    <div className={style.parents}>
      <div className={style.sidebarContainer}>
        <SideBar_New data={Hospital_sidebarData(systemType, user)} />
      </div>

      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? style.tabbarCardLange
            : style.tabbarCard
        }
        style={{ width: "100%" }}
      >
        <div
          className={classNames(
            commmonStyle.flx,
            commmonStyle.flxBetween,
            commmonStyle.flxWrap
          )}
          style={{
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <div
            className={classNames(
              commmonStyle.col10,
              commmonStyle.colmd12,
              commmonStyle.colsm12
            )}
          >
            <div
              className={
                ["ur", "ar", "ps", "pr"].includes(i18n.language)
                  ? style.tabbar1
                  : style.tabbar
              }
            >
              <div
                style={{
                  marginBottom: "26px",
                  gap: "4px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className={
                    ["ur", "ar", "ps", "pr"].includes(i18n.language)
                      ? style.welcomeText2
                      : style.welcomeText
                  }
                >
                  {t("welcome")}
                </div>
                <div className={style.mainText}>
                  {user?.name} {`(${t("mainBranch")})`}
                </div>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              commmonStyle.col3,
              commmonStyle.colmd12,
              commmonStyle.colsm12
            )}

            // className={style.gap32}
          >
            <div
              style={
                isRtl
                  ? {
                      // transform: "rotate(360deg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      width: "100%",
                      gap: "30px",
                    }
                  : {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      width: "100%",
                      gap: "30px",
                    }
              }
            >
              <LanguageSelector />

              <Notifications />

              <div className={style.greenTourism}>
                <img
                  src={user?.logo}
                  style={{ width: "100%", height: "100%" }}
                  alt="GreenLogo"
                />
              </div>
            </div>
          </div>
        </div>
        {user?.paidActivation === true ? null : <ActivationCard />}

        <Routes>
          <Route
            path={`/${systemType}/dashboard`}
            element={<Hospital_Dashboard />}
          />
          <Route
            path={`/${systemType}/doctoPatient`}
            element={<Doctor_Patient />}
          />
          <Route
            path={`/${systemType}/AppointmentBooking`}
            element={<HospitalAppointmentBooking />}
          />
          <Route
            path={`/${systemType}/SurgeryTreatmnets`}
            element={<SurgeryTreatmnets />}
          />
          <Route
            path={`${systemType}/Managelaboratory`}
            element={<Managelaboratory />}
          />
          <Route
            path={`${systemType}/ManagePharmacy`}
            element={<ManagePharmacy />}
          />
          <Route
            path={`${systemType}/HospitalSetting`}
            element={<HospitalSetting />}
          />
          <Route path={`/DetailBooking`} element={<DetailBooking />} />
          {/* ............ */}
          <Route
            path={`/${systemType}/ManageDoctor`}
            element={<ManageDoctor />}
          />
          <Route
            path={`/${systemType}/LimitIncreasePayment`}
            element={<LimitIncreasePayment />}
          />
          <Route
            path={`/${systemType}/Departments`}
            element={<ManageDepartsnew />}
          />
          <Route
            path={`/${systemType}/ComapnyPayment`}
            element={<ComapnyPayment />}
          />
          <Route
            path={`/${systemType}/PaymentDetails`}
            element={<HospitalPaymentDetails />}
          />
          <Route
            path={`/${systemType}/departments`}
            element={<Hospital_Departments />}
          />
          <Route path={`/${systemType}/branch`} element={<Hospital_Branch />} />
          <Route path={`/${systemType}/doctors`} element={<Doctors />} />
          <Route
            path={`/${systemType}/appointment`}
            element={<Hospital_Appointments />}
          />
          <Route
            path={`/${systemType}/patienthistory`}
            element={<PatientHistory />}
          />
          <Route
            path={`/${systemType}/patientsDetails/:id`}
            element={<PatientDetail />}
          />
          <Route
            path={`/${systemType}/appointmentDetails`}
            element={<Hospital_AppointmentDetails />}
          />
          <Route path={`/${systemType}/documents`} element={<Documents />} />
          <Route
            path={`/${systemType}/payments`}
            element={<Hospital_Payments />}
          />
          <Route
            path={`/${systemType}/paymentDetails`}
            element={<Hospital_Payments_Details />}
          />
          <Route
            path={`/${systemType}/setting`}
            element={<HospitalSetting />}
          />
          <Route path={`/${systemType}/privacy`} element={<PrivacyPolicy />} />
          <Route path="chat/message" element={<Chat />} />
          <Route path="/profile" Component={Profile} />
          <Route
            path={`/${systemType}/paymentDetail`}
            element={<PaymentNavbarRoutes />}
          />
          <Route path="/congratsScreen" element={<CongratsScreen />} />
          <Route path={`/appointment/detail`} element={<ReScedual />} />
          <Route
            path={`/manageepartments/detail`}
            element={<ManageDetails />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default HospitalMainRoutes;

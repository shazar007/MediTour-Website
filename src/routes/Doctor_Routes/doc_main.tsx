import { Route, Routes, useLocation } from "react-router-dom";
import { Notifications } from "shared/components";
import { Dotor_sidebarData, Paramedicr_sidebarData } from "shared/utils";
import {
  AddTreatment,
  AvailabilityCategory,
  DoctorAppointmentDetails,
  DoctorAppointments,
  DoctorAvailability,
  DoctorAvailabilityDetail,
  DoctorDashboard,
  DoctorHospitalAvailability,
  DoctorPatientHistory,
  DoctorPatientHistoryDetails,
  DoctorPaymentDetails,
  DoctorPayments,
  DoctorProfile,
  DoctorTreatments,
  ParamedicDashboard,
  Room,
} from "pages";
import { useSelector } from "react-redux";
import PaymentNavbarRoutes from "routes/Services_Routes/PaymentNavbar_Routes/PaymentNavbarRoute";
import SideBar_New from "shared/components/A_New_Components/SideBar_New";
import style from "./mainDoctor.module.css";
import LanguageSelector from "shared/utils/LanguageSelector";
import { useTranslation } from "react-i18next";
const Doc_Main_Routes = (props: any) => {
  const { t, i18n }: any = useTranslation();
  const { systemType, user, startCall } = useSelector(
    (state: any) => state.root.common
  );

  const location = useLocation();
  return (
    <div className={style.parents}>
      <div className={style.sidebarContainer}>
        {systemType === "paramedic" ? (
          <SideBar_New data={Paramedicr_sidebarData(systemType, user)} />
        ) : location.pathname === "/Meeting/Room" ||
          startCall === true ? null : (
          <SideBar_New data={Dotor_sidebarData(systemType, user)} />
        )}
      </div>
      <div className={style.tabbarCard} style={{ width: "100%" }}>
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? style.tabbar1
              : style.tabbar
          }
        >
          <div
            style={{
              marginBottom: "16px",
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
            <div className={style.mainText}>Dr. {user?.name}</div>
          </div>
          <div
            className={style.gap32}
            style={{ display: "flex", alignItems: "center" }}
          >
            <LanguageSelector />

            <div
              className={style.gap32}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Notifications />
              <div className={style.greenTourism}>
                <img
                  alt="user_doctor_image"
                  src={user?.doctorImage}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <Routes>
          <Route
            path={`/${systemType}/dashboard`}
            element={<DoctorDashboard />}
          />
          <Route
            path="/paramedicStaff/dashboard"
            element={<ParamedicDashboard />}
          />
          <Route path={`Meeting/Room`} element={<Room />} />

          <Route
            path="/paramedicStaff/availabilityCategory"
            element={<AvailabilityCategory />}
          />
          <Route
            path={`/${systemType}/availability`}
            element={<DoctorAvailability />}
          />
          <Route
            path={`/${systemType}/treatments`}
            element={<DoctorTreatments />}
          />
          <Route
            path={`/${systemType}/addTreatment`}
            element={<AddTreatment />}
          />
          <Route
            path={`/${systemType}/appointments`}
            element={<DoctorAppointments />}
          />
          <Route
            path={`/${systemType}/appointmentDetails`}
            element={<DoctorAppointmentDetails />}
          />
          <Route
            path={`/${systemType}/availability/Clinic`}
            element={<DoctorAvailabilityDetail />}
          />
          <Route
            path={`/${systemType}/availability/inHouse`}
            element={<DoctorAvailabilityDetail />}
          />
          <Route
            path={`/${systemType}/availability/hospital`}
            element={<DoctorHospitalAvailability />}
          />
          <Route
            path={`/${systemType}/availability/hospital/detail`}
            element={<DoctorAvailabilityDetail />}
          />
          <Route
            path={`/${systemType}/availability/videoConsultancy`}
            element={<DoctorAvailabilityDetail />}
          />
          <Route
            path={`/${systemType}/patientHistory`}
            element={<DoctorPatientHistory />}
          />
          <Route
            path={`/${systemType}/patientHistory/details`}
            element={<DoctorPatientHistoryDetails />}
          />
          <Route
            path={`/${systemType}/payments`}
            element={<DoctorPayments />}
          />
          <Route
            path={`/${systemType}/paymentDetails`}
            element={<DoctorPaymentDetails />}
          />
          <Route
            path={`/${systemType}/paymentDetail`}
            element={<PaymentNavbarRoutes />}
          />

          <Route
            path={`/${systemType}/doctorProfile`}
            element={<DoctorProfile />}
          />
        </Routes>
      </div>{" "}
    </div>
  );
};

export default Doc_Main_Routes;

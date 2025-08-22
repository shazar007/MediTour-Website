import { Routes, Route } from "react-router-dom";
import DoctorRoutes from "./Doctour_Routes/DoctorRoutes";
import HospitalRoutes from "./Doctour_Routes/HospitalRoutes";
import AmbulanceRoute from "./Ambulance_Routes/AmbulanceRoute";
import DonationRoutes from "./Donation_Routes/DonationRoutes";
import RentaCarRoutes from "./RentaCar_Routes/RentaCarRoutes";
import PharmacyRoutes from "./Pharmacy_Routes/PharmacyRoute";
import LaboratoriesRoute from "./Laboratory_Routes/LabouratoryRoute";
import HotelRoutes from "./Hotel_Routes/HotelRoutes";
import PaymentNavbarRoutes from "./PaymentNavbar_Routes/PaymentNavbarRoute";
import MyAppointmentRoute from "./MyAppointmnet_Routes/MyAppointmentRoute";
import MyAppointmentDetailRoute from "./MyAppointmentDetail_Route/MyAppointmentDetailRoute";
import MyAppointmentPrescriptionRoute from "./MyAppointmentRecordPrescription_Route/MyAppointmentRecordPrescriptionRoute";
import MyOrderRoute from "./MyOrder_Routes/MyOrderRoute";
import MyProfileNavbarRoute from "./MyProfileNavbar_Routes/MyProfileNavbarRoute";
import MyBookingHotelRoutes from "./BookingHotel_Routes/BookingHotelRoute";
import MyBookingHotelDetailRoute from "./BookingHotelDetail_Routes/BookingHotelDetailRoute";
import TravelRoutes from "./Travel_Routes/TravelRoutes";
import MyRequestRoute from "./RequestRoute.tsx";
import ParamedicStaffRoute from "./ParamedicStaff_Routes";
import InsuranceRoutes from "./Insurance_Routes/InsuranceRoutes";
import FavoritesRoutes from "./UserFavorites/FavoritesRoutes";
import HomeServicesRoutes from "./HomeServices_Routes/HomeServicesRoutes";
import { Room } from "pages";
import UserDetails from "shared/components/A_New_Components/GenericUserDetails";

const ServiceRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="doctor/*" element={<DoctorRoutes />} />
        <Route path="homeService/*" element={<HomeServicesRoutes />} />
        <Route path="hospital/*" element={<HospitalRoutes />} />
        <Route path="ambulance/*" element={<AmbulanceRoute />} />
        <Route path="donation/*" element={<DonationRoutes />} />
        <Route path="pharmacy/*" element={<PharmacyRoutes />} />
        <Route path="rentacar/*" element={<RentaCarRoutes />} />
        <Route path="laboratory/*" element={<LaboratoriesRoute />} />
        <Route path="hotel/*" element={<HotelRoutes />} />
        <Route path="myappointment/*" element={<MyAppointmentRoute />} />
        <Route path="Detail/*" element={<MyAppointmentDetailRoute />} />
        <Route
          path="Prescription/*"
          element={<MyAppointmentPrescriptionRoute />}
        />
        <Route path={`Meeting/Room`} element={<Room />} />
        <Route path="orderHistory/*" element={<MyOrderRoute />} />
        <Route path="/myProfile*" element={<MyProfileNavbarRoute />} />
        <Route path="/booking*" element={<MyBookingHotelRoutes />} />
        <Route
          path="/bookingHotelDetail*"
          element={<MyBookingHotelDetailRoute />}
        />
        <Route path="ambulance/*" element={<AmbulanceRoute />} />
        <Route path="donation/*" element={<DonationRoutes />} />
        <Route path="pharmacy/*" element={<PharmacyRoutes />} />
        <Route path="laboratory/*" element={<LaboratoriesRoute />} />
        <Route path="hotel/*" element={<HotelRoutes />} />
        <Route path="paymentDetail/*" element={<PaymentNavbarRoutes />} />
        <Route path="ambulance/*" element={<AmbulanceRoute />} />
        <Route path="donation/*" element={<DonationRoutes />} />
        <Route path="pharmacy/*" element={<PharmacyRoutes />} />
        <Route path="laboratory/*" element={<LaboratoriesRoute />} />
        <Route path="hotel/*" element={<HotelRoutes />} />
        <Route path="travel/*" element={<TravelRoutes />} />
        <Route path="paramedicstaff/*" element={<ParamedicStaffRoute />} />
        <Route path="insurance/*" element={<InsuranceRoutes />} />
        <Route path="favorite/*" element={<FavoritesRoutes />} />
        <Route path="Detail/*" element={<MyAppointmentDetailRoute />} />
        <Route
          path="Prescription/*"
          element={<MyAppointmentPrescriptionRoute />}
        />
        <Route path="orderHistory/*" element={<MyOrderRoute />} />
        <Route path="/myProfile*" element={<MyProfileNavbarRoute />} />
        <Route path="/myRequest*" element={<MyRequestRoute />} />
        <Route path="/userDetails*" element={<UserDetails />} />
      </Routes>
    </>
  );
};

export default ServiceRoutes;

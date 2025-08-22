import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AdminMenu } from "shared/utils";
import AdminSidebar from "./Components/Sidebar";
import AdminHome from "./Adminhome";
import AdminRequest from "./AdminRequest";
import AdminOPD from "./AdminOPD";
import AdminAppointment from "./AdminAppointments";
import AdminOrder from "./AdminOrder";
import AdminBooking from "./AdminBooking";
import AdminDonation from "./AdminDonation";
import AdminPayments from "./AdminPayments";
import RequestDetail from "./AdminRequest/RequestDetail";
import OPDdetail from "./AdminOPD/OPDdetail";
import AppointmentDetail from "./AdminAppointments/appointmentDetail";
import Logout from "./Logout";
import AdLabOrderDetail from "./AdminOrder/AdminLabOrder/AdLabOrderDetail";
import AdPharmacyOrderDetail from "./AdminOrder/AdminPharmacyOrder/AdPharmacyDetail";
import HotelDetail from "./AdminBooking/Hotel/hotelDetail";
import RentACardetail from "./AdminBooking/RentaCar/RentACardetail";
import InsuranDetail from "./AdminBooking/AdminInsurance/insuranceDetail";
import DonationDetail from "./AdminDonation/donationDetail";
import AmblanceDetail from "./AdminBooking/AdminAmblance/AmblanceDetail";
import AdminpaymentDetail from "./AdminPayments/AdminpaymentDetail";
import AdminUser from "./AdminUsers";
import Laboratories from "./AdminUsers/Vender/Laboratories";
import Paymentmodule1 from "./AdminPayments/Paymentmodule1";
import InsurancePaymentDetails from "./AdminPayments/Paymentmodule1/InsurancePayment/InsurancePaymentDetails";
import HotelPaymentDetail from "./AdminPayments/Paymentmodule1/HotelPayments/HotelPayemtDetail";
import TravelFlightPaymentDetail from "./AdminPayments/Paymentmodule1/Travelpayment/TravelFlightPaymentDetail";
import TravelTourPaymentDetail from "./AdminPayments/Paymentmodule1/Travelpayment/TravelTourPaymentDetail";
import BitsDetails from "./AdminPayments/Paymentmodule1/Travelpayment/BitsDetails";
import RentaCarPaymentDetail from "./AdminPayments/Paymentmodule1/RentACarPayments/RentaCarPaymentDetail";
import PaymentsOrders from "./AdminPayments/PaymentOrder";
import PharmacyPaymentsDetails from "./AdminPayments/PaymentOrder/PharmacyPayments/PharmacyPaymentsDetails";
import PaymentAppointment from "./AdminPayments/PaymentAppointment";
import PaymentAptDoctorDetails from "./AdminPayments/PaymentAppointment/PaymentAptDoctor/PaymentAptDoctorDetails";
import PaymentAptHospitalDetails from "./AdminPayments/PaymentAppointment/PaymentAptHospital/PaymentAptHospitalDetails";
import PaymentDonationDetails from "./AdminPayments/PaymentsDonation/PaymentDonationDetails";
import PaymentDonation from "./AdminPayments/PaymentsDonation";
import AmbulancePaymentsDetails from "./AdminPayments/Paymentmodule1/AmbulancePayments/AmbulancePaymentsDetails";
import BookingTourDetails from "./AdminBooking/BookingTravel/BookingTourDetails";
import BookingFilghtDetails from "./AdminBooking/BookingTravel/BookingFilghtDetails";
import ProceedPayment from "./AdminPayments/ProceedPayment";
import LabPaymentDetails from "./AdminPayments/PaymentOrder/LaboratoryPayments/LabPaymentDetails";
import PaymentDonationComplete from "./AdminPayments/PaymentComplete/PaymentDonationComplete";
import PaymentBookingComplete from "./AdminPayments/PaymentComplete/PaymentBookingComplete";
import PaymentDetailComplete from "./AdminPayments/PaymentComplete/PaymentDetail";
import PaymentAptComplete from "./AdminPayments/PaymentComplete/PaymentApptComplete";
import PaymentOrderComplete from "./AdminPayments/PaymentComplete/PaymentOrderComplete";
import VendorDetail from "./AdminUsers/Vender/VenderDetail";
import Percentage from "./Percentage";
import Hotel_Booking_Requests from "./AdminBooking/Hotel/bookingRequests";
import Hotel_Request_Detail from "./AdminBooking/Hotel/bookingRequestDetails";
import PharmacyRequest from "./PharmacyRequest/PharmacyRequest";
import PharmacyReqDetail from "./PharmacyRequest/PharmacyReqDetail";
import UserActivation from "./UserActivation";

const AdminMianRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin/dashboard");
  }, []);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "auto",
        backgroundColor: "#f8f8f8",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: "0px",
          height: "100vh",
          // margin: "0 20px",
        }}
      >
        <AdminSidebar menuItem={AdminMenu} />
      </div>

      <Routes>
        <Route path="admin/dashboard" Component={AdminHome} />
        <Route path="admin/Resquests" Component={AdminRequest} />
        <Route path="admin/Resquests/patientDetail" Component={RequestDetail} />
        <Route path="admin/OPD" Component={AdminOPD} />
        <Route path="admin/OPD/Detail" Component={OPDdetail} />
        <Route path="admin/appointments" Component={AdminAppointment} />
        <Route path="admin/appointments/Detail" Component={AppointmentDetail} />
        <Route path="admin/Orders" Component={AdminOrder} />
        <Route path="admin/UserActivation" Component={UserActivation} />
        <Route
          path="admin/Orders/LabOrder/Detail"
          Component={AdLabOrderDetail}
        />
        <Route
          path="admin/Orders/PharmacyOrder/Detail"
          Component={AdPharmacyOrderDetail}
        />
        <Route
          path="admin/hotelBookingRequests"
          Component={Hotel_Booking_Requests}
        />
        <Route
          path="admin/hotelBookingRequestDetails"
          Component={Hotel_Request_Detail}
        />
        <Route
          path="/AdminPanel/AdminPharmacyrequest"
          Component={PharmacyRequest}
        />
        <Route
          path="/AdminPanel/PharmacyReqDetail"
          Component={PharmacyReqDetail}
        />
        <Route path="admin/booking" Component={AdminBooking} />
        <Route path="admin/booking/HotelDetail" Component={HotelDetail} />
        <Route path="admin/booking/RentaCArDetail" Component={RentACardetail} />
        <Route path="admin/booking/InsuranceDetail" Component={InsuranDetail} />
        <Route path="admin/booking/AmblanceDetail" Component={AmblanceDetail} />
        <Route
          path="admin/booking/Travel/flightDetail"
          Component={BookingFilghtDetails}
        />
        <Route
          path="admin/booking/Travel/Flight/BitDetails"
          Component={BitsDetails}
        />
        <Route
          path="admin/booking/Travel/TourDetail"
          Component={BookingTourDetails}
        />
        <Route path="admin/donation" Component={AdminDonation} />
        <Route path="admin/donation/Detail" Component={DonationDetail} />
        <Route path="admin/PaymentsOrders" Component={AdminPayments} />
        <Route path="admin/Payments/Detail" Component={AdminpaymentDetail} />
        <Route path="admin/Users" Component={AdminUser} />
        <Route path="admin/Users/Laboratories" Component={Laboratories} />
        <Route path="admin/Users/VendorDetail" Component={VendorDetail} />
        <Route path="admin/logout" Component={Logout} />
        <Route
          path="admin/Payments/PaymentBooking"
          Component={Paymentmodule1}
        />
        <Route
          path="admin/Payments/Travel/Flight/Details"
          Component={TravelFlightPaymentDetail}
        />
        <Route
          path="admin/Payments/Travel/Flight/BitDetails"
          Component={BitsDetails}
        />
        <Route
          path="admin/Payments/Travel/Tour/Details"
          Component={TravelTourPaymentDetail}
        />
        <Route
          path="admin/Payments/Insurance/Details"
          Component={InsurancePaymentDetails}
        />
        <Route
          path="admin/Payments/Hotel/Details"
          Component={HotelPaymentDetail}
        />
        <Route
          path="admin/Payments/Ambulance/Details"
          Component={AmbulancePaymentsDetails}
        />
        <Route
          path="admin/Payments/RentaCar/Details"
          Component={RentaCarPaymentDetail}
        />
        <Route path="admin/Payments/PaymentOrder" Component={PaymentsOrders} />
        <Route
          path="admin/Payments/ProceedPayment"
          Component={ProceedPayment}
        />
        <Route
          path="admin/Payments/PaymentOrder/laboratoryDetails"
          Component={LabPaymentDetails}
        />
        <Route
          path="admin/Payments/PaymentOrder/PharmacyDetails"
          Component={PharmacyPaymentsDetails}
        />
        <Route
          path="admin/Payments/PaymentAppointment"
          Component={PaymentAppointment}
        />{" "}
        <Route
          path="admin/Payments/PaymentAppointment/DoctorDetails"
          Component={PaymentAptDoctorDetails}
        />{" "}
        <Route
          path="admin/Payments/PaymentAppointment/HospitalDetails"
          Component={PaymentAptHospitalDetails}
        />{" "}
        <Route
          path="admin/Payments/PaymentDonation"
          Component={PaymentDonation}
        />{" "}
        <Route
          path="admin/Payments/PaymentDonation/Details"
          Component={PaymentDonationDetails}
        />
        <Route
          path="admin/Payments/PaymentDonationComplete"
          Component={PaymentDonationComplete}
        />{" "}
        <Route
          path="admin/Payments/PaymentAppointmentComplete"
          Component={PaymentAptComplete}
        />
        <Route
          path="admin/Payments/PaymentOrderComplete"
          Component={PaymentOrderComplete}
        />
        <Route
          path="admin/Payments/PaymentBookingPending"
          Component={PaymentBookingComplete}
        />
        <Route
          path="admin/Payments/PaymentComplete/Detail"
          Component={PaymentDetailComplete}
        />{" "}
        <Route path="admin/percentage" Component={Percentage} />
      </Routes>
    </div>
  );
};

export default AdminMianRoutes;

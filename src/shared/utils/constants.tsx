import {
  LuBadgePercent,
  LuCalendarPlus,
  LuClipboardList,
} from "react-icons/lu";
import { PiTestTube, PiUsers } from "react-icons/pi";
import styles from "../components/SideBar/sidebar.module.css";
import { BsCapsulePill } from "react-icons/bs";
import classNames from "classnames";
import { TbGripVertical } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import * as Yup from "yup";
import { TbUsersPlus } from "react-icons/tb";
import { IoCardOutline, IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { GoCreditCard } from "react-icons/go";
import { BsClipboardPulse } from "react-icons/bs";
import { BsFileEarmarkText } from "react-icons/bs";
import { BsCardList } from "react-icons/bs";
import { BsCalendar2Check } from "react-icons/bs";
import { BiDonateHeart, BiHomeAlt2 } from "react-icons/bi";
import { LuStethoscope } from "react-icons/lu";
import Room from "assets/images/room.png";
import setting from "assets/images/iconSetting.png";
import Booking from "assets/images/booking.png";
import Payment from "assets/images/Icon Payment New.png";
import { MdOutlinePrivacyTip, MdOutlineHelpCenter } from "react-icons/md";
import {} from "react-icons/md";
import { FaRegCalendarAlt, FaCalendarCheck } from "react-icons/fa";
import { TbNotes, TbLogout2 } from "react-icons/tb";
import { GrNotes } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import DocAppointment from "assets/images/HospitalDashboard/doctor.png";

import vendor01 from "assets/images/Vendor/01 copy.webp";
import vendor02 from "assets/images/Vendor/02 copy.webp";
import vendor03 from "assets/images/Vendor/03 copy.webp";
import vendor04 from "assets/images/Vendor/04 copy.webp";
import vendor05 from "assets/images/Vendor/05 copy.webp";
import vendor06 from "assets/images/Vendor/06 copy.webp";
import vendor07 from "assets/images/Vendor/07 copy.webp";
import vendor08 from "assets/images/Vendor/08 copy.webp";
import vendor09 from "assets/images/Vendor/09 copy.webp";
import vendor10 from "assets/images/Vendor/10 copy.webp";
import vendor11 from "assets/images/Vendor/11 copy.webp";
import vendor12 from "assets/images/Vendor/12 copy.webp";
import vendor13 from "assets/images/Vendor/13 copy.webp";
import vendor14 from "assets/images/Vendor/14 copy.webp";
import vendor15 from "assets/images/Vendor/15 copy.webp";

import reserve from "assets/images/reserve.png";
import manegBranch from "assets/images/HospitalDashboard/manageBranch.png";
import manegDoctor from "assets/images/HospitalDashboard/manegDoctor.png";
import manegLab from "assets/images/HospitalDashboard/manegLab.png";
import manegPharmacy from "assets/images/HospitalDashboard/manegPharmacy.png";
import treatmentSurgery from "assets/images/HospitalDashboard/treatmentSurgery.png";
import manegpatient from "assets/images/HospitalDashboard/manegpatient.png";
import AppointmentBooking from "assets/images/HospitalDashboard/AppointmentBooking.png";
import dashboard from "assets/images/HospitalDashboard/dashboard.png";
import department from "assets/images/HospitalDashboard/department.png";

import logo1 from "assets/companyLogo/1.webp";
import logo2 from "assets/companyLogo/2.webp";
import logo3 from "assets/companyLogo/3.webp";
import logo4 from "assets/companyLogo/4.webp";
import logo5 from "assets/companyLogo/5.webp";
import logo6 from "assets/companyLogo/6.webp";
import logo7 from "assets/companyLogo/7.webp";
import logo8 from "assets/companyLogo/8.webp";
import logo9 from "assets/companyLogo/9.webp";
import logo10 from "assets/companyLogo/10.webp";
import logo11 from "assets/companyLogo/11.webp";
import logo12 from "assets/companyLogo/12.webp";
import logo13 from "assets/companyLogo/13.webp";
import logo14 from "assets/companyLogo/14.webp";
import logo15 from "assets/companyLogo/15.webp";
import logo16 from "assets/companyLogo/16.webp";
import logo17 from "assets/companyLogo/17.webp";
import logo18 from "assets/companyLogo/18.webp";
import logo19 from "assets/companyLogo/19.webp";
import logo20 from "assets/companyLogo/20.webp";

import Test from "assets/images/test.png";
import Order from "assets/images/order.png";
import Result from "assets/images/result.png";
import Manges from "assets/images/branch.png";
import LabDash from "assets/images/labDash.png";
import VehicleDetails from "assets/images/Icon Vehicle.png";
import Rentacarhistory from "assets/images/Icon-history.png";

import Hoteldetailslider1 from "assets/images/Hotel/detailslider1.png";
import Hoteldetailslider2 from "assets/images/Hotel/detailslider2.png";

import Availability from "assets/images/calendar-icon-clock-meeting-107106062 1.png";
import Treatments from "assets/images/treatment 3.png";
import PatientHistory from "assets/images/hugeicons_patient (1).png";
import Request from "assets/images/icon Request.png";

import Tour from "assets/images/Icon Bag.png";
import Ticket from "assets/images/ion_ticket.png";

import Criteria from "assets/images/Icon Critaria.png";
import Packages from "assets/images/Icon Package.png";
import Donors from "assets/images/Icon Donors.png";

import Insurances from "assets/images/Icon Insurance.png";
import INsuranceRequest from "assets/images/insurance Request.png";
import InsuredPerson from "assets/images/Icon Insured Person.png";

import CompletedRequest from "assets/images/Icon Completed Requet.png";
import { RiStethoscopeLine } from "react-icons/ri";
export const MenuData = [
  {
    id: 0,
    title: "myAppointments",
    screen: "/services/myappointment",
    icon: FaRegCalendarAlt,
  },
  {
    id: 1,
    title: "myBookings",
    screen: "/services/booking",
    icon: FaCalendarCheck,
  },
  {
    id: 2,
    title: "myRequest",
    screen: "/services/myRequest",
    icon: TbNotes,
  },
  {
    id: 3,
    title: "orderHistory",
    screen: "/services/orderHistory",
    icon: GrNotes,
  },
  {
    id: 4,
    title: "myProfile",
    screen: "/services/myProfile",
    icon: CgProfile,
  },

  {
    id: 5,
    title: "privacyPolicy",
    screen: "/privactpolicys",
    icon: MdOutlinePrivacyTip,
  },
  {
    id: 6,
    title: "helpCenter",
    screen: "/contactUs",
    icon: MdOutlineHelpCenter,
  },
  {
    id: 7,
    title: "logout",
    icon: TbLogout2,
  },
];

export const logos_data = [
  { id: 1, source: logo1, alt: "Client 1" },
  { id: 2, source: logo2, alt: "Client 2" },
  { id: 3, source: logo3, alt: "Client 3" },
  { id: 4, source: logo4, alt: "Client 4" },
  { id: 5, source: logo5, alt: "Client 5" },
  { id: 6, source: logo6, alt: "Client 6" },
  { id: 7, source: logo7, alt: "Client 7" },
  { id: 8, source: logo8, alt: "Client 8" },
  { id: 9, source: logo9, alt: "Client 9" },
  { id: 10, source: logo10, alt: "Client 10" },
  { id: 11, source: logo11, alt: "Client 11" },
  { id: 12, source: logo12, alt: "Client 12" },
  { id: 13, source: logo13, alt: "Client 13" },
  { id: 14, source: logo14, alt: "Client 14" },
  { id: 15, source: logo15, alt: "Client 15" },
  { id: 16, source: logo16, alt: "Client 16" },
  { id: 17, source: logo17, alt: "Client 17" },
  { id: 18, source: logo18, alt: "Client 18" },
  { id: 19, source: logo19, alt: "Client 19" },
  { id: 20, source: logo20, alt: "Client 20" },
];
export const TopMenuList = [
  { id: 0, title: "home", active: "/" },
  { id: 2, title: "aboutUs", active: "/aboutUs" },
  { id: 3, title: "services", active: "/ourServices" },
  { id: 4, title: "treatments", active: "/treatment" },
  { id: 5, title: "patientGuide", active: "/patientGuide" },
  { id: 6, title: "contactUs", active: "/contactUs" },
];

export const onOpenMenuData = (t: (key: string) => string) => {
  return [
    { id: 0, title: t("home"), to: "/" },
    { id: 2, title: t("aboutUs"), to: "/aboutUs" },
    { id: 3, title: t("services"), to: "/ourServices" },
    { id: 4, title: t("treatments"), to: "/treatment" },
    { id: 5, title: t("patientGuide"), to: "/patientGuide" },
    { id: 6, title: t("contactUs"), to: "/contactUs" },
    { id: 7, title: t("joinAsProvider"), to: "/joinVender" },
    { id: 8, title: t("logout"), to: "/" },
  ];
};

//    export why people choose up
export const cardData = [
  { value: "25000+", labelKey: "patientConsultation" },
  { value: "24/7", labelKey: "medicalSupport" },
  { value: "70+", labelKey: "accreditedHospitals" },
  { value: "3500+", labelKey: "happyClients" },
  { value: "200+", labelKey: "doctorsOnpanel" },
];
export const laboratoryMenu = [
  {
    path: "laboratory/dashboard",
    name: "Dashboard",
    icon: <GrHomeRounded className={classNames(styles.menuIcons)} />,
  },
  {
    path: "laboratory/test",
    name: "Tests",
    icon: <PiTestTube className={classNames(styles.menuIcons)} />,
  },
  {
    path: "laboratory/Order",
    name: "Orders",
    icon: <TbGripVertical className={classNames(styles.menuIcons)} />,
  },
  {
    path: "laboratory/Result",
    name: "Results",
    icon: <BsCardList className={classNames(styles.menuIcons)} />,
  },
  {
    path: "laboratory/LaborteryProfile",
    name: "Profile",
    icon: <IoPersonCircleOutline className={classNames(styles.menuIcons)} />,
  },
  {
    path: "laboratory/Payment",
    name: "Payments",
    icon: <GoCreditCard className={classNames(styles.menuIcons)} />,
  },
];

//  .....................................

export const countryData = [
  {
    img: "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/TourismHomeSlider%2FProperty%201%3DDefault.webp?alt=media&token=158cc085-acce-4d03-86aa-bae93988776c",
    country: "PAKISTAN",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/TourismHomeSlider%2FProperty%201%3DDefault-4.webp?alt=media&token=fb4bf666-492e-46b4-a6ea-0a10b6871217",
    country: "TURKEY",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/TourismHomeSlider%2FProperty%201%3DDefault-2.webp?alt=media&token=32db197e-e98d-41b8-8805-4c064ad66d02",
    country: "ENGLAND",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/TourismHomeSlider%2FProperty%201%3DDefault-7.webp?alt=media&token=6afc099f-3771-4b6a-88c4-0ca2e148b18f",
    country: "CAMBODIA",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/TourismHomeSlider%2FProperty%201%3DDefault-1.webp?alt=media&token=b78a72a6-2217-4f0e-8117-83599e4dbbe6",
    country: "USA",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/TourismHomeSlider%2FProperty%201%3DDefault-3.webp?alt=media&token=b13bbdfa-862c-4cc4-aade-2d32ab1dad12",
    country: "CANADA",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/TourismHomeSlider%2FProperty%201%3DDefault-5.webp?alt=media&token=0475dbf5-f60a-435a-b7ba-b71e7804cc8d",
    country: "SPAIN",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/TourismHomeSlider%2FProperty%201%3DDefault-6.webp?alt=media&token=4782e380-0b21-4869-8913-4812627394c7",
    country: "SINGAPORE",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/TourismHomeSlider%2FProperty%201%3DDefault-8.webp?alt=media&token=5ff6de84-89cd-4f9b-a83d-5cda374329b0",
    country: "MEXICO",
  },
];

export const HotelDetailSlier = [
  { img: Hoteldetailslider2 },
  { img: Hoteldetailslider1 },
];
export const daysOfWeek: any = [
  { id: 1, day: "Sunday" },
  { id: 2, day: "Monday" },
  { id: 3, day: "Tuesday" },
  { id: 4, day: "Wednesday" },
  { id: 5, day: "Thursday" },
  { id: 6, day: "Friday" },
  { id: 7, day: "Saturday" },
];

export const Pharmaceutical_sidebarData = (systemType: any, user: any) => [
  {
    id: 1,
    label: "dashboard",
    img: LabDash,
    path: `/pharmaceutical/dashboard`,
    matchPaths: ["/pharmaceutical/dashboard"],
  },
];

export const Pharmacy_sidebarData = (systemType: any, user: any) => [
  {
    id: 1,
    label: "dashboard",
    img: LabDash,
    path: "pharmacy/dashboard",
    matchPaths: ["/pharmacy/dashboard"],
  },
  {
    id: 2,
    label: "requests",
    img: Request,
    path: "pharmacy/requests",
    matchPaths: ["/pharmacy/request", "/pharmacy/requestDetail"],
  },
  {
    id: 3,
    label: "orders",
    img: CompletedRequest,
    path: "pharmacy/orders",
    matchPaths: ["/pharmacy/orders", "/pharmacy/orderDetails"],
  },
  {
    id: 4,
    label: "payments",
    img: Payment,
    path: "pharmacy/payments",
    matchPaths: [
      "/pharmacy/payments",
      "/pharmacy/paymentDetails",
      "/pharmacy/paymentDetail",
    ],
  },
];
export const Travel_sidebarData = (systemType: any, user: any) => [
  {
    id: 1,
    label: "dashboard",
    img: LabDash,
    path: `travelAgency/dashboard`,
    matchPaths: ["/travelAgency/dashboard"],
  },
  {
    id: 2,
    label: "booking",
    img: Booking,
    path: `travelAgency/booking`,
    matchPaths: [
      "/travelAgency/booking",
      "/travelAgency/booking/BookingDetailsFlight",
    ],
  },
  {
    id: 3,
    label: "tourPackage",
    img: Tour,
    path: "travelAgency/tourPakages",
    matchPaths: [
      "/travelAgency/tourPakages",
      "/travelAgency/addTour",
      "/travelAgency/tourPakagesDetail/:id",
    ],
  },
  {
    id: 4,
    label: "ticketRequests",
    img: Ticket,
    path: "travelAgency/ticketRequests",
    matchPaths: [
      "/travelAgency/ticketRequests",
      "/travelAgency/ticketRequests/Detail",
      "/travelAgency/ticketRequests/BidsDetail",
      "/travelAgency/ticketRequests/TravelTicketshare",
      "/flights/Bid",
      "/travelAgency/addbit",
    ],
  },

  {
    id: 5,
    label: "payments",
    img: Payment,
    path: "/travelAgency/payments",
    matchPaths: ["/travelAgency/payments", "/travelagency/paymentDetails"],
  },
];
export const Ambulance_sidebarData = (systemType: any, user: any) => [
  {
    id: 1,
    label: "dashboard",
    img: LabDash,
    path: `ambulance/dashboard`,
    matchPaths: ["/ambulance/dashboard"],
  },
  {
    id: 2,
    label: "requests",
    img: Request,
    path: "ambulance/request",
    matchPaths: ["/ambulance/request", "/ambulance/request/Detail"],
  },
  {
    id: 3,
    label: "onRoute",
    img: VehicleDetails,
    path: "ambulance/onroutes",
    matchPaths: ["/ambulance/onroutes", "/ambulance/onroutes/Details"],
  },

  {
    id: 5,
    label: "payments",
    img: Payment,
    path: "ambulance/payments",
    matchPaths: ["/ambulance/payments", "/ambulance/paymentDetails"],
  },
];
export const Lab_sidebarData = (systemType: any, user: any, t: any) => [
  {
    id: 1,
    label: "dashboard",
    img: LabDash,
    path: `/laboratory/dashboard`,
  },
  {
    id: 2,
    label: "manageBranches",
    img: Manges,
    path: "/laboratory/branches",
    matchPaths: ["/laboratory/branches"],
  },
  {
    id: 3,
    label: "tests",
    img: Test,
    path: "/laboratory/tests",
    matchPaths: ["/laboratory/tests", "/laboratory/addTest", "/testDetail"],
  },
  {
    id: 4,
    label: "orders",
    img: Order,
    path: "/laboratory/orders",
    matchPaths: ["/laboratory/orders", "/laboratory/order/Detail"],
  },
  {
    id: 5,
    label: "results",
    img: Result,
    path: "/laboratory/results",
    matchPaths: ["/laboratory/results", "/laboratory/result/Detail"],
  },

  {
    id: 5,
    label: "payments",
    img: Payment,
    path: "/laboratory/payments",
    matchPaths: ["/laboratory/payments", "/laboratory/paymentDetail"],
  },
];
export const RentACar_sidebarData = (systemType: any, user: any) => [
  {
    id: 1,
    label: "dashboard",
    img: LabDash,
    path: "rentacar/dashboard",
    matchPaths: ["/rentacar/dashboard"],
  },
  {
    id: 2,
    label: "orders",
    img: Order,
    path: "rentacar/orders",
    matchPaths: ["/rentacar/orders", "/rentacar/orderDetails"],
  },
  {
    id: 3,
    label: "vehicleDetails",
    img: VehicleDetails,
    path: "rentacar/vehicleDetail",
    matchPaths: ["/rentacar/vehicleDetail", "/rentacar/vehicleDescription"],
  },
  {
    id: 4,
    label: "history",
    img: Rentacarhistory,
    path: "rentacar/history",
    matchPaths: ["/rentacar/history", "/rentacar/history/details"],
  },

  {
    id: 5,
    label: "payments",
    img: Payment,
    path: "rentacar/payments",
    matchPaths: [
      "/rentacar/payments",
      "/rentacar/paymentDetails",
      "/rentacar/paymentDetail",
    ],
  },
];
export const Dotor_sidebarData = (systemType: any, user: any) => [
  {
    id: 1,
    label: "dashboard",
    img: LabDash,
    path: `${systemType}/dashboard`,
    matchPaths: [`/${systemType}/dashboard`],
  },
  {
    id: 2,
    label: "availability",
    img: Availability,
    path: `${systemType}/availability`,
    matchPaths: [
      `/${systemType}/availability`,
      `/${systemType}/availability/Clinic`,
      `/${systemType}/availability/inHouse`,
      `/${systemType}/availability/hospital`,
      `/${systemType}/availability/hospital/detail`,
      `/${systemType}/availability/videoConsultancy`,
    ],
  },
  {
    id: 3,
    label: "treatments",
    img: Treatments,
    path: `${systemType}/treatments`,
    matchPaths: [`/${systemType}/treatments`, `/${systemType}/addTreatment`],
  },
  {
    id: 4,
    label: "appointments",
    img: DocAppointment,
    path: `${systemType}/appointments`,
    matchPaths: [
      `/${systemType}/appointments`,
      `/${systemType}/appointmentDetails`,
    ],
  },

  {
    id: 5,
    label: "patientHistory",
    img: PatientHistory,
    path: `${systemType}/patientHistory`,
    matchPaths: [
      `/${systemType}/patientHistory`,
      `/${systemType}/patientHistory/details`,
    ],
  },
  {
    id: 6,
    label: "payments",
    img: Payment,
    path: `${systemType}/payments`,
    matchPaths: [
      `/${systemType}/payments`,
      `/${systemType}/paymentDetails`,
      `/${systemType}/paymentDetail`,
    ],
  },
  //  {
  //   id: 7,
  //   label: "Setting",
  //   img: Payment,
  //   path: `${systemType}/doctorProfile`,
  // },
];
export const Paramedicr_sidebarData = (systemType: any, user: any) => [
  {
    id: 1,
    label: "requests",
    img: Request,
    path: "/paramedicStaff/dashboard",
    matchPaths: ["/paramedicStaff/dashboard"],
  },
  {
    id: 2,
    label: "completedRequests",
    img: Order,
    path: "/paramedicStaff/availabilityCategory",
    matchPaths: ["/paramedicStaff/availabilityCategory"],
  },

  {
    id: 3,
    label: "payments",
    img: Payment,
    path: `${systemType}/payments`,
    matchPaths: [
      `/${systemType}/payments`,
      `/${systemType}/paymentDetails`,
      `/${systemType}/paymentDetail`,
    ],
  },
];
export const Hospital_sidebarData = (systemType: any, user: any) => [
  ...(systemType === "company"
    ? []
    : [
        {
          id: 1,
          label: "dashboard",
          img: dashboard,
          path: `/${systemType}/dashboard`,
          matchPaths: [`/${systemType}/dashboard`],
        },
        ...(user?.mainHospitalId
          ? []
          : [
              {
                id: 2,
                label: "manageBranches",
                img: manegBranch,
                path: `/${systemType}/branch`,
                matchPaths: [`/${systemType}/branch`],
              },
            ]),
        {
          id: 3,
          label: "appointmentBooking",
          img: AppointmentBooking,
          path: `/${systemType}/AppointmentBooking`,
          matchPaths: [
            `/${systemType}/AppointmentBooking`,
            `/${systemType}/appointment`,
            `/${systemType}/appointmentDetails`,
            `/appointment/detail`,
          ],
        },
        {
          id: 4,
          label: "manageDepartments",
          img: department,
          path: `/${systemType}/departments`,
          matchPaths: [
            `/${systemType}/departments`,
            `/${systemType}/Departments`,
            `/manageepartments/detail`,
          ],
        },
      ]),

  {
    id: 5,
    label: "manageDoctors",
    img: manegDoctor,
    path: `${systemType}/ManageDoctor`,
    matchPaths: [`/${systemType}/doctors`, `/${systemType}/ManageDoctor`],
  },
  {
    id: 6,
    label: "managePatients",
    img: manegpatient,
    path: `${systemType}/doctoPatient`,
    matchPaths: [`/${systemType}/doctoPatient`],
  },

  ...(systemType === "company"
    ? []
    : [
        {
          id: 7,
          label: "treatmentsOrSurgery",
          img: treatmentSurgery,
          path: `/${systemType}/SurgeryTreatmnets`,
          matchPaths: [`/${systemType}/SurgeryTreatmnets`],
        },
        {
          id: 8,
          label: "manageLaboratory",
          img: manegLab,
          path: `/${systemType}/Managelaboratory`,
          matchPaths: [`/${systemType}/Managelaboratory`],
        },
        {
          id: 9,
          label: "managePharmacy",
          img: manegPharmacy,
          path: `/${systemType}/ManagePharmacy`,
          matchPaths: [`/${systemType}/ManagePharmacy`],
        },
        {
          id: 13,
          label: "settings",
          img: setting,
          matchPaths: [`/${systemType}/setting`],
        },
        {
          id: 14,
          label: "payment",
          img: treatmentSurgery, // payemrnt icon
          path: `${systemType}/ComapnyPayment`,
          matchPaths: [
            `/${systemType}/payments`,
            `/${systemType}/paymentDetails`,
            `/${systemType}/ComapnyPayment`,
            `/${systemType}/LimitIncreasePayment`,
            `/${systemType}/paymentDetail`,
          ],
        },
      ]),
];
export const Hotel_sidebarData = (systemType: any, t: any) => [
  {
    id: 1,
    label: "dashboard",
    img: dashboard,
    path: `${systemType}/dashboard`,
    matchPaths: [`/${systemType}/dashboard`],
  },
  {
    id: 2,
    label: "booking",
    img: Booking,
    path: "hotel/booking",
    matchPaths: ["/hotel/booking"],
  },
  {
    id: 3,
    label: "property",
    img: Room,
    path: "hotel/property",
    matchPaths: ["/hotel/property", "/hotel/addProperty"],
  },
  {
    id: 4,
    label: "hotelReservation",
    img: reserve,
    path: "hotel/reserve",
    matchPaths: ["/hotel/reserve"],
  },
  {
    id: 5,
    label: "payments",
    img: Payment,
    path: "hotel/payments",
    matchPaths: [
      "/hotel/payments",
      "/hotel/paymentDetails",
      `/${systemType}/paymentDetail`,
    ],
  },
];
export const Insurance_sidebarData = (systemType: any, user: any, t: any) => [
  {
    id: 1,
    label: "dashboard",
    img: LabDash,
    path: `insurance/dashboard`,
    matchPaths: ["/insurance/dashboard"],
  },
  {
    id: 2,
    label: "insurances",
    img: Insurances,
    path: `insurance/Category`,
    matchPaths: [
      "/insurance/Category",
      "/insurance/Health",
      "/insurance/Travel",
      "/insurance/form/parents",
      "/insurance/form/family",
      "/insurance/form/mySelf",
    ],
  },
  {
    id: 3,
    label: "requests",
    img: INsuranceRequest,
    path: `insurance/request`,
    matchPaths: ["/insurance/request", "/insurance/request/Detail"],
  },
  {
    id: 4,
    label: "insuredPerson",
    img: InsuredPerson,
    path: `insurance/insuredperson`,
    matchPaths: ["/insurance/insuredperson", "/insuredPerson/Detail"],
  },
  {
    id: 5,
    label: "payment",
    img: Payment,
    path: `insurance/payments`,
    matchPaths: [
      "/insurance/payments",
      "/insurance/paymentDetails",
      "/insurance/paymentDetail",
    ],
  },
];
export const Donation_sidebarData = (systemType: any, user: any, t: any) => [
  {
    id: 1,
    label: "dashboard",
    img: LabDash,
    path: `/donation/dashboard`,
    matchPaths: ["/donation/dashboard"],
  },
  {
    id: 2,
    label: "criteria",
    img: Criteria,
    path: "/donation/criteria",
    matchPaths: ["/donation/criteria", "/donation/criteria/Detail/:id"],
  },
  {
    id: 3,
    label: "packages",
    img: Packages,
    path: "/donation/packages",
    matchPaths: ["/donation/packages", "/donation/packagesDetails/:id"],
  },
  {
    id: 4,
    label: "donors",
    img: Donors,
    path: "/donation/donors",
    matchPaths: ["/donation/donors", "/donorDetail/:id"],
  },

  {
    id: 5,
    label: "payments",
    img: Payment,
    path: "/donation/payment",
    matchPaths: [
      "/donation/payment",
      "/donation/paymentDetails",
      "/donation/paymentDetail",
    ],
  },
];
export const DonationMenu = [
  {
    path: "donation/dashboard",
    name: "Dashboard",
    icon: <GrHomeRounded className={classNames(styles.menuIcons)} />,
  },
  {
    path: "donation/criteria",
    name: "Criteria",
    icon: <BsCardChecklist className={classNames(styles.menuIcons)} />,
  },
  {
    path: "donation/packages",
    name: "Packages",
    icon: <AiOutlineCodeSandbox className={classNames(styles.menuIcons)} />,
  },
  {
    path: "donation/donors",
    name: "Donors",
    icon: <TbUsersPlus className={classNames(styles.menuIcons)} />,
  },
  {
    path: "donation/payment",
    name: "Payment ",
    icon: <GoCreditCard className={classNames(styles.menuIcons)} />,
  },
];

export const AdminMenu = [
  {
    path: "admin/dashboard",
    name: "Dashboard",
    icon: <BiHomeAlt2 className={classNames(styles.menuIcons)} />,
  },
  {
    path: "admin/OPD",
    name: "OPD",
    icon: <LuStethoscope className={classNames(styles.menuIcons)} />,
  },
  {
    path: "admin/Resquests",
    name: "Apt. Requests",
    icon: <LuCalendarPlus className={classNames(styles.menuIcons)} />,
  },
  {
    path: "AdminPanel/AdminPharmacyRequest",
    name: "Pharmacy Requests",
    icon: <LuCalendarPlus className={classNames(styles.menuIcons)} />,
  },

  {
    path: "admin/appointments",
    name: "Appointments",
    icon: <FaRegCalendarAlt className={classNames(styles.menuIcons)} />,
  },
  {
    path: "admin/Orders",
    name: "Orders",
    icon: <TbGripVertical className={classNames(styles.menuIcons)} />,
  },
  {
    path: "admin/hotelBookingRequests",
    name: "Hotel Requests",
    icon: <BsCardList className={classNames(styles.menuIcons)} />,
  },
  {
    path: "admin/booking",
    name: "Booking",
    icon: <BsCardList className={classNames(styles.menuIcons)} />,
  },
  {
    path: "admin/donation",
    name: "Donation",
    icon: <BiDonateHeart className={classNames(styles.menuIcons)} />,
  },

  {
    path: "admin/PaymentsOrders",
    name: "Payments",
    icon: <IoCardOutline className={classNames(styles.menuIcons)} />,
  },
  {
    path: "admin/Users",
    name: "Users",
    icon: <PiUsers className={classNames(styles.menuIcons)} />,
  },
  {
    path: "admin/percentage",
    name: "Percentage",
    icon: <LuBadgePercent className={classNames(styles.menuIcons)} />,
  },
  {
    path: "admin/UserActivation",
    name: "User Activation",
    icon: <LuBadgePercent className={classNames(styles.menuIcons)} />,
  },
];

export const userInfo = (user?: any) => [
  { label: "yourName", value: user?.name || "------" },
  { label: "fatherName", value: user?.spouseOrGuardianName || "------" },
  { label: "email", value: user?.email || "------" },
  { label: "phoneNumber", value: user?.phone || "------" },
  {
    label: "dateOfBirth",
    value: user?.dateOfBirth || "------",
  },
  { label: "gender", value: user?.gender || "------" },
  { label: "nicPassport", value: user?.cnicOrPassNo || "------" },
  { label: "bloodGroup", value: user?.bloodGroup || "------" },
  { label: "qualification", value: user?.qualification || "------" },
  { label: "noOfChildren", value: user?.childCount || "------" },
  { label: "country", value: user?.country || "------" },
  { label: "city", value: user?.city || "------" },
  { label: "address", value: user?.address?.address || "------" },
];

export const socialInfo = (user?: any) => [
  { label: "facebook", value: user?.facebook || "------" },
  { label: "instagram", value: user?.instagram || "------" },
  { label: "linkedIn", value: user?.linkedin || "------" },
  { label: "youtube", value: user?.youtube || "------" },
];

export const bankInfo = (user?: any) => [
  { label: "bankName", value: user?.bankName || "------" },
  { label: "ibanNumber", value: user?.accountNumber || "------" },
  { label: "accountTitle", value: user?.accountHolderName || "------" },
  { label: "ntn", value: user?.ntnNo || "------" },
];

//..................Validations..........................//

export const speciality = [
  "Gynecologists",
  "Cosmetic Surgery",
  "Bariatric Surgery",
  "Transplants",
  "Ophthalmology",
  "Cancer",
  "Orthopedics",
  "Stem Cell",
  "Pediatrics",
  "Dental",
  "Aesthetic Treatments",
  "Psychiatry",
  "Lungs",
  "Urology",
  "Gastroenterology",
  "Neurology",
  "Fertility",
  "Nephrology",
  "E.N.T",
  "Cardiovascular & Metabolic",
];

export const Experiences = [
  "1 year",
  "2 year",
  "3 year",
  "4 year",
  "5 year",
  "6 year",
  "7 year",
  "8 year",
  "9 year",
  "10 year",
  "11 year",
  "12 year",
  "13 year",
  "14 year",
  "15 year",
  "16 year",
  "17 year",
  "18 year",
  "19 year",
  "20 year",
];

//............Treatment........//
export const FreeCosultancy_Form = (t?: any) => {
  return {
    name: Yup.string().required(t("nameIsRequired")),
    phone: Yup.string().required(t("contactIsRequired")),
    email: Yup.string().required(t("emailIsRequired")),
  };
};
//...........Laboratory...........//

export const labInfoSchema = {
  name: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  labLogo: Yup.string().required("Required"),
  labLicenseNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  labLicenseImage: Yup.string().required("Required"),
  labLicenseExpiry: Yup.string().required("Required"),
  labOwnerFirstName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  labOwnerLastName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  labEmergencyNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  address: Yup.string().required("Required"),
  labDescription: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  labOpenTime: Yup.string().required("Required"),
  labCloseTime: Yup.string().required("Required"),
};

const url =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

export const labSocialSchema = {
  fbUrl: Yup.string().matches(url, "URL is not valid"),
  // .required("Required"),
  instaUrl: Yup.string().matches(url, "URL is not valid"),
  // .required("Required"),
  twitterUrl: Yup.string().matches(url, "URL is not valid"),
  // .required("Required"),
  webUrl: Yup.string().matches(url, "URL is not valid"),
  // .required("Required"),
};

export const labBankSchema = {};

export const user_ResetPassword = {
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
  verificationCode: Yup.string()
    .min(6, "Enter verification code")
    .required("Please enter verification code"),
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&()_+{}\[\]:;<>,.?/\\|-])[A-Za-z\d!@#$%*^&()_+{}\[\]:;<>,.?/\\|-]{8,25}$/;

export const labVerifySchema = {
  phoneNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
};

export const labLoginSchema = {
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
};

export const genericLoginSchema = (t: any) => {
  return Yup.object().shape({
    email: Yup.string().email().required(t("emailIsRequired")),
    password: Yup.string().required(t("passwordisrequired")),
  });
};

export const labResetSchema = {
  Email: Yup.string().email().required("Required"),
};

export const labConfirmPasswordSchema = {
  desiredPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("desiredPassword")], "Passwords must match")
    .required("Required"),
};

export const labLabInfoUpdateProfileSchema = {
  companyName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  ownerName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),

  cnic: Yup.string()
    .min(13, "Must be at least 13 Digits long")
    .max(13, "Must be 13 Digits")
    .required("Required"),
  state: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
};

export const labBankUpdateProfileSchema = {
  bankName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  accountHolderName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  accountNumber: Yup.string()
    .min(9, "Must be at least 9 Digits long")
    .required("Required"),
};
export const labSocialUpdateeProfileSchema = {
  website: Yup.string().matches(url, "URL is not valid"),
  instagram: Yup.string().matches(url, "URL is not valid"),
  twitter: Yup.string().matches(url, "URL is not valid"),
  facebook: Yup.string().matches(url, "URL is not valid"),
};

export const allUserUpdateProfile = {
  oldPassword: Yup.string().required("Enter your current password"),
  newPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Enter new password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Enter your new password again"),
};

export const labPasswordUpdateProfileSchema = {
  currentPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  NewPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("NewPassword")], "Passwords must match")
    .required("Required"),
};
//..................Validations..........................//

//.................Test-Addtest..........................//

export const labAddTestInfo = {
  testName: Yup.string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(64, "Test name should not exceed 64 characters.")
    .required("Required"),
  testDescription: Yup.string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(1000, "Description should not exceed 1000 characters.")
    .required("Required"),
  testPrice: Yup.string()
    // .min(2, "Must be at least 2 characters long")
    .matches(/^\d+$/, "Please enter a valid number")
    .required("Required"),
  testDuration: Yup.string()
    // .min(2, "Must be at least 2 characters long")
    .required("Required"),
  priceForMeditour: Yup.string()
    // .min(2, "Must be at least 2 characters long")
    .required("Required")
    .test(
      "is-less-than-actualPrice",
      "MediTour price should be less than actual price",
      function (value) {
        const { testPrice } = this.parent;
        return value < testPrice;
      }
    ),
};

export const labAddTestPrice = {
  testprice_TestPrice: Yup.string()
    // .min(2, "Must be at least 2 characters long")
    .matches(/^\d+$/, "Please enter a valid number")
    .required("Required"),
  testprice_TestDuration: Yup.string()
    // .min(2, "Must be at least 2 characters long")
    .required("Required"),
  testprice_PriceForMeditour: Yup.string()
    // .min(2, "Must be at least 2 characters long")
    .required("Required")
    .test(
      "is-less-than-actualPrice",
      "MediTour price should be less than actual price",
      function (value) {
        const { testprice_TestPrice } = this.parent;
        return value < testprice_TestPrice;
      }
    ),
};

//..................Validations..........................//

//...........Pharmacy...........//

export const pharmacyInfoSchema = {
  name: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  pharmacyLogo: Yup.string().required("Required"),
  pharmacyLicenseNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  pharmacyLicenseImg: Yup.string().required("Required"),
  pharmacyLicenseExpiry: Yup.string().required("Required"),
  pharmacyOwnerFirstName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  pharmacyOwnerLastName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  pharmacyEmergencyNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  address: Yup.string().required("Required"),
  lat: Yup.number(),
  lng: Yup.number(),
  city: Yup.string(),
  pharmacyDescription: Yup.string()
    .min(2, "Must be at least 2 numbers long")
    .required("Required"),
  pharamcyOpenTime: Yup.string().required("Required"),
  pharmacyCloseTime: Yup.string().required("Required"),
};

export const pharmaceuticalInfoSchema = (t: any) => ({
  name: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  logo: Yup.string().required(t("required")),
  ownerFirstName: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  ownerLastName: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  emergencyNumber: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  address: Yup.string().required(t("required")),
  email: Yup.string().required("Required"),
  phoneNumber: Yup.string().required(t("required")),
  country: Yup.string().required(t("required")),
  countrySelection: Yup.string().required(t("required")),
  // .test(
  //   "match-country",
  //   "Selected country does not match the location's country.",
  //   function (value) {
  //     const { country } = this.parent;
  //     return !country || value === country;
  //   }
  // ),
});

export const AddFormulaSchema = (t: any) => ({
  productType: Yup.string()
    .trim()
    .min(2, "pleaseEnterAtleast_2_Characters")
    .required(t("required")),
  genericId: Yup.string()
    .trim()
    .min(2, "pleaseEnterAtleast_2_Characters")
    .required(t("required")),
  brand: Yup.string().trim().required(t("required")),
  strength: Yup.string().trim().required(t("required")),
  content: Yup.string().trim().required(t("required")),
  packSize: Yup.string().trim().required(t("required")),
  tpPrice: Yup.string().trim().required(t("required")),
  mrpPrice: Yup.string().trim().required(t("required")),
  images: Yup.array()
    .min(1, t("atleastOneImage_"))
    .required(t("imagesRequired")),
});
export const pharmacyBankSchema = {};
export const pharmacyVerifySchema = {
  pharmacyPhoneNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  pharmacyEmail: Yup.string().email().required("Required"),
  pharmacyPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  pharmacyConfirmPassword: Yup.string()
    .oneOf([Yup.ref("pharmacyPassword")], "Passwords must match")
    .required("Required"),
};
export const pharmacyLoginSchema = {
  Email: Yup.string().email().required("Required"),
  Password: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
};

export const pharmacyResetSchema = {
  Email: Yup.string().email().required("Required"),
};

export const pharmacyConfirmPasswordSchema = {
  desiredPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("desiredPassword")], "Passwords must match")
    .required("Required"),
};

export const pharmAddMedicineMedicineInfo = {
  pharmMedicineGeneric: Yup.string().required("Required"),
  pharmMedicineImage: Yup.string().required("Required"),
  pharmMedicineBrand: Yup.string().required("Required"),
  pharmMedicineType: Yup.string().required("Required"),
  pharmMedicineStrength: Yup.string().required("Required"),
  pharmMedicinePackSize: Yup.string().required("Required"),
};

export const pharmAddMedicineMedicinePrice = {
  actualPrice: Yup.string()
    .matches(/^[0-9]+$/, "Must contain only numbers")
    .required("Required"),
  priceForMediTour: Yup.string()
    .matches(/^[0-9]+$/, "Must contain only numbers")
    .required("Required")
    .test(
      "is-less-than-actualPrice",
      "MediTour price should be less than actual price",
      function (value) {
        const { actualPrice } = this.parent;
        return value < actualPrice;
      }
    ),
};

export const pharmPasswordUpdateProfileSchema = {
  currentPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  NewPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("NewPassword")], "Passwords must match")
    .required("Required"),
};

export const pharmLabInfoUpdateProfileSchema = {
  companyName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  cnic: Yup.string()
    .min(13, "Must be at least 13 Digits long")
    .max(13, "Must be 13 Digits")
    .required("Required"),
  state: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
};

export const pharTaxUpdateProfileSchema = {
  incomeTaxNo: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  salesTaxNo: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
};
export const donationBasicInfoValidation = (
  systemType: any,
  types?: any,
  type?: any,
  selectedType?: any,
  t?: any
) => {
  const selectCompany =
    selectedType === "Attach with Company" &&
    (systemType === "hotel" || systemType === "travelagency");
  return {
    email: Yup.string().email().required(t("required")),
    phoneNumber: Yup.string().required(t("required")),
    logo: Yup.string().required(t("required")),
    name: Yup.string()
      .min(2, t("atleast_2_CharactersLong"))
      .required(t("required")),
    companyLicenseNo: Yup.string(),
    companyLicenseExpiry: Yup.string(),
    licenseImage: Yup.string(),
    address:
      type === "labs" || type === "pharmacy"
        ? Yup.string()
        : Yup.string().required(t("required")),
    companyEmergencyNo: Yup.string().required(t("required")),
    ownerFirstName: Yup.string().required(t("required")),
    ownerLastName: Yup.string().required(t("required")),
    experience:
      systemType === "hotel" ||
      systemType === "travelagency" ||
      type === "hotel" ||
      type === "travel"
        ? Yup.string().required(t("required"))
        : Yup.string(),
    features:
      systemType === "hotel" ||
      systemType === "travelagency" ||
      type === "hotel" ||
      type === "travel"
        ? Yup.array().of(Yup.string()).min(1, t("selectAtLeast1_"))
        : Yup.array(),
    closeTime:
      systemType === "hospital" ||
      systemType === "laboratory" ||
      systemType === "pharmacy"
        ? Yup.string().required(t("required"))
        : Yup.string(),
    openTime:
      systemType === "hospital" ||
      systemType === "laboratory" ||
      systemType === "pharmacy"
        ? Yup.string().required(t("required"))
        : Yup.string(),
    labDescription:
      systemType === "laboratory" || systemType === "pharmacy" || types
        ? Yup.string().required(t("required"))
        : Yup.string(),
    selectedType:
      systemType === "hotel" || systemType === "travelagency"
        ? Yup.string().required("Required Type")
        : Yup.string(),
    travelCompanyId: selectCompany
      ? Yup.object().required(t("selectCompany"))
      : Yup.object(),
    country:
      type === "labs" || type === "pharmacy"
        ? Yup.string()
        : Yup.string().required(t("required")),
    countrySelection:
      type === "labs" || type === "pharmacy"
        ? Yup.string()
        : Yup.string().required(t("required")),
  };
};
//..................Validations..........................//

//...........Medicalservice-Doctor...........//
export const doctor_BasicInfoSchema = (t: any) => ({
  doctorType: Yup.string().required(t("required")),
  email: Yup.string().email().required(t("required")),
  gender: Yup.string().required(t("genderIsRequired")),
  phoneNumber: Yup.string().required(t("required")),
  name: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  qualifications: Yup.string().required(t("required")),
  speciality: Yup.array()
    .min(1, t("selectAtleas_1_Speciality"))
    .required(t("specialityIsRequired")),
  clinicExperience: Yup.string().required(t("required")),
  address: Yup.string().required(t("required")),
  lat: Yup.number(),
  lng: Yup.number(),
  city: Yup.string(),
  country: Yup.string().required(t("required")),
  countrySelection: Yup.string().required(t("required")),
});

export const doctorVerifySchema = {
  doctorPhoneNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  doctorEmail: Yup.string().email().required("Required"),
  doctorPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  doctorConfirmPassword: Yup.string()
    .oneOf([Yup.ref("doctorPassword")], "Passwords must match")
    .required("Required"),
};

export const doctor_VerifySchema = {
  phoneNo: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
};
export const doctor_VerifySchemaNew = (t?: any) => ({
  password: Yup.string()
    .matches(passwordPattern, t("specialCharacterInPassword"))
    .required(t("passwordIsRequired")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], t("passwordMustMatch"))
    .required(t("confirmPasswordRequired")),
});
export const doctorLoginSchema = {
  Email: Yup.string().email().required("Required"),
  Password: Yup.string().required("Required"),
};

export const doctorResetSchema = (t?: any) => ({
  Email: Yup.string().email().required(t?.("required")),
});

export const doctorConfirmPasswordSchema = {
  desiredPassword: Yup.string()
    .matches(
      passwordPattern,
      "*Must include 1 uppercase and 1 special character."
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("desiredPassword")], "Passwords must match")
    .required("Confirm password is required"),
};
export const doctorOnsiteAvailability = {
  onsiteDay: Yup.string().required("Required"),
  morningfrom: Yup.string()
    .required("Required")
    .test(
      "is-valid-time",
      "Time must be between 02:00-14:00",
      function (value) {
        if (!value) return true;
        const enteredTime = new Date(`2000-01-01T${value}`);
        const lowerLimitTime = new Date(`2000-01-01T02:00:00`);
        const upperLimitTime = new Date(`2000-01-01T14:00:00`);
        return lowerLimitTime <= enteredTime && enteredTime <= upperLimitTime;
      }
    ),
  morningto: Yup.string()
    .required("Required")
    .test(
      "is-valid-time",
      "Time must be after Morning From",
      function (value, { parent }) {
        if (!value) return true;
        const enteredTime = new Date(`2000-01-01T${value}`);
        const fromTime = new Date(`2000-01-01T${parent.morningfrom}`);
        const isAfterMorningFrom = fromTime < enteredTime;
        const isNotEqualMorningFrom =
          fromTime.getTime() !== enteredTime.getTime();
        return isAfterMorningFrom && isNotEqualMorningFrom;
      }
    ),

  eveningfrom: Yup.string()
    .required("Required")
    .test(
      "is-valid-time",
      "Time must be between 14:00 and 02:00",
      function (value) {
        if (!value) return true;
        const enteredTime = new Date(`2000-01-01T${value}`);
        const lowerLimitTime = new Date(`2000-01-01T14:00:00`);
        const upperLimitTime = new Date(`2000-01-01T02:00:00`);
        return lowerLimitTime <= enteredTime && enteredTime <= upperLimitTime;
      }
    ),
  eveningto: Yup.string()
    .required("Required")
    .test(
      "is-valid-time",
      "Time must be after evening From",
      function (value, { parent }) {
        if (!value) return true;
        const enteredTime = new Date(`2000-01-01T${value}`);
        const fromTime = new Date(`2000-01-01T${parent.eveningfrom}`);
        const isAfterEveningFrom = fromTime < enteredTime;
        const isNotEqualEveningFrom =
          fromTime.getTime() !== enteredTime.getTime();
        return isAfterEveningFrom && isNotEqualEveningFrom;
      }
    ),
};
export const doctorAvailibilityPrice = {
  actualPrice: Yup.string()
    .matches(/^\d+$/, "Please enter a valid number")
    .min(2, "Must be at least 2 Digit long")
    .max(15, "Must be 15 Digit or less")
    .required("Please enter price."),
};
export const doctor_Availability = (t: any) => ({
  onsiteDay: Yup.string().required(t("pleaseSelectDay")),
  morningfrom: Yup.string().test(
    "is-valid-time",
    t("timeMustBetween"),
    function (value) {
      if (!value) return true;
      // if (value === "00:00") return true; // Allow "00:00" time
      const enteredTime = new Date(`2000-01-01T${value}`);
      const lowerLimitTime = new Date(`2000-01-01T02:00:00`);
      const upperLimitTime = new Date(`2000-01-01T14:00:00`);
      return lowerLimitTime <= enteredTime && enteredTime <= upperLimitTime;
    }
  ),

  morningto: Yup.string().test(
    "is-valid-time",
    t("endTimeMustBeAfterStartTime"),
    function (value, { parent }) {
      if (!value) return true;
      // if (value === "00:00") return true; // Allow "00:00" time
      const enteredTime = new Date(`2000-01-01T${value}`);
      const fromTime = new Date(`2000-01-01T${parent.morningfrom}`);
      const isAfterMorningFrom = fromTime < enteredTime;
      const isNotEqualMorningFrom =
        fromTime.getTime() !== enteredTime.getTime();
      return isAfterMorningFrom && isNotEqualMorningFrom;
    }
  ),

  eveningfrom: Yup.string().test(
    "is-valid-time",
    t("timeMustBetween2"),
    function (value, { parent }) {
      if (!value) return true; // Allow empty value
      // if (!value === "00:00" && parent.eveningto === "00:00") {
      //   return true; // Both evening from and to are "00:00", no validation needed
      // }
      const enteredTime = new Date(`2000-01-01T${value}`);
      const lowerLimitTime = new Date(`2000-01-01T14:00:00`);
      const upperLimitTime = new Date(`2000-01-01T24:00:00`);
      return lowerLimitTime <= enteredTime && enteredTime <= upperLimitTime;
    }
  ),
  eveningto: Yup.string().test(
    "is-valid-time",
    t("endTimeMustBeAfterStartTime"),
    function (value, { parent }) {
      if (!value) return true; // Allow empty value
      // if (value === "00:00" && parent.eveningfrom === "00:00") {
      //   return true; // Both evening from and to are "00:00", no validation needed
      // }
      const enteredTime = new Date(`2000-01-01T${value}`);
      const fromTime = new Date(`2000-01-01T${parent.eveningfrom}`);
      return fromTime < enteredTime;
    }
  ),
});
export const doctorInhouseAvailability = {
  onsiteDay: Yup.string().required("Please select a day."),
  morningfrom: Yup.string().test(
    "is-valid-time",
    "Time must be between 02:00-14:00",
    function (value) {
      if (!value) return true;
      const enteredTime = new Date(`2000-01-01T${value}`);
      const lowerLimitTime = new Date(`2000-01-01T02:00:00`);
      const upperLimitTime = new Date(`2000-01-01T14:00:00`);
      return lowerLimitTime <= enteredTime && enteredTime <= upperLimitTime;
    }
  ),
  morningto: Yup.string().test(
    "is-valid-time",
    "End time must be after the Start time.",
    function (value, { parent }) {
      if (!value) return true;
      const enteredTime = new Date(`2000-01-01T${value}`);
      const fromTime = new Date(`2000-01-01T${parent.morningfrom}`);
      const isAfterMorningFrom = fromTime < enteredTime;
      const isNotEqualMorningFrom =
        fromTime.getTime() !== enteredTime.getTime();
      return isAfterMorningFrom && isNotEqualMorningFrom;
    }
  ),

  eveningfrom: Yup.string().test(
    "is-valid-time",
    "Time must be between 14:00 and 24:00",
    function (value, { parent }) {
      if (!value) return true; // Allow empty value
      // if (!value === "00:00" && parent.eveningto === "00:00") {
      //   return true; // Both evening from and to are "00:00", no validation needed
      // }
      const enteredTime = new Date(`2000-01-01T${value}`);
      const lowerLimitTime = new Date(`2000-01-01T14:00:00`);
      const upperLimitTime = new Date(`2000-01-01T24:00:00`);
      return lowerLimitTime <= enteredTime && enteredTime <= upperLimitTime;
    }
  ),
  eveningto: Yup.string().test(
    "is-valid-time",
    "End time must be after the Start time.",
    function (value, { parent }) {
      if (!value) return true; // Allow empty value
      // if (value === "00:00" && parent.eveningfrom === "00:00") {
      //   return true; // Both evening from and to are "00:00", no validation needed
      // }
      const enteredTime = new Date(`2000-01-01T${value}`);
      const fromTime = new Date(`2000-01-01T${parent.eveningfrom}`);
      return fromTime < enteredTime;
    }
  ),
  actualPrice: Yup.string()
    .matches(/^\d+$/, "Please enter a valid number")
    .min(2, "Must be at least 2 Digit long")
    .max(15, "Must be 15 Digit or less")
    .required("Required"),
};

export const doctorOnsitePrice = {
  onsiteActualPrice: Yup.string()
    .matches(/^\d+$/, "Please enter a valid number")
    .min(2, "Must be at least 2 Digit long")
    .max(15, "Must be 15 Digit or less")
    .required("Required"),
  onsiteMeditourPrice: Yup.string()
    .matches(/^\d+$/, "Please enter a valid number")
    .min(2, "Must be at least 2 Digit long")
    .max(15, "Must be 15 Digit or less")
    .required("Required"),
};
export const doctorVideoConsultAvailability = {
  videoConsultDay: Yup.string().required("Required"),
};

export const doctorVideoConsultPrice = {
  videoConsultActualPrice: Yup.string()
    .min(2, "Must be at least 2 Digit long")
    .max(15, "Must be 15 Digit or less")
    .required("Required"),
  videoConsultMeditourPrice: Yup.string()
    .min(2, "Must be at least 2 Digit long")
    .max(15, "Must be 15 Digit or less")
    .required("Required"),
};
export const doctorAppointmentHistory = (t: any) => ({
  systolicPressure: Yup.string()
    .trim()
    .matches(/^\d+$/, t("onlyNumbersAllowed"))
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  diastolicPressure: Yup.string()
    .trim()
    .matches(/^\d+$/, t("onlyNumbersAllowed"))
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  weight: Yup.string()
    .trim()
    .matches(/^\d+$/, t("onlyNumbersAllowed"))
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  symptoms: Yup.string()
    .trim()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),

  description: Yup.string()
    .trim()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  diseases: Yup.string()
    .trim()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  temperature: Yup.string()
    .trim()
    .matches(/^\d+$/, t("onlyNumbersAllowed"))
    .min(2, "Must be at least 2 characters long")
    .required(t("required")),
  heartRate: Yup.string()
    .trim()
    .matches(/^\d+$/, t("onlyNumbersAllowed"))
    .min(2, "Must be at least 2 characters long")
    .required(t("required")),
  sugar: Yup.string()
    .trim()
    .matches(/^\d+$/, t("onlyNumbersAllowed"))
    .min(2, "Must be at least 2 characters long")
    .required(t("required")),
});
export const doctorAppointmentAddmedicineSchema = {
  // type: Yup.string().trim().required("Required"),
  medicineName: Yup.string()
    .trim()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  medicineBrand: Yup.string().required("Required"),
  medicineStrength: Yup.string()
    .trim()
    .required("Required")
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  dosage: Yup.string()
    .trim()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
};
export const doctorAppointmentAddTestSchema = {
  testName: Yup.string()
    .trim()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  testId: Yup.string().trim().required("Required"),
};
//..................Validations..........................//

//...........Medicelservice-Hospitals...........//

export const hospital_BasicInfoSchema = {
  name: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  logo: Yup.string().required("Required"),
  registrationNo: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  registrationImage: Yup.string(),
  registrationExpiry: Yup.string().required("Required"),
  ownerFirstName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  ownerLastName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  emergencyNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .max(50, "Must be 50 characters or less")
    .required("Required"),
  address: Yup.string().required("Required"),
  lat: Yup.number(),
  lng: Yup.number(),
  city: Yup.string(),
  openTime: Yup.string().required("Required"),
  closeTime: Yup.string().required("Required"),
};

export const hospitalVerifySchema = {
  hospitalPhoneNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  hospitalEmail: Yup.string().email().required("Required"),
  hospitalPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  hospitalConfirmPassword: Yup.string()
    .oneOf([Yup.ref("hospitalPassword")], "Passwords must match")
    .required("Required"),
};
export const hospitalLoginSchema = {
  Email: Yup.string().email().required("Required"),
  Password: Yup.string()
    // .matches(passwordPattern, "Password is not valid")
    .required("Required"),
};

export const hospitalResetSchema = {
  Email: Yup.string().email().required("Required"),
};

export const hospitalConfirmPasswordSchema = {
  desiredPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("desiredPassword")], "Passwords must match")
    .required("Required"),
};

export const hospitalAddDepartmentSchema = {
  departmentName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  departmentLogo: Yup.string().required("Required"),
};

export const hospitalHospitalInfoUpdateProfileSchema = {
  hospitalName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .max(25, "Must be 25 characters or less")
    .required("Required"),
  cnic: Yup.string()
    .min(13, "Must be at least 13 Digits long")
    .max(13, "Must be 13 Digits")
    .required("Required"),
  // state: Yup.string()
  //   .min(2, "Must be at least 2 characters long")
  //   .required("Required"),
};

export const hospitalAddDoctorEnterCode = {
  code: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .max(25, "Must be 25 characters or less")
    .required("Required"),
};

//..................Validations..........................//

//...........Homeservice-Ambulance...........//

export const ambulanceBasicInfoSchema = {
  ambulanceAmbulanceName: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .required("Required"),
  ambulanceLogo: Yup.string().required("Required"),
  ambulanceRegistrationNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  ambulanceRegistrationExpiry: Yup.string().required("Required"),
  ambulanceRegistrationImage: Yup.string().required("Required"),
  ambulanceFirstOwnerName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  ambulanceLastOwnerName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  ambulanceEmergencyNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  address: Yup.string().required("Required"),
  lat: Yup.number(),
  lng: Yup.number(),
  city: Yup.string(),
};
export const ambulanceVerifySchema = {
  ambulancePhoneNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  ambulanceEmail: Yup.string().email().required("Required"),
  ambulancePassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  ambulanceConfirmPassword: Yup.string()
    .oneOf([Yup.ref("ambulancePassword")], "Passwords must match")
    .required("Required"),
};

export const ambulanceLoginSchema = {
  Email: Yup.string().email().required("Required"),
  Password: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
};

export const ambulanceInfoSchema = {
  vehicleType: Yup.string().required("Required"),
  vehicleName: Yup.string()
    .matches(/^[^0-9]*$/, "Vehicle Name cannot contain numbers")
    .trim()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  vehicleModel: Yup.string()
    .trim()
    // .matches(/^[0-9]+$/, "Must contain only numbers")
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  vehicleYear: Yup.string()
    .trim()
    .matches(/^[0-9]+$/, "Must contain only numbers")
    .min(2, "Must be at least 2 Digits long")
    .max(4, "Must be 4 Digits or less")
    .required("Required"),
  vehicleColor: Yup.string()
    .trim()
    .matches(/^[^0-9]*$/, "Color cannot contain numbers")
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  vehicleRegisterationNo: Yup.string()
    .trim()
    .min(5, "Must be at least 5 characters long")
    .required("Required"),
  vehicleRegistrationDate: Yup.string().required("Required"),
};

export const ambulancePriceSchema = {
  actualPrice: Yup.string()
    .trim()
    .matches(/^[0-9]+$/, "Must contain only numbers")
    .min(2, "Must be at least 2 Digits long")
    .max(15, "Must be 15 Digits or less")
    .required("Required"),
  priceForMeditour: Yup.string()
    .trim()
    .matches(/^[0-9]+$/, "Must contain only numbers")
    .min(2, "Must be at least 2 Digits long")
    .max(15, "Must be 15 Digits or less")
    .required("Required"),
};
export const ambulanceResetSchema = {
  Email: Yup.string().email().required("Required"),
};

export const ambulanceConfirmPasswordSchema = {
  desiredPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("desiredPassword")], "Passwords must match")
    .required("Required"),
};

export const ambulanceInfoUpdateProfileSchema = {
  ambulanceName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  cnic: Yup.string()
    .min(13, "Must be at least 13 Digits long")
    .max(13, "Must be 13 Digits")
    .required("Required"),
  state: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
};
export const ambulanceAddbidSchema = (t: any) => ({
  ambulancename: Yup.string().required(t("required")),
  ambulanceno: Yup.string().required(t("required")),
  price: Yup.string()
    .matches(/^[0-9]+$/, t("mustContainNumbers"))

    .required(t("required")),
});

//..................Validations..........................//

//...........Homeservice-Physiotherapist...........//
export const Login_Schema = {
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
};
export const paramedicStaffBasicInfoSchema = (t: any) => ({
  name: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required(t("required")),
  email: Yup.string().email().required(t("required")),
  phoneNumber: Yup.string().required(t("required")),
  qualifications: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required(t("required")),
  address: Yup.string().required(t("required")),
  country: Yup.string().required(t("required")),
  countrySelection: Yup.string().required(t("required")),
  // .test(
  //   "match-country",
  //   "Selected country does not match the location's country.",
  //   function (value) {
  //     const { country } = this.parent;
  //     return !country || value === country;
  //   }
  // ),
});
export const hotelInfoSchema = {
  name: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),

  logo: Yup.string().required("Required"),

  licenseNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  licenseExpiry: Yup.string().required("Required"),
  licenseImage: Yup.string().required("Required"),
  emergencyNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  ownerFirstName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  ownerLastName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  address: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
};

export const hotelSocialSchema = {
  fbUrl: Yup.string().matches(url, "URL is not valid"),
  // .required("Required"),
  instaUrl: Yup.string().matches(url, "URL is not valid"),
  // .required("Required"),
  twitterUrl: Yup.string().matches(url, "URL is not valid"),
  // .required("Required"),
  webUrl: Yup.string().matches(url, "URL is not valid"),
  // .required("Required"),
};

export const hotelVerifySchema = {
  hotelPhoneNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  hotelEmail: Yup.string().email().required("Required"),
  hotelPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  hotelConfirmPassword: Yup.string()
    .oneOf([Yup.ref("hotelPassword")], "Passwords must match")
    .required("Required"),
};

export const hotelLoginSchema = {
  Email: Yup.string().email().required("Required"),
  Password: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
};

export const hotelResetSchema = {
  Email: Yup.string().email().required("Required"),
};

export const hotelConfirmPasswordSchema = {
  desiredPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("desiredPassword")], "Passwords must match")
    .required("Required"),
};
export const hotelAddRoomHotelInfo = {
  propertyName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  startRating: Yup.string().required("Required"),
  userName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  contactNo: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  alternativeCellNo: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  postCode: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  propertyAddress: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
};
export const hotelAddRoom = {
  roomType: Yup.string().required("Required"),
  roomName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  smokingPolicy: Yup.string().required("Required"),
  roomThisType: Yup.string().required("Required"),
  kindOfBeds: Yup.string().required("Required"),
  numberOfBeds: Yup.string().required("Required"), ///

  numberOfGuest: Yup.string().required("Required"),
  roomSize: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  breakfastInclude: Yup.string().required("Required"),
  pricePerNight: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  pricePerNightforMeditour: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  roomImage: Yup.string().required("Required"),
  roomDescription: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
};
export const hotelFacilitites = {
  parkingAvailability: Yup.string().required("Required"),
  priceForParking: Yup.string(),
  spokenLanguageYourStaff: Yup.string().required("Required"),
};
export const hotelAmenities = {
  provideExtraBed: Yup.string().required("Required"),
  numberofExtraBed: Yup.string().required("Required"),
};
export const hotelPrivacy = {
  advanceCancelfreeofCharge: Yup.string().required("Required"),
  switch: Yup.boolean().required("Required"),
  checkinFrom: Yup.string().required("Required"),
  checkinTo: Yup.string().required("Required"),
  checkOutFrom: Yup.string().required("Required"),
  checkOutTo: Yup.string().required("Required"),
  children: Yup.string().required("Required"),
  childrenAgeFrom: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  childrenAgeTo: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  chargesMayApplyorNot: Yup.string().required("Required"),
  chargesofChild: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  pets: Yup.string().required("Required"),
  chargesofPetApply: Yup.string().required("Required"),
  chargesofPets: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
};

export const hotelAddHomesHomeInfo = {
  propertyName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  customName: Yup.string().required("Required"),
  contactNo: Yup.string().required("Required"),
  alternativeContactNo: Yup.string().required("Required"),
  starRating: Yup.string().required("Required"),
  postCode: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  partOfCompany: Yup.string().required("Required"),
  channelManager: Yup.string().required("Required"),
  companyName: Yup.string(),
  channelManagerName: Yup.string(),
};
export const hotelAddHomeLayout = {
  homeType: Yup.string().required("Required"),
  customName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  noofBedRoom: Yup.number().required("Required"),
  noofDiningRoom: Yup.number().required("Required"),
  noofBathRoom: Yup.number().required("Required"),
  noofKitchens: Yup.number().required("Required"),
  noofFloor: Yup.number().required("Required"),

  guestno: Yup.number().required("Required"),
  privateBatroom: Yup.boolean().required("Required"),
  commonSofaBed: Yup.number().required("Required"),
  commonGuest: Yup.number().required("Required"),
  appartmentSize: Yup.string(),
  basicpricePerNight: Yup.string()
    .matches(/^[0-9]+$/, "Must contain only numbers")

    .required("Required"),
  pricepernightformeditour: Yup.string()
    .matches(/^[0-9]+$/, "Must contain only numbers")

    .required("Required"),
};

export const hotelAddHomefecServices = {
  parking: Yup.string().required("Required"),
  LanguageSpoken: Yup.string().required("Required"),
  private: Yup.string(),
  onSite: Yup.string(),
  reservationNeeded: Yup.string(),
  price: Yup.string().min(2, "Must be at least 2 characters long"),
};
export const hotelAddHomePrivacy = {
  advanceCancelfreeofCharge: Yup.string().required("Required"),
  accidentalBookingPolicy: Yup.boolean().required("Required"),
  checkInFrom: Yup.string().required("Required"),
  checkInTo: Yup.string().required("Required"),
  checkOutFrom: Yup.string().required("Required"),
  checkOutTo: Yup.string().required("Required"),
  smoking: Yup.string().required("Required"),
  accomodateChildren: Yup.string().required("Required"),
  childrenAgeTo: Yup.string(),
  childrenAgeFrom: Yup.string(),
  chargesMayApply: Yup.string(),
  pets: Yup.string().required("Required"),
  chargesOfPets: Yup.string(),

  minimumStay: Yup.string().required("Required"),
};
export const hotelAddAppartmentPrivacy = {
  advanceCancelfreeofCharge: Yup.string().required("Required"),
  accidentalBookingPolicy: Yup.boolean().required("Required"),
  checkInFrom: Yup.string().required("Required"),
  checkInTo: Yup.string().required("Required"),
  checkOutFrom: Yup.string().required("Required"),
  checkOutTo: Yup.string().required("Required"),
  smoking: Yup.string().required("Required"),
  accomodateChildren: Yup.string().required("Required"),
  childrenAgeTo: Yup.string(),
  childrenAgeFrom: Yup.string(),
  chargesMayApply: Yup.string(),
  pets: Yup.string().required("Required"),
  stayeofPets: Yup.string(),
  chargesOfPets: Yup.number(),

  minimumStay: Yup.string().required("Required"),
};

export const hotelAddAppartmentFacilities = {
  parking: Yup.string().required("Required"),
  PriceOfParking: Yup.string(),
  LanguageSpoken: Yup.string().required("Required"),
};

export const hotelAddAppartmentSchema = {
  appartmentNo: Yup.string().required("Required"),
  customName: Yup.string().required("Required"),
  numberofBedRoom: Yup.string().required("Required"),
  numberofDiningRoom: Yup.string().required("Required"),
  numberofBathRoom: Yup.string().required("Required"),
  howmanyKitchens: Yup.string().required("Required"),
  noofApartments: Yup.string().required("Required"),
  guestStayinthisAppartment: Yup.number().required("Required"),
  breakfastInclude: Yup.string().required("Required"),
  privateBathroom: Yup.boolean().required("Required"),
  numberofSofabedinAppartment: Yup.string().required("Required"),
  totalGuestStay: Yup.string().required("Required"),
  appartmentSize: Yup.string(),
  basicpricePerNight: Yup.string()
    .matches(/^[0-9]+$/, "Must contain only numbers")

    .required("Required"),
  // pricepernightformeditour: Yup.string()
  //   .matches(/^[0-9]+$/, "Must contain only numbers")

  //   .required("Required"),
};
//...........Rent A Car................//

export const rentACarInfoSchema = {
  name: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  logo: Yup.string().required("Required"),
  licenseNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  licenseExpiry: Yup.string().required("Required"),
  licenseImage: Yup.string().required("Required"),
  emergencyNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  ownerFirstName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  ownerLastName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  // //cnicNumber: Yup.string()
  // //min(2, "Must be at least 2 Digits long")
  // //.required("Required"),

  // // cnicExpiry: Yup.string().required("Required"),

  // // cnicImage: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  lat: Yup.number(),
  lng: Yup.number(),
  city: Yup.string(),
};

export const rentACarLoginSchema = {
  Email: Yup.string().email().required("Required"),
  Password: Yup.string()
    // .matches(passwordPattern, "Password is not valid")
    .required("Required"),
};

export const rentACarResetSchema = {
  Email: Yup.string().email().required("Required"),
};

export const rentACarConfirmPasswordSchema = {
  desiredPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("desiredPassword")], "Passwords must match")
    .required("Required"),
};
export const rentACarAddVahicleSchema = (t: any) => ({
  vehicleType: Yup.string().required(t("required")),
  vehicleName: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  vehicleColour: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  chassisNo: Yup.string()
    .min(17, t("mustBeAtleast_17"))
    .min(17, t("mustBeAtleast_17"))
    .required(t("required")),
  actualPricePerDay: Yup.string()
    .matches(/^[+0-9]+$/, t("onlyNumbersAllowed"))
    .required(t("required")),
  ownerName: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  vehicleRegisterationNo: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  vehicleImages: Yup.array()
    .min(1, t("atleastOneImage_"))
    .max(3, t("max_3_ImagesAllowed"))
    .required(t("vehicleImagesRequired")),
  passengerSeats: Yup.string()
    .min(1, t("mustBeAtleast_1"))
    .required(t("required")),
  cnic: Yup.string()
    .matches(/^[+0-9]+$/, t("onlyNumbersAllowed"))
    .required(t("required")),
  mobile: Yup.string()
    .matches(/^[+0-9]+$/, t("onlyNumbersAllowed"))
    .required(t("required")),
  email: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  vehicleModel: Yup.string()
    .matches(/^[+0-9]+$/, "")
    .required(t("required")),
});
export const rentCarPriceSchema = {
  actualPrice: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  priceForMediTour: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
};
//..............TRAVEL AGENCY.........//

export const travelAgencyInfoSchema = {
  AgencyName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),

  AgencyLogo: Yup.string().required("Required"),

  AgencyLicenseNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  LicenseImage: Yup.string().required("Required"),
  // licenseExpiry: Yup.string().required("Required"),
  AgencyEmergencyNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  OwnerFirstName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),

  cnicNumber: Yup.string()
    .min(2, "Must be at least 2 Digits long")
    .max(15, "Must be 15 Digits or less")
    .required("Required"),
  cnicExpiry: Yup.string().required("Required"),

  cnicImage: Yup.string().required("Required"),

  AgencyAddress: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .max(50, "Must be 50 characters or less")
    .required("Required"),
};

export const travelAgencySocialSchema = {
  fbUrl: Yup.string().matches(url, "URL is not valid"),
  // .required("Required"),
  instaUrl: Yup.string().matches(url, "URL is not valid"),
  // .required("Required"),
  twitterUrl: Yup.string().matches(url, "URL is not valid"),
  // .required("Required"),
  webUrl: Yup.string().matches(url, "URL is not valid"),
  // .required("Required"),
};

export const travelAgencyBankSchema = {
  saleTaxNo: Yup.string().min(2, "Must be at least 2 characters long"),
  // .required("Required"),
  bankName: Yup.string().min(2, "Must be at least 2 characters long"),
  // .required("Required"),
  incomeTaxNo: Yup.string().min(2, "Must be at least 2 characters long"),
  // .required("Required"),
  accountHolderName: Yup.string().min(2, "Must be at least 2 characters long"),
  // .required("Required"),
  accountNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  TaxFile: Yup.string(),
  // .required("Required"),
};

export const travelAgencyVerifySchema = {
  travelAgencyPhoneNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  travelAgencyEmail: Yup.string().email().required("Required"),
  travelAgencyPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  travelAgencyConfirmPassword: Yup.string()
    .oneOf([Yup.ref("travelAgencyPassword")], "Passwords must match")
    .required("Required"),
};

export const travelAgencyLoginSchema = {
  Email: Yup.string().email().required("Required"),
  Password: Yup.string().required("Required"),
};

export const travelAgencyResetSchema = {
  Email: Yup.string().email().required("Required"),
};

export const travelAgencyConfirmPasswordSchema = {
  desiredPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("desiredPassword")], "Passwords must match")
    .required("Required"),
};
//..........Donation.........../////

export const donationInfoSchema = {
  name: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  logo: Yup.string().required("Required"),
  licenseNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  licenseExpiry: Yup.string().required("Required"),
  licenseImage: Yup.string().required("Required"),
  emergencyNumber: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  ownerFirstName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  ownerLastName: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  address: Yup.string().required("Required"),
  lat: Yup.number(),
  lng: Yup.number(),
  city: Yup.string(),
};
export const donationLoginSchema = {
  Email: Yup.string().email().required("Required"),
  Password: Yup.string()
    // .matches(passwordPattern, "Password is not valid")
    .required("Required"),
};

export const donationResetSchema = {
  Email: Yup.string().email().required("Required"),
};

export const donationConfirmPasswordSchema = {
  desiredPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("desiredPassword")], "Passwords must match")
    .required("Required"),
};

export const donationAddCriteriaSchema = (t: any) => ({
  criteriaName: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),

  image: Yup.string().required(t("required")),

  description: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .max(45, t("mustBe_45_CharacterLong"))
    .required(t("required")),
});

export const donationAddPackageSchema = (t: any) => ({
  donationTitle: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .max(45, t("mustBe_45_CharacterLong"))
    .required(t("required")),
  targetAudience: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .max(500, t("mustBe_500_CahracterOrLess"))
    .required(t("required")),
  totalRequiredAmount: Yup.string()
    .trim()
    .matches(/^[0-9]+$/, t("mustContainNumbers"))
    .required(t("required")),
  totalDays: Yup.string().required(t("required")),
  description: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .max(500, t("mustBe_500_CahracterOrLess"))
    .required(t("required")),
});

export const insuranceLoginSchema = {
  Email: Yup.string().email().required("Required"),
  Password: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
};

export const insuranceResetSchema = {
  Email: Yup.string().email().required("Required"),
};

export const insuranceConfirmPasswordSchema = {
  desiredPassword: Yup.string()
    .matches(passwordPattern, "Password is not valid")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("desiredPassword")], "Passwords must match")
    .required("Required"),
};
export const insuranceMySelfPackageSchema = (t: any) => ({
  insuranceAgestart: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .max(15, t("atLeast15DigitsLong"))
    .required(t("required")),
  insuranceAgeend: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .max(15, t("atLeast15DigitsLong"))
    .required(t("required")),
  hospitalizationStartLimit: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .max(15, t("atLeast15DigitsLong"))
    .required(t("required")),
  hospitalizationEndLimit: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .max(15, t("atLeast15DigitsLong"))
    .required(t("required")),
  gender: Yup.string().required(t("required")),
});

export const insuranceFamilyPackageSchema = (t: any) => ({
  insuranceAgestart: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .required(t("required")),
  insuranceAgeend: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .required(t("required")),
  spouseAgeStart: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .required(t("required")),
  spouseAgeEnd: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .required(t("required")),
  kidsAgeStart: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .required(t("required")),
  kidsAgeEnd: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .required(t("required")),
  hospitalizationStartLimit: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .required(t("required")),
  hospitalizationEndLimit: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .required(t("required")),
});

export const insuranceParentsPackageSchema = (t: any) => ({
  parentsAgeStart: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .max(15, t("atLeast15DigitsLong"))
    .required(t("required")),
  parentsAgeEnd: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .max(15, t("atLeast15DigitsLong"))
    .required(t("required")),
  hospitalizationStartLimit: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .max(15, t("atLeast15DigitsLong"))
    .required(t("required")),
  hospitalizationEndLimit: Yup.string()
    .matches(/^[0-9]+$/, t("mustBeNumber"))
    .min(2, t("atLeast2DigitsLong"))
    .max(15, t("atLeast15DigitsLong"))
    .required(t("required")),
});
export const insurancePackageBasicinfo = (t: any) => ({
  packageName: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  packageLogo: Yup.string().required(t("required")),
  hospitalizationPerPerson: Yup.string().required(t("required")),
  dailyRoomBoardLimit: Yup.string().required(t("required")),
  claimPayoutRatio: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  packageDescription: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
});

export const insuranceMedicalBenefits = (t: any, planType: string) => ({
  icu: Yup.string().required(t("required")),
  additionalLimit: Yup.string().required(t("required")),
  ambulanceService: Yup.string().required(t("required")),
  coverageSpecializedInvestigation: Yup.string().test(
    "coverageSpecializedInvestigation-required",
    t("required"),
    function (value) {
      if (planType === "mySelf" || planType === "parents") {
        return !!value;
      }
      return true;
    }
  ),

  weeks: Yup.string().required(t("required")),
  maternity: Yup.string().test(
    "maternity-required",
    t("required"),
    function (value) {
      if (planType === "mySelf" || planType === "parents") {
        return !!value;
      }
      return true;
    }
  ),

  opd: Yup.string().test("opd-required", t("required"), function (value) {
    if (planType === "family") {
      return !!value;
    }
    return true;
  }),

  policyDocument: Yup.string().required(t("required")),
  claimProcess: Yup.string().required(t("required")),

  heading: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),

  description: Yup.string()
    .min(10, t("nustBeAtleast_10_Charac"))
    .required(t("required")),
});

export const insurancePriceSchema = {
  actualPrice: Yup.string()
    .min(2, "Must be at least 2 Digits long")
    .max(10, "Must be 10 Digits or less")
    .required("Required"),
  // meditourPrice: Yup.string()
  //   .min(2, "Must be at least 2 Digits long")
  //   .max(5, "Must be 5 Digits or less")
  //   .required("Required"),
  perYear: Yup.string()
    .min(2, "Must be at least 2 Digits long")

    .required("Required"),
};

export const insuranceHealthMySelfPackageSchema = {
  yourAgeStart: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  yourAgeEnd: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  spouseAgeStart: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  spouseAgeEnd: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  kidAgeStart: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  kidAgeEnd: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  hospitalizationAgeStart: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
  hospitalizationAgeEnd: Yup.string()
    .min(2, "Must be at least 2 characters long")
    .required("Required"),
};

export const insuranceHealthFamilyMedicalBenefits = {
  icu: Yup.string().required("Required"),
  additionalLimit: Yup.string().required("Required"),
  ambulanceService: Yup.string().required("Required"),
  opd: Yup.string().required("Required"),
  weeks: Yup.string().required("Required"),
  policyDocument: Yup.string().required("Required"),
  claimProcess: Yup.string().required("Required"),
  heading: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
};
export const insuranceHealthParentsMedicalBenefits = {
  icu: Yup.string().required("Required"),
  additionalLimit: Yup.string().required("Required"),
  ambulanceService: Yup.string().required("Required"),
  maternity: Yup.string().required("Required"),
  investigation: Yup.string().required("Required"),
  weeks: Yup.string().required("Required"),
  policyDocument: Yup.string().required("Required"),
  claimProcess: Yup.string().required("Required"),
  heading: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
};

export const insuranceTravelIndividualSchema = (t: any) => ({
  packageName: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  packageLogo: Yup.string().required(t("required")),
  medicalCover: Yup.string().required(t("required")),
  coveringUpTo: Yup.string().required(t("required")),
  packageDescription: Yup.string()
    .min(2, t("atleast_2_CharactersLong"))
    .required(t("required")),
  CountryName: Yup.string().required(t("required")),
  packageCategory: Yup.string().required(t("required")),
});

export const insuranceTravelIndividualMedicalInfoSchema = (t: any) => ({
  medicalExpense: Yup.string().required(t("required")),
  repatriationofMortalRemains: Yup.string().required(t("required")),
  repatriationInCaseIllness: Yup.string().required(t("required")),
  returnofDependentChildren: Yup.string().required(t("required")),
  deliveryOfMedicine: Yup.string().required(t("required")),
  emergencyReturnHome: Yup.string().required(t("required")),
});

export const insuranceTravelFamilyMedicalInfoSchema = (t: any) => ({
  accidentalDisability: Yup.string().required(t("required")),
  repatriationofMortalRemains: Yup.string().required(t("required")),
  expensesHospitalization: Yup.string().required(t("required")),
  emergencyReturnHome: Yup.string().required(t("required")),
});

export const insuranceTravelIndividualBenefitsSchema = (t: any) => ({
  flghtDelay: Yup.string().required(t("required")),
  lossofPassport: Yup.string().required(t("required")),
  delayinArrival: Yup.string().required(t("required")),
  lossOfBaggage: Yup.string().required(t("required")),
});

export const insuranceTravelFamilyBenefitsSchema = {
  tripCancel: Yup.string().required("Required"),
  delayinArrival: Yup.string().required("Required"),
  flightDelay: Yup.string().required("Required"),
  travelandStay: Yup.string().required("Required"),
  lossofPassport: Yup.string().required("Required"),
  lossOfBaggage: Yup.string().required("Required"),
};
export const insuranceTravelPriceSchema = (t: any) => ({
  actualPrice: Yup.string()
    .min(2, t("atLeast2DigitsLong"))
    .required(t("required")),
  perYear: Yup.string().min(2, t("atLeast2DigitsLong")).required(t("required")),
});
export const insuranceTravelPolicyDocuments = (t: any) => ({
  PolicyDocument: Yup.string().required(t("required")),
});

export const travelAgencyAddTourSchema = {
  packageName: Yup.string()
    .min(2, "Must be at least 2 Digits long")

    .required("Required"),
  packageDuration: Yup.string().required("Required"),
  from: Yup.string()
    .min(2, "Must be at least 2 Digits long")
    .max(15, "Must be 15 Digits or less")
    .required("Required"),
  to: Yup.string()
    .min(2, "Must be at least 2 Digits long")
    .max(15, "Must be 15 Digits or less")
    .required("Required"),
  departDate: Yup.string().required("Required"),
  departTime: Yup.string().required("Required"),
  returnDate: Yup.string().required("Required"),
  returnTime: Yup.string().required("Required"),
  seatLimit: Yup.string()
    .min(2, "Must be at least 2 Digits long")
    .max(15, "Must be 15 Digits or less")
    .required("Required"),
  class: Yup.string().required("Required"),
};

export const travelAgencyAddTourFacilitiesSchema = {
  breakfast: Yup.string().required("Required"),
  lunch: Yup.string().required("Required"),
  dinner: Yup.string().required("Required"),
  dayByDay: Yup.string()
    .min(2, "Must be at least 2 Character long")

    .required("Required"),
};

export const travelAgencyAddTourPoliciesSchema = {
  tourPolicy: Yup.string()
    .min(2, "Must be at least 2 Character long")

    .required("Required"),
};

export const travelAgencyAddTourPriceSchema = {
  priceperHead: Yup.string()
    .min(2, "Must be at least 2 Character long")
    .max(15, "Must be 15 Character or less")
    .required("Required"),
  priceperCouple: Yup.string()
    .min(2, "Must be at least 2 Character long")
    .max(15, "Must be 15 Character or less")
    .required("Required"),
};
export const AddminLoginSchema = {
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
};
// ...........B2C ............/
export const AppointmentSchema = Yup.object({
  appointmentType: Yup.string().required("Please select an appointment type."),
  // ppointmentType: Yup.string().required("Appointment type is required"),
  // paymentCountry: Yup.string().required("Payment country is required"),
  // paymentType: Yup.string().required("Payment type is required"),
});

export const insurancePriceSchema_ = (t: any) => ({
  actualPrice: Yup.number()
    .typeError(t("priceMustBeValidNumber"))
    .positive(t("priceMustBeGreaterThanZero"))
    .required(t("priceIsRequired")),

  perYear: Yup.string().required(t("perYearIsRequired")),
});

export const addTourPackage = (t: any, step: number, selected: string) => {
  const schema: Record<string, any> = {
    // Step 0 validations
    packageName: Yup.string().required(t("required")),
    region: Yup.string().required(t("selectRegion")),
    className: Yup.string().required(t("selectClass")),
    from: Yup.string().required(t("required")),
    to: Yup.string().required(t("required")),
    pickUpDropOff: Yup.string().required(t("required")),
    departDate: Yup.string().required(t("required")),
    returnDate: Yup.string().required(t("required")),
    departTime: Yup.string().required(t("required")),
    returnTime: Yup.string().required(t("required")),
    pricePerHead: Yup.number()
      .positive(t("priceMustBeGreaterThanZero"))
      .typeError(t("priceMustBeValidNumber"))
      .required(t("required")),
    pricePerCouple: Yup.number()
      .positive(t("priceMustBeGreaterThanZero"))
      .typeError(t("priceMustBeValidNumber"))
      .required(t("required")),
    images: Yup.array()
      .min(1, t("atleastOneImage_"))
      .required(t("atleastOneImage_")),
    limitedSeats: Yup.number()
      .typeError(t("mustBeNumber"))
      .required(t("required"))
      .min(1, t("mustBeGreaterThanZero")),
    stay: Yup.object().shape({
      day: Yup.number()
        .typeError(t("mustBeNumber"))
        .required(t("required"))
        .min(1, t("mustBeGreaterThanZero")),
      night: Yup.number()
        .typeError(t("mustBeNumber"))
        .required(t("required"))
        .min(1, t("mustBeGreaterThanZero")),
    }),
  };

  // Step 1-specific validation
  if (step === 1) {
    schema.dayByDayPlans = Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.number().required(),
          text: Yup.string().trim().required(t("pleaseEnterDetailsForEachDay")),
        })
      )
      .min(1, t("pleaseAddAtLeastOneDay"));
  } else if (step === 2) {
    schema.accommodations = Yup.string().required(t("required"));
    schema.transportation = Yup.string().required(t("required"));
    schema.ourTeam = Yup.string().required(t("required"));
    schema.cancellationPolicy = Yup.string().required(t("required"));
    if (selected === "repeat") {
      schema.repetition = Yup.array()
        .of(
          Yup.object().shape({
            departDate: Yup.string().required(t("required")),
            returnDate: Yup.string().required(t("required")),
            departTime: Yup.string().required(t("required")),
            returnTime: Yup.string().required(t("required")),
          })
        )
        .min(1, t("pleaseAddAtLeastOneDay"));
    }
  }

  return Yup.object().shape(schema);
};

export const cityData = [
  "Abbottabad",
  "Ahmedpur East",
  "Alipur",
  "Alipur Chattha",
  "Arifwala",
  "Attock",
  "Awaran",
  "Badin",
  "Bahawalnagar",
  "Bahawalpur",
  "Bannu",
  "Bhan Saeedabad",
  "Bhawana",
  "Burewala",
  "Chachro",
  "Chagai",
  "Chak Jhumra",
  "Chakwal",
  "Charsadda",
  "Chawinda",
  "Chichawatni",
  "Chilas",
  "Chiniot",
  "Chishtian",
  "Chitral",
  "Chor",
  "Dadu",
  "Daharki",
  "Dalbandin",
  "Darya Khan",
  "Daska",
  "Daultala",
  "Dera Ghazi Khan",
  "Dera Ismail Khan",
  "Digri",
  "Dinga",
  "Dunyapur",
  "Faisalabad",
  "Farooqabad",
  "Fateh Jang",
  "Fort Abbas",
  "Gambat",
  "Ghotki",
  "Gilgit",
  "Gojra",
  "Golarchi",
  "Gujar Khan",
  "Gujranwala",
  "Gujrat",
  "Gwadar",
  "Hafizabad",
  "Hangu",
  "Haripur",
  "Hasilpur",
  "Hassan Abdal",
  "Hub",
  "Hujra Shah Muqeem",
  "Hyderabad",
  "Islamabad",
  "Islamkot",
  "Jacobabad",
  "Jahanian",
  "Jalalpur Pirwala",
  "Jamshoro",
  "Jand",
  "Jaranwala",
  "Jatoi",
  "Jauharabad",
  "Jhang",
  "Jhelum",
  "Jiwani",
  "Kabirwala",
  "Kadhan",
  "Kalat",
  "Kalabagh",
  "Kalat",
  "Kamoke",
  "Kandhkot",
  "Kandiaro",
  "Karachi",
  "Kasur",
  "Kashmore",
  "Khairpur",
  "Khairpur Nathan Shah",
  "Khanewal",
  "Kharan",
  "Kharian",
  "Khushab",
  "Khuzdar",
  "Kohat",
  "Kohlu",
  "Kot Addu",
  "Kot Diji",
  "Kot Momin",
  "Kot Radha Kishan",
  "Kotli",
  "Kotli Sattian",
  "Kunri",
  "Lahore",
  "Lakki Marwat",
  "Lalian",
  "Larkana",
  "Layyah",
  "Liaquatpur",
  "Lodhran",
  "Mailsi",
  "Malakand",
  "Mansehra",
  "Mandi Bahauddin",
  "Mandi Faizabad",
  "Manga Mandi",
  "Mardan",
  "Mashkay",
  "Mastung",
  "Matli",
  "Matiari",
  "Mianwali",
  "Minchinabad",
  "Mingora",
  "Mirpur Bathoro",
  "Mirpur Khas",
  "Mirpur Mathelo",
  "Mirpur Sakro",
  "Mirwah",
  "Mithi",
  "Multan",
  "Muridke",
  "Murree",
  "Muzaffargarh",
  "Muzaffarabad",
  "Nagarparkar",
  "Nankana Sahib",
  "Narowal",
  "Nawabshah",
  "New Saeedabad",
  "Nowshera",
  "Nushki",
  "Okara",
  "Pabbi",
  "Pakpattan",
  "Pano Aqil",
  "Parachinar",
  "Pasni",
  "Pasrur",
  "Pattoki",
  "Peshawar",
  "Phalia",
  "Pind Dadan Khan",
  "Pir Jo Goth",
  "Pir Mahal",
  "Pishin",
  "Qila Abdullah",
  "Qila Didar Singh",
  "Quetta",
  "Rahim Yar Khan",
  "Rajanpur",
  "Rangpur",
  "Renala Khurd",
  "Risalpur",
  "Rawalpindi",
  "Rohri",
  "Rojhan",
  "Sadiqabad",
  "Sahiwal",
  "Sakrand",
  "Samaro",
  "Sambrial",
  "Sanghar",
  "Sangla Hill",
  "Sarai Alamgir",
  "Sargodha",
  "Sehwan",
  "Shahdadkot",
  "Shahdadpur",
  "Shahkot",
  "Shahpur Chakar",
  "Shakargarh",
  "Sheikhupura",
  "Shikarpur",
  "Shorkot",
  "Shujaabad",
  "Sibi",
  "Sialkot",
  "Sinjhoro",
  "Sohbatpur",
  "Sukkur",
  "Swabi",
  "Swat",
  "Taunsa",
  "Taxila",
  "Thal",
  "Thal",
  "Thari Mirwah",
  "Tharparkar",
  "Thatta",
  "Toba Tek Singh",
  "Turbat",
  "Umerkot",
  "Vehari",
  "Wah",
  "Wana",
  "Wazirabad",
  "Zahir Pir",
  "Zhob",
  "Ziarat",
];
// ...........Vendor Screen ............//

export const Vendor_cards = [
  {
    id: 1,
    name: "doctorAndConsultants",
    description: "description1",
    img: vendor01,
    color: "#00BDAF",
    type: "doctor",
    route: "/doctor/login",
    no: "01",
  },
  {
    id: 2,
    name: "hospitalAndClinics",
    description: "hospitalAndClinicsDesc",
    img: vendor02,
    color: "#13A89E",
    type: "hospital",
    route: "/hospital/login",
    no: "02",
  },
  {
    id: 3,
    name: "laboratory",
    description: "laboratoryDesc",
    img: vendor03,
    color: "#F19E69",
    type: "laboratory",
    route: "/laboratory/login",
    no: "03",
  },
  {
    id: 4,
    name: "peramedicStaff",
    description: "peramedicStaffDesc",
    img: vendor04,
    color: "#FFC537",
    type: "paramedic",
    route: "/paramedic/login",
    no: "04",
  },
  {
    id: 5,
    name: "pharmacy",
    description: "pharmacyDesc",
    img: vendor05,
    color: "#2BB2FE",
    type: "pharmacy",
    route: "/pharmacy/login",
    no: "05",
  },
  {
    id: 6,
    name: "pharmaceutical",
    description: "pharmaceuticalDesc",
    img: vendor06,
    color: "#099BED",
    type: "pharmaceutical",
    route: "/pharmaceutical/login",
    no: "06",
  },
  {
    id: 7,
    name: "physiotherapist",
    description: "physiotherapistDesc",
    img: vendor07,
    color: "#A2968E",
    type: "physiotherapist",
    route: "/physiotherapist/login",
    no: "07",
  },
  {
    id: 8,
    name: "psychologist",
    description: "psychologistDesc",
    img: vendor08,
    color: "#DE987C",
    type: "psychologist",
    route: "/psychologist/login",
    no: "08",
  },
  {
    id: 9,
    name: "nutritionist",
    description: "nutritionistDesc",
    img: vendor09,
    color: "#BCC3A0",
    type: "nutritionist",
    route: "/nutritionist/login",
    no: "09",
  },
  {
    id: 10,
    name: "ambulance",
    description: "ambulanceDesc",
    img: vendor10,
    color: "#FF7979",
    type: "ambulance",
    route: "/ambulance/login",
    no: "10",
  },
  {
    id: 11,
    name: "hotel",
    description: "hotelDesc",
    img: vendor11,
    color: "#336BD1",
    type: "hotel",
    route: "/hotel/login",
    no: "11",
  },
  {
    id: 12,
    name: "travelAgency",
    description: "travelAgencyDesc",
    img: vendor12,
    color: "#829EFA",
    type: "travelagency",
    route: "/travelagency/login",
    no: "12",
  },
  {
    id: 13,
    name: "rentACar",
    description: "rentACarDesc",
    img: vendor13,
    color: "#829FFF",
    type: "rentacar",
    route: "/rentacar/login",
    no: "13",
  },
  {
    id: 14,
    name: "insurance",
    description: "insuranceDesc",
    img: vendor14,
    color: "#A196E1",
    type: "insurance",
    route: "/insurance/login",
    no: "14",
  },
  {
    id: 15,
    name: "donation",
    description: "donationDesc",
    img: vendor15,
    color: "#ED9393",
    type: "donation",
    route: "/donation/login",
    no: "15",
  },
];

export const Yes_No = (t: any) => [t("no"), t("yes")];

export const steps = (t: any) => [
  {
    id: "1",
    lable: t("basicInfo&Covering"),
  },
  {
    id: "2",
    lable: t("medicalBenifits"),
  },
  {
    id: "3",
    lable: t("travelBenefits"),
  },
  {
    id: "4",
    lable: t("policy"),
  },
  {
    id: "5",
    lable: t("price"),
  },
];

export const Medical = ["10,000", "20,000", "30,000", "40,000", "50,000"];
export const Covering = (t: any) => [
  `1 ${t("days")}`,
  `2 ${t("days")}`,
  `3 ${t("days")}`,
  `4 ${t("days")}`,
  `5 ${t("days")}`,
  `6 ${t("days")}`,
  `7 ${t("days")}`,
  `8 ${t("days")}`,
  `9 ${t("days")}`,
  `10 ${t("days")}`,
];
export const PackageCategory = (t: any) => [
  t("silver"),
  t("gold"),
  t("platinum"),
];

export const LossofPassport = (t: any) => [
  `6 ${t("hours")}`,
  `12 ${t("hours")}`,
  `24 ${t("hours")}`,
];

export const Healthsteps = (t: any) => [
  {
    id: "1",
    lable: t("basicInfo&Limites"),
  },
  {
    id: "2",
    lable: t("hospitals"),
  },
  {
    id: "3",
    lable: t("labs"),
  },
  {
    id: "4",
    lable: t("medicalBenifits"),
  },
  {
    id: "5",
    lable: t("price"),
  },
];

export const AccidentalEmergencie = ["5k pkr", " 10k pkr", "15k pkr"];

export const WaitingPeriod = (t: any) => [
  `2 ${t("weeks")}`,
  `4 ${t("weeks")}`,
  `6 ${t("weeks")}`,
  `8 ${t("weeks")}`,
];

export const Maternity = (t: any) => [
  t("payAdditionalAmount"),
  t("GetCoveredForupToAmount"),
];

export const Investigations = (t: any) => [
  `${t("covered")} (${t("subLimit")} - Rs. 10,000)`,
  `${t("covered")} (${t("subLimit")} - Rs. 15,000)`,
  `${t("covered")} (${t("subLimit")} - Rs. 20,000)`,
];

export const Region = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Azad Jammu and Kashmir",
  "Gilgit-Baltistan",
];
export const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const Class = ["Economy Class", "First Class", "Luxury Class"];

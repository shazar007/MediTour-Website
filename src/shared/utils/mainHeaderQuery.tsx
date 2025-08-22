import servicehome from "assets/images/servicesHome.png"
import privacyNew from "assets/images/privacynew.png"
import freeopd from "assets/images/freeopd.png"
import FQS from "assets/images/faq.png"


// export const ABOUTUS = {
//   heading: "About Us",
//   data: ["Home", "About Us"],
//   sideimg:about,
// };

// export const TREATMENTS = {
//   heading: "Medical Treatments",
//   sideimg:treatment,
//   data: ["Home", "Medical Treatments"],
// };

export const treatmentDetails = (state: any,t:any) => ({
  backgroundImage: state?.item?.img || state?.item?.image,
  item: state?.item,
  heading: state?.item?.subCategory || state?.mainTitle,
  data: [
    t("home"),
    t("medicalTreatments"),
    state?.mainTitle,
    state?.item?.subCategory,
  ],
});

export const SERVICES =(t:any)=> ({
  heading: t("ourServices"),
  data: [t("home"), t("ourServices")],
  sideimg:servicehome,
});
export const WHYPAKISTAN = {
  heading: "",
  data: [""],
  // backgroundImage:
  // "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};

export const AmbulanceService =(t:any)=> ({
  heading: t("ambulance"),
  data: [t("home"), t("ambulance")],
  backgroundImage:
    "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});
// export const PATEINT_GUIDE = {
//   heading: "Patient Guide",
//   sideimg:patientguide,
//   data: ["Home", "Patient Guide"],
//   // backgroundImage:
//     // "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FPatient-guide%404x.jpg?alt=media&token=d4fea183-f1e4-4f50-b18c-63cbf6704f01",
// };

// export const CONTACT_US = {
//   heading: "Contact Us",
//   data: ["Home", "Contact Us"],
//   sideimg:contact,
//   // backgroundImage:
//     // "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FContact-us%404x.jpg?alt=media&token=9371a495-b531-48a9-aa7a-e276557b8dbf",
// };
export const Free_Opd = (activeTab: any,t:any) => ({
  heading: activeTab,
  sideimg:freeopd,
  data: [t("home"), activeTab],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FFree-OPD%404x.jpg?alt=media&token=53cedc06-d2bf-4ba6-a826-7d40a2a8c277",
});

export const FAQpagedata = (t:any)=> ({
  heading: t("frequentlyAsked"),
  sideimg:FQS,
  data: [t("home"), t("faqs")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FFAQs%404x.jpg?alt=media&token=81bb6ead-f4b4-4929-ae9d-defb5eab3585",
});
export const Vendor = {
  heading: "     Service Provider",
  data: ["Home", "    Service Provider"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FJoin-as-a-vender%404x.jpg?alt=media&token=26e02778-15f2-4361-89b7-bfa1b8f188a9",
};

// export const DOCTOR = {
//   heading: "What Do you need?",
//   data: ["Home", "Services"],
//   // backgroundImage:
//   //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FContact-us%404x.jpg?alt=media&token=9371a495-b531-48a9-aa7a-e276557b8dbf",
// };

// export const HOSPITALS_AND_DOCTORS = (serviceName: any) => ({
//   heading: serviceName,
//   data: ["Home", "Services", serviceName],
//   // backgroundImage:
//   //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
// });

export const DOCTOR_DETAILS = (serviceName?: any) => ({
  // heading: serviceName || "Doctors",
  // data: ["Home", "Services", serviceName || "Doctor", "Details"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const PARAMEDIC_STAFF = (t:any) => ({
  heading: t("requestForm"),
  data: [t("home"), t("services"), t("requestForm")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const HOSPITAL_DETAILS = (t:any) => ({
  heading: t("hospital"),
  data: [t("home"), t("services"), t("hospital"), t("details")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});
export const ORDER_DETAILS =(t:any)=> ({
  heading: t("orderHistory"),
  data: [t("home"), t("orderHistory"), t("details")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});
export const LABORATORY = (t:any) =>  ({
  heading: t("laboratory"),
  data: [t("home"), t("services"), t("laboratory")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const LABORATORY_DETAILS = (t:any) => ({
  heading: t("laboratory"),
  data: [t("home"), t("services"), t("laboratory"), t("product")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const LABORATORY_Booking = {
  heading: "Laboratory",
  data: ["Home", "Services", "Laboratory", "Details", "Booking & Payment"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};
export const PAYMENT_NAVBAR = (t:any) => ({
  heading: t("payment"),
  data: [t("home"), t("payment")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FAbout-us%404x.jpg?alt=media&token=c5258340-bb7b-408e-90a2-f7c4ed801cc3",
});

export const MY_APPOINTMENT_PRESCRIPTION =(t:any)=> ({
  heading: t("myAppointments"),
  data: [t("home"), t("myAppointments"), t("prescription")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FAbout-us%404x.jpg?alt=media&token=c5258340-bb7b-408e-90a2-f7c4ed801cc3",
});

export const INSURANCE_NAVBAR = (t:any) =>  ({
  heading: t("myBookings"),
  data: [t("home"), t("myBookings")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FAbout-us%404x.jpg?alt=media&token=c5258340-bb7b-408e-90a2-f7c4ed801cc3",
});

export const INSURANCE_DETAIL = {
  heading: "Insurance",
  data: ["Home", "Services", "Insurance", "Detail"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FAbout-us%404x.jpg?alt=media&token=c5258340-bb7b-408e-90a2-f7c4ed801cc3",
};

export const TRAVEL_AGENCY_BOOKING = {
  heading: "Travel Agency",
  data: ["Home", "Travel Agency", "Tour"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FAbout-us%404x.jpg?alt=media&token=c5258340-bb7b-408e-90a2-f7c4ed801cc3",
};

export const PHARMACY = (t:any) => ({
  heading: t("pharmacy"),
  data: [t("home"), t("Services"), t("pharmacy")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const PHARMACY_CART = (t:any) => ({
  heading:t("pharmacy"),
  data: [t("home"), t("Services"), t("pharmacy")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const MY_APPOINTMENTS =(t:any) => ({
  heading: t("myAppointments"),
  data: [t("home"), t("myAppointments")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});
export const Insurancepay = {
  heading: "Insurance",
  data: ["Home", "Services", "Insurance"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};
export const MY_APPOINTMENT_DETAILS = (stripeOpen: any,t:any) => ({
  heading: t("myAppointments"),
  data: [t("home"), t("myAppointments"), t("details"), stripeOpen && t("payment")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const DOCTOR_APPOITMENT = (serviceName: any) => ({
  heading: "Doctor",
  data: ["Home", serviceName, "Appointment"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const HOME_SERVICES = {
  heading: "Home Services",
  data: [" Home", " Home Services"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FAbout-us%404x.jpg?alt=media&token=c5258340-bb7b-408e-90a2-f7c4ed801cc3",
};

export const MY_BOOKING = (t:any) =>  ({
  heading: t("myBookings"),
  data: [t("home"), t("myBookings")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FAbout-us%404x.jpg?alt=media&token=c5258340-bb7b-408e-90a2-f7c4ed801cc3",
});

export const TRAVEL_BOOKING = {
  heading: " TravelAgencies",
  data: ["Home", "Services", "Travel Agencies", "Tour", "Details"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FAbout-us%404x.jpg?alt=media&token=c5258340-bb7b-408e-90a2-f7c4ed801cc3",
};

export const BOOKING_HOTEL_DETAIL = {
  heading: " My Booking",
  data: [" Home", " My Booking", " Detail"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FAbout-us%404x.jpg?alt=media&token=c5258340-bb7b-408e-90a2-f7c4ed801cc3",
};

export const RENT_A_CAR = {
  heading: "Rent a Car",
  data: ["Home", "Services", "Reant a Car"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};

export const RENT_A_CAR_DETAIL = (t:any) => ({
  heading: t("rentACar"),
  data: [t("home"), t("services"), t("rentACar"), t("details")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const TRAVEL_AGENCY = {
  heading: "Travel Agencies",
  data: ["Home", "Services", "Travel Agencies"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};

export const TOUR_DETAIL = (t:any) => ({
  heading: t("travelAgencies"),
  data: [t("home"), t("services"), t("travelAgencies"), t("tour"), t("details")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const TRAVEL_DETAIL = (t:any) => ({
  heading: t("myBookings"),
  data: [t("home"), t("myBookings")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const MY_REQUEST = (t:any) => ({
  heading: t("requests"),
  data: [t("home"), t("requests")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const MY_ORDER_HISTORY =(t:any)=> ({
  heading: t("orderHistory"),
  data: [t("home"), t("orderHistory")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const PROFILE =(t?:any)=> ({
  heading: t("myProfile"),
  data: [t("home"), t("myProfile")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const FAVOURITES = (t:any) => ({
  heading: t("myFavorites"),
  data: [t("home"), t("myFavorites")],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
});

export const DONATION_PACKAGE = {
  heading: "Donation",
  data: ["Home", "Services", "Donation"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};

export const PRIVACY_POLICY = {
  heading: "Privacy Policy",
  sideimg: privacyNew,
  data: ["Home", "Privacy Policy"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FPrivacy-Policy%404x.jpg?alt=media&token=1788321f-c2ab-4979-973b-b872b3dc1c37",
};

export const HOTEL = {
  heading: "Hotel",
  data: ["Home", "Services", "Hotel"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};

export const HOTEL_DETAILS = {
  heading: "Hotel",
  data: ["Home", "Services", "Hotel", "Details"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};

export const DONATION = {
  heading: "Donation",
  data: ["Home", "Services", "Donation"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};

export const DONATION_HELP_CARD_DETAILS = {
  heading: "Donation",
  data: ["Home", "Services", "Donation"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};

export const DONATION_EDU = {
  heading: " Donation",
  data: ["Home", "Services", "Donation"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};

export const INSURANCE = {
  heading: "Insurance",
  data: ["Homes", "Services", "Insurance"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};
export const Request = {
  heading: "Request",
  data: ["Home", "Request"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};
export const Travelinformation = {
  heading: "Request",
  data: ["Home", "Request", "Details"],
  // backgroundImage:
  //   "https://firebasestorage.googleapis.com/v0/b/meditourglobal-ea15d.appspot.com/o/assets%2FOur-Services%404x.jpg?alt=media&token=9be64732-6e29-441e-ae44-e7b49484c32b",
};

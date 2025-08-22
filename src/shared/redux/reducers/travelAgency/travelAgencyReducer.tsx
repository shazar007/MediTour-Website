import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  travelagencyuser_id: null,
  travelagency: {},
  istravelagencyEmailVerified: false,
  istravelagencyPhoneVerified: false,
  travelagencyUserFormData: {
    name: "",
    logo: "",
    licenseNumber: "",
    licenseExpiry: "",
    licenseImage: "",
    emergencyNumber: "",
    ownerFirstName: "",
    ownerLastName: "",
    cnicNumber: "",
    cnicExpiry: "",
    cnicImage: "",
    address: "",
    lat: "",
    lng: "",
    city: "",
    //........social....
    fbUrl: "",
    instaUrl: "",
    twitterUrl: "",
    webUrl: "",

    travelDashboardDetails: {
      lastMonthFlightBooking: 0,
      lastMonthTourBooking: 0,
      recentTourSchedule: [],
      todayFlightBooking: 0,
      todayTourBooking: 0,
    },
  },
  ticketRequests: [],
  ticketRequestLength: 0,
  ticketRequestRenderFlag: true,

  travelTours: [],
  travelToursRenderFlag: true,
  travelTourLenghth: 0,

  flightMonthArray: [],
  tourMonthArray: [],
  addtour: {},
  ticketBids: [],
  ticketBidId: null,

  flightPaymentsArray: [],
  tourPaymentsArray: [],
  isLoggedIn: false,
};

export const travelagencyReducer = createSlice({
  name: "travelagency",
  initialState,
  reducers: {
    setTravelAgencyUserFormData: (state, action) => {
      state.travelagencyUserFormData = action.payload;
    },
    setTicketBids: (state, action) => {
      state.ticketBids = action.payload;
    },
    setTicketBidId: (state, action) => {
      state.ticketBidId = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setTravelAgencyIsEmailVerified: (state, action) => {
      state.istravelagencyEmailVerified = action.payload;
    },
    setTravelAgencyIsPhoneVerified: (state, action) => {
      state.istravelagencyPhoneVerified = action.payload;
    },
    setTravelAgencyUser_ID: (state, action) => {
      state.travelagencyuser_id = action.payload;
    },
    setTravelAgency: (state, action) => {
      state.travelagency = action.payload;
    },
    setTravelDashboardDetails: (state, action) => {
      state.travelDashboardDetails = action.payload;
    },
    setTicketRequests: (state, action) => {
      state.ticketRequests = action.payload;
    },
    setTicketRequestLength: (state, action) => {
      state.ticketRequestLength = action.payload;
    },
    setTicketRequestRenderFlag: (state, action) => {
      state.ticketRequestRenderFlag = action.payload;
    },
    setTravelTours: (state, action) => {
      state.travelTours = action.payload;
    },
    setTravelToursRenderFlag: (state, action) => {
      state.travelToursRenderFlag = action.payload;
    },
    setTravelTourLenghth: (state, action) => {
      state.travelTourLenghth = action.payload;
    },
    setAddtour: (state, action) => {
      state.addtour = action.payload;
    },
    setFlightMonthArray: (state, action) => {
      state.flightMonthArray = action.payload;
    },
    setTourMonthArray: (state, action) => {
      state.tourMonthArray = action.payload;
    },
    setFlightPaymentsArray: (state, action) => {
      state.flightPaymentsArray = action.payload;
    },
    setTourPaymentsArray: (state, action) => {
      state.tourPaymentsArray = action.payload;
    },
    // signOut: (state) => {
    //   state.user = null;
    //   state.colorCode = "#19383A";
    //   state.authToken = null;
    //   state.isLoggedIn = false;
    // },
  },
});

export const {
  setTravelAgencyUserFormData,
  setTravelAgencyIsEmailVerified,
  setTravelAgencyIsPhoneVerified,
  setTravelAgencyUser_ID,
  setTravelAgency,
  setTravelDashboardDetails,
  setTicketRequests,
  setTicketRequestRenderFlag,
  setTicketRequestLength,
  setTravelTours,
  setTravelToursRenderFlag,
  setTravelTourLenghth,
  setAddtour,
  setFlightMonthArray,
  setTourMonthArray,
  setFlightPaymentsArray,
  setTourPaymentsArray,
  setTicketBids,
  setTicketBidId,
  // signOut,
} = travelagencyReducer.actions;

export default travelagencyReducer.reducer;

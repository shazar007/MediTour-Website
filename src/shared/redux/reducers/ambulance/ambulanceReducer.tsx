import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  AmbulanceUser_id: null,
  ambulance: {},
  isAmbulanceEmailVerified: false,
  isAmbulancePhoneVerified: false,
  ambulanceUserFormData: {
    ambulanceAmbulanceName: "",
    ambulanceLogo: "",
    ambulanceRegistrationNumber: "",
    ambulanceRegistrationExpiry: "",
    ambulanceRegistrationImage: "",
    ambulanceFirstOwnerName: "",
    ambulanceLastOwnerName: "",
    ambulanceEmergencyNumber: "",
    ambulanceCnicNumber: "",
    ambulanceCnicExpiryDate: "",
    ambulanceCnicImage: "",
    address: "", //////////////
    lat: "", /////////////
    lng: "", /////////////
    city: "", /////////////
    //......Social
    ambulancefbUrl: "",
    ambulanceistinstaUrl: "",
    ambulancetwitterUrl: "",
    ambulancewebUrl: "",
  },
  requestGraphData: [],
  onRouteGraphData: [],
  recentBooking: [],
  ambulanceDashboardDetails: {
    onRoutePercentage: "",
    onRequestPercentage: "",
    todayOnRouteCount: "",
    todayRequestCount: "",
  },
  monthArray: [],
  ambulanceDashboardrenderFlag: true,
  ambulanceAmbulancerenderFlag: true,
  ambulances: [],
  pageno: 1,
  currentPage: 1,
  ambulanceLength: true,
  ambulanceRequests: [],

  ambulanceRequestFlag: true,
  ambulanceRequestLength: 0,
  ambulanceOnroute: [],
  ambulanceOnrouteLength: 0,
  ambulanceOnrouteRenderFlag: true,
};

export const ambulanceReducer = createSlice({
  name: "ambulance",
  initialState,
  reducers: {
    setAmbulanceUserFormData: (state, action) => {
      state.ambulanceUserFormData = action.payload;
    },
    setAmbulanceDashboardrenderFlag: (state, action) => {
      state.ambulanceDashboardrenderFlag = action.payload;
    },
    setAmbulancerequestGraphData: (state, action) => {
      state.requestGraphData = action.payload;
    },
    setAmbulanceonRouteGraphData: (state, action) => {
      state.onRouteGraphData = action.payload;
    },
    setAmbulancerecentBooking: (state, action) => {
      state.recentBooking = action.payload;
    },
    setAmbulanceDashboardDetails: (state, action) => {
      state.ambulanceDashboardDetails = action.payload;
    },
    setAmbulanceMonthArray: (state, action) => {
      state.monthArray = action.payload;
    },
    setAmbulanceAmbulancerenderFlag: (state, action) => {
      state.ambulanceAmbulancerenderFlag = action.payload;
    },
    setAmbulances: (state, action) => {
      state.ambulances = action.payload;
    },
    setPageno: (state, action) => {
      state.pageno = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setAmbulanceLength: (state, action) => {
      state.ambulanceLength = action.payload;
    },
    setAmbulanceRequests: (state, action) => {
      state.ambulanceRequests = action.payload;
    },
    setAmbulanceRequestFlag: (state, action) => {
      state.ambulanceRequestFlag = action.payload;
    },
    setAmbulanceRequestLength: (state, action) => {
      state.ambulanceRequestLength = action.payload;
    },
    setAmbulanceOnroute: (state, action) => {
      state.ambulanceOnroute = action.payload;
    },
    setAmbulanceOnrouteLength: (state, action) => {
      state.ambulanceOnrouteLength = action.payload;
    },
    setAmbulanceOnrouteRenderFlag: (state, action) => {
      state.ambulanceOnrouteRenderFlag = action.payload;
    },
    setIsAmbulanceEmailVerified: (state, action) => {
      state.isAmbulanceEmailVerified = action.payload;
    },
    setIsAmbulancePhoneVerified: (state, action) => {
      state.isAmbulancePhoneVerified = action.payload;
    },
    setAmbulanceUser_ID: (state, action) => {
      state.AmbulanceUser_id = action.payload;
    },
    setAmbulance: (state, action) => {
      state.ambulance = action.payload;
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
  setPageno,
  setCurrentPage,
  setAmbulanceUserFormData,
  setAmbulanceDashboardrenderFlag,
  setAmbulancerequestGraphData,
  setAmbulanceonRouteGraphData,
  setAmbulancerecentBooking,
  setAmbulanceDashboardDetails,
  setAmbulanceMonthArray,
  setAmbulanceAmbulancerenderFlag,
  setAmbulances,
  setAmbulanceLength,
  setAmbulanceRequests,
  setAmbulanceRequestFlag,
  setAmbulanceRequestLength,
  /////
  setAmbulanceOnroute,
  setAmbulanceOnrouteLength,
  setAmbulanceOnrouteRenderFlag,
  setIsAmbulanceEmailVerified,
  setIsAmbulancePhoneVerified,
  setAmbulanceUser_ID,
  setAmbulance,
  // signOut,
} = ambulanceReducer.actions;

export default ambulanceReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  rentcaruser_id: null,
  rentcar: {},
  isrentcarEmailVerified: false,
  isrentcarPhoneVerified: false,
  rentcarUserFormData: {
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
    fbUrl: "",
    instaUrl: "",
    twitterUrl: "",
    webUrl: "",
  },

  dashboardCustomerGraph: [],
  vehicle: [],
  vehicleRenderFlag: true,
  vehicleLength: 0,
  dashboardDetails: {
    todayRequestCount: 0,
    totalRequest: "",
    totalPending: "",
  },
  customerList: [],
  rentCarCustomerLength: 0,
  rentCarCustomerRenderFlag: true,
  rentcarorders: [],
  rentcarorderLength: 0,
  rentcarOrderRenderFlag: true,
  isLoggedIn: false,
};

export const rentcarReducer = createSlice({
  name: "rentcar",
  initialState,
  reducers: {
    setRentCarUserFormData: (state, action) => {
      state.rentcarUserFormData = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setRentCarIsEmailVerified: (state, action) => {
      state.isrentcarEmailVerified = action.payload;
    },
    setRentCarIsPhoneVerified: (state, action) => {
      state.isrentcarPhoneVerified = action.payload;
    },
    setRentCarUser_ID: (state, action) => {
      state.rentcaruser_id = action.payload;
    },
    setRentCar: (state, action) => {
      state.rentcar = action.payload;
    },
    setDashboardCustomerGraph: (state, action) => {
      state.dashboardCustomerGraph = action.payload;
    },
    setDashboardDetails: (state, action) => {
      state.dashboardDetails = action.payload;
    },
    setVahicle: (state, action) => {
      state.vehicle = action.payload;
    },
    setVehicleRenderFlag: (state, action) => {
      state.vehicleRenderFlag = action.payload;
    },
    setVehicleLength: (state, action) => {
      state.vehicleLength = action.payload;
    },
    setCustomerList: (state, action) => {
      state.customerList = action.payload;
    },
    setrentcarOrders: (state, action) => {
      state.rentcarorders = action.payload;
    },
    setrentcarOrderLength: (state, action) => {
      state.rentcarorderLength = action.payload;
    },
    setRentcarOrderRenderFlag: (state, action) => {
      state.rentcarOrderRenderFlag = action.payload;
    },
    setRentCarCustomerLength: (state, action) => {
      state.rentCarCustomerLength = action.payload;
    },
    setRentCarCustomerRenderFlag: (state, action) => {
      state.rentCarCustomerRenderFlag = action.payload;
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
  setRentCarUserFormData,
  setRentCarIsEmailVerified,
  setRentCarIsPhoneVerified,
  setRentCarUser_ID,
  setRentCar,
  setDashboardCustomerGraph,
  setDashboardDetails,
  setVahicle,
  setVehicleRenderFlag,
  setVehicleLength,
  setCustomerList,
  setrentcarOrders,
  setrentcarOrderLength,
  setRentcarOrderRenderFlag,
  setRentCarCustomerLength,
  setRentCarCustomerRenderFlag,
  // signOut,
} = rentcarReducer.actions;

export default rentcarReducer.reducer;

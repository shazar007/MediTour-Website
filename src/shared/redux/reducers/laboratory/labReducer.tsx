import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  labuser_id: null,
  lab: {},
  isEmailVerified: false,
  isPhoneVerified: false,
  labUserFormData: {
    name: "",
    labLogo: "",
    labLicenseNumber: "",
    labLicenseImage: "",
    labLicenseExpiry: "",
    labOwnerFirstName: "",
    labOwnerLastName: "",
    labEmergencyNumber: "",
    labCnicNumber: "",
    labCnicImage: "",
    labCnicExpiryDate: "",
    address: "",
    lat: "",
    lng: "",
    city: "",
    labDescription: "",
    labOpenTime: "",
    labCloseTime: "",
    //........social....
    fbUrl: "",
    instaUrl: "",
    twitterUrl: "",
    webUrl: "",
    //.......Bank.....
    incomeTaxNo: "",
    saleTaxNo: "",
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    //......verification......
    // phoneNo: "",
    // email: "",
    // password: "",
    // confirmPassword: "",
  },
  labGraphDetails: {
    comOrdersPercentageChange: "",
    completeTodayOrdersCount: "",
    newOrdersPercentageChange: "",
    pendingPercentageChange: "",
    pendingYesOrdersCount: "",
    todayOrdersCount: "",
  },
  dayArray: [],
  dayArray2: [],
  tests: [],
  lengthh: 0,
  orders: [],
  orderLength: 0,
  labNotification: "",
  isLoggedIn: false,
  renderLabdashboardFlag: true,
  renderFlag: true,
  renderOrderFlag: true,

  renderResultFlag: true,
  results: [],
  resultslength: 0,
};

export const labReducer = createSlice({
  name: "lab",
  initialState,
  reducers: {
    setLabUserFormData: (state, action) => {
      state.labUserFormData = action.payload;
    },
    setRenderFlag: (state, action) => {
      state.renderFlag = action.payload;
    },
    setrenderLabdashboardFlag: (state, action) => {
      state.renderLabdashboardFlag = action.payload;
    },
    setLabGraphDetails: (state, action) => {
      state.labGraphDetails = action.payload;
    },
    setLabdayArray: (state, action) => {
      state.dayArray = action.payload;
    },
    setLabdayArray2: (state, action) => {
      state.dayArray2 = action.payload;
    },
    setrenderLabOrderFlag: (state, action) => {
      state.renderOrderFlag = action.payload;
    },
    setTestsss: (state, action) => {
      state.tests = action.payload;
    },
    setTestLength: (state, action) => {
      state.lengthh = action.payload;
    },
    setOrder: (state, action) => {
      state.orders = action.payload;
    },
    setOrderLength: (state, action) => {
      state.orderLength = action.payload;
    },
    setRenderResultFlag: (state, action) => {
      state.renderResultFlag = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setResultslength: (state, action) => {
      state.resultslength = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setIsEmailVerified: (state, action) => {
      state.isEmailVerified = action.payload;
    },
    setIsPhoneVerified: (state, action) => {
      state.isPhoneVerified = action.payload;
    },
    setLabUser_ID: (state, action) => {
      state.labuser_id = action.payload;
    },
    setLab: (state, action) => {
      state.lab = action.payload;
    },
    setLabNotication: (state, action) => {
      state.labNotification = action.payload;
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
  setLabUserFormData,
  setLabGraphDetails,
  setLabdayArray,
  setLabdayArray2,
  setTestsss,
  setTestLength,
  setOrder,
  setOrderLength,
  /////////////////////
  setRenderResultFlag,
  setResults,
  setResultslength,
  setIsEmailVerified,
  setIsPhoneVerified,
  setLabUser_ID,
  setLab,
  setLabNotication,
  setrenderLabdashboardFlag,
  setRenderFlag,
  setrenderLabOrderFlag,
  // signOut,
} = labReducer.actions;

export default labReducer.reducer;

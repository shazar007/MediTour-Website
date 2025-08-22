import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  donationuser_id: null,
  donation: {},
  isdonationEmailVerified: false,
  isdonationPhoneVerified: false,
  donationUserFormData: {
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
  },
  donationGraphDetails: {
    totalDonations: "",
    donatedPeople: "",
    totalPackages: "",
  },
  graphdata: [],
  criterion: [],
  todayDonations: [],
  yesterdayDonations: [],
  topDonorsArray: [],
  PackagesArray: [],
  donationType: "",
  criterionRenderFlag: true,
  donationPackageRenderFlag: true,
  isLoggedIn: false,
};

export const donationReducer = createSlice({
  name: "donation",
  initialState,
  reducers: {
    setDonationUserFormData: (state, action) => {
      state.donationUserFormData = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setDonationIsEmailVerified: (state, action) => {
      state.isDonationEmailVerified = action.payload;
    },
    setDonationIsPhoneVerified: (state, action) => {
      state.isDonationPhoneVerified = action.payload;
    },
    setDonationUser_ID: (state, action) => {
      state.donationuser_id = action.payload;
    },
    setDonation: (state, action) => {
      state.donation = action.payload;
    },
    setGraphdata: (state, action) => {
      state.graphdata = action.payload;
    },
    setCriterion: (state, action) => {
      state.criterion = action.payload;
    },
    setCriterionRenderFlag: (state, action) => {
      state.criterionRenderFlag = action.payload;
    },
    setTodayDonations: (state, action) => {
      state.todayDonations = action.payload;
    },
    setYesterdayDonations: (state, action) => {
      state.yesterdayDonations = action.payload;
    },
    setTopDonorsArray: (state, action) => {
      state.topDonorsArray = action.payload;
    },
    setDonationGraphDetails: (state, action) => {
      state.donationGraphDetails = action.payload;
    },
    setPackages: (state, action) => {
      state.PackagesArray = action.payload;
    },
    setDonationPackageRenderFlag: (state, action) => {
      state.donationPackageRenderFlag = action.payload;
    },
    setDonationType: (state, action) => {
      state.donationType = action.payload;
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
  setDonationUserFormData,
  setDonationIsEmailVerified,
  setDonationIsPhoneVerified,
  setDonationUser_ID,
  setDonation,
  setGraphdata,
  setCriterion,
  setCriterionRenderFlag,
  setTodayDonations,
  setYesterdayDonations,
  setTopDonorsArray,
  setDonationGraphDetails,
  setPackages,
  setDonationPackageRenderFlag,
  setDonationType,
  // signOut,
} = donationReducer.actions;

export default donationReducer.reducer;

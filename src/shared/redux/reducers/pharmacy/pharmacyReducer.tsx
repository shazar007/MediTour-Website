import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  phUser_id: null,
  pharmacy: {},
  isPhEmailVerified: false,
  isPhPhoneVerified: false,
  pharmacyUserFormData: {
    name: "",
    pharmacyLogo: "",
    pharmacyLicenseNumber: "",
    pharmacyLicenseImg: "",
    pharmacyLicenseExpiry: "",
    pharmacyOwnerFirstName: "",
    pharmacyOwnerLastName: "",
    pharmacyEmergencyNumber: "",
    pharmacyCnicNumber: "",
    pharmacyCnicImg: "",
    pharmacyCnicExpiry: "",
    address: "",
    lat: "",
    lng: "",
    city: "",
    pharmacyDescription: "",
    pharamcyOpenTime: "",
    pharmacyCloseTime: "",
    pharmacyfbUrl: "",
    pharmacyinstaUrl: "",
    pharmacytwitterUrl: "",
    pharmacywebUrl: "",
  },

  pharmacyNotifications: "",

  renderFlag: true,
  renderpharmacyOrderFlag: true,
  renderpharmacyMedicineFlag: true,
  medicine: [],
  Length: 0,
  orders: [],
  orderLength: 0,
  pharmacyGraphDetails: {
    comOrdersPercentageChange: "",
    completeTodayOrdersCount: "",
    newOrdersPercentageChange: "",
    pendingPercentageChange: "",
    pendingYesOrdersCount: "",
    todayOrdersCount: "",
  },
  dayArray: [],
  dayArray2: [],
};

export const pharmacyReducer = createSlice({
  name: "pharmacy",
  initialState,
  reducers: {
    setPharmacyUserFormData: (state, action) => {
      state.pharmacyUserFormData = action.payload;
    },
    setPharmacyRenderFlag: (state, action) => {
      state.renderFlag = action.payload;
    },
    setrenderpharmacyOrderFlag: (state, action) => {
      state.renderpharmacyOrderFlag = action.payload;
    },
    setpharmacyMedicine: (state, action) => {
      state.medicine = action.payload;
    },
    setrenderpharmacyMedicineFlag: (state, action) => {
      state.renderpharmacyMedicineFlag = action.payload;
    },
    setPharmacyLength: (state, action) => {
      state.Length = action.payload;
    },
    setPharmacyOrder: (state, action) => {
      state.orders = action.payload;
    },
    setPharmacyOrderLength: (state, action) => {
      state.orderLength = action.payload;
    },
    setPharmacyGraphDetails: (state, action) => {
      state.pharmacyGraphDetails = action.payload;
    },
    setdayArray: (state, action) => {
      state.dayArray = action.payload;
    },
    setday2Array: (state, action) => {
      state.dayArray2 = action.payload;
    },
    setIsPhEmailVerified: (state, action) => {
      state.isPhEmailVerified = action.payload;
    },
    setIsPhPhoneVerified: (state, action) => {
      state.isPhoneVerified = action.payload;
    },
    setPhUser_id: (state, action) => {
      state.phUser_id = action.payload;
    },
    setPharmacy: (state, action) => {
      state.pharmacy = action.payload;
    },
    setPharmacyNotication: (state, action) => {
      state.pharmacyNotifications = action.payload;
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
  setPharmacyUserFormData,
  setPharmacyRenderFlag,
  setrenderpharmacyOrderFlag,
  setrenderpharmacyMedicineFlag,
  setpharmacyMedicine,
  setPharmacyLength,
  setPharmacyOrder,
  setPharmacyOrderLength,
  setPharmacyGraphDetails,
  setdayArray,
  setday2Array,
  setIsPhEmailVerified,
  setIsPhPhoneVerified,
  setPhUser_id,
  setPharmacy,
  setPharmacyNotication,
  // signOut,
} = pharmacyReducer.actions;

export default pharmacyReducer.reducer;

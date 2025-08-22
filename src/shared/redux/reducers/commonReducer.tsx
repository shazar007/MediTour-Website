import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  systemType: "",
  token: null,
  rentacarItem: null,
  isLoggedIn: false,
  open: false,
  mainSelectedRoute: "/",
  medicalSelectedRoute: "doctor/login",
  homeServiceSelectedRoute: "ambulance/login",
  fetch: null,
  travelSelectedRoute: "hotel/login",
  exchangeRate: null,
  cart: [],
  fcmToken: "",
  obj: null,
  hotelDetail: {},
  user: null,
  query: null,
  paidAmount: null,
  paymentParams: null,
  user_id: null,
  hospitalId: null,
  userAge: "",
  location: {
    latitude: null,
    longitude: null,
  },
  meetingJoined: null,
  pateintData: {},
  startCall: false,
  hotelInfo: {},
  doctorFormData: {
    type: "",
    name: "",
    cnicNumber: "",
    cnicImage: "",
    cnicExpiry: "",
    qualification: "",
    speciality: "",
    clinicName: "",
    experience: "",
    pmdcNumber: "",
    pmdcImage: "",
    pmdcExpiry: "",
    address: "",
    lat: "",
    lng: "",
    city: "",
    fbUrl: "",
    instaUrl: "",
    twitterUrl: "",
    webUrl: "",
  },
  hospitalFormData: {
    name: "",
    logo: "",
    registrationNo: "",
    registrationImage: "",
    registrationExpiry: "",
    ownerFirstName: "",
    ownerLastName: "",
    emergencyNumber: "",
    cnicNumber: "",
    cnicImage: "",
    cnicExpiryDate: "",
    address: "",
    lat: "",
    lng: "",
    city: "",
    openTime: "",
    closeTime: "",
    fbUrl: "",
    instaUrl: "",
    twitterUrl: "",
    webUrl: "",
  },

  is_EmailVerified: false,
  is_PhoneVerified: false,
};

export const commonReducer = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSystemType: (state, action) => {
      state.systemType = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRentaCarItem: (state, action) => {
      state.rentacarItem = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setMedicalSelectedRoute: (state, action) => {
      state.medicalSelectedRoute = action.payload;
    },
    setmainSelectedRoute: (state, action) => {
      state.mainSelectedRoute = action.payload;
    },
    setHomeServiceSelectedRoute: (state, action) => {
      state.homeServiceSelectedRoute = action.payload;
    },
    setTravelSelectedRoute: (state, action) => {
      state.travelSelectedRoute = action.payload;
    },
    setDoctorFormData: (state, action) => {
      state.doctorFormData = action.payload;
    },
    setHotelInfo: (state, action) => {
      state.hotelInfo = action.payload;
    },
    setHospitalFormData: (state, action) => {
      state.hospitalFormData = action.payload;
    },
    set_IsEmailVerified: (state, action) => {
      state.is_EmailVerified = action.payload;
    },
    set_IsPhoneVerified: (state, action) => {
      state.is_PhoneVerified = action.payload;
    },
    set_User: (state, action) => {
      state.user = action.payload;
    },
    set_query: (state, action) => {
      state.query = action.payload;
    },
    set_Fetch: (state, action) => {
      state.fetch = action.payload;
    },
    set_User_ID: (state, action) => {
      state.user_id = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setHotelDetail: (state, action) => {
      state.hotelDetail = action.payload;
    },
    setObj: (state, action) => {
      state.obj = action.payload;
    },
    setPaymentParams: (state, action) => {
      state.paymentParams = action.payload;
    },
    setPaidAmount: (state, action) => {
      state.paidAmount = action.payload;
    },
    setHospitalId: (state, action) => {
      state.hospitalId = action.payload;
    },
    setUserAge: (state, action) => {
      state.userAge = action.payload;
    },
    setExchangeRate: (state, action) => {
      state.exchangeRate = action.payload;
    },
    setMeetingJoined: (state, action) => {
      state.meetingJoined = action.payload;
    },
    setPateintData: (state, action) => {
      state.pateintData = action.payload;
    },
    setStartCall: (state, action) => {
      state.startCall = action.payload;
    },

    logOutUser: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const {
  setFcmToken,
  setSystemType,
  setToken,
  setIsLoggedIn,
  setMedicalSelectedRoute,
  setmainSelectedRoute,
  setHomeServiceSelectedRoute,
  setTravelSelectedRoute,
  setDoctorFormData,
  setHospitalFormData,
  set_IsEmailVerified,
  setCart,
  set_IsPhoneVerified,
  set_User,
  set_Fetch,
  set_User_ID,
  setLocation,
  setObj,
  set_query,
  setPaymentParams,
  setPaidAmount,
  setRentaCarItem,
  setHospitalId,
  setHotelDetail,
  setUserAge,
  setExchangeRate,
  setMeetingJoined,
  setPateintData,
  setStartCall,
  setHotelInfo,
  setOpen,
  logOutUser,
} = commonReducer.actions;

export default commonReducer.reducer;

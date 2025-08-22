import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  hoteluser_id: null,
  hotel: {},
  ishotelEmailVerified: false,
  ishotelPhoneVerified: false,
  hotelUserFormData: {
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
  hotelB_B: {
    propertyName: "",
    startRating: "",
    userName: "",
    contactNo: "",
    alternativeCellNo: "",
    postCode: "",
    propertyAddress: "",

    rooms: [],
    //Facilities
    parkingAvailability: "",
    priceForParking: "",
    spokenLanguageYourStaff: "",
    facilities: [],
    propertySurroundings: [],
    //Amenities
    extraBedAvailability: "",
    noOfExtraBeds: "",
    guestsInExtraBeds: [],
    amenities: [],
    propertyphotos: [],
  },
  hotelAddRoom: {
    guestBook: "",
    //////
    propertyName: "",
    name: "",
    contactNo: "",
    alternativeContactNo: "",
    postCode: "",
    propertyAddress: "",
    partOfCompany: "",
    channelManager: "",
    companyName: "",
    managerName: "",
    /////
    homeType: "",
    customName: "",
    noofBedRoom: 0,
    noofDiningRoom: 0,
    noofBathRoom: 0,
    noofKitchens: 0,
    noofFloor: 0,
    beds: [],

    guestno: 0,
    privateBatroom: true,
    //
    commonSofaBed: 0,
    commonGuest: 0,
    appartmentSize: 0,
    basicpricePerNight: 0,
    pricepernightformeditour: 0,
    homeImages: [],
    ////////////////no of staying guest

    //
    parking: "",
    private: "",
    onSite: "",
    reservationNeeded: "",
    price: "",
    LanguageSpoken: "",
    facillities: [],
    propertySurroundings: [],
    amenities: [],
    propertyphotos: [],
  },
  hotelAddAppartment: {
    propertyName: "",
    name: "",
    contactNo: "",
    alternativeContactNo: "",
    postCode: "",
    propertyAddress: "",
    partOfCompany: "",
    companyName: "",
    channelManager: "",
    managerName: "",
    //
    apartments: [],
    ///

    parking: "",
    PriceOfParking: "",
    LanguageSpoken: "",
    facillities: [],
    propertySurroundings: [],
    //
    amenities: [],
    propertyphotos: [],
  },
  hotelGraphArray: [],
  hotelGraphDetail: {
    totalReservationsCount: 0,
    totalConfirmedBookings: 0,
  },
  dashboardReservation: [],
  dashboardHotelPropertyCounts: {
    totalHomes: 0,
    totalApartments: 0,
    totalBnbs: 0,
  },
  hotelDashboardBookings: [],
  hotelReservation: [],
  hotelReservationLength: 0,
  hotelReservationRenderFlag: true,
  hotelBookings: [],
  hotelBookingLength: 0,
  hotelBookingRenderFlag: true,

  properties: [],
  propertieslength: 0,

  isLoggedIn: false,
};

export const hotelReducer = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setHotelUserFormData: (state, action) => {
      state.hotelUserFormData = action.payload;
    },
    setHotelB_B: (state, action) => {
      state.hotelB_B = action.payload;
    },
    setHotelAddRoom: (state, action) => {
      state.hotelAddRoom = action.payload;
    },
    setHotelAddAppartment: (state, action) => {
      state.hotelAddAppartment = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setHotelIsEmailVerified: (state, action) => {
      state.ishotelEmailVerified = action.payload;
    },
    setHotelIsPhoneVerified: (state, action) => {
      state.ishotelPhoneVerified = action.payload;
    },
    setHotelUser_ID: (state, action) => {
      state.hoteluser_id = action.payload;
    },
    setHotel: (state, action) => {
      state.hotel = action.payload;
    },
    setHotelGraphArray: (state, action) => {
      state.hotelGraphArray = action.payload;
    },
    setHotelGraphDetail: (state, action) => {
      state.hotelGraphDetail = action.payload;
    },
    setDashboardReservation: (state, action) => {
      state.dashboardReservation = action.payload;
    },
    setDashboardHotelPropertyCounts: (state, action) => {
      state.dashboardHotelPropertyCounts = action.payload;
    },
    setHotelDashboardBookings: (state, action) => {
      state.hotelDashboardBookings = action.payload;
    },
    setHotelReservation: (state, action) => {
      state.hotelReservation = action.payload;
    },
    setHotelReservationLength: (state, action) => {
      state.hotelReservationLength = action.payload;
    },
    setHotelReservationRenderFlag: (state, action) => {
      state.hotelReservationRenderFlag = action.payload;
    },
    setHotelBookings: (state, action) => {
      state.hotelBookings = action.payload;
    },
    setHotelBookingLength: (state, action) => {
      state.hotelBookingLength = action.payload;
    },
    setHotelBookingRenderFlag: (state, action) => {
      state.hotelBookingRenderFlag = action.payload;
    },
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    setPropertiesLength: (state, action) => {
      state.propertieslength = action.payload;
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
  setHotelUserFormData,
  setHotelB_B,
  setHotelAddRoom,
  setHotelAddAppartment,
  setHotelIsEmailVerified,
  setHotelIsPhoneVerified,
  setHotelUser_ID,
  setHotel,
  setHotelGraphArray,
  setHotelGraphDetail,
  setDashboardReservation,
  setDashboardHotelPropertyCounts,
  setHotelDashboardBookings,
  setHotelReservation,
  setHotelReservationLength,
  setHotelReservationRenderFlag,
  setHotelBookings,
  setHotelBookingLength,
  setHotelBookingRenderFlag,
  setProperties,
  setPropertiesLength,
  // signOut,
} = hotelReducer.actions;

export default hotelReducer.reducer;

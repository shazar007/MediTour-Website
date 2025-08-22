import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  paramedicUser_id: null,
  paramedic: {},
  isParamedicEmailVerified: false,
  isParamedicPhoneVerified: false,
  paramedicUserFormData: {
    paramedicdrName: "",
    paramedicdrImage: "",
    paramedicCnic: "",
    paramedicCnicImage: "",
    paramedicQualification: "",
    paramedicSpeciality: "",
    paramedicService: "",
    paramedicClinicExperiences: "",
    paramedicClinicName: "",
    paramedicClinicLogo: "",
    paramedicClinicAddress: "",
    paramedicPmdcNumber: "",
    paramedicPmdcImage: "",
    paramedicEmergencyNumber: "",
    //......Social
    paramedicfbUrl: "",
    paramedicistinstaUrl: "",
    paramedictwitterUrl: "",
    paramedicwebUrl: "",
  },
  peramedicdashboardrenderFlag: true,
  peramedicGraphDetails: {
    todayAppointCount: 0,
    todayPatientCount: 0,
    appointmentPercentageChange: "",
    patientPercentageChange: "",
    waitingPatients: 0,
    waitingPercentageChange: "",
    curedPatientCount: 0,
    curedPercentageChange: "",
    doctorName: "",
  },
  peramedicupcomingAppointment: {
    _id: "",
    doctorId: "",
    patientId: "",
    date: "",
    createdAt: "",
    status: "",
    appointmentType: "",
  },
  peramedicdayArray: [],
  peramedicdayArray2: [],

  peramedicRequests: [],
  peramedicRequestsFlag: true,
  peramedicRequestLength: 0,

  peramedicAppointments: [],
  peramedicAppointmentFlag: true,
  peramedicAppointmentLenght: 0,
  peramedicAppointmentpateint: [],

  peramedicPatientHistory: [],
  peramedicPatientHistoryFlag: true,
  peramedicPatientLength: 0,
};

export const paramedicReducer = createSlice({
  name: "paramedic",
  initialState,
  reducers: {
    setParamedicUserFormData: (state, action) => {
      state.paramedicUserFormData = action.payload;
    },
    setPeraAppointmentWithFullData: (state, action) => {
      const { index, datatodispatch } = action.payload;
      state.peramedicAppointments[index].prescriptionData = datatodispatch;
    },
    setPeramedicdashboardrenderFlag: (state, action) => {
      state.peramedicdashboardrenderFlag = action.payload;
    },
    setPeramedicGraphDetails: (state, action) => {
      state.peramedicGraphDetails = action.payload;
    },
    setPeramedicupcomingAppointment: (state, action) => {
      state.peramedicupcomingAppointment = action.payload;
    },
    setPeramedicdayArray: (state, action) => {
      state.peramedicdayArray = action.payload;
    },
    setPeramedicdayArray2: (state, action) => {
      state.peramedicdayArray2 = action.payload;
    },
    setPeramedicRequests: (state, action) => {
      state.peramedicRequests = action.payload;
    },
    setPeramedicRequestsFlag: (state, action) => {
      state.peramedicRequestsFlag = action.payload;
    },
    setperamedicRequestLength: (state, action) => {
      state.peramedicRequestLength = action.payload;
    },
    setPeramedicAppointments: (state, action) => {
      state.peramedicAppointments = action.payload;
    },
    setPeramedicAppointmentFlag: (state, action) => {
      state.peramedicAppointmentFlag = action.payload;
    },
    setPeramedicAppointmentLenght: (state, action) => {
      state.peramedicAppointmentLenght = action.payload;
    },
    setperamedicAppointmentpateint: (state, action) => {
      state.peramedicAppointmentpateint = action.payload;
    },
    setIsParamedicEmailVerified: (state, action) => {
      state.isParamedicEmailVerified = action.payload;
    },
    setIsParamedicPhoneVerified: (state, action) => {
      state.isParamedicPhoneVerified = action.payload;
    },
    setParamedicUser_ID: (state, action) => {
      state.paramedicUser_id = action.payload;
    },
    setParamedic: (state, action) => {
      state.paramedic = action.payload;
    },
    setPeramedicPatientHistory: (state, action) => {
      state.peramedicPatientHistory = action.payload;
    },
    setPeramedicPatientHistoryFlag: (state, action) => {
      state.peramedicPatientHistoryFlag = action.payload;
    },
    setPeramedicPatientLength: (state, action) => {
      state.peramedicPatientLength = action.payload;
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
  setPeraAppointmentWithFullData,
  setParamedicUserFormData,
  setPeramedicdashboardrenderFlag,
  setPeramedicGraphDetails,
  setPeramedicupcomingAppointment,
  setPeramedicdayArray,
  setPeramedicdayArray2,
  setPeramedicRequests,
  setPeramedicRequestsFlag,
  setperamedicRequestLength,
  setPeramedicAppointments,
  setPeramedicAppointmentFlag,
  setPeramedicAppointmentLenght,
  setperamedicAppointmentpateint,
  setIsParamedicEmailVerified,
  setIsParamedicPhoneVerified,
  setParamedicUser_ID,
  setParamedic,
  setPeramedicPatientHistory,
  setPeramedicPatientHistoryFlag,
  setPeramedicPatientLength,
  // signOut,
} = paramedicReducer.actions;

export default paramedicReducer.reducer;

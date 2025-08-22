import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  physioUser_id: null,
  physiotherapist: {},
  isphysioEmailVerified: false,
  isphysioPhoneVerified: false,
  physioUserFormData: {
    physiotherapistDoctorName: "",
    physiotherapistImage: "",
    physiotherapistCnic: "",
    physiotherapistCnicImage: "",
    physiotherapistQualification: "",
    physiotherapistSpeciality: "",
    physiotherapistServices: "",
    physiotherapistClinicName: "",
    physiotherapistClinicLogo: "",
    physiotherapistPmdcNumber: "",
    physiotherapistLicenceImage: "",
    physiotherapistEmergencyNumber: "",
    physiotherapistClinicAddress: "",
    physiotherapistClinicExperiences: "",
    //......Social
    physiotherapistfbUrl: "",
    physiotherapistinstaUrl: "",
    physiotherapisttwitterUrl: "",
    physiotherapistwebUrl: "",
  },
  physiotherapistRequests: [],
  physiotherapistRequestsFlag: true,
  physiotherapistRequestLength: 0,

  physiotherapistAppointments: [],
  physiotherapistAppointmentFlag: true,
  physiotherapistAppointmentLenght: 0,

  physiotherapistdashboardrenderFlag: true,
  physiotherapistGraphDetails: {
    todayAppointCount: 0,
    todayPatientCount: 0,
    appointmentPercentageChange: "",
    patientPercentageChange: "",
    waitingPatients: 0,
    waitingPercentageChange: "",
    curedPatientCount: 0,
    curedPercentageChange: "",
  },
  physiotherapistupcomingAppointment: {
    _id: "",
    doctorId: "",
    patientId: "",
    date: "",
    createdAt: "",
    status: "",
    appointmentType: "",
  },
  physiotherapistdayArray: [],
  physiotherapistdayArray2: [],
  physiotherapistpateint: [],

  physiotherapistPatientHistory: [],
  physiotherapistPatientLength: 0,
  physiotherapistPatientHistoryFlag: true,
};

export const physiotherapistReducer = createSlice({
  name: "physiotherapist",
  initialState,
  reducers: {
    setphysioUserFormData: (state, action) => {
      state.physioUserFormData = action.payload;
    },
    setPhysioAppointmentWithFullData: (state, action) => {
      const { index, datatodispatch } = action.payload;
      state.physiotherapistAppointments[index].prescriptionData =
        datatodispatch;
    },
    setPhysiotherapistdashboardrenderFlag: (state, action) => {
      state.physiotherapistdashboardrenderFlag = action.payload;
    },
    setPhysiotherapistGraphDetails: (state, action) => {
      state.physiotherapistGraphDetails = action.payload;
    },
    setPhysiotherapistupcomingAppointment: (state, action) => {
      state.physiotherapistupcomingAppointment = action.payload;
    },
    setPhysiotherapistdayArray: (state, action) => {
      state.physiotherapistdayArray = action.payload;
    },
    setPhysiotherapistdayArray2: (state, action) => {
      state.physiotherapistdayArray2 = action.payload;
    },

    setPhysiotherapistRequests: (state, action) => {
      state.physiotherapistRequests = action.payload;
    },
    setPhysiotherapistRequestsFlag: (state, action) => {
      state.physiotherapistRequestsFlag = action.payload;
    },
    setPhysiotherapistRequestLength: (state, action) => {
      state.physiotherapistRequestLength = action.payload;
    },
    setPhysiotherapistAppointmentpateint: (state, action) => {
      state.physiotherapistpateint = action.payload;
    },
    setphysiotherapistAppointments: (state, action) => {
      state.physiotherapistAppointments = action.payload;
    },
    setPhysiotherapistAppointmentFlag: (state, action) => {
      state.physiotherapistAppointmentFlag = action.payload;
    },
    setPhysiotherapistAppointmentLenght: (state, action) => {
      state.physiotherapistAppointmentLenght = action.payload;
    },
    setPhysiotherapistPatientHistory: (state, action) => {
      state.physiotherapistPatientHistory = action.payload;
    },
    setPhysiotherapistPatientLength: (state, action) => {
      state.physiotherapistPatientLength = action.payload;
    },
    setPhysiotherapistPatientHistoryFlag: (state, action) => {
      state.physiotherapistPatientHistoryFlag = action.payload;
    },
    setIsphysioEmailVerified: (state, action) => {
      state.isphysioEmailVerified = action.payload;
    },
    setIsphysioPhoneVerified: (state, action) => {
      state.isphysioPhoneVerified = action.payload;
    },
    setphysioUser_ID: (state, action) => {
      state.physioUser_id = action.payload;
    },
    setPhysiotherapist: (state, action) => {
      state.physiotherapist = action.payload;
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
  setphysioUserFormData,
  setPhysioAppointmentWithFullData,
  setPhysiotherapistdashboardrenderFlag,
  setPhysiotherapistGraphDetails,
  setPhysiotherapistupcomingAppointment,
  setPhysiotherapistdayArray,
  setPhysiotherapistdayArray2,
  setPhysiotherapistRequests,
  setPhysiotherapistRequestsFlag,
  setPhysiotherapistRequestLength,

  setphysiotherapistAppointments,
  setPhysiotherapistAppointmentFlag,
  setPhysiotherapistAppointmentpateint,
  setPhysiotherapistAppointmentLenght,
  setPhysiotherapistPatientHistory,
  setPhysiotherapistPatientLength,
  setPhysiotherapistPatientHistoryFlag,

  setIsphysioEmailVerified,
  setIsphysioPhoneVerified,
  setphysioUser_ID,
  setPhysiotherapist,
  // signOut,
} = physiotherapistReducer.actions;

export default physiotherapistReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  psychologistuser_id: null,
  psychologist: {},
  ispsychologistEmailVerified: false,
  ispsychologistPhoneVerified: false,
  psychologistUserFormData: {
    psychologistDrName: "",
    psychologistDrImage: "",
    psychologistCnicNumber: "",
    psychologistCnicImage: "",
    psychologistQualification: "",
    psychologistSpeciality: "",
    psychologistService: "",
    psychologistExperience: "",
    psychologistClinicName: "",
    psychologistClinicLogo: "",
    psychologistClinicAddress: "",
    psychologistPmdcNumber: "",
    psychologistPmdcImage: "",
    psychologistEmergencyNumber: "",
    //........social....
    psychologistfbUrl: "",
    psychologistinstaUrl: "",
    psychologisttwitterUrl: "",
    psychologistwebUrl: "",
  },
  psydashboardrenderFlag: true,
  psyGraphDetails: {
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
  psyupcomingAppointmentt: {
    _id: "",
    doctorId: "",
    patientId: "",
    date: "",
    createdAt: "",
    status: "",
    appointmentType: "",
  },
  psydayArray: [],
  psydayArray2: [],

  psyRequests: [],
  psyRequestsFlag: true,
  psyRequestLength: 0,

  psyAppointmentFlag: true,
  psyAppointments: [],
  psyAppointmentLength: 0,
  psypatient: [],

  psyPatientHistory: [],
  psyPatientLength: 0,
  psyPatientHistoryrenderFlag: true,

  isLoggedIn: false,
};

export const PsychologistReducer = createSlice({
  name: "psychologist",
  initialState,
  reducers: {
    setpsychologistUserFormData: (state, action) => {
      state.psychologistUserFormData = action.payload;
    },
    setPsychologistAppointmentWithFullData: (state, action) => {
      const { index, datatodispatch } = action.payload;
      state.psyAppointments[index].prescriptionData = datatodispatch;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setIsPsychologistEmailVerified: (state, action) => {
      state.ispsychologistEmailVerified = action.payload;
    },
    setIsPsychologistPhoneVerified: (state, action) => {
      state.ispsychologistPhoneVerified = action.payload;
    },
    setPsychologistUser_ID: (state, action) => {
      state.psychologistuser_id = action.payload;
    },
    setPsychologist: (state, action) => {
      state.psychologist = action.payload;
    },
    setPsydashboardrenderFlag: (state, action) => {
      state.psydashboardrenderFlag = action.payload;
    },
    setPsyGraphDetails: (state, action) => {
      state.psyGraphDetails = action.payload;
    },
    setPsyupcomingAppointment: (state, action) => {
      state.psyupcomingAppointmentt = action.payload;
    },
    setPsydayArray: (state, action) => {
      state.psydayArray = action.payload;
    },
    setPsydayArray2: (state, action) => {
      state.psydayArray2 = action.payload;
    },
    setPsyRequests: (state, action) => {
      state.psyRequests = action.payload;
    },
    setPsyRequestsFlag: (state, action) => {
      state.psyRequestsFlag = action.payload;
    },
    setPsyRequestLength: (state, action) => {
      state.psyRequestLength = action.payload;
    },
    setPsyAppointmentFlag: (state, action) => {
      state.psyAppointmentFlag = action.payload;
    },
    setPsyAppointments: (state, action) => {
      state.psyAppointments = action.payload;
    },
    setPsyAppointmentLength: (state, action) => {
      state.psyAppointmentLength = action.payload;
    },
    setPsypatient: (state, action) => {
      state.psypatient = action.payload;
    },
    setPsyPatientHistory: (state, action) => {
      state.psyPatientHistory = action.payload;
    },
    setPsyPatientLength: (state, action) => {
      state.psyPatientLength = action.payload;
    },
    setPsyPatientHistoryrenderFlag: (state, action) => {
      state.psyPatientHistoryrenderFlag = action.payload;
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
  setpsychologistUserFormData,
  setPsychologistAppointmentWithFullData,
  setIsPsychologistEmailVerified,
  setIsPsychologistPhoneVerified,
  setPsychologistUser_ID,
  setPsychologist,
  setPsydashboardrenderFlag,
  setPsyGraphDetails,
  setPsyupcomingAppointment,
  setPsydayArray,
  setPsydayArray2,
  setPsyRequests,
  setPsyRequestsFlag,
  setPsyRequestLength,
  setPsyAppointmentFlag,
  setPsyAppointments,
  setPsyAppointmentLength,
  setPsypatient,
  setPsyPatientHistory,
  setPsyPatientLength,
  setPsyPatientHistoryrenderFlag,

  // signOut,
} = PsychologistReducer.actions;

export default PsychologistReducer.reducer;

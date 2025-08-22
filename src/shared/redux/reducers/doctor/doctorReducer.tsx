import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  DocUser_id: null,
  doctor: {},
  treatmentId: null,
  doctordashboardrenderFlag: true,
  doctorGraphDetails: {
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
  doctorupcomingAppointment: {
    _id: "",
    doctorId: "",
    patientId: "",
    date: "",
    createdAt: "",
    status: "",
    appointmentType: "",
  },
  dayArray: [],
  dayArray2: [],

  doctorAppointments: [],
  doctorAppointmentFlag: true,
  AppointmentLenght: 0,
  pateint: [],
  doctorsRequests: [],
  doctorsRequestsFlag: true,
  doctorRequestLength: 0,
  doctorPatientHistory: [],
  doctorPatientHistoryFlag: true,
  doctorPatientLength: 0,
};

export const doctorReducer = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorUserFormData: (state, action) => {
      state.doctorUserFormData = action.payload;
    },
    setDoctorAppointmentWithFullData: (state, action) => {
      const { index, datatodispatch } = action.payload;
      state.doctorAppointments[index].prescriptionData = datatodispatch;
    },
    setDoctordashboardrenderFlag: (state, action) => {
      state.doctordashboardrenderFlag = action.payload;
    },
    setDoctorGraphDetails: (state, action) => {
      state.doctorGraphDetails = action.payload;
    },
    setDoctorupcomingAppointment: (state, action) => {
      state.doctorupcomingAppointment = action.payload;
    },
    setDoctordayArray: (state, action) => {
      state.dayArray = action.payload;
    },
    setDoctordayArray2: (state, action) => {
      state.dayArray2 = action.payload;
    },
    setDoctorAppointments: (state, action) => {
      state.doctorAppointments = action.payload;
    },
    setDoctorAppointmentFlag: (state, action) => {
      state.doctorAppointmentFlag = action.payload;
    },
    setAppointmentLenght: (state, action) => {
      state.AppointmentLenght = action.payload;
    },
    setPateint: (state, action) => {
      state.pateint = action.payload;
    },

    setDoctorsRequests: (state, action) => {
      state.doctorsRequests = action.payload;
    },
    setDoctorsRequestsFlag: (state, action) => {
      state.doctorsRequestsFlag = action.payload;
    },
    setDoctorRequestLength: (state, action) => {
      state.doctorRequestLength = action.payload;
    },

    setDoctorPatientHistory: (state, action) => {
      state.doctorPatientHistory = action.payload;
    },
    setDoctorPatientLength: (state, action) => {
      state.doctorPatientLength = action.payload;
    },
    setDoctorPatientHistoryFlag: (state, action) => {
      state.doctorPatientHistoryFlag = action.payload;
    },

    setIsDoctorEmailVerified: (state, action) => {
      state.isDoctorEmailVerified = action.payload;
    },
    setIsDoctorPhoneVerified: (state, action) => {
      state.isDoctorPhoneVerified = action.payload;
    },
    setDocUser_ID: (state, action) => {
      state.DocUser_id = action.payload;
    },
    setDoctor: (state, action) => {
      state.doctor = action.payload;
    },
    setTreatmentId: (state, action) => {
      state.treatmentId = action.payload;
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
  setDoctorAppointmentWithFullData,
  setDoctorUserFormData,
  setDoctordashboardrenderFlag,
  setDoctorGraphDetails,
  setDoctorupcomingAppointment,
  setDoctordayArray,
  setDoctordayArray2,
  setDoctorAppointments,
  setDoctorAppointmentFlag,
  setAppointmentLenght,
  setPateint,
  setDoctorsRequests,
  setDoctorRequestLength,
  setDoctorsRequestsFlag,
  setDoctorPatientHistory,
  setDoctorPatientLength,
  setDoctorPatientHistoryFlag,
  setIsDoctorEmailVerified,
  setIsDoctorPhoneVerified,
  setDocUser_ID,
  setDoctor,
  setTreatmentId,
  // signOut,
} = doctorReducer.actions;

export default doctorReducer.reducer;

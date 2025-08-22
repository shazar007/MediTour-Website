import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  HospitalUser_id: null,
  hospital: {},
  isHospitalEmailVerified: false,
  isHospitalPhoneVerified: false,
  hospitalUserFormData: {
    hospitalName: "",
    hospitalLogo: "",
    hospitalRegistrationNo: "",
    hospitalRegistrationImage: "",
    hospitalRegistrationExpiry: "", //////
    ownerFirstName: "",
    ownerLastName: "",
    hospitalEmergencyNumber: "",
    hospitalCnicNumber: "",
    hospitalCnicImage: "",
    hospitalcnicExpiryDate: "", /////
    address: "",
    lat: "",
    lng: "",
    city: "",
    description: "",
    OpenTime: "",
    CloseTime: "",

    //social
    hospitalfbUrl: "",
    hospitalinstaUrl: "",
    hosiptaltwitterUrl: "",
    hospitalwebUrl: "",
  },
  hospitaldashboardrenderFlag: true,
  dashboardhospitalGetallAppointment: [],
  dashboardhospitalGetTodayAppointment: [],
  appointmentStats: {
    percentageTotalSessions: "",
    percentageVideo: "",
  },
  dashboardCounts: {
    newPatientsCount: 0,
    totalDoctors: 0,
    totalPatients: 0,
  },
  department: [],
  hospitalDoctors: [],
  hospitalDoctorsRenderFlag: true,
  hospitalDoctorsLength: 0,

  hosAppointments: [],
  hosAppointmentLength: 0,
  hosAppointmentRenderFlag: true,
  hosPatients: [],

  hosPatientHistory: [],
  hosPatientLength: 0,
  hosPatientHistoryRenderFlag: true,
};

export const hospitalReducer = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    setHospitalUserFormData: (state, action) => {
      state.hospitalUserFormData = action.payload;
    },
    setHospitalAppointmentWithFullData: (state, action) => {
      const { index, datatodispatch } = action.payload;
      state.hosAppointments[index].prescriptionData = datatodispatch;
    },
    setIsHospitalEmailVerified: (state, action) => {
      state.isHospitalEmailVerified = action.payload;
    },
    setIsHospitalPhoneVerified: (state, action) => {
      state.isHospitalPhoneVerified = action.payload;
    },
    setHospitalUser_ID: (state, action) => {
      state.HospitalUser_id = action.payload;
    },
    setHospital: (state, action) => {
      state.hospital = action.payload;
    },
    setHospitaldashboardrenderFlag: (state, action) => {
      state.hospitaldashboardrenderFlag = action.payload;
    },
    setDashboardhospitalGetallAppointment: (state, action) => {
      state.dashboardhospitalGetallAppointment = action.payload;
    },
    setDashboardhospitalGetTodayAppointment: (state, action) => {
      state.dashboardhospitalGetTodayAppointment = action.payload;
    },
    setAppointmentStats: (state, action) => {
      state.appointmentStats = action.payload;
    },
    setDashboardCounts: (state, action) => {
      state.dashboardCounts = action.payload;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
    setHospitalDoctors: (state, action) => {
      state.hospitalDoctors = action.payload;
    },
    setHospitalDoctorsLength: (state, action) => {
      state.hospitalDoctorsLength = action.payload;
    },
    setHospitalDoctorsRenderFlag: (state, action) => {
      state.hospitalDoctorsRenderFlag = action.payload;
    },
    setHosAppointments: (state, action) => {
      state.hosAppointments = action.payload;
    },
    setHosPatients: (state, action) => {
      state.hosPatients = action.payload;
    },
    setHosAppointmentLength: (state, action) => {
      state.hosAppointmentLength = action.payload;
    },
    setHosAppointmentRenderFlag: (state, action) => {
      state.hosAppointmentRenderFlag = action.payload;
    },
    setHosPatientHistory: (state, action) => {
      state.hosPatientHistory = action.payload;
    },
    setHosPatientLength: (state, action) => {
      state.hosPatientLength = action.payload;
    },
    setHosPatientHistoryRenderFlag: (state, action) => {
      state.hosPatientHistoryRenderFlag = action.payload;
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
  setHospitalUserFormData,
  setHospitalAppointmentWithFullData,
  setIsHospitalEmailVerified,
  setIsHospitalPhoneVerified,
  setHospitalUser_ID,
  setHospital,
  setHospitaldashboardrenderFlag,
  setDashboardhospitalGetallAppointment,
  setDashboardhospitalGetTodayAppointment,
  setAppointmentStats,
  setDashboardCounts,
  setDepartment,
  setHospitalDoctors,
  setHospitalDoctorsRenderFlag,
  setHospitalDoctorsLength,
  setHosAppointments,
  setHosPatients,
  setHosAppointmentLength,
  setHosAppointmentRenderFlag,
  setHosPatientHistory,
  setHosPatientLength,
  setHosPatientHistoryRenderFlag,
  // signOut,
} = hospitalReducer.actions;

export default hospitalReducer.reducer;

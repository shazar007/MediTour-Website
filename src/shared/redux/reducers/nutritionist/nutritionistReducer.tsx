import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  nutritionistUser_id: null,
  nutritionist: {},
  isNutritionistEmailVerified: false,
  isNutritionistPhoneVerified: false,
  nutritionistUserFormData: {
    nutritionistDrName: "",
    nutiritionistDrImage: "",
    nutritionistCnic: "",
    nutritionCnicImage: "",
    nutritionistQualification: "",
    nutritionistSpeciality: "",
    nutritionServices: "",
    nutritionClinicExperiences: "",
    nutritionistClinicName: "",
    nutritionClinicLogo: "",
    nutritionistClinicAddress: "",
    nutritionPmdcNumber: "",
    nutritionLicenseImage: "",
    nutritionDrEmergencyNumber: "",
    //......Social
    nutritionistfbUrl: "",
    nutritionistinstaUrl: "",
    nutritionisttwitterUrl: "",
    nutritionistwebUrl: "",
  },
  nutriGraphDetails: {
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
  nutridashboardrenderFlag: true,
  nutriupcomingAppointments: {
    _id: "",
    doctorId: "",
    patientId: "",
    date: "",
    createdAt: "",
    status: "",
    appointmentType: "",
  },
  nutridayArray: [],
  nutridayArray2: [],

  nutriRequests: [],
  nutrirequestLength: 0,
  nutriRequestRenderFlag: true,

  nutriAppointmentRenderFlag: true,
  nutriAppointments: [],
  nutriAppointmentLength: 0,
  nutriAppointmentPatient: [],

  nutriPatients: [],
  nutriPatientLength: 0,
  nutriPatientRenderFlag: true,
};

export const nutritionistReducer = createSlice({
  name: "nutritionist",
  initialState,
  reducers: {
    setNutritionistUserFormData: (state, action) => {
      state.nutritionistUserFormData = action.payload;
    },
    setNutriAppointmentWithFullData: (state, action) => {
      const { index, datatodispatch } = action.payload;
      state.nutriAppointments[index].prescriptionData = datatodispatch;
    },
    setIsNutritionistEmailVerified: (state, action) => {
      state.isNutritionistEmailVerified = action.payload;
    },
    setIsNutritionistPhoneVerified: (state, action) => {
      state.isNutritionistPhoneVerified = action.payload;
    },
    setNutritionistUser_ID: (state, action) => {
      state.nutritionistUser_id = action.payload;
    },
    setNutritionist: (state, action) => {
      state.nutritionist = action.payload;
    },
    setNutriGraphDetails: (state, action) => {
      state.nutriGraphDetails = action.payload;
    },
    setNutridashboardrenderFlag: (state, action) => {
      state.nutridashboardrenderFlag = action.payload;
    },
    setNutriupcomingAppointments: (state, action) => {
      state.nutriupcomingAppointments = action.payload;
    },
    setNutridayArray: (state, action) => {
      state.nutridayArray = action.payload;
    },
    setNutridayArray2: (state, action) => {
      state.nutridayArray2 = action.payload;
    },
    setNutriRequests: (state, action) => {
      state.nutriRequests = action.payload;
    },
    setNutrirequestLength: (state, action) => {
      state.nutrirequestLength = action.payload;
    },
    setNutriRequestRenderFlag: (state, action) => {
      state.nutriRequestRenderFlag = action.payload;
    },
    setNutriAppointmentRenderFlag: (state, action) => {
      state.nutriAppointmentRenderFlag = action.payload;
    },
    setNutriAppointments: (state, action) => {
      state.nutriAppointments = action.payload;
    },
    setNutriAppointmentLength: (state, action) => {
      state.nutriAppointmentLength = action.payload;
    },
    setNutriAppointmentPatient: (state, action) => {
      state.nutriAppointmentPatient = action.payload;
    },
    setNutriPatients: (state, action) => {
      state.nutriPatients = action.payload;
    },
    setNutriPatientLength: (state, action) => {
      state.nutriPatientLength = action.payload;
    },
    setNutriPatientRenderFlag: (state, action) => {
      state.nutriPatientRenderFlag = action.payload;
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
  setNutritionistUserFormData,
  setNutriAppointmentWithFullData,
  setIsNutritionistEmailVerified,
  setIsNutritionistPhoneVerified,
  setNutritionistUser_ID,
  setNutritionist,
  setNutriGraphDetails,
  setNutridashboardrenderFlag,
  setNutriupcomingAppointments,
  setNutridayArray,
  setNutridayArray2,
  setNutriRequests,
  setNutrirequestLength,
  setNutriRequestRenderFlag,
  setNutriAppointmentRenderFlag,
  setNutriAppointments,
  setNutriAppointmentLength,
  setNutriAppointmentPatient,
  setNutriPatients,
  setNutriPatientLength,
  setNutriPatientRenderFlag,
  // signOut,
} = nutritionistReducer.actions;

export default nutritionistReducer.reducer;

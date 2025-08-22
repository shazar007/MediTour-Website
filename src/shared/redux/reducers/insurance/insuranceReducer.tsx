import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  insuranceuser_id: null,
  insurance: {},
  isinsuranceEmailVerified: false,
  isinsurancePhoneVerified: false,
  insuranceUserFormData: {
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
  insuranceMySelfPackage: {
    insuranceAgestart: "",
    insuranceAgeend: "",
    hospitalizationStartLimit: "",
    hospitalizationEndLimit: "",
    gender: "",
    //Basic info
    packageName: "",
    packageLogo: "",
    hospitalizationPerPerson: "",
    dailyRoomBoardLimit: "",
    claimPayoutRatio: "",
    packageDescription: "",
    // Add Hopital
    hospitals: [],
    //Add Laboratory
    labs: [],
    //Medical Services
    icu: "",
    additionalLimit: "",
    ambulanceService: "",
    coverageSpecializedInvestigation: "",
    weeks: "",
    maternity: "",
    policyDocument: "",
    claimProcess: "",
    heading: "",
    description: "",
  },
  insuranceHealthFamilyPackage: {
    insuranceAgestart: "",
    insuranceAgeend: "",
    spouseAgeStart: "",
    spouseAgeEnd: "",
    kidsAgeStart: "",
    kidsAgeEnd: "",
    hospitalizationStartLimit: "",
    hospitalizationEndLimit: "",
    //
    packageName: "",
    packageLogo: "",
    hospitalizationPerPerson: "",
    dailyRoomBoardLimit: "",
    claimPayoutRatio: "",
    packageDescription: "",
    hospitals: [],
    labs: [],
    icu: "",
    additionalLimit: "",
    ambulanceService: "",
    opd: "",
    weeks: "",
    policyDocument: "",
    claimProcess: "",
    heading: "",
    description: "",
  },

  insuranceHealthParentPackage: {
    parentsAgeStart: "",
    parentsAgeEnd: "",
    hospitalizationStartLimit: "",
    hospitalizationEndLimit: "",
    packageName: "",
    packageLogo: "",
    hospitalizationPerPerson: "",
    dailyRoomBoardLimit: "",
    claimPayoutRatio: "",
    packageDescription: "",
    hospitals: [],
    labs: [],
    icu: "",
    additionalLimit: "",
    ambulanceService: "",
    maternity: "",
    investigation: "",
    weeks: "",
    ////
    policyDocument: "",
    claimProcess: "",
    heading: "",
    description: "",
  },
  insuranceTravelIndividual: {
    packageName: "",
    packageLogo: "",
    medicalCover: "",
    coveringUpTo: "",
    packageDescription: "",
    packageCategory: "",
    CountryName: "",
    //medical
    medicalExpense: "",
    repatriationofMortalRemains: "",
    repatriationInCaseIllness: "",
    returnofDependentChildren: "",
    deliveryOfMedicine: "",
    emergencyReturnHome: "",
    //travel
    flghtDelay: "",
    lossofPassport: "",
    delayinArrival: "",
    lossOfBaggage: "",
    //Policy
    PolicyDocument: "",
    //Price
  },

  insuranceTravelFamily: {
    packageName: "",
    packageLogo: "",
    medicalCover: "",
    coveringUpTo: "",
    packageDescription: "",
    CountryName: "",
    packageCategory: "",
    //medical
    accidentalDisability: "",
    repatriationofMortalRemains: "",
    expensesHospitalization: "",
    emergencyReturnHome: "",
    //travel
    tripCancel: "",
    delayinArrival: "",
    flightDelay: "",
    travelandStay: "",
    lossofPassport: "",
    lossOfBaggage: "",
    //Policy
    PolicyDocument: "",
    //Price
  },

  insuranceDashDetailss: {
    todayRequestCount: 0,
    todayCustomerCount: 0,
    travelPayments: [],
    healthPayments: [],
    totalTravelPayments: 0,
    totalHealthPayments: 0,
    totalRevenue: 0,
  },
  insuranceDashboardRenderFlag: true,
  dashboardMonthsArray: [],

  insuranceRequests: [],
  insuranceRequestLength: 0,
  insuranceRequestFlag: true,

  insuranceInsuredPersons: [],
  insuredPeronsLength: 0,
  insuredPersonsRenderFlag: true,

  isLoggedIn: false,

  ////getInsurances

  travelsingleInsurance: [],
  travelFamilyInsurance: [],

  addInsuranceForm:{}
};

export const insuranceReducer = createSlice({
  name: "insurance",
  initialState,
  reducers: {
    setInsuranceUserFormData: (state, action) => {
      state.insuranceUserFormData = action.payload;
    },
    setInsuranceMySelfPackage: (state, action) => {
      state.insuranceMySelfPackage = action.payload;
    },
    setInsuranceHealthFamilyPackage: (state, action) => {
      state.insuranceHealthFamilyPackage = action.payload;
    },
    setInsuranceHealthParentsPackage: (state, action) => {
      state.insuranceHealthParentPackage = action.payload;
    },
    setInsuranceTravelIndividualPackage: (state, action) => {
      state.insuranceTravelIndividual = action.payload;
    },
    setInsuranceTravelFamily: (state, action) => {
      state.insuranceTravelFamily = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setInsuranceIsEmailVerified: (state, action) => {
      state.isinsuranceEmailVerified = action.payload;
    },
    setInsuranceIsPhoneVerified: (state, action) => {
      state.isinsurancePhoneVerified = action.payload;
    },
    setInsuranceUser_ID: (state, action) => {
      state.insuranceuser_id = action.payload;
    },
    setInsurance: (state, action) => {
      state.insurance = action.payload;
    },
    setInsuranceDashboardRenderFlag: (state, action) => {
      state.insuranceDashboardRenderFlag = action.payload;
    },
    setInsuranceDashDetails: (state, action) => {
      state.insuranceDashDetailss = action.payload;
    },
    setDashboardMonthsArray: (state, action) => {
      state.dashboardMonthsArray = action.payload;
    },
    setInsuranceRequests: (state, action) => {
      state.insuranceRequests = action.payload;
    },
    setInsuranceRequestLength: (state, action) => {
      state.insuranceRequestLength = action.payload;
    },
    setInsuranceRequestFlag: (state, action) => {
      state.insuranceRequestFlag = action.payload;
    },
    setInsuranceInsuredPersons: (state, action) => {
      state.insuranceInsuredPersons = action.payload;
    },
    setInsuredPeronsLength: (state, action) => {
      state.insuredPeronsLength = action.payload;
    },
    setInsuredPersonsRenderFlag: (state, action) => {
      state.insuredPersonsRenderFlag = action.payload;
    },
    setTravelsingleInsurance: (state, action) => {
      state.travelsingleInsurance = action.payload;
    },
    setTravelFamilyInsurance: (state, action) => {
      state.travelFamilyInsurance = action.payload;
    },

    setAddInsuranceForm: (state, action) => {
      state.addInsuranceForm = action.payload;
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
  setInsuranceUserFormData,
  setInsuranceMySelfPackage,
  setInsuranceHealthFamilyPackage,
  setInsuranceHealthParentsPackage,
  setInsuranceTravelIndividualPackage,
  setInsuranceIsEmailVerified,
  setInsuranceIsPhoneVerified,
  setInsuranceUser_ID,
  setInsurance,
  setInsuranceDashDetails,
  setInsuranceDashboardRenderFlag,
  setInsuranceRequests,
  setInsuranceRequestLength,
  setInsuranceRequestFlag,
  setInsuranceInsuredPersons,
  setInsuredPeronsLength,
  setInsuredPersonsRenderFlag,
  setDashboardMonthsArray,
  setTravelsingleInsurance,
  setInsuranceTravelFamily,
  setTravelFamilyInsurance,
  setAddInsuranceForm
  // signOut,
} = insuranceReducer.actions;

export default insuranceReducer.reducer;

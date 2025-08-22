import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import labReducer from "./reducers/laboratory/labReducer";
import pharmacyReducer from "./reducers/pharmacy/pharmacyReducer";
import commonReducer from "./reducers/commonReducer";
import doctorReducer from "./reducers/doctor/doctorReducer";
import hospitalReducer from "./reducers/hospital/hospitalReducer";
import ambulanceReducer from "./reducers/ambulance/ambulanceReducer";
import physiotherapistReducer from "./reducers/physiotherapist/physiotherapistReducer";
import nutritionistReducer from "./reducers/nutritionist/nutritionistReducer";
import paramedicReducer from "./reducers/paramedic/paramedicReducer";
import hotelReducer from "./reducers/hotel/hotelReducer";
import rentcarReducer from "./reducers/rentacar/rentcarReducer";
import travelagencyReducer from "./reducers/travelAgency/travelAgencyReducer";
import donationReducer from "./reducers/donation/donationReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import PsychologistReducer from "./reducers/psychologist/PsychologistReducer";
import insuranceReducer from "./reducers/insurance/insuranceReducer";

const persistConfig: any = {
  key: "root",
  storage,
  whitelist: [
    "lab",
    "pharmacy",
    "common",
    "doctor",
    "hospital",
    "ambulance",
    "physiotherapist",
    "nutritionist",
    "paramedic",
    "psychologist",
    "hotel",
    "rentcar",
    "travelagency",
    "donation",
    "insurance",
  ],
};

const reducers = combineReducers({
  lab: labReducer,
  pharmacy: pharmacyReducer,
  doctor: doctorReducer,
  hospital: hospitalReducer,
  ambulance: ambulanceReducer,
  physiotherapist: physiotherapistReducer,
  nutritionist: nutritionistReducer,
  paramedic: paramedicReducer,
  // psychologist: PsychologistReducer,
  hotel: hotelReducer,
  rentcar: rentcarReducer,
  travelagency: travelagencyReducer,
  donation: donationReducer,
  insurance: insuranceReducer,
  common: commonReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);

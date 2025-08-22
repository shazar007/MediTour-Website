import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import tr from "./tr.json";
import ar from "./ar.json";
import ur from "./ur.json";
import fr from "./fr.json";
import ps from "./ps.json";
import pr from "./pr.json";
import du from "./du.json";
import ru from "./ru.json";

const resources = {
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
  ar: {
    translation: ar,
  },
  ur: {
    translation: ur,
  },
  ru: {
    translation: ru,
  },
  pr: {
    translation: pr,
  },
  du: {
    translation: du,
  },
   ps: {
    translation: ps,
  },
   fr: {
    translation: fr,
  }
  
};

i18n
  .use(initReactI18next) // Pass the i18next instance to the react-i18next module
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // If language is not found, use this
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;

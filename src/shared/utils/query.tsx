import { useSelector } from "react-redux";
import { ENDPOINTS } from "./endpoints";
import { useTranslation } from "react-i18next";
export const GetColorCode = () => {
  const { systemType } = useSelector((state: any) => state?.root?.common);
  const { t }: any = useTranslation();

  let sendLink: any = "";
  let resetPassword: any = "";
  let placeHolder = null;
  let forgotRout: any = "";
  let signUpRout: any = "";
  let loginEndpoint: any = "";
  let loginNavigate: any = "";
  let signUpEndPoint: any = "";
  let headerText: any = "";
  let newPasswordRout: any = "";
  let loginScreen: any = "";
  let logoutGeneric: any = "";
  switch (systemType) {
    case "user":
      forgotRout = `/${systemType}/forgot-password`;
      newPasswordRout = `/${systemType}/ResetPassword`;
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      loginScreen = `/${systemType}/login`;
      signUpRout = `/${systemType}/signup`;
      break;

    // .............................................doctor
    case "doctor":
      placeHolder = {
        name: `${t("doctorName")}*`,
        logo: `${t("image")}*`,
        licenseNo: t("doctorRegistrationNumber"),
        licenseExpiry: t("doctorRegistrationExpiry"),
        description: `${t("doctorDescription")}*`,
        address: `${t("doctorAddress")}*`,
        licenseImage: t("doctorRegistrationImage"),
      };
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      resetPassword = ENDPOINTS.DOC_RESET_PASSWORD;
      forgotRout = `/${systemType}/forgot-password`;
      signUpRout = `/${systemType}/signup`;
      newPasswordRout = `/${systemType}/ResetPassword`;
      loginEndpoint = ENDPOINTS.DOC_LOGIN;
      loginNavigate = `/${systemType}/dashboard`;
      signUpEndPoint = ENDPOINTS.DOC_SIGNUP;
      loginScreen = `/${systemType}/login`;
      logoutGeneric = ENDPOINTS.DOC_LOGOUT;
      headerText = t("doctor");
      break;

    // /.......................................physiotherapist................../;
    case "physiotherapist":
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      resetPassword = ENDPOINTS.DOC_RESET_PASSWORD;
      forgotRout = `/${systemType}/forgot-password`;
      signUpRout = `/${systemType}/signup`;
      newPasswordRout = `/${systemType}/ResetPassword`;
      loginEndpoint = ENDPOINTS.DOC_LOGIN;
      loginNavigate = `/${systemType}/dashboard`;
      signUpEndPoint = ENDPOINTS.DOC_SIGNUP;
      loginScreen = `/${systemType}/login`;
      headerText = t("physiotherapist");
      logoutGeneric = ENDPOINTS.DOC_LOGOUT;
      break;

    // /.......................................nutritionist................../;
    case "nutritionist":
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      resetPassword = ENDPOINTS.DOC_RESET_PASSWORD;
      forgotRout = `/${systemType}/forgot-password`;
      signUpRout = `/${systemType}/signup`;
      loginEndpoint = ENDPOINTS.DOC_LOGIN;
      newPasswordRout = `/${systemType}/ResetPassword`;
      loginNavigate = `/${systemType}/dashboard`;
      loginScreen = `/${systemType}/login`;
      signUpEndPoint = ENDPOINTS.DOC_SIGNUP;
      headerText = t("nutritionist");
      logoutGeneric = ENDPOINTS.DOC_LOGOUT;
      break;
    // /.......................................psychologist................../;

    case "psychologist":
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      resetPassword = ENDPOINTS.DOC_RESET_PASSWORD;
      forgotRout = `/${systemType}/forgot-password`;
      signUpRout = `/${systemType}/signup`;
      newPasswordRout = `/${systemType}/ResetPassword`;
      loginEndpoint = ENDPOINTS.DOC_LOGIN;
      loginNavigate = `/${systemType}/dashboard`;
      loginScreen = `/${systemType}/login`;
      signUpEndPoint = ENDPOINTS.DOC_SIGNUP;
      headerText = t("psychologist");
      logoutGeneric = ENDPOINTS.DOC_LOGOUT;
      break;
    // /.......................................paramedic................../;
    case "paramedic":
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      resetPassword = ENDPOINTS.DOC_RESET_PASSWORD;
      forgotRout = `/${systemType}/forgot-password`;
      signUpRout = `/${systemType}/signup`;
      loginEndpoint = ENDPOINTS.DOC_LOGIN;
      newPasswordRout = `/${systemType}/ResetPassword`;
      loginNavigate = "/paramedicStaff/dashboard";
      loginScreen = `/${systemType}/login`;
      signUpEndPoint = ENDPOINTS.DOC_SIGNUP;
      logoutGeneric = ENDPOINTS.DOC_LOGOUT;
      headerText = t("peramedicStaff");
      break;

    // /.......................................Hospital................../;

    case "hospital":
      placeHolder = {
        name: `${t("hospitalName")}*`,
        logo: `${t("hospitalLogo")}*`,
        licenseNo: t("HospitalRegNo"),
        licenseExpiry: t("HospitalRegExpiry"),
        description: `${t("hospitalDescription")}*`,
        openTime: `${t("hospitalOpenTime")}*`,
        closeTime: `${t("hospitalCloseTime")}*`,
        address: `${t("hospitalAddress")}*`,
        licenseImage: t("hospitalImage"),
      };
      signUpRout = `/${systemType}/signup`;
      logoutGeneric = ENDPOINTS.LOGOUT_HOSPITAL;
      newPasswordRout = `/${systemType}/ResetPassword`;
      loginScreen = `/${systemType}/login`;
      loginEndpoint = ENDPOINTS.HOS_LOGIN;
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      forgotRout = `/${systemType}/forgot-password`;
      resetPassword = ENDPOINTS.HOS_RESET_PASSWORD;
      signUpEndPoint = ENDPOINTS.HOS_SIGNUP;
      headerText = t("hospital");
      break;

    // .......................greenTourism
    case "greentourism":
      logoutGeneric = ENDPOINTS.TRAVEL_COMPANY_LOGOUT;
      break;

    // /.......................................Laboratory................../;
    case "laboratory":
      placeHolder = {
        name: `${t("labName")}*`,
        logo: `${t("labLogo")}*`,
        licenseNo: t("labLicenseNumber"),
        licenseExpiry: t("labLicenseExpiry"),
        description: `${t("labDescription")}*`,
        openTime: `${t("labOpenTime")}`,
        closeTime: `${t("labCloseTime")}`,
        address: `${t("laboratoryAddress")}`,
        licenseImage: `${t("labLicenseImage")}`,
      };
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      signUpRout = `/${systemType}/signup`;
      logoutGeneric = ENDPOINTS.LAB_LOGOUT;
      forgotRout = `/${systemType}/forgot-password`;
      newPasswordRout = `/${systemType}/ResetPassword`;
      resetPassword = ENDPOINTS.LAB_RESET_PASSWORD;
      loginScreen = `/${systemType}/login`;
      loginEndpoint = ENDPOINTS.LOGIN;
      loginNavigate = "/laboratory/dashboard";
      signUpEndPoint = ENDPOINTS.LAB_SIGNUP;
      headerText = t("laboratory");
      break;

    // /.......................................Pharmacy................../

    case "pharmacy":
      placeHolder = {
        name: `${t("pharmacyName")}*`,
        logo: `${t("pharmacyLogo")}*`,
        licenseNo: t("pharmacyLicenseNo"),
        licenseExpiry: t("pharmacyLicenseExpiry"),
        description: `${t("pharmacyDescription")}*`,
        openTime: `${t("pharmacyOpenTime")}*`,
        closeTime: `${t("pharmacyCloseTime")}*`,
        address: `${t("pharmacyAddress")}*`,
        licenseImage: t("pharmacyLicenseImage"),
      };

      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      signUpRout = `/${systemType}/signup`;
      loginScreen = `/${systemType}/login`;
      loginEndpoint = ENDPOINTS.PH_LOGIN;
      forgotRout = `/${systemType}/forgot-password`;
      resetPassword = ENDPOINTS.PH_RESET_PASSWORD;
      loginNavigate = "/pharmacy/dashboard";
      newPasswordRout = `/${systemType}/ResetPassword`;
      signUpEndPoint = ENDPOINTS.PH_SIGNUP;
      logoutGeneric = ENDPOINTS.PH_LOGOUT;
      headerText = t("pharmacy");
      break;

    // /....................................Pharmecutical................./
    case "pharmaceutical":
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      resetPassword = ENDPOINTS.PH_RESET_PASSWORD;
      forgotRout = `/${systemType}/forgot-password`;
      signUpRout = `/${systemType}/signup`;
      loginScreen = `/${systemType}/login`;
      loginEndpoint = ENDPOINTS.PHARMACEUTICAL_LOGIN;
      newPasswordRout = `/${systemType}/ResetPassword`;
      loginNavigate = `${systemType}/dashboard`;
      signUpEndPoint = ENDPOINTS.PHARMACEUTICAL_REGISTER;
      headerText = t("pharmaceutical");
      logoutGeneric = ENDPOINTS.PHARMACEUTICAL_LOGOUT;
      break;

    // /.......................................Ambulance................../

    case "ambulance":
      placeHolder = {
        name: `${t("companyName")}*`,
        logo: `${t("companyLogo")}*`,
        licenseNo: t("companyRegistrationNumber"),
        licenseExpiry: t("companyRegistrationExpiry"),
        description: `${t("companyDescription")}*`,
        address: `${t("companyAddress")}*`,
        licenseImage: t("companyRegistrationImage"),
      };
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      signUpRout = "/homeservices/ambulanceservices/signup";
      loginScreen = "/homeservices/ambulanceservices/login";
      forgotRout = "/homeservices/ambulanceservices/forgot-password";
      resetPassword = ENDPOINTS.AMB_RESET_PASSWORD;
      loginEndpoint = ENDPOINTS.AMB_LOGIN;
      loginNavigate = "ambulance/dashboard";
      newPasswordRout = "/homeservices/ambulanceservices/ResetPassword";
      headerText = t("ambulance");
      logoutGeneric = ENDPOINTS.AMB_LOGOUT;
      signUpEndPoint = ENDPOINTS.AMB_SIGNUP;
      break;

    // /.......................................Insurance................../

    case "insurance":
      placeHolder = {
        name: `${t("companyName")}*`,
        logo: `${t("companyLogo")}*`,
        licenseNo: t("companyLicenseNumber"),
        licenseExpiry: t("licenseExpiry"),
        description: `${t("companyDescription")}*`,
        address: `${t("companyAddress")}*`,
        licenseImage: t("companyRegistrationImage"),
      };
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      resetPassword = ENDPOINTS.INSURANCE_NEWPASSWORD;
      signUpRout = `/${systemType}/signup`;
      loginScreen = `/${systemType}/login`;
      forgotRout = `/${systemType}/forgot-password`;
      loginEndpoint = ENDPOINTS.INSURANCE_LOGIN;
      newPasswordRout = `/${systemType}/ResetPassword`;
      loginNavigate = "/insurance/dashboard";
      signUpEndPoint = ENDPOINTS.INSURANCE_SIGNUP;
      logoutGeneric = ENDPOINTS.INSURANCE_LOGOUT;
      headerText = t("insurance");
      break;
    case "donation":
      placeHolder = {
        name: `${t("companyName")}*`,
        logo: `${t("companyLogo")}*`,
        licenseNo: t("companyLicenseNumber"),
        licenseExpiry: t("licenseExpiry"),
        description: `${t("companyDescription")}*`,
        address: `${t("companyAddress")}*`,
        licenseImage: t("companyRegistrationImage"),
      };
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      signUpRout = `/${systemType}/signup`;
      resetPassword = ENDPOINTS.DONATION_NEWPASSWORD;
      newPasswordRout = `/${systemType}/ResetPassword`;
      forgotRout = `/${systemType}/forgot-password`;
      loginEndpoint = ENDPOINTS.DONATION_LOGIN;
      signUpEndPoint = ENDPOINTS.DONATION_SIGNUP;
      headerText = t("donation");
      logoutGeneric = ENDPOINTS.DONATION_LOGOUT;
      break;
    case "rentacar":
      placeHolder = {
        name: `${t("companyName")}*`,
        logo: `${t("companyLogo")}*`,
        licenseNo: t("companyLicenseNumber"),
        licenseExpiry: t("licenseExpiry"),
        description: `${t("companyDescription")}*`,
        address: `${t("companyAddress")}*`,
        licenseImage: t("companyRegistrationImage"),
      };
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      signUpRout = "/traveltourism/rentAcar/signup";
      logoutGeneric = ENDPOINTS.RENTCAR_LOGOUT;
      loginScreen = "/traveltourism/rentAcar/login";
      forgotRout = "/traveltourism/rentAcar/forgot-password";
      newPasswordRout = "/traveltourism/rentAcar/ResetPassword";
      resetPassword = ENDPOINTS.RENTCAR_NEWPASSWORD;
      loginEndpoint = ENDPOINTS.RENTCAR_LOGIN;
      loginNavigate = "/rentacar/dashboard";
      signUpEndPoint = ENDPOINTS.RENTCAR_SIGNUP;
      headerText = t("rentACar");
      break;

    // /.......................................Travel Agency................../

    case "travelagency":
      placeHolder = {
        name: `${t("companyName")}*`,
        logo: `${t("companyLogo")}*`,
        licenseNo: t("companyLicenseNumber"),
        licenseExpiry: t("licenseExpiry"),
        description: `${t("companyDescription")}*`,
        address: `${t("companyAddress")}*`,
        licenseImage: t("licenseImage"),
      };
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      forgotRout = "/traveltourism/travelAgency/forgot-password";
      resetPassword = ENDPOINTS.TRAVELAGENCY_NEWPASSWORD;
      signUpRout = "/traveltourism/travelAgency/signup";
      newPasswordRout = "/traveltourism/travelAgency/ResetPassword";
      loginEndpoint = ENDPOINTS.TRAVELAGENCY_LOGIN;
      loginScreen = "/traveltourism/travelAgency/login";
      loginNavigate = "/travelAgency/dashboard";
      signUpEndPoint = ENDPOINTS.TRAVELAGENCY_SIGNUP;
      headerText = t("travelAgency");
      logoutGeneric = ENDPOINTS.TRAVELAGENCY_LOGOUT;
      break;
    // /.......................................Hotel................../
    // ..............................greentourism

    case "hotel":
      placeHolder = {
        name: t("hotelName"),
        logo: t("hotelImage"),
        licenseNo: t("hotelLicenseNumber"),
        licenseExpiry: t("licenseExpiry"),
        address: t("hotelAddress"),
        licenseImage: t("licenseImage"),
      };
      sendLink = ENDPOINTS.FORGET_VERIFICATION_PASSWORD;
      signUpRout = "/traveltourism/hotel/signup";
      forgotRout = "/traveltourism/hotel/forgot-password";
      loginScreen = "/traveltourism/hotel/login";
      newPasswordRout = "/traveltourism/hotel/ResetPassword";
      resetPassword = ENDPOINTS.HOTEL_NEWPASSWORD;
      logoutGeneric = ENDPOINTS.HOTEL_LOGOUT;
      loginEndpoint = ENDPOINTS.HOTEL_LOGIN;
      loginNavigate = "/hotel/dashboard";
      signUpEndPoint = ENDPOINTS.HOTEL_SIGNUP;
      headerText = t("hotel");
      break;
    default:
      break;
  }

  return {
    resetPassword,
    loginScreen,
    sendLink,
    signUpRout,
    signUpEndPoint,
    forgotRout,
    placeHolder,
    headerText,
    loginEndpoint,
    newPasswordRout,
    loginNavigate,
    logoutGeneric,
  };
};

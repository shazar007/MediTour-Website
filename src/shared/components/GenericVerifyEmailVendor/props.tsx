import { useSelector } from "react-redux";
import { ENDPOINTS } from "shared/utils";

export const EmailProps = (
  type?: any,
  value?: any,
  selected?: any,
  code?: any,
  selectDepartment?: any,
  t?:any
) => {
  const { systemType } = useSelector((state: any) => state?.root?.common);
  let sendCode: any = "";
  let placeHolder = null;
  let paramsInsert: any = {};
  let paramsVerify: any = {};
  let confirmCode: any = "";
  switch (type) {
    case "doctor":
      paramsInsert = {
        email: value,
        type: selected?.toLowerCase(),
        ...(systemType === "company"
          ? { isCompanyAddingDoc: true }
          : { isHospAddingDoc: true }),
        ...(systemType === "company"
          ? null
          : { departmentId: selectDepartment?._id }),
      };
      placeHolder = {
        name: t("createNew"),
        endName: t("doctorAccount"),
      };
      sendCode =
        systemType === "company"
          ? ENDPOINTS.SEND_COMPANY_CODE
          : ENDPOINTS.SEND_CODE_TOEMAIL;
      confirmCode =
        systemType === "company"
          ? ENDPOINTS.VERIFY_COMAPNY_CODE
          : ENDPOINTS.SEND_EMAIL_TO;
      paramsVerify = {
        code: code,
        email: value,
        type: selected?.toLowerCase(),
        ...(systemType === "company"
          ? { isCompanyAddingDoc: true }
          : { isHospAddingDoc: true }),
        ...(systemType === "company"
          ? null
          : { departmentId: selectDepartment?._id }),
      };
      break;
    case "branch":
      placeHolder = {
        name: t("Signup_A_New"),
        endName: t("branch"),
      };
      paramsInsert = {
        email: value,
        type: "hospital",
      };
      paramsVerify = {
        code: code,
        email: value,
      };
      sendCode = ENDPOINTS.GENERCIC_EMAIL;
      confirmCode = ENDPOINTS.VERIFY_GENERIC;
      break;
    case "labs":
      placeHolder = {
        name: t("Signup_A_New"),
        endName: t("laboratory"),
      };
      paramsInsert = {
        email: value,
        type: "labs",
      };
      paramsVerify = {
        code: code,
        email: value,
      };
      sendCode = ENDPOINTS.SEND_CODE_EMAIL;
      confirmCode = ENDPOINTS.HOSPITAL_CONFIRM_LAB;
      break;
    case "pharmacy":
      placeHolder = {
        name: t("Signup_A_New"),
        endName: t("pharmacy"),
      };
      paramsInsert = {
        email: value,
        type: "pharmacy",
      };
      paramsVerify = {
        code: code,
        email: value,
      };
      sendCode = ENDPOINTS.SEND_CODE_EMAIL;
      confirmCode = ENDPOINTS.HOSPITAL_CONFIRM_LAB;
      break;
    case "travel":
      placeHolder = {
        name: t("Signup_A_New"),
        endName: t("travelAgency"),
      };
      paramsInsert = {
        email: value,
        type: "agency",
        isCompanyAddingAgency: true,
      };
      paramsVerify = {
        code: code,
        email: value,
      };
      sendCode = ENDPOINTS.COMPANYTRAVEL_SEND;
      confirmCode = ENDPOINTS?.CONFIRM_COMAPNY_CODE;
      break;
    case "hotel":
      placeHolder = {
        name: t("Signup_A_New"),
        endName: t("hotel"),
      };
      paramsInsert = {
        email: value,
        type: "hotel",
        isCompanyAddingHotel: true,
      };
      paramsVerify = {
        code: code,
        email: value,
      };
      sendCode = ENDPOINTS.CONFIRM_HOTEL_CODE;
      confirmCode = ENDPOINTS?.CONFIRM_COMAPNY_CODE;
      break;
    default:
      break;
  }

  return {
    sendCode,
    paramsVerify,
    placeHolder,
    paramsInsert,
    confirmCode,
  };
};

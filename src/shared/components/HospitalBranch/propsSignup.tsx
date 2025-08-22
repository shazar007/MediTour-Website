import { useTranslation } from "react-i18next";
import { ENDPOINTS } from "shared/utils";

export const SignUpRoute = (
  type?: any,
  value?: any,
  selected?: any,
  systemType?: any,
  selectDepartment?: any,
  t?:any
) => {
  let signUpEndPoint: any = "";
  let paramsInsert: any = {};
  let headText: any = "";
  let sendCodeToemail: any = "";
  let lowerText: any = "";
  switch (type) {
    case "doctor":
      signUpEndPoint = ENDPOINTS.PARAMEDIC_SIGNUP;
      headText = t("addaDoctor")
      lowerText = t("createDoctorAccount");

      paramsInsert = {
        email: value,
        type: selected?.toLowerCase(),
        ...(systemType === "company"
          ? { isCompanyAddingDoc: false }
          : { isHospAddingDoc: false }),
        ...(systemType === "company"
          ? null
          : { departmentId: selectDepartment?._id }),
      };
      sendCodeToemail =
        systemType === "company"
          ? ENDPOINTS.SENDCOMAY_CODE
          : ENDPOINTS.SEND_CODE_TOEMAIL;
      break;
    case "labs":
      signUpEndPoint = ENDPOINTS.LAB_SIGNUP;
      break;
    case "pharmacy":
      signUpEndPoint = ENDPOINTS.PH_SIGNUP;
      break;
    case "branch":
      signUpEndPoint = ENDPOINTS.REGISTER_HOPITAL_SUBBRANCH;
      break;
    case "travel":
      paramsInsert = {
        isCompanyAddingAgency: false,
        email: value,
        type: "agency",
      };
      headText = "Add a Travel Agency";
      sendCodeToemail = ENDPOINTS.COMPANYTRAVEL_SEND;
      signUpEndPoint = ENDPOINTS.TRAVELAGENCY_SIGNUP;
      lowerText = "Create a Travel Agency";
      break;
    case "hotel":
      paramsInsert = {
        isCompanyAddingAgency: false,
        email: value,
        type: "hotel",
      };
      headText = "Add a Hotel";
      sendCodeToemail = ENDPOINTS.CONFIRM_HOTEL_CODE;
      signUpEndPoint = ENDPOINTS.HOTEL_SIGNUP;
      lowerText = "Create a Hotel";
      break;
    default:
      break;
  }

  return {
    signUpEndPoint,
    paramsInsert,
    sendCodeToemail,
    headText,
    lowerText,
  };
};

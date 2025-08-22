import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";
import { confirmEmail } from "shared/services";

export const initialValues = {
  email: "",
  newPassword: "",
  confirmPassword: "",
  verificationCode: "",
};

export const onSumbit = (
  setLoading: any,
  values: any,
  state: any,
  navigate: any,
  systemType: any,
  loginScreen: any
) => {
  setLoading(true);

  let params: any = {
    verificationCode: values?.verificationCode,
    email: state.email,
    newPassword: values?.newPassword,
    type:
      systemType === "doctor" ||
      systemType === "psychologist" ||
      systemType === "physiotherapist" ||
      systemType === "paramedic" ||
      systemType === "nutritionist"
        ? "doctor"
        : systemType,
    ...(systemType === "doctor" ||
    systemType === "psychologist" ||
    systemType === "physiotherapist" ||
    systemType === "paramedic" ||
    systemType === "nutritionist"
      ? { doctorKind: systemType }
      : ""),
  };

  confirmEmail(params)
    .then((res: any) => {
      notifySuccess(res?.data?.message);
      navigate(loginScreen, {
        state: { type: "forgot" },
      });
    })
    .catch((err: any) => {})
    .finally(() => setLoading(false));
};

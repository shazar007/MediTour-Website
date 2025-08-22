import { useFormik } from "formik";
import React from "react";
import styles from "../GenericSocialInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../A_New_Components/InputField";
import { setDoctorFormData } from "shared/redux";
import { useTranslation } from "react-i18next";
interface Props {
    handleSubmit?: any;
    type?: any;
    setCurrentStep?: any;
    handleBack?: any
}
const GenericSocialInfo = (props: Props) => {
    const {t} : any = useTranslation()
    const { handleSubmit, type, setCurrentStep, handleBack } = props;
    const dispatch = useDispatch()
    const { doctorFormData } = useSelector((state: any) => state.root.common);
    const checkType = type === "branch" || type === "doctor" || type === "labs" || type === "pharmacy" || type==="travel" || type==="hotel"
    const formik: any = useFormik({
        initialValues: {
            fbUrl: doctorFormData?.socialInfo?.fbUrl || "",
            instaUrl: doctorFormData?.socialInfo?.instaUrl || "",
            linkedIn: doctorFormData?.socialInfo?.linkedIn || "",
            youtube: doctorFormData?.socialInfo?.youtube || "",
        },
        onSubmit: (values) => {
            if (checkType) {
                handleNext(values)
            } else {
                handleSubmit(values);
            }
        },
    });
    const handleNext = (socialInfo: any) => {
        const Social = {
            ...doctorFormData,
            socialInfo,
        };
        dispatch(setDoctorFormData(Social));
        setCurrentStep(2);
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.rowSocial}>
                <div className={styles.inputGroupSocial}>
                    <InputField
                        id="fbUrl"
                        formik={formik}
                        value={formik.values.fbUrl}
                        placeholder={t("facebookOptional")}
                        onChange={formik?.handleChange("fbUrl")}
                    />
                </div>
                <div className={styles.inputGroupSocial}>
                    <InputField
                        id="instaUrl"
                        value={formik.values.instaUrl}
                        formik={formik}
                        placeholder={t("instagramOptional")}
                        onChange={formik?.handleChange("instaUrl")}
                    />
                </div>
            </div>
            <div className={styles.rowSocial}>
                <div className={styles.inputGroupSocial}>
                    <InputField
                        id="linkedIn"
                        value={formik?.values?.linkedIn}
                        formik={formik}
                        placeholder={t("linkedInOptional")}
                        onChange={formik?.handleChange("linkedIn")}
                    />

                </div>
                <div className={styles.inputGroupSocial}>
                    <InputField
                        id="youtube"
                        formik={formik}
                        value={formik?.values?.youtube}
                        placeholder={t("youtubeOptional")}
                        onChange={formik?.handleChange("youtube")}
                    />
                </div>
            </div>
            {checkType ? (
                <div className={styles.branchContainer}>
                <button className={styles.backButton} onClick={handleBack}>
                  {t("back")}
                </button>
       
                <button className={styles.nextButton} type="submit">
                  {t("next")} →
                </button>
              </div>
            ) : (
                <div className={styles.buttonContainer}>
                    <button className={styles.continueButton} type="submit">
                    {t("next")} →
                    </button>
                </div>
            )}
        </form>
    );
};

export default GenericSocialInfo;

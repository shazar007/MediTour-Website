import { useEffect } from "react";
import { useFormik } from "formik";
import classNames from "classnames";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import FilePicker from "shared/components/FilePickeInsurance";
import commonStyles from "shared/utils/common.module.css";
import { insuranceTravelPolicyDocuments } from "shared/utils";
import { PrimaryButton } from "shared/components";
import { setAddInsuranceForm } from "shared/redux";
import { useTranslation } from "react-i18next";
interface Props {
  handleClickNext: any;
}
export default function FamilyPolicy(props: Partial<Props>) {
  const { t, i18n }: any = useTranslation();
  const { addInsuranceForm } = useSelector(
    (state: any) => state.root.insurance
  );
  const { handleClickNext } = props;
  const dispatch = useDispatch();
  const formik: any = useFormik({
    initialValues: {
      PolicyDocument: addInsuranceForm?.PolicyDocument || "",
      policyDocumentPath: addInsuranceForm?.policyDocumentPath || "",
    },
    validationSchema: Yup.object(insuranceTravelPolicyDocuments(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    dispatch(
      setAddInsuranceForm({
        ...addInsuranceForm,
        ...formik.values,
      })
    );
    handleClickNext();
  };

  const handleUrl = (url: any, imagePath: any) => {
    formik.setFieldValue("PolicyDocument", url);
    setTimeout(() => {
      formik.setFieldValue("policyDocumentPath", imagePath);
    }, 100);
  };

  useEffect(() => {
    formik?.validateForm();
  }, [i18n?.language]);

  return (
    <div className={commonStyles.col12}>
      <form onSubmit={formik.handleSubmit}>
        <FilePicker
          setData={handleUrl}
          placeholder={formik?.values?.policyDocumentPath}
        />

        {formik.touched.PolicyDocument && formik.errors.PolicyDocument ? (
          <div className={classNames(commonStyles.error)}>
            *{formik.errors.PolicyDocument}
          </div>
        ) : null}
        <div className={commonStyles.flxEnd}>
          <div style={{ width: "210px", marginTop: "24px" }}>
            <PrimaryButton
              children={t("next")}
              colorType={"New_blue"}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

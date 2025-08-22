import classNames from "classnames";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { PrimaryButton } from "shared/components";
import FilePicker from "shared/components/FilePickeInsurance";
import commonStyles from "shared/utils/common.module.css";
import { setInsuranceTravelIndividualPackage } from "shared/redux";
interface Props {
  handleClickNext: any;
}
export default function IndividulaPolicy(props: Partial<Props>) {
  const { insuranceTravelIndividual } = useSelector(
    (state: any) => state.root.insurance
  );

  const { handleClickNext } = props;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      PolicyDocument: "",
    },
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = () => {
    dispatch(
      setInsuranceTravelIndividualPackage({
        ...insuranceTravelIndividual,
        ...formik.values,
      })
    );
    handleClickNext();
  };
  const handleUrl = (url: any) => {
    formik.setFieldValue("PolicyDocument", url);
  };
  return (
    <div className={commonStyles.col12}>
      <form onSubmit={formik.handleSubmit}>
        <FilePicker setData={handleUrl} />
        {formik.touched.PolicyDocument && formik.errors.PolicyDocument ? (
          <div className={classNames(commonStyles.error)}>
            *{formik.errors.PolicyDocument}
          </div>
        ) : null}

        <div className={commonStyles.flxEnd}>
          <div style={{ width: "210px", marginTop: "24px" }}>
            <PrimaryButton
              children={"Next"}
              colorType={"New_blue"}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

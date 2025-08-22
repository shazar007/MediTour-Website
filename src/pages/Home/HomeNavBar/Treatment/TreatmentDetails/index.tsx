import { useFormik } from "formik";
import { fieldMap_Data } from "./props";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSub, postConsultancyForm, userTreatments } from "shared/services";
import { FreeCosultancy_Form } from "shared/utils";
import styles from "./treatmentDetail.module.css";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import CustomLoader from "shared/components/New_Loader/Loader";
import Footerr from "../../Footer";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import { useQuery } from "@tanstack/react-query";
const TreatmentDetails = () => {
  const { t }: any = useTranslation();
  const isRtl = useDirection();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [subCat, setSubCat] = useState([]);
  const { user } = useSelector((state: any) => state?.root?.common);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (state?.type === "main speciality") {
      getsubAll();
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: user?.email || "",
      message: "",
    },
    validationSchema: Yup.object(FreeCosultancy_Form(t)),
    onSubmit: () => {
      setLoading(true);
      postConsultancyForm({
        ...formik?.values,
        treatment: state?.item?.subCategory,
      })
        .then(() => {
          toast.success("Form Submit sucessfully");
          formik.resetForm();
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message);
        })
        .finally(() => setLoading(false));
    },
  });
  console.log(formik?.errors);

  const getsubAll = () => {
    setLoading(true);
    let params = {
      categoryName: state?.mainTitle,
    };
    getSub(params)
      .then((res: any) => {
        setSubCat(res?.data);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoDetails = (item: any) => {
    navigate("/treatment/Details", {
      state: { ...state, item: item },
    });
  };

  const onPress = () => {
    if (state?.item?.subCategory) {
      navigate("/services/doctor", {
        state: {
          serviceName: "doctor",
          type: "speciality",
          mainTitle: state?.mainTitle,
          item: state?.item,
        },
      });
    } else {
      toast.error("Please Select treatment");
    }
  };

  let categoryMap =
    state?.type === "main speciality"
      ? subCat
      : state?.data[state?.mainIndex]?.treatments;

  const location = useLocation();
  const { treatment, type } = location.state || {};
  const { data, isLoading } = useQuery({
    queryKey: ["treatments"],
    queryFn: () => userTreatments(),
    staleTime: 5 * 60 * 1000,
  });
  const allTreatments = data?.data?.data;
  const getBackgroundImage = () => {
    if (state?.item?.image) {
      return state.item.image;
    }
    if (state?.type === "main speciality") {
      const category = allTreatments?.find(
        (cat: any) => cat.categoryName === state?.mainTitle
      );
      return category?.image;
    }
    return "default-image-path.jpg";
  };
  const backgroundImage = getBackgroundImage();
  const splitter = (text: any) => {
    return (
      <>
        {text.split(" ").map((word: any, index: number) => (
          <span
            key={index}
            style={{
              color: index === 0 ? "#131313" : "#FF7631",
            }}
          >
            {word + " "}
          </span>
        ))}
      </>
    );
  };

  return (
    <>
      <div
        className={styles.container}
        style={{
          position: "relative",
          minHeight: "100vh",
          padding: "156px 100px 50px 100px",
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            zIndex: -1,
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            zIndex: -1,
          }}
        ></div>

        <div className={styles.flxBetween}>
          <div className={styles.colfirst}>
            <div>
              {state?.item?.subCategory?.trim() ? (
                <p
                  className={classNames(styles.fs36, commonstyles.semiBold)}
                  style={{ marginBottom: "24px" }}
                >
                  {t("about")} {"  "}
                  {splitter(state.item.subCategory)}
                </p>
              ) : (
                <p
                  className={classNames(
                    commonstyles.fs24,
                    commonstyles.semiBold
                  )}
                  style={{ color: "#FF7631", marginBottom: "24px" }}
                >
                  {state?.mainTitle}
                </p>
              )}

              <p className={classNames(styles.colorGray)}>
                {state?.item?.description || state?.description}
              </p>
            </div>

            <div>
              <button
                className={styles.btnBook}
                type="submit"
                onClick={onPress}
              >
                {t("bookNow")}
              </button>
              <div className={styles.detailSection}>
                <div className={classNames(commonstyles.mb24)}>
                  <p
                    className={classNames(
                      commonstyles.fs16,
                      commonstyles.semiBold
                    )}
                  >
                    Related Treatments
                  </p>
                </div>
                <ul
                  className={styles.ListMarker}
                  style={{ paddingLeft: "20px" }}
                >
                  {categoryMap?.map((d: any) => (
                    <li
                      key={d.subCategory}
                      className={`${styles.listItem} ${
                        d.subCategory === state?.item?.subCategory
                          ? styles.activeItem
                          : ""
                      }`}
                      onClick={() => handleGoDetails(d)}
                    >
                      {d?.subCategory}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={classNames(styles.colSecond)}>
            <div className={classNames(styles.ConsultancyBox, styles.mtsm32)}>
              <p className={classNames(styles.fs36, commonstyles.semiBold)}>
                {splitter(t("getFreeConsultancy"))}
              </p>
              <div
                className={classNames(styles.mt8)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "64%",
                  margin: "0 auto",
                }}
              >
                <p
                  className={classNames(styles.colorGray)}
                  style={{
                    textAlign: "center",
                    textAlignLast: "center",
                    lineHeight: isRtl ? "30px" : "",
                  }}
                >
                  {t("fillOut")}
                </p>
              </div>
              <form onSubmit={formik.handleSubmit}>
                {fieldMap_Data.map((field: any) => (
                  <FormField
                    formik={formik}
                    id={t(field?.idName)}
                    placeHolder={t(field?.placeHolder)}
                    fieldValue={state?.item?.subCategory}
                    formikName={field?.formikName}
                  />
                ))}

                <div className={classNames(styles.flexCol, styles.mt24)}>
                  {/* <label className={styles.labels}>{t("description")}:</label> */}
                  <textarea
                    style={{ fontFamily: "inherit" }}
                    className={styles.textaera}
                    id="message"
                    value={formik?.values?.message}
                    onChange={formik?.handleChange("message")}
                    placeholder={t("enterDescription")}
                  />
                </div>

                <div style={{ marginTop: "30px" }}>
                  <button className={styles.btnSubmit} type="submit">
                    {t("submit")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {loading && <CustomLoader />}

      <Footerr />
    </>
  );
};

const FormField = ({
  id,
  placeHolder,
  formik,
  editable,
  fieldValue,
  formikName,
}: {
  id: any;
  placeHolder: any;
  formik: any;
  editable?: any;
  fieldValue?: any;
  formikName?: any;
}) => {
  console.log("🚀 ~ id:", id);
  let value = formik?.values;
  let touched = formik?.touched;
  let error = formik.errors;
  //

  return (
    <div className={classNames(styles.flexCol, styles.mt24)}>
      <input
        disabled={formikName == "treatment" ? true : false}
        id={formikName}
        type="text"
        placeholder={placeHolder}
        className={styles.inputs}
        value={formikName === "treatment" ? fieldValue : value[formikName]}
        onChange={formik?.handleChange(formikName)}
      />
      {touched[formikName] && error[formikName] && (
        <div
          className={classNames(commonstyles.error)}
          style={{ alignSelf: "flex-start" }}
        >
          *{error[formikName]}
        </div>
      )}
    </div>
  );
};

export default TreatmentDetails;

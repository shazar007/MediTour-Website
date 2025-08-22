import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "./insurancehealth.module.css";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import CustomSelect from "shared/components/CustomSelect";
import { useTranslation } from "react-i18next";
import From from "assets/images/Icon From (1).png";
import Time from "assets/images/Icon Time Lg.png";
import { RingLoader } from "shared/components";
import { postInsuranceFamily } from "shared/services";
import { useDirection } from "shared/utils/DirectionContext";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { CiSliderVertical } from "react-icons/ci";

const InsuranceHealth = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // ✅ Track if form submitted
  const [data, setData] = useState<any[]>([]);
  const { isRtl } = useDirection();
  const [showNumber2, setShowNumber2] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t, i18n }: any = useTranslation();
  const formType = "health";
  const PlanOptions = ["family plan", "individual plan", "parents plan"];

  const validationSchema = Yup.object({
    selectedPlan: Yup.string().required(t("pleaseSelectPlan")),
  });

  const formik = useFormik({
    initialValues: {
      selectedPlan: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setSubmitted(true); // ✅ Mark form as submitted

      const formattedValues = {
        planType: values.selectedPlan,
      };

      postInsuranceFamily({ page: 1 }, formattedValues)
        .then((res: any) => {
          setData(res.data?.insurances || []);
        })
        .catch((err: any) => {
          console.error("API Error:", err);
          setData([]);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  const navigate = useNavigate();
  const handleGoToDetails = (insuranceId: string, type: string) => {
    navigate("/services/insurance/InsuranceHealthDetail", {
      state: { insuranceId, type },
    });
  };

  return (
    <div>
      <div className={style.Wrappercenter}>
        <form onSubmit={formik.handleSubmit}>
          <CustomSelect
            options={PlanOptions}
            placeholder={t("pleaseSelectPlan")}
            onSelect={(option: string) =>
              formik.setFieldValue("selectedPlan", option)
            }
          />
          {formik.touched.selectedPlan && formik.errors.selectedPlan ? (
            <div className={classNames(commonstyle.error)}>
              *{formik.errors.selectedPlan}
            </div>
          ) : null}

          {formType === "health" && formik.values.selectedPlan && (
            <>
              <button type="submit" className={style.selectbutton}>
                {loading ? (
                  <RingLoader color="#ffffff" size={24} />
                ) : (
                  t("search")
                )}
              </button>
            </>
          )}
        </form>
      </div>

      <div className={style.outerWrapper}>
        {submitted && !loading && data.length === 0 ? (
          <PhysiotheristsEmpty />
        ) : (
          data.map((v: any) => (
            <div key={v?._id} className={style.insuranceCard}>
              <div
                className={
                  ["ur", "ar", "ps", "pr"].includes(i18n.language)
                    ? style.insuranceOuteriMglg
                    : style.insuranceOuteriMg
                }
              >
                <img src={v?.packageLogo} alt="PacckageLogo" />
              </div>
              <div className={style.Cardbody}>
                <div className={style.content}>
                  <div>
                    <p className={style.title}>{v?.packageName}</p>
                    <p className={style.Insurancetitle}>
                      {v?.insuranceId?.name}
                    </p>
                    <div className={style.row}>
                      <img
                        src={From}
                        alt="insurance Form"
                        className={style.icon}
                      />
                      <p className={style.rowheading}>
                        {formik.values.selectedPlan}
                      </p>
                    </div>
                    <div className={style.row}>
                      <CiSliderVertical
                        color="#7d7d7d"
                        className={style.icon}
                      />
                      <p className={style.rowheading}>
                        {v?.hospitalizationLimit?.startLimit} -{" "}
                        {v?.hospitalizationLimit?.startLimit}
                      </p>
                    </div>
                    <div className={style.row}>
                      <img
                        src={Time}
                        alt="Timeinsurance"
                        className={style.icon}
                      />
                      <p className={style.rowheading}>{v?.perYear}</p>
                    </div>
                  </div>
                  <p className={style.price}>
                    <span style={{ fontSize: "16px" }}>Rs: </span>
                    <span>{v?.actualPrice}</span>
                  </p>
                </div>
                <div className={style.borderr}></div>
                <div className={style.contentdes}>
                  <div
                    className={
                      ["ur", "ar", "ps", "pr"].includes(i18n.language)
                        ? style.listlg
                        : style.list
                    }
                  >
                    <p className={style.title}> {t("description")}</p>
                    <ul>
                      <li>{v?.description}</li>
                    </ul>
                  </div>

                  <div className={style.flxEnd}>
                    <button
                      className={style.DetailsBtn}
                      onClick={() =>
                        handleGoToDetails(v?._id, formik.values.selectedPlan)
                      }
                    >
                      {t("details")}
                    </button>

                    {!showNumber2 && (
                      <button
                        className={style.HelplineBtn}
                        onClick={() => setShowNumber2(true)}
                      >
                        {t("callHelpline")}
                      </button>
                    )}

                    {showNumber2 && (
                      <p className={style.Number}>
                        <p dir={isRtl ? "rtl" : "ltr"}>
                          <span
                            style={{
                              direction: "ltr",
                              unicodeBidi: "embed",
                              color: "#0e54a3",
                            }}
                          >
                            +92-42-37885101-4
                          </span>
                        </p>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InsuranceHealth;

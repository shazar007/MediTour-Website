import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "./insuranceTravel.module.css";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import CustomSelect from "shared/components/CustomSelect";
import { useTranslation } from "react-i18next";
import From from "assets/images/Icon From (1).png";
import Trip from "assets/images/icon-park-outline_round-trip.png";
import Country from "assets/images/gis_search-country.png";
import Time from "assets/images/Icon Time Lg.png";
import { postInsuranceFlight } from "shared/services";
import { RingLoader } from "shared/components";
import { useDirection } from "shared/utils/DirectionContext";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";

const InsuranceTravel = () => {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const [showNumber2, setShowNumber2] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const formType = "travel";
  const insuranceOptions = ["single trip", "multiple trips"];
  const countries = [
    { id: 1, title: "Pakistan" },
    { id: 2, title: "USA" },
    { id: 3, title: "UK" },
    { id: 4, title: "Bangladesh" },
    { id: 5, title: "Italy" },
    { id: 6, title: "Spain" },
    { id: 7, title: "Portugal" },
    { id: 9, title: "Australia" },
    { id: 10, title: "South Africa" },
    { id: 11, title: "Sri Lanka" },
    { id: 12, title: "Spain" },
    { id: 13, title: "UAE" },
  ];

  const validationSchema = Yup.object({
    selectedPlan: Yup.string().required(t("pleaseSelectPlan")),
    selectedCountry:
      formType === "travel"
        ? Yup.string().required(t("pleaseSelectCountry"))
        : Yup.string(),
    passengerType:
      formType === "travel"
        ? Yup.string().required(t("pleaseSelectPassengerType"))
        : Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      selectedPlan: "",
      selectedCountry: "",
      passengerType: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setSubmitted(true); // ✅ Mark form as submitted

      const formattedValues = {
        planType: values.selectedPlan,
        country: values.selectedCountry,
        passengerTraveling: values.passengerType,
      };

      postInsuranceFlight({ page: 1 }, formattedValues)
        .then((res: any) => {
          setData(res.data?.insurances || []);
        })
        .catch((err: any) => {
          console.error("API Error:", err);
          setData([]); // fallback to empty
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGoToDetails = (insuranceId: string, type: string) => {
    navigate("/services/insurance/insuranceTravelDetails", {
      state: { insuranceId, type },
    });
  };

  return (
    <div>
      <div className={style.Wrappercenter}>
        <form onSubmit={formik.handleSubmit}>
          <CustomSelect
            options={insuranceOptions}
            placeholder={t("pleaseSelectBestPlan")}
            onSelect={(option: string) =>
              formik.setFieldValue("selectedPlan", option)
            }
          />
          {formik.touched.selectedPlan && formik.errors.selectedPlan ? (
            <div className={classNames(commonstyle.error)}>
              *{formik.errors.selectedPlan}
            </div>
          ) : null}

          {formType === "travel" && formik.values.selectedPlan && (
            <>
              <div style={{ margin: "16px 0" }}>
                <CustomSelect
                  options={countries.map((country) => country.title)}
                  placeholder={t("selectCountryForTraveling")}
                  onSelect={(option: string) =>
                    formik.setFieldValue("selectedCountry", option)
                  }
                />
                {formik.touched.selectedCountry &&
                formik.errors.selectedCountry ? (
                  <div className={classNames(commonstyle.error)}>
                    *{formik.errors.selectedCountry}
                  </div>
                ) : null}
              </div>
              <div>
                <CustomSelect
                  options={["individual travel", "family travel"]}
                  placeholder={t("selectPassengerType")}
                  onSelect={(option: string) =>
                    formik.setFieldValue("passengerType", option)
                  }
                />
                {formik.touched.passengerType && formik.errors.passengerType ? (
                  <div className={classNames(commonstyle.error)}>
                    *{formik.errors.passengerType}
                  </div>
                ) : null}
              </div>
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
                <img src={v?.packageLogo} alt="insurancePackageLogo" />
              </div>
              <div className={style.Cardbody}>
                <div className={style.content}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "3px",
                      margin: "0px",
                      lineHeight: "20px",
                    }}
                  >
                    <p className={style.title}>{v?.packageName}</p>
                    <p className={style.Insurancetitle}>
                      {v?.insuranceId?.name}
                    </p>
                    <div className={style.row}>
                      <img
                        src={From}
                        alt="insuranceForm"
                        className={style.icon}
                      />
                      <p className={style.rowheading}>
                        {formik.values.passengerType}
                      </p>
                    </div>
                    <div className={style.row}>
                      <img
                        src={Country}
                        alt="insuranceCountry"
                        className={style.icon}
                      />
                      <p className={style.rowheading}>{v?.countrySelection}</p>
                    </div>
                    <div className={style.row}>
                      <img
                        src={Trip}
                        alt="insuranceTrip"
                        className={style.icon}
                      />
                      <p className={style.rowheading}>{v?.tripType}</p>
                    </div>
                    <div className={style.row}>
                      <img
                        src={Time}
                        alt="insuranceTime"
                        className={style.icon}
                      />
                      <p className={style.rowheading}> {v?.coveringUpto}</p>
                    </div>
                  </div>
                  <div>
                    <p className={style.price}>
                      <span style={{ fontSize: "16px" }}>Rs: </span>
                      <span>{v?.actualPrice}</span>
                    </p>
                  </div>
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
                      <li>{v?.packageDescription}</li>
                    </ul>
                  </div>

                  <div className={style.flxEnd}>
                    <button
                      className={style.DetailsBtn}
                      onClick={() =>
                        handleGoToDetails(v?._id, formik.values.passengerType)
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

export default InsuranceTravel;

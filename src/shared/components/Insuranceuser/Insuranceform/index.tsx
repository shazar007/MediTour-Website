import React, { useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "./style.module.css";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import CustomSelect from "shared/components/CustomSelect";
import { IoMdArrowForward } from "react-icons/io";
import img from "assets/images/insuranceboth.png";
import { useTranslation } from "react-i18next";
import From from "assets/images/Icon From (1).png";
import Trip from "assets/images/icon-park-outline_round-trip.png";
import Country from "assets/images/gis_search-country.png";
import Sliver from "assets/images/material-symbols_category-rounded.png";
import Time from "assets/images/Icon Time Lg.png";
interface InsuranceFormProps {
  insuranceOptions: string[];
  onSelectPlan: (selectedOption: string) => void;
  title: string;
  subtitle: string;
  formtitle: string;
  id?: number;
  formType: "health" | "travel";
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({
  insuranceOptions,
  onSelectPlan,
  title,
  subtitle,
  formtitle,
  formType,
}) => {
  const { t, i18n }: any = useTranslation();

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
      navigate("/services/insurance/InsuranceCards", {
        state: {
          selectedPlan: values.selectedPlan,
          selectedCountry: values.selectedCountry,
          passengerType: values.passengerType,
          formType,
        },
      });
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);
  const navigate = useNavigate();

  const handleGoToDetails = () => {
    navigate("/services/insurance/insurancecardDetails");
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
                  options={["Individual Travel", "Family Travel"]}
                  placeholder={t("selectPassengerType")}
                  onSelect={(option: string) =>
                    formik.setFieldValue("passengerType", option)
                  }
                />
                {formik.touched.passengerType && formik.errors.passengerType ? (
                  <div className={classNames(commonstyle.error)}>
                    *{formik.errors.passengerType}
                  </div>
                ) : null}{" "}
              </div>
              <button type="submit" className={style.selectbutton}>
                {t("search")}
              </button>
            </>
          )}
        </form>
      </div>
      <div className={style.outerWrapper}>
        <div className={style.insuranceCard}>
          <div className={style.insuranceOuteriMg}>
            <img src={img} alt="insuranceCard" />
          </div>
          <div className={style.Cardbody}>
            <div className={style.content}>
              <div>
                <p className={style.title}>Hajj & Umrah Package</p>
                <p className={style.Insurancetitle}>EFU Insurance</p>
                <div className={style.row}>
                  <img src={From} alt="InsuranceForm" className={style.icon} />
                  <p className={style.rowheading}>Individual</p>
                </div>{" "}
                <div className={style.row}>
                  <img
                    src={Country}
                    alt="InsuranceCountry"
                    className={style.icon}
                  />
                  <p className={style.rowheading}>Saudi Arabia</p>
                </div>{" "}
                <div className={style.row}>
                  <img src={Trip} alt="InsuranceTrip" className={style.icon} />
                  <p className={style.rowheading}>Single Trip</p>
                </div>{" "}
                <div className={style.row}>
                  <img src={Time} alt="InsuranceTime" className={style.icon} />
                  <p className={style.rowheading}> Upto 30 Days</p>
                </div>
              </div>{" "}
              <p className={style.price}>
                <span style={{ fontSize: "16px" }}>Rs: </span>
                <span> 32,000</span>
              </p>
            </div>
            <div className={style.borderr}></div>
            <div className={style.contentdes}>
              <div className={style.list}>
                <p className={style.title}>Description</p>
                <ul>
                  <li>
                    Are you worried about the financial impact of [Potential
                    risk]? Our [Type of Insurance] package provides the
                    solution. With comprehensive coverage, low deductibles, and
                    [Benefit], you can rest assured knowing you're protected
                    against [Specific risks]. Learn more and get a free quote
                    today.
                  </li>
                </ul>
              </div>

              <div className={style.flxEnd}>
                <button
                  className={style.DetailsBtn}
                  onClick={handleGoToDetails}
                >
                  Details
                </button>{" "}
                <button className={style.HelplineBtn}>Call Helpline</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceForm;

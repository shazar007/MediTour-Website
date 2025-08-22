import { ChangeEvent } from "react";
import commonStyles from "shared/utils/common.module.css";
import commonstyle from "shared/utils/common.module.css";
import style from "./mySelf.module.css";
import classNames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { InputField, PrimaryButton } from "shared/components";
import CustomSelect from "shared/components/CustomSelect";
import FilePicker from "shared/components/FilePickeInsurance";
import {
  AccidentalEmergencie,
  insuranceMedicalBenefits,
  Investigations,
  Maternity,
  WaitingPeriod,
  Yes_No,
} from "shared/utils";
import { setAddInsuranceForm } from "shared/redux";
import { useTranslation } from "react-i18next";

interface Props {
  planType: any;
  handleClickNext: any;
}
function MYselfBenefitsPolices(props: Partial<Props>) {
  const { t }: any = useTranslation();
  const { planType, handleClickNext } = props;
  const dispatch = useDispatch();
  const { addInsuranceForm } = useSelector(
    (state: any) => state.root.insurance
  );

  const handleSelect = (selectedOption: string, val: string) => {
    formik.setFieldValue(val, selectedOption);
  };

  const PolicyDocumentURL = (url: any, img: any) => {
    formik.setFieldValue("policyDocument", url);
    formik.setFieldValue("policyDocumentPath", img);
  };

  const PolicyClaimURL = (url: any, img: any) => {
    formik.setFieldValue("claimProcess", url);
    formik.setFieldValue("claimProcessPath", img);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    formik.setFieldValue("description", value);
  };

  const formik: any = useFormik({
    initialValues: {
      icu: addInsuranceForm?.icu || "",
      additionalLimit: addInsuranceForm?.additionalLimit || "",
      ambulanceService: addInsuranceForm?.ambulanceService || "",
      weeks: addInsuranceForm?.weeks || "",
      policyDocument: addInsuranceForm?.policyDocument || "",
      claimProcess: addInsuranceForm?.claimProcess || "",
      heading: addInsuranceForm?.heading || "",
      description: addInsuranceForm?.description || "",
      policyDocumentPath: addInsuranceForm?.policyDocumentPath || "",
      claimProcessPath: addInsuranceForm?.claimProcessPath || "",
      ...(planType === "mySelf" || planType === "parents"
        ? {
            coverageSpecializedInvestigation:
              addInsuranceForm?.coverageSpecializedInvestigation || "",
            maternity: addInsuranceForm?.maternity || "",
          }
        : {}), // only in mySelf
      ...(planType === "family" && { opd: addInsuranceForm?.opd || "" }), // only in Family
    },
    validationSchema: Yup.object(insuranceMedicalBenefits(t, planType)),
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

  return (
    <div className={commonstyle.col12}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <Accordion
            className={style.dropdown}
            style={{ borderRadius: "16px" }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  style={{ color: "#131313", paddingRight: "25px" }}
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ fontWeight: "600" }}>
                <div>
                  <p className={classNames(commonstyle.fs16)}>
                    {t("medicalBenifits")}
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <div style={{ borderTop: "0.5px solid #7d7d7d" }}></div>
            <AccordionDetails>
              <Typography>
                <div className={classNames(commonStyles.col12)}>
                  <div
                    className={classNames(
                      commonStyles.flx,
                      style.gap24,
                      commonStyles.mb24
                    )}
                  >
                    <div className={classNames(style.col4)}>
                      <CustomSelect
                        keyValue={"icu"}
                        value={formik?.values?.icu}
                        placeholder="ICU/CCU"
                        onSelect={handleSelect}
                        options={Yes_No(t)}
                      />
                      {formik.touched.icu && formik.errors.icu ? (
                        <div className={classNames(commonStyles.error)}>
                          *{formik.errors.icu}
                        </div>
                      ) : null}
                    </div>
                    <div className={classNames(style.col4)}>
                      <CustomSelect
                        keyValue={"additionalLimit"}
                        value={formik?.values?.additionalLimit}
                        placeholder={t("additionalLimitsAccidentalEmergencies")}
                        onSelect={handleSelect}
                        options={AccidentalEmergencie}
                      />
                      {formik.touched.additionalLimit &&
                      formik.errors.additionalLimit ? (
                        <div className={classNames(commonStyles.error)}>
                          *{formik.errors.additionalLimit}
                        </div>
                      ) : null}
                    </div>{" "}
                    <div className={classNames(style.col4)}>
                      <CustomSelect
                        keyValue={"ambulanceService"}
                        value={formik?.values?.ambulanceService}
                        placeholder={t("ambulanceServicesCoverage")}
                        onSelect={handleSelect}
                        options={Yes_No(t)}
                      />
                      {formik.touched.ambulanceService &&
                      formik.errors.ambulanceService ? (
                        <div className={classNames(commonStyles.error)}>
                          *{formik.errors.ambulanceService}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className={classNames(commonStyles.flx, style.gap24)}>
                    {planType === "mySelf" || planType === "parents" ? (
                      <div className={classNames(style.col4)}>
                        <CustomSelect
                          keyValue={"coverageSpecializedInvestigation"}
                          value={
                            formik?.values?.coverageSpecializedInvestigation
                          }
                          placeholder={t("coverageOfSpecializedInvestigation")}
                          onSelect={handleSelect}
                          options={Investigations(t)}
                        />
                        {formik.touched.coverageSpecializedInvestigation &&
                        formik.errors.coverageSpecializedInvestigation ? (
                          <div className={classNames(commonStyles.error)}>
                            *{formik.errors.coverageSpecializedInvestigation}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    <div className={classNames(style.col4)}>
                      <CustomSelect
                        keyValue={"weeks"}
                        value={formik?.values?.weeks}
                        placeholder={t("waitingPeriod")}
                        onSelect={handleSelect}
                        options={WaitingPeriod(t)}
                      />
                      {formik.touched.weeks && formik.errors.weeks ? (
                        <div className={classNames(commonStyles.error)}>
                          *{formik.errors.weeks}
                        </div>
                      ) : null}
                    </div>
                    {planType === "family" && (
                      <div className={classNames(style.col4)}>
                        <CustomSelect
                          keyValue={"opd"}
                          placeholder="OPD"
                          value={formik?.values?.opd}
                          onSelect={handleSelect}
                          options={Yes_No(t)}
                        />
                        {formik.touched.opd && formik.errors.opd ? (
                          <div className={classNames(commonStyles.error)}>
                            *{formik.errors.opd}
                          </div>
                        ) : null}
                      </div>
                    )}

                    {planType === "mySelf" || planType === "parents" ? (
                      <div className={classNames(style.col4)}>
                        <CustomSelect
                          keyValue={"maternity"}
                          value={formik?.values?.maternity}
                          placeholder={t("maternity")}
                          onSelect={handleSelect}
                          options={Maternity(t)}
                        />
                        {formik.touched.maternity && formik.errors.maternity ? (
                          <div className={classNames(commonStyles.error)}>
                            *{formik.errors.maternity}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className={style.dropdown}
            style={{ borderRadius: "16px" }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  style={{ color: "#131313", paddingRight: "25px" }}
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ fontWeight: "600" }}>
                <div>
                  <p
                    className={classNames(
                      commonstyle.fs16,
                      commonstyle.colorBlue
                    )}
                  >
                    {t("policyDocuments")}
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <div style={{ borderTop: "0.5px solid #7d7d7d" }}></div>
            <AccordionDetails>
              <Typography>
                <div
                  className={commonStyles.col12}
                  style={{ marginTop: "16px" }}
                >
                  <FilePicker
                    setData={PolicyDocumentURL}
                    placeholder={formik?.values?.policyDocumentPath}
                  />
                </div>
                {formik.touched.policyDocument &&
                formik.errors.policyDocument ? (
                  <div className={classNames(commonStyles.error)}>
                    *{formik.errors.policyDocument}
                  </div>
                ) : null}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className={style.dropdown}
            style={{ borderRadius: "16px" }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  style={{ color: "#00276D", paddingRight: "25px" }}
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ fontWeight: "600" }}>
                <div>
                  <p
                    className={classNames(
                      commonstyle.fs16,
                      commonstyle.colorBlue
                    )}
                  >
                    {t("claimProcess")}
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <div style={{ borderTop: "0.5px solid #7d7d7d" }}></div>

            <AccordionDetails>
              <Typography>
                <div>
                  <div
                    style={{ marginLeft: "auto", marginBottom: "24px" }}
                    className={commonStyles.flx}
                  ></div>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <FilePicker
                        setData={PolicyClaimURL}
                        placeholder={formik?.values?.claimProcessPath}
                      />
                      {formik.touched.claimProcess &&
                      formik.errors.claimProcess ? (
                        <div className={classNames(commonStyles.error)}>
                          *{formik.errors.claimProcess}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className={style.dropdown}
            style={{ borderRadius: "16px" }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  style={{ color: "#131313", paddingRight: "25px" }}
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ fontWeight: "600" }}>
                <div>
                  <p
                    className={classNames(
                      commonstyle.fs16,
                      commonstyle.colorBlue
                    )}
                  >
                    {t("moreFeatures")}
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <div style={{ borderTop: "0.5px solid #131313" }}></div>
            <AccordionDetails>
              <Typography>
                <div className={classNames(commonStyles.col12)}>
                  <div
                    className={classNames(commonStyles.col6, commonStyles.mb24)}
                  >
                    <InputField
                      placeholder={t("heading")}
                      id="heading"
                      name="heading"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.heading}
                    />
                    {formik.touched.heading && formik.errors.heading ? (
                      <div className={classNames(commonStyles.error)}>
                        *{formik.errors.heading}
                      </div>
                    ) : null}
                  </div>
                  <div className={classNames(commonStyles.col6)}>
                    <textarea
                      style={{
                        borderRadius: "8px",
                        width: "100%",
                        resize: "none",
                        border: "0.5px solid #ccc",
                        padding: "10px",
                        fontSize: "16px",
                        color: "#131313",
                        boxSizing: "border-box",
                        height: "70px",
                      }}
                      placeholder={t("description")}
                      onChange={handleDescriptionChange}
                      value={formik.values.description}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? (
                      <div className={classNames(commonStyles.error)}>
                        *{formik.errors.description}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={commonStyles.flxEnd}>
          <div className={commonStyles.BtnWidth} style={{ marginTop: "24px" }}>
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

export default MYselfBenefitsPolices;

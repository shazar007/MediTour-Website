import { ChangeEvent } from "react";
import commonStyles from "shared/utils/common.module.css";
import commonstyle from "shared/utils/common.module.css";
import style from "./mySelf.module.css";
import classNames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import Accordion from "@mui/material/Accordion";
import { useSelector, useDispatch } from "react-redux";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import { InputField, PrimaryButton } from "shared/components";
import FilePicker from "shared/components/FilePickeInsurance";
import { insuranceHealthParentsMedicalBenefits } from "shared/utils";
import { setInsuranceHealthParentsPackage } from "shared/redux";
import CustomSelect from "shared/components/CustomSelect";
const ICUCCU = ["No, Actuals", "Yes, Actuals"];
const Ambulance = ["Yes, Actual", "No"];
const AccidentalEmergencie = ["5k pkr", " 10k pkr", "15k pkr"];
const Investigations = [
  "Covered (Sub limit - Rs. 10,000)",
  " Covered (Sub limit - Rs. 15,000)",
  "Covered (Sub limit - Rs. 20,000)",
];
const Maternity = ["YES", "No"];
const WaitingPeriod = ["2 weeks", "4 weeks", "6 weeks", "8 weeks", "2 weeks"];

interface Props {
  handleClickNext: any;
}
function MYselfBenefitsPolices(props: Partial<Props>) {
  const { handleClickNext } = props;
  const { insuranceHealthParentPackage } = useSelector(
    (state: any) => state.root.insurance
  );

  const handleSelectICU = (selectedOption: string) => {
    formik.setFieldValue("icu", selectedOption);
  };
  const handleSelectLimit = (selectedOption: string) => {
    formik.setFieldValue("additionalLimit", selectedOption);
  };
  const handleSelectAmbulance = (selectedOption: string) => {
    formik.setFieldValue("ambulanceService", selectedOption);
  };
  const handleSelectCoverage = (selectedOption: string) => {
    formik.setFieldValue("maternity", selectedOption);
  };
  const handleSelectInvestigations = (selectedOption: string) => {
    formik.setFieldValue("investigation", selectedOption);
  };
  const handleSelectPeriods = (selectedOption: string) => {
    formik.setFieldValue("weeks", selectedOption);
  };
  const PolicyDocumentURL = (url: any) => {
    // setLogo(false);
    formik.setFieldValue("policyDocument", url);
  };
  const PolicyClaimURL = (url: any) => {
    // setLogo(false);
    formik.setFieldValue("claimProcess", url);
  };
  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    formik.setFieldValue("description", value);
  };
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      icu: "",
      additionalLimit: "",
      ambulanceService: "",
      maternity: "",
      investigation: "",
      weeks: "",
      ////
      policyDocument: "",
      claimProcess: "",
      heading: "",
      description: "",
    },
    validationSchema: Yup.object(insuranceHealthParentsMedicalBenefits),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = () => {
    dispatch(
      setInsuranceHealthParentsPackage({
        ...insuranceHealthParentPackage,
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
                  <p
                    className={classNames(
                      commonstyle.fs16,
                      commonstyle.colorBlue
                    )}
                  >
                    Medical Benefits
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
                    <div className={classNames(style.col6)}>
                      <CustomSelect
                        placeholder="ICU / CCU"
                        onSelect={handleSelectICU}
                        options={ICUCCU}
                      />
                      {formik.touched.icu && formik.errors.icu ? (
                        <div className={classNames(commonStyles.error)}>
                          *{formik.errors.icu}
                        </div>
                      ) : null}
                    </div>
                    <div className={classNames(style.col6)}>
                      <CustomSelect
                        placeholder="Additional Limits for Accidental Emergencies"
                        onSelect={handleSelectLimit}
                        options={AccidentalEmergencie}
                      />
                      {formik.touched.additionalLimit &&
                      formik.errors.additionalLimit ? (
                        <div className={classNames(commonStyles.error)}>
                          *{formik.errors.additionalLimit}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div
                    className={classNames(
                      commonStyles.flx,
                      style.gap24,
                      commonStyles.mb24
                    )}
                  >
                    <div className={classNames(style.col6)}>
                      <CustomSelect
                        placeholder="Ambulance Service Coverage"
                        onSelect={handleSelectAmbulance}
                        options={Ambulance}
                      />
                      {formik.touched.ambulanceService &&
                      formik.errors.ambulanceService ? (
                        <div className={classNames(commonStyles.error)}>
                          *{formik.errors.ambulanceService}
                        </div>
                      ) : null}
                    </div>
                    <div className={classNames(style.col6)}>
                      <CustomSelect
                        placeholder="Maternity"
                        onSelect={handleSelectCoverage}
                        options={Maternity}
                      />
                      {formik.touched.maternity && formik.errors.maternity ? (
                        <div className={classNames(commonStyles.error)}>
                          *{formik.errors.maternity}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div
                    className={classNames(
                      commonStyles.flx,
                      style.gap24,
                      commonStyles.mb24
                    )}
                  >
                    <div className={classNames(style.col6)}>
                      <CustomSelect
                        placeholder="Coverage od Specialized Investigation"
                        onSelect={handleSelectInvestigations}
                        options={Investigations}
                      />
                      {formik.touched.investigation &&
                      formik.errors.investigation ? (
                        <div className={classNames(commonStyles.error)}>
                          *{formik.errors.investigation}
                        </div>
                      ) : null}
                    </div>
                    <div className={classNames(style.col6)}>
                      <CustomSelect
                        placeholder="Waiting Period"
                        onSelect={handleSelectPeriods}
                        options={WaitingPeriod}
                      />
                      {formik.touched.weeks && formik.errors.weeks ? (
                        <div className={classNames(commonStyles.error)}>
                          *{formik.errors.weeks}
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
                    Policy Documents
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
                  <FilePicker setData={PolicyDocumentURL} />
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
                    Claim Process
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <div style={{ borderTop: "0.5px solid #7d7d7d" }}></div>
            <AccordionDetails>
              <Typography>
                <div>
                  <div
                    style={{ marginLeft: "auto", marginBottom: "16px" }}
                    className={commonStyles.flx}
                  ></div>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <FilePicker setData={PolicyClaimURL} />
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
                    More Features
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <div style={{ borderTop: "0.5px solid #7d7d7d" }}></div>
            <AccordionDetails>
              <Typography>
                <div className={classNames(commonStyles.col12)}>
                  <div
                    className={classNames(commonStyles.col6, commonStyles.mb24)}
                  >
                    <InputField
                      placeholder="Heading"
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
                      placeholder="Description"
                      onChange={handleDescriptionChange}
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
        </div>{" "}
        <div className={commonStyles.flxEnd}>
          <div className={commonStyles.BtnWidth}>
            <PrimaryButton
              children={"Submit"}
              colorType={"New_blue"}
              type="submit"
            />
          </div>{" "}
        </div>
      </form>
    </div>
  );
}

export default MYselfBenefitsPolices;

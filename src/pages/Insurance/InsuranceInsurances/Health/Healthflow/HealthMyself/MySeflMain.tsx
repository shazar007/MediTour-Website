import { useEffect, useState } from "react";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import * as Yup from "yup";
import style from "./Myself.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomModal, InputField, PrimaryButton } from "shared/components";
import { IoClose } from "react-icons/io5";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Checkbox,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { setInsuranceMySelfPackage } from "shared/redux";
import {
  insuranceFamilyPackageSchema,
  insuranceMySelfPackageSchema,
  insuranceParentsPackageSchema,
} from "shared/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { insuranceGetAllIndividualINSURANCE } from "shared/services/Insurance";
import CustomLoader from "shared/components/New_Loader/Loader";
import { useTranslation } from "react-i18next";

export default function MySeflMain() {
  const { t, i18n }: any = useTranslation();
  const { state } = useLocation();

  const categoryType: string = state?.type;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);

  const navigate = useNavigate();

  const handleGoToMyselfDetail = (item: any) => {
    navigate(`/insurance/Health/Detail/${categoryType}`, {
      state: { item, categoryType },
    });
  };

  const handleCardClick = () => {
    // Set the state to true to show the modal
    setShowModal(true);
  };

  const fetchIndividualInsurances = () => {
    setLoading(true);
    insuranceGetAllIndividualINSURANCE(categoryType, t)
      .then((res: any) => {
        setdata(res?.data?.insurances);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchIndividualInsurances();
  }, []);

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className={classNames(commonstyles.col12)}>
          <div
            className={
              ["ur", "ar", "ps", "pr"].includes(i18n.language)
                ? commonstyles.pl36
                : commonstyles.pr36
            }
          >
            <div
              className={classNames(
                commonstyles.flxBetween,
                commonstyles.col12
              )}
            >
              <p
                className={classNames(commonstyles.fs24, commonstyles.semiBold)}
              >
                {`${t("health")} / ${t(state.type)}`}
              </p>
              <button className={style.AddBtn} onClick={handleCardClick}>
                + {t("add")}
              </button>
            </div>{" "}
            <CustomModal
              showModal={showModal}
              children={
                categoryType === "mySelf" ? (
                  <MySelf t={t} setShowModal={setShowModal} />
                ) : categoryType === "family" ? (
                  <Family t={t} setShowModal={setShowModal} />
                ) : (
                  <Parents t={t} setShowModal={setShowModal} />
                )
              }
            />
            <div className={classNames(commonstyles.outerContainer)}>
              <div className={style.flxWrap}>
                {data.map((item: any) => (
                  <div
                    className={style.myselfIncCard}
                    onClick={() => handleGoToMyselfDetail(item)}
                  >
                    <Avatar src={item?.packageLogo} className={style.profile} />
                    <p
                      className={classNames(
                        commonstyles.fs20,
                        commonstyles.semiBold
                      )}
                    >
                      {item?.packageName}
                    </p>
                    <p className={classNames(commonstyles.fs15, style.mt16)}>
                      {t("hospitalizationLimit")}
                    </p>
                    <p
                      className={classNames(
                        commonstyles.fs15,
                        style.mt8,
                        commonstyles.semiBold
                      )}
                      style={{ color: "#7d7d7d" }}
                    >
                      {item?.hospitalizationLimit?.startLimit} -{" "}
                      {item?.hospitalizationLimit?.endLimit}
                    </p>
                    <p
                      className={classNames(
                        commonstyles.fs15,
                        style.mt16,
                        commonstyles.semiBold
                      )}
                    >
                      {t("claimPayoutRatio")}
                    </p>
                    <p
                      className={classNames(
                        commonstyles.fs15,
                        style.mt8,
                        commonstyles.semiBold
                      )}
                    >
                      {item?.claimPayoutRatio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const MySelf = (props: any) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, setShowModal } = props;

  const handleCheckboxChange = (option: string) => {
    setSelectedOption(option === selectedOption ? null : option);
    formik.setFieldValue("gender", option);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: {
      insuranceAgestart: "",
      insuranceAgeend: "",
      hospitalizationStartLimit: "",
      hospitalizationEndLimit: "",
      gender: "",
    },

    validationSchema: Yup.object(insuranceMySelfPackageSchema(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    dispatch(setInsuranceMySelfPackage({ ...formik.values }));
    navigate("/insurance/form/mySelf", {
      state: {
        type: "mySelf",
      },
    });
  };
  return (
    <div style={{ width: "800px" }}>
      <form onSubmit={formik.handleSubmit}>
        <div className={style.header}>
          <p className={classNames(commonstyles.fs16, commonstyles.semiBold)}>
            {t("mySelfPackage")}
          </p>
          <IoClose className={style.close} onClick={handleCloseModal} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Accordion className={style.modelFeilds}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  style={{ color: "#131313", transform: "rotate(0deg)" }}
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <div>
                  <p
                    className={classNames(
                      commonstyles.fs14,
                      commonstyles.lightItalic
                    )}
                  >
                    {t("ageCriteria")}
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={classNames(commonstyles.flx, style.gap24)}>
                  <div className={classNames(style.col6)}>
                    <InputField
                      placeholder={t("insuranceAgeStart")}
                      id="insuranceAgestart"
                      name="insuranceAgestart"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.insuranceAgestart}
                    />
                    {formik.touched.insuranceAgestart &&
                    formik.errors.insuranceAgestart ? (
                      <div className={classNames(commonstyles.error)}>
                        *{formik.errors.insuranceAgestart}
                      </div>
                    ) : null}
                  </div>
                  <div className={classNames(style.col6)}>
                    <InputField
                      placeholder={t("insuranceAgeEnd")}
                      id="insuranceAgeend"
                      name="insuranceAgeend"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.insuranceAgeend}
                    />
                    {formik.touched.insuranceAgeend &&
                    formik.errors.insuranceAgeend ? (
                      <div className={classNames(commonstyles.error)}>
                        *{formik.errors.insuranceAgeend}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={style.modelFeilds}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon style={{ color: "#131313", border: "none" }} />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <div>
                  <p
                    className={classNames(
                      commonstyles.fs14,
                      commonstyles.lightItalic
                    )}
                  >
                    {t("selectHospitalizationLimit")} (PKR)
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={classNames(commonstyles.flx, style.gap24)}>
                  <div className={classNames(style.col6)}>
                    <InputField
                      placeholder={t("startLimit")}
                      id="hospitalizationStartLimit"
                      name="hospitalizationStartLimit"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.hospitalizationStartLimit}
                    />
                    {formik.touched.hospitalizationStartLimit &&
                    formik.errors.hospitalizationStartLimit ? (
                      <div className={classNames(commonstyles.error)}>
                        *{formik.errors.hospitalizationStartLimit}
                      </div>
                    ) : null}
                  </div>
                  <div className={classNames(style.col6)}>
                    <InputField
                      placeholder={t("endLimit")}
                      id="hospitalizationEndLimit"
                      name="hospitalizationEndLimit"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.hospitalizationEndLimit}
                    />
                    {formik.touched.hospitalizationEndLimit &&
                    formik.errors.hospitalizationEndLimit ? (
                      <div className={classNames(commonstyles.error)}>
                        *{formik.errors.hospitalizationEndLimit}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={style.modelFeilds}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "#131313" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <div>
                  <p
                    className={classNames(
                      commonstyles.fs14,
                      commonstyles.lightItalic
                    )}
                  >
                    {t("gender")}
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={classNames(commonstyles.flx)}>
                  <Checkbox
                    className={style.checkbox}
                    checked={selectedOption === "male"}
                    onChange={() => handleCheckboxChange("male")}
                  />
                  <p>{t("male")}</p>
                </div>
                <div className={classNames(commonstyles.flx, style.mt16)}>
                  <Checkbox
                    className={style.checkbox}
                    checked={selectedOption === "female"}
                    onChange={() => handleCheckboxChange("female")}
                  />
                  <p>{t("female")}</p>
                </div>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className={classNames(commonstyles.error)}>
                    *{formik.errors.gender}
                  </div>
                ) : null}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={commonstyles.flxEnd}>
          <div style={{ width: "200px" }}>
            <PrimaryButton
              children={t("save&Continue")}
              colorType={"New_blue"}
              // onClick={handleGoMyselfflow}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const Family = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, setShowModal } = props;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: {
      insuranceAgestart: "",
      insuranceAgeend: "",
      spouseAgeStart: "",
      spouseAgeEnd: "",
      kidsAgeStart: "",
      kidsAgeEnd: "",
      hospitalizationStartLimit: "",
      hospitalizationEndLimit: "",
    },
    validationSchema: Yup.object(insuranceFamilyPackageSchema(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    dispatch(setInsuranceMySelfPackage({ ...formik.values }));
    navigate("/insurance/form/family", {
      state: {
        type: "family",
      },
    });
  };

  return (
    <div style={{ width: "800px" }}>
      <form onSubmit={formik.handleSubmit}>
        <div className={style.header}>
          <p className={classNames(commonstyles.fs16, commonstyles.semiBold)}>
            {t("familyPackage")}
          </p>
          <IoClose className={style.close} onClick={handleCloseModal} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Accordion className={style.modelFeilds}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  style={{ color: "#131313", transform: "rotate(0deg)" }}
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <div>
                  <p
                    className={classNames(
                      commonstyles.fs14,
                      commonstyles.lightItalic
                    )}
                  >
                    {t("yourAgeCriteria")}
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={classNames(commonstyles.flx, style.gap24)}>
                  <div className={classNames(style.col6)}>
                    <InputField
                      placeholder={t("ageStart")}
                      id="insuranceAgestart"
                      name="insuranceAgestart"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.insuranceAgestart}
                    />
                    {formik.touched.insuranceAgestart &&
                    formik.errors.insuranceAgestart ? (
                      <div className={classNames(commonstyles.error)}>
                        *{formik.errors.insuranceAgestart}
                      </div>
                    ) : null}
                  </div>
                  <div className={classNames(style.col6)}>
                    <InputField
                      placeholder={t("ageEnd")}
                      id="insuranceAgeend"
                      name="insuranceAgeend"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.insuranceAgeend}
                    />
                    {formik.touched.insuranceAgeend &&
                    formik.errors.insuranceAgeend ? (
                      <div className={classNames(commonstyles.error)}>
                        *{formik.errors.insuranceAgeend}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={style.modelFeilds}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon style={{ color: "#131313", border: "none" }} />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <div>
                  <p
                    className={classNames(
                      commonstyles.fs14,
                      commonstyles.lightItalic
                    )}
                  >
                    {t("spouseAgeCriteria")}
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={classNames(commonstyles.flx, style.gap24)}>
                  <div className={classNames(style.col6)}>
                    <InputField
                      placeholder={t("ageStart")}
                      id="spouseAgeStart"
                      name="spouseAgeStart"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.spouseAgeStart}
                    />
                    {formik.touched.spouseAgeStart &&
                    formik.errors.spouseAgeStart ? (
                      <div className={classNames(commonstyles.error)}>
                        *{formik.errors.spouseAgeStart}
                      </div>
                    ) : null}
                  </div>
                  <div className={classNames(style.col6)}>
                    <InputField
                      placeholder={t("ageEnd")}
                      id="spouseAgeEnd"
                      name="spouseAgeEnd"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.spouseAgeEnd}
                    />
                    {formik.touched.spouseAgeEnd &&
                    formik.errors.spouseAgeEnd ? (
                      <div className={classNames(commonstyles.error)}>
                        *{formik.errors.spouseAgeEnd}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={style.modelFeilds}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "#131313" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <div>
                  <p
                    className={classNames(
                      commonstyles.fs14,
                      commonstyles.lightItalic
                    )}
                  >
                    {t("kidAge")}
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={classNames(commonstyles.flx, style.gap24)}>
                  <div className={classNames(style.col6)}>
                    <InputField
                      placeholder={t("ageStart")}
                      id="kidsAgeStart"
                      name="kidsAgeStart"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.kidsAgeStart}
                    />
                    {formik.touched.kidsAgeStart &&
                    formik.errors.kidsAgeStart ? (
                      <div className={classNames(commonstyles.error)}>
                        *{formik.errors.kidsAgeStart}
                      </div>
                    ) : null}
                  </div>
                  <div className={classNames(style.col6)}>
                    <InputField
                      placeholder={t("ageEnd")}
                      id="kidsAgeEnd"
                      name="kidsAgeEnd"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.kidsAgeEnd}
                    />
                    {formik.touched.kidsAgeEnd && formik.errors.kidsAgeEnd ? (
                      <div className={classNames(commonstyles.error)}>
                        *{formik.errors.kidsAgeEnd}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion className={style.modelFeilds}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "#131313" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <div>
                  <p
                    className={classNames(
                      commonstyles.fs14,
                      commonstyles.lightItalic
                    )}
                  >
                    {t("selectHospitalizationLimit")} (PKR)
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className={classNames(commonstyles.flx, style.gap24)}>
                  <div className={classNames(style.col6)}>
                    <InputField
                      placeholder={t("startLimit")}
                      id="hospitalizationStartLimit"
                      name="hospitalizationStartLimit"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.hospitalizationStartLimit}
                    />
                    {formik.touched.hospitalizationStartLimit &&
                    formik.errors.hospitalizationStartLimit ? (
                      <div className={classNames(commonstyles.error)}>
                        *{formik.errors.hospitalizationStartLimit}
                      </div>
                    ) : null}
                  </div>
                  <div className={classNames(style.col6)}>
                    <InputField
                      placeholder={t("endLimit")}
                      id="hospitalizationEndLimit"
                      name="hospitalizationEndLimit"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.hospitalizationEndLimit}
                    />
                    {formik.touched.hospitalizationEndLimit &&
                    formik.errors.hospitalizationEndLimit ? (
                      <div className={classNames(commonstyles.error)}>
                        *{formik.errors.hospitalizationEndLimit}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={commonstyles.flxEnd}>
          <div style={{ width: "200px" }}>
            <PrimaryButton
              children={t("save&Continue")}
              colorType={"New_blue"}
              type="submit"
              // onClick={handleGoFamilyflow}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const Parents = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Declare once
  const { t, setShowModal } = props;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: {
      parentsAgeStart: "",
      parentsAgeEnd: "",
      hospitalizationStartLimit: "",
      hospitalizationEndLimit: "",
    },
    validationSchema: Yup.object(insuranceParentsPackageSchema(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    dispatch(setInsuranceMySelfPackage({ ...formik.values }));
    navigate("/insurance/form/parents", {
      state: {
        type: "parents",
      },
    });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ width: "800px" }}>
          <div className={style.header}>
            <p className={classNames(commonstyles.fs16, commonstyles.semiBold)}>
              {t("parentspackage")}
            </p>
            <IoClose className={style.close} onClick={handleCloseModal} />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Accordion className={style.modelFeilds}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={{ color: "#131313", transform: "rotate(0deg)" }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <div>
                    <p
                      className={classNames(
                        commonstyles.fs14,
                        commonstyles.lightItalic
                      )}
                    >
                      {t("theirageCriteria")}
                    </p>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className={classNames(commonstyles.flx, style.gap24)}>
                    <div className={classNames(style.col6)}>
                      <InputField
                        placeholder={t("ageStart")}
                        id="parentsAgeStart"
                        name="parentsAgeStart"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.parentsAgeStart}
                      />
                      {formik.touched.parentsAgeStart &&
                      formik.errors.parentsAgeStart ? (
                        <div className={classNames(commonstyles.error)}>
                          *{formik.errors.parentsAgeStart}
                        </div>
                      ) : null}
                    </div>
                    <div className={classNames(style.col6)}>
                      <InputField
                        placeholder={t("ageEnd")}
                        id="parentsAgeEnd"
                        name="parentsAgeEnd"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.parentsAgeEnd}
                      />
                      {formik.touched.parentsAgeEnd &&
                      formik.errors.parentsAgeEnd ? (
                        <div className={classNames(commonstyles.error)}>
                          *{formik.errors.parentsAgeEnd}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion className={style.modelFeilds}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={{ color: "#131313", border: "none" }}
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <div>
                    <p
                      className={classNames(
                        commonstyles.fs14,
                        commonstyles.lightItalic
                      )}
                    >
                      {t("selectHospitalizationLimit")} (PKR)
                    </p>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className={classNames(commonstyles.flx, style.gap24)}>
                    <div className={classNames(style.col6)}>
                      <InputField
                        placeholder={t("startLimit")}
                        id="hospitalizationStartLimit"
                        name="hospitalizationStartLimit"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.hospitalizationStartLimit}
                      />
                      {formik.touched.hospitalizationStartLimit &&
                      formik.errors.hospitalizationStartLimit ? (
                        <div className={classNames(commonstyles.error)}>
                          *{formik.errors.hospitalizationStartLimit}
                        </div>
                      ) : null}
                    </div>
                    <div className={classNames(style.col6)}>
                      <InputField
                        placeholder={t("endLimit")}
                        id="hospitalizationEndLimit"
                        name="hospitalizationEndLimit"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.hospitalizationEndLimit}
                      />
                      {formik.touched.hospitalizationEndLimit &&
                      formik.errors.hospitalizationEndLimit ? (
                        <div className={classNames(commonstyles.error)}>
                          *{formik.errors.hospitalizationEndLimit}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={classNames(commonstyles.flxEnd)}>
            <div style={{ width: "200px" }}>
              <PrimaryButton
                children={t("save&Continue")}
                colorType={"New_blue"}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

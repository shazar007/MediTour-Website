import { useState } from "react";
import style from "./setting.module.css";
import commonStyles from "shared/utils/common.module.css";
import commonstyle from "shared/utils/common.module.css";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox, Typography } from "@mui/material";
import { BsTelephoneFill } from "react-icons/bs";
import { GiRotaryPhone } from "react-icons/gi";
import SearchBar from "shared/components/Searchbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaEdit } from "react-icons/fa";
import { CustomInput, PrimaryButton } from "shared/components";
import Logo from "assets/logo.png";
import { insuranceUpdateProfile } from "shared/services/Insurance";
import {
  pharTaxUpdateProfileSchema,
  pharmLabInfoUpdateProfileSchema,
  pharmPasswordUpdateProfileSchema,
} from "shared/utils";
import { setInsurance } from "shared/redux";
export default function InsuranceSetting() {
  const { insurance } = useSelector((state: any) => state.root.insurance);

  const {
    ownerName,
    phoneNumber,
    email,
    bankName,
    accountHolderName,
    accountNumber,
    companyName,
    cnicOrPassportNo,
    state,
    incomeTaxNo,
    salesTaxNo,
    website,
    instagram,
    twitter,
    facebook,
  } = insurance;

  const formikPassword = useFormik({
    initialValues: {
      currentPassword: "",
      NewPassword: "",
      ConfirmPassword: "",
    },
    validationSchema: Yup.object(pharmPasswordUpdateProfileSchema),
    onSubmit: (values) => {
      handleSubmitPassword();
    },
  });
  const formik = useFormik({
    initialValues: {
      companyName: companyName || "",
      cnic: cnicOrPassportNo || "",
      state: state || "",
    },
    validationSchema: Yup.object(pharmLabInfoUpdateProfileSchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const formikBank = useFormik({
    initialValues: {
      bankName: bankName || "",
      accountHolderName: accountHolderName || "",
      accountNumber: accountNumber || "",
    },
    onSubmit: (values) => {
      handleSubmitBank();
    },
  });
  const formikTax = useFormik({
    initialValues: {
      incomeTaxNo: incomeTaxNo || "",
      salesTaxNo: salesTaxNo || "",
    },
    validationSchema: Yup.object(pharTaxUpdateProfileSchema),
    onSubmit: (values) => {
      handleSubmitTax();
    },
  });
  const formikSocial = useFormik({
    initialValues: {
      website: website || "",
      instagram: instagram || "",
      twitter: twitter || "",
      facebook: facebook || "",
    },
    onSubmit: (values) => {
      handleSubmitSocial();
    },
  });
  const dispatch = useDispatch();
  const UpdateProfile = (params: any) => {
    insuranceUpdateProfile(params)
      .then((res: any) => {
        dispatch(setInsurance(res?.data?.insurance));
      })
      .catch((err: any) => {})
      .finally(() => {});
  };
  const handleSubmitPassword = () => {
    let currentData = formikPassword.values;

    let params = {
      currentPassword: currentData.currentPassword,
      password: currentData.ConfirmPassword,
    };
    UpdateProfile(params);
  };
  const handleSubmit = () => {
    let currentData = formik.values;

    let params = {
      companyName: currentData.companyName,
      cnicOrPassportNo: currentData.cnic,
      state: currentData.state,
    };
    UpdateProfile(params);
  };
  const handleSubmitBank = () => {
    let currentData = formikBank.values;

    let params = {
      bankName: currentData.bankName,
      accountHolderName: currentData.accountHolderName,
      accountNumber: currentData.accountNumber,
    };
    UpdateProfile(params);
  };

  const handleSubmitTax = () => {
    let currentData = formikTax.values;

    let params = {
      incomeTaxNo: currentData.incomeTaxNo,
      salesTaxNo: currentData.salesTaxNo,
    };
    UpdateProfile(params);
  };
  const handleSubmitSocial = () => {
    let currentData = formikSocial.values;

    let params = {
      website: currentData.website,
      instagram: currentData.instagram,
      twitter: currentData.twitter,
      facebook: currentData.facebook,
    };
    UpdateProfile(params);
  };

  return (
    <div
      className={classNames(
        commonstyle.col12,
        commonstyle.colorBlue,
        style.mb50
      )}
    >
      <SearchBar />
      <div className={classNames(commonstyle.mr87)}>
        <div className={classNames(commonstyle.outerContainer2)}>
          <div className={commonstyle.mb32}>
            <p
              className={classNames(
                commonstyle.fs24,
                commonstyle.semiBold,
                commonstyle.colorBlue
              )}
            >
              Setting
            </p>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <Accordion className={style.dropdown}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "#00276D" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "400" }}>
                  <div>
                    <p
                      className={classNames(
                        commonstyle.fs20,
                        commonstyle.colorBlue
                      )}
                    >
                      Profile
                    </p>
                  </div>
                </Typography>
              </AccordionSummary>
              <div className={style.border}></div>
              <AccordionDetails>
                <Typography>
                  <div className={commonstyle.colorBlue}>
                    <div className={style.flx}>
                      <p className={commonstyle.col2}>Name</p>
                      <div className={commonstyle.col2}>
                        <CustomInput value={ownerName} />
                      </div>
                    </div>
                    <div className={style.flx}>
                      <p className={commonstyle.col2}>Phone Number</p>
                      <div className={commonstyle.col2}>
                        <CustomInput value={phoneNumber} />
                      </div>
                    </div>
                    <div className={classNames(style.flx)}>
                      <p className={commonstyle.col2}>E mail</p>
                      <div className={commonstyle.col2}>
                        <CustomInput value={email} />
                      </div>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          <div style={{ marginBottom: "60px" }}>
            <form onSubmit={formikPassword.handleSubmit}>
              <Accordion className={style.dropdown}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "#00276D" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ fontWeight: "400" }}>
                    <div className={commonstyle.flx}>
                      <p
                        className={classNames(
                          commonstyle.fs20,
                          commonstyle.colorBlue
                        )}
                      >
                        Security
                      </p>
                    </div>
                  </Typography>
                </AccordionSummary>
                <div className={style.border}></div>
                <AccordionDetails>
                  <Typography>
                    <div className={commonstyle.colorBlue}>
                      <div className={commonstyle.flx}>
                        <div style={{ width: "400px" }}>
                          <div className={style.ModelHeader}>
                            <p
                              className={classNames(
                                commonstyle.fs16,
                                commonstyle.semiBold
                              )}
                            >
                              Password Changing
                            </p>
                          </div>
                          <div
                            style={{ marginTop: "32px" }}
                            className={commonstyle.mb32}
                          >
                            <CustomInput
                              placeholder="Current Password"
                              id="currentPassword"
                              name="currentPassword"
                              type="text"
                              onChange={formikPassword.handleChange}
                              value={formikPassword.values.currentPassword}
                            />
                            {formikPassword.touched.currentPassword &&
                            formikPassword.errors.currentPassword ? (
                              <div className={classNames(commonStyles.error)}>
                                *{`${formikPassword.errors.currentPassword}`}
                              </div>
                            ) : null}
                          </div>
                          <div className={commonstyle.mb32}>
                            <CustomInput
                              placeholder="Create New Password"
                              id="NewPassword"
                              name="NewPassword"
                              type="text"
                              onChange={formikPassword.handleChange}
                              value={formikPassword.values.NewPassword}
                            />
                            {formikPassword.touched.NewPassword &&
                            formikPassword.errors.NewPassword ? (
                              <div className={classNames(commonStyles.error)}>
                                *{`${formikPassword.errors.NewPassword}`}
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <CustomInput
                              placeholder="Confirm New Password"
                              id="ConfirmPassword"
                              name="ConfirmPassword"
                              type="text"
                              onChange={formikPassword.handleChange}
                              value={formikPassword.values.ConfirmPassword}
                            />
                            {formikPassword.touched.ConfirmPassword &&
                            formikPassword.errors.ConfirmPassword ? (
                              <div className={classNames(commonStyles.error)}>
                                *{`${formikPassword.errors.ConfirmPassword}`}
                              </div>
                            ) : null}
                          </div>
                          <div
                            style={{ marginTop: "56px" }}
                            className={commonstyle.mb32}
                          >
                            <PrimaryButton
                              children={"Save & Continue"}
                              colorType={"greenOutline"}
                              type="submit"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </form>
          </div>

          <div className={classNames(commonstyle.mt56)}>
            <form onSubmit={formik.handleSubmit}>
              <Accordion className={style.dropdown}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "#00276D" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ fontWeight: "400" }}>
                    {" "}
                    <div>
                      <p
                        className={classNames(
                          commonstyle.fs20,
                          commonstyle.colorBlue
                        )}
                      >
                        Company Info
                      </p>
                    </div>
                  </Typography>
                </AccordionSummary>
                <div className={style.border}></div>
                <AccordionDetails>
                  <Typography>
                    <div className={commonstyle.colorBlue}>
                      <div className={commonstyle.flx}>
                        <div className={commonstyle.col6}>
                          <div className={style.flx}>
                            <p className={commonstyle.col4}>Company Name</p>
                            <div className={commonstyle.col4}>
                              <CustomInput
                                id="companyName"
                                name="companyName"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.companyName}
                              />
                              {formik.touched.companyName &&
                              formik.errors.companyName ? (
                                <div className={classNames(commonStyles.error)}>
                                  *{`${formik.errors.companyName}`}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className={classNames(style.flx)}>
                            <p className={commonstyle.col4}>CNIC NO.</p>
                            <div className={commonstyle.col4}>
                              <CustomInput
                                id="cnic"
                                name="cnic"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.cnic}
                              />
                              {formik.touched.cnic && formik.errors.cnic ? (
                                <div className={classNames(commonStyles.error)}>
                                  *{`${formik.errors.cnic}`}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className={classNames(style.flx)}>
                            <p className={commonstyle.col4}>State</p>
                            <div className={commonstyle.col4}>
                              <CustomInput
                                id="state"
                                name="state"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.state}
                              />
                              {formik.touched.state && formik.errors.state ? (
                                <div className={classNames(commonStyles.error)}>
                                  *{`${formik.errors.state}`}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className={commonstyle.col6}>
                          <div>
                            <img
                              alt="Insurance Logo"
                              src={Logo}
                              className={classNames(
                                commonstyle.col12,
                                style.logo
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className={classNames(style.btnwidth, commonstyle.mt56)}
                      >
                        <PrimaryButton
                          children={"Save"}
                          colorType={"green"}
                          type="submit"
                        />
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </form>
          </div>

          <div className={classNames(style.mt8)}>
            <form onSubmit={formikBank.handleSubmit}>
              <Accordion className={style.dropdown}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "#00276D" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ fontWeight: "400" }}>
                    {" "}
                    <div>
                      <p
                        className={classNames(
                          commonstyle.fs20,
                          commonstyle.colorBlue
                        )}
                      >
                        Bank Details
                      </p>
                    </div>
                  </Typography>
                </AccordionSummary>
                <div className={style.border}></div>
                <AccordionDetails>
                  <Typography>
                    <div className={commonstyle.colorBlue}>
                      <div className={commonstyle.flx}>
                        <div className={commonstyle.col6}>
                          <div className={classNames(style.flx)}>
                            <p className={commonstyle.col4}>Bank Name</p>
                            <div className={commonstyle.col4}>
                              <CustomInput
                                id="bankName"
                                name="bankName"
                                type="text"
                                onChange={formikBank.handleChange}
                                value={formikBank.values.bankName}
                              />
                              {formikBank.touched.bankName &&
                              formikBank.errors.bankName ? (
                                <div className={classNames(commonStyles.error)}>
                                  *{`${formikBank.errors.bankName}`}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className={classNames(style.flx)}>
                            <p className={commonstyle.col4}>
                              Account Holder Name
                            </p>
                            <div className={commonstyle.col4}>
                              <CustomInput
                                id="accountHolderName"
                                name="accountHolderName"
                                type="text"
                                onChange={formikBank.handleChange}
                                value={formikBank.values.accountHolderName}
                              />
                              {formikBank.touched.accountHolderName &&
                              formikBank.errors.accountHolderName ? (
                                <div className={classNames(commonStyles.error)}>
                                  *{`${formikBank.errors.accountHolderName}`}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className={classNames(style.flx)}>
                            <p className={commonstyle.col4}>Account Number</p>
                            <div className={commonstyle.col4}>
                              <CustomInput
                                id="accountNumber"
                                name="accountNumber"
                                type="text"
                                onChange={formikBank.handleChange}
                                value={formikBank.values.accountNumber}
                              />
                              {formikBank.touched.accountNumber &&
                              formikBank.errors.accountNumber ? (
                                <div className={classNames(commonStyles.error)}>
                                  *{`${formikBank.errors.accountNumber}`}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={classNames(style.btnwidth, commonstyle.mt56)}
                      >
                        <PrimaryButton
                          children={"Save"}
                          colorType={"green"}
                          type="submit"
                        />
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </form>
          </div>
          <div className={classNames(style.mt8)}>
            <form onSubmit={formikTax.handleSubmit}>
              <Accordion className={style.dropdown}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "#00276D" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ fontWeight: "400" }}>
                    {" "}
                    <div>
                      <p
                        className={classNames(
                          commonstyle.fs20,
                          commonstyle.colorBlue
                        )}
                      >
                        Tax info
                      </p>
                    </div>
                  </Typography>
                </AccordionSummary>
                <div className={style.border}></div>
                <AccordionDetails>
                  <Typography>
                    <div className={commonstyle.colorBlue}>
                      <div className={commonstyle.flx}>
                        <div className={commonstyle.col6}>
                          <div className={classNames(style.flx)}>
                            <p className={commonstyle.col6}>
                              Income Tax Number
                            </p>
                            <div className={commonstyle.col4}>
                              <CustomInput
                                id="incomeTaxNo"
                                name="incomeTaxNo"
                                type="text"
                                onChange={formikTax.handleChange}
                                value={formikTax.values.incomeTaxNo}
                              />
                              {formikTax.touched.incomeTaxNo &&
                              formikTax.errors.incomeTaxNo ? (
                                <div className={classNames(commonStyles.error)}>
                                  *{`${formikTax.errors.incomeTaxNo}`}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className={classNames(style.flx)}>
                            <p className={commonstyle.col6}>
                              Sales Tax registration Number{" "}
                            </p>
                            <div className={commonstyle.col4}>
                              <CustomInput
                                id="salesTaxNo"
                                name="salesTaxNo"
                                type="text"
                                onChange={formikTax.handleChange}
                                value={formikTax.values.salesTaxNo}
                              />
                              {formikTax.touched.salesTaxNo &&
                              formikTax.errors.salesTaxNo ? (
                                <div className={classNames(commonStyles.error)}>
                                  *{`${formikTax.errors.salesTaxNo}`}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={classNames(style.btnwidth, commonstyle.mt56)}
                      >
                        <PrimaryButton
                          children={"Save"}
                          colorType={"green"}
                          type="submit"
                        />
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </form>
          </div>

          <div className={classNames(commonstyle.mt56)}>
            <form onSubmit={formikSocial.handleSubmit}>
              <Accordion className={style.dropdown}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "#00276D" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{ fontWeight: "400" }}>
                    {" "}
                    <div>
                      <p
                        className={classNames(
                          commonstyle.fs20,
                          commonstyle.colorBlue
                        )}
                      >
                        Social
                      </p>
                    </div>
                  </Typography>
                </AccordionSummary>
                <div className={style.border}></div>
                <AccordionDetails>
                  <Typography>
                    <div className={commonstyle.colorBlue}>
                      <div className={style.flx}>
                        <p className={commonstyle.col2}>Website Link</p>
                        <div className={commonstyle.col2}>
                          <CustomInput
                            id="website"
                            name="website"
                            type="text"
                            onChange={formikSocial.handleChange}
                            value={formikSocial.values.website}
                          />
                          {formikSocial.touched.website &&
                          formikSocial.errors.website ? (
                            <div className={classNames(commonStyles.error)}>
                              *{`${formikSocial.errors.website}`}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className={style.flx}>
                        <p className={commonstyle.col2}>Instagram Link</p>
                        <div className={commonstyle.col2}>
                          <CustomInput
                            id="instagram"
                            name="instagram"
                            type="text"
                            onChange={formikSocial.handleChange}
                            value={formikSocial.values.instagram}
                          />
                          {formikSocial.touched.instagram &&
                          formikSocial.errors.instagram ? (
                            <div className={classNames(commonStyles.error)}>
                              *{`${formikSocial.errors.instagram}`}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className={classNames(style.flx)}>
                        <p className={commonstyle.col2}>Twitter Link</p>
                        <div className={commonstyle.col2}>
                          <CustomInput
                            id="twitter"
                            name="twitter"
                            type="text"
                            onChange={formikSocial.handleChange}
                            value={formikSocial.values.twitter}
                          />
                          {formikSocial.touched.twitter &&
                          formikSocial.errors.twitter ? (
                            <div className={classNames(commonStyles.error)}>
                              *{`${formikSocial.errors.twitter}`}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className={classNames(style.flx)}>
                        <p className={commonstyle.col2}>Facebook Link</p>
                        <div className={commonstyle.col2}>
                          <CustomInput
                            id="facebook"
                            name="facebook"
                            type="text"
                            onChange={formikSocial.handleChange}
                            value={formikSocial.values.facebook}
                          />
                          {formikSocial.touched.facebook &&
                          formikSocial.errors.facebook ? (
                            <div className={classNames(commonStyles.error)}>
                              *{`${formikSocial.errors.facebook}`}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div
                        className={classNames(style.btnwidth, commonstyle.mt56)}
                      >
                        <PrimaryButton
                          children={"Save"}
                          colorType={"green"}
                          type="submit"
                        />
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </form>
          </div>
          <div className={classNames(commonstyle.mt56)}>
            <Accordion className={style.dropdown}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "#00276D" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "400" }}>
                  {" "}
                  <div>
                    <p
                      className={classNames(
                        commonstyle.fs20,
                        commonstyle.colorBlue
                      )}
                    >
                      Availability
                    </p>
                  </div>
                </Typography>
              </AccordionSummary>
              <div className={style.border}></div>
              <AccordionDetails>
                <Typography>
                  <div className={commonstyle.colorBlue}>
                    <div>
                      <FaEdit className={style.edit} />
                    </div>
                    <div className={commonstyle.flx}>
                      <div className={commonstyle.col6}>
                        <div className={style.flx}>
                          <p className={commonstyle.col4}>Online Status</p>
                          <div className={commonstyle.col4}>
                            <CustomInput />
                          </div>
                        </div>
                        <div className={style.flx}>
                          <p className={commonstyle.col4}>
                            I’m Leaving because
                          </p>
                          <div className={commonstyle.col4}>
                            <CustomInput />
                          </div>
                        </div>
                      </div>
                      <div className={commonstyle.col6}>
                        <div>
                          <p>
                            whe you select any option after that your Labwill
                            not be show for user
                          </p>
                          <p className={commonstyle.mt24}>
                            whe you select any option after that your Labwill
                            not be show for user
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={classNames(style.btnwidth, commonstyle.mt56)}
                    >
                      <PrimaryButton children={"Save"} colorType={"green"} />
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={classNames(style.mt8)}>
            <Accordion className={style.dropdown}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "#00276D" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "400" }}>
                  {" "}
                  <div>
                    <p
                      className={classNames(
                        commonstyle.fs20,
                        commonstyle.colorBlue
                      )}
                    >
                      Help with MediTour
                    </p>
                  </div>
                </Typography>
              </AccordionSummary>
              <div className={style.border}></div>
              <AccordionDetails>
                <Typography>
                  <div className={style.w100}>
                    <textarea
                      style={{ resize: "none" }}
                      placeholder="Write some here for query"
                      className={commonstyle.col12}
                    ></textarea>
                  </div>
                  <div className={classNames(style.end, commonstyle.colorBlue)}>
                    <p
                      className={classNames(
                        commonstyle.fs14,
                        commonstyle.semiBold
                      )}
                    >
                      0/800
                    </p>
                  </div>
                  <div className={classNames(style.btnwidth, commonstyle.mt56)}>
                    <PrimaryButton children={"Save"} colorType={"green"} />
                  </div>
                  <div
                    className={classNames(commonstyle.flx, commonstyle.mt56)}
                  >
                    <div className={classNames(style.phone)}>
                      <BsTelephoneFill className={style.phoneicon} />
                      <p className={classNames(commonstyle.fs14)}>
                        +92 1234567
                      </p>
                    </div>
                    <div className={classNames(style.phone)}>
                      <GiRotaryPhone className={style.phoneicon} />
                      <p className={classNames(commonstyle.fs14)}>
                        +92 1234567
                      </p>
                    </div>
                    <p
                      className={classNames(
                        style.end,
                        commonstyle.fs14,
                        commonstyle.semiBold,
                        commonstyle.colorGreen
                      )}
                    >
                      Available 12/7 for your Service
                    </p>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={classNames(style.mt8)}>
            <Accordion className={style.dropdown}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "#00276D" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "400" }}>
                  {" "}
                  <div>
                    <p
                      className={classNames(
                        commonstyle.fs20,
                        commonstyle.colorBlue
                      )}
                    >
                      Notification
                    </p>
                  </div>
                </Typography>
              </AccordionSummary>
              <div className={style.border}></div>
              <AccordionDetails>
                <Typography>
                  <div
                    className={classNames(
                      style.flxrow,
                      commonstyle.colorBlue,
                      commonstyle.mt16
                    )}
                  >
                    <div className={classNames(commonstyle.col6)}>
                      <div className={classNames(commonstyle.flx)}>
                        <div className={classNames(commonstyle.col4)}>
                          <p>Inbox Massages</p>
                        </div>
                        <div>
                          <Checkbox className={style.checkbox} />
                        </div>
                      </div>
                      <div
                        className={classNames(
                          commonstyle.flx,
                          commonstyle.mt16
                        )}
                      >
                        <div className={classNames(commonstyle.col4)}>
                          <p>Order Massages</p>
                        </div>
                        <div>
                          <Checkbox className={style.checkbox} />
                        </div>
                      </div>
                      <div
                        className={classNames(
                          commonstyle.flx,
                          commonstyle.mt16
                        )}
                      >
                        <div className={classNames(commonstyle.col4)}>
                          <p>Order Notification</p>
                        </div>
                        <div>
                          <Checkbox className={style.checkbox} />
                        </div>
                      </div>
                      <div
                        className={classNames(
                          commonstyle.flx,
                          commonstyle.mt16
                        )}
                      >
                        <div className={classNames(commonstyle.col4)}>
                          <p>Rating Reminder</p>
                        </div>
                        <div>
                          <Checkbox className={style.checkbox} />
                        </div>
                      </div>
                    </div>
                    <div className={classNames(commonstyle.col6)}>
                      <p className={style.end}>
                        For Important updates regarding your Meditour activity,{" "}
                      </p>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import Style from "./Profile.module.css";
import CommonStyles from "shared/utils/common.module.css";
import LinearProgressWithLabel from "shared/components/LinearProgressWithLabel";
import { FaPencilAlt } from "react-icons/fa";
import commonStyles from "shared/utils/common.module.css";
import { Input } from "@mui/material";
import Datepicker from "shared/components/DatePicker";
import {
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Cancel as CancelIcon, ArrowDropDown } from "@mui/icons-material";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { updateDoctorProfile } from "shared/services/TravelAgency";
import StyledImagePicker from "shared/components/Img-picker/StyledImagePicker";
import ProfileImagePicker from "shared/components/Img-picker/ProfileImagePicker";
import { set_User, setIsLoggedIn } from "shared/redux";
import {
  allowedValues,
  editableSections_Values,
  formData_Values,
  specialtiesOptions,
} from "./functions";
import { UpdateAllUserPassword } from "shared/services/DoctorService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { allUserUpdateProfile } from "shared/utils";
import { useNavigate } from "react-router-dom";
import LocationInput from "shared/components/LocationInput";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";

type Section =
  | "ProfileInfo"
  | "Qualifications"
  | "Specialties"
  | "Certifications"
  | "BankDetails"
  | "SocialMedia"
  | "Security"
  | "AboutUS";

const DoctorProfile = () => {
  const { user, systemType } = useSelector((state: any) => state.root.common);
  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sectionType, setSectionType] = useState("");
  const [formData, setFormData] = useState(formData_Values(user, dayjs));
  const [editableSections, setEditableSections] = useState({
    ...editableSections_Values,
  });
  const isValidDate = dayjs(formData?.cnicOrPassportExpiry).isValid();

  useEffect(() => {
    setFormData(formData_Values(user, dayjs));
  }, [user]);

  const handleEditClick = (section: Section) => {
    setEditableSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    if (name in formData.location) {
      setFormData((prevState) => ({
        ...prevState,
        location: {
          ...prevState.location,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const filterPayload = (data: any) => {
    const allowedFields = allowedValues;
    const filteredData: any = {};
    Object.keys(data).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredData[key] = data[key];
      }
    });

    return filteredData;
  };

  const handlePmdcExpiry = (date: dayjs.Dayjs | null) => {
    setFormData((prevState) => ({
      ...prevState,
      pmdcExpiry: date,
    }));
  };

  const handleCnicOrPassportExpiry = (date: dayjs.Dayjs | null) => {
    setFormData((prevState) => ({
      ...prevState,
      cnicOrPassportExpiry: date,
    }));
  };

  const handleSpecialityChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setFormData((prevState) => ({
      ...prevState,
      speciality: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleDeleteSpecialty = (
    event: React.MouseEvent,
    specialtyToDelete: string
  ) => {
    event.stopPropagation();

    setFormData((prevState) => ({
      ...prevState,
      speciality: prevState.speciality.filter(
        (specialty: string) => specialty !== specialtyToDelete
      ),
    }));
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      email: user?.email,
      userModel: "Doctor",
    },
    validationSchema: Yup.object(allUserUpdateProfile),
    onSubmit: (values) => {
      setLoading(true);
      const { confirmPassword, ...filteredValues } = values;
      UpdateAllUserPassword(filteredValues)
        .then((res: any) => {
          notifySuccess(res?.data?.message);
          setEditableSections((prevState) => ({
            ...prevState,
            Security: false,
          }));
          dispatch(setIsLoggedIn(false));
          navigate(`/${systemType}/login`);
        })
        .catch((err: any) => {
          notifyError(err?.response?.data?.message);
        })
        .finally(() => setLoading(false));
    },
  });

  const handle_Save_And_Cancel = async (section: Section, type: String) => {
    if (type == "save") {
      setSectionType(section);
      if (section == "Security") {
        formik?.handleSubmit();
      } else {
        setLoading(true);
        const formattedData = {
          ...formData,
          pmdcExpiry: formData.pmdcExpiry
            ? formData.pmdcExpiry.format("YYYY-MM-DD")
            : "",
          cnicOrPassportExpiry: formData.cnicOrPassportExpiry
            ? formData.cnicOrPassportExpiry.format("YYYY-MM-DD")
            : "",
        };
        const filteredData = filterPayload(formattedData);
        updateDoctorProfile(filteredData)
          .then((res: any) => {
            dispatch(set_User(res?.data?.doctor));
            setEditableSections((prevState) => ({
              ...prevState,
              [section]: false,
            }));
            notifySuccess("Profile updated successfully!");
          })
          .catch((err: any) => {
            notifyError(err?.response?.data?.message);
          })
          .finally(() => setLoading(false));
      }
    } else {
      setEditableSections((prevState) => ({
        ...prevState,
        [section]: false,
      }));
      setFormData(formData_Values(user, dayjs));
    }
  };
  const handleLocation = (location: any) => {
    setFormData((prevState) => ({
      ...prevState,
      location: {
        lng: location?.lng || "",
        lat: location?.lat || "",
        address: location?.label || "",
        city: location.city || "",
      },
    }));
  };
  let checkSpecialiy = formData.speciality?.length === 0 ? false : true;
  return (
    <div className={classNames(CommonStyles.col12, Style.parent)}>
      <div className={classNames(CommonStyles.col11, Style.main)}>
        <div className={classNames(CommonStyles.flx, CommonStyles.flxBetween)}>
          <div
            className={classNames(
              CommonStyles.colorBlue,
              CommonStyles.bold,
              CommonStyles.fs24
            )}
          >
            <p>Profile</p>
          </div>
          <div>
            <div style={{ padding: "20px" }}>
              <LinearProgressWithLabel
                value={formData.profilePercentage || 0}
              />
              <p
                style={{ color: "#FF7631", marginTop: 4, width: "320px" }}
                className={classNames(CommonStyles.regular, CommonStyles.fs12)}
              >
                {formData.profilePercentage === 100
                  ? ""
                  : "Complete Your Profile for better business"}
              </p>
            </div>
          </div>
        </div>

        <div
          className={classNames(
            CommonStyles.flx,
            CommonStyles.flxBetween,
            CommonStyles.col12
          )}
        >
          <div className={CommonStyles.col6}>
            <p className={classNames(Style.title)}>Profile Info</p>
            <div
              className={classNames(
                CommonStyles.flx,
                CommonStyles.flxBetween,
                CommonStyles.col12
              )}
            >
              <div>
                <Input
                  placeholder="Name"
                  value={formData.name || ""}
                  name="name"
                  onChange={handleInputChange}
                  disabled={!editableSections.ProfileInfo}
                />
              </div>
              <div>
                <Input
                  placeholder="Contact"
                  value={user.phoneNumber || ""}
                  name="phoneNumber"
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>
            <div
              className={classNames(
                CommonStyles.flx,
                CommonStyles.flxBetween,
                CommonStyles.col12
              )}
            >
              <div className={Style.inputContainer}>
                <Input
                  placeholder="Email"
                  value={user.email || ""}
                  name="email"
                  onChange={handleInputChange}
                  disabled
                  fullWidth
                />
              </div>
              <div>
                <Input
                  placeholder="CNIC"
                  value={formData.cnicOrPassportNo}
                  name="cnicOrPassportNo"
                  onChange={handleInputChange}
                  disabled={!editableSections.ProfileInfo}
                />
              </div>
            </div>
            <div
              className={classNames(
                CommonStyles.flx,
                CommonStyles.flxBetween,
                CommonStyles.col12
              )}
            >
              <div>
                <StyledImagePicker
                  placeholder="CNIC Image"
                  setData={(url: string) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      pmdcImage: url,
                    }));
                  }}
                  value={formData.cnicImage || ""}
                  disabled={!editableSections.ProfileInfo}
                />
              </div>
              <div>
                <div
                  className={classNames(commonStyles.mr32, commonStyles.mt16)}
                >
                  <Datepicker
                    placeholder="CNIC EXPIRY"
                    setData={handleCnicOrPassportExpiry}
                    value={formData.cnicOrPassportExpiry}
                    disabled={!editableSections.ProfileInfo}
                  />
                </div>
              </div>
            </div>
            <div className={classNames(Style.addressField, CommonStyles.col12)}>
              <LocationInput
                placeholder={formData.location.address || "Address"}
                setData={handleLocation}
                defaultValue={formData.location.address}
                disabled={!editableSections.ProfileInfo}
              />
            </div>
            {editableSections.ProfileInfo && (
              <SaveAndCancel
                id={"ProfileInfo"}
                sectionType={sectionType}
                isValidDate={isValidDate}
                loading={!isValidDate ? true : loading}
                handleClick={handle_Save_And_Cancel}
              />
            )}
          </div>

          <div className={classNames(Style.profileClick, CommonStyles.col3)}>
            <FaPencilAlt
              onClick={() => handleEditClick("ProfileInfo")}
              className={CommonStyles.cursor}
            />
            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <ProfileImagePicker
                value={formData.doctorImage || ""}
                accept={"image/*"}
                setData={(url: string) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    doctorImage: url,
                  }))
                }
                disabled={!editableSections.ProfileInfo}
              />
              <p className={Style.editText}>
                {editableSections.ProfileInfo
                  ? "Click to change image"
                  : "Edit image"}
              </p>
            </div>
          </div>
        </div>

        <div
          className={classNames(
            CommonStyles.flx,
            CommonStyles.flxBetween,
            CommonStyles.col12
          )}
        >
          <div className={CommonStyles.col6}>
            <p className={classNames(Style.title)}>About</p>
            <div
              className={classNames(
                CommonStyles.flx,
                CommonStyles.flxBetween,
                CommonStyles.col12
              )}
            >
              <div className={Style.aboutUsDoctor}>
                <textarea
                  className={Style.textareaAboutUs}
                  value={formData.about || ""}
                  name="about"
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      about: e.target.value,
                    }));
                  }}
                  placeholder="Write about us here..."
                  disabled={!editableSections.AboutUS}
                />
              </div>
            </div>
            {editableSections.AboutUS && (
              <SaveAndCancel
                id={"AboutUS"}
                sectionType={sectionType}
                loading={loading}
                handleClick={handle_Save_And_Cancel}
              />
            )}
          </div>

          <div className={classNames(Style.profileClick, CommonStyles.col3)}>
            <FaPencilAlt
              onClick={() => handleEditClick("AboutUS")}
              className={CommonStyles.cursor}
            />
          </div>
        </div>

        <div
          className={classNames(
            CommonStyles.mt16,
            CommonStyles.flx,
            CommonStyles.flxBetween,
            CommonStyles.col12
          )}
        >
          <div className={CommonStyles.col6}>
            <p className={classNames(Style.title)}>Qualifications</p>
            <div className={Style.qualificationContainer}>
              <Input
                placeholder="Qualifications"
                value={formData.qualifications || ""}
                name="qualifications"
                onChange={handleInputChange}
                disabled={!editableSections.Qualifications}
                fullWidth
              />
            </div>
            {editableSections.Qualifications && (
              <SaveAndCancel
                id={"Qualifications"}
                sectionType={sectionType}
                loading={loading}
                handleClick={handle_Save_And_Cancel}
              />
            )}
          </div>
          <div className={classNames(Style.profileClick, CommonStyles.col3)}>
            <FaPencilAlt
              onClick={() => handleEditClick("Qualifications")}
              className={CommonStyles.cursor}
            />
          </div>
        </div>

        <div
          className={classNames(
            CommonStyles.flx,
            CommonStyles.mt16,
            CommonStyles.flxBetween,
            CommonStyles.col12
          )}
        >
          <div className={CommonStyles.col6}>
            <p className={classNames(Style.title)}>Specialties</p>
            <FormControl fullWidth sx={{ position: "relative" }}>
              <Select
                multiple
                value={formData.speciality}
                onChange={handleSpecialityChange}
                open={isDropdownOpen}
                onClose={() => setIsDropdownOpen(false)}
                ref={selectRef}
                disabled={!editableSections.Specialties}
                renderValue={(selected: string[]) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected?.map((value: string) => (
                      <Chip
                        key={value}
                        label={value}
                        onDelete={
                          editableSections.Specialties
                            ? (event) => handleDeleteSpecialty(event, value)
                            : undefined
                        }
                        deleteIcon={
                          editableSections.Specialties ? (
                            <CancelIcon />
                          ) : undefined
                        }
                      />
                    ))}
                  </Box>
                )}
                IconComponent={() => null}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
              >
                {specialtiesOptions.map((speciality) => (
                  <MenuItem key={speciality} value={speciality}>
                    {speciality}
                  </MenuItem>
                ))}
              </Select>

              {editableSections.Specialties && (
                <IconButton
                  onClick={() => setIsDropdownOpen(true)}
                  className={Style.dropdownIcon}
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "#f0f0f0",
                    padding: "8px",
                    borderRadius: "50%",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    transition:
                      "background-color 0.3s ease, box-shadow 0.3s ease",

                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    },
                    "&:active": {
                      backgroundColor: "#d0d0d0",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <ArrowDropDown
                    sx={{
                      fontSize: "1.5rem",
                      color: "#555",
                      transition: "color 0.3s ease",

                      "&:hover": {
                        color: "#333",
                      },
                    }}
                  />
                </IconButton>
              )}
            </FormControl>

            {editableSections.Specialties && (
              <SaveAndCancel
                id={"Specialties"}
                isValidDate={checkSpecialiy}
                sectionType={sectionType}
                loading={!checkSpecialiy ? true : loading}
                handleClick={handle_Save_And_Cancel}
              />
            )}
          </div>

          <div className={classNames(Style.profileClick, CommonStyles.col3)}>
            <FaPencilAlt
              onClick={() => handleEditClick("Specialties")}
              className={CommonStyles.cursor}
            />
          </div>
        </div>

        <div
          className={classNames(
            CommonStyles.flx,
            CommonStyles.mt16,
            CommonStyles.flxBetween,
            CommonStyles.col12
          )}
        >
          <div className={CommonStyles.col6}>
            <p className={classNames(Style.title)}>Certifications</p>
            <div
              className={classNames(
                CommonStyles.flx,
                CommonStyles.flxBetween,
                CommonStyles.col12
              )}
            >
              <div>
                <Input
                  placeholder="PMDC Number"
                  value={formData.pmdcNumber || ""}
                  name="pmdcNumber"
                  onChange={handleInputChange}
                  disabled={!editableSections.Certifications}
                />
              </div>
              <div>
                <StyledImagePicker
                  placeholder="PMDC Image"
                  setData={(url: string) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      pmdcImage: url,
                    }));
                  }}
                  value={formData.pmdcImage || ""}
                  disabled={!editableSections.Certifications}
                />
              </div>
            </div>
            <div
              className={classNames(
                CommonStyles.flx,
                CommonStyles.flxBetween,
                CommonStyles.col12
              )}
            >
              <div className={classNames(commonStyles.mr32, commonStyles.mt16)}>
                <Datepicker
                  placeholder="PMDC Expiry"
                  setData={handlePmdcExpiry}
                  value={
                    formData.pmdcExpiry ? dayjs(formData.pmdcExpiry) : null
                  }
                  disabled={!editableSections.Certifications}
                />
              </div>
            </div>
            {editableSections.Certifications && (
              <SaveAndCancel
                id={"Certifications"}
                sectionType={sectionType}
                loading={loading}
                handleClick={handle_Save_And_Cancel}
              />
            )}
          </div>

          <div className={classNames(Style.profileClick, CommonStyles.col3)}>
            <FaPencilAlt
              onClick={() => handleEditClick("Certifications")}
              className={CommonStyles.cursor}
            />
          </div>
        </div>

        {/* Bank Details Section */}
        <div
          className={classNames(
            CommonStyles.flx,
            CommonStyles.mt16,
            CommonStyles.flxBetween,
            CommonStyles.col12
          )}
        >
          <div className={CommonStyles.col6}>
            <p className={classNames(Style.title)}>Bank Details</p>
            <div
              className={classNames(
                CommonStyles.flx,
                CommonStyles.flxBetween,
                CommonStyles.col12
              )}
            >
              <div>
                <Input
                  placeholder="Income Tax Number"
                  value={formData.ntn || ""}
                  name="incomeTaxNo"
                  onChange={handleInputChange}
                  disabled={!editableSections.BankDetails}
                />
              </div>
            </div>
            <div
              className={classNames(
                CommonStyles.flx,
                CommonStyles.flxBetween,
                CommonStyles.col12
              )}
            >
              <div>
                <StyledImagePicker
                  placeholder="Attach Tax File"
                  setData={(url: string) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      taxFileImage: url,
                    }));
                  }}
                  value={formData.taxFileImage || ""}
                  disabled={!editableSections.BankDetails}
                />
              </div>
              <div>
                <Input
                  placeholder="Account Holder Name"
                  value={formData.accountTitle || ""}
                  name="accountHolderName"
                  onChange={handleInputChange}
                  disabled={!editableSections.BankDetails}
                />
              </div>
            </div>
            <div
              className={classNames(
                CommonStyles.flx,
                CommonStyles.flxBetween,
                CommonStyles.col12
              )}
            >
              <div>
                <Input
                  placeholder="Bank Name"
                  value={formData.bankName || ""}
                  name="bankName"
                  onChange={handleInputChange}
                  disabled={!editableSections.BankDetails}
                />
              </div>
              <div>
                <Input
                  placeholder="Account Holder Number"
                  value={formData.accountNumber}
                  name="accountNumber"
                  onChange={handleInputChange}
                  disabled={!editableSections.BankDetails}
                />
              </div>
            </div>
            {editableSections.BankDetails && (
              <SaveAndCancel
                id={"BankDetails"}
                sectionType={sectionType}
                loading={loading}
                handleClick={handle_Save_And_Cancel}
              />
            )}
          </div>
          <div className={classNames(Style.profileClick, CommonStyles.col3)}>
            <FaPencilAlt
              onClick={() => handleEditClick("BankDetails")}
              className={CommonStyles.cursor}
            />
          </div>
        </div>

        <div
          className={classNames(
            CommonStyles.flx,
            CommonStyles.mt16,
            CommonStyles.flxBetween,
            CommonStyles.col12
          )}
        >
          <div className={CommonStyles.col6}>
            <p className={classNames(Style.title)}>Social Media Links</p>
            <div
              className={classNames(
                CommonStyles.flx,
                CommonStyles.flxBetween,
                CommonStyles.col12
              )}
            >
              <div>
                <Input
                  placeholder="Youtube (optional)"
                  value={formData.linkedIn || ""}
                  name="youtube"
                  onChange={handleInputChange}
                  disabled={!editableSections.SocialMedia}
                />
              </div>
              <div>
                <Input
                  placeholder="Instagram"
                  value={formData.instagram || ""}
                  name="instagram"
                  onChange={handleInputChange}
                  disabled={!editableSections.SocialMedia}
                />
              </div>
            </div>
            <div
              className={classNames(
                CommonStyles.flx,
                CommonStyles.flxBetween,
                CommonStyles.col12
              )}
            >
              <div>
                <Input
                  placeholder="LinkedIn"
                  value={formData.linkedIn}
                  name="linkedIn"
                  onChange={handleInputChange}
                  disabled={!editableSections.SocialMedia}
                />
              </div>
              <div>
                <Input
                  placeholder="Facebook"
                  value={formData.facebook || ""}
                  name="facebook"
                  onChange={handleInputChange}
                  disabled={!editableSections.SocialMedia}
                />
              </div>
            </div>
            {editableSections.SocialMedia && (
              <SaveAndCancel
                id={"SocialMedia"}
                sectionType={sectionType}
                loading={loading}
                handleClick={handle_Save_And_Cancel}
              />
            )}
          </div>
          <div className={classNames(Style.profileClick, CommonStyles.col3)}>
            <FaPencilAlt
              onClick={() => handleEditClick("SocialMedia")}
              className={CommonStyles.cursor}
            />
          </div>
        </div>

        <div
          className={classNames(
            CommonStyles.flx,
            CommonStyles.mt16,
            CommonStyles.flxBetween,
            CommonStyles.col12
          )}
        >
          <div className={CommonStyles.col12}>
            <p className={classNames(Style.title)}>Security</p>

            <SecuritySection
              formik={formik}
              editableSections={editableSections}
            />

            {editableSections.Security && (
              <SaveAndCancel
                id={"Security"}
                sectionType={sectionType}
                loading={loading}
                handleClick={handle_Save_And_Cancel}
              />
            )}
          </div>

          <div className={classNames(Style.profileClick, CommonStyles.col3)}>
            <FaPencilAlt
              onClick={() => handleEditClick("Security")}
              className={CommonStyles.cursor}
              style={{ marginRight: "51px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

const SecuritySection = ({
  editableSections,
  formik,
}: {
  editableSections?: any;
  formik?: any;
}) => {
  return (
    <>
      <div
        className={classNames(
          CommonStyles.flx,
          CommonStyles.flxBetween,
          CommonStyles.col12
        )}
      >
        <div className={CommonStyles.col4}>
          <FormControl fullWidth error={Boolean(formik.errors.oldPassword)}>
            <Input
              type="password"
              placeholder="Current Password"
              name="oldPassword"
              id="oldPassword"
              value={formik?.values?.oldPassword}
              onChange={formik?.handleChange}
              disabled={!editableSections.Security}
              fullWidth
            />
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <FormHelperText>{formik.errors?.oldPassword}</FormHelperText>
            )}
          </FormControl>
        </div>
      </div>

      <div
        className={classNames(
          CommonStyles.flx,
          CommonStyles.flxBetween,
          CommonStyles.col12,
          CommonStyles.mt16
        )}
      >
        <div className={CommonStyles.col4}>
          <FormControl fullWidth error={Boolean(formik.errors.newPassword)}>
            <Input
              name="newPassword"
              id="newPassword"
              type="password"
              placeholder="New Password"
              value={formik?.values?.newPassword}
              onChange={formik?.handleChange}
              disabled={!editableSections.Security}
              fullWidth
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <FormHelperText>{formik.errors?.newPassword}</FormHelperText>
            )}
          </FormControl>
        </div>
      </div>

      <div
        className={classNames(
          CommonStyles.flx,
          CommonStyles.flxBetween,
          CommonStyles.col12,
          CommonStyles.mt16
        )}
      >
        <div className={CommonStyles.col4}>
          <FormControl fullWidth error={Boolean(formik.errors.confirmPassword)}>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={formik?.values?.confirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              onChange={formik?.handleChange}
              disabled={!editableSections.Security}
              fullWidth
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <FormHelperText>
                  {formik.errors?.confirmPassword}
                </FormHelperText>
              )}
          </FormControl>
        </div>
      </div>
    </>
  );
};

const SaveAndCancel = ({
  handleClick,
  loading,
  id,
  isValidDate,
  sectionType,
}: {
  handleClick?: any;
  loading?: any;
  id?: any;
  isValidDate?: any;
  sectionType?: any;
}) => {
  return (
    <div className={classNames(CommonStyles.centerButtons, CommonStyles.mt16)}>
      <button
        className={classNames(
          Style.button,
          (!isValidDate && id === "ProfileInfo") ||
            (!isValidDate && id === "Specialties")
            ? Style.notValidate
            : Style.SaveButton
        )}
        style={{
          cursor:
            (!isValidDate && id === "ProfileInfo") ||
            (!isValidDate && id === "Specialties")
              ? "not-allowed"
              : "pointer",
        }}
        onClick={() => handleClick(id, "save")}
        disabled={loading}
      >
        {(!isValidDate && id === "ProfileInfo") ||
        (!isValidDate && id === "Specialties")
          ? "Save"
          : id === sectionType && loading
          ? "Saving..."
          : "Save"}
      </button>
      <button
        className={classNames(Style.button, Style.cancelButton)}
        onClick={() => handleClick(id, "cancel")}
      >
        Cancel
      </button>
    </div>
  );
};

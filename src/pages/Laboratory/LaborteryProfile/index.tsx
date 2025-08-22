import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Style from "./Profile.module.css";
import CommonStyles from "shared/utils/common.module.css";
import { FaPencilAlt } from "react-icons/fa";
import commonStyles from "shared/utils/common.module.css";
import { Input } from "@mui/material";
import Datepicker from "shared/components/DatePicker";
import { FormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { updateLabProfile } from "shared/services/TravelAgency";
import StyledImagePicker from "shared/components/Img-picker/StyledImagePicker";
import ProfileImagePicker from "shared/components/Img-picker/ProfileImagePicker";
import { set_User, setIsLoggedIn } from "shared/redux";
import {
  allowedValues,
  editableSections_Values,
  formData_Values,
} from "./functions";
import { UpdateAllUserPassword } from "shared/services/DoctorService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { allUserUpdateProfile } from "shared/utils";
import { useNavigate } from "react-router-dom";
import CustomTimePicker from "shared/components/TimePicker/TimePICKER2";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";
import { InputField } from "shared/components";
import LocationInput from "shared/components/LocationInput";
type Section =
  | "ProfileInfo"
  | "BankDetails"
  | "SocialMedia"
  | "Security"
  | "OpenTime"
  | "AboutUS";
const LaborteryProfile = () => {
  const { user, systemType } = useSelector((state: any) => state.root.common);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sectionType, setSectionType] = useState("");
  const [formData, setFormData] = useState(formData_Values(user, dayjs));
  const [editableSections, setEditableSections] = useState({
    ...editableSections_Values,
  });
  useEffect(() => {
    setFormData(formData_Values(user, dayjs));
  }, [user]);
  const handleEditClick = (section: Section) => {
    setEditableSections((prevState: any) => ({
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
  const handleCnicOrPassportExpiry = (date: dayjs.Dayjs | null) => {
    setFormData((prevState) => ({
      ...prevState,
      cnicOrPassportExpiry: date,
    }));
  };
  const handleLocation = (location: any) => {
    console.log(location, "...location");
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
  const handlelicenseExpiry = (date: dayjs.Dayjs | null) => {
    setFormData((prevState) => ({
      ...prevState,
      licenseExpiry: date,
    }));
  };
  const handleHospitalOpenTime = (time: any) => {
    setFormData((prevState) => ({
      ...prevState,
      openTime: time,
    }));
  };
  const handleHospitalCloseTime = (time: any) => {
    setFormData((prevState) => ({
      ...prevState,
      closeTime: time,
    }));
  };
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      email: user?.email,
      userModel: "Laboratory",
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
        .catch((err: any) => {})
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
          cnicOrPassportExpiry: formData.cnicOrPassportExpiry
            ? formData.cnicOrPassportExpiry.format("YYYY-MM-DD")
            : "",
        };
        const filteredData = filterPayload(formattedData);
        console.log(filteredData, ".filteredata");
        updateLabProfile(filteredData)
          .then((res: any) => {
            console.log(res?.data?.lab, "......lab,");
            dispatch(set_User(res?.data?.lab));
            setEditableSections((prevState) => ({
              ...prevState,
              [section]: false,
            }));
            notifySuccess("Profile updated successfully!");
          })
          .catch((err: any) => {})
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
        </div>

        {/* Profile Info Section */}
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
              <div>
                <Input
                  placeholder="Owner First Name"
                  value={formData.ownerFirstName || ""}
                  name="ownerFirstName"
                  onChange={handleInputChange}
                  disabled={!editableSections.ProfileInfo}
                />
              </div>
              <div>
                <Input
                  placeholder="Owner Last Name"
                  value={formData.ownerLastName || ""}
                  name="ownerLastName"
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
                      cnicImage: url,
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
            <div
              className={classNames(
                CommonStyles.flx,
                CommonStyles.flxBetween,
                CommonStyles.col12
              )}
            >
              <div>
                <Input
                  placeholder="Lab License Number"
                  value={formData.labLicenseNumber}
                  name="labLicenseNumber"
                  onChange={handleInputChange}
                  disabled={!editableSections.ProfileInfo}
                />
              </div>
              <div>
                <StyledImagePicker
                  placeholder="Lab License Image"
                  setData={(url: string) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      labLicenseImage: url,
                    }));
                  }}
                  value={formData.labLicenseImage || ""}
                  disabled={!editableSections.ProfileInfo}
                />
              </div>
            </div>
            <div>
              <div className={classNames(commonStyles.mr32, commonStyles.mt16)}>
                <Datepicker
                  placeholder="License Expiry"
                  setData={handlelicenseExpiry}
                  value={formData.licenseExpiry}
                  disabled={!editableSections.ProfileInfo}
                />
              </div>
            </div>
            <div className={classNames(Style.addressField, CommonStyles.col12)}>
              <LocationInput
                placeholder={formData.location.address || "Address"}
                // type={"box"}
                setData={handleLocation}
                defaultValue={formData.location.address}
                disabled={!editableSections.ProfileInfo}
              />
            </div>
            {editableSections.ProfileInfo && (
              <SaveAndCancel
                id={"ProfileInfo"}
                sectionType={sectionType}
                loading={loading}
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
                value={formData.logo || ""}
                setData={(url: string) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    logo: url,
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
            <p className={classNames(Style.title)}>Description</p>
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
                  value={formData.description || ""}
                  name="description"
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      description: e.target.value,
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
        {/* Certifications Section */}
        <div
          className={classNames(
            CommonStyles.flx,
            CommonStyles.flxBetween,
            CommonStyles.col12
          )}
        >
          <div>
            <p className={classNames(Style.title)}>Labortery Time</p>
            <div className={classNames(CommonStyles.flx, CommonStyles.col12)}>
              <div>
                <div
                  className={classNames(commonStyles.mr32, commonStyles.mt16)}
                >
                  <CustomTimePicker
                    placeholder="Open Time"
                    AM={"hh:mm A"}
                    setData={handleHospitalOpenTime}
                    type={"box"}
                    value={formData.openTime}
                    disabled={!editableSections.OpenTime}
                  />
                </div>
              </div>
              <div>
                <div
                  className={classNames(commonStyles.mr32, commonStyles.mt16)}
                >
                  <CustomTimePicker
                    placeholder="Close Time"
                    AM={"hh:mm A"}
                    setData={handleHospitalCloseTime}
                    type={"box"}
                    value={formData.closeTime}
                    disabled={!editableSections.OpenTime}
                  />
                </div>
              </div>
            </div>
            {editableSections.OpenTime && (
              <SaveAndCancel
                id={"OpenTime"}
                sectionType={sectionType}
                loading={loading}
                handleClick={handle_Save_And_Cancel}
              />
            )}
          </div>
          <div className={classNames(Style.profileClick, CommonStyles.col3)}>
            <FaPencilAlt
              onClick={() => handleEditClick("OpenTime")}
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
                  placeholder="ntn"
                  value={formData.ntn || ""}
                  name="ntn"
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
                  name="accountTitle"
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
        {/* Social Media Links Section */}
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
                  value={formData.youtube || ""}
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

        {/* Security Section */}
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
export default LaborteryProfile;
const SecuritySection = ({
  editableSections,
  formik,
}: {
  editableSections?: any;
  formik?: any;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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
            <InputField
              id="oldPassword"
              password={true}
              formik={formik}
              placeholder="Current Password"
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              type={showPassword ? "text" : "password"}
              onChange={formik?.handleChange("oldPassword")}
              disabled={!editableSections?.Security}
            />
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
            <InputField
              id="newPassword"
              password={true}
              formik={formik}
              placeholder="New Password"
              showPassword={showPassword1}
              togglePassword={() => setShowPassword1(!showPassword1)}
              type={showPassword1 ? "text" : "password"}
              onChange={formik?.handleChange("newPassword")}
              disabled={!editableSections?.Security}
            />
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
            <InputField
              id="confirmPassword"
              password={true}
              formik={formik}
              placeholder="Confirm Password"
              showPassword={showPassword2}
              togglePassword={() => setShowPassword2(!showPassword2)}
              type={showPassword2 ? "text" : "password"}
              onChange={formik?.handleChange("confirmPassword")}
              disabled={!editableSections?.Security}
            />
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
        className={classNames(Style.button, Style.SaveButton)}
        style={{
          cursor: "pointer",
        }}
        onClick={() => handleClick(id, "save")}
        disabled={loading}
      >
        {id === sectionType && loading ? "Saving..." : "Save"}
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

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import MainMedicalstyle from "./mainMedicalService.module.css";
import commonStyles from "shared/utils/common.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PrimaryButton } from "shared/components";
import ImgPicker from "shared/components/Img-picker";
import { CustomInput } from "shared/components";
import { useDispatch, useSelector } from "react-redux";
import { docSignup } from "shared/services/DoctorService";
import {
  setDocUser_ID,
  setDoctorFormData,
  setHospitalFormData,
  setRentCarUserFormData,
} from "shared/redux";
import { hospitalSignup } from "shared/services/HospitalService";
import { rentCarSignup } from "shared/services/RentaCar";

interface Props {
  handleNext: any;
  kind: any;
}
const Doctor_BankDetail = (props: Partial<Props>) => {
  const { handleNext, kind } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { doctorFormData, fcmToken, systemType, hospitalFormData } =
    useSelector((state: any) => state.root.common);
  const { rentcarUserFormData } = useSelector(
    (state: any) => state.root.rentcar
  );
  const formik = useFormik({
    initialValues: {
      incomeTaxNumber: "",
      saleTaxNumber: "",
      taxFile: "",
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
    },
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const saveDoctor = () => {
    let currentData = formik.values;

    let params = {
      doctorType: doctorFormData.type,
      name: doctorFormData.name,
      cnicOrPassportNo: doctorFormData.cnicNumber,
      cnicImage: doctorFormData.cnicImage,
      cnicOrPassportExpiry: doctorFormData.cnicExpiry,
      qualifications: doctorFormData.qualification,
      speciality: doctorFormData.speciality,
      clinicName: doctorFormData.clinicName,
      clinicExperience: doctorFormData.experience,
      pmdcNumber: doctorFormData.pmdcNumber,
      pmdcImage: doctorFormData.pmdcImage,
      pmdcExpiry: doctorFormData.pmdcExpiry,
      location: {
        lat: doctorFormData.lat,
        lng: doctorFormData.lng,
        address: doctorFormData.address,
        city: doctorFormData.city,
      },

      ...(doctorFormData.webUrl && {
        website: doctorFormData.webUrl,
      }),
      ...(doctorFormData.twitterUrl && {
        twitter: doctorFormData.twitterUrl,
      }),
      ...(doctorFormData.instaUrl && {
        instagram: doctorFormData.instaUrl,
      }),
      ...(doctorFormData.fbUrl && {
        facebook: doctorFormData.fbUrl,
      }),
      incomeTaxNo: currentData.incomeTaxNumber,
      salesTaxNo: currentData.saleTaxNumber,
      bankName: currentData.bankName,
      accountHolderName: currentData.accountHolderName,
      accountNumber: currentData.accountNumber,
      taxFileImage: currentData.taxFile,
      doctorKind: kind,
      fcmToken,
    };

    // docSignup(params)
    //   .then((res: any) => {
    //     if (res.data.auth) {
    //       dispatch(
    //         setDoctorFormData({
    //           type: "",
    //           name: "",
    //           cnicNumber: "",
    //           cnicImage: "",
    //           cnicExpiry: "",
    //           qualification: "",
    //           speciality: "",
    //           clinicName: "",
    //           experience: "",
    //           pmdcNumber: "",
    //           pmdcImage: "",
    //           pmdcExpiry: "",
    //           address: "",
    //           lat: "",
    //           lng: "",
    //           city: "",
    //           fbUrl: "",
    //           instaUrl: "",
    //           twitterUrl: "",
    //           webUrl: "",
    //         })
    //       );
    //       dispatch(setDocUser_ID(res.data.doctor._id));
    //       handleNext();
    //     }
    //   })
    // .catch((err: any) => {
    //
    // })
    // .finally(() => {
    //   setLoading(false);
    // });
  };

  const saveHospital = () => {
    let currentData = formik.values;
    let params = {
      name: hospitalFormData.name,
      logo: hospitalFormData.logo,
      hospitalRegNo: hospitalFormData.registrationNo,
      registrationImage: hospitalFormData.registrationImage,
      registrationExpiry: hospitalFormData.registrationExpiry,
      ownerFirstName: hospitalFormData.ownerFirstName,
      ownerLastName: hospitalFormData.ownerLastName,
      emergencyNo: hospitalFormData.emergencyNumber,
      cnicOrPassportNo: hospitalFormData.cnicNumber,
      cnicImage: hospitalFormData.cnicImage,
      cnicOrPassportExpiry: hospitalFormData.cnicExpiryDate,
      openTime: hospitalFormData.openTime,
      closeTime: hospitalFormData.closeTime,

      location: {
        lat: hospitalFormData.lat,
        lng: hospitalFormData.lng,
        address: hospitalFormData.address,
        city: hospitalFormData.city,
      },
      ...(hospitalFormData.fbUrl && {
        facebook: hospitalFormData.fbUrl,
      }),
      ...(hospitalFormData.instaUrl && {
        instagram: hospitalFormData.instaUrl,
      }),
      ...(hospitalFormData.twitterUrl && {
        twitter: hospitalFormData.twitterUrl,
      }),
      ...(hospitalFormData.webUrl && {
        website: hospitalFormData.webUrl,
      }),

      incomeTaxNo: currentData.incomeTaxNumber,
      salesTaxNo: currentData.saleTaxNumber,
      taxFileImage: currentData.taxFile,
      bankName: currentData.bankName,
      accountHolderName: currentData.accountHolderName,
      accountNumber: currentData.accountNumber,
      ...(fcmToken && { fcmToken }),
    };

    hospitalSignup(params)
      .then((res: any) => {
        if (res?.data?.auth) {
          handleNext();
          dispatch(
            setHospitalFormData({
              name: "",
              logo: "",
              registrationNo: "",
              registrationImage: "",
              registrationExpiry: "",
              ownerFirstName: "",
              ownerLastName: "",
              emergencyNumber: "",
              cnicNumber: "",
              cnicImage: "",
              cnicExpiryDate: "",
              address: "",
              lat: "",
              lng: "",
              city: "",
              openTime: "",
              closeTime: "",
              fbUrl: "",
              instaUrl: "",
              twitterUrl: "",
              webUrl: "",
            })
          );

          dispatch(setDocUser_ID(res?.data?.hospital._id));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const saveRentACar = () => {
    let currentData = formik.values;

    let params = {
      name: rentcarUserFormData.name,
      logo: rentcarUserFormData.logo,
      companyLicenseNo: rentcarUserFormData.licenseNumber,
      licenseExpiry: rentcarUserFormData.licenseExpiry,
      licenseImage: rentcarUserFormData.licenseImage,
      companyEmergencyNo: rentcarUserFormData.emergencyNumber,
      ownerFirstName: rentcarUserFormData.ownerFirstName,
      ownerLastName: rentcarUserFormData.ownerLastName,
      cnicOrPassportNo: rentcarUserFormData.cnicNumber,
      cnicOrPassportExpiry: rentcarUserFormData.cnicExpiry,
      cnicImage: rentcarUserFormData.cnicImage,
      location: {
        lat: rentcarUserFormData.lat,
        lng: rentcarUserFormData.lng,
        address: rentcarUserFormData.address,
        city: rentcarUserFormData.city,
      },

      ...(rentcarUserFormData.webUrl && {
        website: rentcarUserFormData.webUrl,
      }),
      ...(rentcarUserFormData.twitterUrl && {
        twitter: rentcarUserFormData.twitterUrl,
      }),
      ...(rentcarUserFormData.fbUrl && { facebook: rentcarUserFormData.fbUrl }),
      ...(rentcarUserFormData.instaUrl && {
        instagram: rentcarUserFormData.instaUrl,
      }),

      incomeTaxNo: currentData.incomeTaxNumber,
      salesTaxNo: currentData.saleTaxNumber,
      bankName: currentData.bankName,
      accountHolderName: currentData.accountHolderName,
      accountNumber: currentData.accountNumber,
      taxFileImage: currentData.taxFile,
      ...(fcmToken && { fcmToken }),
    };

    rentCarSignup(params)
      .then((res: any) => {
        handleNext();
        if (res.data && res.data.auth) {
          handleNext();
          dispatch(setRentCarUserFormData({}));
          dispatch(setDocUser_ID(res.data.rentCar._id));
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (systemType === "rentacar") {
      saveRentACar();
    } else if (systemType === "hospital") {
      saveHospital();
    } else {
      saveDoctor();
    }
  };

  const handleTaxFileUrl = (url: any) => {
    formik.setFieldValue("taxFile", url);
  };

  return (
    <div
      className={classNames(
        commonStyles.col12,
        commonStyles.mt56,
        commonStyles.colsm12
      )}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className={classNames(commonStyles.mb16, MainMedicalstyle.flx)}>
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            <div className={classNames(commonStyles.mr32)}>
              <CustomInput
                placeholder="Income Tax Number (Optinal)"
                id="incomeTaxNumber"
                name="incomeTaxNumber"
                type="text"
                // onChange={formik.handleChange}
                // value={formik.values.incomeTaxNumber}
              />
              {/* {formik.touched.incomeTaxNumber && */}
              {/* formik.errors.incomeTaxNumber ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors.incomeTaxNumber} */}
              </div>
              {/* ) : null} */}
            </div>
          </div>
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            {" "}
            <div className={commonStyles.mr32}>
              <CustomInput
                placeholder="Sales Tax Registration No.(Optional) "
                id="saleTaxNumber"
                name="saleTaxNumber"
                type="text"
                // onChange={formik.handleChange}
                // value={formik.values.saleTaxNumber}
              />
              {/* {formik.touched.saleTaxNumber && formik.errors.saleTaxNumber ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors.saleTaxNumber} */}
              </div>
              {/* ) : null} */}
            </div>
          </div>
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            {" "}
            <div className={commonStyles.mr32}>
              <ImgPicker
                setData={handleTaxFileUrl}
                placeholder="Attach Tax File(Optional)"
              />
              {/* {formik.touched.taxFile && formik.errors.taxFile ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors.taxFile} */}
              </div>
              {/* // ) : null} */}
            </div>
          </div>
        </div>
        <div className={classNames(commonStyles.mb16, MainMedicalstyle.flx)}>
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            {" "}
            <div className={commonStyles.mr32}>
              <CustomInput
                placeholder="Bank Name (Optional)"
                id="bankName"
                name="bankName"
                type="text"
                // onChange={formik.handleChange}
                // value={formik.values.bankName}
              />
              {/* {formik.touched.bankName && formik.errors.bankName ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors.bankName} */}
              </div>
              {/* ) : null} */}
            </div>
          </div>
          <div
            className={classNames(
              commonStyles.col4,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            {" "}
            <div className={commonStyles.mr32}>
              <CustomInput
                placeholder="Account Holder Name (Optional)"
                id="accountHolderName"
                name="accountHolderName"
                type="text"
                // onChange={formik.handleChange}
                // value={formik.values.accountHolderName}
              />
              {/* {formik.touched.accountHolderName && */}
              {/* formik.errors.accountHolderName ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors.accountHolderName} */}
              </div>
              {/* ) : null} */}
            </div>
          </div>
        </div>
        <div className={classNames(MainMedicalstyle.flx)}>
          <div
            className={classNames(
              commonStyles.col12,
              commonStyles.colsm12,
              commonStyles.mtsm28
            )}
          >
            {" "}
            <div className={commonStyles.mr32}>
              <CustomInput
                placeholder="Bank Account Number (Optional)"
                id="accountNumber"
                name="accountNumber"
                type="text"
                // onChange={formik.handleChange}
                // value={formik.values.accountNumber}
              />
              {/* {formik.touched.accountNumber && formik.errors.accountNumber ? ( */}
              <div className={classNames(commonStyles.error)}>
                {/* *{formik.errors.accountNumber} */}
              </div>
              {/* ) : null} */}
            </div>
          </div>
        </div>
        <div className={MainMedicalstyle.buttonWidth}>
          <PrimaryButton
            disabled={loading}
            children={loading ? "loading..." : "Next"}
            type="submit"
            colorType={"MedicalService"}
          />
        </div>
      </form>
    </div>
  );
};

export default Doctor_BankDetail;

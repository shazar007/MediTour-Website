import { useState } from "react";
import { docSignup } from "shared/services/DoctorService";
import { useDispatch, useSelector } from "react-redux";
import { setDoctorFormData } from "shared/redux";
import { useNavigate } from "react-router-dom";
import { GenericPassword } from "shared/components";
import { GetColorCode } from "shared/utils";
const PasswordVerification = (props: any) => {
  const { loading, setLoading } = props;
  const { signUpEndPoint } = GetColorCode();
  const { doctorFormData, fcmToken, systemType } = useSelector(
    (state: any) => state.root.common
  );
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const saveDoctor = (passwordKey: any) => {
    setLoading(true);
    let currentData = passwordKey;
    let params: any = {
      name: doctorFormData.name,
      country: doctorFormData.countrySelection,
      cnicOrPassportNo: doctorFormData.cnicOrPassportNo,
      cnicImage: doctorFormData.cnicImage,
      cnicOrPassportExpiry: doctorFormData.cnicOrPassportExpiry,
      location: {
        lat: doctorFormData.lat,
        lng: doctorFormData.lng,
        address: doctorFormData.address,
        city: doctorFormData.city,
      },
      // ...............socialOInfo
      instagram: doctorFormData.socialInfo.instaUrl,
      facebook: doctorFormData.socialInfo.fbUrl,
      youtube: doctorFormData?.socialInfo?.youtube,
      linkedIn: doctorFormData?.socialInfo?.linkedIn,
      // ...............bankFields
      ntn: doctorFormData.bankInfo?.ntn,
      bankName: doctorFormData.bankInfo?.bankName,
      accountNumber: doctorFormData.bankInfo?.accountNumber,
      accountTitle: doctorFormData?.bankInfo?.accountTitle,
      taxFileImage: doctorFormData?.bankInfo?.taxFile,
      ...(doctorFormData?.travelCompanyId && {
        travelCompanyId: doctorFormData?.travelCompanyId?._id,
        isAddingCompany: true,
      }),
      ...(doctorFormData?.experience && {
        experience: doctorFormData?.experience,
      }),
      ...(doctorFormData?.features?.length === 0
        ? null
        : {
            features: doctorFormData?.features,
          }),

      ...(fcmToken && { fcmToken }),
      phoneNumber: doctorFormData.phoneNumber,
      email: doctorFormData.email,
      password: currentData.password,
    };
    if (systemType == "paramedic") {
      params = {
        doctorKind: systemType,
        qualifications: doctorFormData.qualifications,
        ...params,
      };
    } else if (systemType == "donation") {
      params = {
        companyLicenseNo: doctorFormData.companyLicenseNo,
        companyLicenseExpiry: doctorFormData?.companyLicenseExpiry,
        licenseImage: doctorFormData?.licenseImage,
        companyEmergencyNo: doctorFormData?.companyEmergencyNo,
        logo: doctorFormData.logo,
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,
        ...params,
      };
    } else if (systemType == "hospital") {
      params = {
        hospitalRegNo: doctorFormData.companyLicenseNo,
        registrationExpiry: doctorFormData?.companyLicenseExpiry,
        registrationImage: doctorFormData?.licenseImage,
        emergencyNo: doctorFormData?.companyEmergencyNo,
        logo: doctorFormData.logo,
        ownerFirstName: doctorFormData.ownerFirstName,
        isNational:
          doctorFormData.countrySelection === "Pakistan" ? true : false,
        ownerLastName: doctorFormData?.ownerLastName,
        openTime: doctorFormData.openTime,
        closeTime: doctorFormData.closeTime,
        ...params,
      };
    } else if (systemType == "laboratory") {
      params = {
        labLicenseNumber: doctorFormData.companyLicenseNo,
        licenseExpiry: doctorFormData?.companyLicenseExpiry,
        labLicenseImage: doctorFormData?.licenseImage,
        emergencyNo: doctorFormData?.companyEmergencyNo,
        logo: doctorFormData.logo,
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,
        description: doctorFormData.labDescription,
        openTime: doctorFormData.openTime,
        closeTime: doctorFormData.closeTime,
        isNational: true,
        ...params,
      };
    } else if (systemType == "pharmaceutical") {
      params = {
        logo: doctorFormData.logo,
        firstName: doctorFormData.ownerFirstName,
        lastName: doctorFormData.ownerLastName,
        emergencyNo: doctorFormData.emergencyNumber,
        ...params,
      };
    } else if (systemType == "pharmacy") {
      params = {
        logo: doctorFormData.logo,
        emergencyNo: doctorFormData.companyEmergencyNo,
        licenseExpiry: doctorFormData?.companyLicenseExpiry,
        pharmacyLicenseImage: doctorFormData?.licenseImage,
        description: doctorFormData.labDescription,
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,
        openTime: doctorFormData.openTime,
        closeTime: doctorFormData.closeTime,
        pharmacyLicenseNumber: doctorFormData.companyLicenseNo,
        ...params,
      };
    } else if (systemType == "hotel") {
      params = {
        companyLicenseNo: doctorFormData.companyLicenseNo,
        logo: doctorFormData.logo,
        isNational:
          doctorFormData.countrySelection === "Pakistan" ? true : false,
        companyLicenseExpiry: doctorFormData?.companyLicenseExpiry,
        licenseImage: doctorFormData?.licenseImage,
        companyEmergencyNo: doctorFormData?.companyEmergencyNo,
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,

        ...params,
      };
    } else if (systemType == "rentacar") {
      params = {
        companyLicenseNo: doctorFormData.companyLicenseNo,
        logo: doctorFormData.logo,
        licenseExpiry: doctorFormData?.companyLicenseExpiry,
        licenseImage: doctorFormData?.licenseImage,
        companyEmergencyNo: doctorFormData?.companyEmergencyNo,
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,
        ...params,
      };
    } else if (systemType == "travelagency") {
      params = {
        companyLicenseNo: doctorFormData.companyLicenseNo,
        logo: doctorFormData.logo,
        licenseExpiry: doctorFormData?.companyLicenseExpiry,
        isNational:
          doctorFormData.countrySelection === "Pakistan" ? true : false,
        comapnyLicenseImage: doctorFormData?.licenseImage,
        emergencyNo: doctorFormData?.companyEmergencyNo,
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,
        ...params,
      };
    } else if (systemType == "insurance") {
      params = {
        companyLicenseNo: doctorFormData.companyLicenseNo,
        logo: doctorFormData.logo,
        licenseExpiry: doctorFormData?.companyLicenseExpiry,
        licenseImage: doctorFormData?.licenseImage,
        emergencyNo: doctorFormData?.companyEmergencyNo,
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,
        ...params,
      };
    } else if (systemType == "ambulance") {
      params = {
        name: doctorFormData.name,
        cnicOrPassportNo: doctorFormData.cnicOrPassportNo,
        cnicOrPassportImage: doctorFormData.cnicImage,
        cnicOrPassportExpiry: doctorFormData.cnicOrPassportExpiry,
        registrationNumber: doctorFormData.companyLicenseNo,
        logo: doctorFormData.logo,
        location: {
          lat: doctorFormData.lat,
          lng: doctorFormData.lng,
          address: doctorFormData.address,
          city: doctorFormData.city,
        },
        registrationExpiry: doctorFormData?.companyLicenseExpiry,
        registrationImage: doctorFormData?.licenseImage,
        emergencyNo: doctorFormData?.companyEmergencyNo,
        // socialinfo
        instagram: doctorFormData.socialInfo.instaUrl,
        facebook: doctorFormData.socialInfo.fbUrl,
        youtube: doctorFormData?.socialInfo?.youtube,
        linkedIn: doctorFormData?.socialInfo?.linkedIn,
        // ...............bankFields
        ntn: doctorFormData.bankInfo?.ntn,
        bankName: doctorFormData.bankInfo?.bankName,
        accountNumber: doctorFormData.bankInfo?.accountNumber,
        accountTitle: doctorFormData?.bankInfo?.accountTitle,
        taxFileImage: doctorFormData?.bankInfo?.taxFile,
        // ......................
        ownerFirstName: doctorFormData.ownerFirstName,
        ownerLastName: doctorFormData?.ownerLastName,
        fcmToken,
        phoneNumber: doctorFormData.phoneNumber,
        email: doctorFormData.email,
        password: currentData.password,
      };
    } else {
      params = {
        ...params,
        doctorType:
          doctorFormData.doctorType == "Consultant"
            ? "consultant"
            : "generalPhysician",
        speciality: doctorFormData.speciality,
        isNational:
          doctorFormData.countrySelection === "Pakistan" ? true : false,
        doctorKind: systemType,
        qualifications: doctorFormData.qualifications,
        clinicExperience: doctorFormData.clinicExperience,
        pmdcNumber: doctorFormData.pmdcNumber,
        pmdcImage: doctorFormData.pmdcImage,
        pmdcExpiry: doctorFormData.pmdcExpiry,
        entityType: "individual",
      };
    }
    docSignup(params, signUpEndPoint)
      .then((res: any) => {
        if (res.data.auth) {
          dispatch(setDoctorFormData(""));
          handleSignupSuccess();
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSignupSuccess = () => {
    setShowSuccessModal(true);
  };
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate(`/${systemType}/login`);
  };
  return (
    <>
      <GenericPassword
        loading={loading}
        handleSignup={saveDoctor}
        showSuccessModal={showSuccessModal}
        handleCloseSuccessModal={handleCloseSuccessModal}
      />
    </>
  );
};

export default PasswordVerification;

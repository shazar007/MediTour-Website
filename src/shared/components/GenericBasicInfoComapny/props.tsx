export const PlaceHolderProps = (type?: any, t?: any) => {
  let placeHolderNew = null;
  switch (type) {
    case "labs":
      placeHolderNew = {
        name: t("labName"),
        logo: t("labLogo"),
        licenseNo: t("labLicenseNumber"),
        licenseExpiry: t("labLicenseExpiry"),
        description: t("labDescription"),
        openTime: t("labOpenTime"),
        closeTime: t("labCloseTime"),
        address: t("laboratoryAddress"),
        licenseImage: t("labLicenseImage"),
      };
      break;
    case "pharmacy":
      placeHolderNew = {
        name: t("pharmacyName"),
        logo: t("pharmacyLogo"),
        licenseNo: t("pharmacyLicenseNo"),
        licenseExpiry: t("pharmacyLicenseExpiry"),
        description: t("pharmacyDescription"),
        openTime: t("pharmacyOpenTime"),
        closeTime: t("pharmacyCloseTime"),
        address: t("pharmacyAddress"),
        licenseImage: t("pharmacyLicenseImage"),
      };

      break;
    case "travel":
      placeHolderNew = {
        name: `${t("companyName")}*`,
        logo: `${t("companyLogo")}*`,
        licenseNo: t("companyLicenseNumber"),
        licenseExpiry: t("licenseExpiry"),
        description: `${t("companyDescription")}*`,
        address: `${t("companyAddress")}*`,
      };
      break;
    case "hotel":
      placeHolderNew = {
        name: t("hotelName"),
        logo: t("hotelImage"),
        licenseNo: t("hotelLicenseNumber"),
        licenseExpiry: t("licenseExpiry"),
        address: t("hotelAddress"),
        licenseImage: t("licenseImage"),
      };
      break;
    default:
      break;
  }

  return {
    placeHolderNew,
  };
};

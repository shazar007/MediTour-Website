import dayjs from "dayjs";

const initialValue = (user: any) => {
  return {
    fullName: user?.name || "",
    fatherName: user?.spouseOrGuardianName || "",
    gender: user?.gender || "",
    dob: user?.dateOfBirth
      ? dayjs(user?.dateOfBirth).format("YYYY-MM-DD")
      : null, // Set a default if dateOfBirth is available
    bloodGroup: user?.bloodGroup || "",
    passport: user?.cnicOrPassNo || "",
    childrenNumber: user?.childCount ? String(user?.childCount) : "",
    phoneNumber: user?.phone || "",
    email: user?.email || "",
    qualification: user?.qualification || "",
    address: user?.address?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    countryCode: "+92",
    facebook: user?.facebook || "",
    instagram: user?.instagram || "",
    linkedin: user?.linkedin || "",
    youtube: user?.youtube || "",
    bankName: user?.bankName || "",
    accountNumber: user?.accountNumber || "",
    accountTitle: user?.accountHolderName || "",
    ntn: user?.ntnNo || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    lat: "",
    long: "",
  };
};

const finalValue = (values?: any, url?: any) => {
  const formattedDob = values?.dob
    ? dayjs(values?.dob).format("MM-DD-YYYY")
    : "";

  return {
    name: values?.fullName || "",
    email: values?.email || "",
    gender: values?.gender || "",
    spouseOrGuardianName: values?.fatherName || "",
    childCount: String(values?.childrenNumber) || "",
    cnicOrPassNo: values?.passport || "",
    bloodGroup: values?.bloodGroup || "",
    city: values?.city || "",
    country: values?.country || "",
    qualification: values?.qualification || "",
    bankName: values?.bankName || "",
    accountHolderName: values?.accountTitle || "",
    accountNumber: values?.accountNumber || "",
    ntnNo: values?.ntn || "",
    facebook: values?.facebook || "",
    instagram: values?.instagram || "",
    linkedin: values?.linkedin || "",
    youtube: values?.youtube || "",
    phone: values?.phoneNumber || "",
    dateOfBirth: formattedDob, // Use the safely formatted dob
    userImage: url || "",
    ...(values?.currentPassword && {
      currentPassword: values?.currentPassword || "",
    }),
    ...(values?.newPassword && {
      password: values?.newPassword || "",
    }),
    ...(values?.lat && {
      address: {
        lat: values?.lat || "",
        lng: values?.long || "",
        address: values?.address || "",
        city: values?.city || "",
      },
    }),
  };
};

export { initialValue, finalValue };

import commonstyles from "shared/utils/common.module.css";
import { VendorPaymentDetails } from "shared/components";
import { useTranslation } from "react-i18next";

const Laboratory_Payments_Details = () => {
  const { i18n }: any = useTranslation();
  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyles.pl36
          : commonstyles.pr36
      }
    >
      <VendorPaymentDetails />
    </div>
  );
};

export default Laboratory_Payments_Details;

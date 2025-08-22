import commonstyles from "shared/utils/common.module.css";
import { Vendor_Payments } from "shared/components";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Hospital_Payments = () => {
  const { i18n }: any = useTranslation();
  const { user } = useSelector((state: any) => state.root.common);

  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyles.pl36
          : commonstyles.pr36
      }
    >
      <Vendor_Payments type={"Hospital"} id={user?._id} />
    </div>
  );
};

export default Hospital_Payments;

import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Style from "./ambulancePayment.module.css";
import { VendorPaymentDetails } from "shared/components";
const Ambulance_Payments_Details = () => {
  return (
    <div className={classNames(commonstyles.col12, Style.outer)}>
      <VendorPaymentDetails />
    </div>
  );
};

export default Ambulance_Payments_Details;

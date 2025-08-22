import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Style from "./DonationPayment.module.css";
import { VendorPaymentDetails } from "shared/components";

const PaymentDescrition = () => {
  return (
    <div className={classNames(commonstyles.col12, Style.outer)}>
      <VendorPaymentDetails />
    </div>
  );
};

export default PaymentDescrition;

import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Style from "./InsurancePayment.module.css";
import { VendorPaymentDetails } from "shared/components";
export default function PaymentDescritionInsurance() {
  return (
    <div className={classNames(commonstyles.col12, Style.outer)}>
      <VendorPaymentDetails />
    </div>
  );
}

import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import styles from "./docterPayment.module.css";
import { VendorPaymentDetails } from "shared/components";
const DoctorPaymentDetails = () => {
  return (
    <div className={classNames(commonstyles.col12, styles.outer)}>
      <VendorPaymentDetails />
    </div>
  );
};

export default DoctorPaymentDetails;

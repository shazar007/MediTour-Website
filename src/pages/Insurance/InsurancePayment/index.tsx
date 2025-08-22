import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./InsurancePayment.module.css";
import { useSelector } from "react-redux";
import { Vendor_Payments } from "shared/components";
function InsurancePayment() {
  const { user } = useSelector((state: any) => state.root.common);
  return (
    <div className={classNames(commonstyles.col12, style.outer)}>
      <Vendor_Payments type={"Insurance"} id={user?._id} />
    </div>
  );
}

export default InsurancePayment;

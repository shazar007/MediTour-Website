import { Vendor_Payments } from "shared/components";

import { useSelector } from "react-redux";
const ComapnyPayment = () => {
  const { user } = useSelector((state: any) => state.root.common);
  return (
    <div>
      <Vendor_Payments type={"Hospital"} id={user?._id} />
    </div>
  );
};

export default ComapnyPayment;

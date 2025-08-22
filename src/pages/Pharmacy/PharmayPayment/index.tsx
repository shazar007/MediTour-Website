import { useSelector } from "react-redux";
import { Vendor_Payments } from "shared/components";
const PharmcyPayment = () => {
  const { user } = useSelector((state: any) => state.root.common);
  return (
    <div>
      <Vendor_Payments type={"Pharmacy"} id={user?._id} />
    </div>
  );
};

export default PharmcyPayment;

import { Vendor_Payments } from "shared/components";
import { useSelector } from "react-redux";

const Payments = () => {
  const { user } = useSelector((state: any) => state.root.common);
  return (
    <div>
      <Vendor_Payments type={"Laboratory"} id={user?._id} />
    </div>
  );
};
export default Payments;

import { Vendor_Payments } from "shared/components";
import { useSelector } from "react-redux";

const AmbulancePayment = () => {
  const { user } = useSelector((state: any) => state.root.common);
  return (
    <div>
      <Vendor_Payments type={"Ambulance Company"} id={user?._id} />
    </div>
  );
};
export default AmbulancePayment;

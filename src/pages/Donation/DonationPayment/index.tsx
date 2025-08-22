import { Vendor_Payments } from "shared/components";
import { useSelector } from "react-redux";

const DonationPayment = () => {
  const { user } = useSelector((state: any) => state.root.common);
  return (
    <div>
      <Vendor_Payments type={"Donation Company"} id={user?._id} />
    </div>
  );
};

export default DonationPayment;

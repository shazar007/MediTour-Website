import { Vendor_Payments } from "shared/components";
import { useSelector } from "react-redux";
function DoctorPayments() {
  const { user, systemType } = useSelector((state: any) => state.root.common);

  let vendor_type =
    systemType === "doctor"
      ? "Doctor"
      : systemType === "physiotherapist"
      ? "Physiotherapist"
      : systemType === "nutritionist"
      ? "Nutrition"
      : systemType === "psychologist"
      ? "Psychologist"
      : "";

  return (
    <div>
      <Vendor_Payments type={vendor_type} id={user?._id} />
    </div>
  );
}

export default DoctorPayments;

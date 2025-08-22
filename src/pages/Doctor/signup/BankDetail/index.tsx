import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDoctorFormData } from "shared/redux";
import { GenericBankDetails } from "shared/components";
interface Props {
  setCurrentStep?: any;
}
const BankDetail = (props: Props) => {
  const dispatch = useDispatch();
  const { doctorFormData } = useSelector((state: any) => state.root.common);
  const { setCurrentStep } = props;
  const handleSubmit = (bankInfo: any) => {
    const bankDetail = {
      ...doctorFormData,
      bankInfo,
    };
    dispatch(setDoctorFormData(bankDetail));
    setCurrentStep(3);
  };

  return (
    <div>
      <GenericBankDetails handleSubmit={handleSubmit} />
    </div>
  );
};

export default BankDetail;

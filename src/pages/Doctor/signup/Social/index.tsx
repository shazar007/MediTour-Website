import { useDispatch, useSelector } from "react-redux";
import { setDoctorFormData } from "shared/redux";
import { GenericSocialInfo } from "shared/components";
interface Props {
  setCurrentStep?: any;
}

const Social = (props: Props) => {
  const dispatch = useDispatch();
  const { setCurrentStep } = props;
  const { doctorFormData } = useSelector((state: any) => state.root.common);

  const handleSubmit = (socialInfo: any) => {
    const Social = {
      ...doctorFormData,
      socialInfo,
    };
    dispatch(setDoctorFormData(Social));
    setCurrentStep(2);
  };
  return (
    <div>
      <GenericSocialInfo handleSubmit={handleSubmit} />
    </div>
  );
};

export default Social;

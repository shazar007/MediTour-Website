import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import styles from "./PhoneNumberInputNew.module.css";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

interface Props {
  value: string;
  setValue: any;
  placeHolder?: any;
  onCountryCodeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  width?: string;
   dir?: string;
}

const PhoneNumberInputNew = (props: Partial<Props>) => {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const dir = props.dir || (isRtl ? "rtl" : "ltr");
  const {
    value,
    setValue,
    onCountryCodeChange,
    placeHolder,
    width = "94%",
  } = props;

  return (
    <div className={styles.container} style={{ width: width }}>
  <PhoneInput
  placeholder={placeHolder ? placeHolder : t("enterPhoneNumber")}
  value={value}
  onChange={(text) => setValue(text)}
  numberInputProps={{
    className: styles.phone_input,
    // style: {
    //   textAlign: isRtl ? "right" : "left", 
    // },
  }}
/>

    </div>
  );
};

export default PhoneNumberInputNew;

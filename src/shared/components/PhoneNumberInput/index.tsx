import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import mstyle from "./style.module.css";

interface Props {
  value: string;
  setValue: any;
}

const PhoneNumberInput = (props: Partial<Props>) => {
  const { value, setValue } = props;

  return (
    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={(text) => setValue(text)}
      numberInputProps={{
        className: mstyle.container,
      }}
    />
  );
};

export default PhoneNumberInput;

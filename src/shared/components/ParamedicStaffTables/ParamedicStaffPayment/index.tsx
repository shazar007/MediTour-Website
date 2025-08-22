import * as React from "react";
import tablepay from "./ParamedicStaffPayment.module.css";
import commonstyle from "../../../utils/common.module.css";
import classNames from "classnames";
import { PiDownloadSimpleBold } from "react-icons/pi";
import ImgPicker from "shared/components/Img-picker";
import Downloader from "shared/components/Downloader";
import { Navigate, useNavigate } from "react-router-dom";
import SearchBar from "shared/components/Searchbar";
import commonstyles from "shared/utils/common.module.css";
import Vendor_Payments from "shared/components/Vendor_Payments";
import { useSelector } from "react-redux";


function ParamedicStaffPayment() {

  const { user, } = useSelector((state: any) => state.root.common);
  return (
    <Vendor_Payments type={"Doctor"} id={user?._id} />

  );
}

export default ParamedicStaffPayment;

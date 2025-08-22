import { useEffect, useState } from "react";
import classNames from "classnames";
import style from "./style.module.css";
import logo from "assets/images/screenlogo.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUser } from "shared/redux";
import { activationAccount } from "shared/services/AuthService";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "shared/components";
import toast from "react-hot-toast";
import gridlayout from "assets/images/congrats.jpg";

const CongratsScreen = () => {
  const { user, paymentParams, systemType } = useSelector(
    (state: any) => state?.root?.common
  );
  const navigate = useNavigate();

  const dispatch = useDispatch();
  console.log(paymentParams, ".....paymentParams");
  useEffect(() => {
    let vendorType =
      systemType === "paramedic" ||
      systemType === "nutritionist" ||
      systemType === "psychologist" ||
      systemType === "physiotherapist"
        ? "doctor"
        : systemType === "greentourism"
        ? "travel company"
        : systemType;
    if (vendorType && paymentParams?.gatewayName === "blinq") {
      activateVendor();
      return;
    }
    if (paymentParams?.gatewayName === "stripe") {
      return;
    }
  }, [paymentParams]);

  const activateVendor = () => {
    let params = {
      vendorType:
        systemType === "paramedic" ||
        systemType === "nutritionist" ||
        systemType === "psychologist" ||
        systemType === "physiotherapist"
          ? "doctor"
          : systemType === "greentourism"
          ? "travel company"
          : systemType,
      vendorId: user?._id,
      paymentId: paymentParams?.paymentId,
      gatewayName: paymentParams?.gatewayName,
    };

    activationAccount(params)
      .then((res: any) => {})
      .catch((err: any) => {
        toast.error(err?.response?.data.message);
      })
      .finally(() => {});
  };

  const removeStorage = () => {
    dispatch(setUser(null));
    dispatch(setIsLoggedIn(false));
    navigate("/");
  };

  return (
    <div className={classNames(style.parent)}>
      <div className={classNames(style.logocontainer)}>
        <img src={logo} alt="Logo" />
      </div>

      <div className={classNames(style.card)}>
        <div className={classNames(style.cardimgconatiner)}>
          <img src={gridlayout} alt="gridlayout" className={style.cardimg} />
        </div>
        <div className={style.textcontainer}>
          <div className={style.heading}>Congratulations!</div>
          <div className={style.title}>
            Your account activation request has been sent. You will receive an
            email in 24 Hours.
          </div>

          <div className={style.buttoncontainer}>
            <PrimaryButton
              children={"Back to Home"}
              colorType={"admin"}
              onClick={removeStorage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratsScreen;

import classNames from "classnames";
import style from "./ActivationCardStyle.module.css";
import commonStyles from "shared/utils/common.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box } from "@mui/material";
import { rates } from "shared/services";
import { useEffect, useState } from "react";
const ActivationCard = () => {
  const navigate = useNavigate();
  const { systemType, user, exchangeRate } = useSelector(
    (state: any) => state.root.common
  );
  const [rateNational, setRateNational] = useState<any>([]);
  const [rateInternational, setInternational] = useState<any>([]);
  useEffect(() => {
    fetchRate();
  }, []);
  const fetchRate = () => {
    rates()
      .then((res: any) => {
        console.log(res, ".....resfetchrate");
        setRateNational(res?.data?.countryWiseCharges?.[0]?.nationalRates);
        setInternational(
          res?.data?.countryWiseCharges?.[0]?.internationalRates
        );
      })
      .catch(() => {})
      .finally(() => {});
  };
  const activation: any = user?.activationRequest;
  const activateAmount = {
    doctors: user?.isNational
      ? rateNational?.find((item: any) => item.vendorType === "Doctor")?.rate ||
        0
      : rateInternational?.find((item: any) => item.vendorType === "Doctor")
          ?.rate || 0,
    Hospital: user?.isNational
      ? rateNational?.find((item: any) => item.vendorType === "Hospital")
          ?.rate || 0
      : rateInternational?.find((item: any) => item.vendorType === "Hospital")
          ?.rate || 0,
    Hotel: user?.isNational
      ? rateNational?.find((item: any) => item.vendorType === "Hotel")?.rate ||
        0
      : rateInternational?.find((item: any) => item.vendorType === "Other")
          ?.rate || 0,
    TravelAgency: user?.isNational
      ? rateNational?.find((item: any) => item.vendorType === "Travel Agency")
          ?.rate || 0
      : rateInternational?.find((item: any) => item.vendorType === "Other")
          ?.rate || 0,
    Laboratory: user?.isNational
      ? rateNational?.find((item: any) => item.vendorType === "Laboratory")
          ?.rate || 0
      : rateInternational?.find((item: any) => item.vendorType === "Other")
          ?.rate || 0,
    TravelCompany: user?.isNational
      ? rateNational?.find((item: any) => item.vendorType === "Travel Company")
          ?.rate || 0
      : rateInternational?.find((item: any) => item.vendorType === "Other")
          ?.rate || 0,
    other: user?.isNational
      ? rateNational?.find((item: any) => item.vendorType === "Other")?.rate ||
        0
      : rateInternational?.find((item: any) => item.vendorType === "Other")
          ?.rate || 0,
  };
  const renderAmount =
    systemType === "doctor" ||
    systemType === "physiotherapist" ||
    systemType === "nutritionist" ||
    systemType === "psychologist"
      ? activateAmount?.doctors
      : systemType === "hospital"
      ? activateAmount?.Hospital
      : systemType === "hotel"
      ? activateAmount?.Hotel
      : systemType === "travelagency"
      ? activateAmount?.TravelAgency
      : systemType === "laboratory"
      ? activateAmount?.Laboratory
      : systemType === "greentourism"
      ? activateAmount?.TravelCompany
      : activateAmount?.other;

  const USDtoPKR = renderAmount / exchangeRate;
  const PKRtoUSD = USDtoPKR * exchangeRate;

  const handleActivation = () => {
    navigate(`/${systemType}/paymentDetail`, {
      state: {
        actualAmount: USDtoPKR,
        paidType: user?.isNational ? false : true,
      },
    });
  };
  return (
    <div
      className={classNames(style?.activation_container, {
        [style.activated]: activation !== "pending",
      })}
    >
      {activation === "pending" ? (
        <>
          <div className={classNames(style?.activation_content)}>
            <h3>Activate Your Account!</h3>
            <p>
              Your services are currently not visible to users. Please activate
              your account first.
            </p>
            <div className={classNames(commonStyles?.flx, style.gap)}>
              <small>Account activation fee is </small>
              <small className={classNames(style.text)}>${PKRtoUSD?.toFixed(2)}</small>
            </div>
          </div>
          <button
            className={classNames(style?.pay_button)}
            onClick={handleActivation}
          >
            Pay Now
          </button>
        </>
      ) : (
        <Card
          sx={{
            width: "100%",
            height: "100%",
            boxShadow: 0,
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center">
              <CheckCircleIcon
                color="success"
                fontSize="large"
                sx={{ mr: 1 }}
              />
              <Typography variant="h6" color="text.primary">
                Thank you for your payment! Your account will be activated
                within 24 hours.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ActivationCard;

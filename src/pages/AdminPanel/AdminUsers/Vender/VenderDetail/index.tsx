import React, { useState } from "react";
import AdminNavBar from "../../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./vendorDetail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Checkbox, Typography } from "@mui/material";
import { CustomModal, RingLoader } from "shared/components";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { Style } from "@mui/icons-material";
import { UserBlock } from "shared/services";
interface FAQData {
  header: string;
}
export default function VendorDetail() {
  const accordionData: FAQData[] = [
    {
      header: "Basic Info",
    },
    {
      header: "Social",
    },
    {
      header: "Bank Details",
    },
    {
      header: "Verification",
    },
  ];
  const [expanded, setExpanded] = useState<number | null>(null);
  const handleAccordionChange =
    (panelIndex: number) =>
    (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelIndex : null);
    };
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [venderData, setVenderData] = useState(state?.data);
  const navigate = useNavigate();

  const handleBlock = () => {
    setLoading(true);
    let params = {
      vendorType: state?.type,
      vendorId: venderData?._id,
      blocked: !venderData?.blocked,
    };

    UserBlock(params)
      .then((res: any) => {
        setVenderData(res?.data?.vendor);
        // setTimeout(() => {
        //   navigate(-2);
        // }, 5000);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  let License =
    state.type == "Laboratory"
      ? state?.data?.labLicenseNumber
      : state.type == "Pharmacy"
      ? state.data?.pharmacyLicenseNumber
      : state.type == "Doctors"
      ? state.data?.pmdcNumber
      : state.type == "Hospital"
      ? state.data?.hospitalRegNo
      : state.type == "Travel Agency"
      ? state.data?.companyLicenseNo
      : state.type == "Rent A Car"
      ? state.data?.companyLicenseNo
      : state.type == "Hotels"
      ? state.data?.companyLicenseNo
      : state.type == "Donations"
      ? state.data?.companyLicenseNo
      : state.type == "Insurance"
      ? state.data?.companyLicenseNo
      : state.type == "Ambulance"
      ? state.data?.registrationNumber
      : "";

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Users" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div
          className={classNames(Styles.flxBetween)}
          style={{ marginBottom: "16px" }}
        >
          <div className={commonStyles.flx}>
            <Avatar src={state?.data?.logo} style={{ marginRight: "24px" }} />
            <p
              className={classNames(
                commonStyles.fs22,
                Styles.primarycolor,
                commonStyles.semiBold
              )}
            >
              {state?.data?.name}
            </p>
          </div>
          <button
            className={venderData?.blocked ? Styles.unblock : Styles.block}
            onClick={handleBlock}
            disabled={loading}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RingLoader color={"#fff"} size={30} />
              </div>
            ) : (
              // </div>
              <>{venderData?.blocked ? "Unblock" : "Block"}</>
            )}
          </button>
        </div>
        {accordionData.map((data, index) => (
          <div key={index} className={classNames(Styles.mt8)}>
            <Accordion
              className={Styles.dropdown}
              expanded={expanded === index}
              onChange={handleAccordionChange(index)}
            >
              <AccordionSummary
                style={{ padding: "0px 16px" }}
                expandIcon={<ExpandMoreIcon style={{ color: "#00276D" }} />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}
              >
                <Typography style={{ fontWeight: "500" }}>
                  <div>
                    <p
                      className={classNames(commonStyles.fs18)}
                      style={{
                        textAlign: "start",
                      }}
                    >
                      {data.header}
                    </p>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  padding: "0px 16px 24px 16px",
                  textAlign: "start",
                  textJustify: "none",
                }}
              >
                <Typography>
                  {index == 0 && (
                    <div className={commonStyles.flxBetween}>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.fs14
                        )}
                      >
                        {state?.type !== "Pharmaceutical" &&
                          state?.type !== "Paramedic" && (
                            <div
                              className={classNames(
                                commonStyles.col12,
                                Styles.primarycolor,
                                commonStyles.medium,
                                commonStyles.flxBetween,
                                Styles.mt16
                              )}
                            >
                              <p>License Number:</p>
                              <p className={Styles.graycolor}>
                                {" "}
                                {state?.data?.labLicenseNumber
                                  ? state?.data?.labLicenseNumber
                                  : state.data?.companyLicenseNo
                                  ? state.data?.companyLicenseNo
                                  : state.data?.hospitalRegNo
                                  ? state.data?.hospitalRegNo
                                  : state.data?.pmdcNumber
                                  ? state.data?.pmdcNumber
                                  : state.data?.pharmacyLicenseNumber
                                  ? state.data?.pharmacyLicenseNumber
                                  : state.data?.registrationNumber
                                  ? state.data?.registrationNumber
                                  : "----------"}
                              </p>
                            </div>
                          )}{" "}
                        {state?.type !== "Pharmaceutical" &&
                          state?.type !== "Paramedic" && (
                            <div
                              className={classNames(
                                commonStyles.col12,
                                Styles.primarycolor,
                                commonStyles.medium,
                                commonStyles.flxBetween,
                                Styles.mt16
                              )}
                            >
                              <p>License Expiry Date:</p>
                              <p className={Styles.graycolor}>
                                {" "}
                                {state.data?.companyLicenseExpiry
                                  ? state.data?.companyLicenseExpiry
                                  : state.data?.registrationExpiry
                                  ? state.data?.registrationExpiry
                                  : state.data?.pmdcExpiry
                                  ? state.data?.pmdcExpiry
                                  : state.data?.licenseExpiry
                                  ? state.data?.licenseExpiry
                                  : "----------"}
                              </p>
                            </div>
                          )}{" "}
                        {state?.type !== "Paramedic" && (
                          <div
                            className={classNames(
                              commonStyles.col12,
                              Styles.primarycolor,
                              commonStyles.medium,
                              commonStyles.flxBetween,
                              Styles.mt16
                            )}
                          >
                            <p>License Image:</p>
                            <p className={Styles.graycolor}>licenseimage.png</p>
                          </div>
                        )}{" "}
                        {state?.type !== "Doctors" && (
                          <div
                            className={classNames(
                              commonStyles.col12,
                              Styles.primarycolor,
                              commonStyles.medium,
                              commonStyles.flxBetween,
                              Styles.mt16
                            )}
                          >
                            <p>Owner First Name:</p>
                            <p className={Styles.graycolor}>
                              {" "}
                              {state?.data?.ownerLastName
                                ? state?.data?.ownerLastName
                                : state?.data?.firstName
                                ? state?.data?.firstName
                                : state?.data?.name
                                ? state?.data?.name
                                : "-----"}
                            </p>
                          </div>
                        )}
                        {state?.type !== "Doctors" &&
                          state?.type !== "Paramedic" && (
                            <div
                              className={classNames(
                                commonStyles.col12,
                                Styles.primarycolor,
                                commonStyles.medium,
                                commonStyles.flxBetween,
                                Styles.mt16
                              )}
                            >
                              <p>Owner Last Name:</p>
                              <p className={Styles.graycolor}>
                                {state?.data?.ownerLastName
                                  ? state?.data?.ownerLastName
                                  : state?.data?.lastName
                                  ? state?.data?.lastName
                                  : "-----"}
                              </p>
                            </div>
                          )}
                        {state?.type !== "Hotels" &&
                          state?.type !== "Doctors" &&
                          state?.type !== "Donations" &&
                          state?.type !== "Rent A Car" && (
                            <div
                              className={classNames(
                                commonStyles.col12,
                                Styles.primarycolor,
                                commonStyles.medium,
                                commonStyles.flxBetween,
                                Styles.mt16
                              )}
                            >
                              <p>Emergency Number:</p>
                              <p className={Styles.graycolor}>
                                {state.data?.emergencyNo
                                  ? state.data?.emergencyNo
                                  : state.data?.registrationExpiry
                                  ? state.data?.registrationExpiry
                                  : state.data?.pmdcExpiry
                                  ? state.data?.pmdcExpiry
                                  : state.data?.licenseExpiry
                                  ? state.data?.licenseExpiry
                                  : state.data?.phoneNumber
                                  ? state.data?.phoneNumber
                                  : "----------"}
                              </p>
                            </div>
                          )}
                        {state?.type !== "Pharmaceutical" && (
                          <div
                            className={classNames(
                              commonStyles.col12,
                              Styles.primarycolor,
                              commonStyles.medium,
                              commonStyles.flxBetween,
                              Styles.mt16
                            )}
                          >
                            <p>CNIC/Passport Number:</p>
                            <p className={Styles.graycolor}>
                              {state?.data?.cnicOrPassportNo
                                ? state?.data?.cnicOrPassportNo
                                : "-----"}
                            </p>
                          </div>
                        )}{" "}
                      </div>
                      <div className={Styles.border}></div>

                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.fs14
                        )}
                      >
                        {state?.type !== "Pharmaceutical" && (
                          <div
                            className={classNames(
                              commonStyles.col12,
                              Styles.primarycolor,
                              commonStyles.medium,
                              commonStyles.flxBetween,
                              Styles.mt16
                            )}
                          >
                            <p>CNIC/Passport Expiry:</p>
                            <p className={Styles.graycolor}>
                              {state?.data?.cnicOrPassportExpiry
                                ? state?.data?.cnicOrPassportExpiry
                                : "-----"}
                            </p>
                          </div>
                        )}{" "}
                        {state?.type !== "Pharmaceutical" && (
                          <div
                            className={classNames(
                              commonStyles.col12,
                              Styles.primarycolor,
                              commonStyles.medium,
                              commonStyles.flxBetween,
                              Styles.mt16
                            )}
                          >
                            <p>CNIC/Passport Image:</p>
                            <p className={Styles.graycolor}>passport.png</p>
                          </div>
                        )}{" "}
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Address:</p>
                          <p className={Styles.graycolor}>
                            {state?.data?.location?.address
                              ? state?.data?.location?.address
                              : 0}
                          </p>
                        </div>{" "}
                        {state?.type !== "Hotels" &&
                          state?.type !== "Travel Agency" &&
                          state?.type !== "Pharmaceutical" &&
                          state?.type !== "Ambulance" &&
                          state?.type !== "Paramedic" &&
                          state?.type !== "Paramedic" &&
                          state?.type !== "Insurance" &&
                          state?.type !== "Doctors" && (
                            <div
                              className={classNames(
                                commonStyles.col12,
                                Styles.primarycolor,
                                commonStyles.medium,
                                commonStyles.flxBetween,
                                Styles.mt16
                              )}
                            >
                              <p>Description</p>
                              <p className={Styles.graycolor}>
                                {state?.data?.description
                                  ? state?.data?.description
                                  : "-----"}
                              </p>
                            </div>
                          )}
                        {state?.type !== "Hotels" &&
                          state?.type !== "Doctors" &&
                          state?.type !== "Paramedic" &&
                          state?.type !== "Donations" &&
                          state?.type !== "Pharmaceutical" &&
                          state?.type !== "Ambulance" &&
                          state?.type !== "Travel Agency" &&
                          state?.type !== "Insurance" &&
                          state?.type !== "Rent A Car" && (
                            <div
                              className={classNames(
                                commonStyles.col12,
                                Styles.primarycolor,
                                commonStyles.medium,
                                commonStyles.flxBetween,
                                Styles.mt16
                              )}
                            >
                              <p>Open Time:</p>
                              <p className={Styles.graycolor}>
                                {" "}
                                {state?.data?.openTime
                                  ? state?.data?.openTime
                                  : "-----"}
                              </p>
                            </div>
                          )}
                        {state?.type !== "Hotels" &&
                          state?.type !== "Doctors" &&
                          state?.type !== "Donations" &&
                          state?.type !== "Paramedic" &&
                          state?.type !== "Pharmaceutical" &&
                          state?.type !== "Ambulance" &&
                          state?.type !== "Travel Agency" &&
                          state?.type !== "Insurance" &&
                          state?.type !== "Rent A Car" && (
                            <div
                              className={classNames(
                                commonStyles.col12,
                                Styles.primarycolor,
                                commonStyles.medium,
                                commonStyles.flxBetween,
                                Styles.mt16
                              )}
                            >
                              <p>Close Time:</p>
                              <p className={Styles.graycolor}>
                                {" "}
                                {state?.data?.closeTime
                                  ? state?.data?.closeTime
                                  : "-----"}
                              </p>
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                  {index == 1 && (
                    <div className={commonStyles.flxBetween}>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Website Link:</p>
                          <p className={Styles.graycolor}>
                            {state?.data?.website
                              ? state?.data?.website
                              : "------"}
                          </p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Twitter Link:</p>
                          <p className={Styles.graycolor}>
                            {state?.data?.website
                              ? state?.data?.twitter
                              : "------"}
                          </p>
                        </div>{" "}
                      </div>
                      <div className={Styles.border2}></div>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Instagram Link:</p>
                          <p className={Styles.graycolor}>
                            {state?.data?.instagram
                              ? state?.data?.instagram
                              : "------"}
                          </p>
                        </div>
                        {state?.type !== "Hotels" &&
                          state?.type !== "Donations" && (
                            <div
                              className={classNames(
                                commonStyles.col12,
                                Styles.primarycolor,
                                commonStyles.medium,
                                commonStyles.flxBetween,
                                Styles.mt16
                              )}
                            >
                              <p>Facebook Link:</p>
                              <p className={Styles.graycolor}>
                                {state?.data?.facebook
                                  ? state?.data?.facebook
                                  : "------"}
                              </p>
                            </div>
                          )}
                        {state?.type !== "Pharmacy" &&
                          state?.type !== "Laboratory" &&
                          state?.type !== "Hospital" &&
                          state?.type !== "Doctors" &&
                          state?.type !== "Travel Agency" &&
                          state?.type !== "Rent A Car" &&
                          state?.type !== "Insurance" && (
                            <div
                              className={classNames(
                                commonStyles.col12,
                                Styles.primarycolor,
                                commonStyles.medium,
                                commonStyles.flxBetween,
                                Styles.mt16
                              )}
                            >
                              <p>Youtube Link:</p>
                              <p className={Styles.graycolor}>
                                {state?.data?.youtube
                                  ? state?.data?.youtube
                                  : "------"}
                              </p>
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                  {index == 2 && (
                    <div className={commonStyles.flxBetween}>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Income Tax Number:</p>
                          <p className={Styles.graycolor}>
                            {" "}
                            {state?.data?.incomeTaxNo
                              ? state?.data?.incomeTaxNo
                              : "------"}
                          </p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Sales Tax Registration Number:</p>
                          <p className={Styles.graycolor}>
                            {" "}
                            {state?.data?.salesTaxNo
                              ? state?.data?.salesTaxNo
                              : "------"}
                          </p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Tax File:</p>
                          <p className={Styles.graycolor}>file.word</p>
                        </div>{" "}
                      </div>
                      <div className={Styles.border2}></div>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Bank Name:</p>
                          <p className={Styles.graycolor}>
                            {" "}
                            {state?.data?.bankName
                              ? state?.data?.bankName
                              : "------"}
                          </p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Account Holder Name:</p>
                          <p className={Styles.graycolor}>
                            {" "}
                            {state?.data?.accountHolderName
                              ? state?.data?.accountHolderName
                              : "------"}
                          </p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Account Number:</p>
                          <p className={Styles.graycolor}>
                            {" "}
                            {state?.data?.accountNumber
                              ? state?.data?.accountNumber
                              : "------"}
                          </p>
                        </div>{" "}
                      </div>
                    </div>
                  )}
                  {index == 3 && (
                    <div className={commonStyles.flxBetween}>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Phone Number:</p>
                          <p className={Styles.graycolor}>
                            {state?.data?.phoneNumber
                              ? state?.data?.phoneNumber
                              : "------"}
                          </p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Email Address:</p>
                          <p className={Styles.graycolor}>
                            {state?.data?.email ? state?.data?.email : "------"}
                          </p>
                        </div>{" "}
                      </div>
                      <div className={Styles.border3}></div>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Password:</p>
                          <p className={Styles.graycolor}>mnuipokjhuh</p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col12,
                            Styles.primarycolor,
                            commonStyles.medium,
                            commonStyles.flxBetween,
                            Styles.mt16
                          )}
                        >
                          <p>Re-Password:</p>
                          <p className={Styles.graycolor}>mnuipokjhuh</p>
                        </div>{" "}
                      </div>
                    </div>
                  )}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

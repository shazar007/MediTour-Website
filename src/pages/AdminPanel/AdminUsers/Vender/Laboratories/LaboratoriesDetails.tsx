import React, { useState } from "react";
import AdminNavBar from "../../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./laboratories.module.css";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { BiFilterAlt } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Checkbox, Typography } from "@mui/material";
import { stat } from "fs";
interface FAQData {
  header: string;
}
export default function LaboratoriesDetails() {
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

  let address =
    state.type == "Laboratory"
      ? state.data.location.address
      : state.type == "Pharmacy"
      ? ""
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
            <Avatar src={state?.logo} style={{ marginRight: "24px" }} />
            <p
              className={classNames(
                commonStyles.fs22,
                Styles.primarycolor,
                commonStyles.semiBold
              )}
            >
              {state?.data?.name} Lab
            </p>
          </div>
          <button className={Styles.block}>Block</button>
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
                  padding: "0px 16px 16px 16px",
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
                          commonStyles.flxBetween,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.primarycolor,
                            commonStyles.medium
                          )}
                        >
                          <p className={Styles.mt16}>Lab License Number:</p>
                          <p className={Styles.mt16}>License Expiry Date:</p>
                          <p className={Styles.mt16}>License Image:</p>
                          <p className={Styles.mt16}>Owner First Name:</p>
                          <p className={Styles.mt16}>Owner Last Name:</p>
                          <p className={Styles.mt16}>Emergency Number:</p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.graycolor
                          )}
                        >
                          <p className={Styles.mt16}>
                            {state?.labLicenseNumber
                              ? state?.labLicenseNumber
                              : "-----"}
                          </p>
                          <p className={Styles.mt16}>
                            {" "}
                            {state?.licenseExpiry
                              ? state?.licenseExpiry
                              : "-----"}
                          </p>
                          <p className={Styles.mt16}>licenseimage.png</p>
                          <p className={Styles.mt16}>
                            {state?.ownerFirstName
                              ? state?.ownerFirstName
                              : "-----"}
                          </p>
                          <p className={Styles.mt16}>
                            {state?.ownerLastName
                              ? state?.ownerLastName
                              : "-----"}
                          </p>
                          <p className={Styles.mt16}>
                            {state?.phoneNumber
                              ? state?.phoneNumber
                              : "-------"}{" "}
                          </p>
                        </div>
                      </div>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.flxBetween,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.primarycolor,
                            commonStyles.medium
                          )}
                        >
                          <p className={Styles.mt16}>CNIC/Passport Number:</p>
                          <p className={Styles.mt16}>CNIC/Passport Expiry:</p>
                          <p className={Styles.mt16}>CNIC/Passport Image:</p>
                          <p className={Styles.mt16}>Lab Address:</p>
                          <p className={Styles.mt16}>Lab Description:</p>
                          <p className={Styles.mt16}>Lab Open Time:</p>
                          <p className={Styles.mt16}>Lab Close Time:</p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.graycolor
                          )}
                        >
                          <p className={Styles.mt16}>
                            {state?.cnicOrPassportNo
                              ? state?.cnicOrPassportNo
                              : "-----"}
                          </p>
                          <p className={Styles.mt16}>
                            {state?.cnicOrPassportExpiry
                              ? state?.cnicOrPassportExpiry
                              : "-----"}
                          </p>
                          <p className={Styles.mt16}>passport.png</p>
                          <p className={Styles.mt16}>
                            {state?.location?.address
                              ? state?.location?.address
                              : "-----"}
                          </p>
                          <p className={Styles.mt16}>
                            {state?.description ? state?.description : "-----"}
                          </p>
                          <p className={Styles.mt16}>
                            {state?.openTime ? state?.openTime : "-----"}
                          </p>
                          <p className={Styles.mt16}>
                            {state?.closeTime ? state?.closeTime : "-----"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {index == 1 && (
                    <div className={commonStyles.flxBetween}>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.flxBetween,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.primarycolor,
                            commonStyles.medium
                          )}
                        >
                          <p className={Styles.mt16}>Website Link:</p>
                          <p className={Styles.mt16}>Twitter Link:</p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.graycolor
                          )}
                        >
                          <p className={Styles.mt16}>
                            {state?.website ? state?.website : "------"}
                          </p>
                          <p className={Styles.mt16}>
                            {state?.website ? state?.twitter : "------"}
                          </p>
                        </div>
                      </div>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.flxBetween,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.primarycolor,
                            commonStyles.medium
                          )}
                        >
                          <p className={Styles.mt16}>Instagram Link:</p>
                          <p className={Styles.mt16}>Facebook Link:</p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.graycolor
                          )}
                        >
                          <p className={Styles.mt16}>
                            {state?.instagram ? state?.instagram : "------"}
                          </p>
                          <p className={Styles.mt16}>
                            {state?.facebook ? state?.facebook : "------"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {index == 2 && (
                    <div className={commonStyles.flxBetween}>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.flxBetween,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.primarycolor,
                            commonStyles.medium
                          )}
                        >
                          <p className={Styles.mt16}>Income Tax Number:</p>
                          <p className={Styles.mt16}>
                            Sales Tax Registration Number:
                          </p>{" "}
                          {/* <p className={Styles.mt16}>Tax File:</p> */}
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.graycolor
                          )}
                        >
                          <p className={Styles.mt16}>
                            {" "}
                            {state?.incomeTaxNo ? state?.incomeTaxNo : "------"}
                          </p>
                          <p className={Styles.mt16}>
                            {" "}
                            {state?.salesTaxNo ? state?.salesTaxNo : "------"}
                          </p>{" "}
                          {/* <p className={classNames(Styles.mt16, Styles.file)}>
                            {" "}
                            {state?.salesTaxNo
                              ? state?.salesTaxNo
                              : "------"}{" "}
                          </p> */}
                        </div>
                      </div>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.flxBetween,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.primarycolor,
                            commonStyles.medium
                          )}
                        >
                          <p className={Styles.mt16}> Bank Name:</p>
                          <p className={Styles.mt16}>
                            {" "}
                            Account Holder Name:
                          </p>{" "}
                          <p className={Styles.mt16}>Account Number:</p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.graycolor
                          )}
                        >
                          <p className={Styles.mt16}>
                            {" "}
                            {state?.bankName ? state?.bankName : "------"}
                          </p>
                          <p className={Styles.mt16}>
                            {" "}
                            {state?.accountHolderName
                              ? state?.accountHolderName
                              : "------"}
                          </p>{" "}
                          <p className={Styles.mt16}>
                            {" "}
                            {state?.accountNumber
                              ? state?.accountNumber
                              : "------"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {index == 3 && (
                    <div className={commonStyles.flxBetween}>
                      <div
                        className={classNames(
                          commonStyles.col5,
                          commonStyles.flxBetween,
                          commonStyles.fs14
                        )}
                      >
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.primarycolor,
                            commonStyles.medium
                          )}
                        >
                          <p className={Styles.mt16}>Phone Number:</p>
                          <p className={Styles.mt16}>Email Address:</p>
                        </div>{" "}
                        <div
                          className={classNames(
                            commonStyles.col5,
                            Styles.graycolor
                          )}
                        >
                          <p className={Styles.mt16}>
                            {state?.phoneNumber ? state?.phoneNumber : "------"}
                          </p>
                          <p className={Styles.mt16}>
                            {" "}
                            {state?.email ? state?.email : "------"}
                          </p>
                        </div>
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

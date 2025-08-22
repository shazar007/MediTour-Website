import React, { useState } from "react";
import AdminNavBar from "../../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./insurancepay.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
interface FAQData {
  header: string;
}
export default function InsurancePaymentDetails() {
  const accordionData: FAQData[] = [
    {
      header: "MEDICAL BENEFITS ",
    },
    {
      header: "POLICY DETAILS",
    },
  ];

  const [expanded, setExpanded] = useState<number | null>(null);

  const handleAccordionChange =
    (panelIndex: number) =>
      (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panelIndex : null);
      };
  const { state } = useLocation();
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Payment Booking" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(commonStyles.flxBetween)}>
          <p
            className={classNames(
              commonStyles.fs22,
              Styles.primarycolor,
              commonStyles.semiBold
            )}
          >
            Insurance Details
          </p>
          <p
            className={classNames(
              commonStyles.fs18,
              Styles.primarycolor,
              commonStyles.semiBold
            )}
          >
            ID: RNT1234
          </p>
        </div>
        <div className={classNames(commonStyles.flxBetween, Styles.mt24)}>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                Company
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Company ID:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  DR20365
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Name:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.insuranceCompanyId?.name}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Email
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.insuranceCompanyId?.email}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Contact:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.insuranceCompanyId?.phoneNumber}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Address:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.insuranceCompanyId?.location?.address}
                </p>
              </div>
            </div>
          </div>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                USER
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  MR No.:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.userId?.mrNo}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Name:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.userId?.name}
                </p>
              </div>{" "}
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Contact:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.userId?.phone}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Email:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.userId?.email}
                </p>
              </div>{" "}
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Identity No. :
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.cnic}
                </p>
              </div>
            </div>
          </div>
          <div className={classNames(Styles.DetailCard)}>
            <div className={Styles.headerCard}>
              <p
                className={classNames(commonStyles.fs18, commonStyles.semiBold)}
              >
                TOTAL AMOUNT
              </p>
            </div>
            <div className={Styles.headerBody}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Duration:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  {state?.insuranceId?.perYear}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Actual Amount:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  Rs. {state?.amount} /-
                </p>
              </div>
              {/* <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Meditour Amount:
                </p>
                <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                  Rs. 800
                </p>
              </div> */}
            </div>
          </div>
        </div>
        <div className={classNames(Styles.mt24)}>
          <p
            className={classNames(
              Styles.mt24,
              Styles.mb16,
              commonStyles.fs24,
              commonStyles.semiBold,
              Styles.primarycolor
            )}
          >
            Package Details
          </p>
        </div>
        <div className={classNames(Styles.mt24)}>
          {accordionData.map((data, index) => (
            <div key={index} className={classNames(Styles.mt8)}>
              <Accordion
                className={Styles.dropdown}
                expanded={expanded === index}
                onChange={handleAccordionChange(index)}
              >
                <AccordionSummary
                  style={{ padding: "0px 16px" }}
                  expandIcon={<ExpandMoreIcon style={{ color: "#393A44" }} />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  <Typography style={{ fontWeight: "500" }}>
                    <div>
                      <p
                        className={classNames(commonStyles.fs18)}
                        style={{
                          textAlign: "start",
                          color: "#393A44",
                        }}
                      >
                        {data.header}
                      </p>
                    </div>
                  </Typography>
                </AccordionSummary>
                <div style={{ borderBottom: "1px solid gray" }}></div>
                <AccordionDetails
                  style={{
                    padding: "0px 16px 16px 16px",
                    textAlign: "start",
                    textJustify: "none",
                  }}
                >
                  <Typography>
                    {index == 0 && (
                      <div>
                        <ul className={Styles.detailLIst}>
                          <li>ICU / CCU</li>
                          <li>
                            Additional Limits for Accidental Emergencies (Rs
                            10000)
                          </li>
                          <li>Ambulance Service Coverage</li>
                          <li>
                            Coverage of Specialized Investigations (Covered (Sub
                            limit - Rs. 10,000)
                          </li>
                          <li>Waiting Period (2 weeks)</li>
                          <li>Maternity (Pay additional Rs 6,188 and get)</li>
                        </ul>
                        <div>
                          <p
                            className={classNames(
                              commonStyles.fs14,
                              commonStyles.medium,
                              Styles.primarycolor,
                              Styles.mt16
                            )}
                          >
                            More Features
                          </p>
                          <p
                            className={classNames(
                              commonStyles.fs14,
                              Styles.colorGray,
                              Styles.mt8
                            )}
                          >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                        </div>
                      </div>
                    )}
                    {index == 1 && (
                      <div>
                        <p
                          className={classNames(
                            commonStyles.fs14,
                            Styles.colorGray,
                            Styles.mt16
                          )}
                          style={{ cursor: "pointer" }}
                        >
                          Download Policy Document
                        </p>
                        <div className={Styles.mt16}>
                          <p
                            className={classNames(
                              commonStyles.fs14,
                              commonStyles.medium,
                              Styles.primarycolor
                            )}
                          >
                            More Features
                          </p>
                          <p
                            className={classNames(
                              commonStyles.fs14,
                              Styles.colorGray
                            )}
                          >
                            {state?.insuranceId?.heading} <br />
                            {state?.insuranceId?.description}
                          </p>
                        </div>
                        <div className={Styles.mt16}>
                          <p
                            className={classNames(
                              commonStyles.fs14,
                              commonStyles.medium,
                              Styles.primarycolor
                            )}
                          >
                            About
                          </p>
                          <p
                            className={classNames(
                              commonStyles.fs14,
                              Styles.colorGray
                            )}
                          >
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                          </p>
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
    </div>
  );
}

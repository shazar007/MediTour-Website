import React, { useState } from "react";
import styles from "./faq.module.css";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

interface FAQData {
  header: string;
  Content: string;
}

export default function FAQS() {
  const { t, i18n }: any = useTranslation();
const { isRtl } = useDirection();
  const accordionData: FAQData[] = [
    {
      header: t("faqsHead1"),
      Content: t("faqsHead1Content"),
    },
    {
      header: t("faqsHead2"),
      Content: t("faqsHead2Content"),
    },
    {
      header: t("faqsHead3"),
      Content: t("faqsHead3Content"),
    },
    {
      header: t("faqsHead4"),
      Content: t("faqsHead4Content"),
    },
    {
      header: t("faqsHead5"),
      Content: t("faqsHead5Content"),
    },
  ];

  const [expanded, setExpanded] = useState<number | null>(null);

  const handleAccordionChange =
    (panelIndex: number) =>
    (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelIndex : null);
    };

  return (
    <div className={styles.container}>
      {accordionData.map((data, index) => (
        <div key={index} className={styles.mt8}>
          <Accordion
            className={styles.dropdown}
            expanded={expanded === index}
            onChange={handleAccordionChange(index)}
          >
            <AccordionSummary
              sx={{
                ".MuiAccordionSummary-expandIconWrapper": {
                  transform: "none",
                  transition: " none",
                },
              }}
              style={{ padding: "10px 0px" }}
              expandIcon={
                <FaPlus
                  className={classNames(styles.icon, {
                    [styles.rotate]: expanded === index,
                    [styles.colorChanged]: expanded === index,
                  })}
                />
              }
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography
                sx={{
                  fontFamily: "inherit",
                }}
                style={{ fontWeight: "600" }}
              >
                <div>
                  <p
                    // className={classNames(commonstyle.fs16)}
                    style={{
                      color: expanded === index ? "#ff7631" : "#0e54a3",
                      textAlign: "start",
                      fontSize:'16px'
                    }}
                  >
                    {data.header}
                  </p>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{
                padding: "8px 0px 16px",
                textAlign: "start",
                textJustify: "none",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "inherit",
                }}
              >
                <div>
                  <p className={classNames(styles.text)}
                  
                  style={isRtl?{lineHeight:'30px',}:{}}
                  >{data.Content}</p>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userTreatments } from "shared/services";
import { CircleLoader } from "shared/components";
import Footerr from "../Footer";
import classNames from "classnames";
import style from "./treatment.module.css";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import NewFilterSearch from "shared/components/A_New_Components/NewFilter";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

export default function Treatment() {
  const [searchTerm, setSearchTerm] = useState("");
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const [expanded, setExpanded] = useState<number | null>(null);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["treatments"],
    queryFn: () => userTreatments(),
    staleTime: 5 * 60 * 1000,
  });

  let treatments: any = data?.data?.data;

  if (treatments?.length) {
    treatments = [...treatments].sort((a, b) =>
      a?.categoryName
        ?.toLowerCase()
        .localeCompare(b?.categoryName?.toLowerCase())
    );
  }

  const handleGoDetails = (item: any, mainTitle: any, mainIndex: number) => {
    navigate("/treatment/Details", {
      state: {
        item,
        mainIndex,
        mainTitle,
        data: treatments,
      },
    });
  };

  const mid = Math.ceil(treatments?.length / 2);
  const leftData = treatments?.slice(0, mid);
  const rightData = treatments?.slice(mid);

  const filterData = (data: any[]) =>
    data?.filter(
      (item: any) =>
        item.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.treatments?.some((t: any) =>
          t.subCategory?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

  const filteredLeftData = filterData(leftData);
  const filteredRightData = filterData(rightData);

  const renderAccordion = (item: any, index: number) => (
    <Accordion
      key={index}
      className={style.dropdown}
      expanded={expanded === index}
      onChange={() => setExpanded(expanded === index ? null : index)}
    >
      <AccordionSummary
        sx={{
          ".MuiAccordionSummary-expandIconWrapper": {
            transform: "none",
            transition: "none",
          },
        }}
        style={{ padding: "10px 0px" }}
        expandIcon={
          expanded === index ? (
            <FaMinus className={classNames(style.icon, style.colorChanged)} />
          ) : (
            <FaPlus className={style.icon} />
          )
        }
      >
        <Typography style={{ fontWeight: 600 }}>
          <div
            className={style.categoryname}
            onClick={() => handleGoDetails(item, item?.categoryName, index)}
            style={{ textAlign: "start", cursor: "pointer" }}
          >
            {item?.categoryName || t("noCategory")}
          </div>
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={{ padding: "8px 0px 16px", textAlign: "start" }}>
        <Typography>
          {item?.treatments?.length > 0 ? (
            <ul className={style.text}>
              {item.treatments.map((cat: any, idx: number) => (
                <li
                  key={idx}
                  onClick={() =>
                    handleGoDetails(cat, item?.categoryName, index)
                  }
                  style={{ cursor: "pointer", marginBottom: "8px" }}
                  className={style.subCategory}
                >
                  {cat?.subCategory || t("noSubCategory")}
                </li>
              ))}
            </ul>
          ) : (
            <div>{t("noSubCategoriesAvailable")}</div>
          )}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <div>
      <div className={style.container}>
        <p className={classNames(style.mainheadingblack)}>
          MediTour{" "}
          <span className={classNames(style.mainheadingorange)}>
            {t("offers")}
          </span>{" "}
          {t("theBestHospital_")} <br />
          <span className={classNames(style.mainheadingorange)}>
            {t("affordableCostsFor")}
          </span>
        </p>

        <div className={classNames(style.flx, style.row)}>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <CircleLoader color={"#00276D"} width={40} height={40} />
            </div>
          ) : (
            <>
              <div
                style={
                  isRtl
                    ? {
                        marginTop: "15px",
                        display: "flex",
                        justifyContent: "center",
                      }
                    : { display: "flex", justifyContent: "center" }
                }
              >
                <NewFilterSearch
                  hideFilter={true}
                  onSearchChange={(value) => setSearchTerm(value)}
                />
              </div>

              {filteredLeftData?.length === 0 &&
              filteredRightData?.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    width: "100%",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  {t("noData") || "No results found."}
                </div>
              ) : (
                <div className={style.gridWrapper}>
                  {/* Left Column */}
                  <div className={style.column}>
                    {filteredLeftData.map((item: any, index: number) =>
                      renderAccordion(item, index)
                    )}
                  </div>

                  {/* Right Column */}
                  <div className={style.column}>
                    {filteredRightData.map((item: any, index: number) =>
                      renderAccordion(item, index + mid)
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footerr />
    </div>
  );
}

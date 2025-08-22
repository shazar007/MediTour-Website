import React from "react";
import classNames from "classnames";
import CardStyless from "./newFilter.module.css";
import { Box, Checkbox, Modal, Typography } from "@mui/material";
import { GoDotFill } from "react-icons/go";
import InputField from "../InputField";
import { IoClose, IoSearch } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { BsSliders } from "react-icons/bs";

interface NewFilterProps {
  hideFilter?: boolean;
  onSearchChange?: (value: any) => void;
}

export default function NewFilterSearch({
  hideFilter = false,
  onSearchChange,
}: NewFilterProps) {
  const { t }: any = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={CardStyless.flxEnd}>
      {!hideFilter && (
        <div className={classNames(CardStyless.flxendfilter, CardStyless.main)}>
          <div
            className={classNames(CardStyless.filterWrapper)}
            onClick={handleOpen}
          >
            <BsSliders color="#7d7d7d" className={CardStyless.filterImage} />
            <p className={CardStyless.filterText}>{t("filters")}</p>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className={CardStyless.ModalContent}>
              <div className={CardStyless.mdlwrp}>
                <p className={CardStyless.modelHeading}>{t("filters")}</p>
                <IoClose
                  size={16}
                  style={{ cursor: "pointer" }}
                  onClick={handleClose}
                />
              </div>
              <div
                style={{
                  padding: "15px 0 10 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <GoDotFill />
                <p className={CardStyless.headingModel}>{t("sortBy")}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "50px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <Checkbox
                    sx={{
                      padding: "0px",
                      color: "#FF9500",
                      "&.Mui-checked": {
                        color: "#FF9500",
                      },
                    }}
                    size="small"
                  />
                  <p className={CardStyless.filterText}>{t("nearBy")}</p>
                </div>{" "}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <Checkbox
                    sx={{
                      padding: "0px",
                      color: "#FF9500",
                      "&.Mui-checked": {
                        color: "#FF9500",
                      },
                    }}
                    size="small"
                  />

                  <p className={CardStyless.filterText}>{t("recommended")}</p>
                </div>
              </div>
              <div
                style={{
                  padding: "15px 0 10 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div className={CardStyless.w50}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <GoDotFill />
                    <p className={CardStyless.headingModel}>
                      {t("selectCountry")}
                    </p>
                  </div>
                  {/* Replace the InputField with  Selector */}
                  <InputField />
                </div>
                <div className={CardStyless.w50}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <GoDotFill />
                    <p className={CardStyless.headingModel}>
                      {t("selectSpeciality")}
                    </p>
                  </div>
                  {/* Replace the InputField with  Selector */}

                  <InputField />
                </div>
              </div>
              <div className={CardStyless.flxbtwen}>
                <button className={CardStyless.Reset}>{t("reset")}</button>
                <button className={CardStyless.Apply}>{t("apply")}</button>
              </div>
            </div>
          </Modal>
        </div>
      )}

      <div className={classNames(CardStyless.filterWrapper)}>
        <IoSearch className={CardStyless.SearchIcon} />

        <input
          placeholder={t("search")}
          className={CardStyless.SearchInput}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
    </div>
  );
}

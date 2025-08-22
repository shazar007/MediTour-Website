import React, { useState } from "react";
import filterStyles from "./cityfilter.module.css";
import { Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { BsSliders } from "react-icons/bs";

interface CityFilterProps {
  initialSelectedCity?: string;
  cities: string[];
  filterImage?: string;
  onCityChange?: (city: string) => void;
  onApply?: (city: string) => void;
  onReset?: () => void;
}

const CityFilter: React.FC<CityFilterProps> = ({
  initialSelectedCity = "",
  cities,
  filterImage = <BsSliders color="#7d7d7d" />,
  onCityChange,
  onApply,
  onReset,
}) => {
  const { t }: any = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string>(initialSelectedCity);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onCityChange) onCityChange(option);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleApply = () => {
    if (onApply) onApply(selected);
    closeModal();
  };

  const handleReset = () => {
    setSelected(initialSelectedCity);
    if (onReset) onReset();
  };

  return (
    <>
      <div className={filterStyles.filterouter}>
        <BsSliders
          color="#7d7d7d"
          className={filterStyles.imagefilter}
          onClick={openModal}
        />
        <p className={filterStyles.text}>{t("selectCity")}</p>
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <div className={filterStyles.modalContent}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              paddingBottom: "16px",
              borderBottom: "0.5px solid #7d7d7d",
            }}
          >
            <p className={filterStyles.modaltext}>{t("selectCity")}</p>
            <IoClose className={filterStyles.close} onClick={closeModal} />
          </div>
          <div
            style={{
              width: "100%",
              position: "relative",
              marginTop: "16px",
            }}
          >
            <div
              onClick={toggleDropdown}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                borderRadius: "16px",
                fontWeight: "400",
                fontSize: "14px",
                border: "0.5px solid #7d7d7d",
                cursor: "pointer",
                color: "#7d7d7d",
              }}
            >
              <span>{selected}</span>
              {isOpen ? (
                <FaChevronUp style={{ color: "#7D7D7D" }} size={14} />
              ) : (
                <FaChevronDown style={{ color: "#7D7D7D" }} size={14} />
              )}
            </div>
            {isOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  left: "0",
                  width: "100%",
                  borderRadius: "0 0 16px 16px",
                  background: "#fff",
                  fontWeight: "400",
                  color: "#7d7d7d",
                  fontSize: "14px",
                  paddingBottom: "16px",
                  border: "1px solid #ccc",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 1,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {cities.map((city) => (
                  <div
                    key={city}
                    className={filterStyles.lists}
                    onClick={() => handleSelect(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ marginTop: "16px" }}></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "40px",
            }}
          >
            <button className={filterStyles.resetbtn} onClick={handleReset}>
              {t("reset")}
            </button>
            <button className={filterStyles.applyBtn} onClick={handleApply}>
              {t("apply")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CityFilter;

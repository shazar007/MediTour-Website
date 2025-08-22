import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelector.module.css";
import urdu from "assets/images/Language-Flangs/Pakistan Flag.png";
import arbi from "assets/images/Language-Flangs/saudi-arabia Flag.png";
import parhian from "assets/images/Language-Flangs/Iran Flag.png";
import Russia from "assets/images/Language-Flangs/Russia Flag.png";
import persian from "assets/images/Language-Flangs/afghanistan flag.png";
import french from "assets/images/Language-Flangs/france flag.png";
import dutch from "assets/images/Language-Flangs/netherlands flag.png";
import Turkey from "assets/images/Language-Flangs/Turkey Flag.png";
import ennglish from "assets/images/Language-Flangs/uk-flag.jpg";
import { useDirection } from "shared/utils/DirectionContext";

const LanguageSelector = (props) => {
  const { width, height } = props;
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const { isRtl } = useDirection();

  const handleOutsideClick = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
      document.removeEventListener("click", handleOutsideClick);
    }
  };

  const toggleDropdown = () => {
    const newShow = !showDropdown;
    setShowDropdown(newShow);
    if (newShow) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = language;
    setShowDropdown(false);
    document.removeEventListener("click", handleOutsideClick);
  };

  const languages = [
    { code: "en", label: "English", flag: ennglish },
    { code: "du", label: "Dutch", flag: dutch },
    { code: "tr", label: "Turkish", flag: Turkey },
    { code: "fr", label: "Français", flag: french },
    { code: "ru", label: "Русский", flag: Russia },
    { code: "ur", label: "اردو", flag: urdu },
    { code: "ar", label: "عربي", flag: arbi },
    { code: "pr", label: "فارسی", flag: parhian },
    { code: "ps", label: "پښتو", flag: persian },
  ];

  return (
    <div style={{ position: "relative" }} ref={containerRef}>
      <div
        ref={containerRef}
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
      >
        {(() => {
          const selectedLang = languages.find(
            (lang) => lang.code === selectedLanguage
          );
          return selectedLang ? (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <img
                src={selectedLang.flag}
                alt={selectedLang.label}
                style={{
                  width: width || "24px",
                  height: height || "24px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  objectFit: "fill",
                  display: "flex",
                  alignItems: "center",
                }}
              />
              <p
                style={{
                  display: "inline",
                  marginLeft: "4px",
                  textTransform: "uppercase",
                }}
              >
                {selectedLanguage.charAt(0).toUpperCase() +
                  selectedLanguage.slice(1)}
              </p>
            </div>
          ) : null;
        })()}
      </div>

      {showDropdown && (
        <ul
          ref={dropdownRef}
          className={styles.language_dropdown}
          style={{ left: isRtl ? "20%" : "-15%" }}
        >
          <div>
            <p className={styles.heading}>Select Language</p>
          </div>
          <div className={styles.innerContainer}>
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    src={lang.flag}
                    alt={lang.label}
                    style={{
                      width: "24px",
                      height: "24px",
                      objectFit: "fill",
                      borderRadius: "50%",
                    }}
                  />
                  <span>{lang.label}</span>
                </div>
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;

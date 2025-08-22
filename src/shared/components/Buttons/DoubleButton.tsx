import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Style.module.css";
import commonstyle from "shared/utils/common.module.css";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

interface DoubleButtonProps {
  tab1Label: string;
  tab2Label: string;
  onTabChange: (activeTab: string) => void;
  shift?: any;
}

const DoubleButton: React.FC<DoubleButtonProps> = ({
  tab1Label,
  tab2Label,
  onTabChange,
  shift,
}) => {

  // const [activeTab, setActiveTab] = useState<string>(tab1Label);

  // const handleTabClick = (tab: string) => {
  //   // setActiveTab(tab);
  //   onTabChange(tab);
  // };
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();

  return (
    <div>
      <div className={styles.tabContainer}>
        <div
          className={classNames(
            isRtl ? styles.RTLtab : styles.tab,
            {
              [styles.tabActive]: shift === tab1Label,
              [styles.tabInactive]: shift !== tab1Label,
            }
          )}

          style={i18n.language === "ur" ? { paddingBottom: "10px" } : {}}

          onClick={() => onTabChange(tab1Label)}
        >
          {tab1Label === "upcoming" ? t("upcoming") : tab1Label}
        </div>

        <div
          className={classNames(
            isRtl ? styles.RTLtab : styles.tab,
            {
              [styles.tabActive]: shift === tab2Label,
              [styles.tabInactive]: shift !== tab2Label,
            }
          )}
          style={i18n.language === "ur" ? { paddingBottom: "10px" } : {}}

          onClick={() => onTabChange(tab2Label)}
        >
          {tab2Label === "record" ? t("record") : tab2Label}
        </div>
      </div>
    </div>
  );
};

export default DoubleButton;

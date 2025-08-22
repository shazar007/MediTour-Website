import React, { useEffect, useState } from "react";
import "./ResponsiveTabs.css";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

interface TopSelectedTabsProps {
  tabs: string[];
  defaultTab?: string;
  onTabChange?: (tab: string) => void;
}

const TopSelectedTabs: React.FC<TopSelectedTabsProps> = ({
  tabs,
  defaultTab,
  onTabChange,
}) => {
  const { t, i18n }: any = useTranslation();
  const isRtl = useDirection();
  const initialTab = defaultTab || tabs[0];
  const [activeTab, setActiveTab] = useState(initialTab);
  const activeIndex = tabs.indexOf(activeTab);
  console.log("🚀 ~ activeTab:", activeTab);

  useEffect(() => {
    // handleTabClick()
  }, [i18n.language]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };
  const check = `${activeIndex * (100 / tabs.length)}%`;
  return (
    <div className="tab-container">
      <div className="tab">
        <div
          className="sliding-button"
          style={{
            width: `${100 / tabs.length}%`,
            left: isRtl ? check : "",
            right: isRtl ? check : "",
          }}
        />
        {tabs.map((option) => {
          console.log("🚀 ~ {tabs.map ~ option:", option);
          return (
            <div
              key={option}
              className="button"
              style={{
                width: `${100 / tabs.length}%`,
                color: activeTab === option ? "#000" : "#fff",
              }}
              onClick={() => handleTabClick(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopSelectedTabs;

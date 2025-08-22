import { useEffect, useMemo, useState } from "react";
import styles from "../ExploreAll/style.module.css";
import { useNavigate } from "react-router-dom";
import { data as staticData } from "./props";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";

const ExploreAll = () => {
  const { t }: any = useTranslation();
  const navigate = useNavigate();
  const [loadedData, setLoadedData] = useState<any[]>([]);

  const handlePress = (item: any) => {
    const data = { title: item.title, details: item?.details };
    navigate("/tourism", { state: data });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!loadedData.length) {
      setLoadedData(staticData);
    }
  }, [loadedData.length]);

  const sortedData = useMemo(() => {
    return [...loadedData].sort((a, b) => a.title.localeCompare(b.title));
  }, [loadedData]);

  return (
    <div className={styles.container}>
      <ServiceHeader
        headingBlue={t("healAndDiscover_")}
        headingOrange="MEDITOUR"
        content={t("healAndDiscover_Desc")}
        Mirroreffect={true}
      />
      {sortedData?.map((item, index) => (
        <RectangleCard
          key={index}
          item={item}
          index={index}
          handlePress={() => handlePress(item)}
          t={t}
        />
      ))}
    </div>
  );
};

export default ExploreAll;

const RectangleCard = ({ item, handlePress, t }: any) => {
  return (
    <div onClick={handlePress} className={styles.rectangleCard}>
      <img
        src={item?.img}
        alt={item?.title}
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.absoluteContainer}>
        <p className={styles.text}>{item?.title}</p>
        <p className={styles.text2}>{t("exploreMore").toUpperCase()}</p>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
};

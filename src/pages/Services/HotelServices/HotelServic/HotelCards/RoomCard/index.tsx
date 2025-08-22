import style from "./style.module.css";
import { useTranslation } from "react-i18next";

interface ListItemType {
  img: any;
  item: string;
}

interface RoomCardProps {
  cardImage: any;
  hotelName: string;
  onPannelText: string;
  cityName: string;
  data: ListItemType[];
  experience: string;
  satisfiedGuest: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onDetailsClick?: any;
}

const RoomCard = ({
  cardImage,
  hotelName,
  onPannelText,
  cityName,
  data,
  experience,
  satisfiedGuest,
  onToggleFavorite,
  onDetailsClick,
}: RoomCardProps) => {
  const { t }: any = useTranslation();
  return (
    <div>
      <div className={style.cardbody}>
        <div className={style.imgcontainer}>
          <img src={cardImage} alt="" className={style.img} />

          <div className={style.heart} onClick={onToggleFavorite}></div>
        </div>

        <div className={style.firstcontent}>
          <div className={style.firstcontenthead}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p className={style.hotelName}>{hotelName}</p>
              <p className={style.onPannel}>{onPannelText}</p>
            </div>

            <div style={{ margin: "5px 0" }}>
              <p className={style.citynamee}>{cityName}</p>
            </div>

            <div>
              {data.map((dataItem, index) => (
                <ListItem key={index} img={dataItem.img} item={dataItem.item} />
              ))}
            </div>
          </div>

          <div className={style.firstcontentbottom}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <p className={style.title}>{experience}</p>
                <p className={style.smalltext}>{t("experience")}</p>
              </div>
              <div className={style.bottomsperator}></div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <p className={style.title}>{satisfiedGuest}</p>
                <p className={style.smalltext}>{t("satisfiedGuest")}</p>
              </div>
            </div>

            <button className={style.Bookbtn} onClick={onDetailsClick}>
              {t("book")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

const ListItem = ({ img, item }: any) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div style={{ width: "16px", height: "16px", display: "flex" }}>
        <img
          src={img}
          alt="ListItem2"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <p className={style.item}>{item}</p>
    </div>
  );
};

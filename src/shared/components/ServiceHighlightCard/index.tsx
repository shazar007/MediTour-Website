import classNames from "classnames";
import cardStyle from "./highlightCard.module.css";
import { FaChevronRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const ServiceHighlightCard = ({
  data,
  onPress,
}: {
  onPress?: any;
  data?: any;
}) => {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const emptyData = [
    {
      title: "Title ",
      content: "content.........",
      color: "#FF8A8A",
      icon: "",
      coverImg: "",
      infoBg: "",
      BgColor: "",
    },
  ];
  const Data = data ? data : emptyData;

  return (
    <>
      <div className={cardStyle.cardContainer}>
        {Data.map((card: any, index: any) => (
          <>
            <div
              key={index}
              onClick={() => onPress(t(card?.title))}
              className={classNames(cardStyle.card)}
            >
              <div className={cardStyle.h75}></div>
              <div
                className={cardStyle.cardCover}
                style={{
                  backgroundColor: card.color ? card.color : "white",
                }}
              >
                <div
                  className={cardStyle.outerCoverImg}
                  style={{
                    top: card.top,
                    transform: isRtl ? "scaleX(-1)" : "none",
                  }}
                >
                  <img
                    src={card.coverImg}
                    alt="outerCoverImg"
                    className={cardStyle.coverImg}
                  />
                </div>
              </div>
              <div>
                <div
                  className={cardStyle.cardInfo}
                  style={{
                    backgroundColor: card.BgColor ? card.BgColor : "#e9f4f4",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      alignItems: "center",
                      marginBottom: "40px",
                    }}
                  >
                    <img
                      src={card.icon}
                      alt="card Icons"
                      className={cardStyle.icon}
                    />{" "}
                    <h3>{t(card.title)}</h3>
                  </div>

                  <p
                    className={cardStyle.CardTexxt}
                    style={i18n.language === "ur" ? { lineHeight: "32px" } : {}}
                  >
                    {t(card.content)}
                  </p>
                  <div
                    style={
                      isRtl
                        ? {
                            marginRight: "auto",
                          }
                        : {
                            marginLeft: "auto",
                          }
                    }
                  >
                    <div
                      className={cardStyle.navigationIcon}
                      style={{
                        backgroundColor: card.color ? card.color : "white",
                      }}
                    >
                      <FaChevronRight
                        className={cardStyle.NavIcon}
                        style={
                          isRtl
                            ? {
                                transform: "rotate(-180deg)",
                              }
                            : {}
                        }
                      />
                    </div>
                  </div>
                  <img
                    src={card.infoBg}
                    alt="infoBg"
                    className={cardStyle.infoBg}
                  />
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ServiceHighlightCard;

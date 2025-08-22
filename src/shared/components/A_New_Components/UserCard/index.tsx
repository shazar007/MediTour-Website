import React from "react";
import styles from "./style.module.css";
import cardimg from "assets/images/cardimgAmbulance.jpg";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

interface UserCardProps {
  img?: any;
  name?: any;
  verified?: any;
  detailtext?: any;
  paid?: boolean | any;
  items?: { title: string; value: string }[];
  TotalAmount?: string;
  buttontext?: string;
  onButtonClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  img,
  name,
  verified,
  detailtext,
  paid,
  items = [],
  TotalAmount,
  buttontext,
  onButtonClick,
}) => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  return (
    <div className={styles.card}>
      <div className={styles.contentWrapper}>
        <div className={styles.firstCol}>
          <div className={styles.imgContainer}>
            <img src={img || cardimg} alt="User" className={styles.cardimg} />
          </div>

          <div className={styles.firstcontent}>
            <div className={styles.firsthead}>
              <p className={styles.name}>
                {name || ""}
              </p>
              <p className={styles.verified}>
                {verified || ""}
              </p>
            </div>

            <div className={styles.firstbottom}>
              {detailtext && (
                <p className={styles.detailtext}>{detailtext}</p>
              )}
              {paid !== undefined && (
                <p className={styles.verified}>{paid}</p>
              )}
            </div>
          </div>
        </div>

        <div className={isRtl ? styles.isRtlsecoundCol : styles.secoundCol}

        >
          <div className={styles.detailitems}>
            {items.map((item, index) => (
              <div key={index} className={styles.itemBar}>
                <div className={styles.itemBarTitle}>
                  <p className={styles.itemtitle}>{item.title}</p>
                </div>
                <div className={styles.itemBarValue}>
                  <p className={styles.itemValue}>{item.value}</p>
                </div>
              </div>
            ))}
            {TotalAmount ? <div className={styles.itemBar} style={{ marginTop: '10px' }}>
              <div className={styles.itemBarTitle}>
                <p className={styles.itemtitle}>{t("totalAmount")}</p>
              </div>
              <div className={styles.itemBarValue}>
                <p className={styles.itemamount}>
                  <span></span>{TotalAmount}
                </p>
              </div>
            </div> : undefined}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '16px'
          }}>

            {buttontext &&
              <button className={styles.detailbutton} onClick={onButtonClick}>

                {buttontext}
              </button>

            }


          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
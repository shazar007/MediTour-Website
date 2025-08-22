import React from "react";
import styles from "./dataBlock.module.css";
import { useTranslation } from "react-i18next";

interface Props {
  heading?: string;
  setModalOpen?: any;
  setFormType?: any;
  data?: any;
}

export default function ProfileDataBlock(props: Props) {
  const {t} : any = useTranslation()
  const { setModalOpen, setFormType, heading, data } = props;

  return (
    <div className={styles.profilePage__container}>
      <div className={styles.profilePage__header}>
        <h2 className={styles.profilePage__heading}>{heading}</h2>
        <button
          className={styles.profilePage__editButton}
          onClick={() => {
            setModalOpen(true);
            setFormType();
          }}
        >
          {t("edit")}
        </button>
      </div>

      <div className={styles.profilePage__infoSection}>
        {data?.map((info: any, index: any) => {
          if (index % 2 === 0) {
            return (
              <div className={styles.profilePage__infoRow} key={index}>
                <div className={styles.profilePage__infoItem}>
                  <h4 className={styles.profilePage__itemHeading}>
                    {t(info?.label)}
                  </h4>
                  <p className={styles.profilePage__itemText}>{info?.value}</p>
                </div>
                {data[index + 1] && (
                  <div className={styles.profilePage__infoItem}>
                    <h4 className={styles.profilePage__itemHeading}>
                      {t(data[index + 1]?.label)}
                    </h4>
                    <p
                      className={styles.profilePage__itemText}
                      // style={{maxWidth:' 149px'}}
                    >
                      {data[index + 1]?.value}
                    </p>
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

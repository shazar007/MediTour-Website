import styles from "./packageStyles.module.css";
import { TiTick, TiTimes } from "react-icons/ti";
import { useTranslation } from "react-i18next";

const HospitalPackages = ({ hospPackages, subCategory }: any) => {
  const { t }: any = useTranslation();
  return (
    <div className={styles.cardcontainer}>
      <div className={styles.card}>
        <p style={{ fontWeight: "800", color: "#1f1f1f" }}>
          {subCategory?.subCategory}
        </p>
        {hospPackages?.length > 0 ? (
          hospPackages?.map((i: any) => (
            <div
              style={{
                padding: 0,
                marginTop: "12px",
              }}
            >
              <div className={styles.innercardcontainer}>
                <div className={styles.innercard}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p>{t("basic")}</p>
                    <p>
                      <span>RS</span> <span>{i?.totalAmount}</span>
                    </p>
                  </div>
                  <div>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        marginTop: "12px",
                      }}
                    >
                      {i?.treatment &&
                        Object?.entries(i?.treatment)?.map(
                          ([key, value]: any) => {
                            return (
                              // <></>
                              <li
                                key={key}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "5px",
                                }}
                              >
                                {value ? (
                                  <TiTick
                                    color="green"
                                    style={{ marginRight: "8px" }}
                                  />
                                ) : (
                                  <TiTimes
                                    color="red"
                                    style={{ marginRight: "8px" }}
                                  />
                                )}
                                <p className={styles.basic}>{key}</p>
                                {/* {key !== "other" && (
                                  )}
                                  {value !== Boolean && (
                                    <p className={style.basic}>{value}</p>
                                  )} */}
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </div>
                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default HospitalPackages;

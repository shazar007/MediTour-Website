import React, { useEffect, useRef, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import styles from "./styles.module.css";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import headerImage from "assets/images/headerSvg.svg";
const NavBreadCrumbs = ({
  data,
  heading,
  renderChildren,
  sideimg,
  backgroundImage,
}: {
  data?: any[];
  heading?: any;
  backgroundImage?: any;
  renderChildren?: any;
  sideimg?: any;
}) => {
  const breadcrumbsData = data?.filter((item) => item);
  const navRef = useRef<any>(null);
  const [navHeight, setNavHeight] = useState<number>(0);
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);
  return (
    <div className={styles.navIMGs}>
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="Background"
          className={styles.navIMG}
          loading="lazy"
        />
      )}
      {renderChildren ? (
        <>{renderChildren}</>
      ) : (
        <div>
          <div className={styles.flxcenter}>
            <div
              className={classNames(
                styles.responsiveContainer,
                styles.fs48,
                commonstyles?.semiBold
              )}
            >
              {heading}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {breadcrumbsData?.map((item: any, index) => {
                if (!item) return null;
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      className={
                        index === breadcrumbsData?.length - 1
                          ? styles.headingpath
                          : styles.headingpathOrange
                      }
                    >
                      {item}
                    </p>
                    {index !== breadcrumbsData?.length - 1 && (
                      <MdArrowForwardIos className={styles.headingpath} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {backgroundImage ? null : (
            <img
              src={sideimg ? sideimg : headerImage}
              alt="Background"
              className={styles.leftImage}
              loading="lazy"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default NavBreadCrumbs;

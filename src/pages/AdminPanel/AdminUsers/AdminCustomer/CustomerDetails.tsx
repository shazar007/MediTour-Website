import React, { useEffect, useState } from "react";
import AdminNavBar from "../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./AdCustomer.module.css";
import { useLocation } from "react-router-dom";
import { UserBlock } from "shared/services";
import { RingLoader } from "shared/components";
import dayjs from "dayjs";
export default function CustomerDetails() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(state);
  const [age, setAge] = useState<number | undefined>(undefined);
  let date = dayjs(userData?.dateOfBirth).format("MM-DD-YYYY");

  useEffect(() => {
    const dateOfBirth = userData?.dateOfBirth;
    if (dateOfBirth) {
      const [day, month, year] = dateOfBirth.split("/");
      const formattedDateOfBirth = `${year}-${month}-${day}`;
      const dob = new Date(formattedDateOfBirth);
      const ageDate = new Date(Date.now() - dob.getTime());
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      setAge(calculatedAge);
    }
  }, [userData?.dateOfBirth]);

  const handleBlock = () => {
    setLoading(true);
    let params = {
      vendorType: "Users",
      vendorId: userData?._id,
      blocked: !userData?.blocked,
    };
    UserBlock(params)
      .then((res: any) => {
        setUserData(res?.data?.vendor);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Users" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div
          className={classNames(Styles.flxBetween)}
          style={{ marginBottom: "16px" }}
        >
          <p
            className={classNames(
              commonStyles.fs22,
              Styles.primarycolor,
              commonStyles.semiBold
            )}
          >
            Customer Details
          </p>
          <button
            className={userData?.blocked ? Styles.unblock : Styles.block}
            onClick={handleBlock}
            disabled={loading}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <RingLoader color={"#fff"} size={30} />
              </div>
            ) : (
              // </div>
              <>{userData?.blocked ? "Unblock" : "Block"}</>
            )}
          </button>
        </div>
        <div className={classNames(Styles.DetailCard)}>
          <div className={Styles.headerCard}>
            <p className={classNames(commonStyles.fs18, commonStyles.semiBold)}>
              {userData?.name}
            </p>
          </div>
          <div className={Styles.headerBody}>
            <div className={classNames(commonStyles.col5)}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  MR No:
                </p>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.colorGray,
                    commonStyles.col5
                  )}
                >
                  {userData?.mrNo}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt16)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Email:
                </p>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.colorGray,
                    commonStyles.col5
                  )}
                >
                  {userData?.email}
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt16)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Phone Number:
                </p>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.colorGray,
                    commonStyles.col5
                  )}
                >
                  {userData?.phone}
                </p>
              </div>
            </div>{" "}
            <div className={classNames(commonStyles.col5)}>
              <div className={classNames(commonStyles.flxBetween)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Password:
                </p>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.colorGray,
                    commonStyles.col5
                  )}
                >
                  DR2036534
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt16)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Age:
                </p>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.colorGray,
                    commonStyles.col5
                  )}
                >
                  {age} Years
                </p>
              </div>
              <div className={classNames(commonStyles.flxBetween, Styles.mt16)}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold
                  )}
                >
                  Gender:
                </p>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.colorGray,
                    commonStyles.col5
                  )}
                >
                  {userData?.gender}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={classNames(Styles.DetailCard)}
          style={{ marginTop: "24px" }}
        >
          <div className={Styles.headerCard}>
            <p className={classNames(commonStyles.fs18, commonStyles.semiBold)}>
              Address
            </p>
          </div>
          <div className={Styles.headerBody}>
            <div className={classNames(commonStyles.col5)}>
              <div className={classNames(commonStyles.flxBetween)}>
                {}
                <p
                  className={classNames(
                    commonStyles.fs14,
                    Styles.colorGray,
                    commonStyles.col5
                  )}
                >
                  {userData?.addresses[0]?.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

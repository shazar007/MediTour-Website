import Footerr from "pages/Home/HomeNavBar/Footer";
import style from "./infoStyle.module.css";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import ContinueButton from "shared/components/ContinueButton";

import commonstyle from "shared/utils/common.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setObj } from "shared/redux";
import NavBreadCrumbs from "shared/components/NavBreadCrumbs";
import { Travelinformation } from "shared/utils/mainHeaderQuery";

const Travelinfo = () => {
  const { state } = useLocation();
  const travelers = state?.travelers;
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.root.common);
  const item = state?.item;
  const totalTravelers = state?.totalTravelers;
  const transformTravellers = (travellers: any) => {
    return travellers.map((traveler: any) => ({
      name: traveler.name,
      passportNo: traveler.passportNo,
      visaFile: traveler.visaFile.uri,
      passportFile: traveler.passportFile.uri,
    }));
  };
  const transformedTravellers = transformTravellers(travelers);
  function calculateAge(dateOfBirthString: string) {
    if (!dateOfBirthString) return "Date of birth not provided";
    const [day, month, year] = dateOfBirthString.split("/").map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }
  const sendDetails = () => {
    let data = {
      bidRequestId: item?._id,
    };
    let params = {
      name: user?.name,
      email: user?.email,
      address: user?.address?.address,
      travellers: transformedTravellers,
      age: calculateAge(user?.dateOfBirth).toString(),
      phone: user?.phone,
      totalAmount: item?.ticketPrice,
    };
    dispatch(setObj({ item, data, params, travelers }));
    navigate("/services/paymentDetail", {
      state: {
        serviceName: "flights",
        actualAmount: item?.ticketPrice,
        travelers: travelers,
      },
    });
  };

  return (
    <div>
      <NavBreadCrumbs {...Travelinformation} />

      <div className={classNames(commonstyles.container, commonstyles.mb32)}>
        <div
          className={classNames(
            commonstyles.flx,
            commonstyles.flxBetween,
            commonstyles.flxWrap
          )}
        >
          <div
            className={classNames(commonstyles.col4, commonstyles.colsm12)}
            style={{
              marginTop: "10px",
            }}
          >
            <p
              className={classNames(
                commonstyles.colorBlue,
                commonstyles.fs24,
                commonstyles.semiBold
              )}
            >
              Your Info
            </p>

            <div className={classNames(style.card)}>
              <div>
                <label className={style.label}>Name</label>
                <input
                  className={style.input}
                  type="text"
                  placeholder={user?.name}
                  readOnly={true}
                />
              </div>
              <div>
                <label className={style.label}>Email</label>
                <input
                  className={style.input}
                  type="email"
                  placeholder={user?.email}
                  readOnly={true}
                />
              </div>
              <div>
                <label className={style.label}>Age</label>
                <input
                  className={style.input}
                  type="tel"
                  placeholder={calculateAge(user?.dateOfBirth).toString()}
                  readOnly={true}
                />
              </div>
              <div>
                <label className={style.label}>Current Location</label>
                <input
                  className={style.input}
                  type="tel"
                  placeholder={user?.address?.address}
                  readOnly={true}
                />
              </div>
              <div>
                <label className={style.label}>Contact</label>
                <input
                  className={style.input}
                  type="tel"
                  placeholder={user?.phone}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div
            className={classNames(commonstyles.col4, commonstyles.colsm12)}
            style={{
              marginTop: "10px",
            }}
          >
            {" "}
            <div className={classNames(commonstyles.flx, style.card)}>
              <div
                className={classNames(
                  commonstyle.flx,
                  commonstyle.flxBetween,
                  commonstyle.flxWrap
                )}
                style={{
                  width: "100%",
                }}
              >
                <div>
                  <p
                    className={classNames(
                      commonstyles.colorBlue,
                      commonstyles.fs24,
                      commonstyles.semiBold
                    )}
                  >
                    {`PKR ${item?.ticketPrice} `}
                  </p>
                </div>

                <div>
                  <p
                    className={classNames(
                      commonstyles.colorBlue,
                      commonstyles.fs24,
                      commonstyles.semiBold
                    )}
                    style={{
                      margin: "0 10px",
                    }}
                  >
                    {`${totalTravelers} Traveler`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={classNames(commonstyles.flx)}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <div>
              <ContinueButton buttonText="Continue" onClick={sendDetails} />
            </div>
          </div>
        </div>
      </div>
      <Footerr />
    </div>
  );
};

export default Travelinfo;

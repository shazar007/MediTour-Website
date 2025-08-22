import classNames from "classnames";
import NavBarr from "pages/Home/HomeNavBar/NavBarr";
import bstyle from "./Booking.module.css";
import pstyle from "../../../shared/components/DonationServices/pay.module.css";
import style from "../DoctarServices/Doctor.module.css";
import commonstyles from "shared/utils/common.module.css";
import { IoIosArrowForward, IoMdArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const PharmacyBooking = () => {
  const navigate = useNavigate();
  const handlepay = () => {
    navigate(`/services/rentacar/DonationPay/`);
  };

  const inputData = [
    { label: "Name", type: "text", placeholder: "John Doe", readOnly: true },
    { label: "Age", type: "text", placeholder: "18 years old", readOnly: true },
    {
      label: "Phone number",
      type: "text",
      placeholder: "0300 1234567",
      readOnly: true,
    },
    {
      type: "text",
      placeholder: "Please Enter Identity Number",
      readOnly: false,
      style: { marginTop: "12px" },
    },
  ];
  const cartData = [
    {
      name: "Panadol CF",
      size: "1x",
      price: 250,
    },
    {
      name: "Panadol CF",
      size: "1x",
      price: 250,
    },
  ];

  return (
    <div>
      <div className={style.navIMG}>
        <NavBarr />
        <p
          className={classNames(
            commonstyles.fs48,
            commonstyles.semiBold,
            style.mianheading
          )}
        >
          Pharmacy
        </p>
        <div className={style.title}>
          <p
            className={classNames(
              commonstyles.fs16,
              commonstyles.semiBold,
              style.mianheading22
            )}
          >
            Home
          </p>
          <IoIosArrowForward
            className={classNames(commonstyles.fs16, style.mianheading)}
          />
          <p
            className={classNames(
              commonstyles.fs16,
              commonstyles.semiBold,
              style.mianheading22
            )}
          >
            Services
          </p>
          <IoIosArrowForward
            className={classNames(commonstyles.fs16, style.mianheading)}
          />
          <p
            className={classNames(
              commonstyles.fs16,
              commonstyles.semiBold,
              style.mianheading22
            )}
          >
            pharmacy
          </p>
          <IoIosArrowForward
            className={classNames(commonstyles.fs16, style.mianheading)}
          />
          <p
            className={classNames(
              commonstyles.fs16,
              commonstyles.semiBold,
              style.mianheading
            )}
          >
            Details
          </p>
        </div>
      </div>
      <div className={classNames(commonstyles.container, commonstyles.mb32)}>
        <div className={classNames(pstyle.mainprogressContainer)}>
          <div className={classNames(pstyle.progressContainer)}>
            <div className={classNames(pstyle.circleWrapper)}>
              <div className={classNames(pstyle.progressCircle1)}>1</div>
              <span className={classNames(pstyle.circleText)}>Booking</span>
            </div>

            <div className={classNames(pstyle.line)}></div>

            <div className={classNames(pstyle.circleWrapper)}>
              <div className={classNames(pstyle.progressCircle2)}>2</div>
              <span className={classNames(pstyle.circleText)}>payment</span>
            </div>
          </div>
        </div>
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
            <div className={classNames(bstyle.card)}>
              <p
                className={classNames(
                  commonstyles.colorBlue,
                  commonstyles.fs24,
                  commonstyles.semiBold
                )}
              >
                Your Info
              </p>
              {inputData.map((input, index) => (
                <div key={index}>
                  {input.label && (
                    <label className={bstyle.label}>{input.label}</label>
                  )}
                  <input
                    className={bstyle.input}
                    type={input.type}
                    placeholder={input.placeholder}
                    style={input.style || {}}
                    readOnly={input.readOnly}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            className={classNames(commonstyles.col4, commonstyles.colsm12)}
            style={{
              marginTop: "10px",
            }}
          >
            <div className={classNames(bstyle.card)}>
              <p
                className={classNames(
                  commonstyles.colorBlue,
                  commonstyles.fs24,
                  commonstyles.semiBold
                )}
              >
                Medicine Detailsils
              </p>
              {cartData.map((item, index) => (
                <div key={index}>
                  {/* Item Name and Size */}
                  <div
                    className={classNames(
                      commonstyles.flx,
                      commonstyles.flxBetween
                    )}
                  >
                    <div>
                      <p
                        className={classNames(
                          commonstyles.colorBlue,
                          commonstyles.fs16,
                          commonstyles.semiBold
                        )}
                      >
                        {item.name}
                      </p>
                      <p
                        className={classNames(
                          commonstyles.colorGray,
                          commonstyles.fs16,
                          commonstyles.Bold
                        )}
                      >
                        Size {item.size}
                      </p>
                    </div>
                    <div>
                      <p
                        className={classNames(
                          commonstyles.colorBlue,
                          commonstyles.fs16,
                          commonstyles.semiBold
                        )}
                      >
                        <span>Rs.{item.price}</span> <span>/-</span>
                      </p>
                    </div>
                  </div>

                  {/* Separator Line */}
                  <hr
                    style={{
                      margin: "1rem 0",
                      color: "#DCDCDC",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={pstyle.showMoreContainer}>
          <button className={pstyle.showMoreButton} onClick={handlepay}>
            Continue
            <span className={pstyle.icon}>
              <IoMdArrowForward />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyBooking;

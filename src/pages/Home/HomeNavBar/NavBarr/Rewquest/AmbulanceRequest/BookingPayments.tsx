import MainHeader from "shared/components/MainScreen/Index";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./BookingStyle.module.css";
import { IoMdArrowForward } from "react-icons/io";
const BookingPayments = () => {
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

  return (
    <div>
      <MainHeader
        mainHeading="Booking & Payment"
        breadcrumb={["Booking & Payment", "Request"]}
      />
      <div className={classNames(commonstyles.container, commonstyles.mb32)}>
        <div className={classNames(style.mainprogressContainer)}>
          <div className={classNames(style.progressContainer)}>
            <div className={classNames(style.circleWrapper)}>
              <div className={classNames(style.progressCircle1)}>1</div>
              <span className={classNames(style.circleText)}>Booking</span>
            </div>

            <div className={classNames(style.line)}></div>

            <div className={classNames(style.circleWrapper)}>
              <div className={classNames(style.progressCircle2)}>2</div>
              <span className={classNames(style.circleText)}>payment</span>
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
          <div className={classNames(commonstyles.col4, commonstyles.colsm12)}>
            <div>
              <p
                className={classNames(
                  commonstyles.colorBlue,
                  commonstyles.fs24,
                  commonstyles.semiBold
                )}
              >
                Customer Details
              </p>
              {inputData.map((input, index) => (
                <div key={index}>
                  {input.label && (
                    <label className={style.label}>{input.label}</label>
                  )}
                  <input
                    className={style.input}
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
          ></div>
        </div>
        <div className={style.showMoreContainer}>
          <button className={style.showMoreButton}>
            Continue
            <span className={style.icon}>
              <IoMdArrowForward />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPayments;

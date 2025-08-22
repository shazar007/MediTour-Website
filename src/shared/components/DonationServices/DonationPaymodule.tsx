import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import style from "./pay.module.css";
import { Radio } from "@mui/material";
import { IoMdArrowForward } from "react-icons/io";
import { RiVisaLine } from "react-icons/ri";

const DonationPaymodule = () => {
  const formik = useFormik({
    initialValues: {
      payment: "",
      paymentType: "",
    },
    validationSchema: Yup.object({
      payment: Yup.string().required("Payment method is required"),
      paymentType: Yup.string().required("Payment type is required"),
    }),
    onSubmit: (values) => {},
  });

  const [showMore, setShowMore] = useState(false);

  const handleShowMoreClick = async () => {
    const errors = await formik.validateForm();

    if (Object.keys(errors).length === 0) {
      setShowMore((prevShowMore) => !prevShowMore);
    }
  };

  const educationDetails = [
    {
      title: "Education for poor people",
      paymentDetails: [
        { label: "Target Audience", value: "Sindh Poor People" },
        { label: "Amount", value: "Rs. 1000" },
      ],
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classNames(commonstyle.container, commonstyle.mb32)}>
        <div className={classNames(style.mainprogressContainer)}>
          <div className={classNames(style.progressContainer)}>
            <div className={classNames(style.circleWrapper)}>
              <div className={classNames(style.progressCircle1)}>1</div>
              <span className={classNames(style.circleText)}>Booking</span>
            </div>

            <div className={classNames(style.line)}></div>

            <div className={classNames(style.circleWrapper)}>
              <div className={classNames(style.progressCircle2)}>2</div>
              <span className={classNames(style.circleText)}>Payment</span>
            </div>
          </div>
        </div>

        <div className={style.mainpayment}>
          <div>
            {educationDetails.map((education, index) => (
              <div key={index} className={style.educontainer}>
                <p className={style.title}>{education.title}</p>
                <div className={style.paymentDetails}>
                  {education.paymentDetails.map((detail, idx) => (
                    <p key={idx} className={style.subtitle}>
                      {detail.label}: {detail.value}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={style.paymentCard}>
            <div
              className={classNames(
                commonstyle.colorBlue,
                commonstyle.semiBold,
                commonstyle.fs20
              )}
            >
              Payment
            </div>

            <div>
              <div
                className={classNames(
                  commonstyle.colorBlue,
                  commonstyle.fs16,
                  commonstyle.flxBetween
                )}
              >
                <div>
                  <Radio
                    name="payment"
                    value="Pakistan"
                    checked={formik.values.payment === "Pakistan"}
                    onChange={formik.handleChange}
                  />
                  Pakistan
                </div>
                <div className={commonstyle.flxStart}>
                  <Radio
                    name="payment"
                    value="International"
                    checked={formik.values.payment === "International"}
                    onChange={formik.handleChange}
                  />
                  International
                </div>
              </div>
              {formik.touched.payment && formik.errors.payment ? (
                <div className={classNames(commonstyle.error)}>
                  *{formik.errors.payment}
                </div>
              ) : null}

              <div
                className={classNames(
                  commonstyle.colorBlue,
                  commonstyle.semiBold,
                  commonstyle.fs20
                )}
              >
                Payment Type
              </div>

              <div
                className={classNames(
                  commonstyle.colorBlue,
                  commonstyle.fs16,
                  commonstyle.flxBetween
                )}
              >
                <div>
                  <Radio
                    name="paymentType"
                    value="Full Payment"
                    checked={formik.values.paymentType === "Full Payment"}
                    onChange={formik.handleChange}
                  />
                  Full Payment
                </div>
                <div>
                  <Radio
                    name="paymentType"
                    value="Partial Payment"
                    checked={formik.values.paymentType === "Partial Payment"}
                    onChange={formik.handleChange}
                  />
                  Partial Payment
                </div>
              </div>
              {formik.touched.paymentType && formik.errors.paymentType ? (
                <div className={classNames(commonstyle.error)}>
                  *{formik.errors.paymentType}
                </div>
              ) : null}
            </div>

            <div
              className={classNames(
                commonstyle.colorBlue,
                commonstyle.fs16,
                commonstyle.flxBetween
              )}
            >
              <p>Process Amount</p>
              <p>20 Rs</p>
            </div>

            <div
              className={classNames(
                commonstyle.colorOrange,
                commonstyle.fs16,
                commonstyle.flxBetween
              )}
            >
              <p>Total Amount</p>
              <p>1620 Rs</p>
            </div>
          </div>
        </div>

        {/* Conditionally rendered content */}
        {showMore && (
          <div className={style.UserLoginmodal}>
            <div className={style.viewconatiner}>
              <div className={style.viewdata}>
                <p className={style.title}>Payment Details</p>
                <p className={style.subtitle}>
                  Enter your card information below to proceed with the payment
                </p>
              </div>

              <div className={style.inputmain}>
                <div>
                  <RiVisaLine className={style.visa} />
                </div>
                <div>
                  <input
                    type="text"
                    className={style.inputaccoumt}
                    placeholder="4848 4848 4848 4848"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className={style.inputaccoumt}
                    placeholder="MM/DD"
                    style={{
                      display: "flex",
                      textAlign: "end",
                      marginRight: "10px",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "20px 0",
                }}
              >
                <button
                  className={style.showMoreButton}
                  onClick={handleShowMoreClick}
                >
                  Pay
                  <span className={style.icon}>
                    <IoMdArrowForward />
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className={style.showMoreContainer}>
          <button
            className={style.showMoreButton}
            onClick={handleShowMoreClick}
          >
            Continue
            <span className={style.icon}>
              <IoMdArrowForward />
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default DonationPaymodule;

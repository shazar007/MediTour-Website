import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import classNames from "classnames";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
const LimitIncreasePayment = () => {
  const [count, setCount] = useState<number>(1);
  const { systemType, exchangeRate } = useSelector(
    (state: any) => state?.root?.common
  );
  const navigate = useNavigate();
  const totalPrice = count * 50;

  const location = useLocation();
  const col1 = [
    { text: "Access to a Vast Network" },
    { text: "Streamlined Operations" },
    { text: "Increased Revenue Opportunities" },
    { text: "Advanced Technology" },
  ];

  const col2 = [
    { text: "Access to a Vast Network" },
    { text: "Streamlined Operations" },
    { text: "Collaborative Opportunities" },
    { text: "Stay ahead with innovative solutions" },
  ];

  // const PKRtoUSD = USDtoPKR * exchangeRate;
  const handleActivation = (type: any) => {
    const amount =type == "individula" ? 50 : totalPrice
    const USDtoPKR = amount / exchangeRate;
    console.log(USDtoPKR, ".......USDtoPKR");
    navigate(`/${systemType}/paymentDetail`, {
      state: {
        actualAmount: USDtoPKR,
        numberOfDocs: type == "individula" ? 1 : count,
      },
    });
  };
  return (
    <div className={style.maincontainer}>
      <p className={classNames(style.Heading)}>Payment Details</p>
      <div className={classNames(style.Cardcontainer)}>
        <div className={style.card}>
          <div className={style.cardheader}>
            <p className={style.cardheading}>Add Individual</p>

            <p className={style.cardPrice}>$ 50</p>
          </div>
          <div className={style.bottomseprator}> </div>

          <div className={style.columndivider}>
            <div className={classNames(style.column1)}>
              <div className={style.columncontainer}>
                {col1.map((item, index) => (
                  <div key={index} className={style.columndata}>
                    <TiTick size={20} color="#13A89E" />
                    <p className={style.textdata}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={classNames(style.column2)}>
              <div className={style.columncontainer}>
                {col2.map((item, index) => (
                  <div key={index} className={style.columndata}>
                    <TiTick size={20} color="#13A89E" />
                    <p className={style.textdata}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={classNames(style.column3)}>
              <div
                style={{
                  display: "flex",
                  flexGrow: "1",
                  justifyContent: "center",
                  marginTop: "16%",
                }}
              >
                <button
                  className={style.Paybutton}
                  onClick={() => handleActivation("individula")}
                >
                  {" "}
                  Pay{" "}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={style.card}>
          <div className={style.cardheader}>
            <p className={style.cardheading}>Make your own group</p>

            <p className={style.cardPrice}>$ {totalPrice}</p>
          </div>
          <div className={style.bottomseprator}> </div>

          <div className={style.columndivider}>
            <div className={classNames(style.column1)}>
              <div className={style.columncontainer}>
                {col1.map((item, index) => (
                  <div key={index} className={style.columndata}>
                    <TiTick size={20} color="#13A89E" />
                    <p className={style.textdata}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={classNames(style.column2)}>
              <div className={style.columncontainer}>
                {col2.map((item, index) => (
                  <div key={index} className={style.columndata}>
                    <TiTick size={20} color="#13A89E" />
                    <p className={style.textdata}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={classNames(style.column3)}>
              <div className={style.col3data}>
                <p
                  className={style.textdata}
                  style={{
                    marginBottom: "16px",
                    textAlign: "center",
                  }}
                >
                  Select numbers of doctors
                </p>

                <div className={style.incrementcontainer}>
                  <button
                    className={style.circleButton}
                    onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
                  >
                    -
                  </button>
                  <span className={style.value}>{count}</span>
                  <button
                    className={style.circleButton}
                    onClick={() => setCount((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexGrow: "1",
                    alignItems: "flex-end",
                  }}
                >
                  <button
                    className={style.Paybutton}
                    onClick={() => handleActivation("multiple")}
                  >
                    {" "}
                    Pay{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitIncreasePayment;

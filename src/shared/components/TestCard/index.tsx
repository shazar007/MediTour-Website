import React, { useState } from "react";
import style from "./testcard.module.css";
import classNames from "classnames";
import commonStyle from "shared/utils/common.module.css";

const TestCard = ({
  item,
  selectedCards,
  onPress,
  serviceName,
}: {
  item: any;
  selectedCards?: any;
  onPress?: any;
  serviceName?: any;
}) => {
  return (
    <div className={style.cardContainer}>
      {item?.map((card: any, index: any) => {
        return (
          <div
            key={index}
            className={classNames(style.dcard, {
              [style.selected]: selectedCards?.includes(card),
            })}
            onClick={() => onPress && onPress(card)}
          >
            <div className={style.dtext}>
              <p
                className={classNames(
                  commonStyle.fs24,
                  commonStyle.colorBlue,
                  commonStyle.semiBold
                )}
              >
                {`${card?.testNameId?.name || card?.medicineName} ${
                  card?.testCode || ""
                }`}
              </p>

              <p
                className={classNames(commonStyle.fs14, commonStyle.colorGray)}
              >
                {card?.testDescription || `quantity: ${card?.quantity}`}
              </p>

              {serviceName == "labTestPharmacy" ? null : (
                <p
                  className={classNames(
                    commonStyle.fs14,
                    commonStyle.colorBlue
                  )}
                >
                  {card?.userAmount} PKR
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestCard;

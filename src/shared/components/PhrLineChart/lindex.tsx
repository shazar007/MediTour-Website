import React, { FC } from "react";
import commonstyle from "shared/utils/common.module.css";
import { GoDotFill } from "react-icons/go";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import style from "./phrlinechart.module.css";
import { useTranslation } from "react-i18next";

interface DataItem {
  name: string;
  value1: number;
  value2: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

interface CustomLineChartDonationProps {
  data: DataItem[];
}

const PhrLineChart: FC<CustomLineChartDonationProps> = ({ data }) => {
  const { t }: any = useTranslation();
  const CustomTooltip: FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      const date = label;
      const value1 = payload[0].payload.value1;
      const value2 = payload[0].payload.value2;

      return (
        <div style={{ padding: "20px" }} className={style.customTooltip}>
          <div>
            <p className={style.value}>{`${t("currentWeek")} : ${value1}`}</p>
            <p className={style.value}>{`${t("previousWeek")} : ${value2}`}</p>
          </div>
        </div>
      );
    }
    return null;
  };
  const values = data.flatMap((item) => [item.value1, item.value2]);
  const minYValue = Math.min(...values);
  const maxYValue = Math.max(...values);

  return (
    <div>
      <div
        style={{ marginBottom: "24px", padding: "0 40px" }}
        className={commonstyle.flx}
      >
        <p style={{ color: "#00276d", fontSize: "20px", fontWeight: "700" }}>
          {t("totalUsers")}
        </p>
        <p
          style={{
            color: " rgba(0, 39, 109, 0.4)",
            fontSize: "16px",
            fontWeight: "700",
            marginLeft: "16px",
          }}
        >
          {t("medicines")}
        </p>
        <p
          style={{
            color: " rgba(0, 39, 109, 0.4)",
            fontSize: "20px",
            fontWeight: "700",
            margin: "0 24px",
          }}
        >
          |
        </p>

        <div style={{ display: "flex", alignItems: "center" }}>
          <GoDotFill className={style.iconss} />
          <p
            style={{
              color: "#099BED",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            {t("currentWeek")}
          </p>
        </div>
        <div className={commonstyle.flx}>
          <GoDotFill className={style.iconss2} />
          <p
            style={{
              color: "#a8d1e9",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            {t("previousWeek")}
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDashoffset="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />

          {/* First Line */}
          <Line
            strokeWidth={4}
            type="monotone"
            dataKey="value1"
            stroke="#099BED"
            activeDot={{ r: 8, stroke: "#a8d1e9", fill: "#099BED" }}
            dot={{ r: 5, stroke: "#a8d1e9", fill: "#099BED" }}
          />

          {/* Second Line */}
          <Line
            strokeWidth={4}
            type="monotone"
            dataKey="value2"
            stroke="#A8C5DA"
            activeDot={{ r: 8, stroke: "#099BED", fill: "#a8d1e9" }}
            dot={{ r: 5, stroke: "#099BED", fill: "#a8d1e9" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PhrLineChart;

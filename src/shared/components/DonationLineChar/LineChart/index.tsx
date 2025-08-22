import React, { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import style from "./DonationChart.module.css";
import { useTranslation } from "react-i18next";

// Define types for data and tooltip
interface DataItem {
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

interface CustomLineChartDonationProps {
  data: DataItem[];
}

const CustomLineChartDonation: FC<CustomLineChartDonationProps> = ({
  data,
}) => {
  const CustomTooltip: FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    const { t }: any = useTranslation();

    if (active && payload && payload.length) {
      const date = label; // Assuming 'label' contains the date value
      const value = payload[0].value; // Extracting the value
      return (
        <div className={style.customTooltip}>
          <div>
            <p className={style.date}>Jan 08, 2024</p>
          </div>
          <div className={style.flx}>
            <p
              style={{
                color: "#00276d",
                fontWeight: "700",
                marginRight: "24px",
              }}
            >
              {t("donation")}
            </p>
            <p className={style.value}>{`${value}`}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={275}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid
          strokeDashoffset="3 3"
          vertical={false}
          stroke="#E3E3E3"
        />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis domain={[0, 16000]} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          strokeWidth={3}
          type="monotone"
          dataKey="value"
          stroke="#FEA6B0"
          activeDot={{ r: 10, stroke: "white", fill: "#A7AEFF" }}
          dot={{ r: 5, stroke: "#A7AEFF", fill: "#A7AEFF" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChartDonation;

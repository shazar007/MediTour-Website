import React, { FC } from "react";
import commonstyle from "shared/utils/common.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import style from "./travelchart.module.css";
import { useTranslation } from "react-i18next";

// Define types for data and tooltip
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

const TravelLineChart: FC<CustomLineChartDonationProps> = ({ data }) => {
  const { t }: any = useTranslation();
  const CustomTooltip: FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      const value1 = payload[0].payload.value1;
      const value2 = payload[0].payload.value2;

      return (
        <div className={style.customTooltip}>
          <div>
            <p className={style.Flights}>{value1}</p>
          </div>
          <div>
            <p className={style.Tourists}>{value2}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }} className={commonstyle.flx}>
        <p style={{ color: "#00276d", fontSize: "20px", fontWeight: "600" }}>
          {" "}
          {t("overallRevenue")}
        </p>
      </div>
      <ResponsiveContainer width="96%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid
            strokeDashoffset="3 3"
            stroke="#F8F8F9"
            vertical={false}
          />
          {/* First Line */}
          <Line
            strokeWidth={4}
            type="monotone"
            dataKey="value1"
            stroke="#8CB7A3"
            activeDot={{ r: 6, stroke: "#8CB7A3", fill: "#8CB7A3" }}
            dot={false}
          />

          {/* Second Line */}
          <Line
            strokeWidth={4}
            type="monotone"
            dataKey="value2"
            stroke="#4D4E8D"
            activeDot={{ r: 6, stroke: "#4D4E8D", fill: "#4D4E8D" }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <Legend />
    </div>
  );
};

export default TravelLineChart;

import React from "react";
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
import style from "./Stackchart.module.css";
import { useTranslation } from "react-i18next";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

interface Props {
  data2: { name: string; PreviousCustomer: number; NewCustomer: number }[];
}

const InsuranceLineChart: React.FC<Props> = ({ data2 }) => {
  const { t }: any = useTranslation();

  const renderCustomTooltip = ({
    active,
    payload,
    label,
  }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className={style.customtooltip}>
          <p
            style={{ fontSize: "18px", textAlign: "center" }}
          >{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index}>{`${entry.name}:  ${entry.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "16px",
        }}
      >
        {t("customer")}
      </p>
      <ResponsiveContainer width="97%" height={200}>
        <LineChart data={data2}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <CartesianGrid
            strokeDashoffset="3 3"
            vertical={false}
            stroke="#F8F8F9"
          />
          <Tooltip content={renderCustomTooltip} />
          <Line
            strokeWidth={6}
            type="monotone"
            dataKey="PreviousCustomer"
            stroke="#0095FF"
            dot={false}
            activeDot={{ r: 7, stroke: "#0095FF", fill: "#0095FF" }}
          />
          <Line
            strokeWidth={6}
            type="monotone"
            dataKey="NewCustomer"
            dot={false}
            activeDot={{ r: 7, stroke: "#3CD856", fill: "#3CD856" }}
            stroke="#3CD856"
          />
          <Legend height={25} iconSize={25} margin={{ top: 100 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InsuranceLineChart;

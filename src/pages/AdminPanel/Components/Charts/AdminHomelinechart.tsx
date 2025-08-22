import React, { Component } from "react";
import commonStyles from "shared/utils/common.module.css";
import { GoDotFill } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

const data = [
  { name: "Jan", value1: 800, value2: 500 },
  { name: "Feb", value1: 300, value2: 400 },
  { name: "Mar", value1: 3400, value2: 1950 },
  { name: "Apr", value1: 750, value2: 1830 },
  { name: "May", value1: 1000, value2: 1070 },
  { name: "Jun", value1: 1360, value2: 1435 },
  // ... (other data points)
];

class AdminHomelinechart extends Component {
  renderCustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            fontFamily: '"Poppins", sans-serif',
            boxSizing: "border-box",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              textAlign: "center",
              fontWeight: "600",
              fontFamily: '"Poppins", sans-serif',
            }}
          >{` ${label} : 2024`}</p>
          {payload.map((entry, index) => (
            <span
              style={{
                flexDirection: "row",
                fontSize: "14px",
                fontWeight: "600",
                fontFamily: '"Poppins", sans-serif',
                color: entry.dataKey === "value1" ? "#ee7e37" : "#00276d",
                margin: "8px",
              }}
              key={index}
            >
              {entry.value > 1000
                ? `${(entry.value / 1000).toFixed(1)}k`
                : entry.value}
            </span>
          ))}
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className={commonStyles.flx} style={{ marginBottom: "16px" }}>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              Total Visitor
            </p>
            <div className={commonStyles.flx}>
              <GoDotFill
                style={{
                  color: "#ee7e37",
                  fontSize: "24px",
                  marginLeft: "100px",
                }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  fontFamily: '"Poppins", sans-serif',
                  color: "#ee7e37",
                }}
              >
                Last Month
              </p>
            </div>
            <div className={commonStyles.flx}>
              <GoDotFill
                style={{
                  color: "#0E54A3",
                  fontSize: "24px",
                  marginLeft: "32px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#0E54A3",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Current Month
              </p>
            </div>
          </div>
          <div className={commonStyles.flx} style={{ marginBottom: "10px" }}>
            <IoIosArrowBack style={{ marginRight: "16px", fontSize: "20px" }} />
            <IoIosArrowForward style={{ fontSize: "20px" }} />
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="value1Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF8A02" stopOpacity={0.5} />
                <stop offset="0%" stopColor="#FF8A02" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="value2Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="25%" stopColor="#0D47A1" stopOpacity={0.5} />
                <stop offset="75%" stopColor="#0D47A1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip content={this.renderCustomTooltip} />
            <Area
              strokeWidth={5}
              type="monotone"
              dataKey="value1"
              stroke="#FF8A02"
              fill="url(#value1Gradient)"
              activeDot={{ r: 7, stroke: "white", fill: "#FF8A02" }}
              fontFamily='"Poppins", sans-serif'
            />

            <Area
              strokeWidth={5}
              type="monotone"
              dataKey="value2"
              stroke="#0D47A1"
              fill="url(#value2Gradient)"
              fontFamily='"Poppins", sans-serif'
              activeDot={{ r: 7, stroke: "white", fill: "#0D47A1" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default AdminHomelinechart;

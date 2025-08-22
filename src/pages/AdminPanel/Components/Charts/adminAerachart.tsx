import React, { Component } from "react";
import commonStyles from "shared/utils/common.module.css";
import { GoDotFill } from "react-icons/go";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
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

class AdminAerachart extends Component {
  formatYAxis = (value: number, index: number) => {
    if (value >= 1000) {
      return `${value / 1000}k`;
    }
    return value.toString(); // Ensure the return type is always string
  };

  renderCustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          {payload.map((entry, index) => (
            <p
              style={{
                fontSize: "14px",
                fontWeight: "600",
                fontFamily: '"Poppins", sans-serif',
                color: entry.dataKey === "value1" ? "#FF5B5B" : "#0E54A3",
              }}
              key={index}
            >
              {entry.value}
            </p>
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
          fontFamily: '"Poppins", sans-serif',
          padding: "24px",
          borderRadius: "24px",
          boxSizing: "border-box",
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
              Total Revenue
            </p>
            <div className={commonStyles.flx}>
              <GoDotFill
                style={{
                  color: "#FF5B5B",
                  fontSize: "24px",
                  marginLeft: "100px",
                }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  fontFamily: '"Poppins", sans-serif',
                  color: "#FF5B5B",
                }}
              >
                Last 6 Months
              </p>
            </div>
            <div className={commonStyles.flx}>
              <GoDotFill
                style={{
                  color: "#0D47A1",
                  fontSize: "24px",
                  marginLeft: "32px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#0D47A1",
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
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <CartesianGrid
              strokeDashoffset="3 3"
              vertical={false}
              stroke="#EAEAEA"
            />
            <Tooltip content={this.renderCustomTooltip} />
            <Line
              dot={false}
              strokeWidth={5}
              type="monotone"
              dataKey="value1"
              stroke="#FF5B5B"
              activeDot={{ r: 7, stroke: "white", fill: "#FF5B5B" }}
            />

            <Line
              dot={false}
              strokeWidth={5}
              type="monotone"
              dataKey="value2"
              stroke="#0D47A1"
              activeDot={{ r: 7, stroke: "white", fill: "#0D47A1" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default AdminAerachart;

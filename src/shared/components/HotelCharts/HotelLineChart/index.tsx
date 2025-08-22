import React, { Component } from "react";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
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
import style from "./hotelLineChart.module.css";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}

interface HotelLineChartProps {
  data: { name: string; Booked: number; Visited: number }[];
  booked?: number;
  visited?: number;
}

class HotelLineChart extends Component<HotelLineChartProps> {
  renderCustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className={style.customtooltip}>
          {payload.map((entry, index) => (
            <p key={index}>{`${entry.name}:  ${entry.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  render() {
    const { data, booked, visited } = this.props;
    const lastDataPoint = data[data.length - 1];
    return (
      <div>
        <div
          style={{ margin: "24px 0" }}
          className={classNames(
            commonstyles.flx,
            commonstyles.fs16,
            commonstyles.semiBold
          )}
        >
          <div style={{ textAlign: "center" }}>
            {" "}
            <p>Booked</p>
            <p style={{ color: "#FB3692" }}>{booked}</p>
          </div>
          <div style={{ margin: "0 16px", textAlign: "center" }}>
            <p>Visited</p>
            <p style={{ color: "#599DFC" }}>{visited}</p>
          </div>
          {/* <div style={{ textAlign: "center" }}>
            <p>Performance</p>
            <p style={{ color: "#21CA5F" }}>+ 20.9%</p>
          </div> */}
        </div>
        <ResponsiveContainer width="97%" height={260}>
          <LineChart data={data}>
            <XAxis dataKey="name" axisLine={false} />
            <YAxis axisLine={false} />
            <CartesianGrid
              strokeDashoffset="3 3"
              vertical={false}
              stroke="rgba(70, 78, 95, 0.04)"
            />

            <Tooltip content={this.renderCustomTooltip} />
            <Line
              strokeWidth={4}
              type="monotone"
              dataKey="Booked"
              stroke="#FB3692"
              dot={false}
              activeDot={{ r: 5, stroke: "#FB3692", fill: "white" }}
            />
            <Line
              strokeWidth={4}
              type="monotone"
              dataKey="Visited"
              dot={false}
              activeDot={{ r: 5, stroke: "#599DFC", fill: "white" }}
              stroke="#599DFC"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default HotelLineChart;

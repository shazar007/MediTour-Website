import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import Style from "./hotelPie.module.css";

const data = [
  { name: "Check In", value: 250 },
  { name: "Check Out", value: 300 },
  { name: "Booked", value: 400 },
];

const COLORS = ["#00276D", "#599DFC", "#FB3692"];

const HotelPieChart: React.FC = () => {
  const total = data.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <ResponsiveContainer width="100%" height={190}>
      <PieChart>
        <Label content={<h4>My label here</h4>} position="center" />
        <Pie
          data={data}
          cx={85}
          cy={92}
          innerRadius={55}
          outerRadius={85}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Legend
          content={
            <ul
              style={{
                padding: 0,
                textAlign: "center",
                position: "absolute",
                bottom: "50px",
                left: "66%",
              }}
            >
              {data.map((entry, index) => (
                <div className={Style.lists} key={`item-${index}`}>
                  <li
                    style={{
                      color: COLORS[index % COLORS.length],
                      textAlign: "start",
                    }}
                  >
                    {entry.name}
                  </li>
                </div>
              ))}
            </ul>
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default HotelPieChart;

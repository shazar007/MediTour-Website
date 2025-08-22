import React from "react";
import { GoDotFill } from "react-icons/go";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataItem {
  name: string;
  Flights: number;
  Tourists: number;
}

interface TravelBarChartProps {
  data2: DataItem[];
  totalrevenue: any;
  flightPayments: any;
  tourPayments: any;
}

const TravelBarChart: React.FC<TravelBarChartProps> = ({
  data2,
  totalrevenue,
  flightPayments,
  tourPayments,
}) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
          color: "#00276d",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "600" }}>
          Last week Revenue{" "}
        </p>
        <p style={{ fontSize: "20px", fontWeight: "600", marginLeft: "auto" }}>
          {totalrevenue}
        </p>
      </div>
      <ResponsiveContainer width="96%" height={200}>
        <BarChart data={data2}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Bar dataKey="Flights" fill="#8CB7A3" barSize={10} />
          <Bar dataKey="Tourists" fill="#4D4E8D" barSize={10} />
          <Legend iconType="circle" />
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          borderTop: "1px solid #EDF2F6",
          display: "flex",
          justifyContent: "center",
          paddingTop: "16px",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <GoDotFill
              style={{
                marginRight: "8px",
                color: "#0095FF",
                fontSize: "16px",
              }}
            />
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#96A5B8",
              }}
            >
              {" "}
              Flight
            </p>
          </div>{" "}
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {flightPayments}
          </p>
        </div>
        <div
          style={{
            borderLeft: "1px solid #EDF2F6",
            width: "50%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GoDotFill
              style={{
                marginRight: "8px",
                color: "#07E098",
                fontSize: "16px",
              }}
            />

            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#96A5B8",
              }}
            >
              Tour
            </p>
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {tourPayments}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelBarChart;

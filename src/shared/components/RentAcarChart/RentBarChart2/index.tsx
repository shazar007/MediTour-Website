import { Component } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";

interface Props {
  data3: { name1: string; Profit: number }[];
  t: any;
}

class RentAcarBarChart extends Component<Props> {
  render() {
    const { data3, t } = this.props;

    return (
      <div>
        <div style={{ borderBottom: "2px solid #E4E5E7", marginBottom: "8px" }}>
          <p
            style={{ marginBottom: "8px", color: "#131313" }}
            className={classNames(commonstyle.fs16, commonstyle.semiBold)}
          >
            {t("totalCustomer")}
          </p>
        </div>
        <ResponsiveContainer width="93%" height={205}>
          <BarChart data={data3} stackOffset="sign" barCategoryGap={16}>
            <XAxis dataKey="name1" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Bar
              dataKey="Profit"
              stackId="b"
              fill="#1B59F8"
              barSize={15}
              radius={[16, 16, 16, 16]}
              background={{ fill: "#F2F7FF", radius: "16" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default RentAcarBarChart;

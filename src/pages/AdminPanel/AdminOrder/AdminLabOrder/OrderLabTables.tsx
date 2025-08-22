import React from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "../adminorder.module.css";
import { useNavigate } from "react-router-dom";
import { AdminTable } from "shared/components";

const titles = [
  { id: 1, title: "SUBMITTED AT" },
  { id: 2, title: "ORDER ID" },
  { id: 3, title: "MR NO." },
  { id: 4, title: "PATIENT NAME" },
  { id: 5, title: "LAB ID" },
  { id: 6, title: "LAB NAME" },
  { id: 7, title: "TOTAL AMOUNT" },
  { id: 8, title: "STATUS" },
];
interface Props {
  Data: any;
}
const OrderLabTables = (props: Partial<Props>) => {
  const { Data } = props;
  const navigate = useNavigate();
  const handleGoToDetail = (val: any) => {
    navigate("/admin/Orders/LabOrder/Detail", { state: val });
  };

  return (
    <div>
      <AdminTable
        titles={titles}
        data={Data}
        handleGoToDetail={handleGoToDetail}
        headerWidth={"14.66%"}
        itemWidth={"12.66%"}
      />
    </div>
  );
};
export default OrderLabTables;

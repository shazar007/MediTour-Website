import React from "react";
import { useNavigate } from "react-router-dom";
import { AdminTable } from "shared/components";
const titles = [
  { id: 1, title: "SUBMITTED AT" },
  { id: 2, title: "ORDER ID" },
  { id: 3, title: "MR NO." },
  { id: 4, title: "PATIENT NAME" },
  { id: 5, title: "PH ID" },
  { id: 6, title: "PH NAME" },
  { id: 7, title: "TOTAL AMOUNT" },
  { id: 8, title: "STATUS" },
];
interface Props {
  Data: any;
}
const OrderPharmacyTables = (props: Partial<Props>) => {
  const { Data } = props;
  const navigate = useNavigate();
  const handleGoToDetail = (index: any) => {
    const result = Data.map((v: any, i: any) => {
      if (i == index) {
        return v;
      }
    });

    navigate("/admin/Orders/PharmacyOrder/Detail", { state: result[0] });
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
export default OrderPharmacyTables;

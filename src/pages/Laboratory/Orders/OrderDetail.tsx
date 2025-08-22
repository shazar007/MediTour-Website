import { useEffect, useState } from "react";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getOrderDetails } from "shared/services";
import { Order_Details } from "shared/components";
import { useTranslation } from "react-i18next";

export default function OrderDetail() {
  const { t }: any = useTranslation();
  const [orderdetail, setOrderdetail] = useState<any>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [tableData, setTableData] = useState<any>([]);
  const handleGoToBack = () => {
    navigate("/laboratory/order");
  };
  const orderDetail = () => {
    if (id === undefined) {
      console.error("ID is undefined");
      return;
    }
    if (id) {
      getOrderDetails(id)
        .then((res: any) => {
          let orders = res?.data?.order;
          let tempData: any = [];

          setOrderdetail(orders);
          const itemIds = orders.items.map((v: any, item: any) => {
            tempData.push([
              v?.itemId?.testCode,
              v?.itemId?.testNameId?.name,
              v?.itemId?.price,
              v?.itemId?.discount,
              v?.itemId?.userAmount,
            ]);
          });

          setTableData(itemIds);
        })

        .catch((err: any) => {});
    } else {
      console.error("id is undefined");
    }
  };

  useEffect(() => {
    orderDetail();
  }, []);

  return (
    <div className={classNames(commonstyles.col12)}>
      <Order_Details
        tableData={tableData}
        data={orderdetail}
        handleGoToBack={handleGoToBack}
        title={t("order")}
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getOrderDetails } from "shared/services";
import { Order_Details } from "shared/components";
import { useTranslation } from "react-i18next";
interface OrderDetails {
  currentLocation: any;
  testCode: number;
  MR_NO: string;
  customerName: string;
  orderId: string;
  updatedAt: string;
  _id: string;
}

export default function ResultDetail() {
  const { t }: any = useTranslation();
  const [orderdetail, setOrderdetail] = useState<OrderDetails | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleGoToBack = () => {
    navigate("/laboratory/Result");
  };

  const orderDetail = () => {
    if (id === undefined) {
      console.error("ID is undefined");
      return;
    }
    if (id) {
      //

      getOrderDetails(id)
        .then((res: any) => {
          setOrderdetail(res.data.order);
        })

        .catch((err: any) => {})
        .finally(() => {});
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
        data={orderdetail}
        handleGoToBack={handleGoToBack}
        title={t("result")}
      />
    </div>
  );
}

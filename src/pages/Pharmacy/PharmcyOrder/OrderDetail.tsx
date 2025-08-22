import styles from "./order.module.css";
import commonstyles from "shared/utils/common.module.css";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { PharmacyGetOrderDetail } from "shared/services";
import TableNew from "shared/components/A_New_Components/Table_new";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export default function PharOrderDetail() {
  const { t, i18n }: any = useTranslation();
  const location = useLocation();
  const { state } = location;
  const id = state?._id;
  const MedTitles = [t("_name"), t("strength"), t("noOfItems"), t("amount")];

  const { data } = useQuery({
    queryKey: ["PhrOrderDetail", id],
    queryFn: () => PharmacyGetOrderDetail(id),
    staleTime: 5 * 60 * 1000,
  });

  let PhrOrderDetails = data?.data?.order?.medicineIds;
  let tableData: any = [];
  PhrOrderDetails?.map((v: any, ind: any) => {
    let item = v?.id;
    tableData.push([
      item?.productName,
      item?.strength,
      v?.quantity,
      item?.mrpPrice,
    ]);
  });

  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyles.pl36
          : commonstyles.pr36
      }
    >
      <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
        {t("orderDetails")}
      </p>
      <div className={classNames(styles.outerContainerDetails)}>
        <div>
          <p className={styles.heading}>{t("allMedicines")}</p>
          <TableNew
            titles={MedTitles}
            data={tableData}
            headerWidth="20%"
            itemWidth="20%"
            show="default"
            height="49.6vh"
          />{" "}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div className={styles.TotalAmount}>
            <p className={styles.heading}>{t("totalAmount")}: </p>
            <p className={styles.Amount}>Rs. {state?.totalAmount}</p>
          </div>
          {state?.gatewayName === "stripe" && (
            <div className={styles.TotalAmount}>
              <p className={styles.heading}>{t("totalAmountInDollar")}:</p>
              <p className={styles.Amount}>${state?.dollarAmount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

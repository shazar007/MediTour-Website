import classNames from "classnames";
import Styles from "./styles.module.css";
import { CgCloseR } from "react-icons/cg";
import { useTranslation } from "react-i18next";

export const Medicine_Table = (props: any) => {
  const { t }: any = useTranslation();
  const { data, type, handleDelete } = props;

  const headers =
    type === "Bid"
      ? [
          t("_name"),
          t("dosage"),
          t("instruction"),
          t("Frequency"),
          t("quantity"),
          t("route"),
          t("availability"),
        ]
      : ["Name", "Strength", "Items", "Amount"];

  const renderRow = (val: any, rowIndex: number) => {
    if (type === "Bid") {
      let value = val?.id ? val?.id : val;
      return (
        <tr className={Styles.tableRow} key={rowIndex}>
          <td
            style={{ padding: "0px" }}
            className={classNames(Styles.value, Styles.w14)}
          >
            {value?.medicineName}
          </td>
          <td
            style={{ padding: "0px" }}
            className={classNames(Styles.value, Styles.w14)}
          >
            {value?.dosage}
          </td>
          <td
            style={{ padding: "0px" }}
            className={classNames(Styles.value, Styles.w14)}
          >
            {value?.instruction}
          </td>
          <td
            style={{ padding: "0px" }}
            className={classNames(Styles.value, Styles.w14)}
          >
            {value?.frequency}
          </td>
          <td
            style={{ padding: "0px" }}
            className={classNames(Styles.value, Styles.w14)}
          >
            {value?.quantity}
          </td>
          <td
            style={{ padding: "0px" }}
            className={classNames(Styles.value, Styles.w14)}
          >
            {value?.route}
          </td>
          <td
            style={{ padding: "0px" }}
            className={classNames(Styles.value, Styles.w14)}
          >
            <CgCloseR
              className={Styles.deleteIcon}
              onClick={() => handleDelete(rowIndex)}
            />
          </td>
        </tr>
      );
    } else {
      return (
        <tr className={Styles.tableRow} key={rowIndex}>
          <td
            style={{ padding: "0px" }}
            className={classNames(Styles.value, Styles.w14)}
          >
            {val?.id?.productName}
          </td>
          <td
            style={{ padding: "0px" }}
            className={classNames(Styles.value, Styles.w14)}
          >
            {val?.id?.strength}
          </td>
          <td
            style={{ padding: "0px" }}
            className={classNames(Styles.value, Styles.w14)}
          >
            {val?.quantity}
          </td>
          <td
            style={{ padding: "0px" }}
            className={classNames(Styles.value, Styles.w14)}
          >
            {val?.id?.tpPrice}
          </td>
        </tr>
      );
    }
  };

  return (
    <div className={Styles.payment}>
      <div className={classNames(Styles.headerOuter)}>
        {headers.map((header, index) => (
          <p key={index} className={classNames(Styles.title, Styles.w14)}>
            {header}
          </p>
        ))}
      </div>
      <div className={Styles.tableData}>
        <table
          style={{
            margin: "0px",
          }}
        >
          <tbody className={Styles.wapper}>
            {data?.map((val: any, rowIndex: number) =>
              renderRow(val, rowIndex)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medicine_Table;

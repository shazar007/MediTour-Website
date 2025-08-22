import classNames from "classnames";
import Styles from "./Pharmacy.module.css";
import { useNavigate } from "react-router-dom";
import commonStyles from "shared/utils/common.module.css";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";

const data = [
  {
    PAYMENTAT: "4 Feb 2019 05:30 PM",
    ORDERid: "KL02365",
    MRNo: "56489",
    USERNAME: "Zubair Ahmed",
    LABNAME: "PC Hotel Lahore",
    TOTALPAYMENTS: "Zubair Ahmed",
    STATUS: "Pending",
  },
  {
    PAYMENTAT: "4 Feb 2019 05:30 PM",
    ORDERid: "KL02365",
    MRNo: "56489",
    USERNAME: "Zubair Ahmed",
    LABNAME: "PC Hotel Lahore",
    TOTALPAYMENTS: "Zubair Ahmed",
    STATUS: "Pending",
  },
  {
    PAYMENTAT: "4 Feb 2019 05:30 PM",
    ORDERid: "KL02365",
    MRNo: "56489",
    USERNAME: "Zubair Ahmed",
    LABNAME: "PC Hotel Lahore",
    TOTALPAYMENTS: "Zubair Ahmed",
    STATUS: "COMPLETE",
  },
  {
    PAYMENTAT: "4 Feb 2019 05:30 PM",
    ORDERid: "KL02365",
    MRNo: "56489",
    USERNAME: "Zubair Ahmed",
    LABNAME: "PC Hotel Lahore",
    TOTALPAYMENTS: "Zubair Ahmed",
    STATUS: "Pending",
  },
];
interface Props {
  Data: any;
  handleSelect?: any;
  selectedItems?: any;
}
const PharmacyPayments = (props: Partial<Props>) => {
  const { Data, handleSelect, selectedItems } = props;
  const navigate = useNavigate();
  const handleGoToDetail = (index: any) => {
    const result = Data.map((v: any, i: any) => {
      if (i == index) {
        return v;
      }
    });

    navigate("/admin/Payments/PaymentOrder/PharmacyDetails", {
      state: result[0],
    });
  };

  return (
    <div className={Styles.payment}>
      <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
        <td className={Styles.headerclassCheck}></td>
        <p className={Styles.headerclass}>PAYMENT AT</p>
        <p className={Styles.headerclass}>ORDER ID</p>
        <p className={Styles.headerclass}>MR NO.</p>
        <p className={Styles.headerclass}>USER NAME</p>
        <p className={Styles.headerclass}>VENDOR NAME</p>
        <p className={Styles.headerclass}>TOTAL PAYMENTS</p>
        <p className={Styles.headerclass}>STATUS</p>
      </div>
      <div className={Styles.tableData}>
        <table
          style={{
            margin: "0px",
            borderCollapse: "separate",
            borderSpacing: "0 4px",
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          <tbody className={Styles.wapper}>
            {Data.map((val: any, key: any) => {
              const Date = dayjs(val?.createdAt).format("MM-DD-YYYY,  h:mm a");
              return (
                <tr
                  className={Styles.tableRow}
                  key={key}
                  onClick={() => handleGoToDetail(key)}
                >
                  <td
                    className={Styles.w5}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Checkbox
                      sx={{
                        padding: "0px",
                        "&.Mui-checked": {
                          color: "#0D47A1",
                        },
                      }}
                      onChange={() => handleSelect(val)}
                      checked={
                        selectedItems.some((item: any) => item._id === val._id)
                          ? true
                          : false
                      }
                    />
                  </td>
                  <td className={Styles.w20}>{Date}</td>
                  <td className={Styles.w20}>{val?.orderId}</td>
                  <td className={Styles.w20}>{val?.userId?.mrNo}</td>
                  <td className={Styles.w20}>{val?.userId?.name}</td>
                  <td className={Styles.w20}>{val?.name}</td>
                  <td className={Styles.w20}>{val?.vendorId?.totalAmount}</td>
                  <td className={Styles.w20}>
                    <p
                      className={classNames(Styles.statusComp, {
                        [Styles.statusProcessingText]:
                          val?.status === "inProcess",
                        [Styles.statusPendingText]:
                          val?.status.toLowerCase() === "pending",
                      })}
                    >
                      {val?.status}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PharmacyPayments;

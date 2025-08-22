import classNames from "classnames";
import Styles from "./hotelPayment.module.css";
import { useNavigate } from "react-router-dom";
import commonStyles from "shared/utils/common.module.css";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
interface Props {
  Data: any;
}
const HotelPayemts = (props: Partial<Props>) => {
  const { Data } = props;
  const navigate = useNavigate();
  const handleGoToDetailTABLE = (index: any) => {
    const result = Data.map((v: any, i: any) => {
      if (i == index) {
        return v;
      }
    });

    navigate("/admin/Payments/Hotel/Details", {
      state: result[0],
    });
  };
  return (
    <div className={Styles.payment}>
      <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
        <td className={Styles.headerclassCheck}></td>
        <p className={Styles.headerclass}>SUBMITTED AT</p>
        <p className={Styles.headerclass}>MR No.</p>
        <p className={Styles.headerclass}>GUEST NAME</p>
        <p className={Styles.headerclass}>VENDOR NAME</p>
        <p className={Styles.headerclass}>CHECK IN</p>{" "}
        <p className={Styles.headerclass}>TOTAL PAYMENTS</p>
        <p className={Styles.headerclass}>REQUEST STATUS</p>
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
              const ChickIn = dayjs(val?.arrivalTime?.from).format(
                " MM-DD-YYYY"
              );

              return (
                <tr
                  className={Styles.tableRow}
                  key={key}
                  onClick={() => handleGoToDetailTABLE(key)}
                >
                  {" "}
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
                    />
                  </td>
                  <td className={Styles.w20}>{Date}</td>
                  <td className={Styles.w20}>{val?.userId?.mrNo}</td>
                  <td className={Styles.w20}>{val?.userId?.name}</td>
                  <td className={Styles.w20}>{val?.hotelId?.name}</td>
                  <td className={Styles.w20}>{ChickIn}</td>
                  <td className={Styles.w20}>{val?.totalAmount}</td>
                  <td className={Styles.w20}>
                    <p
                      className={classNames(Styles.statusComp, {
                        [Styles.statusPendingText]:
                          val?.status?.toLowerCase() === "pending",
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
export default HotelPayemts;

import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "../adminbooking.module.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface Props {
  Data?: any;
}
const AdHoteltable = (props: Partial<Props>) => {
  const { Data } = props;
  const navigate = useNavigate();
  const handleGoToDetail = (val: any) => {
    navigate("/admin/booking/HotelDetail", { state: val });
  };

  return (
    <div>
      <div className={Styles.payment}>
        <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
          <p className={Styles.headerclass}>SUBMITTED AT</p>
          <p className={Styles.headerclass}>ID</p>
          <p className={Styles.headerclass}>MR NO.</p>
          <p className={Styles.headerclass}>GUEST NAME</p>
          <p className={Styles.headerclass}>HOTEL NAME</p>
          <p className={Styles.headerclass}>CHECK IN</p>
          <p className={Styles.headerclass}>CHECK OUT</p>
          <p className={Styles.headerclass}>TOTAL AMOUNT</p>
        </div>
        <div className={Styles.tableData}>
          <table
            style={{
              margin: "0px",
              borderCollapse: "separate",
              borderSpacing: "0 4px",
            }}
          >
            <tbody className={Styles.wapper}>
              {Data?.map((val: any, rowIndex: any) => {
                const Date = dayjs(val?.createdAt).format(
                  "MM-DD-YYYY,  h:mm a"
                );
                const ChickIn = dayjs(val?.arrivalDate?.from).format(
                  " MM-DD-YYYY"
                );
                const Chickout = dayjs(val?.arrivalDate?.to).format(
                  " MM-DD-YYYY"
                );
                return (
                  <tr
                    className={Styles.tableRow}
                    key={rowIndex}
                    onClick={() => handleGoToDetail(val)}
                  >
                    <td className={Styles.w20}>{Date}</td>
                    <td className={Styles.w20}>{val?.bookingId}</td>
                    <td className={Styles.w20}>{val?.userId?.mrNo}</td>
                    <td className={Styles.w20}>{val?.userId?.name}</td>
                    <td className={Styles.w20}>{val?.hotelId?.name}</td>
                    <td className={Styles.w20}>{ChickIn}</td>
                    <td className={Styles.w20}>{Chickout}</td>
                    <td className={Styles.w20}>{val?.paidByUserAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdHoteltable;

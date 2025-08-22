import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./adAmbluance.module.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface Props {
  Data?: any;
}
const AdAmblanceTables = (props: Partial<Props>) => {
  const { Data } = props;

  const navigate = useNavigate();

  const handleGoToDetail = (index: any) => {
    const result = Data.map((v: any, i: any) => {
      if (i == index) {
        return v;
      }
    });
    navigate("/admin/booking/AmblanceDetail", { state: result[0] });
  };

  return (
    <div>
      <div className={Styles.payment}>
        <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
          <p className={Styles.headerclass}>SUMITTED AT</p>
          <p className={Styles.headerclass}>REQUEST ID</p>
          <p className={Styles.headerclass}>MR NO.</p>
          <p className={Styles.headerclass}>USER NAME</p>
          <p className={Styles.headerclass}>STATUS</p>
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
                return (
                  <tr
                    className={Styles.tableRow}
                    key={rowIndex}
                    onClick={() => handleGoToDetail(rowIndex)}
                  >
                    <td className={Styles.w20}>{Date}</td>
                    <td className={Styles.w20}>pending </td>
                    <td className={Styles.w20}>{val?.userId?.mrNo}</td>
                    <td className={Styles.w20}>{val?.userId?.name}</td>
                    <td className={Styles.w20}>
                      <p
                        className={classNames(Styles.statusComp, {
                          [Styles.statusPendingText]: val?.status === "Pending",
                          [Styles.statusOngoingText]: val?.status === "Ongoing",
                        })}
                      >
                        {val?.bidRequestId?.status}
                      </p>
                    </td>
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
export default AdAmblanceTables;

import classNames from "classnames";
import Styles from "./ambulancepayments.module.css";
import { TbRefresh } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import commonStyles from "shared/utils/common.module.css";
import { CiSearch } from "react-icons/ci";
import { BiFilterAlt } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
const data = [
  {
    SUBMITTEDid: "4 Feb 2019 05:30 PM",
    id: "KL02365",
    MRNo: "56489",
    USERNAME: "Zubair Ahmed",
    COMPANYNAME: "PC Hotel Lahore",
    VEHICLE: "22 Feb 2024",
    TOTALPAYMENTS: "Zubair Ahmed",
    STATUS: "Sent",
  },
  {
    SUBMITTEDid: "4 Feb 2019 05:30 PM",
    id: "KL02365",
    MRNo: "56489",
    USERNAME: "Zubair Ahmed",
    COMPANYNAME: "PC Hotel Lahore",
    VEHICLE: "22 Feb 2024",
    TOTALPAYMENTS: "Zubair Ahmed",
    STATUS: "Sent",
  },
  {
    SUBMITTEDid: "4 Feb 2019 05:30 PM",
    id: "KL02365",
    MRNo: "56489",
    USERNAME: "Zubair Ahmed",
    COMPANYNAME: "PC Hotel Lahore",
    VEHICLE: "22 Feb 2024",
    TOTALPAYMENTS: "Zubair Ahmed",
    STATUS: "Pending",
  },
  {
    SUBMITTEDid: "4 Feb 2019 05:30 PM",
    id: "KL02365",
    MRNo: "56489",
    USERNAME: "Zubair Ahmed",
    COMPANYNAME: "PC Hotel Lahore",
    VEHICLE: "22 Feb 2024",
    TOTALPAYMENTS: "Zubair Ahmed",
    STATUS: "Pending",
  },
];
interface Props {
  Data: any;
}
const AmbulancePayments = (props: Partial<Props>) => {
  const { Data } = props;

  const navigate = useNavigate();
  const handleGoToDetailTABLE = (index: any) => {
    const result = Data.map((v: any, i: any) => {
      if (i == index) {
        return v;
      }
    });

    navigate("/admin/Payments/Ambulance/Details", {
      state: result[0],
    });
  };
  return (
    <div className={Styles.payment}>
      <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
        <td className={Styles.headerclassCheck}></td>
        <p className={Styles.headerclass}>SUBMITTED AT</p>
        <p className={Styles.headerclass}>REQUEST ID</p>
        <p className={Styles.headerclass}>MR No.</p>
        <p className={Styles.headerclass}>USER NAME</p>
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
            {Data?.map((val: any, key: any) => {
              const Date = dayjs(val?.createdAt).format("MM-DD-YYYY,  h:mm a");
              return (
                <tr
                  className={Styles.tableRow}
                  key={key}
                  onClick={() => handleGoToDetailTABLE(key)}
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
                    />
                  </td>
                  <td className={Styles.w20}>{Date}</td>
                  <td className={Styles.w20}>{val.id}</td>
                  <td className={Styles.w20}>{val?.userId?.mrNo}</td>
                  <td className={Styles.w20}>{val?.userId?.name}</td>
                  <td className={Styles.w20}>
                    <p
                      className={classNames(Styles.statusComp, {
                        [Styles.statusPendingText]: val?.status === "Pending",
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
export default AmbulancePayments;

import classNames from "classnames";
import Styles from "../PaymentMODULE1.module.css";
import { TbRefresh } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import commonStyles from "shared/utils/common.module.css";
import { CiSearch } from "react-icons/ci";
import { BiFilterAlt } from "react-icons/bi";
import { RiSearchLine } from "react-icons/ri";
import { Checkbox, Radio } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";

interface Props {
  Flight: any;
  Tour: any;
}
const TravelPayments = (props: Partial<Props>) => {
  const { Flight, Tour } = props;
  const navigate = useNavigate();
  const handleGoToFlightDetail = (index: any) => {
    const result = Flight.map((v: any, i: any) => {
      if (i == index) {
        return v;
      }
    });

    navigate("/admin/Payments/Travel/Flight/Details", {
      state: result[0],
    });
  };
  const handleGoToTour = (index: any) => {
    const result = Tour.map((v: any, i: any) => {
      if (i == index) {
        return v;
      }
    });

    navigate("/admin/Payments/Travel/Tour/Details", {
      state: result[0],
    });
  };
  const [selectedOption, setSelectedOption] = useState("Flight"); // Initialize with default option

  return (
    <div>
      <div
        className={classNames(commonStyles.col6, Styles.mt24, commonStyles.flx)}
      >
        <div className={classNames(commonStyles.flx, Styles.colorgray)}>
          <Radio
            sx={{
              color: "#0D47A1",
              "&.Mui-checked": {
                color: "#0D47A1",
              },
            }}
            onChange={() => setSelectedOption("Flight")}
            checked={selectedOption === "Flight"}
          />
          <p
            className={classNames(commonStyles.fs18, commonStyles.medium, {
              [Styles.selectedOption]: selectedOption === "Flight",
            })}
          >
            Flights
          </p>
        </div>{" "}
        <div className={classNames(commonStyles.flx, Styles.colorgray)}>
          <Radio
            sx={{
              color: "#0D47A1",
              "&.Mui-checked": {
                color: "#0D47A1",
              },
            }}
            onChange={() => setSelectedOption("Tour")}
            checked={selectedOption === "Tour"}
          />
          <p
            className={classNames(commonStyles.fs18, commonStyles.medium, {
              [Styles.selectedOption]: selectedOption === "Tour",
            })}
          >
            Tours
          </p>
        </div>
      </div>
      {/* Flight */}
      {selectedOption === "Flight" && (
        <div className={Styles.payment}>
          <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
            <td className={Styles.headerclassCheck}></td>
            <p className={Styles.headerclass}>SUBMITTED AT</p>
            <p className={Styles.headerclass}>MR No.</p>
            <p className={Styles.headerclass}>USER NAME</p>
            <p className={Styles.headerclass}>FLIGHT TYPE</p>
            <p className={Styles.headerclass}>TOTAL PAYMENTS</p>
            <p className={Styles.headerclass}>BID STATUS</p>
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
                {Flight?.map((val: any, key: any) => {
                  const Date = dayjs(val?.createdAt).format(
                    "MM-DD-YYYY,  h:mm a"
                  );
                  return (
                    <tr
                      className={Styles.tableRow}
                      key={key}
                      onClick={() => handleGoToFlightDetail(key)}
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
                      <td className={Styles.w20}>{val?.userId?.mrNo}</td>
                      <td className={Styles.w20}>{val?.userId?.name}</td>
                      <td className={Styles.w20}>{val?.requestType}</td>
                      <td className={Styles.w20}>{val?.bidCount}</td>
                      <td className={Styles.w20}>
                        <p
                          className={classNames(Styles.statusComp, {
                            [Styles.statusPendingText]:
                              val?.requestId?.status === "pending",
                          })}
                        >
                          {val?.requestId?.status}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {selectedOption === "Tour" && (
        <div className={Styles.payment}>
          <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
            <td className={Styles.headerclassCheck}></td>
            <p className={Styles.headerclass}>SUBMITTED AT</p>
            <p className={Styles.headerclass}>MR No.</p>
            <p className={Styles.headerclass}>USER NAME</p>
            <p className={Styles.headerclass}>VENDOR NAME</p>
            <p className={Styles.headerclass}>TOTAL PAYMENTS</p>
            <p className={Styles.headerclass}>NO. OF SEATS</p>
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
                {Tour?.map((val: any, key: any) => {
                  const Date = dayjs(val?.createdAt).format(
                    "MM-DD-YYYY,  h:mm a"
                  );
                  return (
                    <tr
                      className={Styles.tableRow}
                      key={key}
                      onClick={() => handleGoToTour(key)}
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
                      <td className={Styles.w20}>{val?.userId?.mrNo}</td>
                      <td className={Styles.w20}>{val?.userId?.name}</td>
                      <td className={Styles.w20}>{val?.agencyId.name}</td>
                      <td className={Styles.w20}>{val?.actualPrice}</td>{" "}
                      <td className={Styles.w20}>{val?.totalUser}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default TravelPayments;

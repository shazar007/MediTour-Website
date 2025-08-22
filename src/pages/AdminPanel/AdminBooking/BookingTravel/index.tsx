import classNames from "classnames";
import Styles from "./bookingtravel.module.css";
import { useNavigate } from "react-router-dom";
import commonStyles from "shared/utils/common.module.css";
import { Radio } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
interface Props {
  setType?: any;
  FlightData?: any;
  TourData?: any;
}

const AdTravelAgencyTables = (props: Partial<Props>) => {
  const { setType, FlightData, TourData } = props;
  const navigate = useNavigate();

  const handleGoToTourtDetail = (val: any) => {
    navigate("/admin/booking/Travel/TourDetail", {
      state: val,
    });
  };
  const handleGoToFlightDetail = (index: any) => {
    const result = FlightData.map((v: any, i: any) => {
      if (i == index) {
        return v;
      }
    });
    navigate("/admin/booking/Travel/flightDetail", {
      state: result[0],
    });
  };

  const [selectedOptionstravel, setSelectedOptiontravel] = useState("Flight");
  setType(selectedOptionstravel);
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
            onChange={() => setSelectedOptiontravel("Flight")}
            checked={selectedOptionstravel === "Flight"}
          />
          <p
            className={classNames(commonStyles.fs18, commonStyles.medium, {
              [Styles.selectedOption]: selectedOptionstravel === "Flight",
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
            onChange={() => setSelectedOptiontravel("Tour")}
            checked={selectedOptionstravel === "Tour"}
          />
          <p
            className={classNames(commonStyles.fs18, commonStyles.medium, {
              [Styles.selectedOption]: selectedOptionstravel === "Tour",
            })}
          >
            Tours
          </p>
        </div>
      </div>
      {/* Flight */}
      {selectedOptionstravel === "Flight" && (
        <div className={Styles.payment}>
          <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
            <p className={Styles.headerclassF}>SUBMITTED AT</p>
            <p className={Styles.headerclassF}>REQUEST ID</p>
            <p className={Styles.headerclassF}>MR No.</p>
            <p className={Styles.headerclassF}>USER NAME</p>
            <p className={Styles.headerclassF}>FLIGHT TYPE</p>
            <p className={Styles.headerclassF}>VENDOR BIDS</p>
            <p className={Styles.headerclassF}>STATUS</p>
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
                {FlightData.map((val: any, rowIndex: any) => {
                  const Date = dayjs(val?.createdAt).format(
                    "MM-DD-YYYY,  h:mm a"
                  );

                  return (
                    <tr
                      className={Styles.tableRow}
                      key={rowIndex}
                      onClick={() => handleGoToFlightDetail(rowIndex)}
                    >
                      <td className={Styles.w20F}>{Date}</td>
                      <td className={Styles.w20F}>{val?.userId?.mrNo}</td>
                      <td className={Styles.w20F}>{val?.userId?.mrNo}</td>
                      <td className={Styles.w20F}>{val?.userId?.name}</td>
                      <td className={Styles.w20F}>{val?.requestType}</td>
                      <td className={Styles.w20F}>{val?.bidCount}</td>
                      <td className={Styles.w20F}>
                        <p
                          className={classNames(Styles.statusComp, {
                            [Styles.statusPendingText]:
                              val.status === "pending",
                          })}
                        >
                          {val.status}
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
      {selectedOptionstravel === "Tour" && (
        <div className={Styles.payment}>
          <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
            <p className={Styles.headerclass}>SUBMITTED AT</p>
            <p className={Styles.headerclass}>MR No.</p>
            <p className={Styles.headerclass}>USER NAME</p>
            <p className={Styles.headerclass}>COMPANY NAME</p>
            <p className={Styles.headerclass}>TOTAL AMOUNT</p>
            <p className={Styles.headerclass}>NO. OF SEATS</p>
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
                {TourData.map((val: any, rowIndex: any) => {
                  const Date = dayjs(val?.createdAt).format(
                    "MM-DD-YYYY,  h:mm a"
                  );
                  return (
                    <tr
                      className={Styles.tableRow}
                      key={rowIndex}
                      onClick={() => handleGoToTourtDetail(val)}
                    >
                      <td className={Styles.w20}>{Date}</td>
                      <td className={Styles.w20}>{val?.userId?.mrNo}</td>
                      <td className={Styles.w20}>{val?.userId?.name}</td>
                      <td className={Styles.w20}>
                        {val?.agencyId?.companyName}
                      </td>
                      <td className={Styles.w20}>{val?.actualPrice}</td>
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
export default AdTravelAgencyTables;

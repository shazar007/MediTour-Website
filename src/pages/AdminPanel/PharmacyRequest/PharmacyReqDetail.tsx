import React, { useEffect, useState } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./adminRequest.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Typography } from "@mui/material";
import {
  AdminTable,
  Medicine_Table,
  PrimaryButton,
  RingLoader,
} from "shared/components";
import { useLocation } from "react-router-dom";
import { acceptMedicineBid, getMedicineBid } from "shared/services";
import { TbRefresh } from "react-icons/tb";
import dayjs from "dayjs";

const staticData = {
  requestId: "REQ1234",
  patient: {
    name: "Salim Qureshi",
    mrNo: "MR001",
    contact: "123-456-7890",
    email: "salim@example.com",
    view: "View List",
  },
};

export default function PharmacyReqDetail() {
  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [medBids, setMedBids] = useState([]);
  const handleAccordionChange =
    (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpandedPanels((prev) =>
        isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
      );
    };

  const accep_medicine_bid = (id: string) => {
    setAcceptLoading(true);
    acceptMedicineBid(id)
      .then((res: any) => {})
      .catch((err: any) => {})
      .finally(() => setAcceptLoading(false));
  };

  const handleFetchBids = (pageno: number) => {
    setLoading(true);
    getMedicineBid(state?._id, pageno)
      .then((res: any) => {
        setMedBids(res?.data?.allBids);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleFetchBids(1);
  }, []);

  const handleRefresh = () => {
    handleFetchBids(1);
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Pharmacy Request Details" />
      </div>
      <div style={{ padding: "20px 20px 0 20px" }}>
        <div className={classNames(Styles.infoCard)}>
          <div className={classNames(commonStyles.col4)}>
            <p
              className={classNames(
                commonStyles.fs24,
                commonStyles.semiBold,
                commonStyles.mb20
              )}
            >
              Patient
            </p>
            <div className={classNames(commonStyles.flxBetween)}>
              <p
                className={classNames(commonStyles.fs14, commonStyles.semiBold)}
              >
                Mr No.
              </p>
              <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                {state?.patientId?.mrNo}
              </p>
            </div>
            <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
              <p
                className={classNames(commonStyles.fs14, commonStyles.semiBold)}
              >
                Name
              </p>
              <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                {state?.patientId?.name}
              </p>
            </div>
            <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
              <p
                className={classNames(commonStyles.fs14, commonStyles.semiBold)}
              >
                Email
              </p>
              <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                {state?.patientId?.email}
              </p>
            </div>
            <div className={classNames(commonStyles.flxBetween, Styles.mt8)}>
              <p
                className={classNames(commonStyles.fs14, commonStyles.semiBold)}
              >
                Number
              </p>
              <p className={classNames(commonStyles.fs14, Styles.colorGray)}>
                {state?.patientId?.phone}
              </p>
            </div>
          </div>
        </div>
        <div className={classNames(Styles.mt24)}>
          <div className={classNames(Styles.flxBetween)}>
            <div className={classNames(commonStyles.flx, commonStyles.colsm12)}>
              <p
                className={classNames(
                  commonStyles.fs22,
                  Styles.primarycolor,
                  commonStyles.semiBold
                )}
              >
                Bids
              </p>
              {loading ? (
                <div className={Styles.loader}>
                  <RingLoader color={"#0D47A1"} size={30} />
                </div>
              ) : (
                <TbRefresh className={Styles.refresh} onClick={handleRefresh} />
              )}
            </div>
          </div>

          {medBids?.map((data: any, index: number) => (
            <div key={index} className={classNames(Styles.mt8)}>
              <Accordion
                className={Styles.dropdown}
                expanded={expandedPanels.includes(index)}
                onChange={handleAccordionChange(index)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "#393A44" }} />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  {/* According heading */}
                  <div
                    className={classNames(
                      commonStyles.flx,
                      commonStyles.flxBetween,
                      commonStyles.col12
                    )}
                  >
                    <div className={classNames(commonStyles.flx)}>
                      <Avatar
                        className={classNames(commonStyles.mr16)}
                        // src={apt.patientId?.userImage}
                      />
                      <Typography style={{ fontWeight: "500" }}>
                        <p
                          className={classNames(
                            commonStyles.fs16,
                            commonStyles.flx
                          )}
                          style={{ textAlign: "start", color: "#393A44" }}
                        >
                          {data?.pharmacyId?.name}
                        </p>
                      </Typography>
                    </div>

                    <div
                      className={classNames(commonStyles.flx)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "30%",
                      }}
                    >
                      {data?.partialOrFull && (
                        <p
                          className={classNames(
                            commonStyles.fs14,
                            Styles.accordiaHeading,
                            commonStyles.mr24
                          )}
                          style={{
                            textAlign: "left",
                            margin: 0,
                          }}
                        >
                          {data?.partialOrFull === "full"
                            ? "Fully Medicine"
                            : "Partial Medicine"}
                        </p>
                      )}

                      <div
                        style={{
                          width: "130px",
                        }}
                      >
                        <PrimaryButton
                          onClick={() => accep_medicine_bid(data?._id)}
                          colorType={"admin"}
                          children={
                            acceptLoading ? (
                              <RingLoader size={35} color={"#fff"} />
                            ) : (
                              "Accept"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </AccordionSummary>

                <AccordionDetails>
                  <BidDetails data2={data} />
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const BidDetails = ({ data2 }: { data2: any }) => {
  const [dataSet, setData] = useState<any>([]);
  const titles = [
    { id: 1, title: "Product Name" },
    { id: 2, title: "GENERIC" },
    { id: 3, title: "BRAND" },
    { id: 4, title: "STRENGTH" },
    { id: 5, title: "PACK SIZE" },
    { id: 6, title: "T.P PRICE" },
    { id: 7, title: "M.R.P PRICE" },
  ];
  useEffect(() => {
    handleTableData(data2);
  }, []);
  const handleTableData = (data: any) => {
    let tempData: any = [];
    data?.availableMedIds?.map((v: any) => {
      tempData.push([
        // date,
        v?.productName,
        v?.generic,
        v?.brand,
        v?.strength,
        v?.packSize,
        v?.tpPrice,
        v?.mrpPrice,
      ]);
    });
    setData(tempData);
  };
  return (
    <div className={classNames(commonStyles.mt16)}>
      <div className={classNames(commonStyles.flxBetween)}>
        <div className={classNames(commonStyles.col4)}>
          <div className={classNames(commonStyles.flxBetween)}>
            <p
              className={classNames(
                commonStyles.fs14,
                commonStyles.mr16,
                commonStyles.semiBoldcc
              )}
            >
              ID:
            </p>
            <p className={classNames(commonStyles.fs14, commonStyles.normal)}>
              {data2?.pharmacyId?.vendorId}
            </p>
          </div>

          <div className={classNames(commonStyles.flxBetween)}>
            <p
              className={classNames(
                commonStyles.fs14,
                commonStyles.mr16,
                commonStyles.semiBold
              )}
            >
              Email:
            </p>
            <p className={classNames(commonStyles.fs14, commonStyles.normal)}>
              {data2?.pharmacyId?.email}
            </p>
          </div>
        </div>

        <div className={classNames(commonStyles.col4)}>
          <div className={classNames(commonStyles.flxBetween)}>
            <p
              className={classNames(
                commonStyles.fs14,
                commonStyles.mr16,
                commonStyles.semiBold
              )}
            >
              Contact:
            </p>
            <p className={classNames(commonStyles.fs14, commonStyles.normal)}>
              {data2?.pharmacyId?.phoneNumber}
            </p>
          </div>
        </div>
      </div>
      <div className={classNames(commonStyles.flxBetween)}>
        <p
          className={classNames(
            commonStyles.fs14,
            commonStyles.mt32,
            commonStyles.semiBold
          )}
        >
          AVAILABLE MEDICINES
        </p>
      </div>

      <div>
        <div className={Styles.payment}>
          <div>
            <AdminTable
              titles={titles}
              data={dataSet}
              headerWidth={"16.66%"}
              itemWidth={"13.66%"}
              handleGoToDetail={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

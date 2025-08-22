import { useEffect, memo, useState } from "react";
import LabDash from "../Dashboard/dashborad.module.css";
import { LabGraphDETAILSUpperPortion, getAllLabTests } from "shared/services";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import commmonStyle from "shared/utils/common.module.css";
import Branches from "assets/images/lab_Branches.png";
import Test from "assets/images/lab_Test.png";
import Order from "assets/images/lab_Order.png";
import Result from "assets/images/lab_Result.png";
import Payment from "assets/images/lab_Payment.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import TableNew from "shared/components/A_New_Components/Table_new";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import NewPagination from "shared/components/NewPagination/NewPagination";

const data = [
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
  { name: "", value1: 0, value2: 0 },
];

function Dashboard() {
  const { t, i18n }: any = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState<any>(null);
  const [testData, setTestData] = useState([]);
  const Testss = [
    t("testCode"),
    t("testName"),
    t("testCategory"),
    t("specimenType"),
    t("mediTourPrice"),
    t("actualPrice"),
  ];
  const { data: cardsData } = useQuery({
    queryKey: ["CardData"],
    queryFn: () => LabGraphDETAILSUpperPortion(),
    staleTime: 5 * 60 * 1000,
  });
  let carddata: any = cardsData?.data;

  const {
    data: Labtest,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Tests", currentPage],
    queryFn: () => getAllLabTests(currentPage),
    staleTime: 5 * 60 * 1000,
  });

  let LabTest = Labtest?.data?.tests;
  let tableData: any = [];
  LabTest?.map((v: any, ind: any) => {
    tableData.push([
      v?.testCode,
      v?.testNameId?.name,
      v?.testNameId?.categoryName,
      v?.specimen,
      v?.priceForMeditour,
      v?.price,
    ]);
  });
  const F = (ind: any) => {
    const selectedObject: any = testData[ind];
    navigate(`/testDetail/${selectedObject?._id}`, {
      state: { _id: selectedObject?._id },
    });
  };
  const itemsPerPage = 10;
  const handleNextPage = () => {
    if (Labtest?.data?.nextPage) {
      setCurrentPage(Labtest.data.nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (Labtest?.data?.previousPage) {
      setCurrentPage(Labtest.data.previousPage);
    }
  };

  useEffect(() => {
    setTestData(LabTest);

    if (Labtest?.data?.totalTests) {
      setTotalItems(Labtest.data.totalTests);
    }
  }, [data, totalItems]);

  const navigate = useNavigate();
  const handelgotobranches = () => {
    navigate("/laboratory/branches");
  };

  const handelgotoTest = () => {
    navigate("/laboratory/tests");
  };

  const handelgotoOrders = () => {
    navigate("/laboratory/orders");
  };

  const handelgotoResults = () => {
    navigate("/laboratory/results");
  };

  const handelgotoPayments = () => {
    navigate("/laboratory/payments");
  };
  return (
    <>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commmonStyle.pl36
            : commmonStyle.pr36
        }
      >
        <div className={LabDash.Card_Wrapper}>
          <div className={LabDash.Dash_Card} onClick={handelgotobranches}>
            <div style={{ gap: "12px" }} className={LabDash.flx}>
              <img alt="Branch" src={Branches} className={LabDash.Card_Icon} />
              <div>
                <p className={LabDash.Card_Values}>
                  {" "}
                  {carddata?.labCount ? carddata.labCount : 0}
                </p>{" "}
                <p className={LabDash.Card_Label}>{t("branches")}</p>
              </div>
            </div>
            <div className={LabDash.fleEnd}>
              <p className={LabDash.Card_Detail}>{t("details")}</p>
              <>
                {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                  <FaArrowLeftLong className={LabDash.Arrow} />
                ) : (
                  <FaArrowRightLong className={LabDash.Arrow} />
                )}
              </>
            </div>
          </div>
          <div className={LabDash.Dash_Card} onClick={handelgotoTest}>
            <div style={{ gap: "12px" }} className={LabDash.flx}>
              <img src={Test} alt="test" className={LabDash.Card_Icon} />
              <div>
                <p className={LabDash.Card_Values}>
                  {" "}
                  {carddata?.testCounts ? carddata?.testCounts : 0}
                </p>{" "}
                <p className={LabDash.Card_Label}>{t("totalTests")}</p>
              </div>
            </div>
            <div className={LabDash.fleEnd}>
              <p className={LabDash.Card_Detail}>{t("details")}</p>
              <>
                {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                  <FaArrowLeftLong className={LabDash.Arrow} />
                ) : (
                  <FaArrowRightLong className={LabDash.Arrow} />
                )}
              </>
            </div>
          </div>
          <div className={LabDash.Dash_Card} onClick={handelgotoOrders}>
            <div style={{ gap: "12px" }} className={LabDash.flx}>
              <img src={Order} alt="order" className={LabDash.Card_Icon} />
              <div>
                <p className={LabDash.Card_Values}>
                  {carddata?.todayOrdersCount
                    ? carddata?.pendingYesOrdersCount
                    : 0}
                </p>{" "}
                <p className={LabDash.Card_Label}>{t("orders")}</p>
              </div>
            </div>
            <div className={LabDash.fleEnd}>
              <p className={LabDash.Card_Detail}>{t("details")}</p>
              <>
                {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                  <FaArrowLeftLong className={LabDash.Arrow} />
                ) : (
                  <FaArrowRightLong className={LabDash.Arrow} />
                )}
              </>
            </div>
          </div>
          <div className={LabDash.Dash_Card} onClick={handelgotoResults}>
            <div style={{ gap: "12px" }} className={LabDash.flx}>
              <img src={Result} alt="Result" className={LabDash.Card_Icon} />
              <div>
                <p className={LabDash.Card_Values}>
                  {carddata?.resultCount ? carddata?.resultCount : 0}
                </p>{" "}
                <p className={LabDash.Card_Label}>{t("results")}</p>
              </div>
            </div>
            <div className={LabDash.fleEnd}>
              <p className={LabDash.Card_Detail}>{t("details")}</p>
              <>
                {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                  <FaArrowLeftLong className={LabDash.Arrow} />
                ) : (
                  <FaArrowRightLong className={LabDash.Arrow} />
                )}
              </>{" "}
            </div>
          </div>
          <div className={LabDash.Dash_Card} onClick={handelgotoPayments}>
            <div style={{ gap: "12px" }} className={LabDash.flx}>
              <img
                src={Payment}
                alt="LabPayment"
                className={LabDash.Card_Icon}
              />
              <div>
                <p className={LabDash.Card_Values}>
                  {" "}
                  {carddata?.totalPayableAmount
                    ? carddata?.totalPayableAmount
                    : 0}
                </p>{" "}
                <p className={LabDash.Card_Label}>{t("payments")}</p>
              </div>
            </div>
            <div className={LabDash.fleEnd}>
              <p className={LabDash.Card_Detail}>{t("details")}</p>
              <>
                {["ur", "ar", "ps", "pr"].includes(i18n.language) ? (
                  <FaArrowLeftLong className={LabDash.Arrow} />
                ) : (
                  <FaArrowRightLong className={LabDash.Arrow} />
                )}
              </>{" "}
            </div>
          </div>
        </div>
        <div className={LabDash.graph}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className={LabDash.Card_Values}>All Tests</p>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, totalItems)}
              totalItems={totalItems}
            />
          </div>
          {totalItems > 0 ? (
            <TableNew
              titles={Testss}
              handleGoToDetail={F}
              data={tableData}
              headerWidth="16%"
              itemWidth="16%"
              height="47.6vh"
            />
          ) : (
            <>
              <PhysiotheristsEmpty />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default memo(Dashboard);

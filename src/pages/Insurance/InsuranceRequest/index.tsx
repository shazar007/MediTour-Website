import { useState, useEffect } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./InsuranceBB.module.css";
import { insuranceGetAllREQUEST } from "shared/services/Insurance";
import { RingLoader } from "shared/components";
import { TbRefresh } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setInsuranceRequestFlag,
  setInsuranceRequestLength,
  setInsuranceRequests,
} from "shared/redux";
import NewPagination from "shared/components/NewPagination/NewPagination";
import dayjs from "dayjs";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import TableNew from "shared/components/A_New_Components/Table_new";
import { useTranslation } from "react-i18next";

function InsuranceRequest() {
  const { t, i18n }: any = useTranslation();
  const { insuranceRequests, insuranceRequestFlag, insuranceRequestLength } =
    useSelector((state: any) => state.root.insurance);

  const [rotation, setRotation] = useState<number>(0);
  const rotationIncrement: number = 90;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const itemsPerPage = 10;
  const totalItems = insuranceRequestLength;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoToDetail = (index: number) => {
    let selectedItem = insuranceRequests[index];
    navigate(`/insurance/request/Detail`, {
      state: { selectedItem },
    });
  };
  const [loading, setLoading] = useState(false);

  const title = [
    t("_name"),
    t("date"),
    t("day"),
    t("insurancePlan"),
    t("status"),
  ];

  const GetAllRequest = (pageno: number) => {
    setLoading(true);
    insuranceGetAllREQUEST(pageno)
      .then((res: any) => {
        dispatch(setInsuranceRequests(res?.data?.insurances));
        dispatch(setInsuranceRequestLength(res?.data?.totalLength));
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  let InsuranceRequest = insuranceRequests;
  let tableData: any = [];

  InsuranceRequest?.map((v: any, ind: any) => {
    tableData.push([
      v?.userId?.name,
      dayjs(v?.createdAt).format("DD-MM-YYYY"),
      dayjs(v?.createdAt).format("dddd"),
      v?.insuranceFor,
      v?.status,
    ]);
  });

  const handleRotate = () => {
    setRotation(rotation - rotationIncrement);
    GetAllRequest(currentPage);
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (insuranceRequestLength > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      dispatch(setInsuranceRequestFlag(true));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      dispatch(setInsuranceRequestFlag(true));
    }
  };
  useEffect(() => {
    if (insuranceRequestFlag) {
      setLoading(true);
      GetAllRequest(currentPage);
      dispatch(setInsuranceRequestFlag(false));
    }
  }, [insuranceRequestFlag, currentPage]);

  useEffect(() => {
    GetAllRequest(currentPage);
  }, []);

  return (
    <div className={classNames(commonstyles.col12)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyles.pl36
            : commonstyles.pr36
        }
      >
        <div className={classNames(commonstyles.flxBetween)}>
          <div className={commonstyles.flx} style={{ gap: "16px" }}>
            <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
              {t("allRequests")}
            </p>
            {loading ? (
              <div className={style.outerRefresh}>
                <RingLoader color={"#0E54A3"} size={24} />
              </div>
            ) : (
              <div className={style.outerRefresh}>
                <TbRefresh
                  color={"#7d7d7d"}
                  size={24}
                  style={{ transform: `rotate(${rotation}deg)` }}
                  onClick={handleRotate}
                />
              </div>
            )}
          </div>
        </div>{" "}
        <div className={classNames(commonstyles.outerContainer)}>
          <div className={commonstyles.flxEnd}>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, totalItems)}
              totalItems={totalItems}
            />
          </div>
          {insuranceRequests && insuranceRequests.length > 0 ? (
            <TableNew
              titles={title}
              handleGoToDetail={(i) => handleGoToDetail(i)}
              data={tableData}
              headerWidth="20%"
              itemWidth="20%"
              height="60vh"
            />
          ) : (
            <>
              <PhysiotheristsEmpty />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default InsuranceRequest;

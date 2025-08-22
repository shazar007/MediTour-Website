import { useState, useEffect } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./Insuredperson.module.css";
import { insuranceGetInsuredPersons } from "shared/services/Insurance";
import { RingLoader } from "shared/components";
import { TbRefresh } from "react-icons/tb";
import {
  setInsuranceInsuredPersons,
  setInsuredPeronsLength,
  setInsuredPersonsRenderFlag,
} from "shared/redux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewPagination from "shared/components/NewPagination/NewPagination";
import TableNew from "shared/components/A_New_Components/Table_new";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
function InsuranceRequest() {
  const { t, i18n }: any = useTranslation();

  const {
    insuranceInsuredPersons,
    insuredPersonsRenderFlag,
    insuredPeronsLength,
  } = useSelector((state: any) => state.root.insurance);

  const [rotation, setRotation] = useState<number>(0);
  const rotationIncrement: number = 90;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const itemsPerPage = 10;
  const totalItems = insuredPeronsLength;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const title = [
    t("date"),
    t("insuredPerson"),
    t("packageName"),
    t("inusranceAmount"),
  ];

  const fetchInsuredPersons = (pageno: number) => {
    setLoading(true);
    insuranceGetInsuredPersons(pageno)
      .then((res: any) => {
        dispatch(setInsuranceInsuredPersons(res?.data?.insurances));
        dispatch(setInsuredPeronsLength(res?.data?.totalLength));
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  let InsuredPerson = insuranceInsuredPersons;
  let tableData: any = [];
  InsuredPerson?.map((v: any, ind: any) => {
    tableData.push([
      dayjs(v?.createdAt).format("DD-MM-YYYY"),
      v?.userId?.name,
      v?.insuranceId?.packageName,
      v?.gatewayName === "stripe"
        ? `$${(Math.round(v?.amount * 100) / 100).toFixed(2)}`
        : `Rs: ${(Math.round(v?.amount * 100) / 100).toFixed(2)}`,
    ]);
  });
  const handleRotate = () => {
    setRotation(rotation - rotationIncrement);
    fetchInsuredPersons(currentPage);
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (insuredPeronsLength > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      dispatch(setInsuredPersonsRenderFlag(true));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      dispatch(setInsuredPersonsRenderFlag(true));
    }
  };
  useEffect(() => {
    fetchInsuredPersons(currentPage);
  }, []);
  useEffect(() => {
    if (insuredPersonsRenderFlag) {
      setLoading(true);
      fetchInsuredPersons(currentPage);
      dispatch(setInsuredPersonsRenderFlag(false));
    }
  }, [insuredPersonsRenderFlag, currentPage]);
  const handleGoToInsurancedDetail = (id: string) => {
    navigate(`/insuredPerson/Detail/${id}`);
  };
  const handleGoToDetail = (index: any) => {
    let item = InsuredPerson[index];

    navigate(`/insuredPerson/Detail`, { state: item });
  };

  return (
    <div className={classNames(commonstyles.col12)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyles.pl36
            : commonstyles.pr36
        }
      >
        <div className={commonstyles.flx} style={{ gap: "16px" }}>
          <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
            {t("insuredListing")}
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
        <div className={classNames(commonstyles.outerContainer)}>
          <div className={classNames(commonstyles.flxEnd)}>
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

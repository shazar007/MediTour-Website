import { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./PatientHistory.module.css";
import { DocGetAllPateints } from "../../../shared/services/DoctorService";
import { useNavigate } from "react-router-dom";
import IconDetail from "assets/images/Icon Detail.png.png";
import { RingLoader } from "shared/components";
import { TbRefresh } from "react-icons/tb";
import { useSelector } from "react-redux";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { useQuery } from "@tanstack/react-query";
import TableNew from "shared/components/A_New_Components/Table_new";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

function DoctorPatientHistory() {
  const { t, i18n }: any = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState<any>(null);
  const navigate = useNavigate();
  const { systemType } = useSelector((state: any) => state.root.common);

  const PatientHtory = [
    t("patientId"),
    t("patientName"),
    t("gender"),
    t("age"),
    t("phoneNumber"),
    t("action"),
  ];

  const GoToDetail = (id: string) => {
    navigate(`/${systemType}/patientHistory/details`, {
      state: { id },
    });
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["DoctorPatientHistory", currentPage],
    queryFn: () => DocGetAllPateints(currentPage),
    staleTime: 5 * 60 * 1000,
  });

  let PatientHistory = data?.data?.Patients;
  let tableData: any = [];
  PatientHistory?.map((v: any, ind: any) => {
    tableData.push([
      v?.mrNo || "--",
      v?.name || "--",
      v?.gender || "--",
      v?.dateOfBirth
        ? `${dayjs().diff(
            dayjs(v?.dateOfBirth, [
              "YYYY-MM-DD",
              "YYYY/MM/DD",
              "DD-MM-YYYY",
              "DD/MM/YYYY",
            ]),
            "year"
          )} years`
        : "--",
      v?.phone,
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => GoToDetail(v)}
      >
        <img src={IconDetail} alt="IconDetail" className={style.IconDetail} />
        <p className={style.Details}>{t("details")}</p>
      </div>,
    ]);
  });

  const itemsPerPage = 10;
  const handleNextPage = () => {
    if (data?.data?.nextPage) {
      setCurrentPage(data.data.nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (data?.data?.previousPage) {
      setCurrentPage(data.data.previousPage);
    }
  };

  useEffect(() => {
    if (data?.data?.patientsLength) {
      setTotalItems(data?.data?.patientsLength);
    }
  }, [data, totalItems]);

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
          <p className={classNames(style.heading)}>{t("patientList")}</p>

          {isLoading ? (
            <div className={style.outerRefresh}>
              <RingLoader color="#0e54a3" size={24} />
            </div>
          ) : (
            <div className={style.outerRefresh}>
              <TbRefresh
                color="#7d7d7d"
                size={24}
                onClick={() => {
                  refetch();
                }}
              />
            </div>
          )}
        </div>
        <div className={style.outerContainer}>
          <div className={classNames(style.FlexEnd)}>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, totalItems)}
              totalItems={totalItems}
            />
          </div>

          <div>
            {totalItems > 0 ? (
              <TableNew
                titles={PatientHtory}
                show="default"
                data={tableData}
                headerWidth="16.66%"
                itemWidth="16.66%"
                height="57.5vh"
              />
            ) : (
              <>
                <PhysiotheristsEmpty />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorPatientHistory;

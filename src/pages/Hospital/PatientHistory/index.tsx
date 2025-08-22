import { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./PatientHistory.module.css";
import HospitalPatientTable from "shared/components/HospitalTables/HospitalPatienttable";
import { hospitalgetPatients } from "shared/services/HospitalService";
import { useDispatch, useSelector } from "react-redux";
import {
  setHosPatientHistory,
  setHosPatientHistoryRenderFlag,
  setHosPatientLength,
} from "shared/redux";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { RingLoader } from "shared/components";
import CustomLoader from "shared/components/New_Loader/Loader";
import { useTranslation } from "react-i18next";
function PatientHistory() {
  const { i18n }: any = useTranslation();
  const dispatch = useDispatch();
  const { hosPatientHistory, hosPatientLength, hosPatientHistoryRenderFlag } =
    useSelector((state: any) => state.root.hospital);
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState<number>(0);
  const rotationIncrement: number = 90;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const itemsPerPage = 10;
  const totalItems = hosPatientLength;

  const fetchPatienHistory = (pagono: number) => {
    setLoading(true);

    hospitalgetPatients(pageno)
      .then((res: any) => {
        if (res?.data?.Patients.length > 0) {
          dispatch(setHosPatientHistory(res?.data?.Patients));
          dispatch(setHosPatientLength(res.data.patientsLength));
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (hosPatientLength > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      dispatch(setHosPatientHistoryRenderFlag(true));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      dispatch(setHosPatientHistoryRenderFlag(true));
    }
  };
  useEffect(() => {
    if (hosPatientHistoryRenderFlag) {
      setLoading(true);
      fetchPatienHistory(currentPage);
      dispatch(setHosPatientHistoryRenderFlag(false));
    }
  }, [hosPatientHistoryRenderFlag, currentPage]);
  const handleRotate = (): void => {
    setRotation(rotation - rotationIncrement);
    fetchPatienHistory(currentPage);
  };

  return (
    <div>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyles.pl36
            : commonstyles.pr36
        }
      >
        <div>
          <div className={style.outerContainer}>
            <div
              className={classNames(commonstyles.mb32, commonstyles.flxBetween)}
            >
              <div className={commonstyles.flx} style={{ gap: "16px" }}>
                <p
                  className={classNames(
                    commonstyles.fs24,
                    commonstyles.semiBold
                  )}
                >
                  All Patient
                </p>
                {loading ? (
                  <div className={style.outerRefresh}>
                    <RingLoader color={"#0E54A3"} size={24} />
                  </div>
                ) : (
                  <div className={style.outerRefresh}>
                    <TbRefresh color="#7d7d7d" size={24} />
                  </div>
                )}
              </div>
              <NewPagination
                onNext={handleNextPage}
                onPrevious={handlePreviousPage}
                startItem={(currentPage - 1) * itemsPerPage + 1}
                endItem={Math.min(currentPage * itemsPerPage, totalItems)}
                totalItems={totalItems}
              />
            </div>
            {loading ? (
              <CustomLoader />
            ) : (
              <>
                <div>
                  <HospitalPatientTable patientHistory={hosPatientHistory} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientHistory;

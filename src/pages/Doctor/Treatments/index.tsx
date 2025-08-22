import classNames from "classnames";
import { useEffect, useState } from "react";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import commonstyles from "shared/utils/common.module.css";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DocGetAllTreatments } from "shared/services/DoctorService";
import { RingLoader } from "shared/components";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { delTre } from "shared/services";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";
import TableNew from "shared/components/A_New_Components/Table_new";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CgCloseR } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import { CiEdit } from "react-icons/ci";

const DoctorTreatments = () => {
  const { t, i18n }: any = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { systemType } = useSelector((state: any) => state.root.common);
  const [totalItems, setTotalItems] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(null);

  const titles = [
    t("category"),
    t("_name"),
    t("cost"),
    `${t("clinic")}/${t("hospital")}`,
    t("action"),
  ];

  const handleEditClick = (treatment: any) => {
    navigate(`/${systemType}/addTreatment`, { state: { treatment } });
  };
  const handleDeleteClick = (treatmentId: any) => {
    setSelectedTreatmentId(treatmentId);
    setShowDeleteModal(true);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["doctorPackages", currentPage],
    queryFn: () => DocGetAllTreatments(currentPage),
    staleTime: 5 * 60 * 1000,
  });

  let Treatment = data?.data?.treatments;

  let tableData: any = [];
  Treatment?.map((v: any, ind: any) => {
    tableData.push([
      v?.treatmentId?.categoryId?.categoryName,
      v?.treatmentId?.subCategory,
      v?.totalAmount,
      v?.isPersonal == true ? "Clinic" : v?.hospitalId?.name,
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ cursor: "pointer" }}>
          <CiEdit
            style={{ width: "24px", height: "24px" }}
            onClick={() => handleEditClick(v)}
            color="#7d7d7d"
          />{" "}
        </div>
        <CgCloseR
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
          color="red"
          onClick={() => {
            setShowDeleteModal(true);
            handleDeleteClick(v?._id);
          }}
        />
      </div>,
    ]);
  });
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
    if (data?.data?.treatments?.length) {
      setTotalItems(data?.data?.treatments?.length);
    }
  }, [data, totalItems]);

  const deleteTreatmentMutation = useMutation({
    mutationFn: (id: string) => delTre(id),
    onSuccess: (res: any) => {
      refetch();
      notifySuccess(t("treatmentSuccessfullyDeleted"));
      refetch();
      setShowDeleteModal(false);
      setSelectedTreatmentId(null);
    },
    onError: (err: any) => {
      console.error(err, ".....errr");
    },
  });
  const confirmDelete = () => {
    if (!selectedTreatmentId) return;
    refetch();
    deleteTreatmentMutation.mutate(selectedTreatmentId);
  };
  const handleGoToDetail = () => { };
  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyles.pl36
          : commonstyles.pr36
      }
    >
      <div className={classNames(commonstyles.flxBetween)}>
        <div className={classNames(commonstyles.flx)} style={{ gap: "16px" }}>
          <p className={classNames(styles.heading)}>
            {t("yourTreatmentPackage")}
          </p>

          {isLoading ? (
            <div className={styles.outerRefresh}>
              <RingLoader color={"#0D47A1"} size={24} />
            </div>
          ) : (
            <div className={styles.outerRefresh}>
              <TbRefresh
                color={"#7d7d7d"}
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  refetch();
                }}
              />
            </div>
          )}
        </div>

        <button
          className={styles.addIcon}
          onClick={() => navigate(`/${systemType}/addTreatment`)}
        >
          + {t("add")}{" "}
        </button>
      </div>
      <div className={classNames(styles.outerContainer)}>
        <div style={{ display: "flex", justifyContent: "end" }}>
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
            titles={titles}
            data={tableData}
            handleGoToDetail={handleGoToDetail}
            headerWidth="20%"
            itemWidth="20%"
            height="50vh"
            show="default"
          />
        ) : (
          <div>
            <PhysiotheristsEmpty />
          </div>
        )}
      </div>
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
              {t("areYouSure")}{" "}
            </p>
            <p
              className={classNames(commonstyles.colorGray, commonstyles.fs16)}
            >
              {t("youwanttodeletethisTreament")}
            </p>

            <div className={styles.modalButtons}>
              <button onClick={() => setShowDeleteModal(false)}>
                {t("cancel")}
              </button>
              <button onClick={confirmDelete}>{t("yesDelete")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorTreatments;

import { useEffect, useState } from "react";
import styles from "./result.module.css";
import classNames from "classnames";
import commonstyles from "../../../shared/utils/common.module.css";
import { RingLoader } from "shared/components";
import { LabGetAllResults } from "shared/services";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import TableNew from "shared/components/A_New_Components/Table_new";
import dayjs from "dayjs";
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import "dayjs/locale/ur";

const Results = () => {
  const { t, i18n }: any = useTranslation();
  const [totalItems, setTotalItems] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const ResultList = [
    t("orderId"),
    t("patientName"),
    "MR No.",
    t("orderDate"),
    t("results"),
  ];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["LabResult", currentPage],
    queryFn: () => LabGetAllResults(currentPage),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  let LabResult = data?.data?.orders;

  const filteredResults = LabResult?.filter((v: any) => {
    const searchTerm = debouncedSearch.toLocaleLowerCase();
    return (
      v?.orderId?.toLowerCase().includes(searchTerm) ||
      v?.customerName?.toLowerCase().includes(searchTerm)
    );
  });

  let tableData: any = [];
  const isRTL = ["ur", "ar", "ps", "fa"].includes(i18n.language);
  const lang = i18n.language.split("-")[0];

  filteredResults?.map((v: any, ind: any) => {
    tableData.push([
      v?.orderId,
      v?.customerName,
      v?.MR_NO,
      v?.createdAt
        ? isRTL
          ? dayjs(v?.createdAt).locale(lang).format("DD MMMM YYYY, hh:mm A")
          : dayjs(v?.createdAt).format("DD-MM-YYYY hh:mm A")
        : "N/A",
      <div
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
        onClick={(e) => {
          e.stopPropagation();
          if (v?.results) {
            window.open(v.results, "_blank");
          } else {
            console.error(t("noFileAvailableToOpen"));
          }
        }}
      >
        <HiOutlineDownload className={styles.Icon} />
        <p className={styles.Download}>{t("download")}</p>
      </div>,
    ]);
  });

  const handleGoToOrderDeatil = (ind: any) => {
    const selectedObject: any = LabResult[ind];
    navigate(`/laboratory/result/Detail/${selectedObject?._id}`);
  };

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
    if (data?.data?.totalOrders && totalItems === null) {
      setTotalItems(data.data.totalOrders);
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
        <div className={commonstyles.mb24}>
          <div className={classNames(commonstyles.flx)} style={{ gap: "16px" }}>
            <p className={classNames(styles.heading)}>{t("allResults")}</p>
            {isLoading ? (
              <div className={styles.outerRefresh}>
                <RingLoader color={"#0E54A3"} size={24} />
              </div>
            ) : (
              <div className={styles.outerRefresh}>
                <TbRefresh
                  color={"#7d7d7d"}
                  size={24}
                  onClick={() => refetch()}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.TableOuter}>
          <div className={commonstyles.flxBetween}>
            <div>
              <SearchFilter
                search={search}
                setSearch={setSearch}
                title={t("search")}
              />
            </div>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, totalItems)}
              totalItems={totalItems}
            />
          </div>{" "}
          <div className={classNames(commonstyles.mt24)}>
            {totalItems > 0 ? (
              <TableNew
                titles={ResultList}
                data={tableData}
                headerWidth="20%"
                itemWidth="20%"
                height="48.6vh"
                handleGoToDetail={handleGoToOrderDeatil}
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
};

export default Results;

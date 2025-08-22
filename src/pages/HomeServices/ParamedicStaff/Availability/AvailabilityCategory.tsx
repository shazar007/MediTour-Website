import classNames from "classnames";
import { useState, useEffect } from "react";
import commonstyles from "shared/utils/common.module.css";
import styles from "./completed.module.css";
import commomstyles from "../../../.././shared/utils/common.module.css";
import { getallParamedicRequest } from "shared/services";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useTranslation } from "react-i18next";
import NewPagination from "shared/components/NewPagination/NewPagination";
import TableNew from "shared/components/A_New_Components/Table_new";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

function AvailabilityCategory() {
  const { t, i18n }: any = useTranslation();
  const title = [
    t("_name"),
    t("email"),
    t("contact"),
    t("preferred"),
    t("preferredDate"),
    t("preferredTime"),
    t("schedule"),
    t("status"),
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState<any>(null);

  let para = {
    status: "completed",
  };
  const { data } = useQuery({
    queryKey: ["paramedicRequests", para],
    queryFn: () => getallParamedicRequest(para),
    staleTime: 5 * 60 * 1000,
  });
  let paramedicRequests = data?.data?.paramedicRequests;
  let tableData: any = [];
  paramedicRequests?.map((v: any, ind: any) => {
    console.log("🚀 ~ data?.map ~ data:", data);
    tableData.push([
      v?.name,
      v?.email,
      v?.contact,
      v?.gender,
      dayjs(v.preferredDate).format("DD/MM/YYYY"),
      v?.preferredTime,
      v?.schedule,
      <p style={{ color: "#5bdd2a", fontSize: "14px" }}>{v?.status}</p>,
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
    if (data?.data?.requestsLength) {
      setTotalItems(data.data.requestsLength);
    }
  }, [data, totalItems]);
  return (
    <>
      <div className={classNames(commonstyles.col12)}>
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? commonstyles.pl36
              : commonstyles.pr36
          }
        >
          <div className={classNames(commomstyles.flx)} style={{ gap: "16px" }}>
            <p className={classNames(commomstyles.fs24, commomstyles.semiBold)}>
              {t("completedRequests")}
            </p>
          </div>

          <div className={styles.outerContainer}>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <NewPagination
                onNext={handleNextPage}
                onPrevious={handlePreviousPage}
                startItem={(currentPage - 1) * itemsPerPage + 1}
                endItem={Math.min(currentPage * itemsPerPage, totalItems)}
                totalItems={totalItems}
              />
            </div>

            <div style={{ marginTop: "8px" }}>
              {totalItems > 0 ? (
                <TableNew
                  titles={title}
                  headerWidth="12.5%"
                  data={tableData}
                  itemWidth="12.5%"
                  height="55vh"
                  show="default"
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
    </>
  );
}

export default AvailabilityCategory;

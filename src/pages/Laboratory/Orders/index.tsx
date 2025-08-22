import { useEffect, useState } from "react";
import styles from "./order.module.css";
import commomstyles from "../../../shared/utils/common.module.css";
import classNames from "classnames";
import {
  getAllOrders,
  LabGetAllResults,
  labStatusChange,
  labUploadResult,
  uploadFile,
} from "shared/services";
import { RingLoader } from "shared/components";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { TbRefresh } from "react-icons/tb";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import TableNew from "shared/components/A_New_Components/Table_new";
import dayjs from "dayjs";
import { HiOutlineUpload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CustomSelectOrder from "./CustomSelectOrder";
import { useFilePicker } from "use-file-picker";
import { useQuery } from "@tanstack/react-query";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";
import { useTranslation } from "react-i18next";

const Orders = () => {
  const { t, i18n }: any = useTranslation();
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState<any>(null);
  const [search, setSearch] = useState("");

  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const OrderList = [
    t("orderId"),
    t("patientName"),
    t("NoOfTest"),
    t("date"),
    t("status"),
    t("results"),
  ];

  const statusOptions = [
    { label: t("pending"), value: "pending", color: "#F0D5D1" },
    { label: t("inProcess"), value: "inProcess", color: "#FEE6DA" },
    { label: t("completed"), value: "completed", color: "#F0F8E8" },
  ];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Laborder", currentPage],
    queryFn: () => getAllOrders(currentPage),
    staleTime: 5 * 60 * 1000,
  });
  const { refetch: refetchResults } = useQuery({
    queryKey: ["LabResult", currentPage],
    queryFn: () => LabGetAllResults(currentPage),
    staleTime: 5 * 60 * 1000,
  });

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    if (!id) {
      console.error(t("orderIdIsMissing"));
      return;
    }

    try {
      const response = await labStatusChange(id, { status: newStatus });
      notifySuccess(t("updateSuccessfully"));
      refetch();
      refetchResults();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  let Laborder = data?.data?.orders;
  let tableData: any = [];

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const filteredOrders = Laborder?.filter((v: any) => {
    const searchTerm = debouncedSearch.toLowerCase();
    return (
      v?.orderId?.toLowerCase().includes(searchTerm) ||
      v?.customerName?.toLowerCase().includes(searchTerm)
    );
  });

  filteredOrders?.map((v: any, ind: any) => {
    const actualOrderId = selectedOrderId?.split("-")[0];
    let fileName: any = "";
    try {
      const urlObj = new URL(v?.results);
      fileName = urlObj.pathname.split("/").pop();
      console.log("File name:", fileName);
    } catch (err) {
      console.error("Invalid URL:", err);
    }

    tableData.push([
      v?.orderId,
      v?.customerName,
      v?.itemsCount,
      dayjs(v?.createdAt).format("DD-MM-YYYY"),
      <div className={styles.Status} onClick={(e) => e.stopPropagation()}>
        <CustomSelectOrder
          key={`${v._id}-${v.status}`}
          orderId={v?._id}
          initialStatus={v?.status}
          onStatusUpdate={handleStatusUpdate}
          statusOptions={statusOptions}
          isFileUploaded={Boolean(v?.results)}
          orderType="lab"
        />
      </div>,
      <>
        {actualOrderId == v?._id && uploading ? (
          <RingLoader size={32} />
        ) : (
          <div onClick={(e) => e.stopPropagation()}>
            {v?.results ? (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => triggerFileSelect(v, ind)}
              >
                <div style={{ width: "22px" }}>
                  <HiOutlineUpload color="ff7631" size={20} />
                </div>
                <p className={styles.uploadtext}>{fileName}</p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => triggerFileSelect(v, ind)}
              >
                <HiOutlineUpload color="ff7631" size={20} />
                <p className={styles.uploadtext}>{t("upload")}</p>
              </div>
            )}
          </div>
        )}
      </>,
    ]);
  });

  const uploadResult = (url: any, filename: string) => {
    let params = {
      resultUrl: url,
    };
    const actualOrderId = selectedOrderId?.split("-")[0];
    labUploadResult(actualOrderId, params)
      .then((res: any) => {
        notifySuccess(t("resultUploadedSuccessfully"));
        refetch();
      })
      .catch((err: any) => {})
      .finally(() => {
        setUploading(false);
        setSelectedOrderId("");
      });
  };

  const { openFilePicker } = useFilePicker({
    readAs: "DataURL",
    multiple: true,

    onFilesRejected: ({ errors }) => {
      console.log("🚀 ~ onFilesRejected ~ cjhallaa:");
      setSelectedOrderId("");
    },
    onFilesSuccessfullySelected: ({ plainFiles }) => {
      uploadImage(plainFiles[0]);
    },
  });

  const handlePickerClick = () => {
    openFilePicker();
  };

  const triggerFileSelect = (item: any, index: number) => {
    setSelectedOrderId(`${item._id}-${Date.now()}`);
  };

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ selectedOrderId:", selectedOrderId);
    if (selectedOrderId) {
      handlePickerClick();
    }
  }, [selectedOrderId]);

  const uploadImage = async (imagedata: any) => {
    setUploading(true);

    const data: any = new FormData();
    await data.append("file", imagedata);

    uploadFile(data)
      .then((res: any) => {
        if (res.status === 200 && res.statusText === "OK") {
          uploadResult(res?.data?.fileUrl, imagedata.name);
        }
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  const handleGoToOrderDeatil = (ind: any) => {
    const selectedObject: any = ordersData[ind];
    navigate(`/laboratory/order/Detail/${selectedObject?._id}`);
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
    setOrdersData(Laborder);

    if (data?.data?.totalOrders) {
      setTotalItems(data.data.totalOrders);
    }
  }, [data, totalItems]);

  return (
    <div className={classNames(commomstyles.col12)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commomstyles.pl36
            : commomstyles.pr36
        }
      >
        <div className={classNames(styles.flxBetween, commomstyles.mb24)}>
          <div className={classNames(commomstyles.flx)} style={{ gap: "12px" }}>
            <p className={classNames(styles.heading)}>{t("allOrders")}</p>

            {isLoading ? (
              <div
                className={styles.outerRefresh}
                style={{ marginLeft: "16px" }}
              >
                <RingLoader color={"#0E54A3"} size={24} />
              </div>
            ) : (
              <div className={styles.outerRefresh}>
                <TbRefresh
                  color="#7d7d7d"
                  size={24}
                  onClick={() => {
                    refetch();
                    setCurrentPage(1);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.TableOuter}>
          <div className={commomstyles.flxBetween}>
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
          </div>
          <div className={commomstyles.mt24}>
            {totalItems > 0 ? (
              <TableNew
                titles={OrderList}
                data={tableData}
                headerWidth="16%"
                itemWidth="16%"
                height="315px"
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
export default Orders;

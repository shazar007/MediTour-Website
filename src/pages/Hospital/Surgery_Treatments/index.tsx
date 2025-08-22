import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import surgery from "assets/images/HospitalDashboard/surgery.png";
import SurgeryData from "shared/components/HospitalNewComponents/SurgeryData";
import {
  addTreatment,
  getAllDoctorHospital,
  getHospital_Treatments,
  getHospTreatmentPackages,
  getTreatmentDetail,
} from "shared/services";
import collapse from "assets/images/collapse.png";
import expand from "assets/images/expand.png";
import { Checkbox, Modal } from "@mui/material";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { useSelector } from "react-redux";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";
import { RingLoader } from "shared/components";
import { useTranslation } from "react-i18next";
import AddPackageCost from "./AddPackageCost";
import { IoClose } from "react-icons/io5";
import { BiMessageSquareAdd, BiMessageSquareMinus } from "react-icons/bi";

const SurgeryTreatmnets: React.FC = () => {
  const { t }: any = useTranslation();
  const [showData, setShowData] = useState(false);
  const [itemList, setItem] = useState<any>("");
  const [data, setData] = useState<any>([]);
  const [allDoctors, setAllDoctors] = useState<any>([]);
  const [tretmentList, setTreatmentList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [subCategory, setSubCategory] = useState<any>("");

  const [hospPackages, setHospPackages] = useState([]);
  const [selectedItems, setSelectedItems] = useState<
    { treatmentId: string; childId: string | null }[] | any
  >([]);

  const { user } = useSelector((state: any) => state.root.common);

  useEffect(() => {
    fetchCatrgory();
    getAllTreatments();
    getDoctorList("");
  }, []);

  useEffect(() => {
    if (subCategory?.treatmentId) {
      getHospPackages();
    }
  }, [subCategory]);

  const getHospPackages = () => {
    console.log("/.....subCategory?.treatmentId", subCategory?.treatmentId);
    getHospTreatmentPackages(subCategory?.treatmentId)
      .then((res: any) => {
        setHospPackages(res?.data?.treatments);
      })
      .catch((err: any) => {
        if (
          err?.response?.data?.message ===
          "No treatments found for the specified criteria"
        ) {
          setHospPackages([]);
        }
      });
  };

  const fetchCatrgory = () => {
    getHospital_Treatments(user?._id)
      .then((res: any) => {
        setData(res?.data?.data);
      })
      .finally(() => {});
  };

  const getDoctorList = (keyword: any) => {
    setLoading(true);
    getAllDoctorHospital(keyword)
      .then((res: any) => {
        setAllDoctors(res?.data?.doctors);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getAllTreatments = () => {
    getHospital_Treatments().then((res: any) => {
      setTreatmentList(res?.data?.data);
    });
  };

  const handleClick = async () => {
    const transformData = (data: any) => {
      return data.map((item: any) => ({
        categoryId: item._id._id,
        treatmentIds: item.treatments.map(
          (treatment: any) => treatment.treatmentId
        ),
      }));
    };

    const newData = await transformData(data);
    setSelectedItems(newData);
    setShowModal(true);
  };

  const isChecked = (categoryId: any, treatmentId: any = null) => {
    if (treatmentId === null) {
      return (
        selectedItems.some((item: any) => item.categoryId === categoryId) ||
        data.some((item: any) => item._id?._id === categoryId)
      );
    } else {
      return (
        selectedItems.some(
          (item: any) =>
            item.categoryId === categoryId &&
            item.treatmentIds.includes(treatmentId)
        ) ||
        data.some(
          (item: any) =>
            item._id?._id === categoryId &&
            item.treatments.some((t: any) => t.treatmentId === treatmentId)
        )
      );
    }
  };

  const handleAddTreatment = () => {
    if (!selectedItems || selectedItems.length === 0) {
      notifyError(t("pleaseSelectCategory"));
      return;
    }

    const newItems = selectedItems.filter((selectedItem: any) => {
      const existingCategory = data.find(
        (dataItem: any) => dataItem._id?._id === selectedItem.categoryId
      );

      if (!existingCategory) {
        return true;
      } else {
        const newTreatments = selectedItem.treatmentIds.filter(
          (treatmentId: any) =>
            !existingCategory.treatments.some(
              (treatment: any) => treatment.treatmentId === treatmentId
            )
        );

        if (newTreatments.length > 0) {
          selectedItem.treatmentIds = newTreatments;
          return true;
        }
      }
      return false;
    });

    if (newItems.length === 0) {
      notifyError(t("pleaseSelectCategory"));
      return;
    }

    const hasEmptyTreatment = newItems.some(
      (item: any) => item.treatmentIds.length === 0
    );

    if (hasEmptyTreatment) {
      notifyError(t("pleaseSelectCategory"));
      return;
    }

    setLoading(true);
    addTreatment(newItems)
      .then((res: any) => {
        setShowModal(false);
        notifySuccess(res?.data?.message);
        fetchCatrgory();

        const updatedSelectedItems = [...selectedItems];

        data.forEach((dataItem: any) => {
          const exists = updatedSelectedItems.some(
            (selectedItem: any) => selectedItem.categoryId === dataItem._id?._id
          );
          if (!exists) {
            updatedSelectedItems.push({
              categoryId: dataItem._id?._id,
              treatmentIds: dataItem.treatments.map((t: any) => t.treatmentId),
            });
          }
        });

        setSelectedItems(updatedSelectedItems);
      })
      .catch((err: any) => {
        console.log("🚀 ~ handleAddTreatment ~ err:", err?.response?.data);
      })
      .finally(() => setLoading(false));
  };

  const [pacageModal, setPackageModal] = useState<boolean>(false);
  const handleAddPackage = () => {
    setPackageModal(true);
  };

  const [treatment, setTreatment] = useState([]);

  const fetchdetail = (keyword: any) => {
    setLoading(true);
    getTreatmentDetail(itemList, keyword)
      .then((res: any) => {
        setTreatment(res?.data?.doctors);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className={classNames(style.maincontainer)}>
        <div
          className={classNames(
            commonstyle.flx,
            commonstyle.flxBetween,
            commonstyle.flxWrap,
            commonstyle.mt16,
            commonstyle.mb16
          )}
          style={{ alignItems: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className={classNames(style.heading)}>
              {t("treatmentsOrSurgery")}
            </p>
            <button
              className={style.addbtn}
              style={{ marginLeft: "16px" }}
              onClick={handleClick}
            >
              + {t("addTreatment")}
            </button>
          </div>
        </div>
        {itemList !== "" && (
          <button className={style.packageCost} onClick={handleAddPackage}>
            + {`${t("add")}/${t("edit")} ${t("package")}`}
          </button>
        )}

        <div className={classNames(commonstyle.col12)}>
          <div
            style={{
              // gap: "5px ",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              flexWrap: "wrap",
            }}
          >
            <div
              className={classNames(
                commonstyle.col3,
                commonstyle.colmd12,
                commonstyle.colsm12
              )}
            >
              <SelectTreatment
                t={t}
                data={data}
                setItem={setItem}
                setShowData={setShowData}
                setCategoryId={setCategoryId}
                setSubCategory={setSubCategory}
              />
            </div>
            <div
              className={classNames(
                commonstyle.col9,
                commonstyle.colmd12,
                commonstyle.colsm12
              )}
            >
              <div>
                {showData ? (
                  <>
                    <SurgeryData
                      item={itemList}
                      hospPackages={hospPackages}
                      subCategory={subCategory}
                      loading={loading}
                      data={treatment}
                      fetchdetail={fetchdetail}
                    />
                  </>
                ) : (
                  <div className={classNames(style.rightside)}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        margin: "auto 0",
                      }}
                    >
                      <img
                        src={surgery}
                        alt="surgery"
                        className={classNames(style.drimg)}
                      />
                      <p className={style.Treatment}>{t("selectTreatment")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {itemList !== "" && (
          <AddPackageCost
            showModal={pacageModal}
            setShowModal={setPackageModal}
            data={allDoctors}
            subCategory={subCategory}
            categoryId={categoryId}
            fetchdetail={fetchdetail}
          />
        )}

        <CreateTreatment
          t={t}
          loading={loading}
          showModal={showModal}
          setShowModal={setShowModal}
          tretmentList={tretmentList}
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
          handleAddTreatment={handleAddTreatment}
          isChecked={isChecked}
          data={data}
        />
      </div>
    </div>
  );
};

export default SurgeryTreatmnets;

const SelectTreatment = ({
  t,
  data,
  setShowData,
  setItem,
  setCategoryId,
  setSubCategory,
}: {
  t?: any;
  data?: any;
  setShowData?: any;
  setItem?: any;
  setCategoryId?: any;
  setSubCategory?: any;
}) => {
  const [expandedIndexes, setExpandedIndexes] = useState<any>({});

  const expandAll = () => {
    const newState: any = {};
    data?.forEach((_: any, index: number) => {
      newState[index] = true;
    });
    setExpandedIndexes(newState);
  };

  const toggleIndex = (index: any) => {
    setExpandedIndexes((prev: any) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={classNames(style.leftside)}>
      <div className={style.dropdown}>
        <div className={style.header}>
          <p className={style.subheading}>{t("selectTreatment")}</p>
          <div className={style.treatmentHead} style={{ gap: "8px" }}>
            <div
              onClick={expandAll}
              className={style.iconContainer}
              style={{ cursor: "pointer" }}
            >
              <img src={expand} alt="expand" className={style.iconMedium} />
              <span style={{ fontSize: "8px", color: "#7D7D7D" }}>
                {t("expand")}
              </span>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setExpandedIndexes({})}
              className={style.iconContainer}
            >
              <img src={collapse} alt="collapse" className={style.iconMedium} />
              <span style={{ fontSize: "8px", color: "#7D7D7D" }}>
                {t("collapse")}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            height: 600,
            overflowY: "auto",
            scrollbarWidth: "thin",
            overflowX: "hidden",
          }}
        >
          {data?.map((item: any, ind: any) => {
            return (
              <>
                <div
                  onClick={() => {
                    toggleIndex(ind);
                    setCategoryId(item?._id?._id);
                  }}
                  className={classNames(commonstyle.flx, commonstyle.mt12)}
                  style={{ gap: "8px", cursor: "pointer" }}
                >
                  {expandedIndexes[ind] ? (
                    <BiMessageSquareMinus className={style.iconMedium} />
                  ) : (
                    <BiMessageSquareAdd className={style.iconMedium} />
                  )}

                  <div className={style.list}>{item?._id?.categoryName}</div>
                </div>
                {expandedIndexes[ind] &&
                  item?.treatments?.map((i: any, index: any) => (
                    <div
                      onClick={() => {
                        setItem(i?.treatmentId);
                        setSubCategory(i);
                        setShowData(true);
                      }}
                      key={index}
                      className={style.fade_in}
                      style={{
                        gap: "14px",
                        cursor: "pointer",
                        marginLeft: "30px",
                        height: "fit-content",
                        display: "flex",
                        marginTop: 16,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className={style.dotCircle} />

                      <span className={style.list} style={{ marginLeft: 20 }}>
                        {i?.subCategory}
                      </span>
                    </div>
                  ))}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CreateTreatment = ({
  t,
  showModal,
  loading,
  setShowModal,
  tretmentList,
  setSelectedItems,
  handleAddTreatment,
  data,
  isChecked,
}: {
  t?: any;
  showModal?: any;
  loading?: any;
  setShowModal?: any;
  tretmentList?: any;
  selectedItems?: any;
  setSelectedItems?: any;
  handleAddTreatment?: any;
  isChecked?: any;
  data?: any;
}) => {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const toggleSelect = (categoryId: any, childId: any | null = null) => {
    setSelectedItems((prev: any) => {
      let updatedItems: any = [...prev];
      const treatmentIndex: any = updatedItems.findIndex(
        (item: any) => item.categoryId === categoryId
      );
      if (childId === null) {
        if (treatmentIndex > -1) {
          updatedItems.splice(treatmentIndex, 1);
        } else {
          updatedItems.push({ categoryId, treatmentIds: [] });
        }
      } else {
        if (treatmentIndex > -1) {
          let existingChildIds = updatedItems[treatmentIndex].treatmentIds;
          if (existingChildIds?.includes(childId)) {
            updatedItems[treatmentIndex].treatmentIds = existingChildIds.filter(
              (id: any) => id !== childId
            );
          } else {
            updatedItems[treatmentIndex].treatmentIds = [
              ...existingChildIds,
              childId,
            ];
          }
          if (updatedItems[treatmentIndex].treatmentIds.length === 0) {
            updatedItems.splice(treatmentIndex, 1);
          }
        } else {
          updatedItems.push({ categoryId, treatmentIds: [childId] });
        }
      }
      return updatedItems;
    });
  };
  const toggleExpand = (id: any) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    showModal && (
      <Modal
        onClose={() => setShowModal(false)}
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.modal}>
          <div className={style.formcontainer}>
            <div className={classNames(commonstyle.flxBetween)}>
              <span className={classNames(style.heading)}>
                {t("selectTreatments")}
              </span>
              <IoClose
                onClick={() => setShowModal(false)}
                className={style.iconMedium}
              />
            </div>
            <div className={style.listContainer}>
              {tretmentList.map((treatment: any, index: any) => (
                <div key={index}>
                  <div style={styles.treatmentRow}>
                    <span
                      style={styles.icon}
                      onClick={() => toggleExpand(treatment?._id?._id)}
                    >
                      {treatment.treatments?.length > 0 ? (
                        expanded[treatment._id?._id] ? (
                          <ExpandMore sx={{ fontSize: 18, color: "#7D7D7D" }} />
                        ) : (
                          <ChevronRight
                            sx={{ fontSize: 18, color: "#7D7D7D" }}
                          />
                        )
                      ) : (
                        "▸"
                      )}
                    </span>
                    <Checkbox
                      sx={{
                        color: "#0E54A3", // Default color
                        "&.Mui-checked": {
                          color: "#0E54A3", // Color when checked
                        },
                        "&.Mui-disabled": {
                          color: "green", // Color when disabled
                          "& .MuiSvgIcon-root": {
                            color: "green", // Ensure the icon is green when disabled
                          },
                          opacity: 1, // Remove default opacity for disabled state
                        },
                        "& .MuiSvgIcon-root": { fontSize: 13.5 }, // Icon size
                      }}
                      checked={isChecked(treatment._id?._id)}
                      disabled={data.some(
                        (item: any) => item._id?._id === treatment._id?._id
                      )}
                      onChange={() => toggleSelect(treatment._id?._id)}
                    />
                    <span style={styles.treatmentText}>
                      {treatment?._id?.categoryName}
                    </span>
                  </div>

                  {expanded[treatment._id?._id] &&
                    treatment?.treatments.map((child: any, childIndex: any) => (
                      <div key={childIndex} style={styles.childRow}>
                        <Checkbox
                          sx={{
                            color: "#0E54A3",
                            "& .MuiSvgIcon-root": { fontSize: 13.5 },
                          }}
                          checked={isChecked(
                            treatment._id?._id,
                            child?.treatmentId
                          )}
                          disabled={data.some(
                            (item: any) =>
                              item._id?._id === treatment._id?._id &&
                              item.treatments.some(
                                (t: any) => t.treatmentId === child?.treatmentId
                              )
                          )}
                          onChange={() =>
                            toggleSelect(treatment._id?._id, child?.treatmentId)
                          }
                        />
                        <span style={styles.childText}>
                          {child?.subCategory}
                        </span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
            <button
              disabled={loading}
              onClick={handleAddTreatment}
              className={style.addbtn}
              style={{
                width: "460px",
                alignSelf: "center",
                marginTop: "32px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loading ? <RingLoader color={"#fff"} size={40} /> : t("add")}
            </button>
          </div>
        </div>
      </Modal>
    )
  );
};

const styles = {
  treatmentRow: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    width: "24px",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
  },
  treatmentText: {
    fontSize: "14px",
    fontWeight: "600",
    marginLeft: "10px",
    color: "#7D7D7D",
  },

  childText: {
    fontSize: "14px",
    fontWeight: "400",
    marginLeft: "10px",
    color: "#7D7D7D",
  },
  childRow: {
    display: "flex",
    alignItems: "center",
    marginLeft: "42px",
    marginTop: "0px",
  },
  addButton: {
    backgroundColor: "#0A58CA",
    color: "white",
    fontSize: "16px",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    marginTop: "10px",
    cursor: "pointer",
    textAlign: "center",
  },
};

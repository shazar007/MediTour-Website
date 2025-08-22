import { useState, useEffect, useRef } from "react";
import commonstyle from "shared/utils/common.module.css";
import style from "./style.module.css";
import classNames from "classnames";
import { RequestTable } from "shared/components";
import { IoIosArrowDown } from "react-icons/io";
import { Modal } from "@mui/material";
import {
  addDepartmentHospital,
  departmentName,
  depatmentStatus,
  editDepartmentHospital,
  fetchDepartmentHospital,
  getDepartmentDirector,
} from "shared/services";
import { FiSettings } from "react-icons/fi";
import CustomizedSwitche from "shared/components/SwitchButton";
import { CiEdit } from "react-icons/ci";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";

const ManageDepartsnew = () => {
  const { t }: any = useTranslation();
  const [showModel, setShowModel] = useState<any>(false);
  const [departmentData, setData] = useState<any>([]);
  const [director, setDirector] = useState<any>([]);
  const [hospitalDepartData, setHospitalDepartData] = useState<any>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [openName, setOpenDoctor] = useState(false);
  const [selectName, setCategoryName] = useState<any>("");
  const [depart, setDepart] = useState<any>([]);
  const [length, setLength] = useState(0);
  const [search, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [type, setType] = useState("");
  const [modalType, setModalType] = useState("");
  const [doctorName, setDoctorName] = useState<any>("");
  const navigate = useNavigate();
  const titles = [
    t("_name"),
    t("director"),
    t("mobile"),
    t("CNIC"),
    t("email"),
    t("settings"),
  ];

  const totalItems = length;
  const handelModel = (type: any) => {
    setModalType(type);
    setShowModel(true);
  };
  const closeModel = () => {
    setShowModel(false);
  };
  useEffect(() => {
    fetchDepart();
    fetchDirector();
    fetchDepartment(1, "");
  }, []);

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    fetchDepartment(1, debouncedSearch);
  }, [debouncedSearch]);

  const fetchDepartment = (pageno: number, keyWord: any) => {
    setLoading(true);
    fetchDepartmentHospital(pageno, keyWord)
      .then((res: any) => {
        setTableData(res.data?.departments);
        setHospitalDepartData(res.data?.departments);
        setLength(res?.data?.totalDeparts);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleToggle = (e: any, index?: number) => {
    e.stopPropagation();
    console.log("Toggle clicked for index:", index); // Debug toggle
    setOpenDropdown((prev: any) => (prev === index ? null : index));
  };
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSwitchChange = (e: any, index: number, v: any) => {
    const updatedTableData: any = [...tableData];

    if (updatedTableData[index]) {
      updatedTableData[index].isActive = e.target.checked;
      setTableData(updatedTableData);
      const isActive = updatedTableData[index].isActive;

      let body = {
        id: v?._id,
        type: "department",
        isActive: isActive,
      };
      depatmentStatus(body)
        .then((res) => {
          notifySuccess(res?.data?.message);
        })
        .catch((err) => {});
    }
  };

  const [editItems, setEditItems] = useState<any>({});

  const handleEditDepartment = (i: any) => {
    let createBody = {
      departmentId: i?._id,
      department: i?.categoryId?.categoryName,
      director: i?.headDocId?.name,
    };
    setCategoryName(i?.categoryId);
    setEditItems(createBody);
    handelModel("edit");
    //
  };

  useEffect(() => {
    if (tableData) {
      handleTableData();
    }
  }, [tableData, openDropdown]);

  const handleTableData = () => {
    let tempData: any = [];
    if (tableData?.length > 0) {
      tableData.map((v: any, ind: any) => {
        tempData.push([
          v?.categoryId?.categoryName || v?.vendorId,
          v?.headDocId?.name || v?.name,
          v?.headDocId?.phoneNumber || v?.phoneNumber,
          v?.headDocId?.cnicOrPassportNo || v?.email,
          v?.headDocId?.email || v?.clinicExperience,
          type ? v?.qualifications : null,
          type ? null : (
            <div
              className="dropdown-container"
              style={{
                position: "relative",
              }}
            >
              <div onClick={(e: any) => handleToggle(e, ind)}>
                <FiSettings
                  size={24}
                  color="red"
                  style={{
                    position: "relative",
                    cursor: "pointer",
                  }}
                />
              </div>
              {openDropdown === ind && (
                <div
                  style={{
                    backgroundColor: "#fff",
                    right: isRtl ? "-50px" : "15px",
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className={style.dropdownContent}
                >
                  <div className={style.settingbar}>
                    <p className={style.settingtitle}>{t("active")}</p>
                    <div className={style.switchWrapper}>
                      <CustomizedSwitche
                        check={v?.isActive}
                        onChange={(e: any) => handleSwitchChange(e, ind, v)}
                      />
                    </div>
                  </div>

                  <div className={style.settingbar}>
                    <p className={style.settingtitle}>{t("edit")}</p>
                    <CiEdit
                      onClick={() => handleEditDepartment(v)}
                      size={24}
                      className={style.icon}
                    />
                  </div>
                </div>
              )}
            </div>
          ),
        ]);
      });
      setDepart(tempData);
    } else {
      setDepart([]);
    }
  };

  const fetchDepart = () => {
    departmentName()
      .then((res: any) => {
        setData(res.data);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };
  const fetchDirector = () => {
    getDepartmentDirector()
      .then((res: any) => {
        setDirector(res.data?.doctors);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };
  const addDepartment = () => {
    if (!selectName?._id) {
      if (modalType === "edit") {
        notifyError(t("pleaseSelectDirector_"));
      } else {
        notifyError(t("pleaseSelectDepartment_"));
      }
      return;
    }
    let check = modalType === "edit" ? "departmentId" : "categoryId";

    const params = {
      ...{
        [check]:
          modalType === "edit" ? editItems?.departmentId : selectName?._id,
      },
      headDocId: doctorName?._id,
    };

    const fetch =
      modalType === "edit"
        ? editDepartmentHospital(params)
        : addDepartmentHospital(params);
    fetch
      .then((res: any) => {
        fetchDepart();
        fetchDepartment(1, "");
        setShowModel(false);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };
  const { isRtl } = useDirection();
  const handleGoToDetail = (itemIndex: number) => {
    const originalData = hospitalDepartData[itemIndex];
    navigate("/manageepartments/detail", { state: originalData?._id });
  };
  return (
    <div>
      <div className={classNames(style.maincontainer)}>
        <div
          className={classNames(
            commonstyle.flx,
            commonstyle.flxBetween,
            commonstyle.flxWrap,
            commonstyle.mb16,
            commonstyle.mt16
          )}
        >
          <p
            className={classNames(
              commonstyle.mt16,
              commonstyle.mb16,
              style.heading
            )}
          >
            {t("manageDepartments")}
          </p>
          <button
            className={style.addbtn1}
            onClick={() => {
              setCategoryName("");
              setDoctorName("");
              handelModel("create");
            }}
          >
            + {t("create")}
          </button>
        </div>

        <div>
          <RequestTable
            lab={titles}
            appointment={depart}
            loading={loading}
            length={length}
            allHospital={fetchDepartment}
            handleGoToDetail={handleGoToDetail}
            totalItems={totalItems}
            setDepart={setDepart}
            search={search}
            setSearch={setSearch}
            headTitle={t("departments")}
            setType={setType}
          />
        </div>
        {showModel && (
          <Modal open={showModel} onClose={closeModel} className={style.modal}>
            <div ref={modalRef} className={style.modelcontent}>
              <div className={classNames(style.innercontent)}>
                <div>
                  <p className={style.heading}>{t("selectDepartment")}</p>
                </div>
                <div
                  className={style.inputGroupBasic}
                  style={{
                    marginTop: "20%",
                  }}
                >
                  <div
                    className={style.datePickerContainer}
                    onClick={() => {
                      setOpenDoctor(false);
                      setOpen(modalType === "edit" ? false : !open);
                    }}
                  >
                    <div>
                      {selectName?.categoryName
                        ? selectName?.categoryName
                        : modalType === "edit"
                        ? editItems?.department
                        : `${t("selectDepartment")}*`}
                    </div>
                    <span
                      style={{
                        backgroundColor: "#F2F2F2",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        position: "absolute",
                        right: "10px",
                      }}
                    >
                      <IoIosArrowDown
                        size={32}
                        color={open ? "#FF9500" : "#CCCCCC"}
                      />
                    </span>
                  </div>
                  {open && (
                    <>
                      <div className={style?.options}>
                        {departmentData
                          ?.filter(
                            (item: any, index: any, self: any) =>
                              index ===
                              self.findIndex(
                                (t: any) =>
                                  t?.categoryId?.categoryName ===
                                  item?.categoryId?.categoryName
                              )
                          )
                          .map((i: any) => {
                            return (
                              <div
                                style={{
                                  padding: "8px",
                                  backgroundColor:
                                    selectName === i ? "red" : "#fff",
                                  cursor: "pointer",
                                  color: selectName === i ? "#fff" : "black",
                                }}
                                onClick={() => {
                                  setOpen(!open);
                                  setCategoryName(i?.categoryId);
                                }}
                              >
                                {i?.categoryId?.categoryName}
                              </div>
                            );
                          })}
                      </div>
                    </>
                  )}
                </div>
                <div className={style.inputGroupBasic}>
                  <div
                    className={style.datePickerContainer}
                    onClick={() => setOpenDoctor(!openName)}
                  >
                    <div>
                      {doctorName?.name
                        ? doctorName?.name
                        : editItems?.director
                        ? editItems?.director
                        : `${t("selectDirector")}*`}
                    </div>

                    <span
                      style={{
                        backgroundColor: "#F2F2F2",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        position: "absolute",
                        right: "10px",
                      }}
                    >
                      <IoIosArrowDown
                        size={32}
                        color={openName ? "#FF9500" : "#CCCCCC"}
                      />
                    </span>
                  </div>
                  {openName && (
                    <>
                      <div className={style?.options}>
                        {director.map((i: any) => {
                          return (
                            <div
                              style={{
                                padding: "8px",
                                backgroundColor:
                                  doctorName?.name === i ? "red" : "#fff",
                                cursor: "pointer",
                                color:
                                  doctorName?.name === i ? "#fff" : "black",
                              }}
                              onClick={() => {
                                setOpenDoctor(false);
                                setDoctorName(i);
                              }}
                            >
                              {i?.name}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                <button className={style.addbtn} onClick={addDepartment}>
                  {t("add")}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ManageDepartsnew;

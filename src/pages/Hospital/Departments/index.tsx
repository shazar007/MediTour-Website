import React from "react";
import classNames from "classnames";
import MainMedicalstyle from "../mainMedicalService.module.css";
import commonStyles from "shared/utils/common.module.css";
import styles from "./Department.module.css";
import { useEffect, useState } from "react";
import commonstyles from "shared/utils/common.module.css";
import { IoClose } from "react-icons/io5";
import NewPagination from "shared/components/NewPagination/NewPagination";

import {
  CustomInput,
  CustomModal,
  DeleteModal,
  PrimaryButton,
  RingLoader,
} from "shared/components";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  getAllDepartments,
  hospitalAddDepartment,
  hospitalDELETEDEPART,
  hospitalEditDepartment,
  hospitalGetDepartment,
} from "../../../shared/services/HospitalService";
import style from "./Department.module.css";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ImgPicker from "shared/components/Img-picker";
import { hospitalAddDepartmentSchema } from "shared/utils";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { setDepartment } from "shared/redux";
import { MdDeleteOutline } from "react-icons/md";
import { TbRefresh } from "react-icons/tb";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";

const Hospital_Departments = () => {
  const { department } = useSelector((state: any) => state.root.hospital);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isMode, setIsMode] = useState("");
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<string | null>(
    null
  );

  const [getdata, setGetData] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const itemsPerPage = 10;
  const [rotation, setRotation] = useState<number>(0);
  const rotationIncrement: number = 90;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = department?.length || 0;

  const fetchAllDepartment = (searchWord: any) => {
    setLoading(true);
    getAllDepartments(searchWord)
      .then((res: any) => {
        if (res?.data?.auth) {
          dispatch(setDepartment(res?.data?.departments));
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const EditmodelOpen = (_id: any) => {
    hospitalGetDepartment(_id)
      .then((res: any) => {
        setGetData(res.data.department);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id: string) => {
    setDepartmentToDelete(id);
    setShowActionButtons(true);
  };

  const confirmDelete = () => {
    if (departmentToDelete) {
      setLoading(true);
      hospitalDELETEDEPART(departmentToDelete)
        .then((res: any) => {
          fetchAllDepartment("");
        })
        .catch((err: any) => {})
        .finally(() => {
          setLoading(false);
          setShowActionButtons(false);
          setDepartmentToDelete(null);
        });
    }
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < totalItems) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleRotate = () => {
    setRotation(rotation - rotationIncrement);
    fetchAllDepartment("");
  };

  useEffect(() => {
    fetchAllDepartment("");
  }, []);
  const handleSearch = () => {
    setCurrentPage(1);
    fetchAllDepartment(search);
  };
  return (
    <div className={classNames(commonstyles.col12)}>
      <div>
        <div className={style.outerContainer}>
          <div
            className={classNames(
              commonStyles.mb24,
              commonStyles.flx,
              commonStyles.flxBetween,
              commonstyles.flxWrap
            )}
          >
            <div className={commonstyles.flx}>
              {loading ? (
                <div className={commonstyles.loader}>
                  <RingLoader color={"#0D47A1"} size={24} />
                </div>
              ) : (
                <div className={style.outerRefresh}>
                  <TbRefresh
                    color="#7d7d7d"
                    size={24}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onClick={handleRotate}
                  />
                </div>
              )}
              <SearchFilter
                vender={false}
                search={search}
                title={"Search"}
                setSearch={setSearch}
                handleSearch={handleSearch}
              />
              <div>
                <BiSolidMessageSquareAdd
                  className={styles.RefreshIcon}
                  onClick={() => {
                    setShowAddModal(true);
                    setIsMode("Add");
                  }}
                />
              </div>
            </div>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, totalItems)}
              totalItems={totalItems}
            />
          </div>
          {department && department.length > 0 ? (
            <div>
              <div className={style.flexwrap}>
                {department
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((dep: any, index: number) => (
                    <div key={index} className={style.card}>
                      <div className={style.end}>
                        <MdDeleteOutline
                          onClick={() => handleDelete(dep._id)}
                          className={classNames(
                            style.delete,
                            commonstyles.colorBlue
                          )}
                        />
                        <FaRegEdit
                          onClick={() => {
                            setShowAddModal(true);
                            EditmodelOpen(dep._id);
                            setIsMode("Edit");
                          }}
                          className={classNames(
                            style.edit,
                            commonstyles.colorBlue
                          )}
                        />
                      </div>
                      <div className={style.topicons}>
                        <img
                          src={dep.dapartmentLogo}
                          className={style.heart}
                          alt="dapartmentLogo"
                        />
                      </div>
                      <div
                        className={classNames(
                          commonstyles.fs16,
                          commonstyles.semiBold,
                          style.center,
                          commonstyles.colorBlue
                        )}
                      >
                        <p>{dep.departmentName}</p>
                      </div>

                      {showActionButtons && (
                        <DeleteModal
                          title="department?"
                          modalVisible={showActionButtons}
                          handleCancel={() => {
                            setShowActionButtons(false);
                            setDepartmentToDelete(null);
                          }}
                          handleDelete={confirmDelete}
                          loading={loading}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <>
              <PhysiotheristsEmpty />
            </>
          )}

          <CustomModal
            showModal={showAddModal}
            children={
              <AddDepartment
                setShowAddModal={setShowAddModal}
                getdata={getdata}
                isMode={isMode}
                fetchAllDepartment={fetchAllDepartment}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};
export default Hospital_Departments;

interface AmbProps {
  setShowAddModal: any;
  isMode: any;
  getdata: any;
  fetchAllDepartment: any;
}

const AddDepartment = (props: Partial<AmbProps & { initialValues?: any }>) => {
  const [loading, setLoading] = useState(false);
  const {
    setShowAddModal,
    isMode,
    initialValues,
    getdata,
    fetchAllDepartment,
  } = props;
  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const departmentId = getdata?._id;
  const formik = useFormik({
    initialValues: {
      departmentName: initialValues?.departmentName || "",
      departmentLogo: initialValues?.departmentLogo || "",
    },
    validationSchema: Yup.object(hospitalAddDepartmentSchema),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleDeparmentLogoUrl = (url: any) => {
    formik.setFieldValue("departmentLogo", url);
  };

  const handleSubmit = () => {
    setLoading(true);
    let params = {
      departmentName: formik.values.departmentName,
      dapartmentLogo: formik.values.departmentLogo,
    };

    if (isMode === "Add") {
      hospitalAddDepartment(params)
        .then((res: any) => {
          setShowAddModal(false);

          fetchAllDepartment();
        })
        .catch((err: any) => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      hospitalEditDepartment(departmentId, params)
        .then((res: any) => {
          setShowAddModal(false);

          fetchAllDepartment();
        })
        .catch((err: any) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (isMode === "Add") {
      formik.setFieldValue("departmentName", "");
      formik.setFieldValue("departmentLogo", "");
    } else {
      if (getdata)
        formik.setFieldValue("departmentName", getdata?.departmentName);
      formik.setFieldValue("departmentLogo", getdata?.dapartmentLogo);
    }
  }, [isMode, getdata]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={commonStyles.flx}>
          <div style={{ marginBottom: "8px", marginLeft: "auto" }}>
            <IoClose className={style.close} onClick={handleCloseModal} />
          </div>
        </div>
        <div className={classNames(commonStyles.mb28, MainMedicalstyle.flx)}>
          {" "}
          <div style={{ width: "210px" }} className={commonStyles.mr32}>
            <CustomInput
              placeholder="Deparment Name"
              id="departmentName"
              name="departmentName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.departmentName}
            />
            {formik.touched.departmentName && formik.errors.departmentName ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.departmentName as React.ReactNode}
              </div>
            ) : null}
          </div>{" "}
          <div style={{ width: "210px", overflow: "hidden" }}>
            <ImgPicker
              placeholder="Department Logo"
              setData={handleDeparmentLogoUrl}
              initialValue={formik.values?.departmentLogo}
            />
            {formik.touched.departmentLogo && formik.errors.departmentLogo ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.departmentLogo as React.ReactNode}
              </div>
            ) : null}
          </div>
        </div>
        <div className={MainMedicalstyle.buttonWidth}>
          <PrimaryButton
            children={
              loading ? (
                <RingLoader size={35} color={"#fff"} />
              ) : isMode === "Add" ? (
                "Add Department"
              ) : (
                "Update Department"
              )
            }
            type="submit"
            colorType={isMode === "Add" ? "green" : "green"}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

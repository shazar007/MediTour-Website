import { useState, useEffect } from "react";
import style from "./branches.module.css";
import TableNew from "shared/components/A_New_Components/Table_new";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import commonstyle from "shared/utils/common.module.css";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import { Modal } from "@mui/material";
import { InputField, RingLoader } from "shared/components";

import {
  addLabBranch,
  deleteBranch,
  getCities,
  getBranch,
  updateLabBranch,
} from "shared/services/LabService";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import CityFilter from "shared/components/CityFilter";
import LocationInput from "shared/components/LocationInput";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { useQuery } from "@tanstack/react-query";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { CgCloseR } from "react-icons/cg";
import { useTranslation } from "react-i18next";

export default function Branches() {
  const { t, i18n }: any = useTranslation();
  const { user } = useSelector((state: any) => state.root.common);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState<any>(null);

  const Branch = [
    t("branchCode"),
    t("address"),
    t("city"),
    t("phone"),
    t("settings"),
  ];

  const closeModal = () => {
    setIsModalOpen(false);
    formik?.resetForm();
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const itemsPerPage = 10;

  const handleDelete = () => {
    if (!selectedObject) return;

    setLoading(true);
    deleteBranch(selectedObject._id)
      .then((res: any) => {
        refetch();
        setDeleteModalOpen(false);
      })
      .catch((err: any) => {
        console.error("Delete failed:", err.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openAddModal = () => {
    setSelectedObject(null);
    setIsModalOpen(true);
    formik.resetForm();
  };

  const openEditModal = (branch: any) => {
    setSelectedObject(branch);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "Branches",
      user?._id,
      currentPage,
      debouncedSearch,
      selectedCity,
    ],
    queryFn: () => {
      return getBranch(user?._id, currentPage, debouncedSearch).then(
        (response) => {
          if (selectedCity) {
            const filteredBranches = response.data.labBranches.filter(
              (branch: any) => branch.location.city === selectedCity
            );

            return {
              ...response,
              data: {
                ...response.data,
                labBranches: filteredBranches,
                totalCount: filteredBranches.length,
              },
            };
          }
          return response;
        }
      );
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: citiesData, isLoading: isCitiesLoading } = useQuery({
    queryKey: ["Cities", user?._id],
    queryFn: () => getCities(user?._id, user?._id, currentPage),
    staleTime: 5 * 60 * 1000,
  });

  let LabBranches = data?.data?.labBranches;
  let tableData: any = [];
  LabBranches?.map((v: any, ind: any) => {
    tableData.push([
      v?.branchCode,
      v?.location?.address,
      v?.location?.city,
      v?.phoneNumber,
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <CiEdit
          size={24}
          color="#454545"
          onClick={() => openEditModal(v)}
          style={{ cursor: "pointer" }}
        />
        <CgCloseR
          size={24}
          color="#FF3B30"
          onClick={() => {
            setSelectedObject(v);
            setDeleteModalOpen(true);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>,
    ]);
  });

  const handleGoToOrderDeatil = (ind: any) => {
    const selected = LabBranches[ind];
    setSelectedObject(selected);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      branchCode: selectedObject?.branchCode || "",
      address: selectedObject?.location?.address || "",
      city: selectedObject?.location?.city || "",
      phone: selectedObject?.phoneNumber || "",
      country: selectedObject?.country || "",
      lat: selectedObject?.location?.lat || "",
      lng: selectedObject?.location?.lng || "",
    },

    validationSchema: Yup.object({
      branchCode: Yup.string().required(t("branchCodeRequired")),
      address: Yup.string().required(t("addressIsRequired")),
      city: Yup.string().required(t("cityIsRequired")),
      phone: Yup.string()
        .matches(/^[+0-9]+$/, t("onlyNumbersAnd_Plus_Allowed"))
        .required(t("phoneIsRequired")),
      country: Yup.string().required(t("countryIsRequired")),
    }),

    onSubmit: (values) => {
      handleSaveLab();
    },
  });

  useEffect(() => {
    formik?.validateForm();
  }, [i18n.language]);

  const handleLocationChange = async (newLocation: any) => {
    const labelParts: any = newLocation?.label.split(", ");
    const country = labelParts[labelParts.length - 1];
    formik?.setFieldValue("address", newLocation?.label);
    formik?.setFieldValue("city", newLocation?.city);
    formik?.setFieldValue("country", country);
    const address = newLocation?.label;
    const apiKey = "AIzaSyBrNjsUsrJ0Mmjhe-WUKDKVaIsMkZ8iQ4A";
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        formik?.setFieldValue("lat", location.lat);
        formik?.setFieldValue("lng", location.lng);
      } else {
        console.error("Geocoding error: ", data.status);
      }
    } catch (error) {
      console.error("Error fetching geocoding data: ", error);
    }
  };

  const handleSaveLab = () => {
    const values = formik.values;
    setLoading(true);

    const baseParams = {
      branchCode: values.branchCode,
      phone: values.phone,
      country: "Pakistan",
      location: {
        lng: values.lng,
        lat: values.lat,
        address: values.address,
        city: values.city,
      },
    };

    const params = selectedObject?._id
      ? baseParams
      : { ...baseParams, mainLabId: user?._id };

    const request = selectedObject?._id
      ? updateLabBranch(selectedObject._id, params)
      : addLabBranch(params);

    request
      .then(() => {
        refetch();
        setIsModalOpen(false);
        setSelectedObject(null);
        formik.resetForm();
      })
      .catch((err: any) => {
        console.log("Error saving branch:", err?.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
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
    if (data?.data?.totalCount) {
      setTotalItems(data.data.totalCount);
    }
  }, [data, totalItems]);

  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyles.pl36
          : commonstyles.pr36
      }
    >
      <div className={style.flx}>
        <div
          className={style.flx}
          style={{ justifyContent: "start ", gap: "16px" }}
        >
          <p className={style.mainHeading}>{t("branchManagement")}</p>
          {isLoading ? (
            <div className={style.outerRefresh}>
              <RingLoader color={"#0D47A1"} size={24} />
            </div>
          ) : (
            <div className={style.outerRefresh}>
              <TbRefresh color="#7d7d7d" size={24} onClick={() => refetch()} />
            </div>
          )}
        </div>
        <div className={style.flexx}>
          <CityFilter
            cities={
              citiesData
                ? Array.isArray(citiesData.data)
                  ? citiesData.data
                  : citiesData.data?.cities || []
                : []
            }
            onCityChange={(city) => {
              setSelectedCity(city);
              setCurrentPage(1); // Reset to first page when city changes
            }}
            onApply={(city) => console.log("Applied:", city)}
            onReset={() => {
              setSelectedCity("");
              setCurrentPage(1); // Reset to first page when city filter is reset
            }}
          />

          <button className={style.AddBtn} onClick={openAddModal}>
            + {t("addBranch")}
          </button>
        </div>
      </div>
      <div className={classNames(commonstyles.mt16, style.tablecontainer)}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginBottom: "8px",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{ alignItems: "center", gap: "16px" }}
            className={classNames(commonstyles.flx, commonstyles.flxWrap)}
          >
            <p
              className={classNames(
                commonstyles.colorBlack,
                commonstyles.fs14,
                commonstyles.semiBold
              )}
            >
              {t("branches")}
            </p>
            <div>
              <SearchFilter
                title={t("search")}
                search={search}
                setSearch={setSearch}
              />
            </div>
          </div>
          <div>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, totalItems)}
              totalItems={totalItems}
            />
          </div>
        </div>

        <div className={classNames(commonstyles.mt16)}>
          {" "}
          {totalItems > 0 ? (
            <TableNew
              titles={Branch}
              data={tableData}
              headerWidth="20%"
              handleGoToDetail={handleGoToOrderDeatil}
              itemWidth="20%"
              show="default"
              height="49.6vh"
            />
          ) : (
            <>
              <PhysiotheristsEmpty />
            </>
          )}
        </div>
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <div className={style.modalContent}>
          <p className={style.texts}>
            {selectedObject
              ? t("edit") + " " + t("branch")
              : t("add_A_NewBranch")}
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className={classNames(style.mt32, style.gridContainer)}>
              <div className={style.w100}>
                <InputField
                  borderRadius={4}
                  height="48px"
                  border={0}
                  borderColor="#7D7D7D"
                  placeholder={t("branchCode")}
                  name="branchCode"
                  value={formik.values.branchCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.branchCode && formik.errors.branchCode && (
                  <p className={style.errorText}>{t("branchCodeRequired")}</p>
                )}
              </div>
              <div className={style.w100}>
                <LocationInput
                  placeholder={
                    formik.values.address || `${t("branchAddress")}*`
                  }
                  type={"box"}
                  setData={handleLocationChange}
                  defaultValue={formik.values.address}
                />

                {formik.touched.address && formik.errors.address && (
                  <p className={style.errorText}>{t("addressIsRequired")}</p>
                )}
              </div>
              <div className={style.w100}>
                <InputField
                  borderRadius={4}
                  height="48px"
                  border={0}
                  borderColor="#7D7D7D"
                  placeholder={t("city")}
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city && (
                  <p className={style.errorText}>{t("cityIsRequired")}</p>
                )}
              </div>
              <div className={style.w100}>
                <InputField
                  borderRadius={4}
                  height="48px"
                  border={0}
                  borderColor="#7D7D7D"
                  placeholder={t("phone")}
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className={style.errorText}>{t("phoneIsRequired")}</p>
                )}
              </div>
              <div className={style.w100}>
                <InputField
                  borderRadius={4}
                  height="48px"
                  border={0}
                  borderColor="#7D7D7D"
                  placeholder={t("country")}
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.country && formik.errors.country && (
                  <p className={style.errorText}>{t("countryIsRequired")}</p>
                )}
              </div>
            </div>
            <div className={classNames(style.mt32, style.flxBetween)}>
              <button className={style.backBtn} onClick={closeModal}>
                {t("back")}
              </button>
              <button
                className={style.SaveBtn}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RingLoader color={"#fff"} size={30} />
                  </div>
                ) : (
                  t("save")
                )}
              </button>
            </div>{" "}
          </form>
        </div>
      </Modal>

      <Modal open={DeleteModalOpen} onClose={closeDeleteModal}>
        <div className={classNames(style.modalBackdrop)}>
          <div className={classNames(style.modalContainer)}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IoClose
                className={style.closeicon}
                onClick={() => setDeleteModalOpen(false)}
              />
            </div>
            <div className={classNames(commonstyle.flx, commonstyle.flxCol)}>
              <p className={classNames(commonstyle.fs24, commonstyle.semiBold)}>
                {t("areYouSure")}
              </p>
              <p
                className={classNames(commonstyle.colorGray, commonstyle.fs16)}
              >
                {`${t("youWantToDeleteThis")} ${t("branch")}`}
              </p>
              <div
                style={{ gap: "18px" }}
                className={classNames(
                  commonstyle.flx,
                  commonstyle.flxBetween,
                  style.mt24
                )}
              >
                <button
                  className={style.cancelbtn}
                  onClick={() => setDeleteModalOpen(false)}
                >
                  {t("noCancel")}
                </button>
                <button className={style.dltbtn} onClick={handleDelete}>
                  {loading ? (
                    <RingLoader color={"#fff"} size={30} />
                  ) : (
                    t("yesDelete")
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

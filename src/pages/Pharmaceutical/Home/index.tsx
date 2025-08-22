import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import commonStyles from "shared/utils/common.module.css";
import Styles from "./styles.module.css";
import Picker from "assets/images/imagePPicker.png";
import {
  CustomModal,
  InputField,
  PrimaryButton,
  RingLoader,
} from "shared/components";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddFormulaSchema } from "shared/utils";
import {
  medicineId,
  pharmaceutical_AddMed,
  pharmaceutical_DeleteMed,
  pharmaceutical_Edit_Med,
  pharmaceutical_getAllMedicines,
  uploadFile,
} from "shared/services";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import TableNew from "shared/components/A_New_Components/Table_new";
import { useQuery } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import { CgCloseR } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

const medicineTypeData = [
  { title: "Tablet", value: "Tablet" },
  { title: "Capsule", value: "Capsule" },
  { title: "Syrup", value: "Syrup" },
  { title: "Injection", value: "Injection" },
  { title: "Ointment", value: "ointment" },
  { title: "Insulin ", value: "Insulin" },
  { title: "Suppositories", value: "suppositories" },
  { title: "Patches ", value: "patches" },
  { title: "Powders ", value: "powders" },
  { title: "Inhalers ", value: "inhalers" },
  { title: "Drops ", value: "drops" },
];

export const Pharmaceutical_Dashboard = () => {
  const { t, i18n }: any = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [deleteItem, setDeleteItem] = useState<{
    val: any;
    index: number;
  } | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [totalItems, setTotalItems] = useState<any>(null);
  const [medicines, setMedicines] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const MedicinList = [
    t("productName"),
    t("brand"),
    t("strength"),
    t("packSize"),
    t("T.P Price"),
    t("M.R.P Price"),
    t("action"),
  ];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Pharamceuitcal", currentPage],
    queryFn: () => pharmaceutical_getAllMedicines(currentPage),
    staleTime: 5 * 60 * 1000,
  });

  let medicinestT = data?.data?.medicines;

  let tableData: any = [];
  medicinestT?.map((v: any, ind: any) => {
    tableData.push([
      v?.productName || "-",
      v?.brand || "-",
      v?.strength || "-",
      v?.packSize || "-",
      v?.tpPrice || "-",
      v?.mrpPrice || "-",
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <CiEdit
          color="#7d7d7d"
          size={20}
          onClick={() => {
            setSelectedItem(v);
            setShowEditModal(true);
          }}
        />{" "}
        <CgCloseR
          className={Styles.deleteIcon}
          onClick={() => initiateDelete(v, ind)}
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
    setMedicines(medicinestT);

    if (data?.data?.totalMeds) {
      setTotalItems(data?.data?.totalMeds);
    }
  }, [data, totalItems, medicinestT]);

  const initiateDelete = (val: any, index: number) => {
    setDeleteItem({ val, index });
    setShowConfirmDelete(true);
  };

  const handleDelete = () => {
    if (deleteItem) {
      pharmaceutical_DeleteMed(deleteItem.val?._id)
        .then((res: any) => {
          refetch();
          const newItems = medicines.filter(
            (_: any, i: number) => i !== deleteItem.index
          );
          setMedicines(newItems);
          setDeleteItem(null);
        })
        .catch((err: any) => {});
    }
    setShowConfirmDelete(false);
  };

  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonStyles.pl36
          : commonStyles.pr36
      }
    >
      <div className={classNames(Styles.flxBetween)}>
        <div className={classNames(commonStyles.flx)} style={{ gap: "16px" }}>
          <p
            className={classNames(
              commonStyles.fs22,
              Styles.primarycolor,
              commonStyles.semiBold
            )}
          >
            {t("allMedicines")}
          </p>
          {isLoading ? (
            <div className={Styles.outerRefresh}>
              <RingLoader size={24} color="#0e54a3" />
            </div>
          ) : (
            <div
              className={Styles.outerRefresh}
              onClick={() => {
                refetch();
                setCurrentPage(1);
              }}
            >
              <TbRefresh size={24} color="#7d7d7d" />
            </div>
          )}{" "}
        </div>
        <div onClick={() => setShowAddModal(true)}>
          <button className={Styles.addBtn}> + {t("add")}</button>
        </div>
      </div>
      <div className={Styles.TableOuter}>
        <div
          style={{ justifyContent: "end" }}
          className={classNames(commonStyles.flx)}
        >
          <NewPagination
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
            startItem={(currentPage - 1) * itemsPerPage + 1}
            endItem={Math.min(currentPage * itemsPerPage, totalItems)}
            totalItems={totalItems}
          />
        </div>
        <div>
          {" "}
          {totalItems > 0 ? (
            <TableNew
              titles={MedicinList}
              data={tableData}
              headerWidth="14%"
              itemWidth="14%"
              height="350px"
            />
          ) : (
            <>
              <PhysiotheristsEmpty />
            </>
          )}
        </div>
      </div>
      {showConfirmDelete && (
        <div className={classNames(Styles.modalBackdrop)}>
          <div className={classNames(Styles.modalContainer)}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IoClose
                className={Styles.closeicon}
                onClick={() => setShowConfirmDelete(false)}
              />
            </div>
            <div
              style={{ width: "100%" }}
              className={classNames(commonStyles.flx, commonStyles.flxCol)}
            >
              <p
                className={classNames(commonStyles.fs24, commonStyles.semiBold)}
              >
                {t("areYouSure")}
              </p>
              <p
                className={classNames(
                  commonStyles.colorGray,
                  commonStyles.fs16
                )}
              >
                {t("deleteThisMedicine")}
              </p>
              <div
                className={classNames(
                  commonStyles.flx,
                  Styles.mt24,
                  commonStyles.flxBetween
                )}
              >
                <button
                  className={Styles.cancelbtn}
                  onClick={() => setShowConfirmDelete(false)}
                >
                  {t("noCancel")}
                </button>
                <button className={Styles.dltbtn} onClick={handleDelete}>
                  {isLoading ? (
                    <RingLoader color={"#fff"} size={30} />
                  ) : (
                    t("yesDelete")
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <CustomModal
        showModal={showAddModal}
        children={
          <AddFormula
            t={t}
            setShowAddModal={setShowAddModal}
            loading={isLoading}
            medicines={medicines}
            setMedicines={setMedicines}
          />
        }
      />{" "}
      <CustomModal
        showModal={showEditModal}
        children={
          <EditFormula
            t={t}
            setShowEditModal={setShowEditModal}
            selectedItem={selectedItem}
            loading={isLoading}
          />
        }
      />
    </div>
  );
};
export default Pharmaceutical_Dashboard;

const AddFormula = (props: any) => {
  const { t, setShowAddModal } = props;

  const { refetch } = useQuery({
    queryKey: ["Pharamceuitcal", 1],
    queryFn: () => pharmaceutical_getAllMedicines(1),
    staleTime: 5 * 60 * 1000,
  });

  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isloading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      genericId: "",
      strength: "",
      packSize: "",
      content: "",
      tpPrice: "",
      mrpPrice: "",
      productType: "",
      brand: "",
      images: [],
    },
    validationSchema: Yup.object(AddFormulaSchema(t)),
    onSubmit: () => {
      handleSubmit();
    },
  });
  console.log("🚀 ~ AddFormula ~ formik:", formik.values);

  const handleSubmit = () => {
    setLoading(true);
    refetch();
    pharmaceutical_AddMed(formik.values)
      .then(() => {
        refetch();
        setShowAddModal(false);
      })
      .catch((err: any) => {
        console.log(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getMedicine = (query: any) => {
    medicineId(query, 1)
      .then((res: any) => {
        setSuggestions(res?.data?.generics);
      })
      .catch(() => {});
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query) {
      getMedicine(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion?.generic);
    formik.setFieldValue("genericId", suggestion?._id);
    setSuggestions([]);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    uploadFile(formData)
      .then((res: any) => {
        if (res.status === 200 && res.statusText === "OK") {
          const imageUrl = res?.data?.fileUrl;
          const updatedImages = [...formik.values.images, imageUrl];
          formik.setFieldValue("images", updatedImages);
        }
      })
      .catch((err: any) => {
        console.error("Image upload failed:", err);
      })
      .finally(() => {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div style={{ width: "1000px" }}>
      <div className={commonStyles.flxBetween} style={{ alignItems: "center" }}>
        <h3>{t("addDetails")}</h3>
        <div
          className={Styles.crossOuter}
          onClick={() => setShowAddModal(false)}
        >
          <IoClose className={Styles.cross} />
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div style={{ position: "relative", marginTop: "24px" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t("searchHere")}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              height: "48px",
              borderRadius: "4px",
            }}
          />

          {suggestions.length > 0 && (
            <div className={Styles.searchResults}>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {suggestions.map((suggestion: any, index) => (
                  <li
                    key={index}
                    className={Styles.suggestionItem}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{ padding: "6px 10px", cursor: "pointer" }}
                  >
                    {suggestion?.generic}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {formik.touched.genericId && formik.errors.genericId && (
            <div className={commonStyles.error}>*{formik.errors.genericId}</div>
          )}
        </div>

        {/* Form Fields */}
        <div className={classNames(commonStyles.flxBetween, commonStyles.mt24)}>
          <div className={Styles.w50}>
            <InputField
              placeholder={t("brand")}
              id="brand"
              name="brand"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.brand}
            />
            {formik.touched.brand && formik.errors.brand && (
              <div className={commonStyles.error}>*{formik.errors.brand}</div>
            )}
          </div>

          <div className={Styles.w50}>
            <select
              id="productType"
              name="productType"
              onChange={formik.handleChange}
              value={formik.values.productType}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "12.5px",
                width: "100%",
                height: "48px",
                color: "#7d7d7d",
              }}
            >
              <option value="">{t("selectProductType")}</option>
              {medicineTypeData.map((v: any, ind: number) => (
                <option key={ind} value={v.value}>
                  {v.title}
                </option>
              ))}
            </select>
            {formik.touched.productType && formik.errors.productType && (
              <div className={commonStyles.error}>
                *{formik.errors.productType}
              </div>
            )}
          </div>
        </div>
        <div className={classNames(commonStyles.flxBetween, commonStyles.mt24)}>
          <div className={Styles.w50}>
            <InputField
              placeholder={t("strength")}
              id="strength"
              name="strength"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.strength}
            />
            {formik.touched.strength && formik.errors.strength && (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.strength}
              </div>
            )}
          </div>
          <div className={Styles.w50}>
            <InputField
              placeholder={t("packSize")}
              id="packSize"
              name="packSize"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.packSize}
            />
            {formik.touched.packSize && formik.errors.packSize && (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.packSize}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: "24px", width: "100%" }}>
          <InputField
            placeholder={t("_content")}
            id="content"
            name="content"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.content}
          />
          {formik.touched.content && formik.errors.content && (
            <div className={classNames(commonStyles.error)}>
              *{formik.errors.content}
            </div>
          )}
        </div>

        <div className={classNames(commonStyles.flxBetween, commonStyles.mt24)}>
          <div className={Styles.w50}>
            <InputField
              placeholder={t("T.P Price")}
              id="tpPrice"
              name="tpPrice"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.tpPrice}
            />
            {formik.touched.tpPrice && formik.errors.tpPrice && (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.tpPrice}
              </div>
            )}
          </div>
          <div className={Styles.w50}>
            <InputField
              placeholder={t("M.R.P Price")}
              id="mrpPrice"
              name="mrpPrice"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.mrpPrice}
            />
            {formik.touched.mrpPrice && formik.errors.mrpPrice && (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.mrpPrice}
              </div>
            )}
          </div>
        </div>
        <div className={commonStyles.col12}>
          <div
            className={Styles.imagePicker}
            onClick={() => fileInputRef.current?.click()}
            style={{ cursor: "pointer" }}
          >
            <img src={Picker} alt="upload" className={Styles.pickIMAGE} />
            <p className={Styles.pickerText}>
              <strong style={{ color: "#F69A1D" }}>{t("uploadPhotos")}</strong>
            </p>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {formik.touched.images && formik.errors.images && (
            <div className={commonStyles.error}>*{formik.errors.images}</div>
          )}

          <div className={Styles.selectedImagesContainer}>
            {uploading && <RingLoader />}

            {!uploading &&
              formik.values.images.map((image: any, index: number) => (
                <div className={Styles.imageWrapper} key={index}>
                  <img
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    className={Styles.selectedImages}
                  />
                  <div
                    className={Styles.outerclose}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <IoMdClose className={Styles.iconclose} />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div
          style={{ marginTop: "24px", display: "flex", justifyContent: "end" }}
        >
          <div style={{ width: "140px" }}>
            <PrimaryButton
              disabled={isloading}
              children={
                isloading ? <RingLoader size={35} color="#fff" /> : t("save")
              }
              type="submit"
              colorType={"New_blue"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
const EditFormula = (props: any) => {
  const { t, setShowEditModal, selectedItem } = props;
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isloading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      genericId: selectedItem?.genericId,
      strength: selectedItem?.strength,
      packSize: selectedItem?.packSize,
      content: selectedItem?.content,
      tpPrice: selectedItem?.tpPrice,
      mrpPrice: selectedItem?.mrpPrice,
      productType: selectedItem?.productType,
      brand: selectedItem?.brand,
      images: selectedItem?.images,
    },
    enableReinitialize: true,
    validationSchema: Yup.object(AddFormulaSchema(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const { refetch } = useQuery({
    queryKey: ["Pharamceuitcal", 1],
    queryFn: () => pharmaceutical_getAllMedicines(1),
    staleTime: 5 * 60 * 1000,
  });

  const handleSubmit = () => {
    setLoading(true); // Start loading

    const currentData = formik.values;

    let params = {
      genericId: currentData?.genericId,
      brand: currentData?.brand,
      strength: currentData?.strength,
      packSize: currentData?.packSize,
      content: currentData?.content,
      tpPrice: currentData?.tpPrice,
      mrpPrice: currentData?.mrpPrice,
      productType: currentData?.productType,
      images: currentData?.images,
    };

    pharmaceutical_Edit_Med(selectedItem?._id, params)
      .then((res: any) => {
        refetch();
        setShowEditModal(false);
      })
      .catch((err: any) => {
        console.log("Edit error:", err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    uploadFile(formData)
      .then((res: any) => {
        if (res.status === 200 && res.statusText === "OK") {
          const imageUrl = res?.data?.fileUrl;
          const updatedImages = [...formik.values.images, imageUrl];
          formik.setFieldValue("images", updatedImages);
        }
      })
      .catch((err: any) => {
        console.error("Image upload failed:", err);
      })
      .finally(() => {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div style={{ width: "1000px" }}>
      <div style={{ alignItems: "center" }} className={commonStyles.flxBetween}>
        <h3>{t("editMedicine")}</h3>
        <div
          className={Styles.crossOuter}
          onClick={() => setShowEditModal(false)}
        >
          <IoClose className={Styles.cross} />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={classNames(commonStyles.flxBetween, commonStyles.mt24)}>
          <div className={Styles.w50}>
            <InputField
              placeholder={t("brand")}
              id="brand"
              name="brand"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.brand}
            />
            {formik.touched.brand && formik.errors.brand && (
              <div className={classNames(commonStyles.error)}>
                {"*" + formik.errors.brand}
              </div>
            )}
          </div>
          <div className={Styles.w50}>
            <select
              id="productType"
              name="productType"
              onChange={formik.handleChange}
              value={formik.values.productType}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "12.5px",
                width: "100%",
                height: "48px",
                color: "#7d7d7d",
              }}
            >
              <option value="">{t("selectProductType")}</option>
              {medicineTypeData.map((v: any, ind: number) => (
                <option key={ind} value={v.value}>
                  {v.title}
                </option>
              ))}
            </select>
            {formik.touched.productType && formik.errors.productType ? (
              <div className={classNames(commonStyles.error)}>
                {"*" + formik.errors.productType}
              </div>
            ) : null}
          </div>
        </div>

        <div className={classNames(commonStyles.flxBetween, commonStyles.mt24)}>
          <div className={Styles.w50}>
            <InputField
              placeholder={t("strength")}
              id="strength"
              name="strength"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.strength}
            />
            {formik.touched.strength && formik.errors.strength && (
              <div className={classNames(commonStyles.error)}>
                {"*" + formik.errors.strength}
              </div>
            )}
          </div>
          <div className={Styles.w50}>
            <InputField
              placeholder={t("packSize")}
              id="packSize"
              name="packSize"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.packSize}
            />
            {formik.touched.packSize && formik.errors.packSize && (
              <div className={classNames(commonStyles.error)}>
                {"*" + formik.errors.packSize}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: "24px", width: "100%" }}>
          <InputField
            placeholder={t("_content")}
            id="content"
            name="content"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.content}
          />
          {formik.touched.content && formik.errors.content && (
            <div className={classNames(commonStyles.error)}>
              {"*" + formik.errors.content}
            </div>
          )}
        </div>

        <div className={classNames(commonStyles.flxBetween, commonStyles.mt24)}>
          <div className={Styles.w50}>
            <InputField
              placeholder={t("T.P Price")}
              id="tpPrice"
              name="tpPrice"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.tpPrice}
            />
            {formik.touched.tpPrice && formik.errors.tpPrice && (
              <div className={classNames(commonStyles.error)}>
                {"*" + formik.errors.tpPrice}
              </div>
            )}
          </div>
          <div className={Styles.w50}>
            <InputField
              placeholder={t("M.R.P Price")}
              id="mrpPrice"
              name="mrpPrice"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.mrpPrice}
            />
            {formik.touched.mrpPrice && formik.errors.mrpPrice && (
              <div className={classNames(commonStyles.error)}>
                {"*" + formik.errors.mrpPrice}
              </div>
            )}
          </div>
        </div>
        <div className={commonStyles.col12}>
          <div
            className={Styles.imagePicker}
            onClick={() => fileInputRef.current?.click()}
            style={{ cursor: "pointer" }}
          >
            <img src={Picker} alt="upload1" className={Styles.pickIMAGE} />
            <p className={Styles.pickerText}>
              <strong style={{ color: "#F69A1D" }}>{t("uploadPhotos")}</strong>
            </p>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {formik.touched.images && Array.isArray(formik.errors.images) && (
            <ul className={commonStyles.error}>
              {formik.errors.images.map((err, index) =>
                typeof err === "string" ? <li key={index}>*{err}</li> : null
              )}
            </ul>
          )}

          <div className={Styles.selectedImagesContainer}>
            {uploading && <RingLoader />}

            {!uploading &&
              formik.values.images.map((image: any, index: number) => (
                <div className={Styles.imageWrapper} key={index}>
                  <img
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    className={Styles.selectedImages}
                  />
                  <div
                    className={Styles.outerclose}
                    onClick={() => handleRemoveImage(index)}
                  >
                    <IoMdClose className={Styles.iconclose} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <div style={{ width: "140px" }}>
            <PrimaryButton
              children={
                isloading ? (
                  <RingLoader size={35} color={"#fff"} />
                ) : (
                  t("update")
                )
              }
              type="submit"
              colorType={"New_blue"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

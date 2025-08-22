import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { PrimaryButton } from "shared/components";
import { addTest, LabGetTestCategoryList } from "shared/services";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

function CustomModalCustom({
  onClose,
  fetchAllTests,
  setloading,
  loading,
  onAddTestName,
}: {
  onClose?: any;
  fetchAllTests?: any;
  setloading?: any;
  loading?: any;
  onAddTestName?: any;
}) {
  const { t, i18n }: any = useTranslation();
  const [categoryList, setCategoryList] = useState<any>([]);
  const [renderCategories, setRenderCategories] = useState(false);

  const validationTest = Yup.object().shape({
    name: Yup.string().required(t("enterTestName")),
    categoryName: Yup.string().required(t("categoryNameIsRequired")),
  });

  const formik: any = useFormik({
    initialValues: { name: "", categoryName: "" },
    validationSchema: validationTest,
    onSubmit: (values: any) => {
      handleTest(values);
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  const handleTest = (values: any) => {
    setloading(true);
    let data = {
      testName: values?.name,
      categoryName: values?.categoryName,
    };

    addTest(data)
      .then((res: any) => {
        formik.resetForm();
        fetchAllTests();
        onClose();
        onAddTestName(values.name);
        toast.success(t("successfullyAddedTest"));
      })

      .catch((err: any) => {
        toast.error(err?.response?.data?.message);
      })

      .finally(() => {
        setloading(false);
      });
  };

  const onSelect = (i: any) => {
    formik.setFieldValue("categoryName", i.categoryName);
    setRenderCategories(false);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    LabGetTestCategoryList()
      .then((res: any) => {
        setCategoryList(res?.data?.testCategories);
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  const handleDropDown = () => {
    setRenderCategories(!renderCategories);
  };
  const handleForm = () => {
    formik?.handleSubmit();
  };
  return (
    <>
      <div style={styles.bgView}>
        <div style={styles.headerRow}>
          <span style={styles.headerText}>{t("custom")}</span>
          <button onClick={onClose} style={styles.closeButton}>
            <IoClose />
          </button>
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder={t("enterTestName")}
            style={styles.input}
          />
          {formik.touched.name && formik.errors.name && (
            <span style={styles.errorText}>{formik.errors.name}</span>
          )}
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            name="categoryName"
            onChange={formik.handleChange}
            value={formik.values.categoryName}
            placeholder={t("categoryName")}
            style={styles.input}
            readOnly
            onClick={handleDropDown}
          />
          {formik.touched.categoryName && formik.errors.categoryName && (
            <span style={styles.errorText}>{formik.errors.categoryName}</span>
          )}
        </div>

        {renderCategories && (
          <div style={styles.categoryList}>
            {categoryList?.map((item: any, index: any) => (
              <div
                key={index}
                style={styles.listItem}
                onClick={() => onSelect(item)}
              >
                <span>{item.categoryName}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: "56px", width: "210px" }}>
          <PrimaryButton
            onClick={handleForm}
            colorType={"Linear"}
            type={"button"}
            disabled={loading}
            children={loading ? t("loading") : t("save")}
          />
        </div>
      </div>
    </>
  );
}

const styles: any = {
  bgView: {
    width: "500px",
  },

  headerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: "14px",
    fontWeight: "500",
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
  },
  iconStyle: {
    width: "20px",
    height: "20px",
    objectFit: "contain",
  },
  inputContainer: {
    marginTop: "16px",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    // Add additional input styles
  },
  errorText: {
    color: "red",
  },
  startIcon: {
    position: "absolute",
    left: "8px",
  },
  endIcon: {
    position: "absolute",
    right: "8px",
  },
  categoryList: {
    maxHeight: "250px",
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
    overflowY: "auto",
  },
  listItem: {
    padding: "8px",
    cursor: "pointer",
    // Add list item styles
  },
  saveButton: {
    marginTop: "16px",
  },
};

export default CustomModalCustom;

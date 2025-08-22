import classNames from "classnames";
import React, { useEffect, useState } from "react";
import commonstyles from "shared/utils/common.module.css";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { CustomModal, InputField, RingLoader } from "shared/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addTestToLab, getAllLabTests, getAllTests } from "shared/services";
import CustomModalCustom from "./CustomModalCustom";
import TextAreaField from "shared/components/A_New_Components/NewTextArea";
import { useMutation, useQuery } from "@tanstack/react-query";
import CustomSelect from "shared/components/CustomSelect";
import { useTranslation } from "react-i18next";

function AddTest() {
  const { t, i18n }: any = useTranslation();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newTestName, setNewTestName] = useState("");

  const optionsss = [
    "Blood",
    "Bone Marrow",
    "Breath",
    "Cerebrospinal Fluid",
    "Feces",
    "Hair And Nails",
    "Saliva",
    "Seminal Fluid",
    "Sputum",
    "Swabs",
    "Sweat",
    "Tissue",
    "Urine",
  ];

  const formik = useFormik({
    initialValues: {
      testName: "",
      SpecimenType: "",
      testDescription: "",
      testPrice: "",
      priceForMeditour: "",
    },
    validationSchema: Yup.object({
      testName: newTestName
        ? Yup.string()
        : Yup.string()
            .trim()
            .min(2, t("pleaseEnterAtleast_2_Characters"))
            .max(64, t("notExceed_64_Charac"))
            .required(t("required")),
      testDescription: Yup.string()
        .trim()
        .min(2, t("pleaseEnterAtleast_2_Characters"))
        .max(1000, t("notExceed_64_Desc"))
        .required(t("required")),
      testPrice: Yup.number()
        .typeError(t("pleaseEntervalidNumber"))
        .required(t("required")),
      SpecimenType: Yup.string().required(t("required")),
      priceForMeditour: Yup.number()
        .typeError(t("pleaseEntervalidNumber"))
        .required(t("required"))
        .test(
          "is-less-than-actualPrice",
          t("meditoutPriceShouldBe_"),
          function (value) {
            const { testPrice } = this.parent;
            const mediTourPrice = Number(value);
            const actualPrice = Number(testPrice);

            if (isNaN(mediTourPrice) || isNaN(actualPrice)) {
              return false;
            }
            return mediTourPrice < actualPrice;
          }
        ),
    }),

    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  const { refetch } = useQuery({
    queryKey: ["Tests", 1],
    queryFn: () => getAllLabTests(1),
    staleTime: 5 * 60 * 1000,
  });

  const addtestMutation = useMutation({
    mutationFn: (newTestData: any) => addTestToLab(newTestData),
    onSuccess: (res: any) => {
      refetch();
      navigate("/laboratory/test");
    },
    onError: (err: any) => {},
  });
  const handleSubmit = async () => {
    const currentData = formik.values;

    let params = {
      testDescription: currentData?.testDescription,
      price: currentData?.testPrice,
      specimen: currentData?.SpecimenType,
      priceForMeditour: currentData?.priceForMeditour,
      ...(newTestName
        ? { name: newTestName }
        : { testNameId: currentData?.testName }),
    };
    addtestMutation.mutate(params);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setNewTestName("");
    if (query) {
      fetchAllTests(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion?.name);
    formik.setFieldValue("testName", suggestion?._id);

    setSuggestions([]);
  };

  const handleValueChange = (name: string, value?: string) => {
    formik.setFieldValue(name, value);
  };

  const fetchAllTests = (search: string) => {
    getAllTests(1, search)
      .then((res: any) => {
        //
        setSuggestions(res?.data?.data);
      })
      .catch((err: any) => {});
  };
  const handleNewTestName = (testName: any) => {
    setNewTestName(testName);
    setSearchQuery(testName);
  };
  const handleSelect = (selectedOption: string) => {
    formik.setFieldValue("SpecimenType", selectedOption);
  };

  return (
    <div className={classNames(commonstyles.col12)}>
      <div className={classNames(commonstyles.flxBetween, commonstyles.mb24)}>
        <div className={classNames(commonstyles.flx)}>
          <p className={classNames(styles.heading)}>{t("addTest")}</p>
        </div>
      </div>
      <div
        className={classNames(
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyles.pl36
            : commonstyles.pr36,
          styles.outer
        )}
      >
        <div>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {" "}
            <div className={classNames(commonstyles.flxBetween)}>
              <p className={classNames(styles.subHeading)}>
                {t("availableTests")}
              </p>
            </div>
            <div className={styles.MainFlx}>
              <div className={classNames(styles.col6, commonstyles.colsm12)}>
                <div className={styles.mmmmk} style={{ position: "relative" }}>
                  <InputField
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder={t("searchTest")}
                  />

                  {suggestions?.length > 0 && (
                    <div
                      className={styles.searchResults}
                      style={{
                        position: "absolute",
                        top: "90%",
                        left: "0",
                        backgroundColor: "white",
                        zIndex: 10,
                        maxHeight: "200px",
                        overflow: "auto",
                        padding: "16px",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        margin: "0",
                        width: "100%",
                        borderRadius: "18px",
                      }}
                    >
                      <ul
                        style={{
                          padding: "0",
                          margin: "0",
                          listStyleType: "none",
                        }}
                      >
                        {suggestions.map((suggestion: any, index) => (
                          <li
                            key={index}
                            className={styles.suggestionItem}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{
                              padding: "2px",
                            }}
                          >
                            {suggestion?.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {formik.touched.testName && formik.errors.testName && (
                    <div className={classNames(styles.errorText)}>
                      *{formik.errors.testName}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={classNames(commonstyles.col6, commonstyles.colsm10)}
              >
                <CustomSelect
                  onSelect={handleSelect}
                  options={optionsss}
                  placeholder={t("selectSpecimenType")}
                />
                {formik.touched.SpecimenType && formik.errors.SpecimenType ? (
                  <div className={classNames(styles.errorText)}>
                    *{formik.errors.SpecimenType}
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.MainFlx}>
              {" "}
              <div className={classNames(styles.col6, commonstyles.colsm12)}>
                <InputField
                  placeholder={t("actualPrice")}
                  id="testPrice"
                  name="testPrice"
                  type="numeric"
                  onChange={(e: any) =>
                    handleValueChange("testPrice", e.target.value)
                  }
                  value={formik.values.testPrice}
                />

                {formik.touched.testPrice && formik.errors.testPrice ? (
                  <div className={classNames(styles.errorText)}>
                    *{formik.errors.testPrice}
                  </div>
                ) : null}
              </div>
              <div className={classNames(styles.col6, commonstyles.colsm12)}>
                <InputField
                  placeholder={t("mediTourPrice")}
                  id="priceForMeditour"
                  name="priceForMeditour"
                  type="numeric"
                  onChange={(e: any) =>
                    handleValueChange("priceForMeditour", e.target.value)
                  }
                  value={formik.values.priceForMeditour}
                />

                {formik.touched.priceForMeditour &&
                formik.errors.priceForMeditour ? (
                  <div className={classNames(styles.errorText)}>
                    *{formik.errors.priceForMeditour}
                  </div>
                ) : null}
              </div>
            </div>
            <div className={classNames(styles.col12, commonstyles.colsm10)}>
              <TextAreaField
                placeholder={t("testDescription")}
                id="testDescription"
                name="testDescription"
                onChange={(e: any) =>
                  handleValueChange("testDescription", e.target.value)
                }
                value={formik.values.testDescription}
              />

              {formik.touched.testDescription &&
              formik.errors.testDescription ? (
                <div className={classNames(styles.errorText)}>
                  *{formik.errors.testDescription}
                </div>
              ) : null}
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                className={styles.SaveBtn}
                disabled={addtestMutation.isPending}
                type="submit"
              >
                {addtestMutation.isPending ? (
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
            </div>
          </form>
        </div>
      </div>
      <CustomModal
        showModal={showAddModal}
        children={
          <CustomModalCustom
            onClose={() => setShowAddModal(false)}
            fetchAllTests={fetchAllTests}
            setloading={setLoading}
            loading={loading}
            onAddTestName={handleNewTestName}
          />
        }
      />
    </div>
  );
}

export default AddTest;

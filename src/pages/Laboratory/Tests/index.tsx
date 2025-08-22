import { useEffect, useState } from "react";
import styles from "../../Laboratory/Tests/test.module.css";
import commomstyles from "../../../shared/utils/common.module.css";
import classNames from "classnames";
import commonStyles from "shared/utils/common.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { labAddTestInfo } from "../../../shared/utils";
import { labAddTestPrice } from "../../../shared/utils";
import { LabGetTestCategory, getAllLabTests } from "shared/services";
import { useDispatch } from "react-redux";
import { getAddTest } from "shared/services";
import { PrimaryButton, RingLoader } from "shared/components";
import { setRenderFlag } from "shared/redux";
import { TbRefresh } from "react-icons/tb";
import { CustomInput, CustomModal, CustomStepper } from "shared/components";
import Typography from "@mui/material/Typography";
import CustomSelect from "shared/components/CustomSelect";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { useNavigate } from "react-router-dom";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import TableNew from "shared/components/A_New_Components/Table_new";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

function Tests() {
  const { t, i18n }: any = useTranslation();
  const [testData, setTestData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState<any>(null);
  const navigate = useNavigate();

  const steps = [
    {
      id: "1",
      lable: t("testInfo"),
    },
    {
      id: "2",
      lable: t("testPrice"),
    },
  ];
  const Testss = [
    t("testCode"),
    t("testName"),
    t("testCategory"),
    t("specimenType"),
    t("mediTourPrice"),
    t("actualPrice"),
  ];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Tests", currentPage],
    queryFn: () => getAllLabTests(currentPage),
    staleTime: 5 * 60 * 1000,
  });

  let LabTest = data?.data?.tests;
  let tableData: any = [];
  LabTest?.map((v: any, ind: any) => {
    tableData.push([
      v?.testCode,
      v?.testNameId?.name,
      v?.testNameId?.categoryName,
      v?.specimen,
      v?.priceForMeditour,
      v?.price,
    ]);
  });
  const F = (ind: any) => {
    const selectedObject: any = testData[ind];
    navigate(`/testDetail/${selectedObject?._id}`, {
      state: { _id: selectedObject?._id },
    });
  };
  const itemsPerPage = 10;
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
    setTestData(LabTest);

    if (data?.data?.totalTests) {
      setTotalItems(data.data.totalTests);
    }
  }, [data, totalItems]);

  return (
    <div className={classNames(commomstyles.col12)}>
      <>
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? commomstyles.pl36
              : commomstyles.pr36
          }
        >
          <div>
            <div className={classNames(styles.flxBetween, commomstyles.mb24)}>
              <div
                className={classNames(commomstyles.flx)}
                style={{ gap: "16px" }}
              >
                <p className={classNames(styles.heading)}>{t("allTests")}</p>

                {isLoading ? (
                  <div className={styles.outerRefresh}>
                    <RingLoader color={"#0E54A3"} size={24} />
                  </div>
                ) : (
                  <div className={styles.outerRefresh}>
                    <TbRefresh
                      color="#7d7d7d"
                      size={24}
                      onClick={() => {
                        refetch();
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.tabless}>
              {" "}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <SearchFilter title={t("search")} />
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
                    titles={Testss}
                    handleGoToDetail={F}
                    data={tableData}
                    headerWidth="16%"
                    itemWidth="16%"
                    height="47.6vh"
                  />
                ) : (
                  <>
                    <PhysiotheristsEmpty />
                  </>
                )}
              </div>
            </div>

            <CustomModal
              showModal={showAddModal}
              children={
                <AddTest steps={steps} setShowAddModal={setShowAddModal} />
              }
            />
          </div>
        </div>
      </>
    </div>
  );
}

export default Tests;

const AddTest = (props: any) => {
  const { setShowAddModal, setTests, Tests, steps } = props;
  const [screenName, setScreenName] = useState("TestInfo");
  const [selectedStep, setSelectedStep] = useState(0);
  const [addData, setAddData] = useState({});

  const handleClickNext = () => {
    if (screenName === "TestInfo") {
      setScreenName("Testprice");
    }

    if (selectedStep < 3) {
      setSelectedStep(selectedStep + 1);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  return (
    <Typography
      id="modal-modal-description"
      sx={{ textAlign: "center", color: "#001F57" }}
    >
      <div className={commomstyles.flx}>
        <div className={styles.end}>
          <button className={styles.close} onClick={handleCloseModal}>
            &#10006;
          </button>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <CustomStepper steps={steps} selectedStep={selectedStep} />
      </div>
      <div>
        {screenName === "TestInfo" && (
          <TestInfo handleClickNext={handleClickNext} setAddData={setAddData} />
        )}
        {screenName === "Testprice" && (
          <TestPrice
            handleClickNext={handleClickNext}
            addData={addData}
            setAddData={setAddData}
            setShowAddModal={setShowAddModal}
            setTests={setTests}
            Tests={Tests}
          />
        )}
      </div>
      <div className={styles.start}></div>
    </Typography>
  );
};

interface Props {
  handleClickNext: any;
  setAddData: any;
  addData: any;
  setShowAddModal: any;
  setTests: any;
  Tests: any;
  testcategory: any;
}
const TestInfo = (props: Partial<Props>) => {
  const [testcategory, setTestCategory] = useState([]);
  const { handleClickNext, setAddData } = props;

  const fetchTests = () => {
    LabGetTestCategory()
      .then((res: any) => {
        //
        if (res?.data?.auth) {
          const categoryNames = res.data.testCategories.map(
            (category: any) => category.categoryName
          );
          setTestCategory(categoryNames);
        }
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  useEffect(() => {
    fetchTests();
  }, []);
  const formik = useFormik({
    initialValues: {
      testAddTest_TestName: "",
      testAddTest_TestCategory: "",
      testAddTest_TestDescription: "",
    },
    validationSchema: Yup.object(labAddTestInfo),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = async () => {
    const currentData = formik.values;
    handleClickNext();
    setAddData({
      testName: currentData.testAddTest_TestName,
      categoryName: currentData.testAddTest_TestCategory,
      testDescription: currentData.testAddTest_TestDescription,
    });
  };
  const handleSelect = (selectedOption: string) => {
    formik.setFieldValue("testAddTest_TestCategory", selectedOption);
  };

  return (
    <>
      <div style={{ width: "500px" }}>
        <form onSubmit={formik.handleSubmit}>
          <div
            style={{ marginTop: "56px" }}
            className={commomstyles.flxBetween}
          >
            <div style={{ width: "233px" }}>
              <CustomInput
                placeholder="Test Name"
                id="testAddTest_TestName"
                name="testAddTest_TestName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.testAddTest_TestName}
              />

              {formik.touched.testAddTest_TestName &&
              formik.errors.testAddTest_TestName ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.testAddTest_TestName}
                </div>
              ) : null}
            </div>
            <div style={{ width: "233px" }}>
              <CustomSelect
                options={testcategory}
                placeholder="Test Type"
                onSelect={handleSelect}
              />
              {formik.touched.testAddTest_TestCategory &&
              formik.errors.testAddTest_TestCategory ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.testAddTest_TestCategory}
                </div>
              ) : null}
            </div>
          </div>
          <div className={styles.description}>
            <textarea
              style={{ resize: "none", borderRadius: "8px" }}
              placeholder="Test Description"
              id="testAddTest_TestDescription"
              name="testAddTest_TestDescription"
              onChange={formik.handleChange}
              value={formik.values.testAddTest_TestDescription}
            ></textarea>

            {formik.touched.testAddTest_TestDescription &&
            formik.errors.testAddTest_TestDescription ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.testAddTest_TestDescription}
              </div>
            ) : null}
          </div>
          <div style={{ marginTop: "56px", width: "210px" }}>
            <PrimaryButton
              children={"Next Step"}
              type="submit"
              colorType={"Linear"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

const TestPrice = (props: Partial<Props>) => {
  const { handleClickNext, addData, setShowAddModal, Tests } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      testprice_TestPrice: "",
      testprice_TestDuration: "",
      testprice_PriceForMeditour: "",
    },
    validationSchema: Yup.object(labAddTestPrice),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleSubmit = async () => {
    const curr_data = formik.values;

    setLoading(true);

    let params = {
      ...addData,
      price: curr_data.testprice_TestPrice,
      duration: curr_data.testprice_TestDuration,
      priceForMeditour: curr_data.testprice_PriceForMeditour,
    };
    getAddTest(params)
      .then((res: any) => {
        if (res.data.auth) {
          dispatch(setRenderFlag(true));
          setShowAddModal(false);
          handleClickNext();
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div style={{ width: "500px" }}>
        <form onSubmit={formik.handleSubmit}>
          <div
            style={{ marginTop: "56px" }}
            className={commomstyles.flxBetween}
          >
            <div style={{ width: "233px" }}>
              <CustomInput
                placeholder="Price"
                id="testprice_TestPrice"
                name="testprice_TestPrice"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.testprice_TestPrice}
              />

              {formik.touched.testprice_TestPrice &&
              formik.errors.testprice_TestPrice ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.testprice_TestPrice}
                </div>
              ) : null}
            </div>
            <div style={{ width: "233px" }}>
              <CustomInput
                placeholder="Duration"
                id="testprice_TestDuration"
                name="testprice_TestDuration"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.testprice_TestDuration}
              />

              {formik.touched.testprice_TestDuration &&
              formik.errors.testprice_TestDuration ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.testprice_TestDuration}
                </div>
              ) : null}
            </div>
          </div>
          <div style={{ marginTop: "32px" }} className={styles.flx}>
            <div style={{ width: "233px" }}>
              <CustomInput
                placeholder="Price For MediTour"
                id="testprice_PriceForMeditour"
                name="testprice_PriceForMeditour"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.testprice_PriceForMeditour}
              />

              {formik.touched.testprice_PriceForMeditour &&
              formik.errors.testprice_PriceForMeditour ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.testprice_PriceForMeditour}
                </div>
              ) : null}
            </div>
          </div>

          <div style={{ marginTop: "56px", width: "210px" }}>
            <PrimaryButton
              children={loading ? "loading..." : "Save"}
              disabled={loading ? true : false}
              type="submit"
              colorType={"Linear"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

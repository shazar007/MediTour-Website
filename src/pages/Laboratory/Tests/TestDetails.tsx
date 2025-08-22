import { useState, useEffect } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import styles from "./test.module.css";
import commonstyle from "shared/utils/common.module.css";
import style from "./test.module.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { CustomModal, InputField, RingLoader } from "shared/components";
import { IoClose } from "react-icons/io5";
import {
  getAllLabTests,
  LabTestDELETE,
  LabTestDetails,
  updateTestCategory,
} from "shared/services";
import { useDispatch, useSelector } from "react-redux";
import { setTestsss } from "shared/redux";
import { RxCross2 } from "react-icons/rx";
import { useFormik } from "formik";
import { notifySuccess } from "shared/components/A_New_Components/ToastNotification";
import TextAreaField from "shared/components/A_New_Components/NewTextArea";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
interface Props {
  setShowAddModal: any;
  id: any;
  refetch: any;
}
const TestConfirmDelete = (props: Partial<Props>) => {
  const { t }: any = useTranslation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { tests } = useSelector((state: any) => state.root.lab);

  const dispatch = useDispatch();

  const deleteTest = () => {
    let test_clone = JSON.parse(JSON.stringify(tests));

    setLoading(true);
    const testId = id || "";
    LabTestDELETE(testId)
      .then((res: any) => {
        if (res?.status === 200) {
          test_clone?.map((item: any, ind: any) => {
            if (id == item?._id) {
              test_clone.splice(ind, 1);
            }
          });
          refetch();
          dispatch(setTestsss(test_clone));
          navigate("/laboratory/test");
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const { setShowAddModal, id, refetch } = props;

  return (
    <>
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
              onClick={() => setShowAddModal(false)}
            />
          </div>
          <div className={classNames(commonstyle.flx, commonstyle.flxCol)}>
            <p className={classNames(commonstyle.fs24, commonstyle.semiBold)}>
              {t("areYouSure")}
            </p>
            <p className={classNames(commonstyle.colorGray, commonstyle.fs16)}>
              {t("youWantToDelete")}
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
                onClick={() => setShowAddModal(false)}
              >
                {t("noCancel")}
              </button>
              <button className={style.dltbtn} onClick={deleteTest}>
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
    </>
  );
};

export default function TestDetail() {
  const { t, i18n }: any = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);

  const handleOpenModal = () => {
    setShowAddModal(true);
  };
  const handleEditModel = () => {
    setShowEditModel(true);
  };
  const { state } = useLocation();
  const id = state?._id;
  const [TestDetailsss, setTestDetailsss] = useState<any>(null);

  const { data, refetch } = useQuery({
    queryKey: ["TestsDetails", id],
    queryFn: () => LabTestDetails(id),
    staleTime: 5 * 60 * 1000,
  });
  let testDetails = data?.data?.test;

  const { refetch: listRefetch } = useQuery({
    queryKey: ["Tests", 1],
    queryFn: () => getAllLabTests(1),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    setTestDetailsss(testDetails);
  });
  return (
    <>
      <div className={classNames(commonstyle.col12)}>
        {showAddModal && (
          <div>
            <TestConfirmDelete
              setShowAddModal={setShowAddModal}
              id={id}
              refetch={listRefetch}
            />
          </div>
        )}
        <CustomModal showModal={showEditModel}>
          <TestEdit
            t={t}
            i18n={i18n}
            setShowEditModel={setShowEditModel}
            TestDetails={TestDetailsss}
            id={id}
            refetch={refetch}
            listRefetch={listRefetch}
          />
        </CustomModal>
        <div style={{ marginTop: "16px" }}>
          <p className={classNames(style.heading)}>{t("testDetails")}</p>
        </div>
        <div className={style.Detail_Card}>
          <p>{t("details")}</p>
          <div
            style={{ marginBottom: "8px" }}
            className={classNames(style.outerflx, style.mt32)}
          >
            <div className={style.w15}>
              <p className={style.outerheading}>{t("testCode")}</p>
            </div>{" "}
            <div className={style.w20}>
              <p className={style.outerheading}>{t("testName")}</p>
            </div>{" "}
            <div className={style.w15}>
              <p className={style.outerheading}>{t("testCategory")}</p>
            </div>{" "}
            <div className={style.w15}>
              <p className={style.outerheading}>{t("specimenType")}</p>
            </div>{" "}
            <div className={style.w15}>
              <p className={style.outerheading}>{t("mediTourPrice")}</p>
            </div>{" "}
            <div className={style.w15}>
              <p className={style.outerheading}>{t("actualPrice")}</p>
            </div>
          </div>
          <div
            style={{
              padding: "10px 0",
              borderTop: "0.5px solid #7d7d7d",
              borderBottom: "0.5px solid #7d7d7d",
            }}
            className={classNames(style.outerflx)}
          >
            <div className={style.w15}>
              <p className={style.text}>{testDetails?.testCode}</p>
            </div>{" "}
            <div className={style.w20}>
              <p className={style.text}>{testDetails?.testNameId?.name}</p>
            </div>{" "}
            <div className={style.w15}>
              <p className={style.text}>
                {testDetails?.testNameId?.categoryName}
              </p>
            </div>{" "}
            <div className={style.w15}>
              <p className={style.text}>{testDetails?.specimen}</p>
            </div>{" "}
            <div className={style.w15}>
              <p className={style.text}>{testDetails?.priceForMeditour}</p>
            </div>{" "}
            <div className={style.w15}>
              <p className={style.text}>{testDetails?.price}</p>
            </div>
          </div>
          <p className={classNames(style.outerheading, style.mt16)}>
            {t("testDescription")}
          </p>
          <div className={style.textWraaper}>
            <p className={style.text}>{testDetails?.testDescription}</p>
          </div>
        </div>{" "}
        <div
          className={classNames(
            {
              [commonstyle.pl36]: ["ur", "ar", "ps", "pr"].includes(
                i18n.language
              ),
              [commonstyle.pr36]: !["ur", "ar", "ps", "pr"].includes(
                i18n.language
              ),
            },
            commonstyle.flxBetween,
            commonstyle.mt16
          )}
        >
          <button className={style.Delete} onClick={handleOpenModal}>
            {t("delete")}
          </button>{" "}
          <button className={style.Edit} onClick={handleEditModel}>
            {t("edit")}
          </button>
        </div>
      </div>
    </>
  );
}

const TestEdit = ({
  t,
  i18n,
  TestDetails,
  id,
  setShowEditModel,
  refetch,
  listRefetch,
}: any) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      testDescription: TestDetails?.testDescription || "",
      actualPrice: TestDetails?.price || "",
      meditourPrice: TestDetails?.priceForMeditour || "",
    },
    validationSchema: Yup.object({
      testDescription: Yup.string()
        .trim()
        .min(2, "")
        .max(1000, t("pleaseEnterAtleast_2_Characters"))
        .required(t("required")),
      actualPrice: Yup.number()
        .typeError(t("pleaseEntervalidNumber"))
        .required(t("required")),
      meditourPrice: Yup.number()
        .typeError(t("pleaseEntervalidNumber"))
        .required(t("required"))
        .test(
          "is-less-than-actualPrice",
          t("meditoutPriceShouldBe_"),
          function (value) {
            const { actualPrice } = this.parent;
            const mediTourPrice = Number(value);

            if (isNaN(mediTourPrice) || isNaN(actualPrice)) {
              return false;
            }
            return mediTourPrice < actualPrice;
          }
        ),
    }),
    onSubmit: (values) => {
      update(values);
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  const navigate = useNavigate();
  const update = (values: any) => {
    setLoading(true);
    let params = {
      ...(values?.testDescription && {
        testDescription: values?.testDescription,
      }),
      ...(values?.testDescription && { price: values?.actualPrice }),

      priceForMeditour: values?.meditourPrice,
    };
    console.log(params, id, "...params");
    updateTestCategory(id, params)
      .then((res: any) => {
        refetch();
        listRefetch();
        console.log(res.data, ".....");
        notifySuccess(t("updateSuccessfully"));
        setShowEditModel(false);
        navigate("/laboratory/test");
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const Close = () => {
    setShowEditModel(false);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.end}>
        <p className={styles.textTest}>{t("updateTest")}</p>
        <RxCross2 style={{ cursor: "pointer" }} size={24} onClick={Close} />
      </div>
      <div
        style={{
          width: "50vw",
          marginTop: "24px",
          gap: "16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <label>{t("actualPrice")}</label>
          <InputField
            id="actualPrice"
            name="actualPrice"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.actualPrice}
          />{" "}
          {formik.touched.actualPrice && formik.errors.actualPrice ? (
            <div className={classNames(commonstyle.error)}>
              {"*" + formik.errors.actualPrice}
            </div>
          ) : null}
        </div>
        <div>
          <label>{t("mediTourPrice")}</label>
          <InputField
            id="meditourPrice"
            name="meditourPrice"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.meditourPrice}
          />{" "}
          {formik.touched.meditourPrice && formik.errors.meditourPrice ? (
            <div className={classNames(commonstyle.error)}>
              {"*" + formik.errors.meditourPrice}
            </div>
          ) : null}
        </div>{" "}
        <div>
          <label>{t("testDescription")}</label>
          <TextAreaField
            id="testDescription"
            name="testDescription"
            onChange={formik.handleChange}
            value={formik.values.testDescription}
          />{" "}
          {formik.touched.testDescription && formik.errors.testDescription ? (
            <div className={classNames(commonstyle.error)}>
              {"*" + formik.errors.testDescription}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className={styles.cancelbutton}
          disabled={loading}
        >
          {loading ? <RingLoader color={"#ffff"} size={24} /> : t("update")}
        </button>
      </div>
    </form>
  );
};

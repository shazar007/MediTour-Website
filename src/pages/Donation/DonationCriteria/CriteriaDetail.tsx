import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import commonstyle from "shared/utils/common.module.css";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import styles from "../../HomeServices/AmbulanceServices/Ambulances/ambulances.module.css";
import style from "./donationcriteria.module.css";
import { useParams } from "react-router-dom";
import commonstyles from "shared/utils/common.module.css";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  donationEditCriteria,
  donationGetCriteria,
  donationdeleteCriteria,
} from "shared/services/Donation";
import {
  CustomModal,
  InputField,
  PrimaryButton,
  RingLoader,
} from "shared/components";
import { donationAddCriteriaSchema } from "shared/utils";
import ImagePickerNew from "shared/components/FilePickeInsurance/ImagePickerNew";
import { setCriterionRenderFlag } from "shared/redux";
import { useDispatch } from "react-redux";
import CustomLoader from "shared/components/New_Loader/Loader";
import { useTranslation } from "react-i18next";

interface Props {
  setShowAddModal: any;
}
const CriteriaConfirmDelete = (props: Partial<Props>) => {
  const { t }: any = useTranslation();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const deleteCriteria = () => {
    setLoading(true);
    const criteriaId = id || "";
    donationdeleteCriteria(criteriaId)
      .then((res: any) => {
        if (res?.status === 200) {
          dispatch(setCriterionRenderFlag(true));
          navigate("/donation/criteria");
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const { setShowAddModal } = props;
  return (
    <>
      <div className={classNames(styles.modalBackdrop)}>
        <div className={classNames(styles.modalContainer)}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IoClose
              className={styles.closeicon}
              // onClick={handleCancel}

              onClick={() => setShowAddModal(false)}
            />
          </div>
          <div className={classNames(commonstyle.flx, commonstyle.flxCol)}>
            <p className={classNames(commonstyle.semiBold, commonstyle.fs24)}>
              {t("areYouSure")}
            </p>
            <p className={classNames(commonstyle.colorGray, commonstyle.fs16)}>
              {t("youWantToDeleteCriteria")}
            </p>
            <div
              style={{
                marginTop: "24px",
                justifyContent: "space-between",
                display: "flex",
                width: "100%",
                gap: "40px",
              }}
            >
              <button
                className={style.cancelbtns}
                onClick={() => setShowAddModal(false)}
              >
                {t("noCancel")}
              </button>
              <button className={style.dltbtns} onClick={deleteCriteria}>
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

interface CriDetailsss {
  criteriaName: string;
  description: string;
  _id: string;
  image: string;
}
export default function CriteriaDetail() {
  const { t, i18n }: any = useTranslation();

  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [Details, setDetails] = useState<CriDetailsss | null>(null);
  const { id } = useParams();

  const handleOpenModal = () => {
    setShowAddModal(true);
  };
  const handleEditModel = () => {
    setShowEditModal(true);
  };
  const GetCriteriaDetails = () => {
    setLoading(true);
    if (id === undefined) {
      console.error("ID is undefined");
      setLoading(false);
      return;
    }
    if (id) {
      donationGetCriteria(id)
        .then((res: any) => {
          if (res?.status === 200) {
            setDetails(res.data.criteria);
          }
        })
        .catch((err: any) => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.error("id is undefined");
    }
  };

  useEffect(() => {
    GetCriteriaDetails();
  }, []);

  return (
    <div className={classNames(commonstyles.col12)}>
      {loading ? (
        <CustomLoader />
      ) : (
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? commonStyles.pl36
              : commonStyles.pr36
          }
        >
          {" "}
          <div className={commonstyles.flx}>
            <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
              {t("criteriaDetails")}
            </p>
          </div>
          <div className={commonstyles.outerContainer}>
            <div
              className={style.criteriaCard}
              style={{
                background: `url(${Details?.image}) no-repeat center center`,
                backgroundSize: "cover",
              }}
            ></div>
            <div
              className={classNames(
                commonstyles.col12,
                style.mt32,
                commonstyles.flx
              )}
              style={{ gap: "12px" }}
            >
              {" "}
              <p
                className={classNames(commonstyles.fs16, commonStyles.semiBold)}
              >
                {t("title")}:{" "}
              </p>
              <p className={classNames(commonstyles.fs16)}>
                {Details?.criteriaName}
              </p>
            </div>
            <div
              className={classNames(commonstyles.col12, commonstyles.flx)}
              style={{ gap: "12px" }}
            >
              {" "}
              <p
                className={classNames(commonstyles.fs16, commonStyles.semiBold)}
              >
                {t("description")}:{" "}
              </p>
              <p className={classNames(commonstyles.fs16)}>
                {Details?.description}
              </p>
            </div>
          </div>
          <div
            className={classNames(commonstyles.flx)}
            style={{ justifyContent: "space-between", marginTop: "24px" }}
          >
            {" "}
            <button className={style.DeleteBtn} onClick={handleOpenModal}>
              {t("delete")}
            </button>
            <button className={style.EditBtn} onClick={handleEditModel}>
              {t("edit")}
            </button>
          </div>
        </div>
      )}

      {showAddModal && (
        <div>
          <CriteriaConfirmDelete setShowAddModal={setShowAddModal} />
        </div>
      )}

      <CustomModal
        showModal={showEditModal}
        children={
          <Criteria
            t={t}
            setShowEditModal={setShowEditModal}
            Details={Details}
            GetCriteriaDetails={GetCriteriaDetails}
          />
        }
      />
    </div>
  );
}

const Criteria = (props: any) => {
  const dispatch = useDispatch();
  const { t, Details, setShowEditModal, GetCriteriaDetails } = props;

  const id = Details?._id;

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const formik = useFormik({
    initialValues: {
      criteriaName: Details?.criteriaName || "",
      description: Details?.description || "",
      image: Details?.image || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object(donationAddCriteriaSchema(t)),
    onSubmit: () => {
      handleSubmit();
    },
  });

  const handleImageUrl = (url: string) => {
    formik.setFieldValue("image", url);
    formik.setTouched({ ...formik.touched, image: true });
  };

  const handleSubmit = async () => {
    const currentData = formik.values;
    const params = {
      criteriaName: currentData.criteriaName,
      description: currentData.description,
      image: currentData.image,
    };

    donationEditCriteria(id, params)
      .then(() => {
        GetCriteriaDetails();
        dispatch(setCriterionRenderFlag(true));
        setShowEditModal(false);
      })
      .catch((err: any) => {
        console.error("Edit failed:", err);
      });
  };

  return (
    <div style={{ width: "800px" }}>
      <form onSubmit={formik.handleSubmit}>
        <div className={commonStyles.flx}>
          <div className={classNames(style.modelHeader, commonStyles.mb24)}>
            <p style={{ textAlign: "center" }}>{t("editCriteria")}</p>
            <IoClose className={style.close} onClick={handleCloseModal} />
          </div>
        </div>

        <div className={classNames(style.mb16)}>
          <InputField
            placeholder={t("criteriaName")}
            id="criteriaName"
            name="criteriaName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.criteriaName}
          />
          {formik.touched.criteriaName &&
            typeof formik.errors.criteriaName === "string" && (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.criteriaName}
              </div>
            )}
        </div>

        <div>
          <div className={classNames(commonStyles.col12, style.ImgPicker)}>
            <ImagePickerNew
              setData={handleImageUrl}
              iimagess={formik.values.image}
            />

            {formik.touched.image &&
              typeof formik.errors.image === "string" && (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.image}
                </div>
              )}
          </div>

          <div className={classNames(commonStyles.col12, style.description)}>
            <textarea
              placeholder={t("description")}
              style={{ resize: "none", fontFamily: "inherit" }}
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            {formik.touched.description &&
              typeof formik.errors.description === "string" && (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.description}
                </div>
              )}
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "end", marginTop: "24px" }}
        >
          <div style={{ width: "190px" }}>
            <PrimaryButton type="submit" colorType={"New_blue"}>
              {t("update")}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
};

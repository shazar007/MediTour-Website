import { useState, useEffect } from "react";
import classNames from "classnames";
import commonStyles from "shared/utils/common.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "./donationcriteria.module.css";
import commonstyles from "shared/utils/common.module.css";
import {
  CustomModal,
  InputField,
  PrimaryButton,
  RingLoader,
} from "shared/components";
import ImagePickerNew from "shared/components/FilePickeInsurance/ImagePickerNew";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  donationAddCriteria,
  donationGETALLCriteria,
} from "shared/services/Donation";
import { donationAddCriteriaSchema } from "shared/utils";
import { TbRefresh } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { setCriterion, setCriterionRenderFlag } from "shared/redux";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";
import { useTranslation } from "react-i18next";

function DonationCruteria() {
  const { t, i18n }: any = useTranslation();

  const { criterion, criterionRenderFlag } = useSelector(
    (state: any) => state.root.donation
  );
  const navigate = useNavigate();

  const handleGoToCriteriaDetail = (_id: string) => {
    navigate(`/donation/criteria/Detail/${_id}`);
  };
  const [rotation, setRotation] = useState<number>(0);
  const rotationIncrement: number = 90;
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const dispatch = useDispatch();

  const handleModelOpen = () => {
    setShowAddModal(true);
  };

  const handleRotate = () => {
    setRotation(rotation - rotationIncrement);
    GetAllCriteria();
  };

  const GetAllCriteria = () => {
    setLoading(true);
    donationGETALLCriteria()
      .then((res: any) => {
        dispatch(setCriterion(res.data.criterion));
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (criterionRenderFlag) {
      setLoading(true);
      GetAllCriteria();
      dispatch(setCriterionRenderFlag(false));
    }
  }, []);
  useEffect(() => {
    GetAllCriteria();
  }, []);
  return (
    <>
      <div className={classNames(commonstyles.col12)}>
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? commonStyles.pl36
              : commonStyles.pr36
          }
        >
          {" "}
          <div className={commonstyles.flxBetween}>
            <div
              className={classNames(commonstyles.flx)}
              style={{ gap: "12px" }}
            >
              <p
                className={classNames(commonstyles.fs24, commonstyles.semiBold)}
              >
                {t("yourCriteria")}
              </p>
              {loading ? (
                <div className={style.outerRefresh}>
                  <RingLoader color={"#0e54a3"} size={24} />
                </div>
              ) : (
                <div className={style.outerRefresh}>
                  <TbRefresh
                    color={"#7d7d7d"}
                    size={24}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onClick={handleRotate}
                  />
                </div>
              )}
            </div>
            <div style={{ width: "180px" }}>
              <PrimaryButton
                colorType="New_blue"
                children={t("addCriteria")}
                onClick={handleModelOpen}
              />
            </div>
          </div>
          <div className={commonstyles.outerContainer}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
              }}
            >
              {criterion && criterion.length > 0 ? (
                criterion.map((criterion: any) => (
                  <div
                    className={style.criteriaCard}
                    style={{
                      background: `url(${criterion.image}) no-repeat center center`,
                      backgroundSize: "cover",
                    }}
                    onClick={() => handleGoToCriteriaDetail(criterion._id)}
                  >
                    <div className={style.cardtext}>
                      <p
                        className={classNames(
                          commonstyles.fs16,
                          commonstyles.semiBold
                        )}
                      >
                        {criterion.criteriaName}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <PhysiotheristsEmpty />
              )}
            </div>

            <CustomModal
              showModal={showAddModal}
              children={
                <Criteria
                  t={t}
                  setShowAddModal={setShowAddModal}
                  GetAllCriteria={GetAllCriteria}
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default DonationCruteria;

const Criteria = (props: any) => {
  const [loading, setLoading] = useState(false);

  const { t, setShowAddModal, GetAllCriteria } = props;
  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const formik = useFormik({
    initialValues: {
      criteriaName: "",
      description: "",
      image: "",
    },
    validationSchema: Yup.object(donationAddCriteriaSchema(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const handleImageUrl = (url: any) => {
    formik.setFieldValue("image", url);
  };
  const handleSelect = (selectedOption: string) => {
    formik.setFieldValue("criteriaName", selectedOption);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const currentData = formik.values;
    let params = {
      criteriaName: currentData.criteriaName,
      description: currentData.description,
      image: currentData.image,
    };
    donationAddCriteria(params)
      .then((res: any) => {
        setShowAddModal(false);
      })
      .catch((err: any) => {
        notifyError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
        GetAllCriteria();
      });
  };

  return (
    <div style={{ width: "800px" }}>
      <form onSubmit={formik.handleSubmit}>
        <div className={commonstyles.flx}>
          <div className={classNames(style.modelHeader, style.mb32)}>
            <p className={style.headings}>{t("addCriteria")}</p>
            <IoClose className={style.close} onClick={handleCloseModal} />
          </div>
        </div>
        <div className={classNames(commonStyles.mb16)}>
          <InputField
            placeholder={t("criteriaName")}
            id="criteriaName"
            name="criteriaName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.criteriaName}
          />

          {formik.touched.criteriaName && formik.errors.criteriaName ? (
            <div className={classNames(commonStyles.error)}>
              *{formik.errors.criteriaName}
            </div>
          ) : null}
        </div>
        <div>
          <div
            className={classNames(commonstyles.col12, style.ImgPicker)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ImagePickerNew setData={handleImageUrl} />
            {formik.touched.image && formik.errors.image ? (
              <div
                className={classNames(commonStyles.error)}
                style={{ marginTop: "8px" }}
              >
                *{formik.errors.image}
              </div>
            ) : null}
          </div>

          <div className={classNames(commonstyles.col12, style.description)}>
            <textarea
              placeholder={t("description")}
              style={{ resize: "none" }}
              onChange={formik.handleChange}
              id="description"
              name="description"
              value={formik.values.description}
            ></textarea>
            {formik.touched.description && formik.errors.description ? (
              <div className={classNames(commonStyles.error)}>
                *{formik.errors.description}
              </div>
            ) : null}
          </div>
        </div>
        <div className={style.flxEnd}>
          <div style={{ marginTop: "16px", width: "180px" }}>
            <PrimaryButton
              children={t("add")}
              type="submit"
              colorType={"New_blue"}
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

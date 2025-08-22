import React, { useState, useEffect } from "react";
import classNames from "classnames";
import commonStyles from "shared/utils/common.module.css";
import style from "./Donationpackages.module.css";
import commonstyles from "shared/utils/common.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  CustomModal,
  CustomStepper,
  InputField,
  PrimaryButton,
  RingLoader,
} from "shared/components";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import CustomSelect from "shared/components/CustomSelect";
import ImagePickerNew from "shared/components/FilePickeInsurance/ImagePickerNew";

import {
  donation_GET_ALL_Packages,
  donationAddCriteria,
  donationAddPackage,
  donationGETALLCriteria,
} from "shared/services/Donation";

import {
  donationAddCriteriaSchema,
  donationAddPackageSchema,
} from "shared/utils";

import ShortImagePicker from "shared/components/FilePickeInsurance/ShortImageFilePicker";
import { useSelector } from "react-redux";
import { TbRefresh } from "react-icons/tb";
import toast from "react-hot-toast";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useTranslation } from "react-i18next";

const DonationCategorie = () => {
  const { t, i18n }: any = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const { PackagesArray } = useSelector((state: any) => state.root.donation);

  const handleModelOpen = () => {
    setShowPackageModal(true);
  };

  const navigate = useNavigate();
  const handleGoToDetail = (_id: string) => {
    navigate(`/donation/packagesDetails/${_id}`);
  };

  const FetchPackage = () => {
    setLoading(true);
    donation_GET_ALL_Packages()
      .then((res) => {})
      .catch((err) => {
        console.error(`Error: ${err?.response?.status ?? "Unknown error"}`);
        console.error("Full Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    FetchPackage();
  }, []);

  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonStyles.pl36
          : commonStyles.pr36
      }
    >
      <div className={classNames(commonstyles.flxBetween)}>
        <div className={classNames(commonstyles.flx)} style={{ gap: "12px" }}>
          <p
            className={classNames(
              commonstyles.fs24,
              commonstyles.semiBold,
              style.colorBlack
            )}
          >
            {t("donationPackages")}
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
                onClick={() => {
                  FetchPackage();
                }}
              />
            </div>
          )}
        </div>

        <div style={{ width: "204px" }}>
          <PrimaryButton
            children={t("addPackage")}
            colorType={"New_blue"}
            onClick={handleModelOpen}
          />
        </div>
      </div>
      <div className={commonstyles.outerContainer}>
        <div className={style.flxff}>
          {PackagesArray && PackagesArray.length > 0 ? (
            PackagesArray.map((packageItem: any) => (
              <div
                className={classNames(
                  style.ccard,
                  window.innerWidth < 768 && commonstyles.col12
                )}
                onClick={() => handleGoToDetail(packageItem._id)}
                style={{ width: window.innerWidth < 768 ? "100%" : "auto" }}
                key={packageItem._id}
              >
                <div
                  style={{
                    height: "110px",
                  }}
                >
                  <div>
                    {packageItem.images && packageItem.images[0] && (
                      <img
                        src={packageItem.images[0]}
                        className={style.Donation1}
                        alt="Package Image"
                      />
                    )}
                  </div>
                  <div className={commonstyles.flxBetween}>
                    {packageItem.images && packageItem.images[1] && (
                      <img
                        src={packageItem.images[1]}
                        className={style.Donation2}
                        alt="Package Image"
                      />
                    )}
                    {packageItem.images && packageItem.images[2] && (
                      <img
                        src={packageItem.images[2]}
                        className={style.Donation2}
                        alt="Package Image"
                      />
                    )}
                  </div>
                </div>
                <div className={style.mt16}>
                  <p
                    className={classNames(
                      commonstyles.fs24,
                      commonstyles.semiBold
                    )}
                  >
                    {packageItem.donationTitle}
                  </p>
                </div>
                <div className={classNames(commonstyles.flx, style.mt32)}>
                  <div
                    className={
                      ["ur", "ar", "ps", "pr"].includes(i18n.language)
                        ? style.ml50
                        : style.mr50
                    }
                  >
                    <p className={commonstyles.fs14}>{t("targetAudience")}:</p>
                    <p className={classNames(commonstyles.fs14, style.mt8)}>
                      {t("totalAmount")}:
                    </p>
                    <p className={classNames(commonstyles.fs14, style.mt8)}>
                      {t("noOfDays")}:
                    </p>
                  </div>
                  <div style={{ color: "#7d7d7d" }}>
                    <p className={commonstyles.fs14}>
                      {packageItem.targetAudience}
                    </p>
                    <p className={classNames(commonstyles.fs14, style.mt8)}>
                      {packageItem.requiredAmount}
                    </p>
                    <p className={classNames(commonstyles.fs14, style.mt8)}>
                      {packageItem.totalDays}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <PhysiotheristsEmpty />
          )}
        </div>
      </div>
      <CustomModal
        showModal={showPackageModal}
        children={
          <Package
            t={t}
            setShowPackageModal={setShowPackageModal}
            FetchPackage={FetchPackage}
          />
        }
      />
    </div>
  );
};
export default DonationCategorie;
interface PacProps {
  t: any;
  setShowPackageModal: any;
  FetchPackage: any;
}
const Package = (props: Partial<PacProps>) => {
  const [showcriteria, setShowcriteria] = useState([]);
  const [criteriamodel, setCriteriamodel] = useState(false);
  const [packageDetails, setPackageDetails] = useState(false);
  const [selectedCriterionId, setSelectedCriterionId] = useState<string>("");
  const [error, setError] = useState<any>("");

  const { t, setShowPackageModal, FetchPackage } = props;

  const handleCloseModal = () => {
    setShowPackageModal(false);
  };
  const handleCriteriaOpen = () => {
    setCriteriamodel(true);
  };
  const handlePackageDetailsModel = () => {
    if (!selectedCriterionId) {
      setError(t("selectAtleast1Criteria"));
    } else {
      setError("");
      setPackageDetails(true);
    }
  };

  const handleCheckboxChange = (criterionId: string) => {
    if (criterionId) {
      setSelectedCriterionId((prevId) => {
        const isSameId = prevId === criterionId;
        const newId = isSameId ? "" : criterionId;

        if (newId) {
          setError("");
        }
        return newId;
      });
    }
  };

  const GetAllCriteria = () => {
    donationGETALLCriteria()
      .then((res: any) => {
        if (res?.status === 200) {
          setShowcriteria(res.data.criterion);
        }
      })
      .catch((err: any) => {})
      .finally(() => {});
  };

  useEffect(() => {
    GetAllCriteria();
  }, []);

  return (
    <div className={style.modelcontainer}>
      <div className={style.modelHeader}>
        <p>{t("addPackage")} </p>
        <IoClose className={style.end} onClick={handleCloseModal} />
      </div>
      <div className={classNames(style.flxWrap)}>
        {showcriteria.map((criterion: any) => (
          <div
            className={`${style.OrphansCard} ${
              selectedCriterionId === criterion._id ? style.checked : ""
            }`}
            style={{
              background: `url(${criterion.image}) no-repeat center center`,
              backgroundSize: "cover",
            }}
            onClick={() => handleCheckboxChange(criterion._id)}
          >
            <div style={{ display: "flex", alignItems: "end", height: "70%" }}>
              <p className={style.alignend}>{criterion.criteriaName}</p>
            </div>
          </div>
        ))}

        <div className={style.AddCard} onClick={handleCriteriaOpen}>
          <IoMdAddCircleOutline className={style.AddIcon} />

          <p
            className={classNames(
              commonstyles.fs20,
              commonstyles.semiBold,
              style.AddCriteria
            )}
          >
            {t("addCriteria")}
          </p>
        </div>
        <div className={style.categoryCard}></div>
      </div>
      <div className={style.mt32}>
        {error && <div className={commonStyles.error}>{error}</div>}

        <PrimaryButton
          children={t("next")}
          colorType={"New_blue"}
          onClick={handlePackageDetailsModel}
        />
      </div>

      <CustomModal
        showModal={criteriamodel}
        children={
          <Criteria
            t={t}
            setCriteriamodel={setCriteriamodel}
            GetAllCriteria={GetAllCriteria}
          />
        }
      />
      <CustomModal
        showModal={packageDetails}
        children={
          <PackageDetail
            t={t}
            setPackageDetails={setPackageDetails}
            selectedCriteriaIds={selectedCriterionId}
            setShowPackageModal={setShowPackageModal}
            FetchPackage={FetchPackage}
          />
        }
      />
    </div>
  );
};

const Criteria = (props: any) => {
  const [image, setImage] = useState(false);
  const { t, setShowCriteriaModal, setCriteriamodel, GetAllCriteria } = props;
  const handleCloseModal = () => {
    setCriteriamodel(false);
  };
  const handleCriteriaOpen = () => {
    setCriteriamodel(true);
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
  const handleCriteriaName = (selectedOption: string) => {
    formik.setFieldValue("criteriaName", selectedOption);
  };
  const handleSubmit = async () => {
    const currentData = formik.values;
    let params = {
      criteriaName: currentData.criteriaName,
      description: currentData.description,
      image: currentData.image,
    };
    donationAddCriteria(params)
      .then((res: any) => {
        setCriteriamodel(false);
        GetAllCriteria();
      })
      .catch((err: any) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {});
  };

  return (
    <div style={{ width: "800px" }}>
      <form onSubmit={formik.handleSubmit}>
        <div className={commonstyles.flx}>
          <div className={classNames(style.modelHeader, commonstyles.mb24)}>
            <p style={{ textAlign: "center" }}>{t("addCriteria")}</p>
            <IoClose className={style.close} onClick={handleCloseModal} />
          </div>
        </div>
        <div className={classNames(style.mb32)}>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}></div>
        <div>
          <div className={classNames(commonstyles.col12, style.ImgPicker)}>
            <ImagePickerNew setData={handleImageUrl} />
            {formik.touched.image && formik.errors.image ? (
              <div className={classNames(commonStyles.error)}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "24px",
            }}
          >
            <div style={{ width: "180px" }}>
              <PrimaryButton
                children={t("add")}
                type="submit"
                colorType={"New_blue"}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

interface Props {
  t: any;
  selectedCriteriaIds: any;
  setShowPackageModal: any;
  setPackageDetails: any;
  FetchPackage: any;
}
const PackageDetail = (props: Partial<Props>) => {
  const [addData, setAddData] = useState({});

  const {
    t,
    selectedCriteriaIds,
    setShowPackageModal,
    setPackageDetails,
    FetchPackage,
  } = props;

  const steps = [
    {
      id: "0",
      lable: t("basicInfo"),
    },
    {
      id: "1",
      lable: t("imageUpload"),
    },
  ];

  const handleCloseModal = () => {
    setPackageDetails(false);
  };

  const [screenName, setScreenName] = useState(t("basicInfo"));

  const handleClickNext = () => {
    if (screenName === "Basic Info" || screenName === "Image Upload") {
      setScreenName(t("imageUpload"));
    }
  };

  const handleClicKPrev = () => {
    if (screenName === "Image Upload") {
      setScreenName(t("basicInfo"));
    }
  };

  return (
    <>
      <div style={{ width: "800px" }}>
        <div className={style.modelHeader}>
          <p style={{ textAlign: "center" }}>{t("addPackageDetails")} </p>
          <IoClose className={style.close} onClick={handleCloseModal} />
        </div>
        <div className={classNames(commonstyles.col12, commonstyles.mt16)}>
          <CustomStepper
            steps={steps}
            selectedStep={0}
            onBack={handleClicKPrev}
          />
        </div>
        <div className={classNames(commonstyles.col12, commonstyles.mt24)}>
          {screenName === "Basic Info" ? (
            <BasicInfo
              t={t}
              handleClickNext={handleClickNext}
              setAddData={setAddData}
            />
          ) : (
            <ImageUpload
              t={t}
              addData={addData}
              selectedCriteriaIds={selectedCriteriaIds}
              setShowPackageModal={setShowPackageModal}
              FetchPackage={FetchPackage}
            />
          )}
        </div>
      </div>
    </>
  );
};
interface Props {
  t: any;
  handleClickNext: any;
  setAddData: any;
}
const BasicInfo = (props: Partial<Props>) => {
  const handleSelectDays = (selectedOption: string) => {
    formik.setFieldValue("totalDays", selectedOption);
  };
  const { t, handleClickNext, setAddData } = props;
  const TotalDays = [`10 ${t("days")}`, `20 ${t("days")}`, `30 ${t("days")}`];

  const formik = useFormik({
    initialValues: {
      donationTitle: "",
      targetAudience: "",
      totalRequiredAmount: "",
      totalDays: "",
      description: "",
    },
    validationSchema: Yup.object(donationAddPackageSchema(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    const currentData = formik.values;
    setAddData({
      donationTitle: currentData.donationTitle,
      targetAudience: currentData.targetAudience,
      requiredAmount: currentData.totalRequiredAmount,
      totalDays: currentData.totalDays,
      description: currentData.description,
    });

    handleClickNext();
  };
  return (
    <div>
      <div style={{ width: "800px" }}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div
              className={classNames(
                commonstyles.flx,
                commonstyles.mb24,
                style.mt32,
                style.gap24
              )}
            >
              <div className={classNames(style.col6)}>
                <InputField
                  placeholder={t("packageTitle")}
                  id="donationTitle"
                  name="donationTitle"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.donationTitle}
                />
                {formik.touched.donationTitle && formik.errors.donationTitle ? (
                  <div className={classNames(commonStyles.error)}>
                    *{formik.errors.donationTitle}
                  </div>
                ) : null}
              </div>
              <div className={classNames(style.col6)}>
                <InputField
                  placeholder={t("targetAudience")}
                  id="targetAudience"
                  name="targetAudience"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.targetAudience}
                />
                {formik.touched.targetAudience &&
                formik.errors.targetAudience ? (
                  <div className={classNames(commonStyles.error)}>
                    *{formik.errors.targetAudience}
                  </div>
                ) : null}
              </div>
            </div>
            <div
              className={classNames(
                commonstyles.flx,
                commonstyles.mb24,
                style.gap24
              )}
            >
              <div className={classNames(style.col6)}>
                <InputField
                  placeholder={t("requiredAmount")}
                  id="totalRequiredAmount"
                  name="totalRequiredAmount"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.totalRequiredAmount}
                />
                {formik.touched.totalRequiredAmount &&
                formik.errors.totalRequiredAmount ? (
                  <div className={classNames(commonStyles.error)}>
                    *{formik.errors.totalRequiredAmount}
                  </div>
                ) : null}
              </div>
              <div className={classNames(style.col6)}>
                <CustomSelect
                  placeholder={t("selectDays")}
                  onSelect={handleSelectDays}
                  options={TotalDays}
                />
                {formik.touched.totalDays && formik.errors.totalDays ? (
                  <div className={classNames(commonStyles.error)}>
                    *{formik.errors.totalDays}
                  </div>
                ) : null}
              </div>
            </div>

            <div className={classNames(commonstyles.col12, style.description)}>
              <textarea
                placeholder={t("description")}
                style={{ resize: "none" }}
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <div className={classNames(commonStyles.error)}>
                  *{formik.errors.description}
                </div>
              ) : null}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <div style={{ width: "204px", marginTop: "32px" }}>
              <PrimaryButton
                children={t("next")}
                colorType={"New_blue"}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

interface ImageProps {
  t: any;
  addData: any;
  selectedCriteriaIds: any;
  setAddData: any;
  setShowPackageModal: any;
  FetchPackage: any;
}
const ImageUpload = (props: Partial<ImageProps>) => {
  const { t, addData, selectedCriteriaIds, setShowPackageModal, FetchPackage } =
    props;
  const [error, setError] = React.useState("");
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const [imageLoading, setImageLoading] = useState<boolean[]>([]);
  const firstImageURL = (url: any) => {
    if (imageURLs.length < 3) {
      setImageURLs((prevURLs) => {
        const newURLs = [...prevURLs, url];
        setImageLoading([...imageLoading, true]);
        if (newURLs.length > 0) {
          setError("");
        }
        return newURLs;
      });
    } else {
      setError(t("cantAddMoreImages"));
    }
  };
  const handleImageLoad = (index: number) => {
    setImageLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = false;
      return newLoading;
    });
  };
  const FinalSubmittion = () => {
    if (imageURLs.length === 0) {
      setError(t("uploadAtleast1"));
      return;
    }

    let params = {
      criteriaId: selectedCriteriaIds,
      ...addData,
      images: imageURLs,
    };

    donationAddPackage(params)
      .then((res: any) => {
        setShowPackageModal(false);

        FetchPackage();
      })
      .catch((err: any) => {
        setError("An error occurred. Please try again.");
      })
      .finally(() => {});
  };
  return (
    <>
      <div style={{ width: "800px" }}>
        <div className={classNames(commonstyles.col12, style.ImgPicker)}>
          <ShortImagePicker setData={firstImageURL} />
        </div>
        {imageURLs.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "30px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {imageURLs.map((url: string, index: number) => (
              <div
                key={index}
                style={{ position: "relative", width: "calc(33.33% - 10px)" }}
              >
                {imageLoading[index] && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    {t("loading")}
                  </div>
                )}
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "100px",
                    objectFit: "cover",
                  }}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
            ))}
          </div>
        )}
        {error && <div className={commonStyles.error}>{error}</div>}
        <div style={{ display: "flex", justifyContent: "end" }}>
          <div style={{ width: "204px", marginTop: "32px" }}>
            <PrimaryButton
              children={t("save")}
              colorType={"New_blue"}
              onClick={FinalSubmittion}
            />
          </div>
        </div>
      </div>
    </>
  );
};

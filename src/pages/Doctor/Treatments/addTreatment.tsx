import classNames from "classnames";
import React, { useEffect, useState } from "react";
import commonstyles from "shared/utils/common.module.css";
import styles from "./styles.module.css";
import { IoClose, IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { Radio } from "@mui/material";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { GoDot } from "react-icons/go";
import iconselct from "assets/images/icons_select.png";
import { FaAngleUp } from "react-icons/fa";
import {
  addTreatmentdoctor,
  fetchingHospital,
  fetchtreatment,
  getonlyId,
} from "shared/services";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";
import { RingLoader } from "shared/components";
import { useQuery } from "@tanstack/react-query";
import { DocGetAllTreatments } from "shared/services/DoctorService";
import { useTranslation } from "react-i18next";

function AddTreatment() {
  const { t, i18n }: any = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const editdata = location.state?.treatment || {};
  const [hospitalTreatment, setHospitalTreatment] = useState<any>([]);
  const [showOther, setShowOther] = useState<any>(false);
  const [data, setData] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    editdata?.hospitalId ? "hospital" : "Clinic"
  );
  const [medicince, setMedicine] = useState<any>(false);
  const [labtest, setLabTest] = useState<any>(false);
  const [other, setOther] = useState<any>("");
  const [isChecked, setIsChecked] = useState(false);
  const [chargeOption, setChargeOption] = useState("");
  const [checkHospital, setCheckHospital] = useState(false);
  const [hospitalCharge, setHospitalCharge] = useState("");
  const [acCharge, SetAcCharge] = useState("");
  const [categoryId, setCategoryId] = useState<any>("");
  const [selectedOptions, setSelectedOptions] = useState<any>("");
  const [error, setEror] = useState("");
  const [amount, settotalAmount] = useState<any>(editdata?.totalAmount);
  const [errorTreatment, setTreatmentEror] = useState<any>("");
  const [errorpackge, setPackageError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hospitalData, setHospitalData] = useState([]);
  const [hospitalid, setHospitalId] = useState<any>("");
  const [hospitalEror, setHospitalError] = useState("");
  const handleSelect = (option: any) => {
    setSelectedOption((prev) => (prev === option ? null : option));
  };

  useEffect(() => {
    if (selectedOption === "Clinic") {
      fetch();
    }
    fetchHospital();
  }, [selectedOption]);
  const fetch = () => {
    fetchtreatment()
      .then((res: any) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err, ".....");
      })
      .finally(() => {});
  };

  const fetchHospital = () => {
    fetchingHospital()
      .then((res: any) => {
        setHospitalData(res?.data?.data?.hospitalIds);
      })
      .catch(() => {
        console.log(".....errrrrrr");
      })
      .finally(() => {});
  };
  useEffect(() => {
    if (hospitalid?._id) {
      fetchonlyId();
    }
  }, [hospitalid?._id]);

  const fetchonlyId = () => {
    getonlyId(hospitalid?._id)
      .then((res: any) => {
        setHospitalTreatment(res?.data?.data);
      })
      .catch(() => {})
      .finally(() => {});
  };

  const add = () => {
    if (
      (selectedOption === "hospital" && !hospitalid?._id) ||
      editdata?.hospitalId?._id
    ) {
      setHospitalError(t("pleaseSelectHospital"));
      return;
    }
    if (
      selectedOption === "hospital"
        ? !selectedOptions.treatmentId
        : !selectedOptions._id
    ) {
      setTreatmentEror(t("pleaseSelectTreatment"));
      return;
    }
    if (isChecked && !chargeOption) {
      setEror(t("pleaseSelectEitherYesOrNo"));
      return;
    }
    if (checkHospital) {
      if (!hospitalCharge) {
        setEror(t("pleaseSelctEitherRoomOrWard"));
        return;
      }
      if (hospitalCharge === "Room" && !acCharge) {
        setEror(t("pleaseSelectEitherAcOrNoAc"));
        return;
      }
    }
    if (selectedOption === "hospital") {
      if (!checkHospital) {
        setEror(t("pleaseSelectHospitalization"));
        return;
      }

      if (!hospitalCharge) {
        setEror(t("pleaseSelctEitherRoomOrWard"));
        return;
      }

      if (hospitalCharge === "Room" && !acCharge) {
        setEror(t("pleaseSelectEitherAcOrNoAc"));
        return;
      }
    }
    if (showOther && !other) {
      setEror(t("pleaseEnterAValueInOtherField"));
      return;
    }
    if (!amount) {
      setPackageError(t("pleaseAddPackageCost"));
      return;
    }
    const ac = {
      ac: true,
    };
    const nonAc = {
      nonAc: true,
    };
    setLoading(true);
    const params = {
      categoryFound: true,
      treatmentId:
        selectedOption === "hospital"
          ? selectedOptions.treatmentId
          : selectedOptions._id,
      treatment: {
        ...(chargeOption && { appointmentCharges: chargeOption === "Yes" }),
        ...(medicince && { medicines: medicince }),
        ...(labtest && { labService: labtest }),
        ...(hospitalCharge && {
          hospitalization:
            hospitalCharge === "Room"
              ? acCharge === "AC"
                ? ac
                : nonAc
              : hospitalCharge?.toLowerCase(),
        }),
        ...(showOther && { other: other }),
      },
      categoryId:
        selectedOption === "hospital" ? categoryId?._id?._id : categoryId?._id,
      subCategory: selectedOptions?.subCategory,
      isPersonal: selectedOption === "hospital" ? false : true,
      totalAmount: amount,
      ...(selectedOption === "hospital" &&
        hospitalid?._id && { hospitalId: hospitalid?._id }),
    };
    addTreatmentdoctor(params)
      .then((res: any) => {
        refetch();
        notifySuccess(t("treatmentAddSuccessfully"));
        navigate("/doctor/treatments");
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setHospitalError("");
    setEror("");
    setPackageError("");
    setTreatmentEror("");
  }, [i18n.language]);

  const { refetch } = useQuery({
    queryKey: ["doctorPackages", 1],
    queryFn: () => DocGetAllTreatments(1),
    staleTime: 5 * 60 * 1000,
  });
  const editCase = () => {
    if (editdata?.hospitalId && !checkHospital) {
      setEror(t("hospitalizationMustBeChecked"));
      return;
    }
    if (isChecked && !chargeOption) {
      setEror(t("pleaseSelectEitherYesOrNo"));
      return;
    }
    if (checkHospital && !hospitalCharge) {
      setEror(t("pleaseSelctEitherRoomOrWard"));
      return;
    }
    if (hospitalCharge === "Room" && !acCharge) {
      setEror(t("pleaseSelectEitherAcOrNoAc"));
      return;
    }

    setLoading(true);
    const params = {
      categoryFound: true,
      treatmentId: editdata?.treatmentId?._id,
      treatment: {
        ...(isChecked
          ? { appointmentCharges: chargeOption === "Yes" ? true : false }
          : isChecked === false
          ? null
          : editdata?.treatment?.appointmentCharges),
        ...(medicince
          ? { medicines: medicince }
          : editdata?.treatment?.medicines),
        ...(labtest
          ? { labService: labtest }
          : editdata?.treatment?.labService),
        ...(checkHospital
          ? {
              hospitalization:
                hospitalCharge === "Room"
                  ? acCharge === "AC"
                    ? { ac: true }
                    : { nonAc: true }
                  : hospitalCharge?.toLowerCase(),
            }
          : editdata?.treatment?.hospitalization),
        ...(showOther
          ? { other: other }
          : editdata?.treatment?.other
          ? { other: editdata.treatment.other }
          : null),
      },
      categoryId: editdata?.treatmentId?.categoryId?._id,
      subCategory: editdata?.treatmentId?.subCategory,
      isPersonal: editdata?.hospitalId ? false : true,
      totalAmount: amount,
      ...(editdata?.hospitalId &&
        editdata?.hospitalId?._id && { hospitalId: editdata?.hospitalId?._id }),
    };

    addTreatmentdoctor(params)
      .then((res: any) => {
        refetch();
        notifySuccess("treatmentUpdatedSuccessFully");
        navigate("/doctor/treatments");
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleAmountChange = (newAmount: any) => {
    if (newAmount) {
      settotalAmount(newAmount);
      setPackageError("");
    } else {
      settotalAmount(amount);
      setPackageError("");
    }
  };
  useEffect(() => {
    if (editdata?.treatment) {
      setMedicine(editdata.treatment.medicines);
      setLabTest(editdata.treatment.labService);
      setIsChecked(editdata?.treatment?.appointmentCharges !== undefined);
      setChargeOption(editdata?.treatment?.appointmentCharges ? "Yes" : "No");
      setCheckHospital(editdata?.treatment?.hospitalization && true);
      setShowOther(!!editdata.treatment.other);
      SetAcCharge(editdata?.treatment?.hospitalization?.ac ? "AC" : "NonAC");
      setHospitalCharge(
        (editdata?.treatment?.hospitalization?.ac && "Room") ||
          (editdata?.treatment?.hospitalization?.nonAc && "Room") ||
          (editdata?.treatment?.hospitalization && "Ward")
      );
      setOther(editdata.treatment.other || "");
    }
  }, [editdata]);

  return (
    <div
      className={
        ["ur", "ar", "ps", "pr"].includes(i18n.language)
          ? commonstyles.pl36
          : commonstyles.pr36
      }
    >
      <div className={classNames(commonstyles.flx)}>
        <p className={classNames(styles.heading)}>{t("addTreatmentPackage")}</p>
      </div>

      <div className={styles.outerContainer}>
        <div
          className={classNames(
            commonstyles.col6,
            commonstyles.colsm12,
            commonstyles.colmd6
          )}
          style={{
            marginBottom: "36px",
          }}
        >
          <p
            className={classNames(
              commonstyles.fs16,
              styles.colorBlack,
              commonstyles.semiBold
            )}
          >
            {t("whereWouldYouLikeToTreat_")}
          </p>
          <div className={styles.buttonconatiner}>
            {!editdata?.hospitalId && (
              <button
                className={classNames(styles.Privatebtn, {
                  [styles.Selected]: selectedOption === "Clinic",
                })}
                disabled={editdata?._id ? true : false}
                onClick={() => handleSelect("Clinic")}
              >
                {t("clinic")}
              </button>
            )}
            {!editdata?.isPersonal == true && (
              <button
                className={classNames(styles.Privatebtn, {
                  [styles.Selected]: selectedOption === "hospital",
                })}
                disabled={editdata._id ? true : false}
                onClick={() => handleSelect("hospital")}
              >
                {t("hospital")}
              </button>
            )}
          </div>
          <p
            className={classNames(
              commonstyles.fs16,
              styles.colorBlack,
              commonstyles.semiBold
            )}
          >
            {t("availableTreatments")}
          </p>
        </div>

        <div
          className={classNames(
            commonstyles.col7,
            commonstyles.md12,
            commonstyles.colsm12
          )}
        >
          {selectedOption === "hospital" && (
            <>
              <CustomSelector
                t={t}
                options={hospitalData}
                type={"hospital"}
                setHospitalId={setHospitalId}
                hospitalId={hospitalid}
                setCategoryId={setCategoryId}
                setEror={setHospitalError}
                editdat={editdata?.hospitalId?.name}
              />
              {hospitalEror && (
                <div style={{ color: "red" }}>{hospitalEror}</div>
              )}
            </>
          )}

          <div
            className={styles.datePickerContainer}
            style={{
              margin: "36px 0",
            }}
          >
            <CustomSelector
              t={t}
              options={selectedOption === "hospital" ? hospitalTreatment : data}
              setEror={setTreatmentEror}
              selectedOptions={selectedOptions}
              selectedOption={selectedOption}
              id={hospitalid}
              setSelectedOptions={setSelectedOptions}
              setCategoryId={setCategoryId}
              setHospitalId={setHospitalId}
              editdat={editdata?.treatmentId?.subCategory}
            />
            {errorTreatment && (
              <div style={{ color: "red" }}>{errorTreatment}</div>
            )}
          </div>

          <p
            className={classNames(
              commonstyles.fs16,
              styles.colorBlack,
              commonstyles.semiBold
            )}
            style={{ margin: "24px 0" }}
          >
            {t("whatsIncluded")}
          </p>

          <AppointmentCharges
            t={t}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            chargeOption={chargeOption}
            setChargeOption={setChargeOption}
            setError={setEror}
          />
          <AppointmentCharges
            t={t}
            isChecked={checkHospital}
            setIsChecked={setCheckHospital}
            chargeOption={hospitalCharge}
            setChargeOption={setHospitalCharge}
            acCharge={acCharge}
            setAcCharge={SetAcCharge}
            type={"hospital"}
            setError={setEror}
          />

          <div className={styles.checkboxStyle}>
            <Checkbox
              checked={medicince}
              onChange={(e) => setMedicine(e.target.checked)}
              className={styles.radioMark}
            />
            <p className={styles.titletext}>{t("medicine")}</p>
          </div>

          <div className={styles.checkboxStyle}>
            <Checkbox
              checked={labtest}
              onChange={(e) => setLabTest(e.target.checked)}
              className={styles.radioMark}
            />
            <p className={styles.titletext}>{t("labTest")}</p>
          </div>

          <div className={styles.checkboxStyle}>
            <Checkbox
              checked={showOther}
              onChange={(e) => setShowOther(e.target.checked)}
              className={styles.radioMark}
            />
            <p className={styles.titletext}>{t("others")}</p>
          </div>

          {showOther === true && (
            <textarea
              className={styles.input_container}
              placeholder={t("enterDetails")}
              value={other || editdata?.treatment?.other || ""}
              onChange={(e) => {
                setOther(e.target?.value);
                setEror("");
              }}
              rows={3}
              style={{
                border: "1px solid #7D7D7D",
                resize: "none",
              }}
            />
          )}
          {error && <div style={{ color: "red" }}>{error}</div>}

          <div
            style={{
              marginTop: "24px",
            }}
          >
            <input
              type="number"
              className={styles.input_container}
              value={amount || editdata?.totalAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder={`Rs ${t("setPackageCost")}`}
              style={{
                border: "1px solid #7D7D7D ",
              }}
            />
            {errorpackge && (
              <div style={{ color: "red", marginTop: "4px" }}>
                {errorpackge}
              </div>
            )}
            <button
              className={styles.saveClick}
              onClick={editdata?._id ? editCase : add}
              disabled={loading}
            >
              {loading ? (
                <RingLoader />
              ) : editdata?._id ? (
                t("update")
              ) : (
                t("save")
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTreatment;

const AppointmentCharges = ({
  t,
  isChecked,
  setIsChecked,
  chargeOption,
  setChargeOption,
  type,
  acCharge,
  setAcCharge,
  setError,
}: {
  t: any;
  isChecked?: any;
  setIsChecked?: any;
  chargeOption?: any;
  setChargeOption?: any;
  type?: any;
  acCharge?: any;
  setAcCharge?: any;
  setError?: any;
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <Checkbox
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className={styles.radioMark}
        />
        <p className={styles.titletext}>
          {type == "hospital" ? t("hospitalization") : t("appointmentCharges")}
        </p>
      </div>

      {isChecked && (
        <>
          <div style={{ display: "flex", gap: "14px", marginLeft: "16px" }}>
            <label>
              <Radio
                sx={{
                  margin: "0 12px",
                  "&.Mui-checked": {
                    color: "#0e54a3",
                  },
                }}
                className={styles.Radio}
                name="appointmentCharge"
                value={type == "hospital" ? "Room" : "Yes"}
                checked={
                  chargeOption === (type === "hospital" ? "Room" : "Yes")
                }
                onChange={(e) => {
                  setChargeOption(e.target.value);
                  setError("");
                }}
              />
              {type == "hospital" ? t("room") : t("yes")}
            </label>
            <label>
              <Radio
                sx={{
                  margin: "0 12px",
                  "&.Mui-checked": {
                    color: "#0e54a3",
                  },
                }}
                className={styles.Radio}
                name="appointmentCharge"
                value={type == "hospital" ? "Ward" : "No"}
                checked={chargeOption === (type === "hospital" ? "Ward" : "No")}
                onChange={(e) => {
                  setChargeOption(e.target.value);
                  setError("");
                }}
              />
              {type == "hospital" ? t("ward") : t("no")}
            </label>
          </div>
          {chargeOption === "Room" && (
            <div style={{ marginLeft: "16px", gap: "14px", display: "flex" }}>
              <label>
                <Radio
                  sx={{
                    margin: "0 12px",
                    "&.Mui-checked": {
                      color: "#0e54a3",
                    },
                  }}
                  className={styles.Radio}
                  name="roomType"
                  value="AC"
                  checked={acCharge === "AC"}
                  onChange={(e) => {
                    setAcCharge(e.target.value);
                    setError("");
                  }}
                />
                {t("ac")}
              </label>
              <label>
                <Radio
                  sx={{
                    margin: "0 12px",
                    "&.Mui-checked": {
                      color: "#0e54a3",
                    },
                  }}
                  className={styles.Radio}
                  name="roomType"
                  value="NonAC"
                  checked={acCharge === "NonAC"}
                  onChange={(e) => {
                    setAcCharge(e.target.value);
                    setError("");
                  }}
                />
                {t("nonAc")}
              </label>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const CustomSelector = ({
  t,
  options,
  selectedOptions,
  setSelectedOptions,
  setCategoryId,
  setEror,
  selectedOption,
  type,
  setHospitalId,
  hospitalId,
  id,
  editdat,
}: {
  t: any;
  options: any;
  selectedOptions?: any;
  setSelectedOptions?: any;
  setCategoryId?: any;
  setEror?: any;
  selectedOption?: any;
  setHospitalId?: any;
  id?: any;
  type?: any;
  hospitalId?: any;
  editdat?: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({});
  useEffect(() => {
    if (selectedOption === "hospital" || selectedOption === "Clinic") {
      setIsOpen(false);
      setHospitalId("");
      setSelectedOptions("");
    }
  }, [selectedOption]);
  const toggleDropdown = () => {
    if (editdat) return;
    if (selectedOption === "hospital" && !id?._id) {
      notifyError(t("pleaseSelectHospital"));
      return;
    }
    setIsOpen((prev) => !prev);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleOptionClick = (event: React.MouseEvent, option: any) => {
    event.stopPropagation();
    setSelectedOptions(option);
    setEror("");
    setIsOpen(false);
  };
  const handleCategoryClick = (
    event: React.MouseEvent,
    index: number,
    option: any
  ) => {
    event.stopPropagation();
    if (type == "hospital") {
      setHospitalId(option?.hospitalId);
      setIsOpen(false);
      setEror("");
    } else {
      setCategoryId(option);
      setExpandedItems((prev) => ({
        [index]: !prev[index],
      }));
    }
  };
  const filteredOptions = options
    ?.map((option: any) => {
      const hospitalMatches = option?.hospitalId?.name
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase());
      const categoryMatches =
        option?.categoryName
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase()) ||
        option?._id?.categoryName
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase());
      const filteredSubcategories = option?.treatments?.filter((subtype: any) =>
        subtype?.subCategory
          ?.toLowerCase()
          ?.includes(searchQuery?.toLowerCase())
      );
      if (type === "hospital" && hospitalMatches) {
        return option;
      }
      if (
        type !== "hospital" &&
        (categoryMatches || filteredSubcategories?.length > 0)
      ) {
        return { ...option, treatments: filteredSubcategories };
      }
      return null;
    })
    .filter(Boolean);
  const title = type == "hospital" ? t("selectHospital") : t("selectTreatment");
  return (
    <div
      className={`${styles.input_container} ${isOpen ? styles.active : ""} ${
        editdat ? styles.disabled : ""
      }`}
      onClick={toggleDropdown}
    >
      <div className={styles.select_input}>
        <div style={{ display: "flex", alignItems: "center", gap: "0 10px" }}>
          {!selectedOptions?.subCategory && (
            <img
              src={iconselct}
              alt="iconselct"
              style={{ width: "24px", height: "24px" }}
            />
          )}
          <span className={styles.placeholder}>
            {editdat
              ? editdat
              : hospitalId?.name
              ? hospitalId?.name
              : selectedOptions?.subCategory
              ? selectedOptions?.subCategory
              : title}
          </span>
        </div>
      </div>
      <span className={styles.dropdown_icon}>
        {isOpen ? <FaAngleUp size={12} /> : <FaAngleDown size={12} />}
      </span>
      {isOpen && (
        <div className={styles.dropdown_menu}>
          <div className={styles.dropdown_header}>
            <span>{title}</span>
            <button className={styles.close_button} onClick={toggleDropdown}>
              <IoClose size={20} onClick={() => setIsOpen(false)} />
            </button>
          </div>
          <div className={styles.search_bar}>
            <IoSearch size={20} className={styles.search_icon} />
            <input
              type="text"
              placeholder={t("whatAreYouLookingFor")}
              value={searchQuery}
              onChange={handleSearchChange}
              onClick={(e) => e.stopPropagation()}
              className={styles.search_input}
            />
          </div>
          <div className={styles.menu_items}>
            {filteredOptions?.map((option: any, index: any) => (
              <div key={index} className={styles.menu_item}>
                <div
                  className={styles.main_item}
                  onClick={(e) => handleCategoryClick(e, index, option)}
                >
                  <p
                    style={{
                      display: "flex",
                      gap: "0 10px",
                      alignItems: "center",
                    }}
                  >
                    {expandedItems[index] ? (
                      <FaAngleDown size={12} />
                    ) : (
                      type !== "hospital" && <FaAngleRight size={12} />
                    )}
                    {type === "hospital"
                      ? option?.hospitalId?.name
                      : option?._id?.categoryName
                      ? option?._id?.categoryName
                      : option?.categoryName}
                  </p>
                </div>

                {type !== "hospital" &&
                  expandedItems[index] &&
                  option?.treatments?.length > 0 && (
                    <div className={styles.subtypes}>
                      {option?.treatments?.map(
                        (subtype: any, subIndex: any) => (
                          <div
                            key={subIndex}
                            className={`${styles.subtype} ${
                              selectedOptions?.subCategory ===
                              subtype?.subCategory
                                ? styles.selected
                                : ""
                            }`}
                            onClick={(e) => handleOptionClick(e, subtype)}
                          >
                            <GoDot size={10} className={styles.dot} />
                            <span>{subtype?.subCategory}</span>
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            ))}
            {filteredOptions?.length === 0 && (
              <p className={styles.no_results}>
                {type === "hospital"
                  ? "No hospital found"
                  : "No Treatments found"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

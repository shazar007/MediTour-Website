import { useState } from "react";
import {
  Checkbox,
  Modal,
  Radio,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { RingLoader } from "shared/components";
import { useTranslation } from "react-i18next";
import styles from "./packageStyles.module.css";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import commonstyle from "shared/utils/common.module.css";
import { addPackageTreatment } from "shared/services";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

interface PackageCost {
  showModal?: any;
  setShowModal?: any;
  data?: any;
  categoryId?: any;
  subCategory?: any;
  fetchdetail?: any;
}

const AddPackageCost = (props: PackageCost) => {
  const { t }: any = useTranslation();

  const {
    showModal,
    setShowModal,
    data,
    categoryId,
    subCategory,
    fetchdetail,
  } = props;
  const [medicince, setMedicine] = useState<any>(false);
  const [labtest, setLabTest] = useState<any>(false);
  const [other, setOther] = useState<any>("");
  const [isChecked, setIsChecked] = useState(false);
  const [chargeOption, setChargeOption] = useState("");
  const [checkHospital, setCheckHospital] = useState(false);
  const [hospitalCharge, setHospitalCharge] = useState("");
  const [acCharge, SetAcCharge] = useState("");
  const [error, setEror] = useState("");
  const [amount, settotalAmount] = useState<any>("");
  const [errorpackge, setPackageError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOther, setShowOther] = useState<any>(false);
  const [selectedOption, setSelectedOption] = useState<"yes" | "no" | null>(
    null
  );
  const [value, setValue] = useState("");
  const [docId, setDocId] = useState<any>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
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

  const add = () => {
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
      treatmentId: subCategory?.treatmentId,
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
      categoryId: categoryId,
      subCategory: subCategory?.subCategory,
      isPersonal: false,
      totalAmount: amount,
      addedBy: "hospital",
      ...(docId !== "" && { doctorId: docId?._id }),
    };
    addPackageTreatment(params)
      .then((res: any) => {
        toast.success(t("packageAddedSuccessfully"));
        setShowModal(false);
        setCheckHospital(false);
        SetAcCharge("");
        setMedicine(false);
        setLabTest(false);
        setOther("");
        setIsChecked(false);
        setChargeOption("");
        settotalAmount("");
        setSelectedOption(null);
        setValue("");
        fetchdetail("");
      })
      .catch((err: any) => {
        console.log("🚀 ~ add ~ err:", err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      onClose={() => setShowModal(false)}
      open={showModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modal}>
        <div className={styles.formcontainer}>
          <div
            className={classNames(commonstyle.flxBetween, commonstyles?.mb16)}
          >
            <span className={classNames(styles.heading)}>
              {t("whatsIncluded")}
            </span>
            <IoClose
              onClick={() => setShowModal(false)}
              className={styles.iconMedium}
            />
          </div>
          <span>Do you want to set package cost for specific doctor?</span>
          <div className={classNames(commonstyles.flx)}>
            <div className={styles.checkboxStyle}>
              <Radio
                checked={selectedOption === "yes"}
                onChange={() => setSelectedOption("yes")}
                className={styles.radioMark}
              />
              <p className={styles.titletext}>{t("Yes")}</p>
            </div>

            <div
              className={styles.checkboxStyle}
              style={{ marginLeft: "24px" }}
            >
              <Radio
                checked={selectedOption === "no"}
                onChange={() => setSelectedOption("no")}
                className={styles.radioMark}
              />
              <p className={styles.titletext}>{t("No")}</p>
            </div>
          </div>
          {selectedOption === "yes" && (
            <div style={{ display: "flex", marginTop: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="dropdown-label">Choose Option</InputLabel>
                <Select
                  labelId="dropdown-label"
                  id="dropdown"
                  value={value}
                  label="Choose Option"
                  onChange={handleChange}
                >
                  {data?.map((item: any, index: any) => {
                    return (
                      <MenuItem
                        key={index}
                        value={item.name}
                        onClick={() => setDocId(item)}
                      >
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          )}
          <div
            style={{
              height: "1px",
              backgroundColor: "#ccc",
              margin: "16px 0",
              width: "100%",
            }}
          />

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
              value={other}
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
              value={amount}
              // onChange={(e) => {
              //   settotalAmount(e.target.value);

              // }}
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
              onClick={add}
              disabled={loading}
            >
              {loading ? <RingLoader /> : t("save")}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddPackageCost;

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

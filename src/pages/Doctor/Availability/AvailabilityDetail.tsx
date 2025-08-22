import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import style from "./PhyAvailability.module.css";
import commonStyles from "shared/utils/common.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CustomModal,
  DeleteModal,
  InputField,
  RingLoader,
} from "shared/components";
import { PrimaryButton } from "shared/components";
import commomstyles from "shared/utils/common.module.css";
import { Typography } from "@mui/material";
import classNames from "classnames";
import CustomSelect from "shared/components/CustomSelect";
import { doctor_Availability } from "shared/utils";
import CustomTimePicker from "shared/components/TimePicker/TimePICKER2";
import { TbRefresh } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  DoctorAddAvailabilityPrice,
  DoctorAddOnsiteAvailability,
  DoctorGetAvailibility,
} from "shared/services/DoctorService";
import { useTranslation } from "react-i18next";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";

interface Onsite {
  setShowAddModal: any;
}
interface Price {
  actualPrice?: number;
  meditourPrice?: number;
}
const DoctorAvailabilityDetail = (props: Partial<Onsite>) => {
  const { t, i18n }: any = useTranslation();
  const { state } = useLocation();

  const [availability_Data, set_AvailabilityData] = useState<any>({});
  const [priceLoading, setPriceLoading] = useState(false);
  const [selectedPeriodId, setSelectedPeriodId] = useState("");
  const [isMode, setIsMode] = useState("");
  const [price, setPrice] = useState<any>({ actualPrice: 0 });
  const [showAddModal, setShowAddModal] = useState(false);
  const [delModal, setDelmodal] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState<{
    dayOfWeek: number;
    periods: Array<{ startTime: string; endTime: string; _id: string }>;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDaySelect = (dayData: any) => {
    setSelectedDayData(dayData);
  };

  const FetchAvailibility = () => {
    setLoading(true);
    DoctorGetAvailibility()
      .then((res: any) => {
        let hosAvailToShow = {};
        let hosPriceToShow = {};
        if (state.availabilityType == "hospital") {
          let avail = res?.data?.availability[0]?.hospitalAvailability;

          avail?.map((item: any, index: any) => {
            if (state?.hospitalId == item?.hospitalId?._id) {
              hosAvailToShow = item;
              hosPriceToShow = item?.price;
            }
          });
        }
        console.log("🚀 ~ .then ~ res?.data:", res?.data);
        let availToSet =
          state.availabilityType == "clinic"
            ? res?.data?.availability[0]?.clinicAvailability
            : state.availabilityType == "in-house"
              ? res?.data?.availability[0]?.inHouseAvailability
              : state.availabilityType == "video"
                ? res?.data?.availability[0]?.videoAvailability
                : state.availabilityType == "hospital"
                  ? hosAvailToShow
                  : {};

        let priceToset =
          state.availabilityType == "clinic"
            ? res?.data?.availability[0]?.clinicAvailability?.price
            : state.availabilityType == "inhouse"
              ? res?.data?.availability[0]?.inHouseAvailability?.price
              : state.availabilityType == "video"
                ? res?.data?.availability[0]?.videoAvailability?.price
                : state.availabilityType == "hospital"
                  ? hosPriceToShow
                  : {};

        if (priceToset) {
          setPrice(priceToset);
        }
        set_AvailabilityData(availToSet);
      })
      .catch((err: any) => {
        console.error("Error in API call:", err?.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    FetchAvailibility();
  }, []);

  const onDeleteSlot = () => {
    let availability_clone = JSON.parse(JSON.stringify(availability_Data));

    let Index = availability_clone?.availability?.findIndex(
      (item: any) => item.dayOfWeek === selectedDayData?.dayOfWeek
    );

    if (Index > -1 && Index < availability_clone?.availability?.length) {
      if (
        availability_clone?.availability[Index]?.evening &&
        availability_clone?.availability[Index]?.morning
      ) {
        delete availability_clone?.availability[Index][selectedPeriodId];
      } else {
        availability_clone?.availability.splice(Index, 1);
      }
    }

    let params = {
      type: state.availabilityType,
      ...(state.hospitalId && {
        hospitalId: state.hospitalId,
      }),
      availability: availability_clone?.availability,
    };

    setLoading(true);

    handleSendTOServer(params);
  };

  const handleSendTOServer = (params: any) => {
    DoctorAddOnsiteAvailability(params)
      .then((res: any) => {
        setShowAddModal(false);
        setDelmodal(false);
        FetchAvailibility();
      })
      .catch((err: any) => { })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdatePrice = () => {
    let hospitalId = state?.hospitalId;
    setPriceLoading(true);
    let params = {
      type: state.availabilityType,
      ...(hospitalId && {
        hospitalId,
      }),
      price: price.actualPrice,
    };

    DoctorAddAvailabilityPrice(params)
      .then((res: any) => {
        notifySuccess(t("priceIsAdded"));
      })
      .catch((err: any) => { })
      .finally(() => setPriceLoading(false));
  };
  const sortedAvailability = availability_Data?.availability?.sort(
    (a: any, b: any) => a.dayOfWeek - b.dayOfWeek
  );

  return (
    <>
      <div className={classNames(commomstyles.col12)}>
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? commomstyles.pl36
              : commomstyles.pr36
          }
        >
          <div className={classNames(commomstyles.flxBetween)}>
            <div
              className={classNames(commomstyles.flx)}
              style={{ gap: "16px", alignItems: "center" }}
            >
              <p
                style={{ textTransform: "capitalize" }}
                className={classNames(commomstyles.fs24, commomstyles.semiBold)}
              >
                {t("availability")} {state.availabilityTitle}
              </p>
              {loading ? (
                <div className={style.outerRefresh}>
                  <RingLoader color="#7d7d7d" size={24} />
                </div>
              ) : (
                <div className={style.outerRefresh}>
                  <TbRefresh
                    color="#7d7d7d"
                    size={24}
                    onClick={FetchAvailibility}
                  />
                </div>
              )}
            </div>{" "}
            <button
              className={style.addbtn}
              onClick={() => {
                setShowAddModal(true);
                setIsMode("add");
              }}
            >
              + {t("add")}
            </button>
          </div>
          <div className={style.outerContainer}>
            <DeleteModal
              title={t("availability")}
              modalVisible={delModal}
              handleCancel={() => setDelmodal(false)}
              handleDelete={onDeleteSlot}
              loading={loading}
              type={t("availability")}
            />

            <div>
              <div className={style.flx} style={{ alignItems: "center" }}>
                <p className={style.heading} style={{ marginTop: "16px" }}>
                  {t("fee")}:
                </p>

                <div style={{ marginLeft: "64px", width: 200 }}>
                  <InputField
                    placeholder=""
                    id="actualPrice"
                    name="actualPrice"
                    type="text"
                    value={price?.actualPrice && price?.actualPrice}
                    onChange={(e: any) =>
                      setPrice({
                        actualPrice: e.target.value,
                      })
                    }
                  />
                </div>
                <div style={{ marginLeft: "64px", width: 120 }}>
                  <PrimaryButton
                    disabled={priceLoading}
                    children={
                      priceLoading ? (
                        <RingLoader size={35} color={"#fff"} />
                      ) : (
                        t("save")
                      )
                    }
                    onClick={handleUpdatePrice}
                    colorType={"New_blue"}
                  />
                </div>
              </div>
              <p className={style.heading} style={{ marginTop: 40 }}>
                {t("slots")}:
              </p>
              {sortedAvailability?.length > 0 ? (
                sortedAvailability?.map((dayData: any, index: any) => (
                  <div style={{}}>
                    <Accordion
                      key={index}
                      className={style.dropdown}
                      onClick={() => handleDaySelect(dayData)}
                      style={{ margin: " 20px auto" }}
                      sx={{
                        width: "75% !important",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon style={{ color: "#131313" }} />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography
                          style={{
                            fontWeight: "600",
                            color: "#131313",
                          }}
                        >
                          <p className={classNames(commomstyles.fs16)}>
                            {getDayName(dayData.dayOfWeek)}
                          </p>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {dayData?.morning && (
                          <Typography>
                            <div
                              key={dayData?.morning?._id}
                              style={{ marginBottom: "16px", gap: "16px" }}
                              className={classNames(commomstyles.flx)}
                            >
                              <div className={style.borderbttom}>
                                <p style={{ color: "#131313" }}>{`${t(
                                  "from"
                                )}: ${dayData?.morning?.startTime}`}</p>
                              </div>
                              <div className={style.borderbttom}>
                                <p style={{ color: "#131313" }}>{`${t("to")}: ${dayData?.morning?.endTime
                                  }`}</p>
                              </div>
                              <div className={classNames(commomstyles.flx)}>
                                <div
                                  className={style.deletebtn}
                                  onClick={() => {
                                    setSelectedPeriodId("morning");
                                    setDelmodal(true);
                                  }}
                                >
                                  <MdDelete color="ff3b30" />
                                </div>
                              </div>
                            </div>
                          </Typography>
                        )}

                        {dayData?.evening && (
                          <Typography>
                            <div
                              key={dayData?.evening?._id}
                              style={{ marginBottom: "16px", gap: "16px" }}
                              className={commomstyles.flx}
                            >
                              <div className={style.borderbttom}>
                                <p style={{ color: "#131313" }}>{`${t(
                                  "from"
                                )}: ${dayData?.evening?.startTime}`}</p>
                              </div>
                              <div className={style.borderbttom}>
                                <p style={{ color: "#131313" }}>
                                  {" "}
                                  {`${t("to")}: ${dayData?.evening?.endTime}`}
                                </p>
                              </div>
                              <div className={classNames(commomstyles.flx)}>
                                <div
                                  className={style.deletebtn}
                                  onClick={() => {
                                    setSelectedPeriodId("evening");
                                    setDelmodal(true);
                                  }}
                                >
                                  <MdDelete color="ff3b30" />
                                </div>
                              </div>
                            </div>
                          </Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ))
              ) : (
                <div>{!loading && <PhysiotheristsEmpty />}</div>
              )}
            </div>
          </div>{" "}
        </div>
        <div>
          <CustomModal
            showModal={showAddModal}
            children={
              <AddAvailibilityModal
                i18n={i18n}
                t={t}
                mode={isMode}
                availabilityType={state.availabilityType}
                setShowAddModal={setShowAddModal}
                selectedDayData={selectedDayData}
                loading={loading}
                setLoading={setLoading}
                handleSendTOServer={handleSendTOServer}
                FetchAvailibility={FetchAvailibility}
                availability_Data={availability_Data}
                hospitalId={state?.hospitalId}
              />
            }
          />
        </div>
      </div>
    </>
  );
};
export default DoctorAvailabilityDetail;

const getDayName = (dayOfWeek: number) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[dayOfWeek];
};

const AddAvailibilityModal = (props: any) => {
  const {
    i18n,
    t,
    setShowAddModal,
    mode,
    selectedDayData,
    availabilityType,
    FetchAvailibility,
    availability_Data,
    loading,
    setLoading,
    handleSendTOServer,
    hospitalId,
  } = props;

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  return (
    <div style={{ width: "520px" }}>
      <Typography id="modal-modal-description">
        <div
          className={commomstyles.flxBetween}
          style={{ marginBottom: "24px" }}
        >
          <p
            className={classNames(
              commomstyles.fs16,
              commomstyles.semiBold,
              style.colorBlack
            )}
          >
            {t("pleaseSelect")}
          </p>
          <IoClose className={style.close} onClick={handleCloseModal} />
        </div>

        <div>
          <Availability
            i18n={i18n}
            t={t}
            availabilityType={availabilityType}
            FetchAvailibility={FetchAvailibility}
            selectedDayData={selectedDayData}
            mode={mode}
            setShowAddModal={setShowAddModal}
            availability_Data={availability_Data}
            loading={loading}
            setLoading={setLoading}
            handleSendTOServer={handleSendTOServer}
            hospitalId={hospitalId}
          />
        </div>
      </Typography>
    </div>
  );
};

interface AvailabilityProps {
  i18n: any;
  t: any;
  setAddData: any;
  handleClickNext: any;
  setShowAddModal: any;
  FetchAvailibility: any;
  addData: any;
  mode?: any;
  availabilityType?: any;
  availability_Data?: any;
  selectedDayData?: any;
  loading?: boolean;
  setLoading?: any;
  handleSendTOServer?: any;
  hospitalId?: any;
}

const Availability = (props: Partial<AvailabilityProps>) => {
  const Day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [error, setError] = React.useState("");
  const {
    i18n,
    t,
    mode,
    availabilityType,
    availability_Data,
    loading,
    setLoading,
    handleSendTOServer,
    hospitalId,
  } = props;
  const formik = useFormik({
    initialValues: {
      onsiteDay: "",
      morningfrom: "",
      morningto: "",
      eveningfrom: "",
      eveningto: "",
      actualPrice: "",
    },
    validationSchema: Yup.object(doctor_Availability(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  const handleMorningFrom = (newTime: any) => {
    setError("");
    formik.setFieldValue("morningfrom", newTime);
  };
  const handleMorningTo = (newTime: any) => {
    setError("");
    formik.setFieldValue("morningto", newTime);
  };
  const handleEveningFrom = (newTime: any) => {
    setError("");
    const selectedTime = newTime ? newTime.toString() : "00:00";
    formik.setFieldValue("eveningfrom", selectedTime);
  };
  const handleEveningTo = (newTime: any) => {
    setError("");
    const selectedTime = newTime ? newTime.toString() : "00:00";
    formik.setFieldValue("eveningto", selectedTime);
  };

  useEffect(() => {
    formik?.validateForm();
  }, [i18n]);

  const handleSelect = (selectedOption: string) => {
    const dayToSelect = selectedOption;
    formik.setFieldValue("onsiteDay", dayToSelect);
  };
  const validateData = () => {
    const currentdata = formik.values;
    if (
      !currentdata?.morningfrom &&
      !currentdata?.morningto &&
      !currentdata?.eveningfrom &&
      !currentdata?.eveningto
    ) {
      setError(t("addAtleastOneShift"));
      return false;
    } else if (
      (currentdata?.morningfrom && !currentdata?.morningto) ||
      (currentdata?.eveningfrom && !currentdata?.eveningto)
    ) {
      setError(t("selectCompleteShift"));
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (validateData()) {
      let currentdata = formik.values;

      let availability: any = [];
      let day = Day.findIndex((day) => day === currentdata.onsiteDay);
      let Index: any = -1;
      let availability_clone: any = {};

      if (availability_Data) {
        availability_clone = JSON.parse(JSON.stringify(availability_Data));
        availability_clone?.availability?.map(async (item: any, index: any) => {
          if (item.dayOfWeek == day) {
            Index = index;
          }
        });
      }

      let morning = null;
      let evening = null;

      if (currentdata.morningfrom && currentdata.morningto) {
        morning = {
          startTime: currentdata.morningfrom,
          endTime: currentdata.morningto,
        };
      }
      if (currentdata.eveningfrom && currentdata.eveningto) {
        evening = {
          startTime: currentdata.eveningfrom,
          endTime: currentdata.eveningto,
        };
      }

      if (Index !== -1) {
        let clone = JSON.parse(
          JSON.stringify(availability_clone?.availability)
        );

        if (morning) {
          clone[Index].morning = morning;
        }

        if (evening) {
          clone[Index].evening = evening;
        }

        availability = clone;
      } else {
        if (availability_clone?.availability) {
          availability = [...availability_clone?.availability];
        }
        availability = [
          {
            dayOfWeek: day,
            ...(morning && {
              morning,
            }),
            ...(evening && {
              evening,
            }),
          },
          ...availability,
        ];
      }

      let params = {
        type: availabilityType,
        ...(hospitalId && {
          hospitalId,
        }),
        availability,
      };

      setLoading(true);
      try {
        const res = await handleSendTOServer(params);
        notifySuccess(t("availabilityAddedSuccessfully"));
      } catch (err) {
        notifyError(t("failedtoAddAvailability"));
      } finally {
        setLoading(false);
      }
    } else {
      setError(t("pleaseSelectTime"));
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={classNames(commomstyles.col12)}
    >
      {error && <div className={classNames(style.error)}>*{error}</div>}
      <div className={classNames(commonStyles.col12)}>
        <CustomSelect
          options={Day}
          placeholder={t("day")}
          onSelect={handleSelect}
          value={formik.values.onsiteDay}
          isEditing={mode === "edit"}
        />

        {formik.touched.onsiteDay && formik.errors.onsiteDay ? (
          <div className={classNames(commonStyles.error)}>
            *{formik.errors.onsiteDay}
          </div>
        ) : null}
      </div>

      <div
        className={classNames(commomstyles.flx, commomstyles.mt16)}
        style={{ gap: "24px" }}
      >
        <div className={classNames(style.col6)}>
          <CustomTimePicker
            placeholder={t("morningShiftStart")}
            setData={handleMorningFrom}
            onTimeChange={handleMorningFrom}
            value={formik.values.morningfrom}
          />

          {formik.touched.morningfrom && formik.errors.morningfrom ? (
            <div className={classNames(commonStyles.error)}>
              *{formik.errors.morningfrom}
            </div>
          ) : null}
        </div>
        <div className={classNames(style.col6)}>
          <CustomTimePicker
            placeholder={t("morningShiftEnd")}
            setData={handleMorningTo}
            onTimeChange={handleMorningTo}
            value={formik.values.morningto}
          />

          {formik.touched.morningto && formik.errors.morningto ? (
            <div className={classNames(commonStyles.error)}>
              *{formik.errors.morningto}
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={classNames(commomstyles.flx, commomstyles.mt16)}
        style={{ gap: "24px" }}
      >
        <div className={classNames(style.col6)}>
          <CustomTimePicker
            placeholder={t("eveningShiftStart")}
            setData={handleEveningFrom}
            onTimeChange={handleEveningFrom}
            value={formik.values.eveningfrom}
          />

          {formik.touched.eveningfrom && formik.errors.eveningfrom ? (
            <div className={classNames(commonStyles.error)}>
              *{formik.errors.eveningfrom}
            </div>
          ) : null}
        </div>
        <div className={classNames(style.col6)}>
          <CustomTimePicker
            placeholder={t("eveningShiftEnd")}
            setData={handleEveningTo}
            onTimeChange={handleEveningTo}
            value={formik.values.eveningto}
          />

          {formik.touched.eveningto && formik.errors.eveningto ? (
            <div className={classNames(commonStyles.error)}>
              *{formik.errors.eveningto}
            </div>
          ) : null}
        </div>
      </div>

      <div style={{ width: "210px", margin: "56px 0 0 0" }}>
        <PrimaryButton
          children={
            loading ? (
              <RingLoader size={35} color={"#fff"} />
            ) : mode === "edit" ? (
              t("updateAvailability")
            ) : (
              t("addAvailability")
            )
          }
          type="submit"
          colorType="New_blue"
        />
      </div>
    </form>
  );
};

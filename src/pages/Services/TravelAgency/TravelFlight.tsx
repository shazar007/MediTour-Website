import React, { useState, useRef, useEffect } from "react";
import style from "./TravelFlight.module.css";
import classNames from "classnames";
import LocationInput from "shared/components/LocationInput";
import DatepickerNew from "shared/components/DatePicker/DatePickerNew";
import { Dayjs } from "dayjs";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useFormik } from "formik";
import { flightsRequest, notify } from "shared/services";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";
import { RingLoader } from "shared/components";
import { RxCross2 } from "react-icons/rx";
type GuestCounts = {
  adult: number;
  children: number;
  infants: number;
};

type FlightSegment = {
  from: string;
  to: string;
  departureDate: Dayjs | null;
};

const TravelFlight = () => {
  const { t }: { t: (key: string) => string } = useTranslation();

  const barKeys = [t("round"), t("oneWay"), t("multiCity")];
  const [activeBar, setActiveBar] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGuest, setShowGuest] = useState(false);
  const [flightSegments, setFlightSegments] = useState<number[]>([0]);
  const [flights, setFlights] = useState<FlightSegment[]>([
    { from: "", to: "", departureDate: null },
  ]);
  useEffect(() => {
    setActiveBar(t("round"));
  }, [t]);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [guestCounts, setGuestCounts] = useState<GuestCounts>({
    adult: 1,
    children: 0,
    infants: 0,
  });
  const initialValues = {
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    guests: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    cabinClass: "Economy",
  };
  const initialValuesoneway: any = {
    from: "",
    to: "",
    departureDate: "",
    guests: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    cabinClass: "Economy",
  };
  const initialValueMultiCity = {
    flights: [{ from: "", to: "", departureDate: "" }],
    guests: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    cabinClass: "",
  };

  const [cabinClass, setCabinClass] = useState("Economy");

  const guestRef = useRef<HTMLDivElement>(null);
  const guestBoxRef = useRef<HTMLDivElement>(null);
  const [guestBoxStyle, setGuestBoxStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (showGuest && guestRef.current && guestBoxRef.current) {
      const rect = guestRef.current.getBoundingClientRect();
      setGuestBoxStyle({
        position: "absolute",
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left}px`,
        zIndex: 1000,
      });
    }
  }, [showGuest]);

  const handleBarClick = (bar: string) => {
    setActiveBar(bar);
  };

  const handleLguest = () => {
    setShowGuest((prev) => !prev);
  };

  const handleCloseGuest = () => {
    setShowGuest(false);
  };

  const handleLocationChange = (
    newLocation: any,
    type: "from" | "to",
    index?: any
  ) => {
    if (activeBar === t("multiCity")) {
      const updatedFlights = [...flights];
      if (type === "from") {
        updatedFlights[index].from = newLocation?.label || "";
      } else {
        updatedFlights[index].to = newLocation?.label || "";
      }
      setFlights(updatedFlights);
      formikMultiCity.setFieldValue("flights", updatedFlights);
    } else {
      if (type === "from") {
      } else {
      }
    }
  };

  const handleAddFlight = () => {
    setFlightSegments([...flightSegments, flightSegments.length]);
    setFlights([...flights, { from: "", to: "", departureDate: null }]);
  };

  const handleRemoveFlight = (indexToRemove: number) => {
    setFlightSegments((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );

    const newFlights = [...formikMultiCity.values.flights];
    newFlights.splice(indexToRemove, 1);
    formikMultiCity.setFieldValue("flights", newFlights);
  };
  const formatGuestSummary = () => {
    const { adult, children, infants } = guestCounts;
    const parts = [];
    if (adult > 0) parts.push(`${adult} ${t("adult")}`);
    if (children > 0) parts.push(`${children} ${t("children")}`);
    if (infants > 0) parts.push(`${infants} ${t("infants")}`);
    parts.push(t(cabinClass));
    return parts.join(", ");
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(RoundSchema(t)),
    onSubmit: async (values) => {
      setLoading(true);
      const body = {
        flights: [
          {
            from: values.from,
            to: values.to,
            departure: values.departureDate,
          },
        ],
        returnFlight: values.returnDate,
        flightClass: cabinClass,
        adult: guestCounts.adult,
        children: guestCounts.children,
        infant: guestCounts.infants,
        requestType: "round",
        isCompany: false,
      };

      try {
        const response = await flightsRequest(body);
        console.log("Round Flight API ✅", response);
        notifySuccess("Round Flight Request Is Successfully Submit");
        formik.resetForm();
      } catch (error) {
        console.error("Round Flight API ❌", error);
        notifyError("Round Flight Request is Faild");
      } finally {
        setLoading(false);
      }
    },
  });
  const formikoneway: any = useFormik({
    initialValues: initialValuesoneway,
    validationSchema: Yup.object(OnewaySchema(t)),

    onSubmit: async (values) => {
      setLoading(true);
      const body = {
        flights: [
          {
            from: values.from,
            to: values.to,
            departure: values.departureDate,
          },
        ],
        flightClass: cabinClass,
        adult: guestCounts.adult,
        children: guestCounts.children,
        infant: guestCounts.infants,
        requestType: "oneWay",
        isCompany: false,
      };
      try {
        const response = await flightsRequest(body);
        console.log("oneWay Flight API ✅", response);
        notifySuccess("oneWay Flight Request Is Successfully Submit");
        formikoneway.resetForm();
      } catch (error) {
        console.error("oneWay Flight API ❌", error);
        notifyError("oneWay Flight Request is Faild");
      } finally {
        setLoading(false);
      }
    },
  });
  const formikMultiCity: any = useFormik({
    initialValues: initialValueMultiCity,
    validationSchema: Yup.object(MultiSchema(t)),
    onSubmit: async (values) => {
      setLoading(true);
      const body = {
        flights,
        flightClass: cabinClass,
        adult: guestCounts.adult,
        children: guestCounts.children,
        infant: guestCounts.infants,
        requestType: "multiCity",
        isCompany: false,
      };
      try {
        const response = await flightsRequest(body);
        console.log("Multi-City Flight API ✅", response);
        notifySuccess("Multi-City Flight Request Is Successfully Submit");
        formikMultiCity.resetForm();
      } catch (error) {
        console.error("Multi-City Flight API ❌", error);
        notifyError("Multi-City Flight Request is Faild");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleDepartureDateChange = (date: any, index: number) => {
    if (activeBar === t("multiCity")) {
      const updatedFlights = [...flights];
      updatedFlights[index].departureDate = date?.toString() || "";
      setFlights(updatedFlights);
    } else {
      setStartDate(date);
    }
  };
  return (
    <div className={style.BarWrapper}>
      <div className={style.barheadContainer}>
        {barKeys.map((bar) => (
          <div
            key={bar}
            className={classNames(style.bar, {
              [style.activeBar]: activeBar === bar,
            })}
            onClick={() => handleBarClick(bar)}
          >
            {bar}
          </div>
        ))}
      </div>

      <div className={style.tabConatiner}>
        {activeBar === t("round") && (
          <form onSubmit={formik.handleSubmit}>
            <div className={style.flxWrapper}>
              <div className={style.w50}>
                <LocationInput
                  type="box"
                  height="48px"
                  placeholder={t("departureAirport")}
                  setData={(loc: any) => {
                    handleLocationChange(loc, "from");
                    formik.setFieldValue("from", loc?.label || "");
                  }}
                />
                {formik.touched.from && formik.errors.from ? (
                  <div className={style.error}>{formik.errors.from}</div>
                ) : null}
              </div>
              <div className={style.w50}>
                <LocationInput
                  type="box"
                  height="48px"
                  placeholder={t("arrivalAirport")}
                  setData={(loc: any) => {
                    handleLocationChange(loc, "to");
                    formik.setFieldValue("to", loc?.label || "");
                  }}
                />
                {formik.touched.to && formik.errors.to ? (
                  <div className={style.error}>{formik.errors.to}</div>
                ) : null}
              </div>
            </div>

            <div className={classNames(style.flxWrapper, style.mt24)}>
              <div className={style.w50}>
                <DatepickerNew
                  placeholder={t("departureDate")}
                  height="48px"
                  value={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    formik.setFieldValue("departureDate", date?.toString());
                  }}
                />
                {formik.touched.departureDate && formik.errors.departureDate ? (
                  <div className={style.error}>
                    {formik.errors.departureDate}
                  </div>
                ) : null}
              </div>

              <div className={style.w50}>
                <DatepickerNew
                  placeholder={t("returnDate")}
                  height="48px"
                  value={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    formik.setFieldValue("returnDate", date?.toString());
                  }}
                />
                {formik.touched.returnDate && formik.errors.returnDate ? (
                  <div className={style.error}>{formik.errors.returnDate}</div>
                ) : null}
              </div>
            </div>

            <div className={classNames(style.flxWrapper, style.mt24)}>
              <div className={style.w50}>
                <div
                  className={style.tab}
                  onClick={handleLguest}
                  ref={guestRef}
                >
                  <div className={style.tabrow}>
                    <p className={style.tabtile}>{t("travelers&CabinClass")}</p>
                    <p className={style.tabvalue}>{formatGuestSummary()}</p>
                  </div>
                  <FaChevronDown size={16} />
                </div>
              </div>
              <div className={style.w50}>
                <button className={style.RequestBtn} type="submit">
                  {loading ? (
                    <RingLoader size={24} color="#fff" />
                  ) : (
                    t("request")
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
        {activeBar === t("oneWay") && (
          <form onSubmit={formikoneway.handleSubmit}>
            <div className={style.flxWrapper}>
              <div className={style.w50}>
                <LocationInput
                  type="box"
                  height="48px"
                  placeholder={t("departureAirport")}
                  setData={(loc: any) => {
                    handleLocationChange(loc, "from");
                    formikoneway.setFieldValue("from", loc?.label || "");
                  }}
                />
                {formikoneway.touched.from && formikoneway.errors.from ? (
                  <div className={style.error}>{formikoneway.errors.from}</div>
                ) : null}
              </div>
              <div className={style.w50}>
                <LocationInput
                  type="box"
                  height="48px"
                  placeholder={t("arrivalAirport")}
                  setData={(loc: any) => {
                    handleLocationChange(loc, "to");
                    formikoneway.setFieldValue("to", loc?.label || "");
                  }}
                />
                {formikoneway.touched.to && formikoneway.errors.to ? (
                  <div className={style.error}>{formikoneway.errors.to}</div>
                ) : null}
              </div>
            </div>

            <div className={classNames(style.flxWrapper, style.mt24)}>
              <div className={style.w50}>
                <DatepickerNew
                  placeholder={t("departureTime")}
                  height="48px"
                  value={formikoneway.values.departureDate}
                  onChange={(value: any) =>
                    formikoneway.setFieldValue("departureDate", value)
                  }
                />{" "}
                {formikoneway.touched.departureDate &&
                formikoneway.errors.departureDate ? (
                  <div className={style.error}>
                    {formikoneway.errors.departureDate}
                  </div>
                ) : null}
              </div>{" "}
              <div className={style.w50}>
                <div
                  className={style.tab}
                  onClick={handleLguest}
                  ref={guestRef}
                >
                  <div className={style.tabrow}>
                    <p className={style.tabtile}>{t("travelers&CabinClass")}</p>
                    <p className={style.tabvalue}>{formatGuestSummary()}</p>
                  </div>
                  <FaChevronDown size={16} />
                </div>{" "}
              </div>
            </div>

            <div className={classNames(style.flxWrapper, style.mt24)}>
              <button className={style.RequestBtn} type="submit">
                {loading ? <RingLoader size={24} color="#fff" /> : t("request")}
              </button>
            </div>
          </form>
        )}
        {activeBar === t("multiCity") && (
          <form onSubmit={formikMultiCity.handleSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {flightSegments.map((segment, index) => (
                <div key={index}>
                  <div className={style.flxWrapper}>
                    <div className={style.w50}>
                      <LocationInput
                        type="box"
                        height="48px"
                        placeholder={t("departureAirport")}
                        setData={(loc: any) => {
                          handleLocationChange(loc, "from", index);
                          formikMultiCity.setFieldValue(
                            `flights[${index}].from`,
                            loc?.label || ""
                          );
                          formikMultiCity.setFieldTouched(
                            `flights[${index}].from`,
                            true
                          );
                        }}
                      />
                      {formikMultiCity.touched.flights?.[index]?.from &&
                        formikMultiCity.errors.flights?.[index]?.from && (
                          <div className={style.error}>
                            {formikMultiCity.errors.flights[index].from}
                          </div>
                        )}
                    </div>

                    <div className={style.w50}>
                      <LocationInput
                        type="box"
                        height="48px"
                        placeholder={t("arrivalAirport")}
                        setData={(loc: any) => {
                          handleLocationChange(loc, "to", index);
                          formikMultiCity.setFieldValue(
                            `flights[${index}].to`, // Fixed: was incorrectly setting 'from' before
                            loc?.label || ""
                          );
                          formikMultiCity.setFieldTouched(
                            `flights[${index}].to`,
                            true
                          );
                        }}
                      />
                      {formikMultiCity.touched.flights?.[index]?.to &&
                        formikMultiCity.errors.flights?.[index]?.to && (
                          <div className={style.error}>
                            {formikMultiCity.errors.flights[index].to}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className={classNames(style.flxWrapper, style.mt24)}>
                    <div className={style.w50}>
                      <DatepickerNew
                        placeholder={t("departureDate")}
                        height="48px"
                        value={flights[index]?.departureDate}
                        onChange={(date) => {
                          handleDepartureDateChange(date, index);
                          formikMultiCity.setFieldValue(
                            `flights[${index}].departureDate`,
                            date?.toString() || ""
                          );
                        }}
                      />
                      {formikMultiCity.touched?.flights?.[index]
                        ?.departureDate &&
                        formikMultiCity.errors?.flights?.[index]
                          ?.departureDate && (
                          <div className={style.error}>
                            {
                              formikMultiCity.errors.flights[index]
                                .departureDate
                            }
                          </div>
                        )}
                    </div>
                    {index === 0 && (
                      <div className={style.w50}>
                        <div
                          className={style.tab}
                          onClick={handleLguest}
                          ref={guestRef}
                        >
                          <div className={style.tabrow}>
                            <p className={style.tabtile}>
                              {t("travelers&CabinClass")}
                            </p>
                            <p className={style.tabvalue}>
                              {formatGuestSummary()}
                            </p>
                          </div>
                          <FaChevronDown size={16} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                width: "98%",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "24px",
              }}
            >
              <div className={style.flxx}>
                <div className={style.AddBtn} onClick={handleAddFlight}>
                  <IoMdAdd size={16} color="#fff" />
                </div>
                <p className={style.addtext}>{t("addAnotherFlight")}</p>
              </div>

              {flightSegments.length > 1 && (
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleRemoveFlight(flightSegments.length - 1)}
                >
                  <div className={style.AddBtn} style={{ background: "red" }}>
                    <RxCross2 color="white" size={16} />
                  </div>
                  <p className={style.addtext}>{t("removeFlight")}</p>
                </div>
              )}
            </div>

            <div className={classNames(style.flxWrapper, style.mt24)}>
              <button className={style.RequestBtn} type="submit">
                {loading ? <RingLoader size={24} color="#fff" /> : t("request")}
              </button>
            </div>
          </form>
        )}
      </div>

      {showGuest && (
        <div
          ref={guestBoxRef}
          style={guestBoxStyle}
          className={style.guestBoxWrapper}
        >
          <Guest
            t={t}
            onClose={handleCloseGuest}
            guestCounts={guestCounts}
            setGuestCounts={setGuestCounts}
            cabinClass={cabinClass}
            setCabinClass={setCabinClass}
          />
        </div>
      )}
    </div>
  );
};

export default TravelFlight;

type GuestType = "adult" | "children" | "infants";

type GuestItem = {
  type: GuestType | "footer";
  label: string;
  subtitle?: string;
};
const initialGuestTypes: GuestItem[] = [
  { type: "adult", label: "adult", subtitle: "age13_Above" },
  { type: "children", label: "children", subtitle: "age2_12" },
  { type: "infants", label: "infants", subtitle: "under2" },
  { type: "footer", label: "footer" },
];

interface GuestProps {
  t: (key: string) => string;
  onClose: () => void;
  guestCounts: GuestCounts;
  setGuestCounts: React.Dispatch<React.SetStateAction<GuestCounts>>;
  cabinClass: string;
  setCabinClass: React.Dispatch<React.SetStateAction<string>>;
}

const Guest: React.FC<GuestProps> = ({
  t,
  onClose,
  guestCounts,
  setGuestCounts,
  cabinClass,
  setCabinClass,
}) => {
  const handleChange = (type: GuestType, isIncrement: boolean) => {
    setGuestCounts((prev) => ({
      ...prev,
      [type]: isIncrement ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  const handleClear = () => {
    setGuestCounts({ adult: 1, children: 0, infants: 0 });
    setCabinClass("Economy");
  };

  const cabinOptions = ["Economy", "Business", "First"];

  return (
    <div className={style.guestContainer}>
      <div className={style.guestHeader}>
        <p className={style.cardheading}>{t("addGuest")}</p>
        <IoClose
          size={16}
          onClick={onClose}
          className={style.closeIcon}
          style={{ cursor: "pointer" }}
        />
      </div>

      {initialGuestTypes.map((item) => {
        if (item.type === "footer") {
          return (
            <React.Fragment key={item.type}>
              <div className={style.cabinSelector}>
                {cabinOptions.map((option) => (
                  <button
                    key={option}
                    className={classNames(style.cabinButton, {
                      [style.activeCabin]: cabinClass === option,
                    })}
                    onClick={() => setCabinClass(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className={style.footerButtons}>
                <button className={style.clearbtn} onClick={handleClear}>
                  {t("clear")}
                </button>
                <button className={style.clearbtn} onClick={onClose}>
                  {t("ok")}
                </button>
              </div>
            </React.Fragment>
          );
        }

        return (
          <div key={item.type} className={style.cardrow}>
            <div>
              <p className={style.rowtitle}>{t(item.label)}</p>
              {item.subtitle && (
                <p className={style.rowsubtitle}>{t(item.subtitle)}</p>
              )}
            </div>

            <div className={style.additionbar}>
              <button
                onClick={() => handleChange(item.type as GuestType, false)}
                className={style.circleMinus}
                disabled={
                  item.type === "adult"
                    ? guestCounts[item.type] <= 1
                    : guestCounts[item.type] <= 0
                }
              >
                -
              </button>
              <div className={style.value}>
                {guestCounts[item.type as GuestType]}
              </div>
              <button
                onClick={() => handleChange(item.type as GuestType, true)}
                className={style.circleMinus}
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export const RoundSchema = (t: any = (key: string) => key) => ({
  from: Yup.string().required(t("departureIsRequired")),
  to: Yup.string().required(t("arrivalIsRequired")),
  departureDate: Yup.string().required(t("departureDateIsRequired")),
  returnDate: Yup.string().required(t("returnDateIsRequired")),
  guests: Yup.object().shape({
    adults: Yup.number().min(1, t("atLeastOneAdultRequired")),
    children: Yup.number(),
    infants: Yup.number(),
  }),
  cabinClass: Yup.string(),
});
export const OnewaySchema = (t: any) => ({
  from: Yup.string().required(t("departureIsRequired")),
  to: Yup.string().required(t("arrivalIsRequired")),
  departureDate: Yup.string().required(t("departureDateIsRequired")),
  guests: Yup.object().shape({
    adults: Yup.number().min(1, "At least 1 adult is required"),
    children: Yup.number(),
    infants: Yup.number(),
  }),
  cabinClass: Yup.string(),
});
export const MultiSchema = (t: any) => ({
  flights: Yup.array()
    .of(
      Yup.object().shape({
        from: Yup.string().required(t("departureIsRequired")),
        to: Yup.string().required(t("arrivalIsRequired")),
        departureDate: Yup.string().required(t("departureDateIsRequired")),
      })
    )
    .min(1, "At least one flight segment is required"),
  guests: Yup.object().shape({
    adults: Yup.number().min(1, "At least 1 adult is required"),
    children: Yup.number(),
    infants: Yup.number(),
  }),
  cabinClass: Yup.string(),
});

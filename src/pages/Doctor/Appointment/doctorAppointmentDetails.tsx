import React, { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import styles from "./Physioappointment.module.css";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import commonStyles from "shared/utils/common.module.css";
import BP from "../../../assets/images/medical-equipment_10159791 1.png";
import Heart from "../../../assets/images/uil_monitor-heart-rate.png";
import Weight from "../../../assets/images/icon-park-solid_weight.png";
import Temperature from "../../../assets/images/oui_temperature.png";
import Sugar from "../../../assets/images/mdi_sugar.png";
import Gender from "assets/images/bi_gender-female (2).png";
import Blood from "assets/images/healthicons_blood-ab-p-outline.png";
import Age from "assets/images/stock-vector-age-icon-design-vector-illustration-arrow-symbol-age-limit-concept-2148368669 1.png";
import Phone from "assets/images/mingcute_birthday-2-line.png";
import call from "assets/images/appointablewhite.png";

import {
  CustomMenu,
  CustomModal,
  DeleteModal,
  InputField,
  Medicine_Table,
  PrimaryButton,
  RingLoader,
} from "shared/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import commonstyle from "shared/utils/common.module.css";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Checkbox } from "@mui/material";
import {
  doctorAppointmentAddTestSchema,
  doctorAppointmentHistory,
} from "shared/utils";
import {
  DoctorAddAppointmentHistory,
  DoctorAddAppointmentPrescription,
  DoctorGetSingleAppointment,
  ReferToDoctor,
  closeAppointment,
  doctorSearchProduct,
  getAllAppointment,
  getAllHospitals,
  getAllSpecialities,
  getDoctorSearch,
} from "shared/services/DoctorService";
import DoctorReferModel from "shared/components/DoctorEmpty/DoctorReferModel";
import { getAllTests } from "shared/services";
import dayjs from "dayjs";
import NewPagination from "shared/components/NewPagination/NewPagination";
import Room from "pages/Room";
import { setPateintData, setStartCall } from "shared/redux";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";
import { FaPlus } from "react-icons/fa6";
import { CgCloseR } from "react-icons/cg";

const dosageData = [
  { title: "1/2 Tablet", value: "1/2 Tablet" },
  { title: "1/4  Tablet", value: "1/4  Tablet" },
  { title: "1 Tablet", value: "1 Tablet" },
  { title: "2 Tablet", value: "2 Table" },
  { title: "3 Tablet", value: "3 Table" },
  { title: "4 Tablet", value: "4 Table" },
  { title: "1 Capsule", value: "1 Capsule" },
  { title: "2 Capsule", value: "2 Capsule" },
];

const routeData = [
  { title: "Oral (PO)", value: "Oral (PO)" },
  { title: "Intravenous (IV)", value: "Intravenous (IV)" },
  { title: "Intramuscular (IM)", value: "Intramuscular (IM)" },
  { title: "Subcutaneous (SC)", value: "Subcutaneous (SC)" },
  { title: "Topical", value: "Topical" },
  { title: "Transdermal", value: "Transdermal" },
  { title: "Inhalation", value: "Inhalation" },
  { title: "Sublingual (SL)", value: "Sublingual (SL)" },
  { title: "Buccal", value: "Buccal" },
  { title: "Rectal", value: "Rectal" },
  { title: "Vaginal", value: "Vaginal" },
  { title: "Ophthalmic", value: "Ophthalmic" },
  { title: "Otic", value: "Otic" },
  { title: "Nasal", value: "Nasal" },
];

const frequencyData = [
  { title: "Morning", value: "Morning", count: 1 },
  { title: "Noon", value: "Noon", count: 1 },
  { title: "Evening", value: "Evening", count: 1 },
  { title: "Night", value: "Night", count: 1 },

  { title: "Morning + Noon", value: "Morning + Noon", count: 2 },
  { title: "Morning + Evening", value: "Morning + Evening", count: 2 },
  { title: "Morning + Night", value: "Morning + Night", count: 2 },
  { title: "Noon + Evening", value: "Noon + Evening", count: 2 },
  { title: "Evening + Night", value: "Evening + Night", count: 2 },

  {
    title: "Morning + Noon + Evening",
    value: "Morning + Noon + Evening",
    count: 3,
  },
  {
    title: "Morning + Noon + Night",
    value: "Morning + Noon + Night",
    count: 3,
  },

  {
    title: "Morning + Evening + Night",
    value: "Morning + Evening + Night",
    count: 3,
  },
];

const daysData = Array.from({ length: 20 }, (_, i) => ({
  title: `${i + 1}`,
  value: `${i + 1}`,
}));

const istructionsData = [
  { title: "Before Breakfast", value: "Before Breakfast" },
  { title: "After Breakfast", value: "After Breakfast" },
  { title: "Before Lunch", value: "Before Lunch" },
  { title: "After Lunch", value: "After Lunch" },
  { title: "Before Dinner", value: "Before Dinner" },
  { title: "After Dinner", value: "After Dinner" },
  { title: "Before Bedtime", value: "Before Bedtime" },
];

export default function DoctorAppointmentDetails() {
  const { t, i18n }: any = useTranslation();
  const [showPrescriptionModel, setShowPrescriptionModel] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [closeLoading, setCloseLoading] = useState(false);
  const [pateintid, setPateintid] = useState<string | undefined>();
  const [medicinedata, setMedicineData] = useState<any>([]);
  const [testdata, setTestData] = useState<any>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isMedicineOpen, setMedicineOpen] = useState(false);
  const [isTestOpen, setTestOpen] = useState(false);
  const [error, setError] = React.useState("");
  const [referMenu, setReferMenu] = useState(false);
  const [selectedReferType, setSelectedReferType] = useState("");
  interface FullPatient {
    _id: string;
    name: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    userImage: string;
  }
  const [fullpatient, setFullpatient] = useState<FullPatient | null>(null);
  const [successmodal, setSuccessmodal] = useState<any>(false);
  const [selectedMed, setSelectedMed] = useState<any>({});
  const { state } = useLocation();
  let id = state.id;

  interface Appointment {
    appointmentDateAndTime?: string;
    date?: string;
    appointmentType?: string;
    _id?: string;
    history?: any;
    createdAt?: any;
    ePrescription?: any;
    patientId?: any;
  }
  interface Medicine {
    medicineName: string;
    medicineBrand: string;
    medicineStrength: string;
    dosage: string;
  }
  interface Test {
    testName: string;
  }
  const [appointment, setAppointment] = useState<Appointment>({});
  const { refetch } = useQuery({
    queryKey: ["doctorsAppointments", 1],
    queryFn: () => getAllAppointment(1),
    staleTime: 5 * 60 * 1000,
  });
  const navigate = useNavigate();
  const { systemType } = useSelector((state: any) => state.root.common);
  useEffect(() => {
    if (appointment?.ePrescription) {
      setMedicineData(appointment?.ePrescription?.medicines);
      setTestData(appointment?.ePrescription?.test);
    }
  }, [appointment]);

  const handleGoBack = () => {
    navigate(`/${systemType}/appointment`);
  };

  useEffect(() => {
    if (successmodal) {
      const timer = setTimeout(() => {
        setSuccessmodal(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successmodal]);

  const handleAccordionChange = (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setIsAccordionOpen(isExpanded);
    setReferMenu(false);
  };

  const handleMedicineClick = () => {
    setMedicineOpen(!isMedicineOpen);
    setTestOpen(false);
  };

  const handleTestClick = () => {
    setTestOpen(!isTestOpen);
    setMedicineOpen(false);
  };

  const fetchSingleAppointment = (id: string) => {
    setLoading(true);
    DoctorGetSingleAppointment(id)
      .then((res) => {
        setAppointment(res.data.appointment);
        setPateintid(res.data.appointment.patientId._id);
        setFullpatient(res.data.appointment.patientId);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const formik = useFormik({
    initialValues: {
      symptoms: "",
      description: "",
      diastolicPressure: "",
      systolicPressure: "",
      weight: "",
      diseases: "",
      temperature: "",
      heartRate: "",
      sugar: "",
    },
    validationSchema: Yup.object(doctorAppointmentHistory(t)),
    onSubmit: (values, { resetForm }) => {
      handleSubmit();
      resetForm();
    },
  });
  const handleSubmit = () => {
    let currentdata = formik.values;

    setLoading(true);

    let params = {
      patientId: pateintid,
      appointmentId: appointment?._id,
    };
    let body = {
      symptoms: currentdata.symptoms,
      description: currentdata.description,
      bloodPressure: {
        diastolicPressure: Number(currentdata.diastolicPressure) || 0,
        systolicPressure: Number(currentdata.systolicPressure) || 0,
      },
      weight: currentdata.weight,
      diseases: currentdata?.diseases,
      temperature: currentdata?.temperature,
      heartRate: currentdata?.heartRate,
      sugar: currentdata?.sugar,
    };

    DoctorAddAppointmentHistory(body, params)
      .then((res) => {
        fetchSingleAppointment(id);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const formikAddMedicine: any = useFormik({
    initialValues: {
      medicineId: "",
      medicineName: "",
      dosage: "",
      route: "",
      frequency: "",
      instruction: "",
      days: "",
      quantity: 1,
    },
    validationSchema: Yup.object({
      medicineId: Yup.string(),
      medicineName: Yup.string(),
      dosage: Yup.string().required(t("required")),
      route: Yup.string().required(t("required")),
      frequency: Yup.string().required(t("required")),
      instruction: Yup.string().required(t("required")),
      days: Yup.number().required(t("required")).min(1, t("atleast1Day")),
      quantity: Yup.number().required(t("required")).min(1, t("atleast1")),
    }),
    onSubmit: (values: any) => {
      handleSubmittwo();
      formikAddMedicine?.resetForm();
    },
  });

  useEffect(() => {
    formikAddMedicine.validateForm();
    formik.validateForm();
  }, [i18n.language]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      handleSearchProduct(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleTestSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setTestSearchQuery(query);

    if (query) {
      fetchAllTests(query);
    } else {
      setTestSuggestions([]);
    }
  };

  const handleTestSuggestionClick = (suggestion: any) => {
    setTestSearchQuery(suggestion?.name);
    formikAddTest.setFieldValue("testName", suggestion?.name);
    formikAddTest.setFieldValue("testId", suggestion?._id);
    setTestSuggestions([]);
  };

  const fetchAllTests = (search: string) => {
    getAllTests(1, search)
      .then((res: any) => {
        setTestSuggestions(res?.data?.data);
      })
      .catch((err: any) => {});
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion?.productName);
    setSelectedMed(suggestion);
    formikAddMedicine.setFieldValue("medicineId", suggestion._id);
    formikAddMedicine.setFieldValue("medicineName", suggestion?.productName);
    if (suggestion?.productType == "Syrup") {
      formikAddMedicine.setFieldValue("quantity", 1);
    }
    setSuggestions([]);
  };

  const handleSearchProduct = (keyword: any) => {
    doctorSearchProduct(keyword)
      .then((res: any) => {
        setSuggestions(res?.data?.products);
      })
      .catch((err: any) => {});
  };

  const handleSubmittwo = () => {
    const newMedicine = formikAddMedicine.values;

    let med_clone = JSON.parse(JSON.stringify(medicinedata));

    med_clone = [...med_clone, newMedicine];
    setSearchQuery("");
    setMedicineData(med_clone);
  };

  const formikAddTest = useFormik({
    initialValues: {
      testName: "",
      testId: "",
    },
    validationSchema: Yup.object(doctorAppointmentAddTestSchema),
    onSubmit: (values, { resetForm }) => {
      handleSubmitAddTest();
      resetForm();
    },
  });
  const deleteEntry = (index: number) => {
    const newItems = medicinedata.filter((_: any, i: number) => i !== index);
    setMedicineData(newItems);
  };

  const handleDeleteTest = (index: any) => {
    const newItems = testdata.filter((_: any, i: number) => i !== index);
    setTestData(newItems);
  };

  const handleSubmitAddTest = () => {
    const { testName, testId } = formikAddTest.values;

    const newTest = {
      testName,
      testId,
    };
    let test_clone = JSON.parse(JSON.stringify(testdata));
    test_clone = [...test_clone, newTest];
    setTestData(test_clone);
    setTestSearchQuery("");
  };

  interface PrescriptionParams {
    medicines?: Medicine[];
    test?: Test[];
  }

  const AddPrescription = () => {
    let apt_clone = JSON.parse(JSON.stringify(appointment));

    if ((medicinedata?.length ?? 0) === 0 && (testdata?.length ?? 0) === 0) {
      notifyError(t("requiredTestOrMedicine"));
      return;
    }
    let params: PrescriptionParams = {};
    if (medicinedata?.length > 0) {
      params.medicines = medicinedata;
    }
    if (testdata?.length > 0) {
      params.test = testdata;
    }

    if (id && pateintid) {
      setLoading(true);
      refetch();
      DoctorAddAppointmentPrescription(id, pateintid, params)
        .then((res) => {
          setError("");
          handleOpenModel();
          setMedicineData([]);
          setTestData([]);
          apt_clone.ePrescription = res?.data?.prescription;
          setAppointment(apt_clone);
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const [goBack, setGoBack] = useState(false);
  const handleCloseAppointment = () => {
    setCloseLoading(true);
    refetch();
    closeAppointment(id)
      .then((res: any) => {
        refetch();
        setGoBack(true);
        navigate(`/${systemType}/appointment`);
      })
      .catch((error: any) => {
        setError(error?.response?.data?.message);
      })
      .finally(() => setCloseLoading(false));
  };
  useEffect(() => {
    if (id) {
      fetchSingleAppointment(id);
    }
  }, []);
  const handleOpenModel = () => {
    setShowPrescriptionModel(true);
  };
  useEffect(() => {
    if (showPrescriptionModel) {
      const timer = setTimeout(() => {
        setShowPrescriptionModel(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPrescriptionModel]);
  interface Entry {
    id: number;
    category: string;
    dosage: string;
    route: string;
    frequency: string;
    instruction: string;
    days: number;
    quantity: number;
  }
  const handleGoBackkk = () => {
    navigate("/doctor/patientHistory");
  };
  const handleReferItemClick = (item: any) => {
    setSelectedReferType(item);
    setReferMenu(false);
    setShowAddModal(true);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [testSearchQuery, setTestSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [testSuggestions, setTestSuggestions] = useState<string[]>([]);
  const [showCustomDosageModal, setShowCustomDosageModal] = useState(false);
  const [showCustomInstructionModal, setShowCustomInstructionModal] =
    useState(false);
  const [videomodel, setVideomodel] = useState(false);
  const [showRoom, setShowRoom] = useState<any>(false);
  const dispatch = useDispatch();

  const handleSend = () => {
    setVideomodel(false);
    setShowRoom(true);
    dispatch(setStartCall(true));
  };
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <div className={classNames(commonstyles.col12)}>
      {!showRoom && <></>}

      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyles.pl36
            : commonstyles.pr36
        }
      >
        <p className={classNames(styles.heading, commonstyles.mb24)}>
          {t("appointmentDetails")}
        </p>
        <div className={styles.outerContainer}>
          <div>
            <div className={styles.profileOuter}>
              <div className={commonStyles.flx} style={{ gap: "24px" }}>
                <Avatar
                  src={fullpatient?.userImage}
                  style={{ height: "48px", width: "48px" }}
                />
                <div>
                  <p className={styles.profileName}> {fullpatient?.name}</p>
                  <p className={styles.profileId}>
                    MR No : {appointment?.patientId?.mrNo}
                  </p>
                </div>
              </div>
              <div className={commonStyles.flx} style={{ gap: "24px" }}>
                <div>
                  <CustomMenu
                    open={referMenu}
                    setOpen={setReferMenu}
                    menuItems={["Doctor", "Specialities", "Hospital"]}
                    onClickItem={handleReferItemClick}
                  />
                </div>
                {appointment?.appointmentType === "video" && (
                  <button className={classNames(styles.Btnff)}>
                    <img src={call} className={styles.BtnIcon} alt="Call" />
                  </button>
                )}
                <button
                  className={classNames(styles.Btnff)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setReferMenu(true);
                  }}
                >
                  <FaPlus color="#fff" className={styles.BtnIcon} />
                  <p> {t("refer")}</p>
                </button>{" "}
                <button
                  className={classNames(styles.Btnff)}
                  onClick={handleGoBackkk}
                >
                  {t("patientHistory")}
                </button>
              </div>
            </div>
            <div className={styles.AppDetailcard}>
              <div
                className={commonStyles.flxBetween}
                style={{ alignItems: "center" }}
              >
                <p className={styles.cardHeading}>{t("basicInformation")}</p>
              </div>
              <div className={styles.infoWrapper}>
                {[
                  {
                    img: Gender,
                    label: "gender",
                    value: fullpatient?.gender,
                  },
                  {
                    img: Blood,
                    label: "blood",
                    value: appointment?.patientId?.bloodGroup,
                  },
                  {
                    img: Age,
                    label: "age",
                    value: fullpatient?.dateOfBirth
                      ? dayjs().diff(
                          dayjs(fullpatient?.dateOfBirth, [
                            "YYYY-MM-DD ",
                            "YYYY/MM/DD",
                            "DD-MM-YYYY",
                            "DD/MM/YYYY",
                          ]),
                          "year"
                        ) + " years"
                      : "N/A",
                  },

                  {
                    img: Phone,
                    label: "phone",
                    value: appointment?.patientId?.phone,
                  },
                ].map((item, index) => (
                  <div className={styles.width20} key={index}>
                    <div
                      className={commonstyles.flx}
                      style={{ gap: "8px", alignItems: "start" }}
                    >
                      <img
                        src={item.img}
                        alt={`item image ${index + 1}`}
                        className={styles.Icon}
                      />
                      <div>
                        <p className={styles.tag}>{t(item.label)}</p>
                        <p className={styles.value}>{item.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showRoom && (
            <Room
              setShowRoom={setShowRoom}
              goback={goBack}
              isScrolled={scrollPosition}
              setScrollPosition={setScrollPosition}
            />
          )}

          <div>
            <Accordion className={styles.dropdownApp}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "#000000" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <div>
                    <p className={classNames(styles.fs14)}>{t("history")}</p>
                  </div>
                </Typography>
              </AccordionSummary>
              <div className={styles.border}></div>
              <AccordionDetails>
                <Typography>
                  <div className={commonstyles.colorBlue}>
                    <form onSubmit={formik.handleSubmit}>
                      <div className={styles.formFlex}>
                        <div className={styles.W20}>
                          <p className={classNames(styles.historyHeading)}>
                            Systolic BP (mmhg) *Range(60-250)
                          </p>
                          <Doc_Input
                            icon={BP}
                            id="systolicPressure"
                            name="systolicPressure"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.systolicPressure}
                          />
                          {formik.touched.systolicPressure &&
                          formik.errors.systolicPressure ? (
                            <div className={classNames(commonStyles.error)}>
                              *{formik.errors.systolicPressure}
                            </div>
                          ) : null}
                        </div>
                        <div className={styles.W20}>
                          {" "}
                          <p className={classNames(styles.historyHeading)}>
                            Diastolic BP (mmhg) *Range(50-150)
                          </p>
                          <Doc_Input
                            icon={BP}
                            id="diastolicPressure"
                            name="diastolicPressure"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.diastolicPressure}
                          />
                          {formik.touched.diastolicPressure &&
                          formik.errors.diastolicPressure ? (
                            <div className={classNames(commonStyles.error)}>
                              *{formik.errors.diastolicPressure}
                            </div>
                          ) : null}
                        </div>
                        <div className={styles.W20}>
                          <p className={classNames(styles.historyHeading)}>
                            {t("weight")} (KG)* (2-180)
                          </p>
                          <Doc_Input
                            icon={Weight}
                            id="weight"
                            name="weight"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.weight}
                          />
                          {formik.touched.weight && formik.errors.weight ? (
                            <div className={classNames(commonStyles.error)}>
                              *{formik.errors.weight}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className={styles.formFlex}>
                        <div className={styles.W20}>
                          {" "}
                          <p className={classNames(styles.historyHeading)}>
                            {t("temperature")}
                          </p>
                          <Doc_Input
                            icon={Temperature}
                            id="temperature"
                            name="temperature"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.temperature}
                          />
                          {formik.touched.temperature &&
                          formik.errors.temperature ? (
                            <div className={classNames(commonStyles.error)}>
                              *{formik.errors.temperature}
                            </div>
                          ) : null}
                        </div>
                        <div className={styles.W20}>
                          {" "}
                          <p className={classNames(styles.historyHeading)}>
                            {t("heartRate")}
                          </p>
                          <Doc_Input
                            icon={Heart}
                            id="heartRate"
                            name="heartRate"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.heartRate}
                          />
                          {formik.touched.heartRate &&
                          formik.errors.heartRate ? (
                            <div className={classNames(commonStyles.error)}>
                              *{formik.errors.heartRate}
                            </div>
                          ) : null}
                        </div>
                        <div className={styles.W20}>
                          {" "}
                          <p className={classNames(styles.historyHeading)}>
                            {t("sugar")}
                          </p>
                          <Doc_Input
                            icon={Sugar}
                            id="sugar"
                            name="sugar"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.sugar}
                          />
                          {formik.touched.sugar && formik.errors.sugar ? (
                            <div className={classNames(commonStyles.error)}>
                              *{formik.errors.sugar}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className={styles.formFlex}>
                        <div className={styles.W20}>
                          <p className={classNames(styles.historyHeading)}>
                            {t("diseases")}
                          </p>
                          <textarea
                            style={{
                              width: "100%",
                              overflow: "auto",
                              padding: "12px",
                            }}
                            className={styles.texteara}
                            placeholder={t("enterDiseases_AddComma")}
                            id="diseases"
                            name="diseases"
                            onChange={formik.handleChange}
                            value={formik.values.diseases}
                          />

                          {formik.touched.diseases && formik.errors.diseases ? (
                            <div className={classNames(commonStyles.error)}>
                              *{formik.errors.diseases}
                            </div>
                          ) : null}
                        </div>
                        <div className={styles.W20}>
                          <p className={classNames(styles.historyHeading)}>
                            {t("symptoms")}
                          </p>
                          <textarea
                            className={styles.texteara}
                            placeholder={t("writeSymptomsHere")}
                            id="symptoms"
                            name="symptoms"
                            onChange={formik.handleChange}
                            value={formik.values.symptoms}
                            style={{
                              width: "100%",
                              overflow: "auto",
                              padding: "12px",
                            }}
                          />
                          {formik.touched.symptoms && formik.errors.symptoms ? (
                            <div className={classNames(commonStyles.error)}>
                              *{formik.errors.symptoms}
                            </div>
                          ) : null}
                        </div>
                        <div className={styles.W20}>
                          <p className={classNames(styles.historyHeading)}>
                            {t("Des_AboutPatient")}
                          </p>
                          <textarea
                            className={styles.texteara}
                            placeholder={t("writeDescriptionHere")}
                            id="description"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            style={{
                              padding: "12px",
                              width: "100%",
                              overflow: "auto",
                            }}
                          />{" "}
                          {formik.touched.description &&
                          formik.errors.description ? (
                            <div className={classNames(commonStyles.error)}>
                              *{formik.errors.description}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: "32px",
                          width: "160px",
                          cursor: "pointer",
                        }}
                      >
                        <button className={styles.blueBtn} type="submit">
                          {loading ? (
                            <RingLoader size={35} color={"#fff"} />
                          ) : (
                            t("save")
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion
              className={styles.dropdownApp}
              expanded={isAccordionOpen}
              onChange={handleAccordionChange}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{ color: "#000000" }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{
                    width: "100%",
                  }}
                >
                  <div
                    className={classNames(
                      commonstyles.flx,
                      commonStyles.flxBetween,
                      commonStyles.flxWrap
                    )}
                  >
                    <p className={classNames(styles.fs14)}>
                      {t("prescription")}
                    </p>
                    <div
                      className={classNames(commonStyles.flx)}
                      style={{ marginRight: "24px", gap: "24px" }}
                    >
                      {isAccordionOpen && (
                        <>
                          <div
                            className={commonstyles.flx}
                            style={{ gap: "12px" }}
                          >
                            <BiSolidMessageSquareAdd
                              className={styles.AddIcon}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMedicineClick();
                              }}
                            />
                            <p
                              className={classNames(styles.addheading)}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMedicineClick();
                              }}
                            >
                              {t("addMedicine")}
                            </p>
                          </div>
                          <div
                            className={commonstyles.flx}
                            style={{ gap: "12px" }}
                          >
                            <BiSolidMessageSquareAdd
                              className={styles.AddIcon}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTestClick();
                              }}
                            />

                            <p
                              className={classNames(styles.addheading)}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTestClick();
                              }}
                            >
                              {t("addTest")}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <div className={styles.border}></div>
              <AccordionDetails className={styles.PrescriptionColor}>
                <Typography>
                  <div className={commonstyles.colorBlue}>
                    <div className={(styles.flx, commonStyles.mt16)}>
                      <div style={{ width: "100%" }}>
                        {isMedicineOpen && (
                          <div className={styles.overlay}>
                            <div className={styles.modal}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p className={styles.value}>
                                  {t("medicineDetails")}
                                </p>
                                <IoClose
                                  style={{ cursor: "pointer" }}
                                  size={16}
                                  color="#7D7D7D"
                                  onClick={() => setMedicineOpen(false)}
                                />
                              </div>
                              <form
                                style={{ marginTop: "24px" }}
                                onSubmit={formikAddMedicine.handleSubmit}
                              >
                                <div>
                                  <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder={t("searchMedicine_")}
                                    style={{
                                      width: "100%",
                                      padding: "10px",
                                      marginBottom: "10px",
                                      height: "48px",
                                      border: "2px solid #ccc",
                                      borderRadius: "4px",
                                    }}
                                  />

                                  {suggestions?.length > 0 && (
                                    <div
                                      className={styles.searchResults}
                                      style={{
                                        backgroundColor: "white",
                                        zIndex: 10,
                                        marginTop: -10,
                                      }}
                                    >
                                      <ul>
                                        {suggestions.map(
                                          (suggestion: any, index) => (
                                            <li
                                              key={index}
                                              className={styles.suggestionItem}
                                              onClick={() =>
                                                handleSuggestionClick(
                                                  suggestion
                                                )
                                              }
                                              style={{
                                                listStyleType: "none",
                                              }}
                                            >
                                              {suggestion?.productName}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p
                                    className={classNames(
                                      commonstyles.fs12,
                                      commonstyles.colorOrange,
                                      commonstyles.medium,
                                      commonStyles.underLine
                                    )}
                                    onClick={() =>
                                      setShowCustomDosageModal(true)
                                    }
                                  >
                                    {t("addCustom")}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "24px",
                                  }}
                                >
                                  <div style={{ flex: 1 }}>
                                    <CustomModal
                                      showModal={showCustomDosageModal}
                                    >
                                      <div style={{ width: "420px" }}>
                                        <InputField
                                          placeholder={t("enterCustomDosage")}
                                          id="dosage"
                                          name="dosage"
                                          type="text"
                                          onChange={
                                            formikAddMedicine.handleChange
                                          }
                                          value={
                                            formikAddMedicine.values.dosage
                                          }
                                        />
                                      </div>
                                      <div
                                        className={classNames(styles.mt16)}
                                        style={{
                                          display: "flex",
                                          justifyContent: "end",
                                        }}
                                      >
                                        <button
                                          className={styles.CloseBtn}
                                          type="button"
                                          onClick={() => {
                                            setShowCustomDosageModal(false);
                                          }}
                                        >
                                          {t("close")}
                                        </button>
                                      </div>
                                    </CustomModal>
                                    <div className={styles.dfife}>
                                      <select
                                        id="dosage"
                                        name="dosage"
                                        onChange={
                                          formikAddMedicine.handleChange
                                        }
                                        value={formikAddMedicine.values.dosage}
                                        className={classNames(
                                          styles.customSelect
                                        )}
                                        style={{
                                          width: "100%",
                                          height: "48px",
                                          border: "2px solid #ccc",
                                          borderRadius: "4px",
                                          padding: "10px",
                                        }}
                                      >
                                        <option value="">
                                          {formikAddMedicine.values.dosage
                                            ? formikAddMedicine.values.dosage
                                            : "Select Dosage"}
                                        </option>
                                        {dosageData.map(
                                          (v: any, ind: number) => (
                                            <option key={ind} value={v.value}>
                                              {v.title}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                    {formikAddMedicine.touched.dosage &&
                                    formikAddMedicine.errors.dosage ? (
                                      <div
                                        className={classNames(
                                          commonStyles.error
                                        )}
                                      >
                                        *{formikAddMedicine.errors.dosage}
                                      </div>
                                    ) : null}
                                  </div>

                                  <div style={{ flex: 1 }}>
                                    <select
                                      id="route"
                                      name="route"
                                      onChange={formikAddMedicine.handleChange}
                                      value={formikAddMedicine.values.route}
                                      className={classNames(
                                        styles.customSelect
                                      )}
                                      style={{
                                        height: "48px",
                                        border: "2px solid #ccc",
                                        borderRadius: "4px",
                                        padding: "10px",
                                        width: "100%",
                                      }}
                                    >
                                      <option value="">
                                        {t("selectFrequency")}
                                      </option>
                                      {routeData.map((v: any, ind: number) => (
                                        <option key={ind} value={v.value}>
                                          {v.title}
                                        </option>
                                      ))}
                                    </select>
                                    {formikAddMedicine.touched.route &&
                                    formikAddMedicine.errors.route ? (
                                      <div
                                        className={classNames(
                                          commonStyles.error
                                        )}
                                      >
                                        *{formikAddMedicine.errors.route}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>

                                <div
                                  className={classNames(commonstyles.mt16)}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "24px",
                                  }}
                                >
                                  <div style={{ flex: 1 }}>
                                    <select
                                      id="frequency"
                                      name="frequency"
                                      onChange={(e: any) => {
                                        formikAddMedicine.setFieldValue(
                                          "frequency",
                                          e.target.value
                                        );

                                        if (
                                          selectedMed?.productType ==
                                            "Tablet" ||
                                          selectedMed?.productType == "Capsule"
                                        ) {
                                          let obj: any = frequencyData.find(
                                            (item: any) =>
                                              item.title == e.target.value
                                          );
                                          let multiple =
                                            obj?.count *
                                            formikAddMedicine?.values?.days;

                                          formikAddMedicine.setFieldValue(
                                            "quantity",
                                            multiple
                                          );
                                        }
                                      }}
                                      value={formikAddMedicine.values.frequency}
                                      className={classNames(
                                        styles.customSelect
                                      )}
                                      style={{
                                        border: "2px solid #ccc",
                                        borderRadius: "4px",
                                        padding: "10px",
                                        width: "100%",
                                        height: "48px",
                                      }}
                                    >
                                      <option value="">
                                        {t("selectRoute")}
                                      </option>
                                      {frequencyData.map(
                                        (v: any, ind: number) => (
                                          <option key={ind} value={v.value}>
                                            {v.title}
                                          </option>
                                        )
                                      )}
                                    </select>
                                    {formikAddMedicine.touched.frequency &&
                                    formikAddMedicine.errors.frequency ? (
                                      <div
                                        className={classNames(
                                          commonStyles.error
                                        )}
                                      >
                                        *{formikAddMedicine.errors.frequency}
                                      </div>
                                    ) : null}
                                  </div>

                                  <div style={{ flex: 1 }}>
                                    <select
                                      id="days"
                                      name="days"
                                      onChange={(e: any) => {
                                        formikAddMedicine.setFieldValue(
                                          "days",
                                          e.target.value
                                        );
                                        if (
                                          selectedMed?.productType ==
                                            "Tablet" ||
                                          selectedMed?.productType == "Capsule"
                                        ) {
                                          let obj: any = frequencyData.find(
                                            (item: any) =>
                                              item.title ==
                                              formikAddMedicine.values.frequency
                                          );
                                          let multiple =
                                            obj?.count * e.target.value;

                                          formikAddMedicine.setFieldValue(
                                            "quantity",
                                            multiple
                                          );
                                        }
                                      }}
                                      value={formikAddMedicine.values.days}
                                      className={classNames(
                                        styles.customSelect
                                      )}
                                      style={{
                                        borderRadius: "3px",
                                        padding: "10px",

                                        width: "100%",
                                        height: "48px",
                                        border: "2px solid #ccc",
                                      }}
                                    >
                                      <option value="">
                                        {t("selectDays")}
                                      </option>
                                      {daysData.map((v: any, ind: number) => (
                                        <option key={ind} value={v.value}>
                                          {v.title}
                                        </option>
                                      ))}
                                    </select>
                                    {formikAddMedicine.touched.days &&
                                    formikAddMedicine.errors.days ? (
                                      <div
                                        className={classNames(
                                          commonStyles.error
                                        )}
                                      >
                                        *{formikAddMedicine.errors.days}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>

                                <div className={styles.mt16}>
                                  <div className={classNames(styles.row)}>
                                    <div className={classNames(styles.col12)}>
                                      <div>
                                        <p
                                          className={classNames(
                                            commonstyles.fs12,
                                            commonstyles.colorOrange,
                                            commonstyles.medium,
                                            commonStyles.underLine
                                          )}
                                          onClick={() =>
                                            setShowCustomInstructionModal(true)
                                          }
                                        >
                                          {t("addCustom")}
                                        </p>
                                      </div>
                                      <CustomModal
                                        showModal={showCustomInstructionModal}
                                      >
                                        <div style={{ width: "420px" }}>
                                          <InputField
                                            placeholder={t(
                                              "enterCustomInstructions"
                                            )}
                                            id="instruction"
                                            name="instruction"
                                            type="text"
                                            onChange={
                                              formikAddMedicine.handleChange
                                            }
                                            value={
                                              formikAddMedicine.values
                                                .instruction
                                            }
                                          />
                                        </div>
                                        <div
                                          className={classNames(styles.mt16)}
                                          style={{
                                            display: "flex",
                                            justifyContent: "end",
                                          }}
                                        >
                                          <button
                                            className={styles.CloseBtn}
                                            type="button"
                                            onClick={() => {
                                              setShowCustomInstructionModal(
                                                false
                                              );
                                            }}
                                          >
                                            {t("close")}
                                          </button>
                                        </div>
                                      </CustomModal>
                                      <select
                                        id="instruction"
                                        name="instruction"
                                        onChange={
                                          formikAddMedicine.handleChange
                                        }
                                        value={
                                          formikAddMedicine.values.instruction
                                        }
                                        className={classNames(
                                          styles.customSelect
                                        )}
                                        style={{
                                          height: "48px",
                                          border: "2px solid #ccc",
                                          borderRadius: "3px",
                                          padding: "10px",
                                          width: "100%",
                                        }}
                                      >
                                        <option value="">
                                          {formikAddMedicine.values.instruction
                                            ? formikAddMedicine.values
                                                .instruction
                                            : t("selectInstructions")}
                                        </option>
                                        {istructionsData.map(
                                          (v: any, ind: number) => (
                                            <option key={ind} value={v.value}>
                                              {v.title}
                                            </option>
                                          )
                                        )}
                                      </select>
                                      {formikAddMedicine.touched.instruction &&
                                      formikAddMedicine.errors.instruction ? (
                                        <div
                                          className={classNames(
                                            commonStyles.error
                                          )}
                                        >
                                          *
                                          {formikAddMedicine.errors.instruction}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>

                                  <div
                                    className={classNames(
                                      styles.row,
                                      commonStyles.mt16
                                    )}
                                  >
                                    <div className={classNames(styles.col12)}>
                                      <InputField
                                        placeholder={t("quantity")}
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        onChange={
                                          formikAddMedicine.handleChange
                                        }
                                        value={
                                          formikAddMedicine.values.quantity
                                        }
                                        className={classNames(
                                          styles.customInput
                                        )}
                                        min="1"
                                        required
                                        style={{
                                          border: "2px solid rgb(0, 39, 109)",
                                          borderRadius: "3px",
                                          padding: "10px",
                                          width: "98%",
                                        }}
                                      />
                                      {formikAddMedicine.touched.quantity &&
                                      formikAddMedicine.errors.quantity ? (
                                        <div
                                          className={classNames(
                                            commonStyles.error
                                          )}
                                        >
                                          *{formikAddMedicine.errors.quantity}
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "24px",
                                  }}
                                >
                                  <button
                                    className={styles.blueBtn}
                                    type="button"
                                    onClick={formikAddMedicine.handleSubmit}
                                  >
                                    {t("save")}
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}

                        {isTestOpen && (
                          <div className={styles.overlay}>
                            <div className={styles.modal}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p className={styles.value}>{t("addTest")}</p>
                                <IoClose
                                  style={{ cursor: "pointer" }}
                                  size={16}
                                  color="#7D7D7D"
                                  onClick={() => setTestOpen(false)}
                                />
                              </div>
                              <form onSubmit={formikAddTest.handleSubmit}>
                                <input
                                  type="text"
                                  value={testSearchQuery}
                                  onChange={handleTestSearchChange}
                                  placeholder={t("searchTestHere")}
                                  style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginBottom: "10px",
                                    border: "2px solid #ccc",
                                    borderRadius: "4px",
                                    marginTop: "24px",
                                  }}
                                />

                                {formikAddTest.touched.testName &&
                                formikAddTest.errors.testName ? (
                                  <div
                                    className={classNames(commonstyles.error)}
                                  >
                                    *{formikAddTest.errors.testName}
                                  </div>
                                ) : null}

                                {testSuggestions?.length > 0 && (
                                  <div
                                    className={styles.searchResults}
                                    style={{
                                      backgroundColor: "white",
                                      zIndex: 10,
                                      marginTop: -10,
                                    }}
                                  >
                                    <ul>
                                      {testSuggestions.map(
                                        (suggestion: any, index) => (
                                          <li
                                            key={index}
                                            className={styles.suggestionItem}
                                            onClick={() =>
                                              handleTestSuggestionClick(
                                                suggestion
                                              )
                                            }
                                            style={{
                                              listStyleType: "none",
                                            }}
                                          >
                                            {suggestion?.name}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}

                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "24px",
                                  }}
                                >
                                  <button
                                    className={styles.blueBtn}
                                    type="submit"
                                  >
                                    {t("save")}
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                        <div className={styles.logboxx}>
                          {appointment?.history && (
                            <>
                              <p
                                className={classNames(
                                  styles.fs14,
                                  commonStyles.mt16,
                                  commonStyles.mb8
                                )}
                              >
                                {t("addedHistory")}:
                              </p>
                              <div
                                style={{
                                  border: "1px solid #0E54A3",
                                  padding: "10px",
                                  borderRadius: "16px",
                                  display: "flex",
                                  gap: "24px",
                                  alignItems: "center",
                                  flexWrap: "wrap",
                                }}
                              >
                                <div className={styles.w15}>
                                  <p className={styles.title}>
                                    {t("bloodPressure")}
                                  </p>
                                  <p className={styles.value}>
                                    {
                                      appointment?.history?.bloodPressure
                                        ?.systolicPressure
                                    }{" "}
                                    mmhg -{" "}
                                    {
                                      appointment?.history?.bloodPressure
                                        ?.diastolicPressure
                                    }{" "}
                                    mmhg
                                  </p>
                                </div>
                                <div className={styles.w15}>
                                  <p className={styles.title}>{t("weight")}</p>
                                  <p className={styles.value}>
                                    {appointment?.history?.weight} kg
                                  </p>
                                </div>
                                <div className={styles.w15}>
                                  <p className={styles.title}>
                                    {t("temperature")}
                                  </p>
                                  <p className={styles.value}>
                                    {appointment?.history?.temperature}
                                  </p>
                                </div>
                                <div className={styles.w15}>
                                  <p className={styles.title}>
                                    {t("heartRate")}
                                  </p>
                                  <p className={styles.value}>
                                    {appointment?.history?.heartRate}
                                  </p>
                                </div>
                                <div className={styles.w15}>
                                  <p className={styles.title}>{t("sugar")}</p>
                                  <p className={styles.value}>
                                    {appointment?.history?.sugar}
                                  </p>
                                </div>{" "}
                                <div className={styles.w100}>
                                  <p className={styles.title}>
                                    {t("symptoms")}
                                  </p>
                                  <p className={styles.value}>
                                    {appointment?.history?.symptoms}
                                  </p>
                                </div>
                                <div className={styles.w100}>
                                  <p className={styles.title}>
                                    {t("description")}
                                  </p>
                                  <p className={styles.value}>
                                    {appointment?.history?.description}
                                  </p>
                                </div>
                                <div className={styles.w100}>
                                  <p className={styles.title}>
                                    {t("diseases")}
                                  </p>
                                  {appointment?.history?.diseases.map(
                                    (i: any) => (
                                      <p className={styles.value}>{i}</p>
                                    )
                                  )}
                                </div>
                              </div>
                            </>
                          )}

                          {testdata?.length > 0 && (
                            <p
                              style={{ borderBottom: "0.25px solid #7d7d7d" }}
                              className={classNames(styles.fs14, styles.mt16)}
                            >
                              {t("tests")}:
                            </p>
                          )}

                          {testdata?.map((test: any, index: number) => (
                            <div
                              key={index}
                              className={classNames(
                                commonstyles.flx,
                                commonStyles.mb16,
                                commonStyles.mt16
                              )}
                              style={{ gap: "16px" }}
                            >
                              <p className={styles.value}>{test?.testName}</p>
                              <CgCloseR
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  color: "red",
                                }}
                                onClick={() => handleDeleteTest(index)}
                              />
                            </div>
                          ))}
                          {medicinedata?.length > 0 && (
                            <>
                              <p
                                style={{ borderBottom: "0.25px solid #7d7d7d" }}
                                className={classNames(
                                  styles.title,
                                  commonStyles.mt24
                                )}
                              >
                                {t("medicines")}
                              </p>

                              <Medicine_Table
                                data={medicinedata}
                                type={"Bid"}
                                handleDelete={deleteEntry}
                              />
                            </>
                          )}
                        </div>
                        {error && (
                          <div className={classNames(commonStyles.error)}>
                            *{error}
                          </div>
                        )}
                        <div>
                          <div
                            className={classNames(
                              commonStyles.flx,
                              commonStyles.flxEnd,
                              styles.mt24
                            )}
                            style={{ gap: "24px" }}
                          >
                            <div className={classNames(commonStyles.colsm12)}>
                              <button
                                className={styles.blueBtn}
                                onClick={() => {
                                  handleCloseAppointment();
                                }}
                              >
                                {closeLoading ? (
                                  <RingLoader size={35} color={"#fff"} />
                                ) : (
                                  t("closeAppointment")
                                )}
                              </button>
                            </div>

                            <div className={classNames(commonStyles.colsm12)}>
                              <button
                                className={styles.blueBtn}
                                onClick={() => {
                                  AddPrescription();
                                }}
                              >
                                {" "}
                                {loading ? (
                                  <RingLoader size={35} color={"#fff"} />
                                ) : (
                                  t("savePrescription")
                                )}
                              </button>
                            </div>
                          </div>

                          <CustomModal showModal={showPrescriptionModel}>
                            <div style={{ width: "420px" }}>
                              <FaCheckCircle className={styles.done} />
                              <p
                                className={classNames(
                                  commonStyles.fs16,
                                  commonStyles.semiBold,
                                  commonStyles.colorBlue,
                                  styles.textcenter
                                )}
                              >
                                {t("prescriptionSuccessfullyAdded")}
                              </p>
                            </div>
                          </CustomModal>
                        </div>
                      </div>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <CustomModal
          showModal={showAddModal}
          children={
            <ReferDoctor
              t={t}
              fullpatient={fullpatient}
              selectedReferType={selectedReferType}
              setShowAddModal={setShowAddModal}
              pateintid={pateintid}
              appointmentId={appointment?._id}
              setSuccessmodal={setSuccessmodal}
              handleGoBack={handleGoBack}
            />
          }
        />

        <CustomModal showModal={successmodal}>
          <div style={{ width: "420px" }}>
            <FaCheckCircle className={styles.done} />
            <p
              className={classNames(
                commonStyles.fs16,
                commonStyles.semiBold,
                commonStyles.colorBlue,
                styles.textcenter
              )}
            >
              {t("yourPatientSuccessfullyReferred")}
            </p>
          </div>
        </CustomModal>
      </div>
      <DeleteModal
        handleDelete={handleSend}
        handleCancel={() => setVideomodel(false)}
        content={`${t("wantToLink_")} ${fullpatient?.name}`}
        modalVisible={videomodel}
        confirmText={t("yesSend")}
      />
    </div>
  );
}

interface RefProps {
  t: any;
  setShowAddModal: any;
  pateintid: any;
  fullpatient: any;
  selectedReferType?: any;
  appointmentId?: any;
  setSuccessmodal?: any;
  handleGoBack?: any;
}

const ReferDoctor = (props: Partial<RefProps>) => {
  const { i18n }: any = useTranslation();

  const [error, setError] = React.useState("");
  const [confirmmodal, setConfirmmodal] = useState(false);
  const {
    t,
    setShowAddModal,
    pateintid,
    fullpatient,
    selectedReferType,
    appointmentId,
    setSuccessmodal,
    handleGoBack,
  } = props;

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const itemsPerPage = 10;
  const [length, setLength] = useState(0);
  const totalItems = length;
  const [refdoctor, setReferdoctor] = useState<any>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  const [searchInput, setSearchInput] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleReferalSelection = (referal: any) => {
    setSelectedDoctorId(referal?._id);
  };

  const getDoctorSearching = (searchInput: string, pageno: any) => {
    setLoading(true);
    getDoctorSearch(searchInput, pageno)
      .then((res: any) => {
        setReferdoctor(res.data.doctors);
        setLength(res?.data?.totalDoctors);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getSpecialities = (searchInput: string, pageno: any) => {
    setLoading(true);
    getAllSpecialities(pageno, searchInput)
      .then((res: any) => {
        setReferdoctor(res.data.specialities);
        setLength(res?.data?.totalSpecialities);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getHospitals = (searchInput: string, pageno: any) => {
    setLoading(true);
    getAllHospitals(pageno, searchInput)
      .then((res: any) => {
        setReferdoctor(res.data.hospitals);
        setLength(res?.data?.totalHospitals);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedReferType === "Doctor") {
      getDoctorSearching(searchInput, currentPage);
    } else if (selectedReferType === "Specialities") {
      getSpecialities(searchInput, currentPage);
      notifyError(t("pleaseSelectSpecialities"));
    } else if (selectedReferType === "Hospital") {
      getHospitals(searchInput, currentPage);
      notifyError(t("pleaseSelectHospital"));
    }
  }, [searchInput, selectedReferType, currentPage]);

  const ReferTheDoctor = () => {
    if (selectedDoctorId && pateintid) {
      setConfirmmodal(true);
      setError("");
    } else {
      if (!selectedDoctorId) {
        notifyError(t("pleaseSelectDoctor"));
      }
    }
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;
    const nextPage = currentPage + 1;
    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      if (selectedReferType === "Doctor") {
        getDoctorSearching(searchInput, nextPage);
      } else if (selectedReferType === "Specialities") {
        getSpecialities(searchInput, nextPage);
      } else if (selectedReferType === "Hospital") {
        getHospitals(searchInput, nextPage);
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      setPageno(pageno - 10);

      if (selectedReferType === "Doctor") {
        getDoctorSearching(searchInput, prevPage);
      } else if (selectedReferType === "Specialities") {
        getSpecialities(searchInput, prevPage);
      } else if (selectedReferType === "Hospital") {
        getHospitals(searchInput, prevPage);
      }
    }
  };

  return (
    <div style={{ width: "800px" }}>
      <div className={styles.DoctorSearch}>
        <input
          type="Search by Name"
          placeholder={t("search")}
          value={searchInput}
          onChange={handleInputChange}
        />
        <IoClose className={styles.close} onClick={handleCloseModal} />
      </div>

      {loading ? (
        <DoctorReferModel showModal={loading} />
      ) : (
        <div className={styles.loader}>
          {refdoctor.map((doctor: any) => {
            return (
              <div>
                <div
                  className={classNames(commonStyles.flx, styles.doctorcard)}
                >
                  <Avatar
                    src={doctor.doctorImage}
                    className={
                      ["ur", "ar", "ps", "pr"].includes(i18n.language)
                        ? styles.avatarlang
                        : styles.avatar
                    }
                  />
                  <div>
                    <p
                      className={classNames(
                        commonStyles.fs14,
                        commonStyles.medium
                      )}
                      style={{ textTransform: "capitalize", color: "#131313" }}
                    >
                      {selectedReferType === "Doctor" ||
                      selectedReferType === "Hospital"
                        ? doctor?.name
                        : doctor?.specialityTitle}
                    </p>

                    {selectedReferType === "Specialities" && (
                      <p
                        className={classNames(
                          commonStyles.fs14,
                          commonStyles.medium
                        )}
                        style={{
                          textTransform: "capitalize",
                          color: "#7d7d7d",
                        }}
                      >
                        {doctor?.doctorsCount} {t("doctorsAvailable")}
                      </p>
                    )}
                  </div>
                  <div
                    className={
                      ["ur", "ar", "ps", "pr"].includes(i18n.language)
                        ? styles.endlang
                        : styles.end
                    }
                  >
                    <Checkbox
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={
                        <CheckCircleOutlineIcon style={{ color: "green" }} />
                      }
                      onChange={() => handleReferalSelection(doctor)}
                      checked={selectedDoctorId === doctor._id}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div
        style={{
          justifyContent: "flex-end",
          display: "flex",
          marginTop: "16px",
        }}
      >
        <NewPagination
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
          startItem={(currentPage - 1) * itemsPerPage + 1}
          endItem={Math.min(currentPage * itemsPerPage, length)}
          totalItems={totalItems}
        />
      </div>
      <div className={styles.mt16}>
        <PrimaryButton
          children={t("refer")}
          colorType={"New_blue"}
          onClick={ReferTheDoctor}
        />

        {error && (
          <div className={classNames(commonStyles.error)}>*{error}</div>
        )}
      </div>

      <CustomModal
        showModal={confirmmodal}
        children={
          <Confirm
            t={t}
            selectedReferType={selectedReferType}
            fullpatient={fullpatient}
            setConfirmmodal={setConfirmmodal}
            setShowAddModal={setShowAddModal}
            pateintid={pateintid}
            selectedDoctorId={selectedDoctorId}
            appointmentId={appointmentId}
            setSuccessmodal={setSuccessmodal}
            handleGoBack={handleGoBack}
          />
        }
      />
    </div>
  );
};

interface ConfirmProps {
  t: any;
  fullpatient: any;
  setConfirmmodal: any;
  setShowAddModal: any;
  pateintid: any;
  selectedDoctorId: any;
  selectedReferType?: any;
  appointmentId?: any;
  setSuccessmodal?: any;
  handleGoBack?: any;
}

const Confirm = (props: Partial<ConfirmProps>) => {
  const {
    t,
    fullpatient,
    setConfirmmodal,
    setShowAddModal,
    pateintid,
    selectedDoctorId,
    selectedReferType,
    appointmentId,
    setSuccessmodal,
    handleGoBack,
  } = props;

  const [referLoading, setReferLoading] = useState(false);

  const ReferAPI = () => {
    let body = {
      referType: selectedReferType,
      patientId: pateintid,
      appointmentId: appointmentId,
      ...(selectedReferType === "Doctor" && {
        doctorId: selectedDoctorId,
      }),
      ...(selectedReferType === "Specialities" && {
        specialityId: selectedDoctorId,
      }),
      ...(selectedReferType === "Hospital" && {
        hospitalId: selectedDoctorId,
      }),
    };

    setReferLoading(true);
    ReferToDoctor(body)
      .then((res: any) => {
        setSuccessmodal(true);
        setConfirmmodal(false);
        setShowAddModal(false);
        handleGoBack();
      })
      .catch((err: any) => {})
      .finally(() => setReferLoading(false));
  };

  return (
    <>
      <div style={{ width: "400px" }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <IoClose
            className={styles.closefinal}
            onClick={() => setConfirmmodal(false)}
          />
        </div>

        <p
          className={classNames(
            commonstyle.fs16,
            commonstyle.semiBold,
            styles.mt24,
            commonstyle.colorBlue,
            styles.textcenter
          )}
        >
          {t("doYouWantToRefer")} {fullpatient.name} ?
        </p>
        <div className={classNames(commonstyle.flxEvenly, styles.mt32)}>
          <div style={{ width: "104px" }}>
            <PrimaryButton
              disabled={referLoading}
              children={t("no")}
              colorType={"Red"}
              onClick={() => {
                setConfirmmodal(false);
              }}
            />
          </div>
          <div style={{ width: "104px" }}>
            <PrimaryButton
              disabled={referLoading}
              children={
                referLoading ? (
                  <RingLoader size={35} color={"#fff"} />
                ) : (
                  t("yes")
                )
              }
              colorType={"green"}
              onClick={() => {
                ReferAPI();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export interface InputComponent {
  id?: string | number;
  name?: string;
  placeholder?: string;
  type?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  contentEditable?: boolean;
  onDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  icon?: any;
}

export const Doc_Input: React.FC<InputComponent> = ({
  id,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  inputRef,
  onClick,
  onBlur,
  contentEditable = false,
  onDown,
  className,
  icon,
}) => {
  return (
    <div className={styles.InputOuter}>
      <div className={styles.IconWrapper}>
        {" "}
        <img src={icon} alt="Icon" className={styles.InputIcon} />
      </div>

      <div className={styles.InputWrapper}>
        <input
          id={id?.toString()}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          ref={inputRef}
          onClick={onClick}
          onBlur={onBlur}
          onKeyDown={onDown}
          contentEditable={contentEditable}
          className={className}
        />
      </div>
    </div>
  );
};

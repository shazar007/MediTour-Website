import React, { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import styles from "./MyAppointmentRecord.module.css";
import Footerr from "../Footer";
import stylesApp from "./Appointment.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Picker from "assets/images/imagePPicker.png";
import dayjs from "dayjs";
import { Radio } from "@mui/material";
import {
  add_File,
  getUser_Laboratory,
  Preception_Details,
  saveUploadResulsUser,
} from "shared/services";
import { useDispatch, useSelector } from "react-redux";
import { setObj } from "shared/redux";
import CustomLoader from "shared/components/New_Loader/Loader";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
import { FaChevronDown } from "react-icons/fa6";
import { PiClipboardTextThin } from "react-icons/pi";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";
import { useDirection } from "shared/utils/DirectionContext";

interface Test {
  testName: string;
}

const MyAppointmentPrescription = React.memo((props) => {
  const { t, i18n }: any = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpentest, setIsOpentest] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [finalSelection, setFinalSelection] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [labResults, setLabResults] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [showDiagnosticCenters, setShowDiagnosticCenters] = useState(false);
  const [data, setData] = useState<any>([]);
  const [filterlab, setFilterLabs] = useState<any>([]);
  const [itemPrices, setItemPrices] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useSelector((state: any) => state.root.common);
  const [selectedPreference, setSelectedPreference] = useState("");
  const [selectedCards, setSelectedCards] = useState<any>(null);
  const [labsResults, setLabsResults] = useState<any>([]);
  const handleCardClick = (item: any) => {
    setSelectedCards(item);
  };
  useEffect(() => {
    document.title = "MediTour Global | About Us";
    window.scrollTo(0, 0);
    setLoading(true);
    getPatientData();
  }, []);

  useEffect(() => {
    if (data?.ePrescription?.medicines) {
      const total = data?.ePrescription?.medicines?.reduce(
        (acc: any, item: any) => {
          const itemPrice = item?.quantity * item?.medicineId?.pricePerTab || 0;
          return acc + itemPrice;
        },
        0
      );
      setItemPrices(total);
    }
  }, [data?.ePrescription?.medicines]);
  useEffect(() => {
    if (Array.isArray(labsResults)) {
      setLabResults(labsResults);
    }
  }, [labsResults]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  const Submit_File = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await add_File(formData);
      const fileUrl = response?.data?.fileUrl;

      saveTest(fileUrl);

      if (fileUrl && selectedFile) {
        const newReport = {
          createdAt: new Date().toISOString(),
          results: fileUrl,
          vendorId: {
            name: selectedFile.name,
          },
        };

        setLabResults((prev) => [newReport, ...prev]);
        setSelectedFile(null);
      }

      setLoading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);
    }
  };

  const dateOfBirth = user?.dateOfBirth;
  const age = dateOfBirth ? dayjs().diff(dayjs(dateOfBirth), "year") : null;

  const saveTest = (url: any) => {
    let params = {
      resultUrl: url,
    };
    saveUploadResulsUser(state?.id, params)
      .then((res: any) => {
        notifySuccess(res?.data?.message);
      })
      .catch((err: any) => {
        notifySuccess(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getPatientData = () => {
    let params = {
      appointmentId: state.id,
    };
    Preception_Details(params)
      .then(async (res: any) => {
        console.log(res?.data, "...........patientdata");
        await setData(res?.data?.patientAppointments);
        await setFilterLabs(res?.data?.filteredLabs);
        await setLabsResults(res?.data?.orders);
        getList();
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const getList = () => {
    let params = {
      page: 1,
      search: "",
      lat: "",
      long: "",
      filter: "all",
    };
    getUser_Laboratory(params)
      .then(async (res: any) => {})
      .catch((err: any) => {});
  };

  const handlePreferenceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSelectedPreference(value);
  };

  const handleCheckOut = () => {
    if (showDiagnosticCenters && showDiagnosticCenters) {
      if (selectedCards) {
        if (!selectedPreference) {
          notifyError(t("selectPreferenceBeforeProceed"));
          return;
        }
        const testPrice = selectedCards.totalUserAmount;
        const sum = testPrice + itemPrices;

        const combinedData = {
          medicines: data?.ePrescription?.medicines,
          selectedCards,
          itemPrices,
          data,
          appointmentId: state?.id,
          selectedPreference,
          prescription: "bothTest",
        };
        dispatch(setObj(combinedData));
        navigate("/services/paymentDetail", {
          state: {
            serviceName: "labTestPharmacy",
            actualAmount: sum,
          },
        });
      }
    } else if (showDiagnosticCenters) {
      if (selectedCards) {
        if (!selectedPreference) {
          notifyError(t("selectPreferenceBeforeProceed"));
          return;
        }
        const testPrice = selectedCards.totalUserAmount;
        const combinedData = {
          selectedCards,
          selectedPreference,
          prescription: "labtest",
          appointmentId: state?.id,
        };
        dispatch(setObj(combinedData));
        navigate("/services/paymentDetail", {
          state: {
            serviceName: "labTestPharmacy",
            actualAmount: testPrice,
          },
        });
      }
    }
  };

  const handleDownload = (test: any) => {
    if (test) {
      const link = document.createElement("a");
      link.href = test;
      link.download = "policy-document.jpg";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("No policy document available.");
    }
  };
  const { isRtl } = useDirection();

  const handleOptionClick = (value: any) => {
    setShowMessage(true);
    setSelectedOption(value);
    setShowDiagnosticCenters(true);
  };
  const handleOk = () => {
    const names =
      data?.ePrescription?.medicines?.map((med: any) => med.medicineName) || [];
    setFinalSelection(names);
    setIsOpen(false);
    setShowMessage(false);
  };
  const handleCancel = () => {
    setIsOpen(false);
    setShowMessage(false);
  };

  return (
    <>
      <div className={classNames(styles.maincontainer)}>
        <ServiceHeader
          headingBlue={t("my")}
          headingOrange={t("appointments")}
          desc_width="70%"
        />
        <div className={stylesApp.maincontainer}>
          <div className={stylesApp.cardAppointment}>
            <div
              className={
                ["ur", "ar", "ps", "pr"].includes(i18n.language)
                  ? stylesApp.imgContainerlg
                  : stylesApp.imgContainer
              }
            >
              <img
                src={
                  data?.doctorId?.doctorImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                }
                alt="doctorImage"
              />
            </div>
            <div className={stylesApp.cardBody}>
              <div className={stylesApp.contentpart}>
                <div>
                  <p className={stylesApp.cardtitle}> {data?.doctorId?.name}</p>
                  <p className={stylesApp.PMDC}>PMDC {t("verified")}</p>
                  <p
                    className={stylesApp.Textcard}
                    style={{ lineHeight: "20px" }}
                  >
                    {data?.doctorId?.qualifications}
                  </p>
                </div>
                <p
                  className={stylesApp.Amount}
                  style={{
                    color: data?.isPaidFull === false ? "#b3261e" : "#13A89E",
                    fontWeight: data?.isPaidFull === false ? "400" : "600",
                  }}
                >
                  {data?.isPaidFull === false
                    ? t("pendingAmountMessage")
                    : t("paid")}
                </p>
              </div>{" "}
              <div className={stylesApp.bordercard}></div>
              <div className={stylesApp.listpart}>
                <div>
                  <div>
                    <p className={stylesApp.listHeading}>
                      {t("appointmentDate&Time")}
                    </p>
                    <div
                      className={
                        ["ur", "ar", "ps", "pr"].includes(i18n.language)
                          ? stylesApp.dummmaylg
                          : stylesApp.dummmay
                      }
                    >
                      <ul>
                        <li style={{ direction: isRtl ? "rtl" : "ltr" }}>
                          <span>
                            {dayjs(data?.appointmentDateAndTime).format(
                              "DD/MM/YYYY"
                            )}
                          </span>
                          <span style={{ color: "#0E54A3", fontWeight: "600" }}>
                            {" "}
                            {dayjs(data?.appointmentDateAndTime).format(
                              isRtl ? "hh:mm A" : "hh:mm A" // Same format, but Urdu digits if locale is set
                            )}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.containerPrescription}>
            <div className={styles.w50}>
              <p className={styles.subHead}>{t("details")}</p>
              <div
                className={styles.texting}
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                {" "}
                <span style={{ fontWeight: "600", color: "#131313" }}>
                  {t("symptoms")}:{" "}
                </span>
                <span>{data?.history?.symptoms}</span>
              </div>
              <div
                className={styles.texting}
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <span style={{ fontWeight: "600", color: "#131313" }}>
                  {t("medicine")}:{" "}
                </span>
                {data?.ePrescription?.medicines?.map((med: any) => (
                  <span>{med?.medicineName}</span>
                ))}
              </div>{" "}
              <div className={styles.container}>
                <div
                  className={styles.dropDown}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "calc(100% - 24px)",
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                  >
                    {finalSelection || t("wantMedicineMeditour_")}
                  </p>
                  <FaChevronDown size={16} color="#7d7d7d" />
                </div>

                {isOpen && (
                  <div className={styles.menu}>
                    {!showMessage ? (
                      <div className={styles.options}>
                        <div
                          className={styles.option}
                          onClick={() => handleOptionClick("Yes")}
                        >
                          {t("yes")}
                        </div>
                        <div
                          className={styles.option}
                          onClick={handleOptionClick}
                        >
                          {t("no")}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          style={{
                            width: "100%",
                            maxWidth: "1000px",
                            height: "300px",
                            overflowX: "auto",
                            overflowY: "hidden",
                            scrollBehavior: "smooth",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                          }}
                          className="hide-scrollbar"
                        >
                          <div
                            style={{
                              display: "flex",
                              minWidth: "max-content",
                              alignItems: "start",
                            }}
                          >
                            {/* Left Label Column */}
                            <div
                              style={{
                                minWidth: "180px",
                                backgroundColor: "#f9f9f9",
                                padding: "12px 16px",
                              }}
                            >
                              {[
                                "_name",
                                "generic",
                                "days",
                                "quantity",
                                "pricePerTab",
                                "price",
                              ].map((label, index) => (
                                <p
                                  key={index}
                                  className={stylesApp.titleSub}
                                  style={{
                                    height: "42px",
                                    lineHeight: "42px",
                                    margin: 0,
                                    padding: "0",
                                    borderBottom: "1px solid #ddd",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {t(label)}:
                                </p>
                              ))}
                            </div>

                            {/* Right Scrollable Medicine Columns */}
                            {data?.ePrescription?.medicines?.map(
                              (medicine: any, i: number) => (
                                <div
                                  key={i}
                                  style={{
                                    minWidth: "160px",
                                    marginRight: "16px",
                                    padding: "12px 16px",
                                    backgroundColor: "#fff",
                                  }}
                                >
                                  <p
                                    className={stylesApp.Value}
                                    style={{
                                      height: "42px",
                                      lineHeight: "42px",
                                      margin: 0,
                                      padding: "0",
                                      borderBottom: "1px solid #eee",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {medicine.medicineName}
                                  </p>
                                  <p
                                    className={stylesApp.Value}
                                    style={{
                                      height: "42px",
                                      lineHeight: "42px",
                                      margin: 0,
                                      padding: "0",
                                      borderBottom: "1px solid #eee",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {medicine.dosage}
                                  </p>
                                  <p
                                    className={stylesApp.Value}
                                    style={{
                                      height: "42px",
                                      lineHeight: "42px",
                                      margin: 0,
                                      padding: "0",
                                      borderBottom: "1px solid #eee",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {medicine.days} {t("days")}
                                  </p>
                                  <p
                                    className={stylesApp.Value}
                                    style={{
                                      height: "42px",
                                      lineHeight: "42px",
                                      margin: 0,
                                      padding: "0",
                                      borderBottom: "1px solid #eee",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {medicine.quantity}
                                  </p>
                                  <p
                                    className={stylesApp.Value}
                                    style={{
                                      height: "42px",
                                      lineHeight: "42px",
                                      margin: 0,
                                      padding: "0",
                                      borderBottom: "1px solid #eee",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {medicine?.medicineId?.pricePerTab}
                                  </p>
                                  <p
                                    className={stylesApp.Value}
                                    style={{
                                      height: "42px",
                                      lineHeight: "42px",
                                      margin: 0,
                                      padding: "0",
                                      borderBottom: "1px solid #eee",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {medicine.price}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    <div className={styles.buttonsBth}>
                      <button onClick={handleCancel}>{t("cancel")}</button>
                      <button onClick={handleOk}>{t("ok")}</button>
                    </div>
                  </div>
                )}
              </div>
              <p className={classNames(styles.texting, styles.mt16)}>
                <span style={{ fontWeight: "600", color: "#131313" }}>
                  {t("test")}:{" "}
                </span>

                {data?.ePrescription?.test?.map((test: any) => (
                  <span>{test?.testName}</span>
                ))}
              </p>
              <div className={styles.container}>
                <div
                  className={styles.dropDown}
                  onClick={() => setIsOpentest((prev) => !prev)}
                >
                  <p>Yes, i like to get your test done at meditour.</p>
                  <FaChevronDown size={16} color="#7d7d7d" />
                </div>
                {isOpentest && (
                  <div className={styles.menu22}>
                    <div
                      style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}
                    >
                      {filterlab?.map((lab: any, index: any) => (
                        <div
                          key={index}
                          className={classNames(styles.labbCard, {
                            [styles.selected]: selectedCards === lab,
                          })}
                          onClick={() => handleCardClick(lab)}
                        >
                          <div
                            className={
                              ["ur", "ar", "ps", "pr"].includes(i18n.language)
                                ? styles.imgContainerrlg
                                : styles.imgContainerr
                            }
                          >
                            <img src={lab.logo} />
                          </div>
                          <div style={{ padding: "16px" }}>
                            {" "}
                            <p className={styles.labtitle}> {lab?.name}</p>
                            <p className={styles.labcost}>
                              <span> Cost: </span>
                              <span style={{ color: "#0E54A3" }}>
                                {lab?.tests?.[0]?.userAmount}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {selectedOption === "Yes" && (
                <>
                  <div>
                    <p
                      className={classNames(
                        commonstyles.fs16,
                        commonstyles.semiBold
                      )}
                    >
                      {t("selectYourPreference")}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "40px",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <div>
                        <Radio
                          sx={{
                            color: "#0D47A1",
                            "&.Mui-checked": { color: "#0D47A1" },
                          }}
                          value="visit"
                          checked={selectedPreference === "visit"}
                          onChange={handlePreferenceChange}
                        />
                        {t("visitLab")}
                      </div>
                      <div>
                        <Radio
                          sx={{
                            color: "#0D47A1",
                            "&.Mui-checked": { color: "#0D47A1" },
                          }}
                          value="homeSample"
                          checked={selectedPreference === "homeSample"}
                          onChange={handlePreferenceChange}
                        />
                        {t("homeSampling")}
                      </div>
                    </div>
                  </div>
                  <button
                    className={styles.checkoutButton}
                    onClick={handleCheckOut}
                  >
                    {t("checkout")}
                  </button>
                </>
              )}
            </div>
            <div className={styles.w50}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <button className={styles.downloadButtonPrescription}>
                  {t("downloadPrescription")}
                </button>
              </div>
              <div className={styles.downloadOuter}>
                <div className={styles.flexxRow}>
                  <p className={styles.downloadtite}>{t("labReports")}</p>
                </div>
                {labResults.map((test: any, index: any) => (
                  <div
                    key={index}
                    className={styles.flexxRow}
                    style={{ marginTop: "8px", marginBottom: "8px" }}
                  >
                    <div className={styles.labtitlehead}>
                      <PiClipboardTextThin size={20} color="#7d7d7d" />
                      <div>
                        <p>
                          {dayjs(test?.createdAt).format("MM-DD-YYYY, h:mm a")}
                        </p>
                        <p className={styles.testitle}>
                          {test?.vendorId?.name}
                        </p>
                      </div>
                    </div>
                    <button
                      className={styles.labtestbtn}
                      onClick={() => handleDownload(test?.results)}
                    >
                      {t("download")}
                    </button>
                  </div>
                ))}
              </div>

              <div className={styles.sectionPrescription}>
                <p className={styles.testResulthead}>{t("testResultFile")}</p>
                <p className={styles.pleaseUploadHere}>
                  {t("pleaseUploadHere")}
                </p>
                <div className={styles.fileUploadContainer}>
                  {!selectedFile && (
                    <label htmlFor="fileInput" className={styles.uploadArea}>
                      <div>
                        <img
                          src={Picker}
                          alt="picker"
                          className={styles.Picker}
                        />
                      </div>{" "}
                      <div>
                        <input
                          type="file"
                          id="fileInput"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                        <div className={styles.uploadIcon}></div>
                        {t("upload")}
                        <p style={{ margin: "4px 0" }}>{t("selectZip_")}</p>
                        {/* <p>File Size 10 MB</p> */}
                      </div>
                    </label>
                  )}
                  {selectedFile && (
                    <div className={styles.fileDetails}>
                      <span>{selectedFile.name} - 92 kb - Complete</span>
                      <button
                        onClick={handleDeleteFile}
                        className={styles.removeFileButton}
                      >
                        &times;
                      </button>
                    </div>
                  )}
                  {selectedFile && (
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <button
                        onClick={Submit_File}
                        className={styles.submitButton}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {loading && <CustomLoader />}
          <div style={{ marginTop: "40px" }}></div>
        </div>
      </div>
      <Footerr />
    </>
  );
});

export default MyAppointmentPrescription;

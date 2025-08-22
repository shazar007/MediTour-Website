import React, { useState } from "react";
import styles from "./FlightForm.module.css";
import LogoComponent from "../LogoComponent";
import toast from "react-hot-toast";
import edit from "assets/images/edit2.png";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import DeleteModal from "../DeleteModal";
import dayjs from "dayjs";
import CustomTimePicker from "../TimePicker/TimePICKER2";
import commonstyle from "shared/utils/common.module.css";
import DatepickerNew from "../DatePicker/DatePickerNew";
import { MdDeleteOutline } from "react-icons/md";

const FlightForm = ({
  flightType,
  formik,
  returnEditMode,
  handleSubmit,
  setLoading,
  flights,
  setCurrentIndex,
  flightsReturn,
  handleEditFlight,
  formVisible,
  handleDeleteFlight,
  addForm,
  setModalVisible,
  modalVisible,
  showText,
  loading,
}: {
  flightType?: any;
  formik?: any;
  returnEditMode?: any;
  handleSubmit?: any;
  setLoading?: any;
  loading?: any;
  flights?: any;
  setCurrentIndex?: any;
  handleEditFlight?: any;
  formVisible?: any;
  handleDeleteFlight?: any;
  addForm?: any;
  setModalVisible?: any;
  modalVisible?: any;
  showText?: any;
  flightsReturn?: any;
}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [fileName, setFileName] = useState<string>("");
  const toggleExpanded = (index: any) => {
    setExpandedIndex((prevIndex: any) => (prevIndex === index ? null : index));
  };

  const handleAmenityChange = (amenity: any, checked: boolean) => {
    if (checked) {
      formik.setFieldValue("amenities", [...formik.values.amenities, amenity]);
    } else {
      formik.setFieldValue(
        "amenities",
        formik.values.amenities.filter((item: any) => item !== amenity)
      );
    }
  };
  const combineDateTime = (
    date: string | null,
    time: string | null
  ): string | null => {
    if (!date || !time) return null;

    const formattedTime = dayjs(time, "HH:mm").format("HH:mm");

    return `${date}T${formattedTime}`;
  };

  const confirmDeleteFlight = (index: any) => {
    setCurrentIndex(index);
    if (flightsReturn?.length > 0) {
      toast.error(
        "Please delete the return flight before deleting the flight."
      );
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  };

  return (
    <>
      {formVisible && (
        <>
          <h2 className={styles.heading}>{flightType} Flight</h2>
          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Company Name:</label>
              <input
                type="text"
                value={formik?.values?.companyName}
                onChange={(e) =>
                  formik.setFieldValue("companyName", e.target.value)
                }
                // onBlur={formik.handleBlur}

                placeholder="Enter Company Name *"
              />
              {formik.touched.companyName && formik.errors.companyName && (
                <p className={commonstyle.error}>{formik.errors.companyName}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Company logo:</label>
              <div style={{ width: "89%" }}>
                <LogoComponent
                  setLoading={setLoading}
                  fileName={fileName}
                  setFileName={setFileName}
                  url={formik?.values?.companyLogo}
                  setUrl={(value: any) =>
                    formik.setFieldValue("companyLogo", value)
                  }
                />
              </div>

              {formik.touched.companyLogo && formik.errors.companyLogo && (
                <p className={commonstyle.error}>{formik.errors.companyLogo}</p>
              )}
            </div>
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>From:</label>
              <input
                type="text"
                name="from"
                value={formik.values.from}
                onChange={formik.handleChange("from")}
                // onBlur={formik.handleBlur}
                className={styles.input}
                placeholder="From *"
              />
              {formik.touched.from && formik.errors.from && (
                <p className={commonstyle.error}>{formik.errors.from}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>To:</label>
              <input
                type="text"
                value={formik?.values?.to}
                onChange={formik?.handleChange("to")}
                className={styles.input}
                placeholder="To *"
              />
              {formik.touched.to && formik.errors.to && (
                <p className={commonstyle.error}>{formik.errors.to}</p>
              )}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Departure Date:</label>
              <div style={{ width: "85%" }}>
                <DatepickerNew
                  value={
                    formik?.values?.departureDate
                      ? dayjs(formik?.values?.departureDate)
                      : null
                  }
                  onChange={(e: any) => {
                    formik.setFieldValue(
                      "departureDate",
                      e ? e.format("YYYY-MM-DD") : null
                    );
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: "27px",
                }}
              >
                {formik.touched.departureDate &&
                  formik.errors.departureDate && (
                    <p className={commonstyle.error}>
                      {formik.errors.departureDate}
                    </p>
                  )}
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Departure Time</label>
              <div style={{ width: "85%" }}>
                <CustomTimePicker
                  type={"box"}
                  value={
                    formik.values.departureTime
                      ? dayjs(formik.values.departureTime).format("HH:mm")
                      : ""
                  }
                  setData={(time: string) => {
                    formik.setFieldValue("departureTime", time);
                  }}
                />
                {formik.touched.departureTime &&
                  formik.errors.departureTime && (
                    <p className={commonstyle.error}>
                      {formik.errors.departureTime}
                    </p>
                  )}
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Arrival Date:</label>
              <div style={{ width: "85%" }}>
                <DatepickerNew
                  value={
                    formik?.values?.arrivalDate
                      ? dayjs(formik?.values?.arrivalDate)
                      : null
                  }
                  onChange={(e: any) => {
                    formik.setFieldValue(
                      "arrivalDate",
                      e ? e.format("YYYY-MM-DD") : null
                    );
                  }}
                />
              </div>

              <div
                style={{
                  marginTop: "27px",
                }}
              >
                {formik.touched.arrivalDate && formik.errors.arrivalDate && (
                  <p className={commonstyle.error}>
                    {formik.errors.arrivalDate}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Arrival Time:</label>
              <div style={{ width: "85%" }}>
                <CustomTimePicker
                  type={"box"}
                  value={
                    formik.values.arrivalTime
                      ? dayjs(formik.values.arrivalTime).format("HH:mm")
                      : ""
                  }
                  setData={(time: string) => {
                    formik.setFieldValue("arrivalTime", time);
                  }}
                />
                {formik.touched.arrivalTime && formik.errors.arrivalTime && (
                  <p className={commonstyle.error}>
                    {formik.errors.arrivalTime}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Flight No:</label>
              <input
                type="text"
                value={formik?.values?.flightNo}
                onChange={(e) =>
                  formik.setFieldValue("flightNo", e.target.value)
                }
                className={styles.input}
                placeholder="Enter Flight Number"
              />
              {formik.touched.flightNo && formik.errors.flightNo && (
                <p className={commonstyle.error}>{formik.errors.flightNo}</p>
              )}
            </div>
          </div>
          <h3 className={styles.amenitiesHeading}>Flight Amenities</h3>
          <div className={styles.amenitiesContainer}>
            <div className={styles.leftGroup}>
              {[
                "Reading Material",
                "Wi-Fi",
                "In-Flight Entertainment",
                "Beverage",
                "Comfort Items",
                "Basic Toiletries",
                "Light Meal",
              ].map((amenity, index) => (
                <div className={styles.radioGroup} key={index}>
                  <input
                    type="checkbox"
                    id={amenity}
                    name="flightAmenities"
                    checked={formik.values.amenities.includes(amenity)}
                    className={styles.radioInput}
                    value={formik.values.amenities.includes(amenity)}
                    onChange={(e) =>
                      handleAmenityChange(amenity, e.target.checked)
                    }
                  />

                  <label
                    htmlFor={amenity}
                    className={
                      formik.values.amenities.includes(amenity)
                        ? styles.orangeLabel
                        : styles.blueLabel
                    }
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
            <div>
              {formik.touched.amenities && formik.errors.amenities && (
                <p className={commonstyle.error}>{formik.errors.amenities}</p>
              )}
            </div>
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>No of Bags:</label>
              <input
                type="number"
                value={formik?.values?.noOfHandbag}
                onChange={(e) =>
                  formik.setFieldValue("noOfHandbag", e.target.value)
                }
                className={styles.input}
                placeholder="Number of Bags *"
              />
              {formik.touched.noOfHandbag && formik.errors.noOfHandbag && (
                <p className={commonstyle.error}>{formik.errors.noOfHandbag}</p>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Baggage Weight:</label>
              <input
                type="text"
                value={formik?.values?.baggageWeight}
                onChange={(e) =>
                  formik.setFieldValue("baggageWeight", e.target.value)
                }
                className={styles.input}
                placeholder="Baggage Weight (kg) *"
              />
              {formik.touched.baggageWeight && formik.errors.baggageWeight && (
                <p className={commonstyle.error}>
                  {formik.errors.baggageWeight}
                </p>
              )}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.saveButton} onClick={handleSubmit}>
              {formik.editIndex !== null ? "Save" : "Update"}
            </button>
          </div>
        </>
      )}
      {!formVisible && !returnEditMode && (
        <>
          <div>
            {showText && (
              <p
                style={{
                  fontSize: "18px",
                  fontFamily: "bold",
                  color: "#0D47A1",
                  marginTop: "16px",
                  fontWeight: "bold",
                }}
              >
                Return Flight
              </p>
            )}
            <p
              style={{
                fontSize: "16px",
                fontFamily: "SFmedium",
                color: "#0D47A1",
                paddingBottom: "8px",
                fontWeight: "bold",
              }}
            >
              {flightType}
            </p>
          </div>
          {flights.map((flight: any, index: any) => (
            <div className={styles.flightSummary}>
              <div className={styles.header}>
                <h2 className={styles.flightHeading}>
                  {`Flight ${index + 1}`}
                </h2>
                <div
                  style={{ display: "flex", gap: "50px", alignItems: "center" }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={edit}
                      className={styles.editButton}
                      alt="Upload"
                      onClick={() => handleEditFlight(index)}
                    />
                    <MdDeleteOutline
                      color="#ff7631"
                      className={styles.deleteIcon}
                      onClick={() => confirmDeleteFlight(index)}
                    />
                  </div>
                  <button
                    onClick={() => toggleExpanded(index)}
                    className={styles.detailsButton}
                  >
                    {expandedIndex === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                </div>
              </div>

              {expandedIndex === index && (
                <div className={styles.detailsContainer}>
                  <>
                    <div className={styles.detailItem}>
                      <span className={styles.detailHeading}>
                        Company Name:
                      </span>
                      <span className={styles.detailData}>
                        {flight?.companyName}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailHeading}>
                        Company logo:
                      </span>
                      <span className={styles.detailData}>{fileName}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailHeading}>Flight No:</span>
                      <span className={styles.detailData}>
                        {flight?.flightNo}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailHeading}>From:</span>
                      <span className={styles.detailData}>{flight?.from}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailHeading}>To:</span>
                      <span className={styles.detailData}> {flight?.to}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailHeading}>
                        Departure Date:
                      </span>
                      <span className={styles.detailData}>
                        {flight?.departureDate}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailHeading}>
                        Departure Time:
                      </span>
                      <span className={styles.detailData}>
                        {dayjs(flight?.departureTime).format("hh:mm A")}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailHeading}>
                        Arrival Date:
                      </span>
                      <span className={styles.detailData}>
                        {flight?.arrivalDate}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailHeading}>
                        Arrival Time:
                      </span>
                      <span className={styles.detailData}>
                        {dayjs(flight?.arrivalTime).format("hh:mm A")}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailHeading}>
                        No of HandBag:
                      </span>
                      <span className={styles.detailData}>
                        {flight?.noOfHandbag}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailHeading}>
                        Baggage Weight:
                      </span>
                      <span className={styles.detailData}>
                        {flight?.baggageWeight}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailHeading}>
                        Selected Amenities:
                      </span>
                      <span className={styles.detailData}>
                        {flight?.amenities.join(", ")}
                      </span>
                    </div>
                  </>
                </div>
              )}
              <DeleteModal
                modalVisible={modalVisible}
                handleCancel={() => setModalVisible(false)}
                handleDelete={handleDeleteFlight}
                loading={loading}
              />
            </div>
          ))}
        </>
      )}
      {flights.length > 0 && !formVisible && flightType === "Stay" && (
        <div className={styles.addb}>
          <button className={styles.addButton} onClick={addForm}>
            Add More
          </button>
        </div>
      )}
    </>
  );
};

export default FlightForm;

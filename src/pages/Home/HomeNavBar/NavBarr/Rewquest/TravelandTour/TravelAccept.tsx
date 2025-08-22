import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import style from "./Accept.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import { CustomInput } from "shared/components";
import { useLocation, useNavigate } from "react-router-dom";
import ContinueButton from "shared/components/ContinueButton";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import upload from "assets/images/upload.png";
import VisaCard from "shared/components/FilePickeInsurance/VisaCard";
import logicFlight from "assets/images/empty2.png";
import DetailsTraveler from "./DetailsTraveler";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import NavBreadCrumbs from "shared/components/NavBreadCrumbs";
import { Request } from "shared/utils/mainHeaderQuery";

const TravelAccept = () => {
  const { state } = useLocation();
  const item = state?.item;
  const [travelers, setTravelers] = useState<any>([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");
  const [erroradd, setErroradd] = useState("");
  const totalTravelers = state?.totalTravelers;
  const formik: any = useFormik({
    initialValues: {
      name: "",
      passportNo: "",
      visaFile: null,
      passportFile: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      passportNo: Yup.string().required("Passport No. is required"),
      visaFile: Yup.object().nullable().required("Visa upload is required"),
      passportFile: Yup.object()
        .nullable()
        .required("Passport upload is required"),
    }),
    onSubmit: (values) => {
      if (editIndex !== null) {
        const updatedTravelers: any = travelers.map(
          (traveler: any, index: any) =>
            index === editIndex ? values : traveler
        );
        setTravelers(updatedTravelers);
        setEditIndex(null);
      } else {
        setTravelers([...travelers, values]);
      }
      setShowForm(false);
      formik.resetForm();
    },
  });
  const toggleExpanded = (index: any) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleEditTraveler = (index: any) => {
    const traveler = travelers[index];

    formik.setValues({
      name: traveler.name,
      passportNo: traveler.passportNo,
      passportFile: traveler.passportFile || null,
      visaFile: traveler.visaFile || null,
    });
    setShowForm(true);
    setEditIndex(index);
  };
  const navigate = useNavigate();
  const handlecnicUrl = (file: any) => {
    if (file) {
      formik.setFieldValue("visaFile", { uri: file });
    }
  };
  const handleAddTraveler = () => {
    if (travelers.length < totalTravelers) {
      setShowForm(true);
      setErroradd("");
    } else {
      setErroradd(`You cannot add more travelers than specified.`);
    }
  };
  const handlePassport = (file: any) => {
    if (file) {
      formik.setFieldValue("passportFile", { uri: file });
    }
  };
  const handleDeleteTraveler = (index: any) => {
    const updatedTravelers = travelers.filter((_: any, i: any) => i !== index);
    setTravelers(updatedTravelers);
  };

  const handleContinue = () => {
    if (travelers.length === totalTravelers) {
      navigate("/services/MyRequest/Travelinfo", {
        state: {
          travelers,
          totalTravelers,
          item,
        },
      });
      setError("");
    } else {
      setError(`Please add ${totalTravelers - travelers.length} more traveler`);
    }
  };

  return (
    <div>
      <NavBreadCrumbs {...Request} />

      {showForm && (
        <div
          className={classNames(
            commonstyle.container,
            commonstyle.col7,
            commonstyle.mt32,
            commonstyle.mb32,
            style.maincontainer
          )}
        >
          <div
            className={classNames(
              commonstyle.flx,
              commonstyle.flxBetween,
              commonstyle.flxWrap
            )}
          >
            <div
              className={classNames(
                commonstyle.colsm12,
                commonstyle.col5,
                commonstyle.colmd12
              )}
            >
              <CustomInput
                placeholder="Name"
                name="name"
                type="text"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={(value: any) =>
                  formik.setFieldValue("name", value.target.value)
                }
              />
              {formik.touched.name && formik.errors.name ? (
                <div className={commonstyle.error}>{formik.errors.name}</div>
              ) : null}
            </div>
            <div
              className={classNames(
                commonstyle.colsm12,
                commonstyle.col5,
                commonstyle.colmd12
              )}
            >
              <CustomInput
                placeholder="Passport No."
                name="passportNo"
                value={formik.values.passportNo}
                onChange={(value: any) =>
                  formik.setFieldValue("passportNo", value.target.value)
                }
                onBlur={formik.handleBlur}
              />
              {formik.touched.passportNo && formik.errors.passportNo ? (
                <div className={commonstyle.error}>
                  {formik.errors.passportNo}
                </div>
              ) : null}
            </div>
          </div>
          <div
            className={classNames(
              commonstyle.flx,
              commonstyle.flxWrap,
              commonstyle.flxBetween
            )}
          >
            <div
              className={classNames(
                commonstyle.col5,
                commonstyle.colmd12,
                commonstyle.colsm12
              )}
            >
              <VisaCard
                setData={handlecnicUrl}
                img={formik.values.visaFile?.uri || upload}
                upLoadName={"Visa Upload"}
                formik={formik}
                fieldName="visaFile"
                dis={
                  "To continue, please upload an image of the passenger visas."
                }
              />
              {formik.touched.visaFile && formik.errors.visaFile ? (
                <div className={commonstyle.error}>
                  {formik.errors.visaFile}
                </div>
              ) : null}
            </div>
            <div
              className={classNames(
                commonstyle.col5,
                commonstyle.colmd12,
                commonstyle.colsm12
              )}
            >
              <VisaCard
                setData={handlePassport}
                img={formik.values.passportFile?.uri || upload}
                upLoadName={"Passport Upload"}
                dis={
                  "To continue, please upload an image of the passenger passport."
                }
                formik={formik}
                fieldName="passportFile"
              />
              {formik.touched.passportFile && formik.errors.passportFile ? (
                <div className={commonstyle.error}>
                  {formik.errors.passportFile}
                </div>
              ) : null}
            </div>
          </div>

          <ContinueButton
            buttonText="Save"
            backgroundColor="#006838"
            onClick={formik.handleSubmit}
          />
        </div>
      )}
      <div>
        {showForm && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              margin: "20px ",
            }}
          >
            <div
              className={classNames(
                commonstyle.flx,
                commonstyle.colorBlue,
                commonstyle.fs16,
                commonstyle.semiBold
              )}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: "0 5px",
                }}
              >
                PKR {state?.item?.ticketPrice}
              </p>
              <p>{state?.totalTravelers} Traveler</p>
            </div>
            {error && (
              <div
                style={{
                  color: "red",
                  marginTop: "10px",
                }}
              >
                {error}
              </div>
            )}
            <div
              style={{
                marginTop: "10px",
              }}
            >
              <ContinueButton buttonText="Continue" onClick={handleContinue} />
            </div>
          </div>
        )}
      </div>

      {!showForm && (
        <div className={classNames(commonstyle.container)}>
          <p
            className={classNames(
              commonstyle.colorBlue,
              commonstyle.fs32,
              commonstyle.semiBold
            )}
          >
            Traveler Identity{" "}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: "32px 0",
            }}
          >
            {!showForm &&
              travelers.length > 0 &&
              travelers.map((traveler: any, index: any) => {
                return (
                  <div
                    key={index}
                    className={classNames(
                      commonstyle.col7,
                      commonstyle.mt32,
                      commonstyle.mb32,
                      style.maincontainer
                    )}
                  >
                    <div
                      onClick={() => toggleExpanded(index)}
                      style={styles.header}
                    >
                      <span style={styles.text}>{`Person ${index + 1}`}</span>
                      <div style={styles.rowStyle}>
                        <div>
                          {expandedIndex === index ? (
                            <IoIosArrowDropup className={style.openicon} />
                          ) : (
                            <IoIosArrowDropdown className={style.openicon} />
                          )}
                        </div>
                        <div onClick={() => handleEditTraveler(index)}>
                          <FaRegEdit className={style.editicon} />
                        </div>
                        <div onClick={() => handleDeleteTraveler(index)}>
                          <MdOutlineDeleteOutline className={style.delicon} />
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        ...styles.content,
                        maxHeight: expandedIndex === index ? "899px" : "0",
                        overflow: "hidden",
                        transition: "max-height 0.3s ease",
                      }}
                    >
                      {expandedIndex === index && (
                        <div>
                          <DetailsTraveler traveler={traveler} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

            {travelers.length === 0 && (
              <div
                style={{ width: "100%", height: "150px", marginTop: "20px" }}
              >
                <img
                  src={logicFlight}
                  alt="Logic Flight"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
            {erroradd && (
              <div
                style={{
                  color: "red",
                  marginTop: "10px", // Adjust margin as needed
                }}
              >
                {erroradd}
              </div>
            )}
            <ContinueButton
              buttonText="Add Traveler"
              onClick={handleAddTraveler}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                margin: "20px ",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <div
                className={classNames(
                  commonstyle.flx,
                  commonstyle.colorBlue,
                  commonstyle.fs16,
                  commonstyle.semiBold
                )}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    margin: "0 5px",
                  }}
                >
                  PKR {state?.item?.ticketPrice}
                </p>
                <p>{state?.totalTravelers} Traveler</p>
              </div>
              {error && (
                <div
                  style={{
                    color: "red",
                    marginTop: "10px", // Adjust margin as needed
                  }}
                >
                  {error}
                </div>
              )}
              <div
                style={{
                  marginTop: "10px", // Add some margin between the two sections
                }}
              >
                <ContinueButton
                  buttonText="Continue"
                  onClick={handleContinue}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <Footerr />
    </div>
  );
};
const styles = {
  container: {
    borderRadius: "8px",
    overflow: "hidden",
    elevation: 5,
    backgroundColor: "#fff",
    margin: "8px 24px",
  },
  header: {
    padding: "3px",
    backgroundColor: "#fff",
    borderColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowStyle: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  content: {
    maxHeight: "0", // Initially collapsed
    overflow: "hidden",
  },
  text: {
    fontSize: "14px",
    color: "#0E54A3",
  },
};

export default TravelAccept;

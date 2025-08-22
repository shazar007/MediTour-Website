import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import style from "./DetailStyle.module.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useDirection } from "shared/utils/DirectionContext";
import commonstyle from "shared/utils/common.module.css";
import { InputField } from "shared/components";
import ImagePickerNew from "shared/components/FilePickeInsurance/ImagePickerNew";
import { useDispatch, useSelector } from "react-redux";
import { setObj } from "shared/redux";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  totalTravelers: any;
  handleAccept: (boolean: any) => void;
  fileName: any;
  type: any;
  setOpen: any;
  id: String;
  ticketPrice: any;
}

const DetailForm = ({ totalTravelers, id, ticketPrice }: Props) => {
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [allTravelers, setAllTravelers] = useState<any[]>([]);
  const { user, userAge } = useSelector((state: any) => state.root.common);
  const navigate = useNavigate();
  console.log("🚀 ~ DetailForm ~ allTravelers:", allTravelers);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("nameIsRequired")),
    passportNo: Yup.string().required(`${t("passportNo")} ${t("required")}`),
    visaFile: Yup.string().required(t("visaImageIsRequired")),
    passportFile: Yup.string().required(t("passportImageIsRequired")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      passportNo: "",
      visaFile: "",
      passportFile: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (editIndex !== null) {
        const updatedTravelers = [...allTravelers];
        updatedTravelers[editIndex] = values;
        setAllTravelers(updatedTravelers);

        setEditIndex(null);
      } else {
        const updatedTravelers = [...allTravelers, values];
        setAllTravelers(updatedTravelers);
        console.log("All Travelers ----------------:", updatedTravelers);
        if (currentIndex + 1 < totalTravelers) {
          setCurrentIndex(currentIndex + 1);
        }
      }

      // Reset form
      resetForm({
        values: {
          name: "",
          passportNo: "",
          visaFile: "",
          passportFile: "",
        },
      });
    },
  });

  const handleUpload = (url: string, field: "visaFile" | "passportFile") => {
    formik.setFieldValue(field, url);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    formik.setValues(allTravelers[index]);
  };

  const handleContinue = async () => {
    console.log("chala.........");
    if (allTravelers.length < totalTravelers) {
      alert("Please fill all traveler forms");
      return;
    } else {
      let data = {
        bidRequestId: id,
      };
      let params = {
        name: user?.name,
        email: user?.email,
        address: user?.address?.address,
        travellers: allTravelers,
        age: userAge,
        phone: user?.phone,
        totalAmount: ticketPrice,
      };
      console.log(
        "🚀 ~ handleContinue ~ params:",
        params,
        "......data....",
        data
      );

      await dispatch(
        setObj({
          data: data,
          params: params,
        })
      );
      //    setOpen(true)
      navigate("/services/paymentDetail", {
        state: {
          serviceName: "flights",
          actualAmount: ticketPrice,
          travelers: allTravelers,
        },
      });
    }
  };

  return (
    <>
      <div>
        {allTravelers.map((traveler, index) => (
          <Accordion
            key={`summary-${index}`}
            defaultExpanded={index === 0}
            className={style.summaryContent}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography className={style.heading}>
                  {t("travelerInformation")}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography
                    className={style.Edittext}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent accordion toggle
                      handleEdit(index);
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    {t("edit")}
                  </Typography>
                  <Typography>
                    {index + 1}/{totalTravelers}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Box>
                <div className={style.headerRow}>
                  <p>
                    <strong>{t("name")}:</strong> {traveler.name}
                  </p>
                  <p>
                    <strong>{t("passport_Nationality")}:</strong>{" "}
                    {traveler.passportNo}
                  </p>
                </div>

                <div className={style.headerRow}>
                  <p>
                    <strong>{t("uploadPassport")}:</strong>{" "}
                    {traveler.passportFile ? "Uploaded" : "Missing"}
                  </p>
                  <p>
                    <strong>{t("uploadVisaFile")}:</strong>{" "}
                    {traveler.visaFile ? "Uploaded" : "Missing"}
                  </p>
                </div>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      {/* Render current form (if not all travelers submitted) */}
      {(allTravelers.length < totalTravelers || editIndex !== null) && (
        <form className={style.TravelCard} onSubmit={formik.handleSubmit}>
          <div className={style.headerRow}>
            <p className={style.heading}>{t("travelerInformation")}</p>
            <div>
              <p>
                {editIndex !== null ? editIndex + 1 : currentIndex + 1}/
                {totalTravelers}
              </p>
            </div>
          </div>

          <div className={classNames(commonstyle.mt24, commonstyle.mb24)}>
            <p className={style.heading}>
              {t("passengerDetails")}
              <span>
                {editIndex !== null ? editIndex + 1 : currentIndex + 1}
              </span>
            </p>
          </div>

          <div className={style.inputfieldz}>
            <PassengerDetails
              t={t}
              formik={formik}
              handleUpload={handleUpload}
              currentIndex={editIndex !== null ? editIndex : currentIndex}
            />
          </div>

          <div className={style.footerRow}>
            <button type="submit" className={style.secoundbtn}>
              {t("save")}
            </button>
          </div>
        </form>
      )}

      {/* Continue button (only when all forms are submitted) */}
      {allTravelers.length === totalTravelers && editIndex === null && (
        <div
          style={{
            marginTop: "50px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <button
            className={classNames(style.secoundbtn)}
            onClick={handleContinue}
          >
            {t("continue")}
          </button>
        </div>
      )}
    </>
  );
};

export default DetailForm;

interface PassengerProps {
  t?: any;
  formik: any;
  handleUpload: (url: string, field: "visaFile" | "passportFile") => void;
  currentIndex: number;
}

const PassengerDetails = React.memo(
  ({ t, formik, handleUpload, currentIndex }: PassengerProps) => {
    return (
      <div key={`passenger-${currentIndex}`} style={{ width: "100%" }}>
        <div className={style.inputfieldz}>
          <div className={style.inputfield1}>
            <InputField
              id="enterYourName"
              name="name"
              placeholder={t("enterYourName")}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              height="56px"
              borderRadius="16px"
              border="0.5px solid #E4E4E4"
              backgroundColor="#F9F9F9"
            />
            {formik.touched.name && formik.errors.name && (
              <p className={commonstyle.error}>{formik.errors.name}</p>
            )}
          </div>

          <div className={style.inputfield1}>
            <InputField
              id="passport_Nationality"
              name="passportNo"
              placeholder={t("passport_Nationality")}
              value={formik.values.passportNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              height="56px"
              borderRadius="16px"
              border="0.5px solid #E4E4E4"
              backgroundColor="#F9F9F9"
            />
            {formik.touched.passportNo && formik.errors.passportNo && (
              <p className={commonstyle.error}>{formik.errors.passportNo}</p>
            )}
          </div>
        </div>

        <div className={style.inputfieldz}>
          <div className={classNames(style.inputfield1)}>
            <div className={style.imagepickerconatiner}>
              <ImagePickerNew
                key={`passportFile-${currentIndex}`}
                setData={(url: string) => handleUpload(url, "passportFile")}
                placeholder={t("uploadPassport")}
                initialImage={formik.values.passportFile}
              />
            </div>
            {formik.errors.passportFile && (
              <p className={commonstyle.error}>{formik.errors.passportFile}</p>
            )}
          </div>
          <div className={classNames(style.inputfield1)}>
            <div className={style.imagepickerconatiner}>
              <ImagePickerNew
                key={`visaFile-${currentIndex}`}
                setData={(url: string) => handleUpload(url, "visaFile")}
                placeholder={t("uploadVisaFile")}
                initialImage={formik.values.visaFile}
              />
            </div>
            {formik.errors.visaFile && (
              <p className={commonstyle.error}>{formik.errors.visaFile}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

import React, { useRef, useEffect, useState } from "react";
import { Modal } from "@mui/material";
import style from "./style.module.css";
import logo from "assets/images/HospitalDashboard/invoiceLogo.png";
import downloadicon from "assets/images/HospitalDashboard/downloadicon.png";
import classNames from "classnames";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

interface Props {
  showInvoice: any;
  setShowInvoice: any;
  item?: any;
}
const HospitalInvoice: React.FC<Props> = ({
  showInvoice,
  setShowInvoice,
  item,
}) => {
  const { t, i18n }: any = useTranslation();
  const modalContentRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: any) => state.root?.common);
  const data = item?.[0];
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        setShowInvoice(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowInvoice]);

  const handleDownloadPDF = () => {
    let check = i18n.language == "tr" ? 55 : 35;
    console.log("🚀 ~ handleDownloadPDF ~ check:", check);
    const pdf = new jsPDF("p", "mm", "a4");
    const margin = 10;
    const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    let yPos = margin;
    const logoImg = new Image();
    logoImg.src = logo;
    const logoWidth = 20;
    const logoHeight = 20;
    const leftMargin = 20;
    const rightMargin = pageWidth / 2 + 20;
    const lineSpacing = 10;
    pdf.addImage(
      logoImg,
      "PNG",
      pageWidth - logoWidth - margin,
      yPos,
      logoWidth,
      logoHeight
    );
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(user?.name, margin, yPos + logoHeight / 2);
    yPos += 20; // Reduced from 35 to 20
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold"); // Set font to bold
    pdf.text(`${t("address")}:`, margin, yPos);
    pdf.setFont("helvetica", "normal"); // Set font back to normal
    pdf.text(user?.location?.address, margin + 30, yPos);
    yPos += 7;
    pdf.setFont("helvetica", "bold");
    pdf.text(`${t("phone")}:`, margin, yPos);
    pdf.setFont("helvetica", "normal");
    pdf.text(user?.phoneNumber, margin + 30, yPos);
    yPos += 7;
    pdf.setFont("helvetica", "bold");
    pdf.text(`${t("email")}:`, margin, yPos);
    pdf.setFont("helvetica", "normal");
    pdf.text(user?.email, margin + 30, yPos);
    yPos += 7;
    pdf.setDrawColor(200);
    pdf.line(margin, yPos, pageWidth + margin, yPos);
    yPos += 10;
    pdf.setFontSize(12);
    pdf.text(`${t("appointmentId")}: ___________`, margin, yPos);
    pdf.setFont("helvetica", "normal");
    pdf.text(data?.appointmentId, margin + check, yPos);

    pdf.text(`${t("invoice")}#: ___________`, pageWidth - 50, yPos);
    pdf.setFont("helvetica", "normal");
    pdf.text(data?.invoiceId?.invoiceNumber, pageWidth - 30, yPos);
    yPos += 10;
    pdf
      .setFont("helvetica", "bold")
      .setFontSize(12)
      .text(t("patientDetails"), margin, yPos)
      .setFont("helvetica", "normal");
    yPos += 10;
    pdf.text(`${t("name")}:`, margin, yPos);
    pdf.text("___________", leftMargin + 40, yPos);
    pdf.text(`${t("phoneNumber")}:`, rightMargin, yPos);
    pdf.text("___________", rightMargin + 50, yPos);
    yPos += lineSpacing;
    pdf.text(`${t("age")}:`, margin, yPos);
    pdf.text("___________", leftMargin + 40, yPos);
    pdf.text(`${t("address")}:`, rightMargin, yPos);
    pdf.text("___________", rightMargin + 50, yPos);
    yPos += lineSpacing;
    pdf.text(`${t("gender")}:`, margin, yPos);
    pdf.text("___________", leftMargin + 40, yPos);
    pdf.text(`${t("email")}:`, rightMargin, yPos);
    pdf.text("___________", rightMargin + 50, yPos);
    yPos += lineSpacing;
    pdf
      .setFont("helvetica", "bold")
      .setFontSize(12)
      .text(t("otherDetails"), margin, yPos)
      .setFont("helvetica", "normal");
    yPos += 10;
    pdf.text(`${t("doctor")}:`, margin, yPos);
    pdf.text("___________", leftMargin + 40, yPos);
    pdf.text(`${t("admissionDate")}:`, rightMargin, yPos);
    pdf.text("___________", rightMargin + 50, yPos);
    yPos += lineSpacing;
    pdf.text(`${t("disease")}:`, margin, yPos);
    pdf.text("___________", leftMargin + 40, yPos);
    pdf.text(`${t("dischargeDate")}:`, rightMargin, yPos);
    pdf.text("___________", rightMargin + 50, yPos);
    yPos += lineSpacing;
    pdf.text(`${t("treatment")}:`, rightMargin, yPos);
    pdf.text("___________", rightMargin + 50, yPos);
    yPos += 10;
    pdf.setFontSize(12);
    pdf.text(t("service_MedicalTreatment"), margin, yPos);
    pdf.text(t("rate"), margin + 70, yPos);
    pdf.text(t("quantity"), margin + 120, yPos);
    pdf.text(t("total"), margin + 160, yPos);
    yPos += 10;

    const tableData = [
      { service: "Admission Fee", rate: "1000", quantity: "1", total: "1000" },
      { service: "Security Fee", rate: "150", quantity: "1", total: "150" },
      { service: "ICU Charges", rate: "2000", quantity: "3", total: "6000" },
      { service: "Room", rate: "800", quantity: "5", total: "4000" },
      { service: "Test", rate: "500", quantity: "2", total: "1000" },
      { service: "Food", rate: "200", quantity: "3", total: "600" },
      { service: "Services", rate: "300", quantity: "4", total: "1200" },
      { service: "Pharmacy", rate: "50", quantity: "10", total: "500" },
      { service: "Parking Parking", rate: "100", quantity: "2", total: "200" },
    ];

    tableData.map((row) => {
      pdf.text(row.service, margin, yPos);
      pdf.text(row.rate, margin + 70, yPos);
      pdf.text(row.quantity, margin + 120, yPos);
      pdf.text(row.total, margin + 160, yPos);
      yPos += 7; // Increment y-position for the next row
    });

    yPos += 10; // Additional space after the table

    // Summary section
    const summaryData = [
      { label: "subTotal", value: "22000/-" },
      { label: "medClaim", value: "2000/-" },
      { label: "advance", value: "500/-" },
      { label: "total", value: "17000/-" },
    ];
    summaryData.forEach((summary) => {
      pdf.text(t(summary.label), margin + 100, yPos);
      pdf.text(summary.value.toString(), margin + 160, yPos);
      yPos += 7;
    });
    yPos += 5;

    // Signatures section
    pdf.setFontSize(12);
    pdf.text(`${t("managerSignature")} ___________`, margin, yPos);
    pdf.text(`${t("patientSignature")} ___________`, pageWidth - 50, yPos);

    yPos += 12;

    // Terms and conditions
    pdf.setFontSize(10);

    // Draw "Terms" in bold
    pdf.setFont("helvetica", "bold").text("Terms", margin, yPos);

    // Get the width of "Terms " (including space) for proper alignment
    pdf.setFont("helvetica", "bold");
    const termsWidth = pdf.getTextWidth(`${t("terms")} `);

    // Draw the remaining text in normal font with text wrapping
    pdf
      .setFont("helvetica", "normal")
      .text(`: ${t("termsContent")}`, margin + termsWidth, yPos, {
        maxWidth: pageWidth - termsWidth,
      });

    // Save the PDF
    pdf.save("invoice.pdf");
  };

  function calculateAge(dateOfBirthString: string) {
    if (!dateOfBirthString) return "Date of birth not provided";
    const [day, month, year] = dateOfBirthString.split("/").map(Number);
    const dateOfBirth = new Date(year, month - 1, day);
    const ageDate = new Date(Date.now() - dateOfBirth.getTime());
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  }
  const patientItems = [
    { title: "_name", label: data?.patientId?.name },
    { title: "phoneNumber", label: data?.patientId?.phone },
    { title: "age", label: calculateAge(data?.patientId?.dateOfBirth) },
    { title: "address", label: data?.patientId?.address?.address },
    { title: "gender", label: data?.patientId?.gender },
    { title: "email", label: data?.patientId?.email },
  ];
  const DetailstItems = [
    { title: "doctor", label: data?.doctorId?.name },
    { title: "admissionDate", label: data?.doctorId?.phone },
    { title: "disease", label: data?.history?.diseases?.join(" ") },
    { title: "dischargeDate", label: data?.doctorId?.address?.address },
    { title: "treatment", label: data?.doctorId?.gender },
  ];

  const summaryData: any[] = [
    { label: "subTotal", value: data?.invoiceId?.totalCosting },
    { label: "discount", value: data?.invoiceId?.discount },
    { label: "advance", value: data?.invoiceId?.advance },
    { label: "total", value: data?.invoiceId?.grandTotal },
  ];
  return (
    <Modal open={showInvoice} aria-describedby="modal-modal-description">
      <div className={style.modal}>
        <div className={style.modalContent} ref={modalContentRef}>
          <div className="dataContainer">
            <p className={style.modalHeading}>{t("invoice")}</p>
            <div className={style.invoiceheader}>
              <div>
                <p className={style.pageHeading}>{user?.name}</p>
                <div style={{ marginTop: "5px " }}>
                  <p>
                    <span className={style.sectionTitle}>{t("address")}:</span>
                    <span className={style.dataText}>
                      {user?.location?.address}
                    </span>
                  </p>

                  <p>
                    <span className={style.sectionTitle}>{t("phone")}:</span>
                    <span className={style.dataText}>{user?.phoneNumber}</span>
                  </p>

                  <p>
                    <span className={style.sectionTitle}>{t("email")}:</span>
                    <span className={style.dataText}>{user?.email}</span>
                  </p>
                </div>
              </div>
              <div className={style.logocontainer}>
                <img src={logo} alt="logocontainer" className={style.logo} />
              </div>
            </div>
            <div className={style.separator}></div>
            <div className={style.invoiceheader} style={{ margin: "24px 0px" }}>
              <div
                className={classNames(style.dataText)}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <p>{t("appointmentId")}:</p>
                &nbsp;<p className={style.dashline}>{data?.appointmentId}</p>
              </div>

              <div
                className={classNames(style.dataText)}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <p>{t("invoice")} #:</p>
                &nbsp;
                <p className={style.dashline}>
                  {data?.invoiceId?.invoiceNumber}
                </p>
              </div>
            </div>
            <div>
              <p className={style.pageHeading}>{t("patientDetails")}s</p>
              <PatientData t={t} items={patientItems} />
            </div>
            <div style={{ margin: "24px 0px" }}>
              <p className={style.pageHeading}>{t("otherDetails")}</p>
              <PatientData t={t} items={DetailstItems} />
            </div>
            <div className={style.separator}></div>
            <div>
              <DataTabel t={t} item={data?.invoiceId} />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "40%",
                }}
              >
                <div
                  className={classNames(style.dataText)}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    marginTop: "10px",
                  }}
                >
                  <p>{t("paymentMethod")}:</p>
                  &nbsp;<p className={style.dashline}></p>
                </div>

                <div
                  className={classNames(style.dataText)}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    width: "80%",
                    overflow: "hidden",
                    flexDirection: "column",
                  }}
                >
                  <p>{t("remarks")}:</p>
                  {/* &nbsp;<p className={style.Remarksdashline}></p> */}
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        width: "100%",
                        overflow: "hidden",
                      }}
                    >
                      &nbsp;<p className={style.Remarksdashline}></p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  width: "35%",
                  marginTop: "10px",
                }}
              >
                {summaryData.map((summary, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className={classNames(style.dataText)}>
                      {t(summary.label)}
                    </p>
                    <p className={classNames(style.dataText)}>
                      {summary.value} <span>/-</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={style.invoiceheader} style={{ margin: "24px 0px" }}>
              <div
                className={classNames(style.dataText)}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <p>{t("managerSignature")}:</p>
                &nbsp;<p className={style.dashline}></p>
              </div>

              <div
                className={classNames(style.dataText)}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <p>{t("patientSignature")}:</p>
                &nbsp;<p className={style.dashline}></p>
              </div>
            </div>
            <div className={style.separator}></div>
            <div className={style.invoiceheader} style={{ margin: "24px 0px" }}>
              <div
                className={classNames(style.dataText)}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <p>NTN #</p>
                &nbsp;<p className={style.dashline}>{user?.ntn}</p>
              </div>
            </div>
            <div
              className={classNames(style.dataText)}
              style={{
                whiteSpace: "wrap",
              }}
            >
              <strong>{t("terms")}:</strong>&nbsp;
              <span>{t("termsContent")}</span>
            </div>
          </div>
          <div className={style.downloadbtnconatiner}>
            <button
              className={style.downloadbutton}
              onClick={handleDownloadPDF}
            >
              <img
                src={downloadicon}
                alt="download icon"
                className={style.downlodimg}
              />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default HospitalInvoice;

const PatientData = ({ items, t }: { items: any; t: any }) => {
  return (
    <div className={style.Patientsection}>
      {items.map((item: any, index: any) => (
        <div className={style.patientItems} key={index}>
          <p className={style.dataText}>{`${t(item.title)}:`}</p>
          &nbsp;
          <p className={style.Patientdashline}>{item?.label}</p>
        </div>
      ))}
    </div>
  );
};

const DataTabel = ({ item, t }: { item?: any; t: any }) => {
  const [isSticky, setIsSticky] = useState(true);
  const theadData: any = [
    "service_MedicalTreatment",
    "rate",
    "quantity",
    "total",
  ];
  const tableData: any = [
    { service: "Admission Fee", rate: "1000", quantity: "1", total: "1000" },
    { service: "Security Fee", rate: "150", quantity: "1", total: "150" },
    { service: "ICU Charges", rate: "2000", quantity: "3", total: "6000" },
    { service: "Room", rate: "800", quantity: "5", total: "4000" },
    { service: "Test", rate: "500", quantity: "2", total: "1000" },
    { service: "Food", rate: "200", quantity: "3", total: "600" },
    { service: "Services", rate: "300", quantity: "4", total: "1200" },
    { service: "Pharmacy", rate: "50", quantity: "10", total: "500" },
    { service: "Parking", rate: "100", quantity: "2", total: "200" },
  ];
  const summaryData: any[] = [
    { label: "Sub Total", value: 22000 },
    { label: "Med. Claim", value: 2000 },
    { label: "Advance", value: 500 },
    { label: "Total", value: 17000 },
  ];

  return (
    <>
      <table className={style.datatable}>
        <thead
          className={`${style.datathaed} ${isSticky ? style.thsticky : ""}`}
        >
          <tr className={style.datatr}>
            {theadData.map((header: any, index: number) => (
              <th key={index} className={style.datath}>
                {t(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(item?.initialCosting || {}).map(
            ([key, value]: [string, any]) => (
              <>
                <tr className={style.datatr}>
                  <td className={style.datatd}>{key}</td>
                  <td className={style.datatd}>{value}</td>
                  <td className={style.datatd}>{1}</td>
                  <td className={style.datatd}>{value}</td>
                </tr>
              </>
            )
          )}
          {item?.extraCosting.map((row: any, index: number) => (
            <tr key={index} className={style.datatr}>
              <td className={style.datatd}>{row.item}</td>
              <td className={style.datatd}>{row.rate}</td>
              <td className={style.datatd}>{row.quantity}</td>
              <td className={style.datatd}>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

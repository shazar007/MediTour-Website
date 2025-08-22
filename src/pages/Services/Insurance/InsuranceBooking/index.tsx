import style from "./insurancebooking.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import commonStyles from "shared/utils/common.module.css";
import { useTranslation } from "react-i18next";
import From from "assets/images/Icon From (1).png";
import Trip from "assets/images/icon-park-outline_round-trip.png";
import Country from "assets/images/gis_search-country.png";
import Time from "assets/images/Icon Time Lg.png";
import { InputField } from "shared/components";
import ImgPicker from "shared/components/Img-picker";
import { useDispatch, useSelector } from "react-redux";
import { setObj } from "shared/redux";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";
export default function InsuranceBooking() {
  const { t, i18n }: any = useTranslation();

  const { state } = useLocation();
  const { user } = useSelector((state: any) => state.root.common);
  const travelDetails = state?.travelDetails;
  const type = state?.type;
  const validationSchema = Yup.object({
    userName: Yup.string().required("Name is required"),
    phone: Yup.string().required("Contact number is required"),
    address: Yup.string().required("Address is required"),
    cnic: Yup.string().required(t("cnicIsRequired")),
    cnicFile: Yup.string().required(t("pleaseUploadYourCNICImage")),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik: any = useFormik({
    initialValues: {
      userName: user?.name || "",
      phone: user?.phone || "",
      address: user?.address?.address || "",
      cnic: user?.cnicOrPassNo || "",
      cnicFile: "",
      gatewayName: "stripe",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("FORM SUBMIT:", values);

      try {
        if (!type || typeof type !== "string" || type.trim() === "") {
          notifyError("Invalid insurance kind");
          setSubmitting(false);
          return; // stop here if invalid
        }

        const requestData = {
          insuranceCompanyId: travelDetails?.insuranceId?._id,
          insuranceId: travelDetails?._id,
          userId: user._id,
          userName: user?.name,
          mrNo: user?.mrNo,
          phone: user?.phone,
          location: {
            lat: user?.address?.lat,
            lng: user?.address?.lng,
            address: values.address,
            city: user?.address?.city,
          },
          cnic: values?.cnic,
          insuranceKind: type,
          insuranceFor: type,
          cnicFile: values?.cnicFile || "l-",
          gatewayName: "stripe",
          paymentId: travelDetails?.paymentId || "INVC0044249",
          totalAmount: travelDetails?.actualPrice?.toString() || "0",
          isPaidFull: true,
          paidByUserAmount: travelDetails?.actualPrice?.toString() || "0",
          processingFee: travelDetails?.processingFee || 0,
        };

        await dispatch(setObj(requestData));

        navigate("/services/paymentDetail", {
          state: {
            serviceName: "insurance",
            actualAmount: travelDetails?.actualPrice,
          },
        });
      } catch (error) {
        console.error("Error:", error);
        notifyError("Failed to process insurance details.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div style={{ paddingTop: "60px", backgroundColor: "#F5F5F5" }}>
      <div className={style.outerWrapper}>
        <div className={style.insuranceCard}>
          <div
            className={
              ["ur", "ar", "ps", "pr"].includes(i18n.language)
                ? style.insuranceOuteriMglg
                : style.insuranceOuteriMg
            }
          >
            <img src={travelDetails?.packageLogo} alt="packageLogotravel" />
          </div>
          <div className={style.Cardbody}>
            <div className={style.content}>
              <div>
                <p className={style.title}>{travelDetails?.packageName}</p>
                <p className={style.Insurancetitle}>EFU Insurance</p>
                <div className={style.row}>
                  <img src={From} alt="formtravel" className={style.icon} />
                  <p className={style.rowheading}>{type}</p>
                </div>{" "}
                {travelDetails?.countrySelection && (
                  <div className={style.row}>
                    <img
                      src={Country}
                      alt="Countrytravel"
                      className={style.icon}
                    />
                    <p className={style.rowheading}>
                      {travelDetails.countrySelection}
                    </p>
                  </div>
                )}
                {travelDetails?.tripType && (
                  <div className={style.row}>
                    <img src={Trip} alt="Triptravel" className={style.icon} />
                    <p className={style.rowheading}>{travelDetails.tripType}</p>
                  </div>
                )}
                <div className={style.row}>
                  <img src={Time} alt="Timetravel" className={style.icon} />
                  <p className={style.rowheading}>
                    {travelDetails?.coveringUpto || travelDetails?.perYear}
                  </p>
                </div>
              </div>{" "}
            </div>
            <div className={style.borderr}></div>
            <div className={style.contentdes}>
              <div
                className={
                  ["ur", "ar", "ps", "pr"].includes(i18n.language)
                    ? style.listlg
                    : style.list
                }
              >
                <p className={style.title}> {t("description")}</p>
                <p className={style.DetailText}>
                  {travelDetails?.description ||
                    travelDetails?.packageDescription}
                </p>
              </div>

              <div className={style.bottomSection}>
                <p className={style.Total}>{t("total")}</p>
                <p className={style.Price}>
                  <span style={{ fontSize: "16px" }}>{t("rs")}:</span>{" "}
                  <span> {travelDetails?.actualPrice}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.outerWrapper22}>
        <p className={style.mainTitle}>{t("yourInfo")}</p>
        <form onSubmit={formik.handleSubmit}>
          <div className={style.flexItemcenter}>
            <div className={style.w50}>
              <InputField
                placeholder="Name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.userName}
              />{" "}
              {formik.touched.userName && formik.errors.userName && (
                <div className={commonStyles.error}>
                  {formik.errors.userName}
                </div>
              )}
            </div>

            <div className={style.w50}>
              <InputField
                placeholder="Contact Number"
                name="contactNumber"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />{" "}
              {formik.touched.phone && formik.errors.phone && (
                <div className={commonStyles.error}>{formik.errors.phone}</div>
              )}
            </div>
          </div>

          <div className={style.flexItemcenter}>
            <div className={style.w50}>
              <InputField
                placeholder="Current Address"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                readOnly
              />{" "}
              {formik.touched.address && formik.errors.address && (
                <div className={commonStyles.error}>
                  {formik.errors.address}
                </div>
              )}
            </div>{" "}
            <div className={style.w50}>
              <InputField
                placeholder="CNIC"
                name="cnic"
                onChange={formik.handleChange}
                value={formik.values.cnic}
              />{" "}
              {formik.touched.cnic && formik.errors.cnic && (
                <div className={commonStyles.error}>{formik.errors.cnic}</div>
              )}
            </div>{" "}
          </div>

          <div className={style.picker}>
            <ImgPicker
              placeholder={t("pleaseuploadapictureoftheinsurancepersonCNIC")}
              setData={(url: any) => formik.setFieldValue("cnicFile", url)}
            />
            {formik.touched.cnicFile && formik.errors.cnicFile && (
              <div className={commonStyles.error}>{formik.errors.cnicFile}</div>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className={style.buyBtn} type="submit">
              {formik.isSubmitting ? t("loading") : t("buy")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

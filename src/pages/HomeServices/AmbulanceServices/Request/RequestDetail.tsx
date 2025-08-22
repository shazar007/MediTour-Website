import { useEffect, useState } from "react";
import classNames from "classnames";
import style from "./ambulanceRequest.module.css";
import commonStyles from "shared/utils/common.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomModal, InputField, PrimaryButton } from "shared/components";
import { FaCheckCircle } from "react-icons/fa";
import { ambulanceAddbidSchema } from "shared/utils";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ambulanceADDBIDREQUEST,
  getAllBookingRequest,
  getAmbulanceGETSINGLEREQUEST,
} from "shared/services/Ambulance";
import { setAmbulanceRequestFlag } from "shared/redux";
import { useDispatch } from "react-redux";
import CustomLoader from "shared/components/New_Loader/Loader";
import { Avatar } from "@mui/material";
import Phone from "assets/images/mingcute_birthday-2-line.png";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useDirection } from "shared/utils/DirectionContext";
import { FaRegClock } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";

interface RecentRequest {
  dropOff: {
    address: string;
  };
  pickUp: {
    address: string;
  };
  userId: {
    name: string;
    phone: string;
    createdAt?: string;
    mrNo?: string;
    userImage?: string;
  };
  createdAt: any;
}

interface BID {
  ambulanceName: string;
  ambulanceNo: string;
  price: number;
}

export default function RequestDetail() {
  const { t, i18n }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const [acceptmodal, setAcceptModal] = useState(false);
  const [request, setRequest] = useState<RecentRequest | null>(null);

  const [bid, setBid] = useState<BID | null>(null);

  const id = state?._id;
  const handleOpenModel = () => {
    setAcceptModal(true);
    setTimeout(() => {
      setAcceptModal(false);
    }, 1000);
  };

  const fetchSingle = () => {
    setLoading(true);
    if (!id) {
      console.error("ID is undefined");
      setLoading(false);
      return;
    }
    getAmbulanceGETSINGLEREQUEST(id)
      .then((res: any) => {
        setRequest(res?.data?.userRequest);
        setBid(res?.data?.bid);
      })
      .catch((err: any) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      ambulancename: "",
      ambulanceno: "",
      price: "",
    },
    validationSchema: Yup.object(ambulanceAddbidSchema(t)),
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    formik.validateForm();
  }, [i18n.language]);

  const { refetch } = useQuery({
    queryKey: ["AmbulanceRequest", 1],
    queryFn: () => getAllBookingRequest(1),
    staleTime: 5 * 60 * 1000,
  });
  const handleSubmit = () => {
    let params = {
      requestId: id,
      ambulanceName: formik.values.ambulancename,
      ambulanceNo: formik.values.ambulanceno,
      price: formik.values.price,
    };
    ambulanceADDBIDREQUEST(params)
      .then((res: any) => {
        handleOpenModel();
        refetch();
        dispatch(setAmbulanceRequestFlag(true));
        setTimeout(() => {
          navigate("/ambulance/request");
        }, 1020);
      })
      .catch((err: any) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSingle();
  }, []);
  const formattedDate = dayjs(request?.createdAt)
    .locale(isRtl ? "ur" : "en")
    .format(isRtl ? "DD MMMM YYYY, hh:mm A" : "MMMM DD, YYYY, hh:mm A");
  return (
    <div className={classNames(commonStyles.col12)}>
      {loading ? (
        <CustomLoader />
      ) : (
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? commonStyles.pl36
              : commonStyles.pr36
          }
        >
          <div className={commonStyles.flx}>
            <p className={classNames(commonStyles.fs24, commonStyles.semiBold)}>
              {t("requestDetail")}
            </p>
          </div>

          <div className={style.detailCard}>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <Avatar
                src={request?.userId?.userImage}
                sx={{ height: "80px", width: "80px" }}
              />
              <div>
                <p className={style.CardName}>{request?.userId?.name}</p>
                <p className={style.CardIds}>MR No: {request?.userId?.mrNo}</p>
              </div>
            </div>

            <div
              style={{ alignItems: "start" }}
              className={classNames(style.flxBetween)}
            >
              <div className={style.Rowss}>
                <FaRegClock color="#7d7d7d" className={style.iconss} />
                <div>
                  <p className={style.colorTitle}>{t("time")}</p>
                  <p className={style.value}>{formattedDate}</p>
                </div>
              </div>

              <div className={style.Rowss}>
                <img src={Phone} alt="Phone1" className={style.iconss} />
                <div>
                  <p className={style.colorTitle}>{t("contact")}</p>
                  <p className={style.value}>{request?.userId?.phone}</p>
                </div>
              </div>
              <div className={style.Rowss}>
                <CiLocationOn color="#7d7d7d7" />
                <div>
                  <p className={style.colorTitle}>{t("pickUp")}</p>
                  <p className={style.value}>{request?.pickUp?.address}</p>
                </div>
              </div>
              <div className={style.Rowss}>
                <CiLocationOn color="#7d7d7d7" />
                <div>
                  <p className={style.colorTitle}>{t("dropOff")}</p>
                  <p className={style.value}>{request?.dropOff?.address}</p>
                </div>
              </div>
            </div>
          </div>

          {bid ? (
            <div>
              <div className={style.detailCard}>
                <p
                  className={classNames(
                    commonStyles.fs14,
                    commonStyles.semiBold,
                    commonStyles.mb24
                  )}
                >
                  {t("ambulanceDetails")}
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ width: "30%" }}>
                    <p className={style.colorTitle}>{t("ambulanceName")}</p>
                    <p className={style.value}>{bid?.ambulanceName}</p>
                  </div>
                  <div style={{ width: "30%" }}>
                    <p className={style.colorTitle}>{t("ambulanceNo")}</p>
                    <p className={style.value}>{bid?.ambulanceNo}</p>
                  </div>
                  <div style={{ width: "30%" }}>
                    <p className={style.colorTitle}>{t("price")}</p>
                    <p className={style.value}>{bid?.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={formik.handleSubmit}>
                <div className={style.detailCard}>
                  <p
                    className={classNames(
                      commonStyles.fs14,
                      commonStyles.semiBold,
                      style.mb16
                    )}
                  >
                    {t("ambulance")}
                  </p>

                  <div className={style.flxxx}>
                    <div className={style.w33}>
                      <InputField
                        placeholder={t("ambulanceName")}
                        id="ambulancename"
                        name="ambulancename"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.ambulancename}
                      />
                      {formik.touched.ambulancename &&
                        formik.errors.ambulancename && (
                          <div className={commonStyles.error}>
                            *{formik.errors.ambulancename}
                          </div>
                        )}
                    </div>

                    <div className={style.w33}>
                      <InputField
                        placeholder={t("ambulanceNo")}
                        id="ambulanceno"
                        name="ambulanceno"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.ambulanceno}
                      />
                      {formik.touched.ambulanceno &&
                        formik.errors.ambulanceno && (
                          <div className={commonStyles.error}>
                            *{formik.errors.ambulanceno}
                          </div>
                        )}
                    </div>

                    <div className={style.w33}>
                      <InputField
                        placeholder={t("price")}
                        id="price"
                        name="price"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                      />
                      {formik.touched.price && formik.errors.price && (
                        <div className={commonStyles.error}>
                          *{formik.errors.price}
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "210px",
                      marginTop: "32px",
                      marginLeft: "auto",
                    }}
                  >
                    <PrimaryButton
                      children={t("bid")}
                      colorType="New_blue"
                      type="submit"
                    />
                  </div>
                </div>
              </form>

              <CustomModal showModal={acceptmodal}>
                <div style={{ width: "420px", textAlign: "center" }}>
                  <FaCheckCircle
                    className={style.done}
                    size={80}
                    color="green"
                  />
                  <p
                    className={classNames(
                      commonStyles.fs16,
                      commonStyles.semiBold,
                      style.mt16
                    )}
                  >
                    {t("bidSubmittedSuccessfully")}
                  </p>
                </div>
              </CustomModal>
            </>
          )}
        </div>
      )}
    </div>
  );
}

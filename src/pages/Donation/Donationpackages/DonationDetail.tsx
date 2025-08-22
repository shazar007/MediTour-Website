import { useState, useEffect } from "react";
import classNames from "classnames";
import style from "./Donationpackages.module.css";
import commonstyles from "shared/utils/common.module.css";
import styles from "../../Laboratory/Tests/test.module.css";
import commonstyle from "shared/utils/common.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  donationPackageDelete,
  donationPackageDetail,
} from "shared/services/Donation";
import { RingLoader } from "shared/components";
import { IoClose } from "react-icons/io5";
import CustomLoader from "shared/components/New_Loader/Loader";
import { useTranslation } from "react-i18next";

interface Props {
  setShowAddModal: any;
}
const PackageConfirmDelete = (props: Partial<Props>) => {
  const { t }: any = useTranslation();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setShowAddModal } = props;
  const { id } = useParams();
  const deletePackage = () => {
    setLoading(true);
    const donationID = id || "";
    donationPackageDelete(donationID)
      .then((res: any) => {
        if (res?.status === 200) {
          navigate("/donation/packages");
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <div className={classNames(styles.modalBackdrop)}>
        <div className={classNames(styles.modalContainer)}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IoClose
              className={styles.closeicon}
              onClick={() => setShowAddModal(false)}
            />
          </div>
          <div
            className={classNames(commonstyle.flx, commonstyle.flxCol)}
            style={{ width: "100%" }}
          >
            <p className={classNames(commonstyle.fs24, commonstyle.semiBold)}>
              {t("areYouSure")} ?
            </p>
            <p className={classNames(commonstyle.colorGray, commonstyle.fs16)}>
              {t("deleteThisPackage")}?
            </p>
            <div
              style={{
                marginTop: "24px",
                justifyContent: "space-between",
                width: "100%",
              }}
              className={classNames(commonstyle.flxBetween)}
            >
              <button
                className={styles.cancelbtn}
                onClick={() => setShowAddModal(false)}
              >
                {t("noCancel")}
              </button>
              <button className={styles.dltbtn} onClick={deletePackage}>
                {loading ? (
                  <RingLoader color={"#fff"} size={30} />
                ) : (
                  t("yesDelete")
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface DonationDetails {
  description: string;
  donationType: string;
  requiredAmount: number;
  targetAudience: string;
  totalDays: number;
  donationTitle: string;
  images: string[];
}
export default function DonationDetail() {
  const { t, i18n }: any = useTranslation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<DonationDetails | null>(null);
  const { id } = useParams();

  const handleOpenModal = () => {
    setShowAddModal(true);
  };
  const GetDonationDetail = (_id: string) => {
    setLoading(true);
    donationPackageDetail(_id)
      .then((res: any) => {
        setDetails(res.data.package);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (id) {
      GetDonationDetail(id);
    }
  }, [id]);

  return (
    <div className={classNames(commonstyles.col12)}>
      {loading ? (
        <CustomLoader />
      ) : (
        <div
          className={
            ["ur", "ar", "ps", "pr"].includes(i18n.language)
              ? commonstyle.pl36
              : commonstyle.pr36
          }
        >
          {" "}
          <p className={classNames(commonstyles.fs24, commonstyles.semiBold)}>
            {t("packageDetails")}
          </p>
          <div className={commonstyles.outerContainer}>
            <div
              className={classNames(commonstyles.flxBetween, commonstyle.mb24)}
            >
              <p className={style.quotions}>{details?.description}</p>
              <button className={style.DeleteBtn} onClick={handleOpenModal}>
                {t("delete")}
              </button>
            </div>
            <div className={classNames(commonstyles.col12)}>
              <div>
                <div className={style.flxx}>
                  <div className={style.w33}>
                    <p className={style.title}>{t("targetAudience")}:</p>
                  </div>
                  <div className={style.w33}>
                    <p className={style.title}>{t("totalAmount")}:</p>{" "}
                  </div>
                  <div className={style.w33}>
                    <p className={style.title}>{t("noOfDays")}</p>
                  </div>
                </div>
                <div
                  style={{
                    margin: "6px 0",
                    borderBottom: "0.5px solid #7d7d7d",
                  }}
                ></div>
                <div className={style.flxx}>
                  <div className={style.w33}>
                    <p className={style.value}>{details?.targetAudience} </p>
                  </div>{" "}
                  <div className={style.w33}>
                    <p className={style.value}>{details?.requiredAmount}</p>{" "}
                  </div>{" "}
                  <div className={style.w33}>
                    <p className={style.value}>{details?.totalDays}</p>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className={commonstyle.mt24}>
              {" "}
              {details?.images && details?.images[0] && (
                <div>
                  <img
                    alt={`Donation Details ${+1}`}
                    src={details.images[0]}
                    style={{ width: "calc(50% - 12px)", height: "200px" }}
                  />
                </div>
              )}
              {details?.images &&
                (details?.images[1] || details?.images[2]) && (
                  <div className={style.flxx}>
                    {details.images[1] && (
                      <img
                        alt="Don Details"
                        src={details.images[1]}
                        style={{ width: "calc(50% - 12px)", height: "280px" }}
                      />
                    )}
                    {details.images[2] && (
                      <img
                        alt="Don Details2"
                        src={details.images[2]}
                        style={{ width: "calc(50% - 12px)", height: "280px" }}
                      />
                    )}
                  </div>
                )}
            </div>
            {showAddModal && (
              <div>
                <PackageConfirmDelete setShowAddModal={setShowAddModal} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

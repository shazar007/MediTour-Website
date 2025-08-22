import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import RingLoader from "../RingLoader";
import style from "./DeleteModalStyle.module.css";
import { IoClose } from "react-icons/io5";
import Sure from "../../../assets/images/mdi_tick-circle.png";
import { useTranslation } from "react-i18next";

interface Props {
  modalVisible?: any;
  handleDelete?: any;
  handleCancel?: any;
  loading?: any;
  title?: any;
  content?: any;
  confirmText?: any;
  type?: any;
  cancelTitle?: any;
}

const DeleteModal = (props: Props) => {
  const { t }: any = useTranslation();
  const {
    modalVisible,
    handleDelete,
    handleCancel,
    loading,
    title,
    content,
    confirmText,
    type,
    cancelTitle,
  } = props;
  return (
    modalVisible && (
      <>
        <div className={style.modalOverlay}>
          <div className={style.modalBox}>
            <div
              style={{ width: "100%" }}
              className={classNames(commonstyle.flx, commonstyle.flxCol)}
            >
              <p className={classNames(commonstyle.fs24, commonstyle.semiBold)}>
                {t("areYouSure")}
              </p>
              <p
                className={classNames(commonstyle.colorGray, commonstyle.fs16)}
              >
                {t("youWantToDeleteThis")}{t("?")}
              </p>
              <div
                className={classNames(
                  commonstyle.flx,
                  style.mt24,
                  commonstyle.flxBetween
                )}
                style={{ width: "100%", marginTop: "24px" }}
              >
                <button className={style.cancelbtn} onClick={handleCancel}>
                  {t("noCancel")}
                </button>
                <button className={style.dltbtn} onClick={handleDelete}>
                  {loading ? (
                    <RingLoader color={"#fff"} size={16} />
                  ) : (
                    cancelTitle ?? t("yesDelete")
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default DeleteModal;

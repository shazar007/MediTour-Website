import React, { useEffect, useState } from "react";
import styles from "./order.module.css";
import Sure from "../../../assets/images/mdi_tick-circle.png";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";
import { useTranslation } from "react-i18next";

interface StatusOption {
  label: string;
  value: string;
  color: string;
}

interface Props {
  orderId: string;
  initialStatus: string;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
  statusOptions: StatusOption[];
  isFileUploaded?: boolean;
  orderType?: string;
}

const CustomSelectOrder: React.FC<Props> = ({
  orderId,
  initialStatus,
  onStatusUpdate,
  statusOptions,
  isFileUploaded = false,
  orderType = "",
}) => {
  const { t }: any = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [showModal, setShowModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState("");

  useEffect(() => {
    setSelectedStatus(initialStatus);
  }, [initialStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;

    // Only enforce file-upload rule for lab orders
    if (newStatus === "completed" && orderType === "lab" && !isFileUploaded) {
      notifyError(
        "Please upload a file before marking this lab order as completed."
      );
      return; // do not change selectedStatus, it remains as initialStatus
    }

    if (newStatus === "completed") {
      setPendingStatus(newStatus);
      setShowModal(true);
    } else {
      setSelectedStatus(newStatus);
      onStatusUpdate(orderId, newStatus);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setPendingStatus("");
  };

  const handleSure = () => {
    setSelectedStatus(pendingStatus);
    onStatusUpdate(orderId, pendingStatus);
    setShowModal(false);
    setPendingStatus("");
  };

  const selectedColor =
    statusOptions.find((o) => o.value === selectedStatus)?.color || "#D96F79";

  return (
    <>
      <div className={styles.container}>
        <div className={styles.selectWrapper}>
          <select
            key={initialStatus} // force remount when initialStatus changes
            className={styles.select}
            value={selectedStatus}
            onChange={handleChange}
            style={{
              backgroundColor: selectedColor,
              color:
                selectedStatus === "pending"
                  ? "#D96F79"
                  : selectedStatus === "completed"
                  ? "#5BD32A"
                  : "#FF7631",
            }}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <img src={Sure} alt="Suree" className={styles.sureImg} />
            <p className={styles.sureHeading}>{t("sure")} !</p>
            <p className={styles.suretext}>{t("sureCompleteThisOrderId")}</p>
            <div className={styles.modalButtons}>
              <button onClick={handleCancel}>{t("cancel")}</button>
              <button onClick={handleSure}>{t("sure")}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomSelectOrder;

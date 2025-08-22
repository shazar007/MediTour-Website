import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import style from "../Request/PharmacyRequest.module.css";
import { pharmacyAddBid, PharmacyGetRequest } from "shared/services";
import success from "assets/images/cute.png";
import TableNew from "shared/components/A_New_Components/Table_new";
import { useTranslation } from "react-i18next";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";

export default function PhrRequestDetails() {
  const { t, i18n }: any = useTranslation();
  const location = useLocation();
  const { state } = location;
  const [bidLoading, setBidLoading] = useState(false);
  const [selectedMed, setSelectedMed] = useState<any>([]);
  const [acceptModal, setAcceptModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const navigate = useNavigate();

  const PhrRequesDetialsttitle = [t("medicine"), t("quantities")];
  let PhrRequestDetails = state?.medicineIds;

  let tableData: any = [];
  PhrRequestDetails?.map((v: any, ind: any) => {
    tableData.push([
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        <input
          style={{ width: "20px" }}
          type="checkbox"
          checked={selectedMed.includes(v?.id?._id)}
          onChange={() => handleCheckboxChange(v?.id?._id)}
        />
        <p>{v?.id?.productName}</p>
      </div>,
      v?.quantity,
    ]);
  });

  const handleBid = () => {
    if (selectedMed.length === 0) {
      notifyError(t("selectMedicineAvailability"));
      return;
    }
    const allSelected =
      selectedMed.length === selectedRequest?.medicineIds?.length;
    setBidLoading(true);
    const params = {
      requestId: state?._id,
      availableMedIds: selectedMed,
      partialOrFull: allSelected ? "full" : "partial",
    };

    pharmacyAddBid(params)
      .then((res: any) => {
        setAcceptModal(true);
        setSelectedMed([]);
        setTimeout(() => {
          setAcceptModal(false);
          setSelectedRequest(null);
          handleFetchRequest(1);
          setTimeout(() => {
            navigate("/pharmacy/Request");
          }, 3000);
        }, 2000);
      })
      .catch((err: any) => {})
      .finally(() => setBidLoading(false));
  };

  const handleFetchRequest = (page: number) => {
    PharmacyGetRequest(page)
      .then((res: any) => {})
      .catch((err: any) => {});
  };

  const handleCheckboxChange = (id: any) => {
    setSelectedMed((prevSelectedIds: any) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId: any) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  useEffect(() => {
    handleFetchRequest(1);
  }, []);

  return (
    <div className={classNames(commonstyle.col12)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyle.pl36
            : commonstyle.pr36
        }
      >
        <div className={classNames(commonstyle.flxBetween)}>
          <p className={style.Mianheading}>{t("requestDetail")}</p>
          {!state?.requestSent && (
            <button
              className={style.BidBtn}
              disabled={bidLoading}
              onClick={handleBid}
            >
              {t("bid")}
            </button>
          )}
        </div>
        <div className={style.Card_Detail}>
          <TableNew
            titles={PhrRequesDetialsttitle}
            data={tableData}
            headerWidth="50%"
            itemWidth="50%"
            show="default"
            height="49.6vh"
          />
          <div className={style.TotalAmount}>
            <p className={style.heading}>{t("totalAmount")}: </p>
            <p className={style.Amount}>Rs. {state?.totalAmount}</p>
          </div>
          {state?.gatewayName === "stripe" && (
            <div className={style.TotalAmount}>
              <p className={style.heading}>{t("totalAmountInDollar")}:</p>
              <p className={style.Amount}>${state?.dollarAmount}</p>
            </div>
          )}
        </div>
      </div>
      {acceptModal && (
        <div className={style.modaloverlay}>
          <div className={style.modalcontent}>
            <img
              src={success}
              alt="pharmacy Sucess"
              className={style.successIMg}
            />
            <p className={style.modalHeading}>{t("bidSuccessfullySubmit")}</p>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import classNames from "classnames";
import commonstyle from "shared/utils/common.module.css";
import { IoArrowBack } from "react-icons/io5";
import style from "./donors.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { donationDonorDetails } from "shared/services/Donation";
import CustomLoader from "shared/components/New_Loader/Loader";
import { useTranslation } from "react-i18next";

interface DonorDetails {
  donationAmount: number;
  donationPurpose: string;
  donorName: string;
}
interface UserDetails {
  userImage: string;
}
export default function DonorDetail() {
  const { t, i18n }: any = useTranslation();
  const [donordetail, setDonordetail] = useState<DonorDetails | null>(null);
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBackToMedicinesTable = () => {
    navigate("/donation/donors");
  };
  const DonorDetails = (_id: string) => {
    setLoading(true);
    const donorID = id || "";
    donationDonorDetails(donorID)
      .then((res: any) => {
        if (res?.status === 200) {
          setDonordetail(res.data.donor);
          setUser(res.data?.donor?.userId);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      DonorDetails(id);
    }
  }, [id]);
  return (
    <div className={classNames(commonstyle.col12)}>
      <div
        className={
          ["ur", "ar", "ps", "pr"].includes(i18n.language)
            ? commonstyle.pl36
            : commonstyle.pr36
        }
      >
        <div className={commonstyle.outerContainer}>
          <div className={commonstyle.flx}>
            <IoArrowBack
              className={style.back}
              onClick={handleBackToMedicinesTable}
            />
            <p className={classNames(commonstyle.fs20, commonstyle.semiBold)}>
              Back
            </p>
            <div className={classNames(commonstyle.flx, style.end)}></div>
          </div>

          {loading ? (
            <CustomLoader />
          ) : (
            <div className={classNames(commonstyle.mt56, commonstyle.col4)}>
              <p className={classNames(commonstyle.fs24, commonstyle.semiBold)}>
                Donor Details
              </p>
              <div className={style.center}>
                <Avatar src={user?.userImage} className={style.profile} />{" "}
              </div>
              <div className={classNames(commonstyle.flx, commonstyle.mt56)}>
                <p className={commonstyle.col6}>Donor Name:</p>
                <p className={commonstyle.semiBold}>{donordetail?.donorName}</p>
              </div>
              <div className={classNames(commonstyle.flx, style.mt8)}>
                <p className={commonstyle.col6}>Donor For:</p>
                <p className={commonstyle.semiBold}>
                  {donordetail?.donationPurpose}
                </p>
              </div>
              <div className={classNames(commonstyle.flx, style.mt8)}>
                <p className={commonstyle.col6}>Donor Amount </p>
                <p className={commonstyle.semiBold}>
                  {donordetail?.donationAmount}/-
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

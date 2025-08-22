import React, { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import Footerr from "pages/Home/HomeNavBar/Footer";
import Explore from "shared/components/DonationServices/Explore";
import DonnersCards from "shared/components/DonationServices/DonnersCards";
import style from "./Help.module.css";
import {
  getDonation_Companies,
  getPeople_Donation,
  getRecentDonor,
} from "shared/services";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import CustomLoader from "shared/components/New_Loader/Loader";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";

const DonationServices: React.FC = () => {
  const { t }: any = useTranslation();
  const [data, setData] = useState<any>([]);
  const [donorData, setDonor] = useState<any>([]);

  const [companyData, setCompanyData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAllData();
  }, [currentPage]);

  const fetchAllData = () => {
    setLoading(true);
    Promise.all([
      getDonation_Companies(),
      getPeople_Donation(),
      getRecentDonor({ page: currentPage }),
    ])
      .then((responses: any) => {
        const [companiesRes, criterionRes, donorsRes] = responses;

        setData(companiesRes?.data?.companies || []);
        setCompanyData(criterionRes?.data?.criteria || []);
        setDonor(donorsRes?.data?.donations || []);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <ServiceHeader
        headingBlue={t("GivetheGiftofHealing")}
        headingOrange={t("MakesaDifference")}
        content={t("Yourcontributionhelps_")}
        desc_width="80%"
      />

      <div className={classNames(commonstyles.container, commonstyles.mb32)}>
        <div>
          {data && data.length > 0 && (
            <>
              <p
                className={classNames(
                  commonstyles.fs24,
                  commonstyles.semiBold,
                  commonstyles.mb8
                )}
              >
                {t("explorePackages")}
              </p>

              {loading ? (
                <CustomLoader />
              ) : !companyData || companyData.length === 0 ? (
                <PhysiotheristsEmpty />
              ) : (
                <Explore companyData={companyData} />
              )}

              <p
                className={classNames(
                  commonstyles.fs24,
                  commonstyles.semiBold,
                  commonstyles.mt24,
                  commonstyles.mb8
                )}
              >
                {t("recentDonors")}
              </p>

              {loading ? (
                <CustomLoader />
              ) : !donorData || donorData.length === 0 ? (
                <PhysiotheristsEmpty />
              ) : (
                <DonnersCards donorData={donorData} />
              )}
            </>
          )}
          <div className={style.marginTopDonation}></div>
        </div>

        {loading && <CustomLoader />}
      </div>

      <Footerr />
    </div>
  );
};

export default DonationServices;

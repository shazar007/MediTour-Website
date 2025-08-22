import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import style from "./index.module.css";
import commonstyle from "shared/utils/common.module.css";
import DoctorCard from "shared/components/A_New_Components/DoctorCard";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { postInsuranceFamily, postInsuranceFlight } from "shared/services";
import CustomLoader from "shared/components/New_Loader/Loader";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useTranslation } from "react-i18next";
import ServiceHeader from "shared/components/ServicesHeaders";
import Footerr from "pages/Home/HomeNavBar/Footer";

const InsuranceCards = () => {
  const { t }: any = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const [data, setData] = useState<any>([]);

  const { formType, selectedPlan, selectedCountry, passengerType } =
    location.state || {};

  useEffect(() => {
    fetchInsuranceData();
  }, [formType, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchInsuranceData = () => {
    setLoading(true);

    const requestData = { page: currentPage, itemsPerPage };
    const params = {
      planType: selectedPlan?.toLowerCase(),
      ...(formType === "travel" && {
        passengerTraveling: passengerType?.toLowerCase(),
        country: selectedCountry,
      }),
    };

    const fetchMethod =
      formType === "health" ? postInsuranceFamily : postInsuranceFlight;

    fetchMethod(requestData, params)
      .then((res: any) => {
        const fetchedData = res?.data?.insurances || [];
        setData(fetchedData);
        setTotalItems(res?.data?.totalItems || 0);
      })
      .catch((err: any) => {
        console.error("Error fetching insurance data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const onPressDetail = (item: any) => {
    navigate("/services/insurance/InsuranceDetails", {
      state: {
        selectedPlan,
        selectedCountry,
        passengerType,
        formType,
        item,
      },
    });
  };

  return (
    <div>
      <ServiceHeader
        headingBlue={t("HowCanWe")}
        headingOrange={t("AssistYou")}
        content={t("Exploreourcurated")}
        desc_width="80%"
      />
      <div className={classNames(commonstyle.container)}>
        <p
          className={classNames(
            commonstyle.colorBlue,
            commonstyle.fs24,
            commonstyle.semiBold
          )}
        >
          {formType === "health"
            ? t("healthInsurancePlans")
            : t("travelInsurancePlans")}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <NewPagination
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
            startItem={(currentPage - 1) * itemsPerPage + 1}
            endItem={Math.min(currentPage * itemsPerPage, totalItems)}
            totalItems={totalItems}
          />
        </div>

        {data.length > 0 ? (
          <div className={style.cardContainer}>
            {data.map((card: any) => (
              <DoctorCard
                key={card.id}
                item={card}
                type={"insurance"}
                rating={false}
                onClick={() => onPressDetail(card)}
              />
            ))}
          </div>
        ) : (
          <div>{!loading && <PhysiotheristsEmpty />}</div>
        )}
      </div>
      {loading && <CustomLoader />}
      <Footerr />
    </div>
  );
};

export default InsuranceCards;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import CardStyless from "../DoctarServices/Cards.module.css";
import style from "./Hospital.module.css";
import CommonStyless from "shared/utils/common.module.css";
import { IoIosArrowForward, IoMdArrowForward } from "react-icons/io";
import NavBarr from "pages/Home/HomeNavBar/NavBarr";
import Footerr from "pages/Home/HomeNavBar/Footer";
import classNames from "classnames";
import { getDepartment_Doctors } from "shared/services/UserService";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import DoctorCard from "shared/components/A_New_Components/DoctorCard";

const departmentNames: { [key: string]: string } = {
  0: "General Surgery",
  1: "Emergency",
  2: "Cardiology",
  3: "Radiology",
  4: "General Surgery",
  5: "Emergency",
  6: "Cardiology",
  7: "Radiology",
  8: "General Surgery",
  9: "Emergency",
  10: "Cardiology",
  11: "Radiology",
  12: "General Surgery",
  13: "Emergency",
  14: "Cardiology",
  15: "Radiology",
};

const HospitalDepartments: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [visibleCards, setVisibleCards] = useState<number>(2);
  const [hospitalDoc, setHospitalDoc] = useState<any>();

  const navigate = useNavigate();
  const { state }: any = useLocation();

  const serviceName = state?.serviceName || "Unknown Service";

  const departmentName = id ? departmentNames[id] : "Unknown Department";

  //

  useEffect(() => {
    getDepartmentDoc();
  }, []);

  const getDepartmentDoc = () => {
    let params = {
      departmentId: state?.doc?._id,
    };
    getDepartment_Doctors(params)
      .then((res: any) => {
        setHospitalDoc(res?.data?.doctors);
      })
      .catch((err: any) => {});
  };

  const handleViewMoreClick = (doc: any) => {
    navigate(`/services/doctor/DoctorDetail`, {
      state: { serviceName, doc },
    });
  };

  const handleShowMore = () => {
    setVisibleCards(visibleCards + 2); // Show 2 more cards
  };

  return (
    <>
      <div className={style.navIMG}>
        <NavBarr />
        <p
          className={classNames(
            CommonStyless.fs48,
            CommonStyless.semiBold,
            style.mianheading
          )}
        >
          {serviceName}
        </p>
        <div className={style.title}>
          <p
            className={classNames(
              CommonStyless.fs16,
              CommonStyless.semiBold,
              style.mianheading22
            )}
          >
            Home
          </p>
          <IoIosArrowForward
            className={classNames(CommonStyless.fs16, style.mianheading)}
          />
          <p
            className={classNames(
              CommonStyless.fs16,
              CommonStyless.semiBold,
              style.mianheading22
            )}
          >
            Services
          </p>
          <IoIosArrowForward
            className={classNames(CommonStyless.fs16, style.mianheading)}
          />
          <p
            className={classNames(
              CommonStyless.fs16,
              CommonStyless.semiBold,
              style.mianheading22
            )}
          >
            Hospital
          </p>
          <IoIosArrowForward
            className={classNames(CommonStyless.fs16, style.mianheading)}
          />
          <p
            className={classNames(
              CommonStyless.fs16,
              CommonStyless.semiBold,
              style.mianheading
            )}
          >
            Details
          </p>
        </div>
      </div>
      <div className={classNames(CommonStyless.container, CommonStyless.mb32)}>
        <p
          className={classNames(
            CommonStyless.colorBlue,
            CommonStyless.fs24,
            CommonStyless.semiBold
          )}
        >
          {departmentName}
        </p>
        {hospitalDoc?.length == 0 ? <PhysiotheristsEmpty /> : null}

        <div className={CardStyless.cardContainer}>
          {hospitalDoc?.map((depDoc: any, index: any) => (
            <DoctorCard
              key={index}
              item={depDoc}
              onClick={() => handleViewMoreClick(depDoc)}
              type={state?.type}
            />
          ))}
        </div>
        {hospitalDoc?.length >= 10 && (
          <div className={CardStyless.showMoreContainer}>
            <button
              onClick={handleShowMore}
              className={CardStyless.showMoreButton}
            >
              Show More
              <span className={CardStyless.icon}>
                <IoMdArrowForward />
              </span>
            </button>
          </div>
        )}
      </div>
      <Footerr />
    </>
  );
};

export default HospitalDepartments;

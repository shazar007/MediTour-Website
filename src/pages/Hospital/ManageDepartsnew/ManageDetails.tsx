import { useState, useEffect, useRef } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import { RequestTable } from "shared/components";
import { getDepartmentDoctors } from "shared/services";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ManageDetails = () => {
  const { t }: any = useTranslation();
  const [length, setLength] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const totalItems = length;
  const navigate = useNavigate();
  const { systemType } = useSelector((state: any) => state?.root?.common);
  const location = useLocation();
  const departmentId = location?.state;

  const titles_2 = [
    t("doctorId"),
    t("_name"),
    t("mobile"),
    t("email"),
    t("experience"),
    t("qualification"),
  ];

  useEffect(() => {
    if (departmentId) {
      departmentDoc(1, "");
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    departmentDoc(1, debouncedSearch);
  }, [debouncedSearch]);

  const departmentDoc = (pageno: any, keyword: any) => {
    setLoading(true);
    getDepartmentDoctors(departmentId, pageno, keyword)
      .then(async (res: any) => {
        handleTableData(res.data?.department?.doctorIds);
        setLength(res?.data?.totalDoctors);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTableData = (data: any) => {
    let tempData: any = [];
    if (data?.length > 0) {
      data.map((v: any, ind: any) => {
        tempData.push([
          v?.categoryId?.categoryName || v?.vendorId,
          v?.headDocId?.name || v?.name,
          v?.headDocId?.phoneNumber || v?.phoneNumber,
          v?.headDocId?.cnicOrPassportNo || v?.email,
          v?.headDocId?.email || v?.clinicExperience,
          v?.qualifications,
        ]);
      });
      setTableData(tempData);
    } else {
      setTableData([]);
    }
  };
  const handleBackClick = () => {
    navigate(`/${systemType}/Departments`);
  };
  return (
    <div className={classNames(style.maincontainer)}>
      <div className={style.container}>
        <div className={style.backButton} onClick={handleBackClick}>
          <IoMdArrowBack size={24} />
        </div>
        <div className={style.heading}>{t("departmentDetails")}</div>
      </div>

      <div style={{ marginTop: "32px" }}>
        <RequestTable
          lab={titles_2}
          appointment={tableData}
          loading={loading}
          length={length}
          allHospital={departmentDoc}
          totalItems={totalItems}
          search={search}
          setSearch={setSearch}
          headTitle={t("departmentDetails")}
        />
      </div>
    </div>
  );
};

export default ManageDetails;

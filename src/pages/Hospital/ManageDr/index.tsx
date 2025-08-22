import { useEffect, useState } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import LoginModel from "shared/components/HospitalBranch";
import HospitalEditDr from "shared/components/HospitalBranch/EditDoctor";
import { getAllDoctorHospital } from "shared/services";
import { useSelector } from "react-redux";
import { notifyError } from "shared/components/A_New_Components/ToastNotification";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import { BranchCard, RingLoader } from "shared/components";
import { TbRefresh } from "react-icons/tb";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import LimitModel from "./LimitModel";
import { useTranslation } from "react-i18next";

const ManageDoctor = () => {
  const { t }: any = useTranslation();
  const [open, setOpen] = useState(false);
  const [editmodel, setEdirmodel] = useState(false);
  const [item, setItem] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<any>("");
  const { user } = useSelector((state: any) => state?.root?.common);
  const [showModel, setShowModel] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const { systemType } = useSelector((state: any) => state.root.common);
  const handleClick = () => {
    if (user?.paidActivation === false) {
      notifyError(t("patTheActivationFees"));
      return;
    }
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    getDoctorList(debouncedSearch);
  }, [debouncedSearch]);

  const handleClickedit = (i: any) => {
    setEdirmodel((prevOpen) => !prevOpen);
    setItem(i);
  };
  useEffect(() => {
    getDoctorList("");
  }, [editmodel, open]);
  const getDoctorList = (keyword: any) => {
    setLoading(true);
    getAllDoctorHospital(keyword)
      .then((res: any) => {
        if (systemType === "company") {
          setData(res?.data?.companyDocs);
        } else {
          setData(res?.data?.doctors);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = () => {
    getDoctorList(search);
  };
  return (
    <div>
      <div className={style.maincontainer}>
        <div className={style.innerContent}>
          <div className={style.headerContainer}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <p className={classNames(style.heading)}>{t("doctorList")}</p>
              {loading ? (
                <div className={style.outerRefresh}>
                  <RingLoader color={"#0E54A3"} size={24} />
                </div>
              ) : (
                <div className={style.outerRefresh}>
                  <TbRefresh color="#7d7d7d" size={24} />
                </div>
              )}
              <SearchFilter
                vender={false}
                search={search}
                title={t("search")}
                setSearch={setSearch}
                handleSearch={handleSearch}
              />
            </div>
            <button className={style.addbtn} onClick={handleClick}>
              + {t("add")}
            </button>
          </div>
          <div className={style.cardHight}>
            {data?.length > 0 ? (
              data.map((item: any) => {
                return (
                  <BranchCard
                    data={item}
                    onclickDetail={() => handleClickedit(item)}
                  />
                );
              })
            ) : (
              <PhysiotheristsEmpty />
            )}
          </div>

          <LoginModel
            setOpen={setOpen}
            showModal={open}
            hitApi={getDoctorList}
            type={"doctor"}
          />

          {editmodel && (
            <div style={{ marginTop: "20px" }}>
              <HospitalEditDr
                item={item}
                setEdirmodel={setEdirmodel}
                hitApi={getDoctorList}
              />
            </div>
          )}
        </div>
      </div>

      {showModel && (
        <LimitModel showModel={showModel} setShowModel={setShowModel} />
      )}
    </div>
  );
};

export default ManageDoctor;

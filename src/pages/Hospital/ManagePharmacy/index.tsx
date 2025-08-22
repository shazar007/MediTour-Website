import { useEffect, useState } from "react";
import commonstyle from "shared/utils/common.module.css";
import style from "./style.module.css";
import classNames from "classnames";
import { RequestTable } from "shared/components";
import { depatmentStatus, fetchLimit, getManagerLab } from "shared/services";
import LoginModel from "shared/components/HospitalBranch";
import CustomizedSwitche from "shared/components/SwitchButton";
import { FiSettings } from "react-icons/fi";
import {
  notifyError,
  notifySuccess,
} from "shared/components/A_New_Components/ToastNotification";
import { useTranslation } from "react-i18next";
const ManagePharmacy = () => {
  const { t }: any = useTranslation();
  const [data, setData] = useState([]);
  const [showLab, setShowLab] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState<any>();
  const [length, setLength] = useState(0);
  const [search, setSearch] = useState("");
  const totalItems = length;
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  useEffect(() => {
    getlab(1, "");
    limitApi();
  }, []);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    getlab(1, debouncedSearch);
  }, [debouncedSearch]);

  const [tableData, setTableData] = useState([]);
  const getlab = (pageno: number, keyWod: any) => {
    setLoading(true);
    getManagerLab(pageno, "pharmacy", keyWod)
      .then((res: any) => {
        console.log(res?.data, "pharmacies");
        setLength(res?.data?.pharmacyCount);
        setTableData(res?.data?.pharmacies);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleToggle = (index: number) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    handleTableData();
  }, [openDropdown, tableData]);
  const handleSwitchChange = (e: any, index: number, v: any) => {
    const updatedTableData: any = [...tableData];

    if (updatedTableData[index]) {
      updatedTableData[index].isActive = e.target.checked;
      setTableData(updatedTableData);
      const isActive = updatedTableData[index].isActive;

      let body = {
        id: v?._id,
        type: "pharmacy",
        isActive: isActive,
      };
      depatmentStatus(body)
        .then((res) => {
          notifySuccess(res?.data?.message);
        })
        .catch((err) => {});
    }
  };
  const handleTableData = () => {
    const tempData: any = tableData?.map((v: any, ind: any) => {
      return [
        v?.name,
        `${v?.ownerFirstName} ${v?.ownerLastName}`,
        v?.emergencyNo,
        v?.phoneNumber,
        v?.email,
        <div
          className="dropdown-container"
          style={{
            position: "relative",
            textAlign: "left",
          }}
        >
          <div onClick={() => handleToggle(ind)}>
            <FiSettings
              size={24}
              color="red"
              style={{
                position: "relative",
                cursor: "pointer",
              }}
            />
          </div>
          {openDropdown === ind && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={style.dropdownContent}
            >
              <div className={classNames(style.settingbar)}>
                <p className={style.settingtitle}>{t("active")}</p>
                <div
                  style={{
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CustomizedSwitche
                    check={v?.isActive}
                    onChange={(e: any) => handleSwitchChange(e, ind, v)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>,
      ];
    });
    setData(tempData || []);
  };

  const limitApi = () => {
    fetchLimit("pharm")
      .then((res: any) => {
        setLimit(res?.data);
      })
      .catch((err: any) => {
        console.log(err, "....error");
      })
      .finally(() => {});
  };
  const handleClick = () => {
    if (limit?.allowed == true) {
      setShowLab(!showLab);
    } else {
      notifyError(limit?.message);
    }
  };
  return (
    <div>
      <div className={classNames(style.maincontainer)}>
        <div
          className={classNames(
            commonstyle.flx,
            commonstyle.flxBetween,
            commonstyle.mb24
          )}
        >
          <p className={classNames(commonstyle.mt16, style.heading)}>
            {t("managePharmacy")}
          </p>
          <button className={style.addbtn} onClick={handleClick}>
            + {t("add")}
          </button>
        </div>

        <RequestTable
          lab={[
            t("_name"),
            t("owner"),
            t("mobile"),
            t("phone"),
            t("email"),
            t("settings"),
          ]}
          appointment={data}
          search={search}
          loading={loading}
          length={length}
          allHospital={getlab}
          totalItems={totalItems}
          setSearch={setSearch}
          headTitle={t("pharmacies")}
          headerWidth="19%"
          itemWidth="19%"
        />
        <LoginModel
          setOpen={setShowLab}
          type={"pharmacy"}
          showModal={showLab}
          hitApi={getlab}
        />
      </div>
    </div>
  );
};

export default ManagePharmacy;

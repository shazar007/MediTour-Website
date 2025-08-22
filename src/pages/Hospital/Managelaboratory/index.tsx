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

const Managelaboratory = () => {
  const { t }: any = useTranslation();
  const [data, setData] = useState([]);
  const [showLab, setShowLab] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState<any>();
  const [length, setLength] = useState(0);
  const [search, setSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    getlab(1, "");
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

  const getlab = (pageno: number, keyword: any) => {
    setLoading(true);
    getManagerLab(pageno, "lab", keyword)
      .then(async (res: any) => {
        setTableData(res?.data?.labs);
        setLength(res?.data?.labCount);
      })
      .catch((err: any) => {
        console.error("Error fetching labs:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleToggle = (index: number) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const handleSwitchChange = (e: any, index: number, v: any) => {
    const updatedTableData: any = [...tableData];
    if (updatedTableData[index]) {
      updatedTableData[index].isActive = e.target.checked;
      setTableData(updatedTableData);
      const isActive = updatedTableData[index].isActive;
      let body = {
        id: v?._id,
        type: "lab",
        isActive: isActive,
      };
      depatmentStatus(body)
        .then((res) => {
          notifySuccess(res?.data?.message);
        })
        .catch((err) => {
          console.log(err, "......error");
        });
    }
  };
  useEffect(() => {
    handleTableData();
    limitApi();
  }, [openDropdown, tableData]);

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
    fetchLimit("lab")
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
            {t("manageLaboratory")}
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
          headTitle={t("laboratories")}
          loading={loading}
          search={search}
          length={length}
          setSearch={setSearch}
          allHospital={getlab}
          totalItems={length}
          headerWidth="18.9%"
          itemWidth="18.9%"
        />
        <LoginModel
          setOpen={setShowLab}
          type={"labs"}
          showModal={showLab}
          hitApi={getlab}
        />
      </div>
    </div>
  );
};

export default Managelaboratory;

import React, { useEffect, useState } from "react";
import AdminNavBar from "../../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./laboratories.module.css";
import { TbRefresh } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import NewPagination from "shared/components/NewPagination/NewPagination";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import { getUsers } from "shared/services";
import CustomLoader from "shared/components/New_Loader/Loader";

export default function Laboratories() {
  const { state } = useLocation();

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleGoToDetail = (index: any) => {
    navigate("/admin/Users/VendorDetail", {
      state: {
        data: data[index],
        type:
          state == "Pharmaceutical"
            ? "Pharmaceuticals"
            : state == "Paramedic"
            ? "Doctors"
            : state,
      },
    });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = () => {
    setLoading(true);
    const type = state;
    const page = 1;
    getUsers(page, type == "Paramedic" ? "Doctors" : state, "")
      .then((res: any) => {
        const vendors = res?.data.vendors;
        if (type == "Paramedic") {
          const paramedicVendors = vendors.filter(
            (vendor: any) => vendor.doctorKind === "paramedic"
          );
          setData(paramedicVendors);
        } else if (type === "Doctors") {
          const doctorVendors = vendors.filter(
            (vendor: any) => vendor.doctorKind !== "paramedic"
          );
          setData(doctorVendors);
        } else {
          setData(vendors);
        }
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Users" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(Styles.flxBetween)}>
          <div className={classNames(commonStyles.flx, commonStyles.colsm12)}>
            <p
              className={classNames(
                commonStyles.fs22,
                Styles.primarycolor,
                commonStyles.semiBold
              )}
            >
              {state}
            </p>
            <TbRefresh className={Styles.refresh} />
            <SearchFilter vender={false} />
          </div>
        </div>
        <div>
          <div className={Styles.payment}>
            <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
              <p className={Styles.headerclass}>
                {state == "Hospital"
                  ? "HOSPITAL ID"
                  : state == "Doctors"
                  ? "Dr ID"
                  : "VENDOR ID"}
              </p>
              <p className={Styles.headerclass}> NAME</p>
              <p className={Styles.headerclass}>PHONE NUMBER</p>
              <p className={Styles.headerclass}>
                {" "}
                {state == "Doctors" ? "CLINIC NAME" : "EMAIL"}
              </p>
              <p className={Styles.headerclass}>
                {state == "Doctors" ? "CLINIC ADDRESS" : "ADDRESS"}
              </p>
            </div>
            <div className={Styles.tableData}>
              <table
                style={{
                  margin: "0px",
                  borderCollapse: "separate",
                  borderSpacing: "0 4px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                <tbody className={Styles.wapper}>
                  {data?.map((val: any, rowIndex: any) => {
                    return (
                      <tr
                        className={Styles.tableRow}
                        key={rowIndex}
                        onClick={() => handleGoToDetail(rowIndex)}
                      >
                        <td className={Styles.w20}>{val?.vendorId}</td>
                        <td
                          className={Styles.w20}
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            maxWidth: "90px",
                          }}
                        >
                          {val?.name}
                        </td>
                        <td className={Styles.w20}>{val?.phoneNumber}</td>
                        <td
                          className={Styles.w20}
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            maxWidth: "90px",
                          }}
                        >
                          {state == "Doctors" ? val?.clinicName : val?.email}
                        </td>
                        <td
                          className={Styles.w20}
                          style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            maxWidth: "90px",
                          }}
                        >
                          {val?.location?.address}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {loading && <CustomLoader />}
    </div>
  );
}

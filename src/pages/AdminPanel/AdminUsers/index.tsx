import React, { useEffect, useState } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./adminUsers.module.css";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { useNavigate } from "react-router-dom";
import AdminVender from "./Vender";
import AdminCustomer from "./AdminCustomer";
import SearchFilter from "../Components/SearchFilter";
import { getUsers } from "shared/services";
import { RingLoader } from "shared/components";

export default function AdminUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Vendor");
  const [User, setUser] = useState([]);
  const [length, setLength] = useState(0);
  const [pageno, setPageno] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = length;
  const [search, setSearch] = useState("");

  const fetchUsers = (type: any, page: any) => {
    let typeTosend = type == "Customer" ? "Users" : "";
    getUsers(page, typeTosend, "")
      .then((res: any) => {
        setUser(res?.data.vendors);
        setLength(res?.data?.totalCount);
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (selectedOption === "Customer") {
      setLoading(true);
      fetchUsers(selectedOption, 1);
    }
  }, [selectedOption]);
  const handleRefresh = () => {
    if (selectedOption === "Customer") {
      setCurrentPage(1);
      setPageno(1);
      setLoading(true);
      fetchUsers(selectedOption, 1);
    }
  };
  const handleNextPage = () => {
    let itemTorender = currentPage * 10;
    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      setLoading(true);
      fetchUsers(selectedOption, currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      setLoading(true);
      fetchUsers(selectedOption, currentPage - 1);
    }
  };
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Users" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        {" "}
        <div className={classNames(commonStyles.flxBetween)}>
          <div className={classNames(commonStyles.flx)}>
            <div>
              <select
                className={Styles.customSelect}
                name="userType"
                id="userType"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option className={Styles.customOption} value="Vendor">
                  Vendor
                </option>
                <option className={Styles.customOption} value="Customer">
                  Customer
                </option>
              </select>
            </div>
            {loading ? (
              <div className={Styles.loader}>
                <RingLoader color={"#0D47A1"} size={30} />
              </div>
            ) : (
              <TbRefresh className={Styles.refresh} onClick={handleRefresh} />
            )}
            {selectedOption === "Customer" && (
              <>
                <SearchFilter vender={false} />
              </>
            )}
          </div>
          {selectedOption === "Customer" && (
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, length)}
              totalItems={totalItems}
            />
          )}
        </div>
        {selectedOption === "Vendor" ? (
          <AdminVender />
        ) : (
          <AdminCustomer Data={User} />
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import style from "./style.module.css";
import TableNew from "shared/components/A_New_Components/Table_new";
import { RingLoader } from "shared/components";
import { getHospitalBranches } from "shared/services";
import { useSelector } from "react-redux";
import { TbRefresh } from "react-icons/tb";
import LoginModel from "shared/components/HospitalBranch";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { useTranslation } from "react-i18next";
import { IoMdAdd } from "react-icons/io";
import NewPagination from "shared/components/NewPagination/NewPagination";

const Hospital_Branch = () => {
  const { t }: any = useTranslation();
  const titles = [t("name"), t("address"), t("mobile"), t("phone"), t("email")];
  const [open, setOpen] = useState(false);
  const [hospitalBranch, setHospitalBranch] = useState<any>();
  const [length, setLength] = useState(0);
  const { user } = useSelector((state: any) => state?.root?.common);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageno, setPageno] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const totalItems = length;
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const id = user?._id;
  const handleTableData = (data: any) => {
    let tempData: any = [];

    if (data?.length > 0) {
      data.map((v: any, ind: any) => {
        tempData.push([
          v?.name,
          v?.location?.address,
          v?.emergencyNo,
          v?.phoneNumber,
          v?.email,
        ]);
      });

      setHospitalBranch(tempData);
    } else {
      setHospitalBranch([]);
    }
  };
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
    allHospitalBranch(1, debouncedSearch);
  }, [debouncedSearch]);

  const allHospitalBranch = (pageno: number, searchWord: any) => {
    setLoading(true);
    getHospitalBranches(id, pageno, searchWord)
      .then((res: any) => {
        handleTableData(res?.data?.branches);
        setLength(res?.data?.totalBranches);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const handleNextPage = () => {
    let itemTorender = currentPage * 10;

    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      allHospitalBranch(currentPage + 1, search);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      allHospitalBranch(currentPage - 1, search);
    }
  };
  const handleRefresh = () => {
    setSearch("");
    setPageno(1);
    setCurrentPage(1);
    allHospitalBranch(1, "");
  };

  return (
    <div>
      <div className={classNames(style.container)}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <p className={classNames(style.Account)}>{t("accountManagement")}</p>
          <div className={style.accountbtn} onClick={handleClick}>
            <IoMdAdd /> {t("createAccount")}
          </div>
        </div>

        <div
          className={classNames(commonstyles.mt16)}
          style={{
            backgroundColor: "white",
            borderRadius: "16px ",
            margin: "10px 0",
            padding: "24px",
            boxSizing: "border-box",
            height: "57vh",
          }}
        >
          <div
            style={{
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              className={classNames(commonstyles.flx, commonstyles.flxWrap)}
              style={{ gap: "16px", alignItems: "center" }}
            >
              <p
                className={classNames(
                  commonstyles.colorBlack,
                  commonstyles.fs14,
                  commonstyles.semiBold
                )}
              >
                {t("accountManagement")}
              </p>
              {loading ? (
                <div className={style.outerRefresh}>
                  <RingLoader color={"#0E54A3"} size={24} />
                </div>
              ) : (
                <div className={style.outerRefresh}>
                  <TbRefresh
                    color={"#7d7d7d"}
                    size={24}
                    onClick={handleRefresh}
                  />{" "}
                </div>
              )}
              <div>
                <SearchFilter
                  vender={false}
                  search={search}
                  title={t("search")}
                  setSearch={setSearch}
                />
              </div>
            </div>

            <div>
              <NewPagination
                onNext={handleNextPage}
                onPrevious={handlePreviousPage}
                startItem={(currentPage - 1) * itemsPerPage + 1}
                endItem={Math.min(currentPage * itemsPerPage, totalItems)}
                totalItems={totalItems}
              />
            </div>
          </div>
          {hospitalBranch?.length > 0 ? (
            <TableNew
              titles={titles}
              data={hospitalBranch}
              headerWidth="20%"
              itemWidth="20%"
              height="290px"
            />
          ) : (
            <PhysiotheristsEmpty />
          )}
        </div>

        <LoginModel
          setOpen={setOpen}
          type={"branch"}
          showModal={open}
          hitApi={allHospitalBranch}
        />
      </div>
    </div>
  );
};

export default Hospital_Branch;

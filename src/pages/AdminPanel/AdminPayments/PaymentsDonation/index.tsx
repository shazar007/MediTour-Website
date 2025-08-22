import classNames from "classnames";
import Styles from "./paymentDonation.module.css";
import { useNavigate } from "react-router-dom";
import commonStyles from "shared/utils/common.module.css";
import { Checkbox } from "@mui/material";
import AdminNavBar from "pages/AdminPanel/Components/AdminNavBar";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { TbRefresh } from "react-icons/tb";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import { PrimaryButton, RingLoader } from "shared/components";
import { useEffect, useState } from "react";
import { getPaymentDonation } from "shared/services";
import dayjs from "dayjs";

const data = [
  {
    SUBMITTEDAT: "4 Feb 2019 05:30 PM",
    id: "KL02365",
    MRNo: "56489",
    USERNAME: "Zubair Ahmed",
    COMPANYNAME: "PC Hotel Lahore",
    PACKAGE: "PC Hotel Lahore",
    VENDOR: "ALi HASSAN",
    TOTALPAYMENTS: "500/-",
    STATUS: "Pending",
  },
];
export default function PaymentDonation() {
  const [loading, setLoading] = useState(false);
  const [donations, setDonations] = useState([]);
  const [length, setLength] = useState(0);
  const [pageno, setPageno] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalItems = length;
  const navigate = useNavigate();
  const handleGoToDetail = () => {
    navigate("/admin/Payments/ProceedPayment", {
      state: { VenderName: "VENDOR ", UserName: "USER NAME" },
    });
  };
  const handleGoToDetailTABLE = (index: any) => {
    const result = donations.map((v: any, i: any) => {
      if (i == index) {
        return v;
      }
    });

    navigate("/admin/Payments/PaymentDonation/Details", {
      state: result[0],
    });
  };
  const handleFetchDonations = (pageno: number) => {
    setLoading(true);
    let mrNo = "";
    getPaymentDonation(pageno, mrNo)
      .then((res: any) => {
        setDonations(res?.data?.donations);
        setLength(res?.data?.donorsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    handleFetchDonations(currentPage);
    setLoading(true);
  }, [currentPage]);

  const handleRefresh = () => {
    handleFetchDonations(currentPage);
    setLoading(true);
    setCurrentPage(1);
    setPageno(1);
  };
  const handleNextPage = () => {
    let itemTorender = currentPage * 10;
    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      setLoading(true);
      handleFetchDonations(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      setLoading(true);
      handleFetchDonations(currentPage - 1);
    }
  };
  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Payment Donation" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(commonStyles.flxBetween)}>
          <div className={classNames(commonStyles.flx)}>
            <p
              className={classNames(
                commonStyles.fs22,
                Styles.primarycolor,
                commonStyles.semiBold
              )}
            >
              Donations
            </p>
            {loading ? (
              <div className={Styles.loader}>
                <RingLoader color={"#0D47A1"} size={30} />
              </div>
            ) : (
              <TbRefresh className={Styles.refresh} onClick={handleRefresh} />
            )}
            <SearchFilter vender={true} checkbox={true} />
            <div style={{ marginLeft: "32px", width: "160px" }}>
              <PrimaryButton
                children={"Proceed"}
                colorType={"blue"}
                onClick={handleGoToDetail}
              />
            </div>
          </div>
          <p>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, length)}
              totalItems={totalItems}
            />
          </p>
        </div>
        <div className={Styles.payment}>
          <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
            <td className={Styles.headerclassCheck}></td>
            <p className={Styles.headerclass}>SUBMITTED AT</p>
            <p className={Styles.headerclass}>ID</p>
            <p className={Styles.headerclass}>MR NO.</p>
            <p className={Styles.headerclass}>USER NAME</p>
            <p className={Styles.headerclass}>VENDOR NAME</p>{" "}
            <p className={Styles.headerclass}>PACKAGE NAME</p>{" "}
            <p className={Styles.headerclass}>TOTAL PAYMENT</p>
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
                {donations.map((val: any, key: any) => {
                  const Date = dayjs(val?.createdAt).format(
                    "MM-DD-YYYY,  h:mm a"
                  );
                  return (
                    <tr
                      className={Styles.tableRow}
                      key={key}
                      onClick={() => handleGoToDetailTABLE(key)}
                    >
                      <td
                        className={Styles.w5}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Checkbox
                          sx={{
                            padding: "0px",
                            "&.Mui-checked": {
                              color: "#0D47A1",
                            },
                          }}
                        />
                      </td>
                      <td className={Styles.w20}>{Date}</td>
                      <td className={Styles.w20}>{val?.companyId?.venderId}</td>
                      <td className={Styles.w20}>{val?.userId?.mrNo}</td>
                      <td className={Styles.w20}>{val?.userId?.name}</td>
                      <td className={Styles.w20}>
                        {val?.companyId?.companyName}
                      </td>
                      <td className={Styles.w20}>
                        {val?.packageId?.donationTitle}
                      </td>
                      <td className={Styles.w20}>{val?.donationAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

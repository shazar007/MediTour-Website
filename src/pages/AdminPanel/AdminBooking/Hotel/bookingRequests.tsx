import { useEffect, useState } from "react";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "../adminbooking.module.css";
import { useNavigate } from "react-router-dom";
import { getHotelRequests } from "shared/services";
import AdminNavBar from "pages/AdminPanel/Components/AdminNavBar";
import { RingLoader } from "shared/components";
import { TbRefresh } from "react-icons/tb";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import NewPagination from "shared/components/NewPagination/NewPagination";
import dayjs from "dayjs";

const Hotel_Booking_Requests = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hotelRequests, setHotelRequests] = useState([]);
  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;
  const totalItems = length;
  const handleGoToDetail = (val: any) => {
    navigate("/admin/hotelBookingRequestDetails", { state: val });
  };

  const handleFetchBookingHotel = (page: number, searchText: string) => {
    setLoading(true);
    getHotelRequests(page, searchText)
      .then((res: any) => {
        setHotelRequests(res?.data.requests);
        setLength(res?.data?.totalBookings);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleFetchBookingHotel(1, "");
  }, []);

  const handleRefresh = () => {
    setCurrentPage(1);
    setSearch("");
    handleFetchBookingHotel(1, "");
  };

  const handleSearch = () => {
    setCurrentPage(1);
    handleFetchBookingHotel(1, search);
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;
    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      handleFetchBookingHotel(currentPage + 1, search);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      handleFetchBookingHotel(currentPage - 1, search);
    }
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Booking Requests" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(Styles.flxBetween)}>
          <div className={classNames(commonStyles.flx)}>
            <p
              className={classNames(
                commonStyles.colorBlack,
                commonStyles.fs22,
                commonStyles.semiBold
              )}
            >
              Hotel Request
            </p>
            {loading ? (
              <div className={Styles.loader}>
                <RingLoader color={"#0D47A1"} size={30} />
              </div>
            ) : (
              <TbRefresh className={Styles.refresh} onClick={handleRefresh} />
            )}
            <SearchFilter
              vender={false}
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
            />
          </div>
          <div className={classNames(commonStyles.flx)}>
            <NewPagination
              onNext={handleNextPage}
              onPrevious={handlePreviousPage}
              startItem={(currentPage - 1) * itemsPerPage + 1}
              endItem={Math.min(currentPage * itemsPerPage, length)}
              totalItems={totalItems}
            />
          </div>
        </div>
      </div>
      <div className={Styles.payment}>
        <div className={classNames(Styles.headerOuter, commonStyles.bold)}>
          <p className={Styles.headerclass}>SUBMITTED AT</p>
          <p className={Styles.headerclass}>ID</p>
          <p className={Styles.headerclass}>MR NO.</p>
          <p className={Styles.headerclass}>GUEST NAME</p>
          <p className={Styles.headerclass}>HOTEL NAME</p>
          <p className={Styles.headerclass}>CHECK IN</p>
          <p className={Styles.headerclass}>CHECK OUT</p>
          <p className={Styles.headerclass}>TOTAL AMOUNT</p>
          {/* <p className={Styles.headerclass}>STATUS</p> */}
        </div>
        <div className={Styles.tableData}>
          <table
            style={{
              margin: "0px",
              borderCollapse: "separate",
              borderSpacing: "0 4px",
            }}
          >
            <tbody className={Styles.wapper}>
              {hotelRequests?.map((val: any, rowIndex: any) => {
                const Date = dayjs(val?.createdAt).format(
                  "MM-DD-YYYY,  h:mm a"
                );
                const ChickIn = dayjs(val?.arrivalDate?.from).format(
                  " MM-DD-YYYY"
                );
                const Chickout = dayjs(val?.arrivalDate?.to).format(
                  " MM-DD-YYYY"
                );
                return (
                  <tr
                    className={Styles.tableRow}
                    key={rowIndex}
                    onClick={() => handleGoToDetail(val)}
                  >
                    <td className={Styles.w20}>{Date}</td>
                    <td className={Styles.w20}>{val?.requestId}</td>
                    <td className={Styles.w20}>{val?.userId?.mrNo}</td>
                    <td className={Styles.w20}>{val?.userId?.name}</td>
                    <td className={Styles.w20}>{val?.hotelId?.name}</td>
                    <td className={Styles.w20}>{ChickIn}</td>
                    <td className={Styles.w20}>{Chickout}</td>
                    <td className={Styles.w20}>{val?.paidByUserAmount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Hotel_Booking_Requests;

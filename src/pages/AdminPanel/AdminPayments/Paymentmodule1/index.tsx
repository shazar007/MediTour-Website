import React, { useEffect, useState } from "react";
import AdminNavBar from "../../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./PaymentMODULE1.module.css";
import { useNavigate } from "react-router-dom";
import TravelPayments from "./Travelpayment";
import InsurancePayment from "./InsurancePayment";
import HotelPayemts from "./HotelPayments";
import RentACarPayments from "./RentACarPayments";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import SearchFilter from "pages/AdminPanel/Components/SearchFilter";
import AmbulancePayments from "./AmbulancePayments";
import { PrimaryButton, RingLoader } from "shared/components";
import Vender from "pages/Home/HomeNavBar/JoinVender";
import {
  getPaymentAmbulance,
  getPaymentFlight,
  getPaymentHotel,
  getPaymentInsurance,
  getPaymentRentACar,
  getPaymentTour,
} from "shared/services";
export default function Paymentmodule1() {
  const [selectedOption, setSelectedOption] = useState("TravelAgency");
  const navigate = useNavigate();
  const handleGoToDetail = () => {
    navigate("/admin/Payments/ProceedPayment", {
      state: { VenderName: "VENDOR ", UserName: "USER NAME" },
    });
  };
  const [loading, setLoading] = useState(false);
  const [rentAcarPayment, setrentAcarPayment] = useState([]);
  const [InsurancePayments, setInsurancePayments] = useState([]);
  const [HotelPayments, setHotelPayments] = useState([]);
  const [ambulancePayments, setAmbulancePayments] = useState([]);
  const [flightPayments, setflightPayments] = useState([]);
  const [tourPayments, setTourPayments] = useState([]);
  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;
  const totalItems = length;
  const handleFetchBookingFlight = (pageno: number, search: any) => {
    setLoading(true);
    let mrNo = search;
    let paidToVendor = false;
    getPaymentFlight(pageno, mrNo, paidToVendor)
      .then((res: any) => {
        setflightPayments(res?.data.bookings);
        setLength(res?.data?.bookingsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  const handleFetchBookingTour = (pageno: number) => {
    setLoading(true);
    let mrNo = "";
    let paidToVendor = false;
    getPaymentTour(pageno, mrNo, paidToVendor)
      .then((res: any) => {
        setTourPayments(res?.data.bookings);
        setLength(res?.data?.bookingsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  const handleFetchBookingInsurance = (pageno: number) => {
    setLoading(true);
    let mrNo = "";
    let paidToVendor = false;
    getPaymentInsurance(pageno, mrNo, paidToVendor)
      .then((res: any) => {
        setInsurancePayments(res?.data.bookings);
        setLength(res?.data?.bookingsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  const handleFetchBookingRENT = (pageno: number) => {
    setLoading(true);
    let mrNo = "";
    let paidToVendor = false;
    getPaymentRentACar(pageno, mrNo, paidToVendor)
      .then((res: any) => {
        setrentAcarPayment(res?.data.bookings);
        setLength(res?.data?.bookingsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  const handleFetchBookingAmbulance = (pageno: number) => {
    setLoading(true);
    let mrNo = "";
    let paidToVendor = false;
    getPaymentAmbulance(pageno, mrNo, paidToVendor)
      .then((res: any) => {
        setAmbulancePayments(res?.data.bookings);
        setLength(res?.data?.bookingsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  const handleFetchBookingHotel = (pageno: number) => {
    setLoading(true);
    let mrNo = "";
    let paidToVendor = false;
    getPaymentHotel(pageno, mrNo, paidToVendor)
      .then((res: any) => {
        setHotelPayments(res?.data.bookings);
        setLength(res?.data?.bookingsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (selectedOption === "TravelAgency") {
      handleFetchBookingFlight(currentPage, search);
    }
    if (selectedOption === "TravelAgency") {
      handleFetchBookingTour(currentPage);
    }
    if (selectedOption === "RentaCar") {
      handleFetchBookingRENT(currentPage);
    }
    if (selectedOption === "Insurance") {
      handleFetchBookingInsurance(currentPage);
    }
    if (selectedOption === "Hotel") {
      handleFetchBookingHotel(currentPage);
    }
    if (selectedOption === "Ambulance") {
      handleFetchBookingAmbulance(currentPage);
    }
  }, [selectedOption]);

  const handleFetchData = (selected: any, page: number, keyword: any) => {
    if (selectedOption === "TravelAgency") {
      handleFetchBookingFlight(currentPage, keyword);
    }
    if (selectedOption === "TravelAgency") {
      handleFetchBookingTour(currentPage);
    }
    if (selectedOption === "RentaCar") {
      handleFetchBookingRENT(currentPage);
    }
    if (selectedOption === "Insurance") {
      handleFetchBookingInsurance(currentPage);
    }
    if (selectedOption === "Hotel") {
      handleFetchBookingHotel(currentPage);
    }
    if (selectedOption === "Ambulance") {
      handleFetchBookingAmbulance(currentPage);
    }
  };
  const handleRefresh = () => {
    if (selectedOption === "TravelAgency") {
      handleFetchBookingTour(currentPage);
    }
    if (selectedOption === "TravelAgency") {
      handleFetchBookingFlight(currentPage, search);
    }
    if (selectedOption === "RentaCar") {
      handleFetchBookingRENT(currentPage);
    }
    if (selectedOption === "Insurance") {
      handleFetchBookingInsurance(currentPage);
    }
    if (selectedOption === "Hotel") {
      handleFetchBookingHotel(currentPage);
    }
    if (selectedOption === "Ambulance") {
      handleFetchBookingAmbulance(currentPage);
    }
  };
  const handleNextPage = () => {
    let itemTorender = currentPage * 10;
    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      handleFetchData(selectedOption, currentPage + 1, search);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      handleFetchData(selectedOption, currentPage - 1, search);
    }
  };
  const handleSearch = () => {
    setCurrentPage(1);
    handleFetchData(selectedOption, 1, search);
  };

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Payments Pending" />
      </div>
      <div
        className={classNames(Styles.mainOuter)}
        style={{
          padding: "  0.83%",
        }}
      >
        <div className={classNames(commonStyles.flxBetween)}>
          <div className={classNames(commonStyles.flx)}>
            <select
              className={Styles.customSelect}
              name="PaymentType"
              id="PaymentType"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option className={Styles.customOption} value="TravelAgency">
                Travel Agency
              </option>
              <option className={Styles.customOption} value="Hotel">
                Hotel
              </option>
              <option className={Styles.customOption} value="RentaCar">
                Rent a Car
              </option>
              <option className={Styles.customOption} value="Insurance">
                Insurance
              </option>
              <option className={Styles.customOption} value="Ambulance">
                Ambulance
              </option>
            </select>
            {loading ? (
              <div className={Styles.loader}>
                <RingLoader color={"#0D47A1"} size={30} />
              </div>
            ) : (
              <TbRefresh className={Styles.refresh} onClick={handleRefresh} />
            )}
            <SearchFilter
              vender={true}
              search={search}
              checkbox={true}
              setSearch={setSearch}
              handleSearch={handleSearch}
            />
            <div style={{ marginLeft: "32px", width: "160px" }}>
              <PrimaryButton
                children={"Proceed"}
                colorType={"blue"}
                onClick={handleGoToDetail}
              />
            </div>
          </div>

          <NewPagination
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
            startItem={(currentPage - 1) * itemsPerPage + 1}
            endItem={Math.min(currentPage * itemsPerPage, length)}
            totalItems={totalItems}
          />
        </div>{" "}
        {selectedOption === "TravelAgency" ? (
          <TravelPayments Flight={flightPayments} Tour={tourPayments} />
        ) : selectedOption === "Insurance" ? (
          <InsurancePayment Data={InsurancePayments} />
        ) : selectedOption === "Ambulance" ? (
          <AmbulancePayments Data={ambulancePayments} />
        ) : selectedOption === "Hotel" ? (
          <HotelPayemts Data={HotelPayments} />
        ) : (
          <RentACarPayments Data={rentAcarPayment} />
        )}
      </div>
    </div>
  );
}

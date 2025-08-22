import React, { useEffect, useState } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import commonStyles from "shared/utils/common.module.css";
import classNames from "classnames";
import Styles from "./adminbooking.module.css";
import { TbRefresh } from "react-icons/tb";
import NewPagination from "shared/components/NewPagination/NewPagination";
import AdRentAcarTable from "./RentaCar/AdRentAcarTable";
import AdInsurancetable from "./AdminInsurance";
import AdAmblanceTables from "./AdminAmblance";
import SearchFilter from "../Components/SearchFilter";
import AdTravelAgencyTables from "./BookingTravel";
import {
  getbookingAmbulance,
  getbookingFlights,
  getbookingHotel,
  getbookingInsurance,
  getbookingRentAcar,
  getbookingTour,
} from "shared/services";
import { RingLoader } from "shared/components";
import AdHoteltable from "./RentaCar/AdHoteltable";

export default function AdminBooking() {
  const [selectedOption, setSelectedOption] = useState("Hotels");
  const [loading, setLoading] = useState(false);
  const [BookingRentACar, setbookingRentACar] = useState([]);
  const [BookingInsurance, setbookingInsurance] = useState([]);
  const [BookingAmbluance, setbookingAmbluance] = useState([]);
  const [BookingFlights, setbookingFlights] = useState([]);
  const [BookingTour, setbookingTour] = useState([]);
  const [BookingHotel, setbookingHotel] = useState([]);
  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageno, setPageno] = useState(1);
  const itemsPerPage = 10;
  const totalItems = length;
  const [search, setSearch] = useState("");
  const [type, setType] = useState<any>("");

  const handleFetchBookingHotel = (page: number, searchText: string) => {
    setLoading(true);
    getbookingHotel(page, searchText)
      .then((res: any) => {
        setbookingHotel(res?.data.bookings);
        setLength(res?.data?.bookingsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  const handleFetchBookingRentCar = (page: number) => {
    setLoading(true);
    getbookingRentAcar(page)
      .then((res: any) => {
        setbookingRentACar(res?.data.bookings);
        setLength(res?.data?.bookingsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  const handleFetchBookingInsurance = (page: number) => {
    setLoading(true);
    getbookingInsurance(page)
      .then((res: any) => {
        setbookingInsurance(res?.data.bookings);
        setLength(res?.data?.bookingsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  const handleFetchBookingFlights = (page: number) => {
    setLoading(true);
    getbookingFlights(page)
      .then((res: any) => {
        setbookingFlights(res?.data.bookings);
        setLength(res?.data?.bookingsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  const handleFetchBookingTour = (page: number) => {
    setLoading(true);
    getbookingTour(page)
      .then((res: any) => {
        setbookingTour(res?.data.bookings);
        setLength(res?.data?.bookingsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };
  const handleFetchAmbulance = (page: number) => {
    setLoading(true);
    getbookingAmbulance(page)
      .then((res: any) => {
        setbookingAmbluance(res?.data.bookings);
        setLength(res?.data?.bookingsLength);
      })
      .catch((err: any) => {
        alert(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = () => {
    setCurrentPage(1);
    handleFetchData(selectedOption, 1, search);
  };

  const handleFetchData = (selected: any, page: number, searchText: string) => {
    if (selected === "Hotels") {
      handleFetchBookingHotel(page, searchText);
    }
    if (selected === "Renacar") {
      handleFetchBookingRentCar(page);
    }
    if (selected === "Insurance") {
      handleFetchBookingInsurance(page);
    }
    if (selected === "Ambulance") {
      handleFetchAmbulance(page);
    }
    if (selected === "TravelAgency" && type === "Flight") {
      handleFetchBookingFlights(page);
    }
    if (selected === "TravelAgency" && type === "Tour") {
      handleFetchBookingTour(page);
    }
  };

  useEffect(() => {
    setPageno(1);
    setCurrentPage(1);
    handleFetchData(selectedOption, 1, "");
  }, [type]);

  const handleRefresh = () => {
    setPageno(1);
    setCurrentPage(1);
    setSearch("");
    handleFetchData(selectedOption, 1, "");
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setPageno(1);
    setCurrentPage(1);
    handleFetchData(e.target.value, 1, search);
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

  return (
    <div className={classNames(commonStyles.col12)}>
      <div className={Styles.Navouter}>
        <AdminNavBar labelText="Booking" />
      </div>
      <div className={classNames(Styles.mainOuter)}>
        <div className={classNames(Styles.flxBetween)}>
          <div className={classNames(commonStyles.flx)}>
            <div>
              <select
                className={Styles.customSelect}
                name="orderType"
                id="orderType"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option className={Styles.customOption} value="Hotels">
                  Hotels
                </option>
                <option className={Styles.customOption} value="TravelAgency">
                  Travel Agency
                </option>
                <option className={Styles.customOption} value="Renacar">
                  Rent a car
                </option>
                <option className={Styles.customOption} value="Insurance">
                  Insurance
                </option>
                <option className={Styles.customOption} value="Ambulance">
                  Ambulance
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
        <div>
          {selectedOption === "Hotels" ? (
            <AdHoteltable Data={BookingHotel} />
          ) : selectedOption === "TravelAgency" ? (
            <AdTravelAgencyTables
              FlightData={BookingFlights}
              TourData={BookingTour}
              setType={setType}
            />
          ) : selectedOption === "Renacar" ? (
            <AdRentAcarTable Data={BookingRentACar} />
          ) : selectedOption === "Insurance" ? (
            <AdInsurancetable Data={BookingInsurance} />
          ) : selectedOption === "Ambulance" ? (
            <AdAmblanceTables Data={BookingAmbluance} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

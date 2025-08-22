import { Link, Routes, Route, Outlet } from "react-router-dom";
import mainTravelstyle from "../../pages/TravelTourism/mainTravel.module.css";
import classNames from "classnames";
import Hotelauth from "./Hotel/HotelAuthRoutes";
import Rentcarauth from "./RentCar/RentCarAuthRoutes";
import TravelAgencyauth from "./TravelAgency/TravelAgencyAuth";
import { useDispatch, useSelector } from "react-redux";
import { setTravelSelectedRoute } from "shared/redux";

function TravelTourismAuthRoutes() {
  const { travelSelectedRoute } = useSelector(
    (state: any) => state.root.common
  );
  const dispatch = useDispatch();

  const setSelectedOption = (route: any) => {
    dispatch(setTravelSelectedRoute(route));
  };

  return (
    <>
      {/* Navigation Links */}
      <nav
        className={classNames(mainTravelstyle.navbar, {
          [mainTravelstyle.hotel]: travelSelectedRoute === "hotel/login",
          [mainTravelstyle.hotelsgin]: travelSelectedRoute === "hotel/signup",
          [mainTravelstyle.rentAcar]: travelSelectedRoute === "rentacar/login",
          [mainTravelstyle.rentAcar]: travelSelectedRoute === "rentacar/signup",
          [mainTravelstyle.travelAgency]:
            travelSelectedRoute === "agency/login",
          [mainTravelstyle.travelAgency]:
            travelSelectedRoute === "travelAgency/signup",
        })}
      >
        <Link
          className={classNames(mainTravelstyle.navvlink, {
            [mainTravelstyle.selected]: travelSelectedRoute === "hotel/login",
          })}
          to="hotel/login"
          onClick={() => setSelectedOption("hotel/login")}
        >
          Hotel
        </Link>
        <Link
          className={classNames(mainTravelstyle.navvlink, {
            [mainTravelstyle.selected]:
              travelSelectedRoute === "rentacar/login",
          })}
          to="rentacar/login"
          onClick={() => setSelectedOption("rentacar/login")}
        >
          Rent A Car
        </Link>
        <Link
          className={classNames(mainTravelstyle.navvlink, {
            [mainTravelstyle.selected]: travelSelectedRoute === "agency/login",
          })}
          to="agency/login"
          onClick={() => setSelectedOption("/travelagency/login")}
        >
          Travel Agency
        </Link>
        <Outlet />
      </nav>

      {/* Route Handling */}
      <Routes>
        <Route path="hotel/*" element={<Hotelauth />} />
        <Route path="rentAcar/*" element={<Rentcarauth />} />
        <Route path="travelAgency/*" element={<TravelAgencyauth />} />
      </Routes>
    </>
  );
}

export default TravelTourismAuthRoutes;

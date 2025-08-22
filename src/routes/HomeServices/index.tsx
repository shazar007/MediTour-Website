import { Link, Routes, Route, Outlet } from "react-router-dom";
import mainTravelstyle from "../../pages/TravelTourism/mainTravel.module.css";
import classNames from "classnames";
import Ambulanceauth from "./AmbulanceRoutes/AmbulanceAuthRoutes";
import { useDispatch, useSelector } from "react-redux";
import { setHomeServiceSelectedRoute } from "shared/redux";

function HomeServicesAuthRoutes(props: any) {
  const { homeServiceSelectedRoute } = useSelector(
    (state: any) => state.root.common
  );
  const dispatch = useDispatch();

  const setSelectedOption = (route: any) => {
    dispatch(setHomeServiceSelectedRoute(route));
  };

  return (
    <>
      <nav
        className={classNames(mainTravelstyle.navbar, {
          [mainTravelstyle.ambulance]:
            homeServiceSelectedRoute === "ambulance/login",
          [mainTravelstyle.ambulancesign]:
            homeServiceSelectedRoute === "ambulanceservices/signup",
        })}
      >
        <Link
          className={classNames(mainTravelstyle.navvlink, {
            [mainTravelstyle.selected]:
              homeServiceSelectedRoute === "ambulance/login",
          })}
          to="ambulance/login"
          onClick={() => setSelectedOption("ambulance/login")}
        >
          Ambulance
        </Link>
        <Outlet />
      </nav>
      <Routes>
        <Route path="ambulanceservices/*" element={<Ambulanceauth />} />
      </Routes>
    </>
  );
}

export default HomeServicesAuthRoutes;

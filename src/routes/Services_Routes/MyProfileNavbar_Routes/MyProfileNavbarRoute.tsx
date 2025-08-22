import MyProfileNavbar from "pages/Home/HomeNavBar/NavBarr/MyProfileNavbar";
import { Routes, Route } from "react-router-dom";

const MyProfileNavbarRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MyProfileNavbar />} />
    </Routes>
  );
};

export default MyProfileNavbarRoute;

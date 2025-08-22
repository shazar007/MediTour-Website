import MyOrderHome from "pages/Home/HomeNavBar/NavBarr/MyOrder.tsx/MyOrderHome";
import { Routes, Route } from "react-router-dom";

const MyOrderRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MyOrderHome />} />
    </Routes>
  );
};

export default MyOrderRoute;

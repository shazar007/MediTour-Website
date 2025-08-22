import PaymentNavbar from "pages/Home/HomeNavBar/NavBarr/PaymentNavbar";
import { Routes, Route } from "react-router-dom";

const PaymentNavbarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PaymentNavbar />} />
    </Routes>
  );
};

export default PaymentNavbarRoutes;

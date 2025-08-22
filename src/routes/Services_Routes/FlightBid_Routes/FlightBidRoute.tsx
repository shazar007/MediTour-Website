import AddFlight from "pages/TravelTourism/Travel agency/TicketRequest/BidTicketFormTravel";
import { Routes, Route } from "react-router-dom";

const AddFlightRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AddFlight />} />
    </Routes>
  );
};

export default AddFlightRoute;

import Favorites from "pages/Home/Favoraites";
import { Routes, Route } from "react-router-dom";

const FavoritesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Favorites />} />
    </Routes>
  );
};

export default FavoritesRoutes;

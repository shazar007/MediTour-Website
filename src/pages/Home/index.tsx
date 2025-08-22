import { useEffect } from "react";
import HomePage from "./HomeNavBar";

export default function Home() {
  useEffect(() => {
    document.title = "MediTour Global | Home";
    window.scrollTo(0, 0);
  });
  return <HomePage />;
}

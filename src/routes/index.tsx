import { useEffect, useRef, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Wrapper } from "shared/components";
import { Home, Room } from "pages";
import { useDispatch, useSelector } from "react-redux";
import NavBarr from "pages/Home/HomeNavBar/NavBarr";
import axios from "axios";
import {
  setExchangeRate,
  setSystemType,
  set_query,
  logOutUser,
} from "shared/redux";

// Lazy imports
const LaboratoryAuthRoutes = lazy(() => import("./Laboratory/authRoutes"));
const LaboratoryMainRoutes = lazy(() => import("./Laboratory/mainRoutes"));
const PharmacyAuthRoutes = lazy(() => import("./Pharmacy/authRoutes"));
const PharmacyMainRoutes = lazy(() => import("./Pharmacy/MainRoutes"));
const HomeServicesAuthRoutes = lazy(() => import("./HomeServices"));
const TravelTourismAuthRoutes = lazy(
  () => import("./TravelTourism/traveltourism")
);
const DonationAuthRoutes = lazy(() => import("./Donation/Donationauthroutes"));
const InsuranceAuthRoutes = lazy(() => import("./Insurance/InsuranAuthRoutes"));
const HospitalMainRoutes = lazy(
  () => import("./Hospital_Routes/hospital_main")
);
const AmbulanceMainRoutes = lazy(
  () => import("./HomeServices/AmbulanceRoutes/AmbulanceMainRoutes")
);
const InsuranceMainRoutes = lazy(
  () => import("./Insurance/InsuranceMianRoutes")
);
const DonationMainRoutes = lazy(() => import("./Donation/DonationMainRoutes"));
const RentACarMainRoutes = lazy(
  () => import("./TravelTourism/RentCar/RentCarMainRoutes")
);
const TravelAgencyMainRoutes = lazy(
  () => import("./TravelTourism/TravelAgency/TravelAgencyMain")
);
const Vender = lazy(() => import("pages/Home/HomeNavBar/JoinVender"));
const AdminLogin = lazy(() => import("pages/AdminPanel/Login"));
const AdminMianRoutes = lazy(() => import("pages/AdminPanel"));
const AboutUs = lazy(() => import("pages/Home/HomeNavBar/AboutUs"));
const ContactUs = lazy(() => import("pages/Home/ContactUs"));
const Treatment = lazy(() => import("pages/Home/HomeNavBar/Treatment"));
const PatientGuide = lazy(() => import("pages/Home/HomeNavBar/PatientGuide"));
const TreatmentDetails = lazy(
  () => import("pages/Home/HomeNavBar/Treatment/TreatmentDetails")
);
const FreeOpd = lazy(() => import("pages/Home/FreeOpd"));
const PrivactPolicys = lazy(
  () => import("pages/Home/HomeNavBar/PrivactPolicy")
);
const FAQpage = lazy(() => import("pages/Home/HomeNavBar/FAQ'Spage"));
const Doc_Auth_Routes = lazy(() => import("./Doctor_Routes/doc_auth"));
const Doc_Main_Routes = lazy(() => import("./Doctor_Routes/doc_main"));
const Hospital_Auth_Routes = lazy(
  () => import("./Hospital_Routes/hospital_auth")
);
const PharmaceuticalAuthRoutes = lazy(
  () => import("./Pharmaceutical/authRoutes")
);
const Pharmaceutical_MainRoutes = lazy(
  () => import("./Pharmaceutical/MainRoutes")
);
const UserAuthRoutes = lazy(() => import("./UserLogin/UserLoginAuth"));
const ServiceRoutes = lazy(() => import("./Services_Routes/ServiceRoutes"));
const CenteredLayout = lazy(
  () => import("pages/Home/HomeNavBar/OurServices/NewServicesCarts")
);
const AmbulanceLoginAuth = lazy(
  () => import("./HomeServices/AmbulanceRoutes/AmbulanceLoginAuth")
);
const TravelAgencyLoginAuth = lazy(
  () => import("./TravelTourism/TravelAgency/TravelAgencyLoginAuth")
);
const RentACarLoginAuth = lazy(
  () => import("./TravelTourism/RentCar/RentACarLoginAuth")
);
const HotelLoginAuthRoute = lazy(
  () => import("./TravelTourism/Hotel/HotelLoginAuthRoute")
);
const CongratsScreen = lazy(() => import("pages/CongratsScreen"));
const CompanyLogin = lazy(() => import("pages/CompanyPanel/Login"));
const GreenFlagLogin = lazy(() => import("pages/GreenFlagPanel/Login"));
const MainGreenFlagPanelRoutes = lazy(() => import("pages/GreenFlagPanel"));
const Questionnaire = lazy(() => import("pages/Questionnaire"));
const WhyPakistan = lazy(() => import("pages/Home/HomeNavBar/WhyPakistan"));
const HotelMainAuth = lazy(() => import("./TravelTourism/Hotel/HotelMainAuth"));
const ExploreAll = lazy(() => import("pages/Home/HomeNavBar/ExploreAll"));

// doctor-type system types
const doctorTypes = [
  "doctor",
  "physiotherapist",
  "nutritionist",
  "psychologist",
  "paramedic",
];

// hidden routes regexes
const hiddenRoutes = [
  "admin/login",
  "company/login",
  "user/*",
  "laboratory/*",
  "pharmacy/*",
  "pharmaceutical/*",
  "paramedic/*",
  "traveltourism/",
  "hotel/*",
  "travelagency/*",
  "donation/*",
  "insurance/*",
  "rentacar/*",
  "ambulance/*",
  "greentourism/login",
  "traveltourism/travelAgency/signup",
  "traveltourism/hotel/signup",
  "traveltourism/rentAcar/signup",
  "homeservices/ambulanceservices/signup",
  "traveltourism/travelAgency/forgot-password",
  "traveltourism/rentAcar/forgot-password",
  "traveltourism/hotel/forgot-password",
  "homeservices/ambulanceservices/forgot-password",
  "questionnaire",
  "congratsScreen",
  `:systemType/signup`,
  `:systemType/*`,
  "services/paymentDetail",
  "paymentDetail/*",
  "traveltourism/rentacar/ResetPassword",
  `traveltourism/travelAgency/ResetPassword`,
  `traveltourism/hotel/ResetPassword`,
  `:systemType/ResetPassword`,
];
const hiddenRouteRegexes = hiddenRoutes.map((route) => {
  const normalizedRoute = `/${route}`;
  return new RegExp(
    `^${normalizedRoute.replace(/\*/g, ".*").replace(/:systemType/g, "[^/]+")}$`
  );
});
const shouldHideNavBar = (path: string) => {
  if (path.includes("/treatment/Details")) {
    return false;
  }
  if (path.startsWith("/services/")) {
    return false;
  }
  return hiddenRouteRegexes.some((regex) => regex.test(path));
};

export default function AppRoutes(props: any) {
  const { isLoggedIn, systemType } = useSelector(
    (state: any) => state.root.common
  );
  const { logOutFlag, setLogOutFlag } = props;

  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Suspense fallback={<div>Loading...</div>}>
        {isLoggedIn ? (
          <>
            {systemType === "user" ? (
              <BeforLogin
                logOutFlag={logOutFlag}
                setLogOutFlag={setLogOutFlag}
              />
            ) : (
              <AfterLogin
                logOutFlag={logOutFlag}
                setLogOutFlag={setLogOutFlag}
              />
            )}
          </>
        ) : (
          <BeforLogin />
        )}
      </Suspense>
    </Router>
  );
}

const BeforLogin = (props: any) => {
  const { isLoggedIn, systemType } = useSelector(
    (state: any) => state.root.common
  );
  const { logOutFlag, setLogOutFlag } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showNavBar, setShowNavBar] = useState(true);
  const location = useLocation();
  console.log("🚀 ~ BeforLogin ~ location:", location);

  const navRef = useRef<any>(null);
  const [navHeight, setNavHeight] = useState<number>(0);

  const fetchAndStoreExchangeRate = async () => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/437c285364c166fcafc883c0/pair/PKR/USD`
      );
      const rate = response.data.conversion_rate;
      localStorage.setItem("exchangeRate", JSON.stringify(rate));
      localStorage.setItem("lastFetched", new Date().toISOString());
      dispatch(setExchangeRate(JSON.stringify(rate)));
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    const lastFetched = localStorage.getItem("lastFetched");
    const currentDate = new Date();
    let fetchNewRate = true;
    if (lastFetched) {
      const lastFetchedDate = new Date(lastFetched);
      const hoursDifference =
        (currentDate.getTime() - lastFetchedDate.getTime()) / (1000 * 60 * 60);
      if (hoursDifference < 24) {
        fetchNewRate = false;
      }
    }
    if (fetchNewRate) {
      fetchAndStoreExchangeRate();
    }
  });

  useEffect(() => {
    if (logOutFlag && systemType === "user") {
      handleLogout();
    }
  }, [logOutFlag]);

  const handleLogout = () => {
    dispatch(logOutUser());
    setLogOutFlag(false);
    navigate("/");
  };

  useEffect(() => {
    setShowNavBar(!shouldHideNavBar(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    if (!navRef.current) return;

    const observer = new ResizeObserver(() => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    });

    observer.observe(navRef.current);

    return () => observer.disconnect();
  }, [showNavBar]);

  useEffect(() => {
    const { type, query } = parseQueryParams(searchParams);
    if (type) {
      dispatch(setSystemType(type));
      dispatch(set_query(query));
    }
    if (!isLoggedIn && type) {
      navigate(`/${type}/login`);
    }
  }, [searchParams, isLoggedIn]);

  const staticRoutes = [
    { path: "aboutUs/", element: <AboutUs /> },
    { path: "FAQs/", element: <FAQpage /> },
    { path: "contactUs/", element: <ContactUs /> },
    { path: "congratsScreen/", element: <CongratsScreen /> },
    { path: "questionnaire/", element: <Questionnaire /> },
    { path: "treatment/", element: <Treatment /> },
    { path: "privactpolicys/", element: <PrivactPolicys /> },
    { path: "freeOPD/", element: <FreeOpd /> },
    { path: "tourism/", element: <WhyPakistan /> },
    { path: "ExploreAll/", element: <ExploreAll /> },
    { path: "treatment/Details", element: <TreatmentDetails /> },
    { path: "patientGuide/", element: <PatientGuide /> },
    { path: "admin/login", element: <AdminLogin /> },
    { path: "company/login", element: <CompanyLogin /> },
    { path: "greentourism/login", element: <GreenFlagLogin /> },
  ];

  return (
    <Wrapper>
      {showNavBar && (
        <div
          ref={navRef}
          style={{
            position: "sticky",
            top: "0px",
            zIndex: 9999,
            width: "100%",
            margin: "0 auto",
          }}
        >
          <NavBarr />
        </div>
      )}
      <div
        style={
          showNavBar
            ? {
                position: "relative",
                marginTop: showNavBar ? `-${navHeight}px` : "0px",
              }
            : {}
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="laboratory/*" element={<LaboratoryAuthRoutes />} />
          <Route path="pharmacy/*" element={<PharmacyAuthRoutes />} />
          <Route
            path="pharmaceutical/*"
            element={<PharmaceuticalAuthRoutes />}
          />

          {doctorTypes.includes(systemType) && (
            <Route path={`${systemType}/*`} element={<Doc_Auth_Routes />} />
          )}
          {systemType === "hospital" && (
            <Route
              path={`${systemType}/*`}
              element={<Hospital_Auth_Routes />}
            />
          )}
          <Route path="homeservices/*" element={<HomeServicesAuthRoutes />} />
          <Route path="traveltourism/*" element={<TravelTourismAuthRoutes />} />
          <Route path="hotel/*" element={<HotelLoginAuthRoute />} />
          <Route path="rentacar/*" element={<RentACarLoginAuth />} />
          <Route path="travelagency/*" element={<TravelAgencyLoginAuth />} />
          <Route path="donation/*" element={<DonationAuthRoutes />} />
          {systemType === "insurance" && (
            <Route path="insurance/*" element={<InsuranceAuthRoutes />} />
          )}
          <Route path="Meeting/Room" element={<Room />} />
          <Route path="ambulance/*" element={<AmbulanceLoginAuth />} />
          <Route path="joinVender/" element={<Vender />} />
          <Route path="ourServices/*" element={<CenteredLayout />} />
          <Route path="services/*" element={<ServiceRoutes />} />
          <Route path="user/*" element={<UserAuthRoutes />} />

          {staticRoutes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Routes>
      </div>
    </Wrapper>
  );
};

const AfterLogin = (props: any) => {
  const { systemType } = useSelector((state: any) => state.root.common);
  const { logOutFlag, setLogOutFlag } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (logOutFlag) {
      handleLogout();
    }
  }, [logOutFlag]);

  const handleLogout = () => {
    dispatch(logOutUser());
    navigate(`/${systemType}/login`);
    setLogOutFlag(false);
  };

  return (
    <>
      <div>
        {systemType === "laboratory" && <LaboratoryMainRoutes />}
        {systemType === "pharmacy" && <PharmacyMainRoutes />}
        {systemType === "hospital" && <HospitalMainRoutes />}
        {doctorTypes.includes(systemType) && (
          <Doc_Main_Routes systemType={systemType} />
        )}
        {systemType === "ambulance" && <AmbulanceMainRoutes />}
        {systemType === "hotel" && <HotelMainAuth />}
        {systemType === "rentacar" && <RentACarMainRoutes />}
        {systemType === "travelagency" && <TravelAgencyMainRoutes />}
        {systemType === "donation" && <DonationMainRoutes />}
        {systemType === "insurance" && <InsuranceMainRoutes />}
        {systemType === "admin" && <AdminMianRoutes />}
        {systemType === "pharmaceutical" && <Pharmaceutical_MainRoutes />}
        {systemType === "company" && <HospitalMainRoutes />}
        {systemType === "greentourism" && <MainGreenFlagPanelRoutes />}
      </div>
    </>
  );
};

// helper
function parseQueryParams(searchParams: URLSearchParams) {
  const type = searchParams.get("type");
  const travelCompanyId = searchParams.get("travelCompanyId");
  const name = travelCompanyId
    ? searchParams.get("travelCompanyName")
    : searchParams.get("companyName") || searchParams.get("hospitalName");

  return {
    type,
    query: {
      travelCompanyId,
      companyId: searchParams.get("companyId"),
      hospitalId: searchParams.get("hospitalId"),
      name,
      departmentId: searchParams.get("departmentId"),
    },
  };
}

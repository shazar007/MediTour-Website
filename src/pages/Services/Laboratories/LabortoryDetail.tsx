import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import style from "./Labdetail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Footerr from "pages/Home/HomeNavBar/Footer";
import { useDispatch, useSelector } from "react-redux";
import commonstyles from "shared/utils/common.module.css";
import {
  getAll_AdminTestCategories,
  getAll_Tests,
  getSingle_UserLaboratory,
} from "shared/services/UserService";
import { setObj } from "shared/redux";
import CustomLoader from "shared/components/New_Loader/Loader";
import NewPagination from "shared/components/NewPagination/NewPagination";
import { useTranslation } from "react-i18next";
import labcardicon from "assets/images/labcardicon.png";
import { Modal, Checkbox } from "@mui/material";
import support from "assets/images/labcardsupport.png";
import labcardkey from "assets/images/labcardkey.png";
import loaction from "assets/images/tdesign_location-filled.png";
import labcardsecurity from "assets/images/labcardsecurity.png";
import { useQuery } from "@tanstack/react-query";
import { useDirection } from "shared/utils/DirectionContext";
import { FiSearch } from "react-icons/fi";

const LabortoryDetail = () => {
  const [selectedItems, setSelecteditems] = useState<any>([]);
  const [activeButton, setActiveButton] = useState("About");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const textRef = useRef<HTMLParagraphElement>(null);
  const { t }: any = useTranslation();
  const { isRtl } = useDirection();
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const { location, isLoggedIn } = useSelector(
    (state: any) => state?.root?.common
  );

  const { state }: any = useLocation();
  const id = location.state?.id;

  let LabData = state;
  useEffect(() => {
    setLoading(true);
    getSingleLab(currentPage);
  }, [currentPage, activeButton]);

  const getSingleLab = (page: number) => {
    const params = {
      labId: state?._id,
      lat: location?.latitude,
      long: location?.longitude,
      page: page,
    };

    getSingle_UserLaboratory(params)
      .then((res: any) => {
        allAdmin_Categories();
      })
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const allAdmin_Categories = () => {
    getAll_AdminTestCategories()
      .then((res: any) => {})
      .catch((err: any) => {})
      .finally(() => setLoading(false));
  };

  const params = {
    testName: "",
    page: currentPage,
    labId: state?._id,
  };
  const { data } = useQuery({
    queryKey: ["LabTests", params],
    queryFn: () => getAll_Tests(params),
    staleTime: 5 * 60 * 1000,
  });
  let LabTests = data?.data?.tests;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleNextPage = () => {
    if (data?.data?.nextPage) {
      setCurrentPage(data.data.nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (data?.data?.previousPage) {
      setCurrentPage(data.data.previousPage);
    }
  };

  useEffect(() => {
    if (data?.data?.totalTests) {
      setTotalItems(data?.data?.totalTests);
    }
  }, [data, totalItems]);

  const handlenavigate = async (
    LabData: any,
    id: any,
    preference: "home" | "lab"
  ) => {
    if (isLoggedIn) {
      await dispatch(setObj(selectedItems));
      navigate("/services/laboratory/LabBookingPayment", {
        state: { LabData, selectedItems, selectedPreference: preference },
      });
    } else {
      navigate("/user/login", {
        state: {
          state: state,
          loginFrom: "lab",
        },
        replace: true,
      });
    }
  };

  const filteredLabTests = LabTests?.filter((item: any) => {
    if (!searchTerm.trim()) return true;

    const words = item.testNameId.name.toLowerCase().split(/\s+/);
    const searchWords = searchTerm.toLowerCase().split(/\s+/);

    return searchWords.some((searchWord: string) =>
      words.some((word: string) => word === searchWord)
    );
  });

  useEffect(() => {
    const checkLines = () => {
      if (textRef.current) {
        const lineHeight = parseFloat(
          getComputedStyle(textRef.current).lineHeight || "0"
        );
        const lines = textRef.current.scrollHeight / lineHeight;
        setShowReadMore(lines > 4);
      }
    };

    checkLines();
    window.addEventListener("resize", checkLines);
    return () => window.removeEventListener("resize", checkLines);
  }, [state?.description]);

  const handleCheckboxChange = (item: any) => {
    setSelecteditems((prevItems: any) => {
      const exists = prevItems.some((i: any) => i._id === item._id);
      return exists
        ? prevItems.filter((i: any) => i._id !== item._id)
        : [...prevItems, item];
    });
  };

  return (
    <>
      <div className={classNames(style.maincontainer)}>
        <div className={classNames(style.labcontainer)}>
          <div className={classNames(style.firstcolumn)}>
            <section className={classNames(style.mainsection)}>
              <div className={classNames(style.imgcontainer)}>
                <img
                  src={state?.logo}
                  alt="DetalLogo"
                  className={classNames(style.labimg)}
                />
              </div>
              <div className={classNames(style.detailsection)}>
                <div style={{ marginTop: "10px" }}>
                  <p className={style.labname}>{state?.name || t("labName")}</p>
                  <div
                    className={classNames(commonstyles.mt16, commonstyles.mb16)}
                  >
                    <p className={style.verifiedtext}>PHC {t("verified")}</p>
                  </div>
                </div>

                <section className={classNames(style.bottomsection)}>
                  <LabBottom
                    text={`${state?.tests?.length || "0"} ${t("test")}`}
                    img={labcardicon}
                  />
                  {/* <LabBottom text="10 Cities" img={labcardcity} /> */}

                  <LabBottom text={state?.location?.address} img={loaction} />
                </section>
              </div>
            </section>
            <section className={classNames(style.aboutsection)}>
              <p className={style.abouttext}>{t("about")}</p>

              <div
                className={classNames(style.aboutdetailsection, {
                  [style.expanded]: isExpanded,
                })}
              >
                <p
                  ref={textRef}
                  className={style.aboutdetailtext}
                  style={
                    isRtl
                      ? {
                          textAlign: "justify",
                          textAlignLast: "left",
                          margin: "10px 0",
                        }
                      : {}
                  }
                >
                  {state?.description}
                </p>

                {showReadMore && (
                  <span
                    className={style.readmore}
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? t("readLess") : t("readMore")}
                  </span>
                )}
              </div>
            </section>

            <section className={classNames(style.testsection)}>
              <p className={style.abouttext}>{t("chughtaiLabTestRates")}</p>

              <div className={style.tablecontainer}>
                {/* Title Row */}
                <div
                  style={{ paddingBottom: "8px" }}
                  className={classNames(style.tablerow)}
                >
                  <p
                    className={style.titletext}
                    style={isRtl ? { lineHeight: "24px" } : {}}
                  >
                    {t("testName")}
                  </p>
                  <p
                    className={style.titletext}
                    style={isRtl ? { lineHeight: "24px" } : {}}
                  >
                    {t("price")}
                  </p>
                </div>{" "}
                <div className={classNames(style.tablerow)}>
                  <FiSearch
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "10px",
                    }}
                  />

                  <input
                    type="text"
                    placeholder={t("searchHere")}
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#7D7D7D",
                      outline: "none",
                      fontSize: "16px",
                      height: "38px",
                    }}
                  />
                </div>
                {filteredLabTests?.map((item: any) => (
                  <div key={item.id} className={classNames(style.tablerow)}>
                    <div
                      style={{
                        display: "flex",
                        gap: "0 10px",
                        alignItems: "center",
                        width: "60%",
                      }}
                    >
                      <Checkbox
                        sx={{ width: "16px", height: "16px" }}
                        className={style.checkBoxx}
                        onChange={() => handleCheckboxChange(item)}
                        checked={selectedItems.some(
                          (i: any) => i._id === item._id
                        )}
                      />

                      <p className={style.itemlisttext}>
                        {item.testNameId.name}
                      </p>
                    </div>

                    <div className={style.pricecontainer}>
                      <p className={style.pricevalue}>
                        {t("price")}&nbsp;<span>{item.userAmount}</span>
                      </p>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginTop: "12px",
                  }}
                >
                  <NewPagination
                    onNext={handleNextPage}
                    onPrevious={handlePreviousPage}
                    startItem={(currentPage - 1) * itemsPerPage + 1}
                    endItem={Math.min(currentPage * itemsPerPage, totalItems)}
                    totalItems={totalItems}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className={classNames(style.secoundtcolumn)}>
            <div className={classNames(style.bookingcard)}>
              <p style={{ marginBottom: "8px" }} className={style.abouttext}>
                {t("requestaConsult")}
              </p>

              <p className="{style.deatiltext}">{t("sendRequestsupport")}</p>

              <div style={{ marginTop: "16px", marginBottom: "36px" }}>
                {!showNumber && (
                  <button
                    className={style.cardhelplbutton}
                    onClick={() => setShowNumber(true)}
                  >
                    {t("callHelpline")}
                  </button>
                )}

                {showNumber && (
                  <p dir={isRtl ? "rtl" : "ltr"}>
                    <span style={{ direction: "ltr", unicodeBidi: "embed" }}>
                      +92-42-37885101-4
                    </span>
                  </p>
                )}
              </div>

              <p className={style.abouttext}>{t("selectYourPreference")}</p>

              <div>
                <button
                  className={
                    selectedItems.length > 0
                      ? style.activeButton
                      : style.bookbtn
                  }
                  onClick={() => handlenavigate(LabData, id, "home")}
                  disabled={selectedItems.length === 0}
                >
                  {t("bookHomeSample")}
                </button>

                <button
                  className={
                    selectedItems.length > 0
                      ? style.activeButton
                      : style.bookbtn
                  }
                  onClick={() => handlenavigate(LabData, id, "lab")}
                  disabled={selectedItems.length === 0}
                >
                  {t("bookLabVisit")}
                </button>
              </div>
            </div>

            <div className={classNames(style.whycard)}>
              <p style={{ marginBottom: "8px" }} className={style.abouttext}>
                {t("requestaConsult")}
              </p>
              <div
                style={{ display: "flex", gap: "  6px ", alignItems: "center" }}
              >
                <div>
                  <img
                    src={support}
                    alt="labSupport"
                    className={style.labcardimgicon}
                  />
                </div>
                <p className={style.whytext}>{t("priorityCustomerSupport")}</p>
              </div>

              <div
                style={{ display: "flex", gap: "  6px ", alignItems: "center" }}
              >
                <div>
                  <img
                    src={labcardkey}
                    alt="labKey"
                    className={style.labcardimgicon}
                  />
                </div>
                <p className={style.whytext}>{t("privateAndSecure")}</p>
              </div>

              <div
                style={{ display: "flex", gap: "  6px ", alignItems: "center" }}
              >
                <div>
                  <img
                    src={labcardsecurity}
                    alt="labSecuiety"
                    className={style.labcardimgicon}
                  />
                </div>
                <p className={style.whytext}>{t("endToEndEncryption")}</p>
              </div>
            </div>
          </div>
        </div>

        {loading && <CustomLoader />}
      </div>
      <Footerr />

      <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.modal}>
          <div className={style.modalContent}>
            <div className={style.modalConatntdata}>
              <p className={style.modalContenttext}>
                {t("selectAtleastOne")} <br /> {t("fromTheTestTable")}
              </p>
              <button
                className={style.okbtn}
                onClick={() => setShowModal(false)}
              >
                {t("ok")}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LabortoryDetail;

const LabBottom = ({ text, img }: any) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        marginBottom: "4px",
      }}
    >
      <div>
        <img src={img} alt="detail" style={{ width: "20px", height: "20px" }} />
      </div>
      <p className={style.detailitemtext}>{text}</p>
    </div>
  );
};

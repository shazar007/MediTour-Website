import { useEffect, useState } from "react";
import style from "./Product.module.css";
import classNames from "classnames";
import commonStyle from "shared/utils/common.module.css";
import { IoMdArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TestCard } from "shared/components";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import { IoSearchSharp } from "react-icons/io5";
import NewPagination from "shared/components/NewPagination/NewPagination";

const LaboratoriyProduct = ({
  get_Test,
  test,
  labId,
  data,
  handleInputChange,
  handleKeyDown,
  searchtext,
  currentPage,
  totalItems,
  itemsPerPage,
  onNext,
  onPrevious,
}: {
  get_Test?: any;
  test?: any;
  labId?: any;
  data?: any;
  handleInputChange?: any;
  searchtext?: any;
  handleKeyDown?: any;
  currentPage?: any;
  totalItems?: any;
  itemsPerPage?: any;
  onNext?: any;
  onPrevious?: any;
}) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const { isLoggedIn } = useSelector((state: any) => state?.root?.common);

  const navigate = useNavigate();

  const handleCardClick = (item: any) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(item)
        ? prevSelected.filter((id) => id !== item)
        : [...prevSelected, item]
    );
  };

  const handleNvaigate = () => {
    if (isLoggedIn) {
      navigate(`/services/laboratory/LabBookingPayment`, {
        state: { selectedCards, labId, data },
      });
    } else {
      navigate("/user/login");
    }
  };
  useEffect(() => {
    get_Test();
  }, []);
  return (
    <div
      style={{
        marginBottom: "32px",
      }}
    >
      <div
        className={classNames(
          commonStyle.flx,
          commonStyle.flxWrap,
          commonStyle.flxBetween
        )}
      >
        <div className={classNames(commonStyle.flx)}></div>
        <div className={style.searchBarContainer}>
          <IoSearchSharp className={style.searchIcon} />
          <input
            type="text"
            placeholder="Search..."
            className={style.searchInput}
            value={searchtext}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div
        className={classNames(
          commonStyle.flx,
          commonStyle.flxBetween,
          commonStyle.flxWrap,
          commonStyle.mb16,
          commonStyle.mt16
        )}
      >
        <>
          {test?.length > 0 && (
            <p>{`${selectedCards.length} test${
              selectedCards.length > 0 ? "s" : ""
            } selected`}</p>
          )}

          <NewPagination
            onNext={onNext}
            onPrevious={onPrevious}
            startItem={(currentPage - 1) * itemsPerPage + 1}
            endItem={Math.min(currentPage * itemsPerPage, totalItems)}
            totalItems={totalItems}
          />
        </>
      </div>

      {test?.length > 0 ? (
        <TestCard
          onPress={handleCardClick}
          selectedCards={selectedCards}
          item={test}
        />
      ) : (
        <div>
          {" "}
          <div>
            <PhysiotheristsEmpty />
          </div>
        </div>
      )}
      <div className={style.showMoreContainer}>
        {test?.length > 0 ? (
          <button
            className={classNames(style.showMoreButton, {
              [style.gray]: selectedCards.length === 0,
            })}
            disabled={selectedCards.length === 0}
            // onClick={handlePayment}
            onClick={handleNvaigate}
          >
            Continue
            <span className={style.icon}>
              <IoMdArrowForward />
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default LaboratoriyProduct;

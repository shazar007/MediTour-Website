import { useEffect, useState } from "react";
import classNames from "classnames";
import commonstyles from "shared/utils/common.module.css";
import hstyle from "./Hotel.module.css";
import { Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addAllSearchHotel } from "shared/services";
import { useSelector } from "react-redux";
import { BnbHotel } from "shared/components";
import PhysiotheristsEmpty from "shared/components/PhsiotheristEmpty";
import NavBreadCrumbs from "shared/components/NavBreadCrumbs";
import { HOTEL } from "shared/utils/mainHeaderQuery";
import CustomLoader from "shared/components/New_Loader/Loader";
import NewPagination from "shared/components/NewPagination/NewPagination";
import Footerr from "pages/Home/HomeNavBar/Footer";
const SortCheckBoxData = [
  { id: 1, title: "Price (High to Low)" },
  { id: 2, title: "Price (Low to High)" },
];
const HotelProperty = () => {
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();
  const [sortedData, setSortedData] = useState<any>([]);
  const { hotelDetail } = useSelector((state: any) => state.root?.common);
  const [loading, setLoading] = useState(false);
  const [pageno, setPageno] = useState(1);
  const [length, setLength] = useState(0);
  const itemsPerPage = 10;
  const totalItems = length;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");

  const handledetails = (item: any) => {
    navigate("/services/hotel/HotelDetails", { state: { item: item } });
  };

  useEffect(() => {
    addFilterSearch(currentPage);
  }, [currentPage]);

  const addFilterSearch = (pageno: number) => {
    setLoading(true);
    const data = { page: pageno };
    const params = {
      serviceType: hotelDetail?.selectedOption?.toLowerCase(),
      city: hotelDetail?.selectCity,
      rooms: hotelDetail?.roomsQuantity,
      adults: hotelDetail?.adultsQuantity,
      filters: {
        sort:
          selectedSortOption === "Price (High to Low)"
            ? "descending"
            : "ascending",
      },
    };
    addAllSearchHotel(data, params)
      .then((res: any) => {
        console.log(res?.data, "...............chala    ");
        setData(res?.data?.hotels);
        setLength(res?.data?.totalCount);
      })
      .catch((err: any) => {
        console.error("Error fetching filtered data", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sortData = () => {
    if (data?.length === 0) return;

    let sorted = [...data];

    if (selectedSortOption === "Price (High to Low)") {
      sorted.sort((a: any, b: any) => {
        const priceA =
          hotelDetail?.selectedOption === "Hotel"
            ? a.minRoomPrice
            : hotelDetail?.selectedOption === "Apartment"
            ? a.minApartmentPrice
            : a.minHomePrice;

        const priceB =
          hotelDetail?.selectedOption === "Hotel"
            ? b.minRoomPrice
            : hotelDetail?.selectedOption === "Apartment"
            ? b.minApartmentPrice
            : b.minHomePrice;

        return (priceB || 0) - (priceA || 0);
      });
    } else if (selectedSortOption === "Price (Low to High)") {
      sorted.sort((a: any, b: any) => {
        const priceA =
          hotelDetail?.selectedOption === "Hotel"
            ? a.minRoomPrice
            : hotelDetail?.selectedOption === "Apartment"
            ? a.minApartmentPrice
            : a.minHomePrice;

        const priceB =
          hotelDetail?.selectedOption === "Hotel"
            ? b.minRoomPrice
            : hotelDetail?.selectedOption === "Apartment"
            ? b.minApartmentPrice
            : b.minHomePrice;

        return (priceA || 0) - (priceB || 0);
      });
    }

    setSortedData(sorted);
    setLoading(false);
  };

  const handleNextPage = () => {
    let itemTorender = currentPage * 10;
    if (length > itemTorender) {
      setCurrentPage(currentPage + 1);
      setPageno(pageno + 10);
      addFilterSearch(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageno(pageno - 10);
      addFilterSearch(currentPage - 1);
    }
  };

  const handleSelect = (item: any) => {
    setSelectedSortOption(item.title);
  };

  useEffect(() => {
    sortData();
  }, [selectedSortOption, data]);
  const currentPageData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <NavBreadCrumbs {...HOTEL} />

      <div className={classNames(commonstyles.container, commonstyles.mb32)}>
        <div>
          <p
            className={classNames(
              commonstyles.colorBlue,
              commonstyles.fs24,
              commonstyles.semiBold
            )}
          >
            {sortedData?.length} Properties
          </p>
          {sortedData?.length > 0 ? (
            <div
              className={classNames(
                commonstyles.flx,
                commonstyles.flxWrap,
                commonstyles.flxBetween
              )}
            >
              <div
                className={classNames(commonstyles.col6, commonstyles.colsm12)}
              >
                {sortedData.map((item: any) => {
                  if (hotelDetail?.selectedOption === "Hotel") {
                    return (
                      <BnbHotel
                        key={item?.hotelId?.id}
                        location={item?.location?.address}
                        cancel={item?.advanceCancelfreeofCharge}
                        name={item?.hotelId?.name}
                        CarImage={
                          item?.hotelId?.logo ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                        }
                        price={item?.minRoomPrice}
                        handledetails={() => handledetails(item)}
                      />
                    );
                  } else if (hotelDetail?.selectedOption === "Apartment") {
                    return (
                      <BnbHotel
                        key={item?.propertyId?.id}
                        location={item?.location?.address}
                        cancel={item?.advanceCancelfreeofCharge}
                        name={item?.propertyName}
                        CarImage={
                          item?.propertyphoto?.[0] ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                        }
                        price={item?.minApartmentPrice}
                        handledetails={() => handledetails(item)}
                      />
                    );
                  } else {
                    return (
                      <BnbHotel
                        key={item?.propertyId?.id}
                        location={`${item?.location?.address}-${item?.location?.city}`}
                        cancel={item?.advanceCancelfreeofCharge}
                        name={item?.propertyName}
                        CarImage={
                          item?.propertyphoto?.[0] ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU"
                        }
                        price={item?.minHomePrice}
                        handledetails={() => handledetails(item)}
                      />
                    );
                  }
                })}
              </div>
              <div
                className={classNames(commonstyles.col4, commonstyles.colsm12)}
              >
                <div className={classNames(hstyle.fiterbox)}>
                  <p
                    className={classNames(
                      commonstyles.colorBlue,
                      commonstyles.fs16,
                      commonstyles.semiBold
                    )}
                  >
                    Sort by
                  </p>

                  {SortCheckBoxData?.map((item?: any) => (
                    <div
                      className={classNames(
                        commonstyles.colorBlue,
                        commonstyles.flx,
                        commonstyles.flxBetween
                      )}
                    >
                      <p>{item?.title}</p>
                      <Radio
                        checked={selectedSortOption === item.title}
                        onClick={() => handleSelect(item)}
                        sx={{
                          color:
                            selectedSortOption === item.title
                              ? "#0D47A1"
                              : "gray",
                          "&.Mui-checked": {
                            color: "#0D47A1",
                          },
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <NewPagination
                onNext={handleNextPage}
                onPrevious={handlePreviousPage}
                startItem={(currentPage - 1) * itemsPerPage + 1}
                endItem={Math.min(currentPage * itemsPerPage, length)}
                totalItems={totalItems}
              />
            </div>
          ) : (
            <div>{!loading && <PhysiotheristsEmpty />}</div>
          )}
        </div>
        {loading && <CustomLoader />}
      </div>
      <Footerr />
    </div>
  );
};

export default HotelProperty;

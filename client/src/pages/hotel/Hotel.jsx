import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import hotelPhotos from "../../data/hotelData";
import MailList from "../../components/maillist/MailList";
import Footer from "../../components/footer/Footer";
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Skeleton } from "@mui/material";
import { SearchContext } from "../../context/searchContext";
import { AuthContext } from "../../context/authContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openReserveModal, setOpenReserveModal] = useState();
  const [days, setDays] = useState(null);

  const location = useLocation(false);
  const hotelId = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(
    `https://urbanhub.onrender.com/api/hotels/search/${hotelId}`
  );

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const date = JSON.parse(localStorage.getItem("date"));
  const options = JSON.parse(localStorage.getItem("options"));

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  useEffect(() => {
    function dayDifference(date1, date2) {
      const timeDiff = Math.abs(
        new Date(date2).getTime() - new Date(date1).getTime()
      );
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    }
    if (date.length !== 0 && date[0].startDate && date[0].endDate) {
      setDays(dayDifference(new Date(date[0].endDate), date[0].startDate));
    }
  }, []);

  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSliderClick = (event) => {
    event.stopPropagation();
  };

  const handleClick = () => {
    if (user) {
      setOpenReserveModal(!openReserveModal);
    } else navigate("/auth");
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="mt-5 flex items-center flex-col max-lg:text-sm">
        {open && (
          <div
            onClick={handleClose}
            className=" fixed inset-0 bg-[#0000007b] z-100 flex items-center"
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="absolute top-20 right-20 text-[30px] text-[lightgray] cursor-pointer"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="text-[50px] m-5 text-[lightgray] cursor-pointer"
              onClick={(e) => {
                handleSliderClick(e);
                if (slideNumber === 0) setSlideNumber(5);
                else setSlideNumber((prev) => prev - 1);
              }}
            />

            <div className="w-full h-full flex justify-center items-center">
              <img
                src={
                  data.photos[0].includes("https")
                    ? data.photos[slideNumber]
                    : hotelPhotos[slideNumber].src
                }
                alt=""
                className="w-3/5 h-3/5 object-contain"
                onClick={handleSliderClick}
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="text-[50px] m-5 text-[lightgray] cursor-pointer"
              onClick={(e) => {
                handleSliderClick(e);
                if (slideNumber === 5) setSlideNumber(0);
                else setSlideNumber((prev) => prev + 1);
              }}
            />
          </div>
        )}
        {!data ? (
          <>
            <div className="w-full max-w-5xl flex flex-col gap-2.5 max-lg:hidden">
              <div className="flex justify between">
                <Skeleton width={200} height={50} className="ml-5" />
                <Skeleton width={200} height={50} />
              </div>
              <Skeleton width={160} height={50} className="ml-5" />
              <Skeleton width={160} height={50} className="ml-5" />
              <div className="flex  gap-1 max-lg:hidden p-5">
                {Array.from({ length: 6 }).map((item) => (
                  <Skeleton width={300} height={400} />
                ))}
                <Skeleton width={200} height={50} />
                <Skeleton width={600} height={300} />
              </div>
            </div>
            <div className="w-full max-w-5xl flex flex-col gap-2.5 max-md:hidden">
              <div className="flex justify between">
                <Skeleton width={200} height={50} className="ml-5" />
                <Skeleton width={200} height={50} />
              </div>
              <Skeleton width={160} height={50} className="ml-5" />
              <Skeleton width={160} height={50} className="ml-5" />
              <div className="flex flex-wrap gap-1 max-lg:hidden p-5">
                <Skeleton width={1000} height={100} />
              </div>
            </div>
            <div className="w-full max-w-5xl flex flex-col gap-2.5 md:hidden">
              <div className="flex justify between">
                <Skeleton width={200} height={50} className="ml-5" />
                <Skeleton width={200} height={50} />
              </div>
              <Skeleton width={160} height={50} className="ml-5" />
              <Skeleton width={160} height={50} className="ml-5" />
              <div className="flex flex-wrap gap-1 max-lg:hidden p-5">
                <Skeleton width={700} height={600} />
              </div>
              <div className="flex flex-wrap gap-1 max-lg:hidden p-5">
                <Skeleton width={500} height={500} />
              </div>
            </div>
          </>
        ) : (
          <div className="w-full max-w-5xl flex flex-col gap-2.5">
            <div className="flex w-full justify-between items-center">
              <h1 className="text-2xl font-semibold max-lg:font-bold max-lg:pl-3">
                {data.name}
              </h1>
              <button
                onClick={handleClick}
                className="py-2.5 px-5 bg-[#0071c2] text-white text-sm rounded-[5px] max-lg:rounded-r-none whitespace-nowrap"
              >
                Reserve or Book Now!
              </button>
            </div>
            <div className="text-xs flex items-center gap-2.5 max-lg:gap-1.5 max-lg:pl-3">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>
                {data.address}, {data.city}, {data.country}
              </span>
            </div>
            <span className="text-[#0071c2] font-medium max-lg:pl-3">
              {data.distance}
            </span>
            <span className="text-[#008009] font-medium max-lg:pl-3  max-md:max-w-[300px]">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="flex flex-wrap gap-1 max-lg:hidden">
              {data.photos[0].includes("https")
                ? data.photos.map((photo, index) => (
                    <div className="w-[33%]">
                      <img
                        onClick={() => handleOpen(index)}
                        src={
                          photo || "https://i.ibb.co/SPd3W9t/placeholder.jpg"
                        }
                        alt={index}
                        className="w-full object-cover cursor-pointer lg:h-[232.3px]"
                      />
                    </div>
                  ))
                : hotelPhotos.map((photo, index) => (
                    <div className="w-[33%]">
                      <img
                        onClick={() => handleOpen(index)}
                        src={photo.src}
                        alt={index}
                        className="w-full object-cover cursor-pointer"
                      />
                    </div>
                  ))}
            </div>
            <div className="flex flex-wrap gap-1 lg:hidden max-lg:mt-2">
              <div className="w-full flex items-center relative">
                <svg
                  className="text-[50px] text-gray-600 cursor-pointer w-8 h-8 absolute top-50 left-0 bg-white p-1 bg-opacity-80"
                  onClick={() => {
                    if (slideNumber === 0) setSlideNumber(5);
                    else setSlideNumber((prev) => prev - 1);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>

                <div className="w-full h-full flex justify-center items-center">
                  <img
                    src={
                      data.photos[0].includes("https")
                        ? data.photos[slideNumber] ||
                          "https://i.ibb.co/SPd3W9t/placeholder.jpg"
                        : hotelPhotos[slideNumber].src
                    }
                    alt=""
                    className="w-auto"
                  />
                </div>
                <svg
                  className="text-[20pxpx] text-gray-600 cursor-pointer absolute top-50 right-0 w-8 h-8 bg-white p-1 bg-opacity-80"
                  onClick={() => {
                    if (slideNumber === 5) setSlideNumber(0);
                    else setSlideNumber((prev) => prev + 1);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
                <div className="flex items-center justify-center w-14 h-10 bg-gray-500 absolute bottom-2 right-2 bg-opacity-60 rounded-[4px] text-white lg:hidden">{`${
                  slideNumber + 1
                } / ${
                  data.photos[0].includes("https")
                    ? data.photos.length
                    : hotelPhotos.length
                }`}</div>
              </div>
            </div>
            <div className="flex max-md:flex-col justify-between gap-5 mt-5 max-lg:mt-3 w-full  md:px-7 lg:px-0">
              <div className="w-3/4 max-lg:w-full max-md:px-3 max-lg:max-w-[450px]">
                <h1 className="text-xl font-semibold max-lg:text-lg">
                  {data.title}
                </h1>
                <p className="text-[14px] mt-5 max-lg:mt-3  max-lg:text-gray-800 text-justify whitespace-break-spaces">
                  {data.description}
                </p>
              </div>
              <div className="w-1/4 max-lg:w-full bg-[#ebf3ff] p-5 flex flex-col gap-5 max-lg:max-w-[370px]">
                <h1 className="text-[18px] text-[#555] font-semibold whitespace-nowrap">
                  Perfect for a {days}-night stay!
                </h1>
                <span className="text-sm">
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2 className="font-light">
                  <b className="font-bold text-lg">
                    ${data.cheapestPrice * days * (options.room || 1)}
                  </b>
                  ({days} night{days !== 1 ? "s" : ""})
                </h2>
                <button
                  onClick={handleClick}
                  className="py-2.5 px-5 bg-[#0071c2] text-white text-sm rounded-[5px]"
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        )}
        <MailList />
        <Footer />
        {openReserveModal && (
          <Reserve setOpen={setOpenReserveModal} hotelId={hotelId} />
        )}
      </div>
    </div>
  );
};

export default Hotel;

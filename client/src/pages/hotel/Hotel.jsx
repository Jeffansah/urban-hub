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
import { useState, useEffect, useRef } from "react";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

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
                src={hotelPhotos[slideNumber].src}
                alt=""
                className="w-4/5"
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
        <div className="w-full max-w-5xl flex flex-col gap-2.5">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-2xl font-semibold max-lg:font-bold max-lg:pl-3">
              Grand Hotel
            </h1>
            <button className="py-2.5 px-5 bg-[#0071c2] text-white text-sm rounded-[5px] max-lg:rounded-r-none">
              Reserve or Book Now!
            </button>
          </div>
          <div className="text-xs flex items-center gap-2.5 max-lg:gap-1.5 max-lg:pl-3">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton St 125 New York</span>
          </div>
          <span className="text-[#0071c2] font-medium max-lg:pl-3">
            Excellent location - 500m from center
          </span>
          <span className="text-[#008009] font-medium max-lg:pl-3  max-md:max-w-[300px]">
            Book a stay over $114 at this property and get a free airport taxi
          </span>
          <div className="flex flex-wrap gap-1 max-lg:hidden">
            {hotelPhotos.map((photo, index) => (
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
                  src={hotelPhotos[slideNumber].src}
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
              } / ${hotelPhotos.length}`}</div>
            </div>
          </div>
          <div className="flex max-md:flex-col justify-between gap-5 mt-5 max-lg:mt-3 w-full  md:px-7 lg:px-0">
            <div className="w-3/4 max-lg:w-full max-md:px-3 max-lg:max-w-[370px]">
              <h1 className="text-xl font-semibold max-lg:text-lg">
                Stay in the heart of City
              </h1>
              <p className="text-[14px] mt-5 max-lg:mt-3  max-lg:text-gray-800 text-justify whitespace-break-spaces">
                Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                Street Apartments has accommodations with air conditioning and
                free WiFi. The units come with hardwood floors and feature a
                fully equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                airport is John Paul II International Kraków–Balice, 16.1 km
                from Tower Street Apartments, and the property offers a paid
                airport shuttle service.
              </p>
            </div>
            <div className="w-1/4 max-lg:w-full bg-[#ebf3ff] p-5 flex flex-col gap-5 max-lg:max-w-[370px]">
              <h1 className="text-[18px] text-[#555] font-semibold whitespace-nowrap">
                Perfect for a 9-night stay!
              </h1>
              <span className="text-sm">
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2 className="font-light">
                <b className="font-bold text-lg">$945</b> (9 nights)
              </h2>
              <button className="py-2.5 px-5 bg-[#0071c2] text-white text-sm rounded-[5px]">
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;

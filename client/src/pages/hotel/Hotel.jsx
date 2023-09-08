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
import { useState } from "react";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpen(!open);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="mt-5 flex items-center flex-col">
        {open && (
          <div className="fixed inset-0 bg-[#0000007b] z-100 flex items-center">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="absolute top-20 right-20 text-[30px] text-[lightgray] cursor-pointer"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="text-[50px] m-5 text-[lightgray] cursor-pointer"
              onClick={() => {
                if (slideNumber === 0) setSlideNumber(5);
                else setSlideNumber((prev) => prev - 1);
              }}
            />

            <div className="w-full h-full flex justify-center items-center">
              <img
                src={hotelPhotos[slideNumber].src}
                alt=""
                className="w-4/5"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="text-[50px] m-5 text-[lightgray] cursor-pointer"
              onClick={() => {
                if (slideNumber === 5) setSlideNumber(0);
                else setSlideNumber((prev) => prev + 1);
              }}
            />
          </div>
        )}
        <div className="w-full max-w-5xl flex flex-col gap-2.5">
          <div className="flex w-full justify-between">
            <h1 className="text-2xl font-semibold">Grand Hotel</h1>
            <button className="py-2.5 px-5 bg-[#0071c2] text-white text-sm rounded-[5px]">
              Reserve or Book Now!
            </button>
          </div>
          <div className="text-xs flex items-center gap-2.5">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton St 125 New York</span>
          </div>
          <span className="text-[#0071c2] font-medium ">
            Excellent location - 500m from center
          </span>
          <span className="text-[#008009] font-medium">
            Book a stay over $114 at this property and get a free airport taxi
          </span>
          <div className="flex flex-wrap gap-1">
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
          <div className="flex justify-between gap-5 mt-5 w-full">
            <div className="w-3/4">
              <h1 className="text-xl font-semibold">
                Stay in the heart of City
              </h1>
              <p className="text-[14px] mt-5">
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
            <div className="w-1/4 bg-[#ebf3ff] p-5 flex flex-col gap-5">
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

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const defaultImg =
  "https://cf.bstatic.com/xdata/images/hotel/square600/32087410.webp?k=5ba581c5195ca4c5eedd0f4aa9628cf05b98aaa35bf7aaa0cfa010b95590a6c4&o=";

const SearchResult = ({ item }) => {
  return (
    <div className="text-sm border border-[lightgray] p-2.5 lg:rounded-[5px] flex justify-between gap-5 mb-5">
      <img
        src={item.photos[0].includes("https") ? item.photos[0] : defaultImg}
        alt="stay"
        className="max-lg:w-[150px] w-[200px]  object-cover rounded-sm max-h-[210px] "
      />
      <div className="flex w-[600px] max-md:text-xs">
        <div className="flex flex-col gap-1.5 lg:gap-2.5 flex-grow max-md:relative">
          <h1 className="md:text-[20px] text-[#0071c2] max-lg:whitespace-nowrap max-md:text-sm lg:max-w-[300px]">
            {item.name}
          </h1>
          <div className="flex gap-2 md:hidden items-center">
            <span className="bg-main text-white text-sm p-1 font-bold rounded-tl-md rounded-tr-md rounded-br-md max-md:text-xs cursor-pointer">
              {item.rating}
            </span>
            <span className="font-medium">
              {item.ratingText || "Excellent"}
            </span>
          </div>
          <span className="text-[12px]">
            {item.distance}, {item.city}, {item.country}
          </span>
          <span className="text-[12px] bg-[#008009] text-white max-w-max p-[3px] rounded-[5px] py-[2px]">
            Free airport taxi
          </span>
          <span className="text-[12px] font-bold max-lg:hidden">
            {item.title}
          </span>
          <span className="text-[12px] ">{item.extract}</span>
          <span className="text-[12px] font-bold text-[#008009]">
            Free cancellation
          </span>
          <span className="text-[12px] text-[#008009] max-md:hidden">
            You can cancel later, so lock in this great price today!
          </span>
          <div className="text-right flex flex-col gap-[5px] md:hidden">
            <Link to={`/hotels/${item._id}`}>
              <button className="bg-[#0071c2] text-white font-bold py-1 px-[5px] rounded-[5px] md:hidden absolute bottom-7 left-0">
                See availability
              </button>
            </Link>

            <span className="lg:text-2xl max-lg:text-xl">
              ${item.cheapestPrice}
            </span>
            <span className="text-[12px] text-gray-500">
              Includes taxes and fees
            </span>
            <Link to={`/hotels/${item._id}`}>
              <button className="bg-[#0071c2] text-white font-bold py-2.5 px-[5px] rounded-[5px] max-md:hidden">
                See availability
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:w-[30%] flex flex-col justify-between max-md:hidden">
          <div className="flex justify-between items-start">
            <span className="font-medium">Excellent</span>
            <span className="bg-main text-white lg:text-sm p-1 font-bold rounded-tl-md rounded-tr-md rounded-br-md cursor-pointer">
              {item.rating}
            </span>
          </div>
          <div className="text-right flex flex-col lg:gap-[5px]">
            <span className="text-2xl">${item.cheapestPrice}</span>
            <span className="text-[12px] text-gray-500">
              Includes taxes and fees
            </span>
            <Link to={`/hotels/${item._id}`}>
              <button className="bg-[#0071c2] text-white max-lg:font-semibold font-bold max-lg:py-1.5 py-2.5 px-[5px] rounded-[5px] max-md:hidden whitespace-nowrap">
                See availability
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;

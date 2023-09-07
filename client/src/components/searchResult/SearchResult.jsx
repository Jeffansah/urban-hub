import React from "react";

const SearchList = () => {
  return (
    <div className="text-sm">
      {Array.from({ length: 6 }).map((_) => (
        <SearchResult />
      ))}
    </div>
  );
};

const SearchResult = () => {
  return (
    <div className="border border-[lightgray] p-2.5 rounded-[5px] flex justify-between gap-5 mb-5">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt="hotel"
        className="w-[200px] h-auto object-cover rounded-sm"
      />
      <div className="flex w-[600px]">
        <div className="flex flex-col gap-2.5 flex-grow">
          <h1 className="text-[20px] text-[#0071c2]">
            Tower Street Apartments
          </h1>
          <span className="text-[12px]">500m from center</span>
          <span className="text-[12px] bg-[#008009] text-white max-w-max p-[3px] rounded-[5px] py-[2px]">
            Free airport taxi
          </span>
          <span className="text-[12px] font-bold">
            Studio Apartment with Air conditioning
          </span>
          <span className="text-[12px] ">
            Entire studio • 1 bathroom • 21m² 1 full bed
          </span>
          <span className="text-[12px] font-bold text-[#008009]">
            Free cancellation
          </span>
          <span className="text-[12px] text-[#008009]">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="w-[30%] flex flex-col justify-between">
          <div className="sRating flex justify-between items-start">
            <span className="font-medium">Excellent</span>
            <span className="bg-main text-white text-sm p-1 font-bold rounded-tl-md rounded-tr-md rounded-br-md max-md:text-xs cursor-pointer">
              8.9
            </span>
          </div>
          <div className="text-right flex flex-col gap-[5px]">
            <span className="text-2xl">$100</span>
            <span className="text-[12px] text-gray-500">
              Includes taxes and fees
            </span>
            <button className="bg-[#0071c2] text-white font-bold py-2.5 px-[5px] rounded-[5px]">
              See availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;

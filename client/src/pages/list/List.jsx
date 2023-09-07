import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import SearchResult from "../../components/searchResult/SearchResult";

const List = () => {
  const location = useLocation();

  const [date, setDate] = useState(location.state.date);
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openOptionsModal, setOpenOptionsModal] = useState(false);

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-5xl flex gap-5">
          <div className=" bg-background  p-2.5 rounded-[10px] sticky top-10 min-w-[250px] text-xs max-h-[460px]">
            <h1 className="text-xl font-bold text-gray-600 mb-2.5">Search</h1>
            <div className="flex flex-col gap-[5px] mb-2.5">
              <label className="text-[12px]">Destination</label>
              <input
                type="text"
                placeholder={destination}
                className="h-[30px] p-[5px] text-xs placeholder:text-xs placeholder:text-black rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-[5px] mb-2.5">
              <label>Check-in/out Date</label>
              <span
                onClick={() => setOpenDateModal(!openDateModal)}
                className="h-[30px] p-[5px] px-[8px] bg-white flex items-center text-xs cursor-pointer rounded-sm"
              >{`${format(date[0].startDate, "iii, MMM dd")}  to  ${format(
                date[0].endDate,
                "iii, MMM dd"
              )}`}</span>
              {openDateModal && (
                <DateRange
                  onChange={(item) => {
                    setDate([item.selection]);
                  }}
                  minDate={new Date()}
                />
              )}
            </div>
            <label className="mb-2.5">Options</label>
            <div className="flex flex-col gap-2.5 p-2.5">
              <div className="flex justify-between mb-2.5 text-[#555] text-[12px]">
                <span className="lsOptionText">
                  Min price <small>per night</small>
                </span>
                <input type="text" className="w-[50px] rounded-sm p-1" />
              </div>
              <div className="flex justify-between mb-2.5 text-[#555] text-[12px]">
                <span className="lsOptionText">
                  Min price <small>per night</small>
                </span>
                <input type="text" className="w-[50px] rounded-sm p-1" />
              </div>

              <div className="flex justify-between mb-2.5 text-[#555] text-[12px]">
                <span className="lsOptionText">Adults</span>
                <input
                  type="number"
                  min={1}
                  className="w-[50px] rounded-sm p-1"
                  placeholder={options.adult}
                />
              </div>

              <div className="flex justify-between mb-2.5 text-[#555] text-[12px]">
                <span className="lsOptionText">Children</span>
                <input
                  type="number"
                  min={0}
                  className="w-[50px] rounded-sm p-1"
                  placeholder={options.children}
                />
              </div>

              <div className="flex justify-between mb-2.5 text-[#555] text-[12px]">
                <span className="lsOptionText">Room</span>
                <input
                  type="number"
                  min={1}
                  className="w-[50px] rounded-sm p-1"
                  placeholder={options.room}
                />
              </div>
            </div>
            <button className="p-2.5 bg-[#0071c2] text-white w-full font-medium rounded-sm">
              Search
            </button>
          </div>
          <div className="">
            <SearchResult />
          </div>
        </div>
      </div>
    </>
  );
};

export default List;

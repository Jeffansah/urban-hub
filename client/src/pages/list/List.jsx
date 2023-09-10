import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import SearchResult from "../../components/searchResult/SearchResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { Skeleton } from "@mui/material";

const List = () => {
  const location = useLocation();

  const [date, setDate] = useState(location.state.date);
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const [adult, setAdult] = useState(location.state.options.adult);
  const [children, setChildren] = useState(location.state.options.children);
  const [room, setRoom] = useState(location.state.options.room);
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openOptionsModal, setOpenOptionsModal] = useState(false);
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);

  const { data, loading, error, reFetchData } = useFetch(
    `/hotels?city=${
      destination.charAt(0).toUpperCase() + destination.slice(1)
    }&min=${minPrice || 0}&max=${maxPrice || 999}`
  );

  const handleClick = () => {
    reFetchData();
  };

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="flex max-lg:flex-col justify-center lg:mt-5 max-lg:overflow-hidden">
        <div className="w-full max-w-5xl flex gap-5  max-lg:flex-col">
          <div className=" bg-background  p-2.5 lg:rounded-[10px] lg:sticky top-10 w-1/3 text-xs h-max lg:max-h-[720px] max-lg:w-full lg:min-w-[250px]">
            <h1 className="text-xl font-bold text-gray-600 mb-2.5 max-lg:hidden">
              Search
            </h1>
            <div className="max-lg:flex-col">
              <div className="flex flex-col gap-[5px] mb-2.5  max-lg:gap-2">
                <label className="text-[12px] max-lg:hidden">Destination</label>
                <div className="max-lg:flex max-lg:bg-white max-lg:items-center max-lg:px-2 max-lg:gap-2">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="lg:hidden h-4 w-4"
                  />
                  <input
                    type="text"
                    placeholder={destination}
                    className="h-[30px] p-[5px] text-xs placeholder:text-xs placeholder:text-black rounded-sm w-full focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2.5  max-lg:gap-2 max-lg:bg-white max-lg:flex-col max-lg:p-2">
                <label className="lg:mb-[5px]">Check-in/out Date</label>
                <span
                  onClick={() => setOpenDateModal(!openDateModal)}
                  className="h-[30px] p-[5px] px-[8px] bg-white flex items-center text-xs cursor-pointer rounded-sm max-lg:w-full max-lg:font-semibold"
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
              <label className="mb-2.5 max-lg:hidden">Options</label>
              <div className="flex flex-col gap-2.5 p-2.5">
                <div className="max-lg:flex justify-evenly">
                  <div className=" max-lg:bg-white flex max-lg:flex-col lg:justify-between mb-2.5 text-[#555] text-[12px] max-lg:max-w-max max-lg:p-1 max-lg:w-1/2 max-lg:rounded-sm">
                    <span className="">
                      Min price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-[50px] rounded-sm p-1 max-lg:w-full focus:outline-none"
                    />
                  </div>
                  <div className="max-lg:bg-white flex max-lg:flex-col lg:justify-between max-lg:mb-2.5 text-[#555] text-[12px] max-lg:max-w-max max-lg:p-1 max-lg:w-1/2">
                    <span className="">
                      Max price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-[50px] rounded-sm p-1 max-lg:w-full focus:outline-none"
                    />
                  </div>
                </div>
                <div className="max-lg:flex max-lg:gap-4 max-lg:justify-center max-lg:rounded-sm">
                  <div className="flex justify-between mb-2.5 text-[#555] text-[12px] max-lg:bg-white max-lg:rounded-sm max-lg:p-2 max-lg:flex-col max-lg:flex-1">
                    <span className="">Adults</span>
                    <input
                      type="number"
                      min={1}
                      className="w-[50px] rounded-sm p-1 max-lg:hidden focus:outline-none"
                      placeholder={options.adult}
                    />
                    <select
                      name=""
                      id=""
                      value={adult}
                      onChange={(e) => setAdult(e.target.value)}
                      className=" focus:outline-none lg:hidden"
                    >
                      {Array.from({ length: 20 }).map((_, index) => (
                        <option>{index + 1}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between mb-2.5 text-[#555] text-[12px] max-lg:bg-white max-lg:rounded-sm max-lg:p-2 max-lg:flex-col max-lg:flex-1">
                    <span className="lsOptionText">Children</span>
                    <input
                      type="number"
                      min={0}
                      className="w-[50px] rounded-sm p-1 max-lg:hidden focus:outline-none"
                      placeholder={options.children}
                    />
                    <select
                      name=""
                      id=""
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                      className=" focus:outline-none lg:hidden"
                    >
                      {Array.from({ length: 10 }).map((_, index) => (
                        <option>{index + 1}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between mb-2.5 text-[#555] text-[12px] max-lg:bg-white max-lg:rounded-sm max-lg:p-2 max-lg:flex-col max-lg:flex-1">
                    <span className="lsOptionText">Room</span>
                    <input
                      type="number"
                      min={1}
                      className="w-[50px] rounded-sm p-1 max-lg:hidden focus:outline-none"
                      placeholder={options.room}
                    />
                    <select
                      name=""
                      id=""
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="focus:outline-none lg:hidden"
                    >
                      {Array.from({ length: 10 }).map((_, index) => (
                        <option>{index + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClick}
                className="p-2.5 bg-[#0071c2] text-white w-full font-medium rounded-sm"
              >
                Search
              </button>
            </div>
          </div>
          <div className="">
            {!data ? (
              Array.from({ length: 6 }).map((_) => (
                <div className="flex flex-col">
                  <Skeleton
                    variant="rounded"
                    width={700}
                    height={200}
                    className="mb-4"
                  />
                </div>
              ))
            ) : data.length === 0 ? (
              <div className="flex flex-col items-center w-full  ml-12">
                <img
                  src="https://i.ibb.co/xLQkC4H/9318700.jpg"
                  alt="no stays available"
                  width={300}
                  height={300}
                />
                <p className="text-[17px] text-center max-w-[500px]">
                  We apologize, but we couldn't find any available stays at the
                  moment. Please try again later or refine your search criteria.
                </p>
              </div>
            ) : (
              data.map((item) => <SearchResult key={item._id} item={item} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;

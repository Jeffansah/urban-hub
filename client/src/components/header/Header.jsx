import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faBuilding,
  faCalendar,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

const Header = ({ type }) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name]++ : options[name]--,
      };
    });
  };

  return (
    <header className="bg-main text-white flex justify-center relative">
      <div
        className={`w-full max-w-5xl mt-5 mx-0 mb-[100px] ${
          type === "list" && "mb-0"
        }`}
      >
        <div className="flex gap-10 mb-[50px]">
          <div className="flex items-center gap-2.5 active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FontAwesomeIcon icon={faBuilding} />
            <span>Attractions</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="text-4xl font-semibold">
              Unlock Endless Rewards: Unleash the Genius!
            </h1>
            <p className="my-5 mx-0">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free UrbanHub account
            </p>
            <button className="bg-[#0071c2] text-white font-medium p-2.5 cursor-pointer">
              Sign in / Register
            </button>
            <div className=" bg-white border-[3px] border-[#febb02] flex items-center justify-around py-2.5 px-0 rounded-md absolute bottom-[-25px] w-full max-w-5xl">
              <div className="flex items-center gap-2.5">
                <FontAwesomeIcon icon={faBed} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="border-none outline-none text-gray-600 placeholder:text-gray-600 focus:placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2.5">
                <FontAwesomeIcon icon={faCalendar} className="text-gray-500" />
                <span
                  onClick={() => {
                    setOpenDate(!openDate);
                    setOpenOptions(false);
                  }}
                  className="text-gray-600 cursor-pointer"
                >{`${format(date[0].startDate, "iii, MMM dd")} — ${format(
                  date[0].endDate,
                  "iii, MMM dd"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                      setDate([item.selection]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="absolute top-[50px] z-10"
                  />
                )}
              </div>
              <div className="flex items-center gap-2.5">
                <FontAwesomeIcon icon={faPerson} className="text-gray-500" />
                <span
                  onClick={() => {
                    setOpenOptions(!openOptions);
                    setOpenDate(false);
                  }}
                  className="text-gray-600 cursor-pointer"
                >
                  {`${options.adult} ${
                    options.adult === 1 ? "adult" : "adults"
                  } · ${options.children} ${
                    options.children === 1 ? "child" : "children"
                  } · ${options.room} ${options.room === 1 ? "room" : "rooms"}`}
                </span>
                {openOptions && (
                  <div className="absolute top-[50px] text-gray-600 rounded-md shadow-md bg-white z-10">
                    <div className="flex w-[200px] justify-between m-2.5">
                      <span className="optionText">Adults</span>
                      <div className="flex gap-2.5 items-center text-black text-[12px]">
                        <button
                          disabled={options.adult <= 1}
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer disabled:cursor-not-allowed"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounter">{options.adult}</span>
                        <button
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex w-[200px] justify-between m-2.5">
                      <span className="optionText">Children</span>
                      <div className="flex gap-2.5 items-center text-black text-[12px]">
                        <button
                          disabled={options.children <= 0}
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer disabled:cursor-not-allowed"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounter">
                          {options.children}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex w-[200px] justify-between m-2.5">
                      <span className="optionText">Rooms</span>
                      <div className="flex gap-2.5 items-center text-black text-[12px]">
                        <button
                          disabled={options.room <= 1}
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer disabled:cursor-not-allowed"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounter">{options.room}</span>
                        <button
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2.5">
                <button className="bg-[#0071c2] text-white font-medium p-2.5 cursor-pointer">
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

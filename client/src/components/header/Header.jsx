import { useRef, useState, useEffect } from "react";
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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

const Header = ({ type }) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openDateModal, setOpenDateModal] = useState(false);
  const [openOptionsModal, setOpenOptionsModal] = useState(false);
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
        className={`w-full max-w-5xl mt-5 mx-0 lg:mb-[100px] max-lg:mb-6 ${
          type === "list" && "mb-0 lg:mb-0"
        }`}
      >
        <div className="flex gap-10 mb-[50px] max-md:overflow-x-scroll max-md:scrollbar-hide max-md:whitespace-nowrap max-lg:px-3 max-sm:mb-[20px]">
          <div className="flex items-center gap-2.5 active whitespace-nowrap rounded-[26px] bg-[#154fa0] border border-white py-2.5 px-[13px] max-md:p-2">
            <FontAwesomeIcon icon={faBed} className="max-md:h-4" />
            <span className="max-md:text-xs">Stays</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FontAwesomeIcon icon={faPlane} className="max-md:h-4" />
            <span className="max-md:text-xs">Flights</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FontAwesomeIcon icon={faCar} />
            <span className="max-md:text-xs">Car rentals</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FontAwesomeIcon icon={faBuilding} />
            <span className="max-md:text-xs">Attractions</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FontAwesomeIcon icon={faTaxi} />
            <span className="max-md:text-xs">Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <div className="max-lg:px-3">
            <h1 className="text-4xl font-semibold max-lg:text-3xl">
              Unlock Endless Rewards: Unleash the Genius!
            </h1>
            <p className="my-5 mx-0 max-md:text-sm max-md:my-2 max-lg:max-w-xl">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free UrbanHub account
            </p>
            <button className="bg-[#0071c2] text-white font-medium p-2.5 cursor-pointer max-md:mt-2 max-md:text-sm">
              Sign in / Register
            </button>
            <div className=" bg-white lg:border-[3px] lg:border-[#febb02] flex max-lg:flex-col lg:items-center lg:justify-around lg:py-2.5 px-0 rounded-md lg:absolute lg:bottom-[-25px] w-full lg:max-w-5xl max-lg:mt-5 max-lg:text-sm">
              <div className="flex items-center gap-2.5 max-lg:w-full max-lg:border-[3px] max-lg:border-[#febb02] max-lg:p-3 max-lg:border-t-[6px]">
                <FontAwesomeIcon icon={faBed} className="text-gray-500" />
                <input
                  onClick={(e) => {
                    setOpenOptionsModal(false);
                    setOpenDateModal(false);
                  }}
                  type="text"
                  placeholder="Where are you going?"
                  className="lg:border-none  outline-none  text-gray-600 placeholder:text-gray-600 focus:placeholder:text-gray-400"
                />
              </div>
              <div className="flex max-lg:border-[3px] max-lg:border-[#febb02] items-center gap-2.5 max-lg:p-3">
                <FontAwesomeIcon icon={faCalendar} className="text-gray-500" />
                <span
                  onClick={() => {
                    setOpenDateModal(!openDateModal);
                    setOpenOptionsModal(false);
                  }}
                  className="text-gray-600 cursor-pointer"
                >{`${format(date[0].startDate, "iii, MMM dd")} — ${format(
                  date[0].endDate,
                  "iii, MMM dd"
                )}`}</span>
                {openDateModal && (
                  <div className="max-lg:hidden top-[50px] absolute z-10">
                    <DateRange
                      className=""
                      editableDateInputs={true}
                      onChange={(item) => {
                        setDate([item.selection]);
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                    />
                  </div>
                )}
                {openDateModal && (
                  <Modal
                    open={openDateModal}
                    onClose={() => setOpenDateModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="lg:hidden"
                  >
                    <Box sx={style}>
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => {
                          setDate([item.selection]);
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        preventSelection={false}
                      />
                    </Box>
                  </Modal>
                )}
              </div>
              <div className="flex items-center gap-2.5 max-lg:border-[3px] max-lg:border-[#febb02] max-lg:p-3  max-lg:border-b-[6px]">
                <FontAwesomeIcon icon={faPerson} className="text-gray-500" />
                <span
                  onClick={() => {
                    setOpenOptionsModal(!openOptionsModal);
                    setOpenDateModal(false);
                  }}
                  className="text-gray-600 cursor-pointer w-[240px]"
                >
                  {`${options.adult} ${
                    options.adult === 1 ? "adult" : "adults"
                  } · ${options.children} ${
                    options.children === 1 ? "child" : "children"
                  } · ${options.room} ${options.room === 1 ? "room" : "rooms"}`}
                </span>
                {openOptionsModal && (
                  <div className="max-lg:hidden absolute top-[50px] text-gray-600 rounded-md shadow-md bg-white z-10">
                    <div className="flex w-[200px] justify-between m-2.5">
                      <span className="">Adults</span>
                      <div className="flex gap-2.5 items-center text-black text-[12px]">
                        <button
                          disabled={options.adult <= 1}
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer disabled:cursor-not-allowed rounded-full"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <div className="max-w-[6px] flex justify-center items-center m-0 p-0">
                          <span className="">{options.adult}</span>
                        </div>
                        <button
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer rounded-full"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex w-[200px] justify-between m-2.5">
                      <span className="">Children</span>
                      <div className="flex gap-2.5 items-center text-black text-[12px]">
                        <button
                          disabled={options.children <= 0}
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer disabled:cursor-not-allowed rounded-full"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <div className="max-w-[6px] flex justify-center items-center m-0 p-0">
                          <span className="">{options.children}</span>
                        </div>
                        <button
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer rounded-full"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex w-[200px] justify-between m-2.5">
                      <span className="">Rooms</span>
                      <div className="flex gap-2.5 items-center text-black text-[12px]">
                        <button
                          disabled={options.room <= 1}
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer disabled:cursor-not-allowed rounded-full"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <div className="max-w-[6px] flex justify-center items-center m-0 p-0">
                          <span className="">{options.room}</span>
                        </div>
                        <button
                          className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer rounded-full"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {openOptionsModal && (
                  <Modal
                    open={openOptionsModal}
                    onClose={() => setOpenOptionsModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="lg:hidden text-gray-600"
                  >
                    <Box sx={style}>
                      <div className="bg-white p-3 w-[300px] py-7 ">
                        <div className="flex w-full justify-between mb-2">
                          <span>Adults</span>
                          <div className="flex gap-2.5 items-center text-black text-[12px] ml-3 ">
                            <button
                              disabled={options.adult <= 1}
                              className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer disabled:cursor-not-allowed rounded-full"
                              onClick={() => handleOption("adult", "d")}
                            >
                              -
                            </button>
                            <div className="max-w-[6px] flex justify-center items-center m-0 p-0">
                              <span className="">{options.adult}</span>
                            </div>

                            <button
                              className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer rounded-full"
                              onClick={() => handleOption("adult", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex w-full justify-between  mb-2">
                          <span className="">Children</span>
                          <div className="flex gap-2.5 items-center text-black text-[12px]">
                            <button
                              disabled={options.children <= 0}
                              className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer disabled:cursor-not-allowed rounded-full"
                              onClick={() => handleOption("children", "d")}
                            >
                              -
                            </button>
                            <div className="max-w-[6px] flex justify-center items-center">
                              <span className="">{options.children}</span>
                            </div>
                            <button
                              className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer rounded-full"
                              onClick={() => handleOption("children", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex w-full justify-between">
                          <span className="">Rooms</span>
                          <div className="flex gap-2.5 items-center text-black text-[12px]">
                            <button
                              disabled={options.room <= 1}
                              className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer disabled:cursor-not-allowed rounded-full"
                              onClick={() => handleOption("room", "d")}
                            >
                              -
                            </button>
                            <div className="max-w-[6px] flex justify-center items-center">
                              <span className="">{options.room}</span>
                            </div>
                            <button
                              className="w-[30px] h-[30px] border border-[#0071c2] text-[#0071c2] cursor-pointer rounded-full"
                              onClick={() => handleOption("room", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </Box>
                  </Modal>
                )}
              </div>
              <div className="flex items-center gap-2.5">
                <button className="bg-[#0071c2] text-white font-medium p-2.5 cursor-pointer max-lg:w-full max-lg:border-[3px] max-lg:border-[#febb02] max-lg:border-t-0 max-lg:border-b-[6px] max-lg:p-3">
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

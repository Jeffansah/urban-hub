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

const Header = () => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openDate, setOpenDate] = useState(false);

  return (
    <header className="bg-main text-white flex justify-center relative">
      <div className="w-full max-w-5xl mt-5 mx-0 mb-[100px]">
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
        <h1 className="text-4xl font-semibold">
          Unlock Endless Rewards: Unleash the Genius!
        </h1>
        <p className="my-5 mx-0">
          Get rewarded for your travels – unlock instant savings of 10% or more
          with a free Lamabooking account
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
              onClick={() => setOpenDate(!openDate)}
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
                className="absolute top-[50px]"
              />
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <FontAwesomeIcon icon={faPerson} className="text-gray-500" />
            <span className="text-gray-600">2 adults 2 children 1 room</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button className="bg-[#0071c2] text-white font-medium p-2.5 cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

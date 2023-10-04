import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useState, useContext } from "react";
import { SearchContext } from "../../context/searchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfettiExplosion from "react-confetti-explosion";

const Reserve = ({ setOpen, hotelId }) => {
  const { data, loading, error } = useFetch(
    `https://urbanhub.onrender.com/api/hotels/room/${hotelId}`
  );

  const [selectedRooms, setSelectedRooms] = useState([]);

  const [isBooked, setIsBooked] = useState(false);

  const { date } = useContext(SearchContext);

  const navigate = useNavigate();
  const getDatesInRange = (start, end) => {
    const startDate = new Date(start);

    const endDate = new Date(end);

    const date = new Date(startDate.getTime());

    let list = [];

    while (date <= endDate) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return list;
  };

  const allDates = getDatesInRange(date[0].startDate, date[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    console.log(isFound);
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const response = axios.put(
            `https://urbanhub.onrender.com/api/rooms/availability/${roomId}`,
            {
              date: allDates,
            }
          );
        })
      );
      setIsBooked(true);
    } catch (error) {}
  };

  return (
    <div className="fixed inset-0 bg-[#0000007b] z-50 flex items-center justify-center">
      <div className="max-w-screen-md bg-white p-8 rounded-lg relative shadow-lg lg:w-[60vw] max-lg:max-h-screen max-lg:mx-3">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
          onClick={() => {
            setOpen(false);
            setIsBooked(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {!isBooked && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Select Your Rooms
            </h2>
            {!data ? (
              <div className="text-gray-600 text-center">Loading rooms...</div>
            ) : data.length === 0 || data.length > 2 ? (
              <div className="flex flex-col items-center justify-center gap-2.5">
                <img
                  src="https://i.ibb.co/QY3FsrX/Curious-rafiki.png"
                  alt="no-rooms"
                  className="lg:w-[18rem] lg:h-[18rem] max-md:w-[13rem] max-md:h-[13rem]"
                />
                <p className="text-gray-800 max-lg:text-sm">
                  Sorry, No rooms available for this date
                </p>
              </div>
            ) : (
              data.map((item) => (
                <div
                  className="flex  p-4 border-b border-gray-300"
                  key={item.id}
                >
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm max-w-[500px]">
                      {item.description}
                    </p>
                    <div className="text-sm text-gray-500 mt-2">
                      Max People:{" "}
                      <span className="font-semibold">{item.maxPeople}</span>
                    </div>
                    <p className="text-xl font-semibold text-gray-800 mt-2">
                      ${item.price}
                    </p>
                  </div>
                  <div className="flex lg:flex-wrap gap-5">
                    {item.roomNumbers.map((roomNumber) => (
                      <div key={roomNumber._id} className="gap-2 flex flex-col">
                        <label
                          className={`flex items-center text-gray-700 text-xs ${
                            isAvailable(roomNumber)
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          }`}
                        >
                          {roomNumber.number}
                          <input
                            type="checkbox"
                            value={roomNumber._id}
                            onChange={handleSelect}
                            disabled={!isAvailable(roomNumber)}
                            className="ml-1 h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-400 cursor-pointer"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {isBooked && (
          <div className="flex flex-col w-full h-full p-5">
            <p className="text-center text-green-600 font-semibold text-2xl max-lg:text-xl">
              Congratulations! Your booking has been successfully placed. We
              hope you have a delightful stay!
            </p>
            <div className="flex justify-center w-full items-center">
              <ConfettiExplosion
                particleCount={200}
                particleSize={10}
                duration={3000}
                zIndex={1000}
                force={0.7}
                width={2000}
              />
            </div>
            <img
              src="https://img.freepik.com/free-vector/successful-business-man-holding-trophy_1150-35042.jpg?w=740&t=st=1694644646~exp=1694645246~hmac=09568fffa595c37ecbbae1ce46a4431138dddbaa1a92afa8bae32460c424441e"
              alt="success"
              className="w-full h-auto"
            />
            {isBooked && (
              <button
                onClick={() => navigate("/")}
                className="mt-6 py-2.5 px-5 bg-[#0071c2] text-white text-sm rounded-[5px] w-full lg:hidden"
              >
                Go home
              </button>
            )}
          </div>
        )}
        {!isBooked && (
          <button
            onClick={handleClick}
            disabled={selectedRooms.length === 0}
            className="mt-6 py-2.5 px-5 bg-[#0071c2] text-white text-sm rounded-[5px] w-full disabled:bg-gray-300"
          >
            Reserve Now
          </button>
        )}
        {isBooked && (
          <button
            onClick={() => navigate("/")}
            className="mt-6 py-2.5 px-5 bg-[#0071c2] text-white text-sm rounded-[5px] w-full max-lg:hidden"
          >
            Go home
          </button>
        )}
      </div>
    </div>
  );
};

export default Reserve;

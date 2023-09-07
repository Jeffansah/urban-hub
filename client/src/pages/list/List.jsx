import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const List = () => {
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-5xl flex gap-5">
          <div className=" bg-background w-1/4  p-2.5 rounded-[10px] sticky top-10">
            <h1 className="text-xl font-bold text-gray-600 mb-2.5">Search</h1>
            <div className="listItem">
              <label>Destination</label>
              <input type="text" />
            </div>
            <div className="listItem">
              <label>Check-in/out Date</label>
              <span>Date</span>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default List;

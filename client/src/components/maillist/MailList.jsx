import React from "react";

const MailList = () => {
  return (
    <div className="w-full mt-14 bg-main text-white flex flex-col md:items-center max-md:gap-2 gap-5 p-[50px] text-sm">
      <h1 className="max-md:text-2xl text-3xl font-bold">
        Save time, save money!
      </h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInput">
        <input
          type="text"
          placeholder="Your Email Address"
          className="max-lg:w-[285px] w-[300px] h-[40px] lg:h-[50px] p-2.5 border-none mr-2.5 placeholder:text-sm rounded-[5px] max-xs:mb-2.5 mb-3 text-gray-800 focus:outline-none"
        />
        <div className="md:flex justify-center">
          <button className="max-md:h-[40px] flex items-center h-[50px] bg-[#0071c2] text-white font-medium border-none rounded-[5px] p-2">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailList;

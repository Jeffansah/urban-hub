import React from "react";

const MailList = () => {
  return (
    <div className="w-full mt-14 bg-main text-white flex flex-col items-center gap-5 p-[50px] text-sm">
      <h1 className="text-3xl font-bold">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInput">
        <input
          type="text"
          placeholder="Your Email Address"
          className="w-[300px] h-[50px] p-2.5 border-none mr-2.5 placeholder:text-xs rounded-[5px]"
        />
        <button className="h-[50px] bg-[#0071c2] text-white font-medium border-none rounded-[5px] p-2">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default MailList;

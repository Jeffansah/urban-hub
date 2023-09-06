import React from "react";

const DiscountCard = () => {
  return (
    <div className="w-full max-w-5xl flex mt-12 border border-gray-200 rounded-md pb-4">
      <div className="p-6 pl-8">
        <img
          src="https://t-cf.bstatic.com/design-assets/assets/v3.85.0/illustrations-traveller/GlobeGeniusBadge.png"
          alt="Globe-Genius-Badge"
          className="w-40"
        />
      </div>
      <div className="flex flex-col mt-8 max-w-md">
        <h1 className="font-bold text-2xl">
          Discover great deals around the world
        </h1>
        <p className="text-sm text-gray-800 mt-2">
          Save on select hotels and earn coins on bookings in the with Urbanhub.
          Our deals help you to save on trips so you can travel more and manage
          it all on the go.
        </p>
        <div className="flex mt-4 gap-2.5">
          <button className="border border-[#0071c2] bg-white text-[#0071c2] text-sm rounded-sm p-2 px-3">
            Sign in
          </button>
          <button className="text-[#0071c2] text-sm p-2">Register</button>
        </div>
      </div>
    </div>
  );
};

export default DiscountCard;

//<img src="https://t-cf.bstatic.com/design-assets/assets/v3.85.0/illustrations-traveller/GlobeGeniusBadge.png" alt="Globe-Genius-Badge" border="0">
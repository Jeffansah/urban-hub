import React from "react";

const Banner = ({ img, title, description, buttonText }) => {
  return (
    <div className="mt-12 relative cursor-pointer">
      <div className="w-full max-w-5xl flex rounded-md relative h-96 min-w-[1024px]">
        <img src={img} className="rounded-md object-cover w-[1024px]" />
      </div>
      <div className="absolute top-28 left-12">
        <h3 className="text-4xl mb-3 w-64">{title}</h3>
        <p>{description}</p>
        <button className="text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;

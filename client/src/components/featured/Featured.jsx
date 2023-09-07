import React from "react";
import featuredData from "../../data/featuredData";

const Featured = () => {
  return (
    <div className="lg:w-full max-w-5xl max:lg-grid max-lg:grid-cols-2 md:flex md:justify-between md:gap-5 z-1">
      {featuredData.map((item) => (
        <div
          key={item.id}
          className="relative text-white rounded-[10px] overflow-hidden h-[250px] cursor-pointer group max-md:mb-5"
        >
          <img
            src={item.imageSrc}
            alt=""
            className="w-full object-cover group-hover:scale-110 ease-out transition duration-700 max-lg:rounded-b-[10px]"
          />
          <div className="absolute bottom-5 left-5 md:bottom-10 lg:bottom-5">
            <h1 className="font-semibold text-3xl max-md:text-2xl">
              {item.city}
            </h1>
            <h2 className="font-medium lg:text-xl max-md:text-sm md:text-lg">
              {item.propertiesCount} properties
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;

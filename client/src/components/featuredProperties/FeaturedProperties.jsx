import React from "react";
import propertyData from "../../data/propertyData";

const FeaturedProperties = () => {
  return (
    <>
      <div className="w-full max-w-5xl overflow-x-scroll mt-5 scrollbar-hide flex gap-5">
        <div className="flex gap-5  py-3">
          {propertyData.map((property, index) => (
            <div
              key={index}
              className="flex-1 shadow-md rounded-[10px] overflow-hidden cursor-pointer hover:shadow-lg"
            >
              <div className="max-lg:w-52 w-64 lg:h-52 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="h-full max-lg:h-[170px] object-cover rounded-[10px] rounded-b-none w-full "
                />
              </div>
              <div className="flex-1 gap-1.5 flex flex-col p-3 pt-0 mt-3 whitespace-nowrap">
                <span className="font-bold max-md:text-sm max-md:font-semibold">
                  {property.name}
                </span>
                <span className="font-light text-sm max-md:text-xs">
                  {property.location}
                </span>
                <span className="font-medium text-sm max-md:text-xs">
                  Starting from {property.price}
                </span>
                <div className="">
                  <button className="bg-main text-white text-sm p-1 mr-2.5 font-bold rounded-tl-md rounded-tr-md rounded-br-md max-md:text-xs">
                    {property.rating}
                  </button>
                  <span className="text-sm max-md:text-xs">
                    {property.ratingText}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedProperties;

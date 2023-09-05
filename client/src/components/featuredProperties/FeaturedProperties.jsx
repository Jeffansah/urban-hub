import React from "react";
import propertyData from "../../data/propertyData";

const FeaturedProperties = () => {
  return (
    <>
      <div className="w-full max-w-5xl flex justify-between gap-5">
        {propertyData.map((property, index) => (
          <div
            key={index}
            className="flex-1 gap-2.5 flex flex-col shadow-lg rounded-[10px] overflow-hidden cursor-pointer hover:shadow-xl"
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover"
            />
            <div className="flex-1 gap-2.5 flex flex-col p-3 pt-0">
              <span className="font-bold">{property.name}</span>
              <span className="font-light text-sm">{property.location}</span>
              <span className="font-medium text-sm">
                Starting from {property.price}
              </span>
              <div className="fpRating">
                <button className="bg-main text-white text-sm p-1 mr-2.5 font-bold rounded-tl-md rounded-tr-md rounded-br-md">
                  {property.rating}
                </button>
                <span className="text-sm">{property.ratingText}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedProperties;

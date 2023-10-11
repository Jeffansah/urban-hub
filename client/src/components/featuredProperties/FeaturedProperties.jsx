import React, { useContext, useState } from "react";
import propertyData from "../../data/propertyData";
import useFetch from "../../hooks/useFetch";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "https://urbanhub.onrender.com/api/hotels?features=true"
  );

  const navigate = useNavigate();

  return (
    <>
      <div className="w-full max-w-5xl overflow-x-scroll mt-5 scrollbar-hide flex gap-5">
        <div className="flex gap-5  py-3">
          {!data
            ? Array.from({ length: 4 }).map((_) => (
                <Skeleton variant="rounded" width={256} height={280} />
              ))
            : data &&
              data.map((property, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/hotels/${property._id}`)}
                  className="flex-1 shadow-md rounded-[10px] cursor-pointer hover:shadow-lg"
                >
                  <div className="max-lg:w-52 w-64 lg:h-52 overflow-hidden">
                    <img
                      src={property.photos[0]}
                      alt={property.name}
                      className="h-full max-lg:h-[170px] object-cover rounded-[10px] rounded-b-none w-full "
                    />
                  </div>
                  <div className="flex-1 gap-1.5 flex flex-col p-3 pt-0 mt-3 whitespace-nowrap">
                    <span className="font-bold max-md:text-sm max-md:font-semibold">
                      {property.name}
                    </span>
                    <span className="font-light text-sm max-md:text-xs">
                      {property.city}, {property.country}
                    </span>
                    <div className="flex items-center">
                      <span className="font-light text-xs mr-1 text-gray-600 max-lg:text-[11px]">
                        Starting from
                      </span>
                      <span className="font-semibold max-lg:sm lg:text-lg">
                        ${property.cheapestPrice}
                      </span>
                    </div>

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

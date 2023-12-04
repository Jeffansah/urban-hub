import React from "react";
import featuredData from "../../data/featuredData";
import useFetch from "../../hooks/useFetch";
import Skeleton from "@mui/material/Skeleton";
import { CircularProgress } from "@mui/material";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "https://urbanhub.onrender.com/api/hotels/countByCity?cities=Amsterdam,London,Austin"
  );

  return (
    <div className="lg:w-full max-w-5xl max:lg-grid max-lg:grid-cols-2 md:flex md:justify-between md:gap-5 z-1">
      {!data
        ? Array.from({ length: 3 }).map((_) => (
            <Skeleton
              variant="rounded"
              width={300}
              height={250}
              className="max-md:mb-2"
            />
          ))
        : data &&
          featuredData.map((item, index) => (
            <div
              key={index}
              className="relative text-white rounded-[10px] overflow-hidden h-[250px] cursor-pointer group max-md:mb-5 w-full"
            >
              <img
                src={item.imageSrc}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 ease-out transition duration-700 max-lg:rounded-b-[10px]"
              />
              <div className="absolute bottom-5 left-5">
                <h1 className="font-semibold text-3xl max-md:text-2xl">
                  {item.city}
                </h1>
                <h2 className="font-medium lg:text-xl max-md:text-sm md:text-lg">
                  {!data ? "properties" : data[index]} propert
                  {data[index] === 1 ? "y" : "ies"}
                </h2>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Featured;

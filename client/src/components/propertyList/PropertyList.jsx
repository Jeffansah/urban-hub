import { Skeleton } from "@mui/material";
import propertyData from "../../data/propertyList";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  const { data, loading, error } = useFetch(
    "https://urbanhub.onrender.com/api/hotels/countByType"
  );

  return (
    <>
      <div className="w-full max-w-5xl overflow-x-scroll mt-5 scrollbar-hide flex gap-5">
        {!data
          ? Array.from({ length: 6 }).map((_) => (
              <Skeleton variant="rounded" width={150} height={150} />
            ))
          : data &&
            propertyData.map((property, index) => (
              <div
                key={index}
                className="rounded-[10px]  cursor-pointer flex-1"
              >
                <div className="w-36">
                  <img
                    src={property.imageUrl}
                    alt=""
                    className="h-[150px] object-cover rounded-[10px]"
                  />
                </div>

                <div className="mt-2">
                  <h1 className="text-[16px] font-semibold max-md:text-sm max-md:font-medium">
                    {property.title}
                  </h1>
                  <h2 className="text-sm font-light max-md:text-xs capitalize">
                    {`${data[index].count} ${data[index].type}${
                      data[index].count !== 1 ? "s" : ""
                    }`}
                  </h2>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default PropertyList;

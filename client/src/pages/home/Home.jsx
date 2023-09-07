import { useState } from "react";
import Banner from "../../components/banner/Banner";
import DiscountCard from "../../components/discountcard/DiscountCard";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/header/Header";
import MailList from "../../components/maillist/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import SmallCard from "../../components/smallcard/SmallCard";
import vacationCities from "../../data/vacationCities";
import "./home.css";
import popularPlaces from "../../data/placesOfInterest";
import Footer from "../../components/footer/Footer";

const Home = () => {
  const [showCities, setShowCities] = useState(true);
  const [showPlaces, setShowPlaces] = useState(false);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Header />
      <div className="mt-[50px] lg:flex lg:flex-col md:items-center max-lg:px-5">
        <Featured />
        <h1 className="w-[1024px] max-md:text-lg text-xl max-md:font-medium font-bold mt-12">
          Browse property by type
        </h1>
        <PropertyList />
        <h1 className="w-[1024px] max-md:text-lg max-md:font-medium text-xl font-bold mt-12">
          Homes guests love
        </h1>
        <FeaturedProperties />
        <DiscountCard />
        <Banner
          img="https://i.ibb.co/80nTW8n/wepik-export-2023090519192693-OO.png"
          title="The Greatest Outdoors"
          description="Wishlists curated by UrbanHub"
          buttonText="Get Inspired"
        />

        <h1 className="w-[1024px] text-xl font-bold mt-12 max-md:text-lg max-md:font-medium">
          Destinations we love
        </h1>
        <div className="flex max-w-5xl w-full gap-8 text-sm mt-4">
          <button
            onClick={() => {
              setShowCities(true);
              setShowPlaces(false);
            }}
            className={`${
              showCities &&
              "border border-[#0071c2] bg-white text-[#0071c2] text-sm rounded-3xl"
            }  p-2 px-3`}
          >
            Cities
          </button>
          <button
            className={`${
              showPlaces &&
              "border border-[#0071c2] bg-white text-[#0071c2] text-sm rounded-3xl"
            }  p-2 px-3`}
            onClick={() => {
              setShowCities(false);
              setShowPlaces(true);
            }}
          >
            Places of interest
          </button>
        </div>
        {showCities && (
          <div className="lg:w-[1024px] grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5 mt-4">
            {vacationCities.map((item) => (
              <SmallCard key={item.city} {...item} />
            ))}
          </div>
        )}
        {showPlaces && (
          <div className="md:w-[1024px] grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5  mt-4">
            {popularPlaces.map((item) => (
              <SmallCard key={item.place} {...item} />
            ))}
          </div>
        )}
      </div>
      <MailList />
      <Footer />
    </div>
  );
};

export default Home;

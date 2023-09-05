import Banner from "../../components/banner/Banner";
import DiscountCard from "../../components/discountcard/DiscountCard";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/header/Header";
import MailList from "../../components/maillist/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import SmallCard from "../../components/smallcard/SmallCard";
import { locationsData } from "../../data/locationsData";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="mt-[50px] flex flex-col items-center gap-[30px]">
        <Featured />
        <h1 className="w-[1024px] text-xl font-bold mt-2">
          Browse property by type
        </h1>
        <PropertyList />
        <h1 className="w-[1024px] text-xl font-bold mt-2">Homes guests love</h1>
        <FeaturedProperties />
        <DiscountCard />
        <Banner
          img={"https://links.papareact.com/4cj"}
          title="The Greatest Outdoors"
          description="Wishlists curated by Urban Hub"
          buttonText="Get Inspired"
        />
        <MailList />
        <div className="w-[1024px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {locationsData.map((item) => (
            <SmallCard
              key={item.location}
              img={item.img}
              distance={item.distance}
              location={item.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

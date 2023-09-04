import Featured from "../../components/featured/Featured";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="mt-[50px] flex flex-col items-center gap-[30px]">
        <Featured />
        <h1 className="w-[1024px] text-lg font-bold">
          Browse property by type
        </h1>
        <PropertyList />
      </div>
    </div>
  );
};

export default Home;

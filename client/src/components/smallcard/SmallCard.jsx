const SmallCard = ({ city, properties, place }) => {
  return (
    <div className="flex items-center space-x-4 rounded-xl hover:bg-gray-100  cursor-pointer hover:scale-105 transition transform duration-200 ease-out">
      <div className="p-2">
        <h2 className="text-sm font-semibold">{city || place}</h2>
        <h3 className="text-gray-500 text-sm">{`${properties} properties`}</h3>
      </div>
    </div>
  );
};

export default SmallCard;

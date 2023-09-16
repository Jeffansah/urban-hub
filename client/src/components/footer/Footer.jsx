import { footerLinks } from "../../data/footerLinks";

const Footer = () => {
  return (
    <div className="w-full max-w-[1024px] text-xs sm:mt-12 max-lg:px-5 mt-6 mx-auto">
      <div className="w-full max-lg:grid max-sm:grid-cols-3 md:grid-cols-5 lg:flex lg:justify-between mb-[50px] max-lg:gap-3">
        {footerLinks.lists.map((list, index) => (
          <ul className="p-0" key={index}>
            <li className="mb-2.5 text-main font-bold text-md cursor-pointer">
              {list.title}
            </li>
            {list.items.map((item, itemIndex) => (
              <li
                className="mb-2.5 text-gray-800 cursor-pointer hover:text-[#0071c2]"
                key={itemIndex}
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className="text-center mb-2 cursor-default">
        {footerLinks.copyrightText}
      </div>
    </div>
  );
};

export default Footer;

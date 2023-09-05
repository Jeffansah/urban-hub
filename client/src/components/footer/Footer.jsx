import { footerLinks } from "../../data/footerLinks";

const Footer = () => {
  return (
    <div className="w-full max-w-[1024px] text-xs mt-12">
      <div className="w-full flex justify-between mb-[50px]">
        {footerLinks.lists.map((list, index) => (
          <ul className="p-0" key={index}>
            <li className="mb-2.5 text-main font-bold text-md cursor-pointer">
              {list.title}
            </li>
            {list.items.map((item, itemIndex) => (
              <li
                className="mb-2.5 text-gray-800 cursor-pointer"
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

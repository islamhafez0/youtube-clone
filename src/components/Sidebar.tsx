import { SetStateAction } from "react";
import {
  HomeIcon,
  MenuIcon,
  ShortsIcon,
  SubscriptionsIcon,
  YoutubeLogo,
} from "../utils/icons";
import { categories, sidebarInfo, youList } from "../utils/consonants";

const Sidebar = ({
  setShowSidebar,
  showSidebar,
}: {
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
}) => {
  const CloseSideBar = () => {
    setShowSidebar((prev) => !prev);
  };
  return (
    <nav
      className={`${
        showSidebar ? "translate-x-0" : "-translate-x-80"
      } transition-all w-60 bg-[#0f0f0f] fixed top-0 left-0 z-50 h-dvh`}
    >
      <div className=" flex items-center gap-4 h-14 pl-4 fixed top-0 bg-[#0f0f0f] w-60">
        <button
          aria-label="menu"
          className="h-10 w-10 hover:bg-[#ffffff1a] rounded-full flex items-center justify-center transition-all"
          onClick={CloseSideBar}
        >
          <MenuIcon />
        </button>
        <div>
          <YoutubeLogo />
        </div>
      </div>
      <div className="sidebar-scrollbar h-full">
        <ul className="p-3 mt-14">
          <li className="flex items-center h-10 bg-[#ffffff1a] px-3 rounded-lg gap-6 text-sm">
            <HomeIcon />
            Home
          </li>
          <li className="flex items-center h-10 hover:bg-[#ffffff1a] px-3 rounded-lg gap-6 text-sm">
            <ShortsIcon />
            Shorts
          </li>
          <li className="flex items-center h-10 hover:bg-[#ffffff1a] px-3 rounded-lg gap-6 text-sm">
            <SubscriptionsIcon />
            Subscriptions
          </li>
        </ul>

        <hr className="border-[#ffffff1a] px-2" />

        <ul className="p-3">
          <h4 className="mb-3">Explore</h4>
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex items-center h-10 hover:bg-[#ffffff1a] px-3 rounded-lg gap-6 text-sm cursor-pointer"
            >
              {cat.icon}
              {cat.name}
            </li>
          ))}
        </ul>

        <hr className="border-[#ffffff1a] px-2" />

        <ul className="p-3">
          <h4 className="mb-3">You</h4>
          {youList.map((cat, inx) => (
            <li
              key={inx}
              className="flex items-center h-10 hover:bg-[#ffffff1a] px-3 rounded-lg gap-6 text-sm cursor-pointer"
            >
              {cat.icon}
              {cat.name}
            </li>
          ))}
        </ul>

        <hr className="border-[#ffffff1a] px-2" />

        <ul className="p-3">
          {sidebarInfo.map((cat, inx) => (
            <li
              key={inx}
              className="flex items-center h-10 hover:bg-[#ffffff1a] px-3 rounded-lg gap-6 text-sm cursor-pointer"
            >
              {cat.icon}
              {cat.name}
            </li>
          ))}
        </ul>

        <hr className="border-[#ffffff1a] px-2" />
        <p className="text-[#717171] p-6 text-[12px]">
          &copy; Eslam Hafez {new Date().getFullYear()} &#9825;
        </p>
      </div>
    </nav>
  );
};

export default Sidebar;

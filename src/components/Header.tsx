import { FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import MobileSearchBar from "./MobileSearchBar";
import {
  CreateVideoIcon,
  MenuIcon,
  NotificationsIcon,
  SearchIcon,
  YoutubeLogo,
} from "../utils/icons";
import Categories from "./Categories";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQueryContext } from "../contexts/QueryContext";

const Header = ({
  setShowSidebar,
}: {
  setShowSidebar: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { query, setQuery } = useQueryContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() == "") return;
    navigate(`/results?q=${query.split(" ").join("+")}`);
  };

  useEffect(() => {
    if (location.pathname == "/") {
      setQuery("");
    }
  }, [location.pathname]);

  const [mobileSearchBar, setMobileSearchBar] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <header className="fixed top-0 w-full bg-[#0f0f0f] px-2 md:px-4 z-10 flex flex-col">
      <div className="h-14 flex gap-4 items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            aria-label="menu"
            className="h-10 w-10 hover:bg-[#ffffff1a] rounded-full flex items-center justify-center transition-all"
            onClick={() => setShowSidebar(true)}
          >
            <MenuIcon />
          </button>
          <Link to="/" aria-label="youtube logo">
            <YoutubeLogo />
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="hidden sm:flex flex-1 justify-end w-[calc(100%-30px)] max-w-[550px] group"
        >
          <div className="relative flex items-center w-[calc(100%-40px)] group group-focus-within:w-full">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="border-[#303030] border bg-transparent h-10 px-4 rounded-l-full w-full outline-none focus:border-[#065fd4] "
              placeholder="Search"
            />
            <button
              aria-label="search"
              type="submit"
              className="h-10 px-5 bg-[#303030] border-[#303030] border  rounded-r-full flex items-center justify-center"
            >
              <SearchIcon />
            </button>
          </div>
        </form>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileSearchBar(true)}
            aria-label="search for videos"
            className="sm:hidden h-10 w-10 hover:bg-[#ffffff1a] rounded-full flex items-center justify-center transition-all"
          >
            <SearchIcon />
          </button>
          <button
            aria-label="create video"
            className="h-10 w-10 hover:bg-[#ffffff1a] rounded-full flex items-center justify-center transition-all"
          >
            <CreateVideoIcon />
          </button>
          <button
            aria-label="noifications"
            className="hidden h-10 w-10 hover:bg-[#ffffff1a] rounded-full sm:flex items-center justify-center transition-all"
          >
            <NotificationsIcon />
          </button>
          <button>
            <img
              src="/assets/user.jpg"
              width={32}
              height={32}
              alt="user"
              className="rounded-full"
              loading="lazy"
            />
          </button>
        </div>
        {mobileSearchBar && (
          <MobileSearchBar
            handleSubmit={handleSubmit}
            setMobileSearchBar={setMobileSearchBar}
            query={query}
            setQuery={setQuery}
          />
        )}
      </div>
      <Categories />
    </header>
  );
};

export default Header;

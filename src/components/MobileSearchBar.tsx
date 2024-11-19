import { FormEvent, SetStateAction, useEffect, useRef } from "react";
import { IoArrowBack } from "react-icons/io5";
import { SearchIcon } from "../utils/icons";

const MobileSearchBar = ({
  setMobileSearchBar,
  handleSubmit,
  query,
  setQuery,
}: {
  setMobileSearchBar: React.Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent) => void;
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="sm:hidden absolute left-0 top-0 h-14 w-full bg-[#0f0f0f] flex items-center justify-between gap-1.5 px-2">
      <button
        onClick={() => setMobileSearchBar(false)}
        aria-label="back"
        className="h-10 w-10 hover:bg-[#ffffff1a] rounded-full flex items-center justify-center transition-all"
      >
        <IoArrowBack size={24} />
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex justify-end w-[calc(100%-30px)] group"
      >
        <div className="flex items-center w-[calc(100%-40px)] group group-focus-within:w-full">
          <input
            ref={inputRef}
            type="text"
            className="border-[#303030] border bg-transparent h-10 px-4 rounded-l-full w-full outline-none focus:border-[#065fd4] "
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
    </div>
  );
};

export default MobileSearchBar;

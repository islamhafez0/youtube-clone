import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { videoCategories } from "../utils/consonants";

const Categories = () => {
  const categoriesRef = useRef<HTMLUListElement>(null);

  const scrollLeft = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-14 flex items-center justify-center gap-2 z-10">
      <button
        onClick={scrollLeft}
        className="z-10 h-10 w-10 hover:bg-[#ffffff1a] flex items-center justify-center rounded-full opacity-80 hover:opacity-100"
      >
        <IoIosArrowBack size={24} />
      </button>
      <ul
        className="flex items-center gap-3 overflow-hidden scrollbar-hide max-w-[calc(100%-96px)]"
        ref={categoriesRef}
      >
        {videoCategories.map((category) => (
          <li
            key={category.id}
            className="whitespace-nowrap bg-[#ffffff1a] px-3 h-8 grid place-content-center rounded-md text-sm hover:bg-[#fff3]"
          >
            <button>{category.title}</button>
          </li>
        ))}
      </ul>
      <button
        onClick={scrollRight}
        className="z-10 h-10 w-10 hover:bg-[#ffffff1a] flex items-center justify-center rounded-full opacity-80 hover:opacity-100"
      >
        <IoIosArrowForward size={24} />
      </button>
    </div>
  );
};

export default Categories;

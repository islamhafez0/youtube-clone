const Skeleten = () => {
  return (
    <li>
      <div className="bg-[#1c1c1c] rounded-lg shadow-lg aspect-video">
        <div className="w-full h-full rounded-lg"></div>
      </div>
      <div className="mt-3.5 flex items-start gap-3">
        <div className="rounded-full w-8 h-8 bg-[#1c1c1c]"></div>
        <div className="flex flex-col gap-4 w-3/4">
          <div className="bg-[#1c1c1c] w-3/4 h-4"></div>
          <div className="bg-[#1c1c1c] w-1/2 h-4"></div>
        </div>
      </div>
    </li>
  );
};

export default Skeleten;

{
  /* <div className="w-full h-14 flex items-center justify-center gap-2 px-2 animate-pulse">
<div className="z-10 h-10 w-10 rounded-full bg-[#1c1c1c]"></div>
<ul className="flex items-center justify-center gap-3 overflow-hidden scrollbar-hide md:w-full max-w-[calc(100%-96px)]">
  {Array(categoriesTofill)
    .fill(null)
    .map((_, index) => (
      <li
        key={index}
        className="whitespace-nowrap  w-24 h-8 rounded-md"
      ></li>
    ))}
</ul>
<div className="z-10 h-10 w-10 rounded-full bg-[#1c1c1c]"></div>
</div> */
}

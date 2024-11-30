import { useSearchParams } from "react-router-dom";
import { useQueryResults } from "../hooks/useQueryResults";
import { FilledShortsICon } from "../utils/icons";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Spinner from "./Spinner";
import VideoResultCard from "./VideoResultCard";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const {
    queryResults: results,
    error,
    isLoading,
    hasMoreResults,
    loadMoreResults,
    loadingMoreResults,
  } = useQueryResults(query!);

  const { inView, ref } = useInView({
    threshold: 0,
    rootMargin: "-16px 0px 16px 0px",
  });

  useEffect(() => {
    if (inView && !isLoading) {
      loadMoreResults();
    }
  }, [inView]);

  if (isLoading) {
    return (
      <div className="flex justify-center w-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center">
        <pre className="bg-red-500 p-4 text-center rounded-lg text-sm whitespace-break-spaces">
          {error}
        </pre>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-xl mb-8">
        Showing results for <strong>{query}</strong>
      </h1>
      <div>
        {results.shorts.length !== 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <p className="flex gap-2 text-xl font-bold">
                <FilledShortsICon /> Shorts
              </p>
              <button>
                <BiDotsHorizontalRounded />
              </button>
            </div>
            <ul>
              {results.shorts.slice(0, 3).map((video) => (
                <VideoResultCard key={uuidv4()} video={video} />
              ))}
            </ul>
          </div>
        )}
        <div>
          <hr className="border border-[#aaa3] w-full" />
          <div className="flex items-center justify-between my-8">
            <p className="flex gap-2 text-xl font-bold">People also watched</p>
            <button>
              <BiDotsHorizontalRounded />
            </button>
          </div>
          <ul className="flex flex-col">
            {results.videos.map((video) => (
              <VideoResultCard key={uuidv4()} video={video} />
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center" ref={ref}>
        {loadingMoreResults && <Spinner />}
        {!hasMoreResults && !error && (
          <p className="bg-[#0202021a] text-gray-300 rounded-md py-1.5 px-8">
            No more videos
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

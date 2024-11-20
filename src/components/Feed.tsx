import VideoCard from "./VideoCard";
import { useTrendingVideos } from "../hooks/useTrendingVideos";
import Spinner from "./Spinner";
import Skeleten from "./Skeleten";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Feed = () => {
  const {
    loading,
    isLoadingMore,
    loadMoreVideos,
    videos,
    error,
    hasMoreVideos,
  } = useTrendingVideos();
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && !loading) {
      loadMoreVideos();
    }
  }, [inView]);

  if (error)
    return (
      <div className="w-full flex justify-center">
        <pre className="bg-red-500 p-4 text-center rounded-lg text-sm whitespace-break-spaces">
          {error}
        </pre>
      </div>
    );

  return (
    <div className="w-full">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-8">
        {loading
          ? Array(9)
              .fill(null)
              .map((_, inx) => <Skeleten key={inx} />)
          : videos.map((video, inx) => (
              <VideoCard video={video} key={video.id + "-" + inx} />
            ))}
      </ul>
      <div className="mt-8 flex justify-center" ref={ref}>
        {isLoadingMore && (
          <div className="py-1.5">
            <Spinner />
          </div>
        )}
        {!hasMoreVideos && !loading && (
          <p className="bg-[#0202021a] text-gray-300 rounded-md py-1.5 px-8">
            No more videos
          </p>
        )}
      </div>
    </div>
  );
};

export default Feed;

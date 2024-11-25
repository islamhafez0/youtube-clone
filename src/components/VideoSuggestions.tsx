import { Link } from "react-router-dom";
import { formatTimeAgo } from "../utils/helpers";
import Spinner from "./Spinner";
import { useVideoSuggestions } from "../hooks/useVideoSuggestions";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const VideoSuggestions = ({
  videoCategoryId,
  isLoading,
}: {
  videoCategoryId: string;
  isLoading: boolean;
}) => {
  const {
    isLoadingMoreResults,
    loadingSuggestions,
    suggestions,
    loadMoreResults,
    hasMore,
    error,
  } = useVideoSuggestions(videoCategoryId);
  const { ref, inView } = useInView({ threshold: 0.5 });
  useEffect(() => {
    if (inView && !isLoading) {
      loadMoreResults();
    }
  }, [inView]);
  if (loadingSuggestions) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  if (error)
    return (
      <div className="flex justify-center">
        <pre className="bg-red-500 p-4 text-center rounded-lg text-sm whitespace-break-spaces">
          {error}
        </pre>
      </div>
    );

  return (
    <div className="w-full lg:w-1/4">
      <ul>
        {suggestions?.map((video, inx) => (
          <li key={video.id.videoId + inx}>
            <Link
              to={`/watch?v=${video.id.videoId}`}
              className="flex items-start gap-2 mb-4"
            >
              <div className="group rounded-lg overflow-hidden group w-[160px]">
                <img
                  className="w-full transition-transform duration-300 transform hover:scale-105"
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  loading="lazy"
                />
              </div>
              <div className="w-[calc(100%-165px)]">
                <p className="truncate text-sm font-bold">
                  {video.snippet.title}
                </p>
                <p className="text-sm text-[#aaa] truncate">
                  {video.snippet.channelTitle}
                </p>
                <div className="flex gap-4 items-center">
                  <span className="text-[#aaa] text-[12px] truncate">
                    {formatTimeAgo(video.snippet.publishedAt)}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mb-4 flex justify-center" ref={ref}>
        {isLoadingMoreResults && <Spinner />}
        {!hasMore && !loadingSuggestions && (
          <p className="bg-[#0202021a] text-gray-300 rounded-md py-1.5 px-8">
            No more videos
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoSuggestions;

import { Link } from "react-router-dom";
import { formatTimeAgo } from "../utils/helpers";
import Spinner from "./Spinner";
import { useVideoSuggestions } from "../hooks/useVideoSuggestions";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const VideoSuggestions = ({
  isLoading,
  categoryId,
}: {
  isLoading: boolean;
  categoryId: string;
}) => {
  const {
    isLoadingMoreResults,
    loadingSuggestions,
    suggestions,
    loadMoreResults,
    hasMore,
    error,
  } = useVideoSuggestions(categoryId);

  const { ref, inView } = useInView({ threshold: 0.5 });
  const [imageLoaded, setImageLoaded] = useState(false);
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
              <div
                className={`group rounded-lg overflow-hidden group aspect-video w-[160px] ${
                  !imageLoaded && "bg-[#1c1c1c]"
                }`}
              >
                <img
                  className={`w-full h-full transition-all duration-300 transform hover:scale-105 ${
                    !imageLoaded && "blur-sm"
                  }`}
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              <div className="w-[calc(100%-165px)]">
                <p
                  title={video.snippet.title}
                  className="truncate text-sm font-bold"
                >
                  {video.snippet.title}
                </p>
                <p
                  tabIndex={0}
                  title={video.snippet.channelTitle}
                  className="text-sm text-[#aaa] truncate cursor-pointer"
                >
                  {video.snippet.channelTitle}
                </p>
                <div className="flex gap-4 items-center">
                  <span
                    title={formatTimeAgo(video.snippet.publishedAt)}
                    className="text-[#aaa] text-[12px] truncate"
                  >
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

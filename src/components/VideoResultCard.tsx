import { Video } from "../types";
import { Link } from "react-router-dom";
import {
  formatNumber,
  formatTimeAgo,
  formatYouTubeDuration,
} from "../utils/helpers";

const VideoResultCard = ({ video }: { video: Video }) => {
  return (
    <li className="mb-4 py-4 px-2 shadow-2xl">
      <Link
        to={`/watch?v=${video.id}`}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="w-full sm:w-1/2 rounded-lg group overflow-hidden relative">
          <img
            src={
              video.snippet.thumbnails.maxres?.url ??
              video.snippet.thumbnails.standard?.url ??
              video.snippet.thumbnails.high?.url
            }
            className="relative w-full object-cover transition-transform duration-300 transform hover:scale-105"
            alt={video.snippet.title}
            loading="lazy"
          />
          <span className="absolute right-2 bottom-2 bg-[#0009] min-w-10 text-center text-xs px-[1px] py-[4px] rounded-sm group-hover:opacity-0 transition-opacity duration-500">
            {formatYouTubeDuration(video.contentDetails.duration)}
          </span>
        </div>
        <div className="w-full sm:w-1/3 flex-1">
          <h2>{video.snippet.title}</h2>
          <div className="flex items-center gap-4 text-[12px] text-[#aaaaaa] mt-1">
            <span className="relative after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-[10px] after:bg-[#aaaaaa] after:w-1 after:h-1 after:rounded-full">
              {formatNumber(video.statistics.viewCount)} views
            </span>
            <span>{formatTimeAgo(video.snippet.publishedAt)}</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <img
              className="w-7 h-7 rounded-full"
              src={video.avatar}
              alt={video.snippet.title}
            />
            <p className="text-[12px] text-[#aaaaaa]">
              {video.snippet.channelTitle}
            </p>
          </div>
          <div>
            <p className="hidden sm:block max-h-20 mt-4 truncate text-[#aaaaaa]">
              {video.snippet.description}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default VideoResultCard;

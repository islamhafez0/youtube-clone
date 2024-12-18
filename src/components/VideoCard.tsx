import { Link } from "react-router-dom";
import { Video } from "../types";
import {
  formatNumber,
  formatTimeAgo,
  formatYouTubeDuration,
} from "../utils/helpers";
import { useState } from "react";

const VideoCard = ({ video }: { video: Video }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      {video && (
        <li>
          <Link to={`/watch?v=${video.id}`}>
            <div
              className={`${
                !imageLoaded ? "bg-[#1c1c1c]" : ""
              } overflow-hidden rounded-lg shadow-lg relative group aspect-video`}
            >
              <img
                src={
                  video.snippet.thumbnails.maxres?.url ??
                  video.snippet.thumbnails.standard?.url
                }
                className={`h-full w-full object-cover transition-all duration-300 transform hover:scale-105 ${
                  !imageLoaded ? "blur-sm" : ""
                }`}
                alt={video.snippet.title}
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
              <span className="absolute right-2 bottom-2 bg-[#0009] min-w-10 text-center text-xs px-[1px] py-[4px] rounded-sm group-hover:opacity-0 transition-opacity duration-500">
                {formatYouTubeDuration(video.contentDetails.duration)}
              </span>
            </div>
            <div className="mt-3.5">
              <div className="flex items-start gap-3">
                <img
                  className="rounded-full w-8 h-8"
                  src={video.avatar}
                  alt={video.snippet.channelTitle}
                />
                <div className="overflow-hidden">
                  <p
                    className="text-base text-[#f1f1f1] mb-1 pr-2 md:truncate"
                    title={video.snippet.title}
                  >
                    {video.snippet.title}
                  </p>
                  <span
                    className="text-sm text-[#aaa]"
                    title={video.snippet.channelTitle}
                  >
                    {video.snippet.channelTitle}
                  </span>
                  <div className="flex gap-4 items-center">
                    <p className="text-[#aaa] text-[12px] relative after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-[10px] after:bg-[#aaaaaa] after:w-1 after:h-1 after:rounded-full">
                      {formatNumber(video.statistics.viewCount)}
                    </p>
                    <span className="text-[#aaa] text-[12px]">
                      {formatTimeAgo(video.snippet.publishedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
      )}
    </>
  );
};

export default VideoCard;

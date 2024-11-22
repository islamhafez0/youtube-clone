import YoutubeVideoFrame from "./YoutubeVideoFrame";
import { formatDate, formatNumber } from "../utils/helpers";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Video } from "../types";
import { useState } from "react";

const VideoDetailsCard = ({
  videoId,
  video,
}: {
  videoId: string;
  video: Video;
}) => {
  const [expnadDescription, setExpandDescription] = useState(false);
  return (
    <div className="w-full lg:w-2/3">
      <div className="w-full h-[240px] md:h-[366px] rounded-lg overflow-hidden shadow-2xl">
        <YoutubeVideoFrame videoId={videoId} />
      </div>
      <h1 className="font-bold text-xl mt-3">{video?.snippet.title}</h1>
      <div className="mt-6 flex flex-col sm:flex-row items-start">
        <div className="flex gap-4">
          <div className="flex items-start gap-2.5">
            <img
              src={video?.channelDetails.snippet.thumbnails.default.url}
              alt={video?.channelDetails.snippet.title}
              className="w-9 h-9 rounded-full"
            />
            <div className="flex flex-col">
              <h2 className="text-sm">{video?.channelDetails.snippet.title}</h2>
              <span className="text-[12px] text-[#aaaaaa]">
                {formatNumber(
                  video?.channelDetails.statistics.subscriberCount!
                )}{" "}
                subscribers
              </span>
            </div>
          </div>
          <button className="bg-white hover:bg-[#d9d9d9] text-black w-24 h-10 rounded-full ml-4">
            Subscribe
          </button>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-4 md:ml-9">
          <div className="flex">
            <button className="bg-[#ffffff1a] hover:bg-[#fff3] text-[#f1f1f1] flex items-center gap-1 h-10 px-3 rounded-l-full relative after:content-[''] after:absolute after:h-[25px] after:w-[1.4px] after:bg-[#fff3] after:right-0">
              <AiOutlineLike size={22} />
              <span>{formatNumber(video?.statistics.likeCount!)}</span>
            </button>
            <button
              aria-label="dislike"
              className="bg-[#ffffff1a] hover:bg-[#fff3] text-[#f1f1f1] h-10 px-3 rounded-r-full"
            >
              <AiOutlineDislike size={22} />
            </button>
          </div>
          <button className="bg-[#ffffff1a] hover:bg-[#fff3] text-[#f1f1f1] h-10 px-3 rounded-full flex items-center gap-1">
            Share <PiShareFatThin size={22} />
          </button>
          <button
            aria-label="dots"
            className="bg-[#ffffff1a] hover:bg-[#fff3] text-[#f1f1f1] h-10 w-10 rounded-full flex items-center justify-center"
          >
            <BiDotsHorizontalRounded size={22} />
          </button>
        </div>
      </div>
      <div className=" bg-[#ffffff1a] mt-3 p-3 rounded-lg">
        <div
          className={`${
            !expnadDescription ? "h-[73px]" : "h-auto"
          } overflow-hidden`}
        >
          <div className="flex gap-2 text-sm flex-wrap">
            <span>{formatNumber(video?.statistics.viewCount!)} views</span>
            <span>{formatDate(video?.snippet.publishedAt!)}</span>
          </div>
          <p className="mt-4 break-words text-sm">
            {video?.snippet.description!}
          </p>
        </div>
        <button
          className={`${expnadDescription ? "mt-4" : ""} py-1 text-sm`}
          onClick={() => setExpandDescription((prev) => !prev)}
        >
          {expnadDescription ? "Show less" : "more..."}
        </button>
      </div>
      <div className="font-bold my-6">
        {video.statistics.commentCount} Comments
      </div>
    </div>
  );
};

export default VideoDetailsCard;

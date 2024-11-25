import { useSearchParams } from "react-router-dom";
import { useSingleVideo } from "../hooks/useSingleVideo";
import Spinner from "./Spinner";
import VideoSuggestions from "./VideoSuggestions";
import VideoDetailsCard from "./VideoDetailsCard";

const VideoDetails = () => {
  const [searchParams] = useSearchParams();
  const videoId = String(searchParams.get("v"));
  const { video, error, isLoading } = useSingleVideo(videoId);

  if (isLoading) {
    return (
      <div className="flex justify-center w-full">
        <Spinner />
      </div>
    );
  }
  if (error)
    return (
      <div className="w-full flex justify-center">
        <pre className="bg-red-500 p-4 text-center rounded-lg text-sm whitespace-break-spaces">
          {error}
        </pre>
      </div>
    );
  return (
    <div>
      {video && (
        <>
          <div className="flex flex-col lg:flex-row flex-wrap gap-6 items-start">
            <VideoDetailsCard video={video} videoId={videoId} />
            <VideoSuggestions
              videoCategoryId={video?.snippet?.categoryId}
              isLoading={isLoading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VideoDetails;

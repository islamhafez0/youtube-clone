import { useEffect, useState } from "react";
import { Video } from "../types";
import { getChannelDetails, getSingleVideo } from "../services/api";

export const useSingleVideo = (videoId: string) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchVideo = async () => {
      setIsLoading(true);
      try {
        const video = await getSingleVideo(videoId);
        const channelDetails = await getChannelDetails(video.snippet.channelId);
        setVideo({ ...video, channelDetails });
      } catch (error) {
        console.log("Error getting single video", error);
        setError(`Error getting video with id: ${videoId}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideo();
  }, [videoId]);
  return { video, isLoading, error };
};

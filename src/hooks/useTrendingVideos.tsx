import { useCallback, useEffect, useState } from "react";
import { getTrendingVideos } from "../services/api";
import { Video } from "../types";
export const useTrendingVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTrendingVideos = async () => {
      setLoading(true);
      try {
        const response = await getTrendingVideos(null);
        setVideos(response.videos);
        setNextPageToken(response.nextPageToken);
      } catch (error) {
        console.log(error);
        setError("Error getting trending videos please try again later!");
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingVideos();
  }, []);

  const loadMoreVideos = useCallback(async () => {
    if (loading || !nextPageToken) return;
    setIsLoadingMore(true);
    try {
      const response = await getTrendingVideos(nextPageToken);
      setVideos((prev) => [...prev, ...response.videos]);
      setNextPageToken(response.nextPageToken);
    } catch (error) {
      console.error(`Error fetching next page of videos`);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, nextPageToken]);
  return {
    videos,
    nextPageToken,
    loading,
    isLoadingMore,
    loadMoreVideos,
    error,
    hasMoreVideos: !!nextPageToken,
  };
};

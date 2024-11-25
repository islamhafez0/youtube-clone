import { useCallback, useEffect, useState } from "react";
import { VideoResult } from "../types";
import { getVideoSuggestions } from "../services/api";

export const useVideoSuggestions = (id: string) => {
  const [suggestions, setSuggestions] = useState<VideoResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextPageToken, setNextPageToken] = useState<null | string>(null);
  const [isLoadingMoreResults, setIsLoadingMoreResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError("");
        const response = await getVideoSuggestions(id, null);
        setSuggestions(response.suggestions);
        setNextPageToken(response.nextPageToken);
      } catch (error) {
        console.log("Error getting video suggestions");
        setError("Error getting video suggestions");
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, [id]);

  const loadMoreResults = useCallback(async () => {
    if (loading || !nextPageToken) return;
    setIsLoadingMoreResults(true);
    try {
      const response = await getVideoSuggestions(id, nextPageToken);
      setSuggestions((prev) => [...prev, ...response.suggestions]);
      setNextPageToken(response.nextPageToken);
    } catch (error) {
      console.log("Error getting more video suggestions results!");
      setError("Error getting video suggestions");
    } finally {
      setIsLoadingMoreResults(false);
    }
  }, [isLoadingMoreResults, nextPageToken]);

  return {
    suggestions,
    loadingSuggestions: loading,
    nextPageToken,
    loadMoreResults,
    isLoadingMoreResults,
    hasMore: !!nextPageToken,
    error,
  };
};

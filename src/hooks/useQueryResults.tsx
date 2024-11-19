import { useCallback, useEffect, useState } from "react";
import { fetchSearchResults } from "../services/api";
import { QueryResults } from "../types";

export const useQueryResults = (query: string) => {
  const [queryResults, setQueryResults] = useState<QueryResults>({
    videos: [],
    shorts: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loadingMoreResults, setLoadingMoreResults] = useState(false);
  useEffect(() => {
    if (!query.trim()) {
      setQueryResults({ shorts: [], videos: [] });
      setNextPageToken(null);
      setError(null);
      setIsLoading(false);
    }
    const listQueryResults = async () => {
      setIsLoading(true);
      try {
        const {
          shorts,
          videos,
          nextPageToken: nxtPageToken,
        } = await fetchSearchResults(query, null);
        setQueryResults({
          videos: [...videos],
          shorts: [...shorts],
        });
        setNextPageToken(nxtPageToken);
      } catch (error) {
        console.log("Error getting search Results");
        setError("Error getting search results please try again later!");
      } finally {
        setIsLoading(false);
      }
    };
    listQueryResults();
  }, [query]);

  const loadMoreResults = useCallback(async () => {
    if (isLoading || loadingMoreResults || !nextPageToken) return;
    setLoadingMoreResults(true);
    try {
      const response = await fetchSearchResults(query, nextPageToken);
      setQueryResults((prev) => ({
        shorts: [...prev.shorts, ...response.shorts],
        videos: [...prev.videos, ...response.videos],
      }));
      setNextPageToken(response.nextPageToken);
    } catch (error) {
      console.log("Error getting more search results");
    } finally {
      setLoadingMoreResults(false);
    }
  }, [nextPageToken]);

  return {
    queryResults,
    loadingMoreResults,
    nextPageToken,
    hasMoreResults: !!nextPageToken,
    loadMoreResults,
    isLoading,
    error,
  };
};

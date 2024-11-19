import axios from "axios";

export const getTrendingVideos = async (
  nextPageToken: string | null = null
) => {
  const params: {
    part: string;
    chart: string;
    regionCode: string;
    maxResults: number;
    pageToken: string;
    videoCategoryId?: string;
    key: string;
  } = {
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    regionCode: "US",
    maxResults: 30,
    pageToken: nextPageToken!,
    key: import.meta.env.VITE_YOUTUBE_DATA_API_KEY,
  };

  try {
    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: params,
      }
    );

    const channelIds = [
      ...new Set(data.items.map((video: any) => video.snippet.channelId)),
    ];

    const channelData = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet",
          id: channelIds.join(","),
          key: import.meta.env.VITE_YOUTUBE_DATA_API_KEY,
        },
      }
    );

    const channelAvatars: any = {};
    channelData.data.items.forEach((channel: any) => {
      channelAvatars[channel.id] = channel.snippet.thumbnails.default.url;
    });

    const videosWithChannelsAvatars = data.items.map((video: any) => ({
      ...video,
      avatar: channelAvatars[video.snippet.channelId] || null,
    }));

    const randomizedVideos = videosWithChannelsAvatars.sort(
      () => Math.random() - 0.5
    );
    return {
      videos: randomizedVideos,
      nextPageToken: data.nextPageToken,
      totalResults: data.pageInfo.totalResults,
    };
  } catch (error) {
    console.error("Error getting trending videos", error);
    throw error;
  }
};

export const getSingleVideo = async (id: string) => {
  try {
    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,contentDetails,statistics",
          id: id,
          key: import.meta.env.VITE_YOUTUBE_DATA_API_KEY,
        },
      }
    );
    return data?.items[0];
  } catch (error) {
    console.error(`Error getting video with id: ${id}`);
    throw error;
  }
};

export const getChannelDetails = async (channelId: string) => {
  try {
    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet, contentDetails, statistics",
          id: channelId,
          key: import.meta.env.VITE_YOUTUBE_DATA_API_KEY,
        },
      }
    );
    return data.items[0];
  } catch (error) {
    console.error(`Error getting channel with id ${channelId}`);
    throw error;
  }
};

export const fetchSearchResults = async (
  query: string,
  nextPageToken: string | null = null
) => {
  try {
    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          maxResults: "30",
          pageToken: nextPageToken,
          key: import.meta.env.VITE_YOUTUBE_DATA_API_KEY,
          type: "video",
        },
      }
    );
    const videoIds = data.items
      .filter((item: any) => item.id.videoId)
      .map((item: any) => item.id.videoId)
      .join(",");

    const videoDetails = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,contentDetails,statistics",
          id: videoIds,
          key: import.meta.env.VITE_YOUTUBE_DATA_API_KEY,
        },
      }
    );

    const allVideos = videoDetails.data.items;

    const channelIds = [
      ...new Set(allVideos?.map((video: any) => video.snippet.channelId)),
    ];

    const channelData = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet",
          id: channelIds.join(","),
          key: import.meta.env.VITE_YOUTUBE_DATA_API_KEY,
        },
      }
    );

    const channelAvatars: any = {};
    channelData.data.items.forEach((channel: any) => {
      channelAvatars[channel.id] = channel.snippet.thumbnails.default.url;
    });

    const videosWithChannelsAvatars = allVideos?.map((video: any) => ({
      ...video,
      avatar: channelAvatars[video.snippet.channelId] || null,
    }));

    const shortResults = videosWithChannelsAvatars.filter((item: any) => {
      const duration = item?.contentDetails?.duration;
      return duration && /^PT([0-5]?[0-9]S?)$/.test(duration);
    });

    const regularVideos = videosWithChannelsAvatars.filter(
      (item: any) => !shortResults.includes(item)
    );

    return {
      videos: regularVideos,
      shorts: shortResults,
      nextPageToken: data.nextPageToken,
      totalResults: data.pageInfo.totalResults,
    };
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

export const getVideoSuggestions = async (
  id: string,
  nextPageToken: string | null = null
) => {
  try {
    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          chart: "mostPopular",
          videoCategoryId: id,
          type: "video",
          pageToken: nextPageToken,
          key: import.meta.env.VITE_YOUTUBE_DATA_API_KEY,
          maxResults: 30,
        },
      }
    );
    return {
      suggestions: data.items,
      nextPageToken: data.nextPageToken,
    };
  } catch (error) {
    console.error("Error fetching related videos!");
    throw error;
  }
};

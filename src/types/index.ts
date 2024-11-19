export type VideoResult = {
  etag: string;
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    description: string;
    categoryId: string;
    thumbnails: {
      default: {
        url: string;
      };
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
      standard: {
        url: string;
      };
      maxres: {
        url: string;
      };
    };
    tags: string[];
  };
};
export type Video = {
  etag: string;
  id: string;
  avatar: string;
  contentDetails: {
    duration: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    description: string;
    categoryId: string;
    thumbnails: {
      default: {
        url: string;
      };
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
      standard: {
        url: string;
      };
      maxres: {
        url: string;
      };
    };
    tags: string[];
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
  channelDetails: {
    snippet: {
      thumbnails: {
        default: {
          url: string;
        };
        medium: {
          url: string;
        };
        high: {
          url: string;
        };
      };
      publichedAt: string;
      title: string;
    };
    statistics: {
      hiddenSubscriberCount: boolean;
      subscriberCount: string;
      videoCount: string;
      viewCount: string;
    };
  };
};

export type Playlist = {};
export type Short = {};

export type Category = {
  etag: string;
  id: string;
  snippet: {
    title: string;
  };
};

export type QueryResults = {
  videos: Video[];
  shorts: Video[];
};

export type TrendingVideosContextTypes = {
  videos: Video[];
  nextPageToken: string | null;
  loading: boolean;
  isLoadingMore: boolean;
  loadMoreVideos: () => Promise<void>;
  error: string | null;
  hasMoreVideos: boolean;
};

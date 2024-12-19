const YoutubeVideoFrame = ({ videoId }: { videoId: string }) => {
  return (
    <iframe
      width="100%"
      height="100%"
      title={`Showing youtube video with id ${videoId}`}
      src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
      frameBorder="0"
      allow="autoplay;encrypted-media;"
      loading="lazy"
      className="aspect-video"
      allowFullScreen
    />
  );
};

export default YoutubeVideoFrame;

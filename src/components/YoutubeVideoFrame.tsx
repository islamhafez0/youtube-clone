const YoutubeVideoFrame = ({ videoId }: { videoId: string }) => {
  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
      frameBorder="0"
      allow="autoplay;encrypted-media;"
      allowFullScreen
    />
  );
};

export default YoutubeVideoFrame;

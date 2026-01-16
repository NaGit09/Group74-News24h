import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  options: any;
  onReady?: (player: any) => void;
  className?: string;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const { options, onReady, className } = props;

  useEffect(() => {
    if (!playerRef.current) {
      if (!videoRef.current) return;

      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");

      if (className) {
        classNamesString(className).forEach((c) =>
          videoElement.classList.add(c)
        );
      }

      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

      player.on("waiting", () => {
        videojs.log("player is waiting");
      });

      player.on("dispose", () => {
        videojs.log("player will dispose");
      });
    } else {
      const player = playerRef.current;
      const autoplay = options.autoplay;
      if (autoplay) {
        player.autoplay(autoplay);
      }
      player.src(options.sources!);
    }
  }, [options, videoRef, className, onReady]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player ref={videoRef} className="w-full h-full text-white" />
  );
};

const classNamesString = (className: string) => {
  return className.split(" ").filter((c) => c.length > 0);
};

export default VideoPlayer;

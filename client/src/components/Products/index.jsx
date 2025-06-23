import { useRef, useState, useEffect } from "react";
import style from "./index.module.css";

export default function Products({
  id = "",
  logo = "",
  logotipo = "",
  description = [],
  poster = "",
  video = "",
  link = "",
  color = "",
}) {
  const videoRef = useRef(null);
  const logoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lineWidth, setLineWidth] = useState("100%");

  const togglePlay = () => {
    const currentVideo = videoRef.current;

    const allVideos = document.querySelectorAll("video");
    allVideos.forEach((vid) => {
      if (vid !== currentVideo) {
        vid.pause();
      }
    });

    if (currentVideo.paused) {
      currentVideo.play();
    } else {
      currentVideo.pause();
    }
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    vid.addEventListener("pause", handlePause);
    vid.addEventListener("play", handlePlay);

    return () => {
      vid.removeEventListener("pause", handlePause);
      vid.removeEventListener("play", handlePlay);
    };
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      const logoOffset = logoRef.current.offsetLeft;
      setLineWidth(`calc(${logoOffset}px - 1%)`);
    }
  }, []);

  return (
    <section id={id} className={style.productSection} style={{ color: color }}>
      <div
        className={style.backgroundImage}
        style={{ backgroundImage: `url(${logotipo})` }}
      />

      <div className={style.imgProduct}>
        <div
          className={style.line}
          style={{ backgroundColor: color, width: lineWidth }}
        />
        <img ref={logoRef} src={logo} alt="Logo serviço" />
      </div>

      <div className={style.description}>
        {description.map((i, index) => (
          <h2 key={index}>{i}</h2>
        ))}
      </div>

      <div className={style.videoLink}>
        <div className={style.videoWrapper} onClick={togglePlay}>
          <video
            style={{ border: `3px ${color} solid` }}
            ref={videoRef}
            src={video}
            poster={poster}
            playsInline
            preload="metadata"
            className={style.customVideo}
          />
          {!isPlaying && (
            <button
              className={style.playButton}
              style={{ color: color, borderColor: color }}
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
            >
              ▶
            </button>
          )}
        </div>
        <div>
          <a
            style={{ backgroundColor: color }}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Quero participar!
          </a>
        </div>
      </div>
    </section>
  );
}

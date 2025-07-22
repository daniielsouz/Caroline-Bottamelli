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
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const currentVideo = videoRef.current;

    const allVideos = document.querySelectorAll("video");
    allVideos.forEach((vid) => {
      if (vid !== currentVideo) {
        vid.pause();
      }
    });

    if (currentVideo.paused) {
      currentVideo.muted = false; // libera áudio ao tocar
      currentVideo.play();
    } else {
      currentVideo.pause();
    }
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    // Inicializa o vídeo mudo para mostrar o frame sem tocar som
    vid.muted = true;

    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    vid.addEventListener("pause", handlePause);
    vid.addEventListener("play", handlePlay);

    return () => {
      vid.removeEventListener("pause", handlePause);
      vid.removeEventListener("play", handlePlay);
    };
  }, []);

  return (
    <section id={id} className={style.productSection} style={{ color }}>
      <div
        className={style.backgroundImage}
        style={{ backgroundImage: `url(${logotipo})` }}
      />

      <div className={style.line} style={{ backgroundColor: color }} />

      <div className={style.divProduct}>
        <div className={style.description}>
          <div className={style.productLogo}>
            <img src={logo} alt="Logo serviço" />
          </div>
          {description.map((text, i) => (
            <h2 key={i}>{text}</h2>
          ))}
        </div>

        <div className={style.videoLink}>
          <div className={style.videoWrapper} onClick={togglePlay}>
            <video
              ref={videoRef}
              src={video}
              poster={poster}
              className={style.customVideo}
              preload="auto"
              playsInline
              style={{ border: `3px ${color} solid` }}
            />
            {!isPlaying && (
              <>
                <div className={style.overlayText}>
                  Ouça depoimentos de quem teve sua vida transformada
                </div>
                <button
                  className={style.playButton}
                  style={{ color, borderColor: color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                >
                  ▶
                </button>
              </>
            )}
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: color }}
          >
            Quero participar!
          </a>
        </div>
      </div>
    </section>
  );
}

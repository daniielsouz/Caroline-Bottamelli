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
  legend = "",
  color = "",
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCover, setShowCover] = useState(true); // <- mantém a capa até o vídeo começar

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    // Pausar outros vídeos
    document.querySelectorAll("video").forEach((vid) => {
      if (vid !== v) vid.pause();
    });

    if (v.paused) {
      // Começa muted (mais rápido e compatível)
      const wasMuted = v.muted;
      v.muted = true;
      try {
        await v.play();
      } catch (err) {
        console.error("Erro ao tentar dar play:", err);
      }
      setIsPlaying(true);
      if (!wasMuted) v.muted = false;
    } else {
      v.pause();
      setIsPlaying(false);
      setShowCover(true); // volta a capa quando pausa
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setIsPlaying(true);
    const onPlaying = () => setShowCover(false); // capa some só quando o vídeo realmente começa
    const onWaiting = () => {
      if (!v.currentTime) setShowCover(true);
    };
    const onPause = () => {
      setIsPlaying(false);
      setShowCover(true);
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("pause", onPause);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("pause", onPause);
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
              poster={poster} // pode manter, o overlay cobre até o vídeo tocar
              className={style.customVideo}
              preload="metadata"
              playsInline
              style={{
                border: `3px ${color} solid`,
                opacity: showCover ? 0 : 1,
                transition: "opacity 180ms ease",
              }}
            />

            {showCover && poster && (
              <div
                className={style.videoCover}
                style={{ backgroundImage: `url(${poster})` }}
                aria-hidden="true"
              />
            )}

            {showCover && (
              <button
                className={style.playButton}
                style={{ color, borderColor: color }}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                aria-label="Reproduzir vídeo"
              >
                ▶
              </button>
            )}
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: color }}
          >
            {legend}
          </a>
        </div>
      </div>
    </section>
  );
}

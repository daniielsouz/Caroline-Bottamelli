import Products from "../../components/Products";
import ImgBranding from "./../../assets/img/branding.png";
import logotipoBranding from "./../../assets/img/logotipoBranding.png";
export default function Branding() {
  return (
    <Products
      id="Branding"
      logo={ImgBranding}
      logotipo={logotipoBranding}
      description={[
        "Crie uma identidade visual marcante.",
        "Desenvolva logotipos e materiais gráficos.",
        "Fortaleça sua presença de marca.",
      ]}
      video="https://www.exemplo.com/video.mp4"
      link="#"
      color="#ac8485"
    />
  );
}

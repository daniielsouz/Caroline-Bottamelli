import Products from "../../components/Products";
import ImgBranding from "./../../assets/img/branding.png";
import logotipoBranding from "./../../assets/img/logotipoBranding.png";
import capaBranding from "./../../assets/img/capaBranding.png";
import JsonLd from "../../seo/JsonLd.jsx";

export default function Branding() {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://caroline-bottamelli.vercel.app";

  const url = `${origin}/#Branding`;
  const ogImage = `${origin}/og-image.png`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Branding",
    description:
      "Projeto individual de branding para criar significado emocional e racional para sua marca.",
    serviceType: "Branding",
    provider: {
      "@type": "Organization",
      name: "Carol Bottamelli",
      url: origin + "/",
    },
    areaServed: "BR",
    url,
  };

  const video = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Branding — Apresentação",
    description:
      "Como o projeto de Branding desenvolve estratégia, posicionamento e identidade.",
    thumbnailUrl: [ogImage],
    uploadDate: "2025-01-01T12:00:00-03:00",
    duration: "PT1M",
    contentUrl:
      "https://res.cloudinary.com/dmdobsh3w/video/upload/v1234567890/video-branding_1_ndoltf.mp4",
  };

  const phone = "554791400520";
  const text = "Olá, quero saber mais!";

  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  return (
    <>
      <JsonLd data={service} id="jsonld-branding-service" />
      <JsonLd data={video} id="jsonld-branding-video" />

      <Products
        id="Branding"
        logo={ImgBranding}
        logotipo={logotipoBranding}
        description={[
          <>
            <strong>Branding</strong> é o processo de construir um significado
            emocional e racional para uma empresa, produto ou serviço, ocupando
            um espaço na mente e no coração da audiência.
          </>,
          <>
            Nesse projeto individual, vamos desenvolver estratégias que
            provoquem <strong>sensações</strong> e estabeleçam{" "}
            <strong>conexões</strong> para que seus clientes escolham a sua
            marca no momento da decisão de compra.
          </>,
        ]}
        video="https://res.cloudinary.com/dmdobsh3w/video/upload/v1234567890/video-branding_1_ndoltf.mp4"
        legend="Fale com o nosso time!"
        link={waLink}
        color="#ac8485"
        poster={capaBranding}
      />
    </>
  );
}

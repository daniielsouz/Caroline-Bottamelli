import Products from "../../components/Products";
import ImgFenix from "./../../assets/img/fenix.png";
import logotipoFenix from "./../../assets/img/logotipoFenix.png";
import capaFenix from "./../../assets/img/capaFenix.png";
import JsonLd from "../../seo/JsonLd";

export default function Fenix() {
  const url = "https://SEU_DOMINIO_OFICIAL/#Fenix";
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Fênix Mentoria",
    description:
      "Mentoria de 6 meses com estrutura de aulas, acompanhamento e grupo de network.",
    serviceType: "Mentoria",
    provider: {
      "@type": "Organization",
      name: "Carol Bottamelli",
      url: "https://SEU_DOMINIO_OFICIAL/",
    },
    areaServed: "BR",
    url: url,
  };
  const video = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Fênix Mentoria — Depoimento",
    description: "Resultados e experiência na Mentoria Fênix.",
    thumbnailUrl: ["https://SEU_DOMINIO_OFICIAL/img/og-fenix.jpg"],
    uploadDate: "2025-01-01T12:00:00-03:00",
    duration: "PT1M",
    contentUrl:
      "https://res.cloudinary.com/dmdobsh3w/video/upload/v1751927745/Depoimento-Fenix_1_dd24tk.mp4",
  };

  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={video} />
      <Products
        id="Fenix"
        logo={ImgFenix}
        logotipo={logotipoFenix}
        description={[
          <>
            6 meses de acompanhamento para você se{" "}
            <strong>posicionar de forma assertiva e estratégica</strong> sem
            perder a sua essência.
          </>,
          <>
            Você terá acesso a uma estrutura completa de aulas e ao meu
            acompanhamento, além de um{" "}
            <strong>grupo para network poderoso</strong>.
          </>,
        ]}
        video="https://res.cloudinary.com/dmdobsh3w/video/upload/v1751927745/Depoimento-Fenix_1_dd24tk.mp4"
        legend="Quero fazer minha aplicação!"
        link="https://form.respondi.app/5A36eZ9j"
        color="#543939"
        poster={capaFenix}
      />
    </>
  );
}

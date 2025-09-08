import Products from "../../components/Products";
import ImgPotencialize from "./../../assets/img/potencialize.png";
import logotipoPotencialize from "./../../assets/img/logotipoPotencialize.png";
import JsonLd from "../../seo/JsonLd";

export default function Potencialize() {
  const url = "https://SEU_DOMINIO_OFICIAL/#Potencialize";
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Potencialize",
    description:
      "Programa para transformar seu negócio em marca desejada e reconhecida, com aulas gravadas e acesso por um ano.",
    serviceType: "Programa",
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
    name: "Potencialize — Apresentação",
    description:
      "Estratégias práticas alinhadas à essência para criar comunidade e aumentar conversão.",
    thumbnailUrl: ["https://SEU_DOMINIO_OFICIAL/img/og-potencialize.jpg"],
    uploadDate: "2025-01-01T12:00:00-03:00",
    duration: "PT1M",
    contentUrl:
      "https://res.cloudinary.com/dmdobsh3w/video/upload/v1234567890/video-potencialize_g1pcbe.mp4",
  };

  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={video} />
      <Products
        id="Potencialize"
        logo={ImgPotencialize}
        logotipo={logotipoPotencialize}
        description={[
          <>
            É o programa que vai transformar o seu negócio em uma{" "}
            <strong>marca desejada</strong> e <strong>reconhecida</strong>,
            alinhando estratégias práticas à sua essência.
          </>,
          <>Aulas gravadas e acesso por um ano.</>,
          <>
            Aprenda a criar narrativas que convertem e{" "}
            <strong>criar a sua comunidade</strong>.
          </>,
        ]}
        video="https://res.cloudinary.com/dmdobsh3w/video/upload/v1234567890/video-potencialize_g1pcbe.mp4"
        legend="Seu acesso aqui!"
        link="https://pay.kiwify.com.br/aXZd54e"
        color="#768874"
      />
    </>
  );
}

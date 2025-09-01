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
        <>
          <strong>Branding</strong> é o processo de construir um significado
          emocional e racional para uma empresa, produto ou serviço, ocupando um
          espaço na mente e no coração da audiência.
        </>,
        <>
          Nesse projeto individual, vamos desenvolver estratégias que provoquem{" "}
          <strong>sensações</strong> e estabeleçam <strong>conexões</strong>{" "}
          para que seus clientes escolham a sua marca no momento da decisão de
          compra.
        </>,
      ]}
      video="https://res.cloudinary.com/dmdobsh3w/video/upload/v1234567890/video-branding_1_ndoltf.mp4"
      legend="Fale com o nosso time!"
      link="https://wa.me/554791400520?text=Ol%C3%A1%2C%20quero%20saber%20mais!"
      //Não tá indo o texto, ver
      color="#ac8485"
    />
  );
}

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
      video="https://res.cloudinary.com/dmdobsh3w/video/upload/v1751927745/Depoimento-Fenix_1_dd24tk.mp4"
      link="https://form.respondi.app/XjXrsB9L"
      color="#ac8485"
    />
  );
}

import Products from "../../components/Products";
import ImgFenix from "./../../assets/img/fenix.png";
import logotipoFenix from "./../../assets/img/logotipoFenix.png";

export default function Fenix() {
  return (
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
          Você terá acesso a uma estrutura completa de aulas e ao meu{" "}
          acompanhamento, além de um{" "}
          <strong>grupo para network poderoso</strong>!
        </>,
      ]}
      video="https://res.cloudinary.com/dmdobsh3w/video/upload/v1751927745/Depoimento-Fenix_1_dd24tk.mp4"
      link="https://form.respondi.app/5A36eZ9j"
      color="#543939"
    />
  );
}

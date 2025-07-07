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
        "6 meses te acompanhando para a construção do seu posicionamento assertivo nas redes sociais.",
        "Potencializando você como uma marca e negócio sendo bem pafa e atraindo clientes certos.",
        "De forma 100% on-line.",
      ]}
      video="https://res.cloudinary.com/dmdobsh3w/video/upload/v1751927745/Depoimento-Fenix_1_dd24tk.mp4"
      link="https://form.respondi.app/5A36eZ9j"
      color="#543939"
    />
  );
}

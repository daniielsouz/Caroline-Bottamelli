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
      video="{VideoFenix}"
      link="https://www.youtube.com/watch?v=VbH0dsKuReE"
      color="#543939"
    />
  );
}

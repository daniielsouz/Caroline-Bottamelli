import Products from "../../components/Products";
import ImgPotencialize from "./../../assets/img/potencialize.png";
import logotipoPotencialize from "./../../assets/img/logotipoPotencialize.png";

export default function Potencialize() {
  return (
    <Products
      id="Potencialize"
      logo={ImgPotencialize}
      logotipo={logotipoPotencialize}
      description={[
        "Aumente seu alcance digital.",
        "Tenha presença nas redes sociais.",
        "Impulsione sua marca pessoal ou empresa.",
      ]}
      video="https://res.cloudinary.com/dmdobsh3w/video/upload/v1751927745/Depoimento-Fenix_1_dd24tk.mp4"
      link="https://form.respondi.app/HoCh4ZKi"
      color="#768874"
    />
  );
}

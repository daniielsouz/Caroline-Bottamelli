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
      video=""
      link="https://form.respondi.app/HoCh4ZKi"
      color="#768874"
    />
  );
}

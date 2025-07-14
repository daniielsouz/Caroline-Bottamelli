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
        <>
          É o programa que vai transformar o seu negócio em uma{" "}
          <strong>marca desejada</strong> e <strong>reconhecida</strong>,
          alinhando estratégias práticas à sua essência.
        </>,
        <>Aulas gravadas e acesso por um ano.</>,
        <>
          Aprenda a criar narrativas que conversem e{" "}
          <strong>criar a sua comunidade</strong>.
        </>,
      ]}
      video="https://res.cloudinary.com/dmdobsh3w/video/upload/v1751927745/Depoimento-Fenix_1_dd24tk.mp4"
      link="https://form.respondi.app/HoCh4ZKi"
      color="#768874"
    />
  );
}

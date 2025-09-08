import { Helmet } from "react-helmet-async";

export default function Seo({
  title,
  description,
  url,
  image,
  canonical,
  noindex = false,
}) {
  const t =
    title || "Carol Bottamelli — Branding, Mentoria Fênix e Potencialize";
  const d =
    description ||
    "Branding, Mentoria Fênix e Potencialize por Carol Bottamelli. Estratégia, posicionamento e identidade para sua marca.";
  const u = url || "https://SEU_DOMINIO_OFICIAL/";
  const i = image || "https://SEU_DOMINIO_OFICIAL/img/og-cover.jpg";
  const c = canonical || u;

  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={c} />
      <meta property="og:site_name" content="Carol Bottamelli" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={u} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:image" content={i} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t} />
      <meta name="twitter:description" content={d} />
      <meta name="twitter:image" content={i} />
      <meta name="theme-color" content="#013d61" />
    </Helmet>
  );
}

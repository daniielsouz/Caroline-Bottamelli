import { useEffect } from "react";

export default function JsonLd({ data, id = "jsonld-default" }) {
  useEffect(() => {
    if (!data) return;

    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }, [data, id]);

  return null;
}

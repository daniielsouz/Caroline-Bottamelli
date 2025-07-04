import { useEffect, useState } from "react";
import style from "./index.module.css";

export default function Message({
  type = "info",
  children,
  duration = 3000,
  onClose = null,
  persist = false,
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!persist) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, persist, onClose]);

  if (!visible) return null;

  return <div className={`${style.message} ${style[type]}`}>{children}</div>;
}

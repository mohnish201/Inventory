import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

const ReactToHTML = (component) => {
  const div = document.createElement("div");
  const root = createRoot(div);

  flushSync(() => {
    root.render(component);
  });

  return div.innerHTML;
};

export { ReactToHTML };

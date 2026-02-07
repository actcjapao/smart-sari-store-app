import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { ComponentType } from "react";
import { createRoot } from "react-dom/client";

createInertiaApp({
   resolve: (name) => {
      const pages = import.meta.glob<ComponentType>("./Pages/**/*.tsx", {
         eager: true,
      });
      return pages[`./Pages/${name}.tsx`];
   },
   setup({ el, App, props }) {
      createRoot(el).render(<App {...props} />);
   },
   progress: {
      // This is the default progress of Inertia
      // The color of the progress bar...
      color: "#00a43b",
   },
});

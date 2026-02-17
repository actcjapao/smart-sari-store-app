# Setup FlyonUI JS

FlyonUI JavaScript is essential for Flyonui components that has interactions like modal, accordion, drop down, etc. Without the Flyonui JS import, these types of components won't work.

# Steps to setup

### 1) Add `variants.css` and `/flyonui/dist/index.js` in the main `app.css`.

```js
@import "tailwindcss";
@plugin "flyonui";
@plugin "flyonui" {
   themes:
      light --default,
      dark --prefersdark,
      mintlify;
}
@plugin "@iconify/tailwind4";

// Add these files -> checkout codebase's app.css file
@import "../../node_modules/flyonui/variants.css"; /* Require only if you want to use FlyonUI JS component */
@source "../../node_modules/flyonui/dist/index.js"; /* Require only if you want to use FlyonUI JS component */
```

### 2) Then, import flyonui package in `app.tsx`.

```js
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { ComponentType } from "react";
import { createRoot } from "react-dom/client";

// Import this
import "flyonui/flyonui.js";

createInertiaApp({
   resolve: (name) => {
      const pages =
         import.meta.glob <
         ComponentType >
         ("./Pages/**/*.tsx",
         {
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
```

### 3) Done and test. Try to use a modal component from the docs.

Reference: https://flyonui.com/docs/getting-started/quick-start/

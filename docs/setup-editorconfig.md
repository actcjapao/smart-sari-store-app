Take the `.editorconfig` of this project as reference to other project

Notes:

- Make sure no `.prettierrc` file on the codebase as this will introduce conflicts
- The Prettier VS code extension will read `.editorconfig` and doesn't introduc conflicts
- Conflicts will arise if: the codebase have both `.prettierrc(custom settings)` and `.editorconfig(default settings)` files are present
  as the Prettier extension will be confused.
- Even with .editorconfig, Prettier will still control things like:
   - Quotes (" vs ')
   - Semicolons
   - Line wrapping
   - Trailing commas
   - JSX formatting
   - Object/array breaks

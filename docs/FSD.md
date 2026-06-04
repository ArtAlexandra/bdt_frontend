## FSD

Our project uses Feature-Sliced Design (FSD) architectural methodology.

### Folders:

- root app folder - Contains only routes for Next.js.
- src/app folder - Contains top-level project settings (providers, global styles, etc.).
- src/views - Top-level components representing application pages.
- src/widgets - Lower-level logic components.
- src/features - user interactions, actions that bring business value to the user. (e.g. SendMail).
- src/entities - business entities. (e.g., Email, Profile, Feed).
- src/shared - Base level. Shared (dumb) components, common low-level helpers, icons, fonts. No business logic. UI kits, types, etc.

### Main principles:

 - Each **layer** consists of **slices** - representing some "closed" module with a public API. (Except "shared" layer since there is no business logic)
 - Each **slice** contains a public api, it must always be located in _index.ts_. It is forbidden to use _index.ts_ files for anything else.
 - A **slice** may contain exports of several implementations of one component.
 - A **slice** may contain only one _index.ts_ file. **segments** must not contain _index.ts_ files, except for the "shared" directory.
 - **segments** are the last level of nesting.
 - Maximum number of **layers** is limited by: "app" -> views -> widgets -> features -> entities -> shared. It is prohibited to add new layers.
 - It's **not recommended** to have cross-imports between different **slices** of one **layer**. For example. inside "Widget", you can only import from "features", "entities" and "shared".
 - It is possible to have imports between different **segments** of the same(!) **slice**
 - Inside a **slice**, it's possible to have the following **segments** (folders): 
   - api/ - logic for communication with external services/systems
   - config/ - some constants
   - model/ - everything directly or mostly related to business logic
   - lib/ - infrastructure logic that did not fit into any of the segments
   - ui/ - everything directly or mostly related to display logic (fonts, images, styles, ...)
 - "entities" cannot perform any actions on data, all actions are performed by "features".

In summary: No cross-imports between one-level slices + public API for each slice. This gives us the freedom to develop each slice independently.

## Domain Grouping

For the "views", "widgets", and "features" layers, it is allowed to introduce an optional grouping level called a **domain** to organize related slices. Rules for domains:

- A domain may only exist inside the "views", "widgets", or "features" layers.
- Inside each domain, the usual slices structure applies (each with its own public API).
- Each domain should represent a meaningful domain area or page context (e.g., editor, dashboard, profile).
- The domain itself should not have a public API — only its inner slices do.
- Domain names should be in lowercase. For multi-word domains, use kebab-case (e.g., "workspaces", "canvas-editor").

## Cross-Imports in Entities

Cross-imports are a situation when one slice imports from another slice on the same layer. For most layers, this is not recommended, but for the "entities" layer, cross-imports are permitted under controlled conditions to reflect real-world relationships between business entities (e.g., entities often reference each other, and it's best to reflect these in code rather than work around them).

To enable cross-imports in "entities":

- Use a special kind of public API, also known as the @x-notation.
- If entity A needs to be imported by entity B, entity A can declare a separate public API just for entity B.
- Structure example:
  ```
  📂 entities
    📂 A
      📂 @x
        📄 B.ts — a special public API just for code inside entities/B/
      📄 index.ts — the regular public API
  ```
- Code inside entities/B/ can import from entities/A/@x/B.
- This ensures imports are explicit, limited, and maintain architectural integrity: Entity B sees only what A specifically exposes for it via @x/B.ts.
- Other entities (not B) should not import from A/@x/B.ts.

### Additional principles:

 - Typing is next to the files that use it and is also exported from the public api (_index.ts_).
 - Styles are next to the components. We name the style files according to the name of the component in which they are used: {component-name}.ts -> {component-name}.module.scss
 - If a file exports only one function or variable, we name it according to the name of the function or variable. Example: _useAuth.ts_ exports the _useAuth_ hook, _authSessionSlice.ts_ exports the _authSessionSlice_ variable.
 - If the file contains a group of exported methods, for example any api / types, then name it with a capital letter, and also at the end add the name of the entity to which it refers. Example: _GoogleAuthApi.ts_ , _AuthSessionTypes.ts_

### More resources
- https://feature-sliced.design/
- https://github.com/feature-sliced/documentation/discussions

import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";

/**
 * Registry is a component registry that allows you to register components and apply them to the DOM.
 *
 * As you create new components in your frontend, you can register them here and they will be automatically
 * applied to the DOM when the page loads. To indicate in the liquid template what component should be
 * rendered, add a `data-component` attribute to the element with the name of the component.
 *
 * Props can be passed to the component by adding a `data-props` attribute to the element with a JSON object or you
 * can use the `__PROPS` helper to pass dynamic props to the component. For instance,
 *
 * ```html
 * <script>
 * if (typeof __PROPS === 'undefined') __PROPS = {};
 * __PROPS[somekey] = {
 *    field: "value",
 *    field2: "value2"
 * };
 * </script>
 * <div data-component="FeaturedLinks" data-props="__PROPS[somekey]"></div>
 * ```
 */
const components = {
  Banner: lazy(() => import("@/components/Banner/Banner")),
};

const Registry = {
  components: components,
  register: (key, component) => {
    Registry.components[key] = component;
  },
  merge: (components) => {
    Registry.components = { ...Registry.components, ...components };
  },
  applyTo: (document: Document) => {
    const body = document.querySelector("body");

    if (body) {
      Object.keys(Registry.components).map((name) => {
        const el = document.querySelectorAll(`[data-component="${name}"]`);

        el.forEach((element) => {
          const Component = Registry.components[name];

          if (element) {
            try {
              let componentProps = {};
              const staticProps = element.hasAttribute("data-props")
                ? element.getAttribute("data-props")
                : "";

              if (staticProps.substring(0, 1) === "{") {
                componentProps = JSON.parse(staticProps);
              } else if (staticProps.substring(0, 7) === "__PROPS") {
                componentProps = eval(staticProps);
              }

              // replace with loading spinner?
              const fallback = null;

              const component = (
                <Suspense fallback={fallback}>
                  <Component {...componentProps} />
                </Suspense>
              );

              const root = createRoot(element);

              root.render(component);
            } catch (e) {
              console.error(`Error rendering component ${name}`);
              console.error(e);
            }
          }
        });
      });

      setTimeout(() => {
        body.classList.add("lights--on");
      }, 50);
    }
  },
};

export default Registry;

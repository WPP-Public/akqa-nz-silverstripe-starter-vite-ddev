import React from "react";
import { createRoot } from "react-dom/client";
import Banner from "@/components/Banner";

const Registry = {
    components: {
        Banner: Banner,
    },
    register: (key, component) => {
        Registry.components[key] = component;
    },
    merge: (components) => {
        Registry.components = { ...Registry.components, ...components };
    },
    applyTo: (document) => {
        const body = document.querySelector("body");

        if (body) {
            Object.keys(Registry.components).map((name) => {
                const el = document.querySelectorAll(
                    `[data-component="${name}"]`
                );

                el.forEach((element) => {
                    const Component = Registry.components[name];

                    if (element) {
                        try {
                            const props = element.hasAttribute("data-props")
                                ? JSON.parse(
                                      element.getAttribute("data-props") || "{}"
                                  )
                                : {};

                            const component = <Component {...props} />;
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
                body.classList.add("energized");
            }, 50);
        }
    },
};

export default Registry;

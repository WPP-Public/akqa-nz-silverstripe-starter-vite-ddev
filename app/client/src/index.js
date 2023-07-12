import "vite/modulepreload-polyfill";
import "./index.scss";
import Registry from "@/state/Registry";

if (typeof window !== "undefined") {
    const body = document.querySelector("body");

    if (body) {
        Registry.applyTo(document);
    }
}

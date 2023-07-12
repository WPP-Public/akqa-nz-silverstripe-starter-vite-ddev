import type { StorybookConfig } from "@storybook/react-vite";
const path = require("path");
const config: StorybookConfig = {
    framework: "@storybook/react-vite",
    stories: ["../app/client/components/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-essentials", "@storybook/addon-links"],
    docs: {
        autodocs: "tag",
    },
    staticDirs: ["../app/client/img"],
};

export default config;

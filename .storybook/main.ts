import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../app/client/src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-links"],
  staticDirs: ["../app/client/img"],
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;

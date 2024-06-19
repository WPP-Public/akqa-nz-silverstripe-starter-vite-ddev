import React from "react";
import type { Meta } from "@storybook/react";
import Banner from "./Banner";

const meta: Meta<typeof Banner> = {
  component: Banner,
  title: "Elements / Banner",
};

export const Primary = {
  render: () => {
    return (
      <>
        <Banner title="Example banner title" />
      </>
    );
  },
};

export default meta;

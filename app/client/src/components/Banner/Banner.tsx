import "@/styles/components/banner.scss";

import React from "react";

export type BannerProps = {
  title: string;
  description?: string;
};

const Banner: React.FC<BannerProps> = ({ title, description }) => {
  return (
    <div className="banner">
      <div className="banner__content">
        <h1 className="banner__title">{title}</h1>
        {description && <p className="banner__description">{description}</p>}
      </div>
    </div>
  );
};

export default Banner;

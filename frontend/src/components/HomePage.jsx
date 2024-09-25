import React from "react";
import GalleryHome from "./GalleryHome";
import SectionHome from "./SectionHome";
import PhotoGrid from "./PhotoGrid";

const HomePage = () => {
  return (
    <>
      <GalleryHome interval={3000} />
      <SectionHome />
      <PhotoGrid />
    </>
  );
};

export default HomePage;

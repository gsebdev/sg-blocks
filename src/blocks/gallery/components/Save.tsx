import React from "react";
import Slideshow from "./Slideshow";
import Gallery from "./Gallery";
export const SlideshowWrapper = ({ children, condition }) => (
  <>
    {
      condition ?
        <div className="sg-gallery__wrapper">{children}</div> :
        <>{children}</>
    }
  </>
);
export const ImageWrapper = ({ children, condition, height, width, src, srcset }) => (
  <>
    {
      condition ?
        <a
          data-pswp-srcset={srcset}
          data-pswp-height={height}
          data-pswp-width={width}
          href={src}
        >{children}</a> :
        <>{children}</>
    }
  </>
);

const Save = ({ attributes }) => {
  const { images, slideshow, imagesOptions } = attributes;
  const processedImages = images?.map((image, index) => {
    return {
        ...image,
        ...imagesOptions[index]
    }
})

  return (
    <>
      {images && images.length > 0 &&
        <>
          {slideshow ?
            <Slideshow
              attributes={attributes}
              images={processedImages}
              saving={true}
            /> :
            <Gallery
              attributes={attributes}
              images={processedImages}
              saving={true}
            />}
        </>
      }
    </>
  );
};

export default Save;

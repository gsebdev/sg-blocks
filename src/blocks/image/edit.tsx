import React from "react";
import { useSelect } from "@wordpress/data";
import {
  Button
} from "@wordpress/components";
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";

import {
  generateImagesSizes,
  generateSrcset,
  getClassNames,
} from "../block-utilities/sg-blocks-helpers";

import ImageInspectorControls from "../block-components/ImageInspectorControls";


const Edit = ({ attributes, setAttributes }) => {
  const {
    aspectRatio,
    sizes,
    src,
    srcSet,
    alt,
    height,
    width,
    image_id,
    imagePosition,
    fixedHeight,
    fixedWidth,
  } = attributes;

  const classNames = getClassNames(attributes);
  const blockProps = useBlockProps({ className: classNames + ' sg-image-container' });

  const { selectedImage } = useSelect(select => {
    const { getEntityRecord } = select("core") as any;
    return {
      selectedImage: image_id ? getEntityRecord("postType", "attachment", image_id) : null
    }
  }, [image_id]);

  const removeImage = () => {
    setAttributes({
      image_id: undefined,
      src: undefined,
      srcSet: undefined,
      alt: undefined,
      width: undefined,
      height: undefined,
      sizes: {
        ...sizes,
        default: null,
      },
      imageSource: "full"
    });
  }

  const setNewImage = (img) => {
    setAttributes({
      image_id: img.id,
      src: img.url,
      srcSet: generateSrcset(img.sizes, [], img.width),
      alt: img.alt,
      width: img.width,
      height: img.height,
      sizes: {
        ...sizes,
        default: img.width,
      },
      imageSource: "full"
    });
  }

  return (
    <>
      <InspectorControls>
        <ImageInspectorControls
          attributes={attributes}
          setAttributes={setAttributes}
          currentImage={selectedImage}
          lightboxOptionsActive={true}
        />
      </InspectorControls>
      <div {...blockProps}>
        {!!selectedImage && (
          <figure
            className={`sg-image sg-lazy-image`}
            style={{
              aspectRatio: !aspectRatio
                ? undefined
                : aspectRatio === "original"
                  ? `${width}/${height}`
                  : aspectRatio,
              width: fixedWidth ? fixedWidth : undefined,
              height: fixedHeight ? fixedHeight : undefined,
            }}
          >
            <img
              src={src}
              width={width}
              height={height}
              sizes={generateImagesSizes(sizes)}
              srcSet={srcSet}
              alt={alt}
              style={{ objectPosition: imagePosition ? `${imagePosition.x * 100}% ${imagePosition.y * 100}%` : undefined }}
            />
            <MediaUploadCheck>
              <MediaUpload
                onSelect={setNewImage}
                value={image_id}
                render={({ open }) => (
                  <Button
                    variant="secondary"
                    className="sg-image__edit-btn"
                    onClick={open}
                    icon="edit"
                  ></Button>
                )}
              />
            </MediaUploadCheck>
            <Button
              isDestructive
              className="sg-image__remove-btn"
              onClick={removeImage}
              icon="trash"
            />
          </figure>
        )}
        {!selectedImage && (
          <div className="sg-image no-image">
            <p>Pas d'image selectionnée</p>
            <p>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={setNewImage}
                  render={({ open }) => (
                    <Button
                      variant="secondary"
                      className="sg-image__add-btn"
                      onClick={open}
                    >
                      Sélectionner
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Edit;

import React, { useEffect, useState } from "react";
import {
  InspectorControls,
  useBlockProps,
  MediaUpload,
  MediaUploadCheck,
  // @ts-ignore
} from "@wordpress/block-editor";
// @ts-ignore
import apiFetch from '@wordpress/api-fetch';
import Gallery from "./Gallery";
import { sgGallery } from "../gallery";
import { useRef } from "react";
import { Sizes, generateSrcset } from "../../block-utilities/sg-blocks-helpers";
import Options from "./Options";
import Slideshow from "./Slideshow";

export interface GalleryAttributes {
  draggable: boolean | undefined;
  thumbs: boolean | undefined;
  legends: boolean | undefined;
  lightbox: boolean | undefined;
  slideshow: boolean | undefined;
  slideshowDelay: number | undefined;
  slideshowBreakpoint: number | undefined;
  images: GalleryImage[];
  imagesOptions: { id: number, gridPosition?: { top: number, left: number, width: number, height: number }, objectPosition?: { x: number, y: number } }[];
  id: string;
  columns?: { [key: string]: number },
  gap?: { [key: string]: number | { x: number, y: number } },
  padding?: { [key: string]: number | { x: number, y: number } },
  margin?: { [key: string]: number | { x: number, y: number } },
  className: string | undefined;
}
export interface GalleryImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  srcset: string;
  legend?: string;
  caption?: string;
  sizes?: Sizes;
  id?: number;
  objectPosition?: GalleryAttributes["imagesOptions"][0]["objectPosition"];
  gridPosition?: GalleryAttributes["imagesOptions"][0]["gridPosition"];
}
const Edit: React.FC<{ attributes: GalleryAttributes, setAttributes: (attributes: any) => void }> = ({ setAttributes, attributes }) => {
  const blockProps = useBlockProps();
  const { imagesOptions, slideshow } = attributes;
  const [images, setImages] = useState<GalleryImage[]>(attributes.images?.map((img, index: number) => ({
    ...img,
    ...imagesOptions[index]
  })));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const galleryObject = useRef<sgGallery | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const saveImages = (ImagesToBeSaved: GalleryImage[]) => {
    setImages(ImagesToBeSaved);
    setAttributes({
      images: ImagesToBeSaved, imagesOptions: ImagesToBeSaved.map((img) => ({
        id: img.id,
        gridPosition: img.gridPosition,
        objectPosition: img.objectPosition
      }))
    });
  }
  const onSelectImages = async (value: GalleryImage | GalleryImage[], position: number | "end" | "start") => {
    const newImages = attributes.images ? [...attributes.images] : [];
    const getImageObject = (img: GalleryImage) => {
      return {
        url: img.url,
        alt: img.alt,
        width: img.width,
        height: img.height,
        srcset: '',
        legend: img.caption,
        id: img.id
      }
    };
    const isArray = Array.isArray(value);
    const imagesToAdd = isArray ? value.map((image) => {
      return getImageObject(image)
    })
      : [getImageObject(value)];

    const mediasResponse = await apiFetch({
      path: `/wp/v2/media?include=${imagesToAdd.map(img => img.id).join(',')}`
    })

    imagesToAdd.forEach((img, index) => {
      const media = mediasResponse.find((m) => m.id === img.id);
      if (media) {
        imagesToAdd[index] = {
          ...img,
          srcset: media.media_details?.sizes ? generateSrcset(media.media_details.sizes, ['thumbnail']) : img.srcset,
        }
      }
    });

    if (position === "end") {
      newImages.push(...imagesToAdd);
    } else if (position === "start") {
      newImages.unshift(...imagesToAdd);
    } else if (typeof position === "number" && newImages[position] && imagesToAdd[0]) {
      newImages[position] = imagesToAdd[0];
    } else {
      return;
    }
    saveImages(newImages);
  };

  const deleteImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    saveImages(newImages);
  };

  useEffect(() => {

    if (
      images &&
      galleryRef.current &&
      images.length > 0 &&
      galleryObject.current === null
    ) {
      galleryObject.current = new sgGallery(
        galleryRef.current,
        selectedIndex ?? 0
      );
    }

    return () => {
      galleryObject.current?.destroySlideshow();
      galleryObject.current = null;
    };
  }, [attributes, images]);

  return (
    <>
      <InspectorControls>
        <Options
          setAttributes={setAttributes}
          saveImages={saveImages}
          attributes={attributes}
          onSelectImages={onSelectImages}
          images={images}
          selectedIndex={selectedIndex}
          deleteImage={deleteImage}
          setImages={setImages}
        />
      </InspectorControls>

      <div {...blockProps}>
        {images && images.length > 0 ? (
          <>
            {slideshow ?
              <Slideshow
                attributes={attributes}
                images={images}
                setSelectedIndex={setSelectedIndex}
                galleryRef={galleryRef}
                saving={false}
                deleteImage={deleteImage}
                onSelectImages={onSelectImages}
              /> :
              <Gallery
                attributes={attributes}
                images={images}
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
                deleteImage={deleteImage}
                onSelectImages={onSelectImages}
                galleryRef={galleryRef}
                saving={false}
              />}
          </>
        ) : (
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(val: any) => onSelectImages(val, "end")}
              allowedTypes={["image"]}
              multiple
              render={({ open }) => (
                <button className="add-new" onClick={open}>
                  Ajouter des images
                </button>
              )}
            />
          </MediaUploadCheck>
        )}
      </div>
    </>
  );
};

export default Edit;

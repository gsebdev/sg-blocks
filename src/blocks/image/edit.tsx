import React, { useEffect } from "react";
import { useSelect } from "@wordpress/data";
import {
  Button,
  FocalPointPicker,
  PanelBody,
  PanelHeader,
  PanelRow,
  RangeControl,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";
import {
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";
import BreakpointTabs from "../block-components/BreakpointTabs";
import {
  generateImagesSizes,
  generateSrcset,
  getClassNames,
} from "../block-utilities/sg-blocks-helpers";


import breakpoints from "../breakpoints";
import SpacingPanel from "../block-components/SpacingPanel";


const ASPECT_RATIO_CHOICES = [
  "16 / 9",
  "4 / 3",
  "3 / 2",
  "1 / 1",
  "2 / 3",
  "3 / 4",
  "9 / 16",
  "1 / 2",
  "2 / 1",
];

const LIGHTBOX_TRANSITIONS = ["none", "fade", "zoom"];

const SPACING_OPTIONS = [
  {
    title: "Marges externes",
    attribute: "margin",
  },
  {
    title: "Marges internes",
    attribute: "padding",
  },
];

const Edit = ({ attributes, setAttributes }) => {
  const {
    aspectRatio,
    sizes,
    imageSource,
    lightbox,
    lightboxTransition,
    src,
    srcSet,
    alt,
    height,
    width,
    image_id,
    imagePosition,
    fullWidth
  } = attributes;

  const classNames = getClassNames(attributes);
  const blockProps = useBlockProps({ className: classNames });

  const { selectedImage } = useSelect(select => {
    const { getEntityRecord } = select("core") as any;
    return {
      selectedImage: image_id ? getEntityRecord("postType", "attachment", image_id) : null
    }
  }, [image_id]);

  const { imageSizes } = useSelect(
    (select) => (select("core/block-editor") as any).getSettings(),
    []
  );

  const setImageSource = (value: string) => {
    if(!value || !selectedImage) return;
    setAttributes({
      imageSource: value,
      src: selectedImage.media_details.sizes[value]?.source_url,
      srcSet: generateSrcset(
        selectedImage.media_details.sizes,
        [],
        selectedImage.media_details.sizes[value]?.width
      ),
      width: selectedImage.media_details.sizes[value]?.width,
      height: selectedImage.media_details.sizes[value]?.height,
      sizes: {
        ...sizes,
        default: selectedImage.media_details.sizes[value]?.width,
      },
    });
  };

  useEffect(() => {
    if (imageSource && !sizes['default'] && selectedImage) {
      setAttributes({
        sizes: {
          ...sizes,
          default: selectedImage.media_details.sizes[imageSource]?.width,
        },
      });
    }

  }, [imageSource, selectedImage]);

  useEffect(() => {
    if(image_id && !src || !srcSet || !height || !width || !alt || !sizes.default || !imageSource) {
      setImageSource(imageSource || "full");
    }
  }, [image_id, src, srcSet, height, width, alt, sizes.default, imageSource]);

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
        <PanelBody title="Image">
        <ToggleControl
            label="Occuper toute la largeur"
            checked={!!fullWidth}
            onChange={(value) => setAttributes({ fullWidth: value })}
          />
          <SelectControl
            label="Ratio de l'image"
            placeholder="Choisir un ratio"
            value={aspectRatio ?? undefined}
            options={[
              { label: "original", value: "" },
              ...ASPECT_RATIO_CHOICES.map((ratio) => ({
                label: ratio,
                value: ratio,
              })),
            ]}
            onChange={(value) => setAttributes({ aspectRatio: value })}
          />
          <SelectControl
            label="Source de l'image"
            placeholder="Choisir une résolution"
            value={imageSource}
            options={imageSizes.map((size) => ({
              label: size.name,
              value: size.slug,
            }))}
            onChange={setImageSource}
          />
          <ToggleControl
            label="Agrandir au clic"
            help="Agrandissez l'image dans une lightbox au clic"
            checked={!!lightbox}
            onChange={(value) => setAttributes({ lightbox: value })}
          />
          {lightbox && (
            <SelectControl
              label="Transition ouverture lightbox"
              help="Choisir une transition"
              value={lightboxTransition}
              options={LIGHTBOX_TRANSITIONS.map((transition) => ({
                label: transition,
                value: transition,
              }))}
              onChange={(value) => setAttributes({ lightboxTransition: value })}
            />
          )}
          {!!selectedImage && (
            <PanelRow>
              <h3>Modifier le point de focus :</h3>
              <FocalPointPicker
                url={selectedImage.media_details.sizes['medium'].source_url}
                onChange={(value) => setAttributes({ imagePosition: value })}
                value={imagePosition}
                // @ts-ignore
                onDrag={(value) => setAttributes({ imagePosition: value })}
              />
            </PanelRow>
          )}
           <SpacingPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    spacingsOptions={SPACING_OPTIONS}
                  />
          <PanelHeader label="Responsive Design" />
          <BreakpointTabs>
            {(tab) => {
              return (
                <>
                  <PanelRow>
                    <RangeControl
                      label={
                        "espace occupé (%)par l'image sur écran : " + tab.title
                      }
                      value={sizes[breakpoints[tab.name].toString()]}
                      allowReset
                      min={10}
                      max={100}
                      step={5}
                      onChange={(value) =>
                        setAttributes({ sizes: { ...sizes, [breakpoints[tab.name].toString()]: value } })
                      }
                    />
                  </PanelRow>
                  <SpacingPanel
                    breakpoint={tab.name}
                    attributes={attributes}
                    setAttributes={setAttributes}
                    spacingsOptions={SPACING_OPTIONS}
                  />
                </>
              );
            }}
          </BreakpointTabs>
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        {!!selectedImage && (
          <figure 
          className={`sg-image sg-lazy-image${!!fullWidth ? " sg-image--full-width" : ""}`}
          style={{ aspectRatio: aspectRatio}}
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

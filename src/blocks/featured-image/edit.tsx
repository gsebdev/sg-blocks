import React, { useEffect } from "react";
import { useSelect, useDispatch } from "@wordpress/data";
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
import usePostMeta from "../block-components/usePostMeta";

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
  const { aspectRatio, sizes, imageSource, lightbox, lightboxTransition } = attributes;

  const classNames = getClassNames(attributes);
  const blockProps = useBlockProps({ className: classNames });

  const { imageSizes } = useSelect(
    (select) => (select("core/block-editor") as any).getSettings(),
    []
  );

  const { featuredId, post } = useSelect(
    (select) => {
      const { getEditedPostAttribute, getCurrentPost } = select("core/editor") as any
      return {
        featuredId: getEditedPostAttribute("featured_media"),
        post: getCurrentPost(),
      }
    },
    []
  );

  const featuredImage = useSelect(
    (select) =>
      featuredId
        ? (select("core") as any).getEntityRecord(
          "postType",
          "attachment",
          featuredId
        )
        : null,
    [featuredId]
  );

  const [featuredImagePosition, setFeaturedImagePosition] = usePostMeta(
    post.type,
    post.id,
    "featured_image_position"
  );

  const { editPost } = useDispatch("core/editor");

  const setNewFeaturedImage = (newImage) => {
    editPost({ featured_media: newImage.id });
    setAttributes({ imageSource: 'full', sizes: { ...sizes, default: null } });
  }


  const removeFeaturedImage = () => {
    editPost({ featured_media: null });
    setAttributes({ imageSource: 'full', sizes: { ...sizes, default: null } });
  };

  const setImageSource = (value: string) => {
    setAttributes({
      imageSource: value,
      sizes: {
        ...sizes,
        default: featuredImage.media_details.sizes[value]?.width,
      },
    });
  };

  useEffect(() => {
    if (imageSource && !sizes['default'] && featuredImage) {
      setAttributes({
        sizes: {
          ...sizes,
          default: featuredImage.media_details.sizes[imageSource]?.width,
        },
      });
    }

  }, [imageSource, featuredImage]);

  return (
    <>
      <InspectorControls>
        <PanelBody title="Image de couverture">
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
          {featuredImage && (
            <PanelRow>
              <h3>Modifier le point de focus :</h3>
              <FocalPointPicker
                url={featuredImage.media_details.sizes['medium'].source_url}
                onChange={(value) => setFeaturedImagePosition(value)}
                value={featuredImagePosition}
                // @ts-ignore
                onDrag={(value) => setFeaturedImagePosition(value)}
              />
            </PanelRow>
          )}
          <SpacingPanel
            attributes={attributes}
            setAttributes={setAttributes}
            spacingsOptions={SPACING_OPTIONS}
          />
          <PanelHeader label="Responsive design" />
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
        {featuredImage && (
          <figure className="sg-image sg-featured-image sg-lazy-image">
            <img
              src={
                imageSource && featuredImage.media_details.sizes[imageSource]
                  ? featuredImage.media_details.sizes[imageSource].source_url
                  : featuredImage.source_url
              }
              width={imageSource && featuredImage.media_details.sizes[imageSource] 
                ? featuredImage.media_details.sizes[imageSource].width
                : featuredImage.media_details.width 
              }
              height={imageSource && featuredImage.media_details.sizes[imageSource] 
                ? featuredImage.media_details.sizes[imageSource].height
                : featuredImage.media_details.height 
              }
              sizes={generateImagesSizes(sizes)}
              srcSet={generateSrcset(
                featuredImage.media_details.sizes,
                [],
                sizes.default ?? undefined
              )}
              alt={featuredImage.alt_text}
              style={{ aspectRatio: aspectRatio, objectPosition: `${featuredImagePosition.x * 100}% ${featuredImagePosition.y * 100}%` }}
            />
            <MediaUploadCheck>
              <MediaUpload
                onSelect={setNewFeaturedImage}
                value={featuredImage.id}
                render={({ open }) => (
                  <Button
                    variant="secondary"
                    className="sg-featured-image__edit-btn"
                    onClick={open}
                    icon="edit"
                  ></Button>
                )}
              />
            </MediaUploadCheck>
            <Button
              isDestructive
              className="sg-featured-image__remove-btn"
              onClick={removeFeaturedImage}
              icon="trash"
            />
          </figure>
        )}
        {!featuredImage && (
          <div className="sg-featured-image no-image">
            <p>Pas d'image de couverture selectionnée</p>
            <p>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={setNewFeaturedImage}
                  render={({ open }) => (
                    <Button
                      variant="secondary"
                      className="sg-featured-image__add-btn"
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

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
// @ts-ignore
import { useEntityProp } from "@wordpress/core-data";

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

const Edit = ({ attributes, setAttributes, context, isSelected }) => {
  const {
    aspectRatio,
    sizes,
    imageSource,
    lightbox,
    lightboxTransition,
    fullWidth,
    linkedToPost,
  } = attributes;

  const { postId, postType: postTypeSlug, queryId } = context;

  const isDescendentOfQueryLoop = Number.isFinite(queryId);

  const classNames = getClassNames(attributes);
  const blockProps = useBlockProps({ className: classNames + " sg-image-container" });

  const { imageSizes } = useSelect(
    (select) => (select("core/block-editor") as any).getSettings(),
    []
  );

  const [featuredImageId, setFeaturedImage] = useEntityProp(
    "postType",
    postTypeSlug,
    "featured_media",
    postId
  );

  const [featuredImagePosition, setFeaturedImagePosition] = usePostMeta(
    postTypeSlug,
    postId,
    "featured_image_position"
  );

  const featuredImage = useSelect(
    (select) => {
      const { getMedia } = select("core") as any;
      return featuredImageId && getMedia(featuredImageId, { context: "view" });
    },
    [featuredImageId]
  );

  const setNewFeaturedImage = (newImage) => {
    setFeaturedImage(newImage.id);
    setAttributes({ imageSource: "full", sizes: { ...sizes, default: null } });
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
    setAttributes({ imageSource: "full", sizes: { ...sizes, default: null } });
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
    if (!!imageSource && !sizes["default"] && featuredImage) {
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
              { label: "aucun", value: "" },
              { label: "original", value: "original" },
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
            options={imageSizes?.map((size) => ({
              label: size.name,
              value: size.slug,
            }))}
            onChange={setImageSource}
          />
          <ToggleControl
            label="Lien vers l'article"
            help="Ajouter un lien vers l'article"
            checked={!!linkedToPost}
            onChange={(value) => {
              setAttributes({ linkedToPost: value, lightbox: false });
            }}
          />
          {
            /**
             *
             * If is not in a query loop, be able to open the image in a lightbox on click
             *
             */
            !isDescendentOfQueryLoop && (
              <>
                {
                  /**
                   *
                   * If linked to post is checked, this option is disabled
                   *
                   */
                  !linkedToPost && (
                    <ToggleControl
                      label="Agrandir au clic"
                      help="Agrandissez l'image dans une lightbox au clic"
                      checked={!!lightbox}
                      onChange={(value) =>
                        setAttributes({ lightbox: value, linkedToPost: false })
                      }
                    />
                  )
                }
                {
                  /**
                   *
                   * If lightbox option is on, be able to choose a transition
                   *
                   */
                  !!lightbox && (
                    <SelectControl
                      label="Transition ouverture lightbox"
                      help="Choisir une transition"
                      value={lightboxTransition}
                      options={LIGHTBOX_TRANSITIONS.map((transition) => ({
                        label: transition,
                        value: transition,
                      }))}
                      onChange={(value) =>
                        setAttributes({ lightboxTransition: value })
                      }
                    />
                  )
                }
              </>
            )
          }
          {
            /**
             *
             * If an image has been selected, be able to set the focal point
             * (object position saved in the post meta)
             *
             */
            !!featuredImage && (
              <PanelRow>
                <h3>Modifier le point de focus :</h3>
                <FocalPointPicker
                  url={
                    featuredImage.media_details.sizes["medium"]?.source_url ??
                    featuredImage.media_details.source_url
                  }
                  onChange={(value) => setFeaturedImagePosition(value)}
                  value={featuredImagePosition}
                  // @ts-ignore
                  onDrag={(value) => setFeaturedImagePosition(value)}
                />
              </PanelRow>
            )
          }

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
                        setAttributes({
                          sizes: {
                            ...sizes,
                            [breakpoints[tab.name].toString()]: value,
                          },
                        })
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
        {
          /**
           *
           * If the is a featured image display it
           *
           */

          !!featuredImage ? (
            <figure
              className={`sg-image sg-featured-image sg-lazy-image${
                !!fullWidth ? " sg-image--full-width" : ""
              }`}
              style={{
                aspectRatio: !aspectRatio
                  ? undefined
                  : aspectRatio === "original"
                  ? `${featuredImage.media_details.width}/${featuredImage.media_details.height}`
                  : aspectRatio
              }}
            >
              <img
                src={
                  imageSource && featuredImage.media_details.sizes[imageSource]
                    ? featuredImage.media_details.sizes[imageSource].source_url
                    : featuredImage.source_url
                }
                width={
                  imageSource && featuredImage.media_details.sizes[imageSource]
                    ? featuredImage.media_details.sizes[imageSource].width
                    : featuredImage.media_details.width
                }
                height={
                  imageSource && featuredImage.media_details.sizes[imageSource]
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
                style={{
                  objectPosition: `${featuredImagePosition.x * 100}% ${
                    featuredImagePosition.y * 100
                  }%`,
                }}
              />
              {
                /**
                 * Display edit and remove buttons only when image block is selected
                 */
                isSelected && (
                  <>
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
                    {
                      /**
                       * Display the remove button only if it's not in a query loop
                       *
                       */

                      !isDescendentOfQueryLoop && (
                        <Button
                          isDestructive
                          className="sg-featured-image__remove-btn"
                          onClick={removeFeaturedImage}
                          icon="trash"
                        />
                      )
                    }
                  </>
                )
              }
            </figure>
          ) : null
        }
        {
          /**
           *
           * Placeholder when no image is selected
           *
           */

          !featuredImage && postId && (
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
          )
        }
      </div>
    </>
  );
};

export default Edit;

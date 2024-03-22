import React from "react";
import { useSelect } from "@wordpress/data";
import {
  Button,
  PanelBody,
  TabPanel,
  ToggleControl,
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
import usePostMeta from "../block-components/usePostMeta";
// @ts-ignore
import { useEntityProp } from "@wordpress/core-data";

import ImageInspectorControls from "../block-components/ImageInspectorControls";


const Edit = ({ attributes, setAttributes, context, isSelected }) => {
  const {
    aspectRatio,
    sizes,
    imageSource,
    linkedToPost,
    fixedHeight,
    fixedWidth,
  } = attributes;

  const { postId, postType: postTypeSlug, queryId } = context;

  const isDescendentOfQueryLoop = Number.isFinite(queryId);

  const classNames = getClassNames(attributes);
  const blockProps = useBlockProps({ className: classNames + " sg-image-container" });

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


  return (
    <>
      <InspectorControls>
        <TabPanel
          className="sg-image-tab-panel"
          activeClass="active-tab"
          tabs={[
            {
              name: "options",
              title: "Options",
            },
            {
              name: "display",
              title: "Affichage",
            },
          ]}
        >
          {(tab) => (
            <div>
              {tab.name === "options" && (
                <PanelBody
                  title="Options"
                  initialOpen
                >
                  <ToggleControl
                    label="Lien vers l'article"
                    help="Ajouter un lien vers l'article"
                    checked={!!linkedToPost}
                    onChange={(value) => {
                      setAttributes({ linkedToPost: value, lightbox: false });
                    }}
                  />
                </PanelBody>
              )}
              {tab.name === "display" && (
                <ImageInspectorControls
                  attributes={{ ...attributes, imagePosition: featuredImagePosition }}
                  setAttributes={setAttributes}
                  currentImage={featuredImage}
                  lightboxOptionsActive={!isDescendentOfQueryLoop && !linkedToPost}
                  setFocalPoint={setFeaturedImagePosition}
                />
              )}
            </div>
          )}
        </TabPanel>
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
              className={`sg-image sg-featured-image sg-lazy-image`}
              style={{
                aspectRatio: !aspectRatio
                  ? undefined
                  : aspectRatio === "original"
                    ? `${featuredImage.media_details.width}/${featuredImage.media_details.height}`
                    : aspectRatio,
                width: fixedWidth ? fixedWidth : undefined,
                height: fixedHeight ? fixedHeight : undefined,
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
                  objectPosition: featuredImagePosition ? `${featuredImagePosition.x * 100}% ${featuredImagePosition.y * 100
                    }%` : undefined,
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

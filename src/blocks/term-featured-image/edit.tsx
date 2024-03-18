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
// @ts-ignore
import { useEntityProp } from "@wordpress/core-data";
import __ from "@wordpress/i18n";

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

const TAX_OPTIONS = [
  { value: "sport", label: "Sports" },
  { value: "activity-type", label: "Types d'activités" },
];

const Edit = ({ attributes, setAttributes }) => {
  const {
    aspectRatio,
    sizes,
    imageSource,
    lightbox,
    lightboxTransition,
    fullWidth,
    linkedToPageId,
    linkedToArchive,
    taxonomy,
    termId,
    imagePosition
  } = attributes;

  const classNames = getClassNames(attributes);
  const blockProps = useBlockProps({ className: classNames + " sg-image-container" });

  const { imageSizes } = useSelect(
    (select) => (select("core/block-editor") as any).getSettings(),
    []
  );

  const termOptions = useSelect(select => {
    const { getEntityRecords } = select("core") as any;
    return getEntityRecords("taxonomy", taxonomy, { per_page: -1 })?.map(
      (term) => ({
        value: term.id,
        label: term.name,
      })
    );
  }, [taxonomy]);

  const pagesOptions = useSelect(select => {
    const { getEntityRecords } = select("core") as any;
    return getEntityRecords("postType", "page", { per_page: -1 })?.map(
      page => ({
        value: page.id,
        label: page?.title?.rendered ?? 'Undefined',
      })
    );
  }, []);

  const { cover } = useSelect(select => {
    const { getEntityRecord } = select("core") as any;
    return getEntityRecord("taxonomy", taxonomy, termId)?.meta ?? {};
  }, [taxonomy, termId]);

  const featuredImage = useSelect(
    (select) => {
      const { getMedia } = select("core") as any;
      return cover && getMedia(cover, { context: "view" });
    },
    [cover]
  );

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

  useEffect(() => {
    if (!taxonomy) {
      setAttributes({ taxonomy: "sport" })
    }
  }, [taxonomy])

  return (
    <>
      <InspectorControls>
        <PanelBody title="Tag - Image de couverture">
          <SelectControl
            label="Taxonomie"
            value={taxonomy}
            options={TAX_OPTIONS}
            onChange={(value) => setAttributes({ taxonomy: value })}
          />
          <SelectControl
            label="Terme"
            value={termId}
            options={termOptions}
            onChange={(value) => setAttributes({ termId: value })}
          />
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
            label="Lien vers l'archive"
            help="Ajouter un lien vers l'archive"
            checked={!!linkedToArchive}
            onChange={(value) => {
              setAttributes({
                linkedToArchive: value,
                lightbox: false,
                linkedToPageId: undefined
              });
            }}
          />
          {
            !linkedToArchive &&
            <SelectControl
              label={'Lien vers une page'}
              value={linkedToPageId}
              options={pagesOptions}
              onChange={(value) => setAttributes({ linkedToPageId: value })}
            />
          }
          {
            /**
             *
             * If is not in a query loop, be able to open the image in a lightbox on click
             *
             */
            !linkedToArchive && !linkedToPageId && (
              <>
                <ToggleControl
                  label="Agrandir au clic"
                  help="Agrandissez l'image dans une lightbox au clic"
                  checked={!!lightbox}
                  onChange={(value) =>
                    setAttributes({ lightbox: value, linkedToPost: false })
                  }
                />
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
                  onChange={(value) => setAttributes({ imagePosition: value })}
                  value={imagePosition}
                  // @ts-ignore
                  onDrag={(value) => setAttributes({ imagePosition: value })}
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
              className={`sg-image sg-featured-image sg-lazy-image${!!fullWidth ? " sg-image--full-width" : ""
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
                  objectPosition: `${imagePosition?.x * 100}% ${imagePosition?.y * 100
                    }%`,
                }}
              />
            </figure>
          ) : null
        }
        {
          /**
           *
           * Placeholder when no image is selected
           *
           */

          !featuredImage && (
            <div className="sg-featured-image no-image">
              <p>Pas d'image de couverture selectionnée</p>
            </div>
          )
        }
      </div>
    </>
  );
};

export default Edit;

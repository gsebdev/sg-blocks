import React, { useEffect } from "react";
import { useSelect } from "@wordpress/data";
import {
  PanelBody,
  SelectControl,
  TabPanel,
  ToggleControl,
} from "@wordpress/components";
import {
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";

import {
  generateImagesSizes,
  generateSrcset,
  getClassNames,
} from "../block-utilities/sg-blocks-helpers";

import __ from "@wordpress/i18n";

import ImageInspectorControls from "../block-components/ImageInspectorControls";

const TAX_OPTIONS = [
  { value: "sport", label: "Sports" },
  { value: "activity-type", label: "Types d'activités" },
];

const TermFeaturedImageInspectorControls: React.FC<any> = ({
  attributes,
  setAttributes,
}) => {
  const { linkedToPageId, linkedToArchive, taxonomy, termId } = attributes;

  const termOptions = useSelect(
    (select) => {
      const { getEntityRecords } = select("core") as any;
      return getEntityRecords("taxonomy", taxonomy, { per_page: -1 })?.map(
        (term) => ({
          value: term.id,
          label: term.name,
        })
      );
    },
    [taxonomy]
  );

  const pagesOptions = useSelect((select) => {
    const { getEntityRecords } = select("core") as any;
    return getEntityRecords("postType", "page", { per_page: -1 })?.map(
      (page) => ({
        value: page.id,
        label: page?.title?.rendered ?? "Undefined",
      })
    );
  }, []);

  useEffect(() => {
    if (!taxonomy) {
    setAttributes({ taxonomy: TAX_OPTIONS[0].value });
    }
  }, [taxonomy]);

  useEffect(() => {
    if(termOptions && !termId) {
      setAttributes({ termId: termOptions[0].value?.toString() });
    }
  }, [termOptions]);


  return (
    <PanelBody title="Options">
      <SelectControl
        label="Taxonomie"
        value={taxonomy}
        options={TAX_OPTIONS}
        onChange={(value) => setAttributes({ taxonomy: value, termId: undefined })}
      />
      <SelectControl
        label="Terme"
        value={termId}
        options={termOptions}
        onChange={(value) => setAttributes({ termId: value })}
      />

      <ToggleControl
        label="Lien vers l'archive"
        help="Ajouter un lien vers l'archive"
        checked={!!linkedToArchive}
        onChange={(value) => {
          setAttributes({
            linkedToArchive: value,
            lightbox: false,
            linkedToPageId: undefined,
          });
        }}
      />
      {!linkedToArchive && (
        <SelectControl
          label={"Lien vers une page"}
          value={linkedToPageId}
          options={pagesOptions}
          onChange={(value) => setAttributes({ linkedToPageId: value })}
        />
      )}
    </PanelBody>
  );
};

const Edit = ({ attributes, setAttributes }) => {
  const {
    aspectRatio,
    sizes,
    imageSource,
    linkedToPageId,
    linkedToArchive,
    taxonomy,
    termId,
    imagePosition,
    fixedHeight,
    fixedWidth,
  } = attributes;

  const classNames = getClassNames(attributes);
  const blockProps = useBlockProps({
    className: classNames + " sg-image-container",
  });

  const { cover } = useSelect(
    (select) => {
      const { getEntityRecord } = select("core") as any;
      return getEntityRecord("taxonomy", taxonomy, termId)?.meta ?? {};
    },
    [taxonomy, termId]
  );

  const featuredImage = useSelect(
    (select) => {
      const { getMedia } = select("core") as any;
      return cover && getMedia(cover, { context: "view" });
    },
    [cover]
  );

  return (
    <>
      <InspectorControls>
        <TabPanel
          className="sg-image-tab-panel"
          activeClass="active-tab"
          tabs={[
            {
              name: "source",
              title: "Source",
            },
            {
              name: "display",
              title: "Affichage",
            },
          ]}
        >
          {(tab) => (
            <div>
              {tab.name === "source" && (
                <TermFeaturedImageInspectorControls
                  attributes={attributes}
                  setAttributes={setAttributes}
                />
              )}
              {tab.name === "display" && (
                <ImageInspectorControls
                  attributes={attributes}
                  setAttributes={setAttributes}
                  currentImage={featuredImage}
                  lightboxOptionsActive={!linkedToArchive && !linkedToPageId}
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
                  objectPosition: `${imagePosition?.x * 100}% ${
                    imagePosition?.y * 100
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

import React, { useMemo, memo, useState, useEffect, useRef } from "react";
/**
 * 
 * Wordpress dependencies
 * 
 */

import {
  useBlockProps,
  InspectorControls,
  // @ts-ignore
  BlockContextProvider,
  // @ts-ignore
  __experimentalUseBlockPreview as useBlockPreview,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
import { PanelBody, TabPanel } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { useInstanceId } from '@wordpress/compose';


/**
 * 
 * 
 * Internal dependencies
 * 
 */
import QueryRelatedLayoutControls from "./inspector-controls/QueryRelatedLayoutControls";
import QueryRelatedQueryControls from "./inspector-controls/QueryRelatedQueryControls";
import QueryRelatedSliderControls from "./inspector-controls/QueryRelatedSliderControls";
import { getClassNames } from "../block-utilities/sg-blocks-helpers";
import Swiper from "sg-swiper";


export interface Attributes {
  relatedPostType: string;
  relatedTaxonomy: string;
  postNumber: number;
  excludedIds: string[];
  gap: Record<string, number>;
  margin: Record<string, Record<string, number | { x: number; y: number }>>;
  padding: Record<string, Record<string, number | { x: number; y: number }>>;
  columns: Record<string, number | null | undefined>;
  contentAlignment: string;
  slider: boolean;
  sliderBreakpoint: number;
  sliderAutoplay: boolean | number;
  sliderDisplayNavElements: boolean;
  className: string;
  queryId: number;
}

export interface CoreStore {
  getEntityRecords: <T>(
    entityType: string,
    entityName: string | null,
    options?: any
  ) => T[];
  getEntityRecord: <T>(
    entityType: string,
    entityName: string | null,
    key: string,
    options?: any
  ) => T;
  getPostTypes: (args: any) => any;
}

interface EditProps {
  isSelected: boolean;
  attributes: Attributes;
  setAttributes: (attribute: Partial<Attributes>) => void;
  clientId: string;
  innerBlocks: any[];
}

const TEMPLATE = [['sg/container', { Tag: 'article' }, [
  ['sg/container', { Tag: 'div' }, [
    ['sg/featured-image', {
      imageSource: 'medium_medium',
      aspectRatio: '4 / 3',
      sizes: { "default": 480 }
    }],
  ]],
  ['core/post-title'],
  ['core/post-excerpt', { moreText: '', showMoreOnNewLines: false }],
]]

];

/**
 * Generates inner blocks properties for the post template.
 *
 * @return {JSX.Element} The JSX element with inner block properties.
 */
const RelatedPostInnerBlocks = ({ className = "" }) => {
  const innerBlocksProps = useInnerBlocksProps(
    { className: className },
    { template: TEMPLATE as any }
  );
  return <li {...innerBlocksProps} />;
};

/**
 * Generates a preview of a block template for a post.
 *
 * @param {object} blocks - The blocks to be previewed.
 * @param {string} blockContextId - The context ID of the block.
 * @param {boolean} isHidden - Whether the block is hidden.
 * @param {function} setActiveBlockContextId - The function to set the active block context ID.
 * @return {JSX.Element} The rendered block preview component.
 */
function PostTemplateBlockPreview({
  blocks,
  blockContextId,
  isHidden,
  className = "",
  setActiveBlockContextId,
}) {
  const blockPreviewProps = useBlockPreview({
    className: className,
    blocks,
  });

  const handleOnClick = () => {
    setActiveBlockContextId(blockContextId);
  };

  const style = {
    display: isHidden ? "none" : undefined,
  };

  return (
    <li
      {...blockPreviewProps}
      className={blockPreviewProps.className + " " + className}
      tabIndex={0}
      role="button"
      onClick={handleOnClick}
      onKeyDown={handleOnClick}
      style={style}
    />
  );
}

const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);

/**
 * Component for editing the block.
 *
 * @param {EditProps} clientId 
 * @param {EditProps} attributes 
 * @param {EditProps} setAttributes 
 * @return {JSX.Element} 
 */
const Edit: React.FC<EditProps> = ({ clientId, attributes, setAttributes }) => {
  const {
    className,
    relatedPostType,
    relatedTaxonomy,
    postNumber,
    excludedIds,
    slider,
    sliderBreakpoint,
    sliderAutoplay,
    sliderDisplayNavElements
  } = attributes;
  const instanceId = useInstanceId(Edit);

  const [activeBlockContextId, setActiveBlockContextId] = useState(null);
  const [sliderStarted, setSliderStarted] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const currentPost = useSelect(
    (select) => (select("core/editor") as any).getCurrentPost(),
    []
  );

  const blocks = useSelect(
    (select) => (select("core/block-editor") as any).getBlocks(clientId),
    []
  );

  const classNames = getClassNames(attributes);
  const blockProps = useBlockProps();
  blockProps.className = `${blockProps.className.replace(
    attributes.className,
    ""
  )}`;

  const queriedRelatedPosts = useSelect(
    (select: (store: string) => CoreStore) => {
      const { getEntityRecords } = select("core");

      if (!relatedPostType || !relatedTaxonomy || !currentPost) return [];

      return getEntityRecords("sg", "related_posts", {
        related_post_type: relatedPostType,
        related_taxonomy: relatedTaxonomy,
        post_number: postNumber ? postNumber : -1,
        post_id: currentPost.id,
        excluded_ids: excludedIds,
      });
    },
    [relatedPostType, relatedTaxonomy, postNumber, currentPost.id, excludedIds]
  );

  const postContexts = useMemo(
    () =>
      queriedRelatedPosts?.map((post: any) => ({
        postType: post.type,
        postId: post.id,
        postTitle: post.title,
        queryId: post.query_id,
      })),
    [queriedRelatedPosts]
  );

  useEffect(() => {
    setAttributes({
      queryId: instanceId
    })
  })

  useEffect(() => {

    const toggleSlider = () => {
      const { innerWidth: size } = window;
      if (size <= sliderBreakpoint || sliderBreakpoint === 0) {
        setSliderStarted(true);
      } else {
        setSliderStarted(false);
      }
    }

    if (!slider) {
      setSliderStarted(false);
      window.removeEventListener("resize", toggleSlider);
    } else {
      window.addEventListener("resize", toggleSlider);
      toggleSlider();
    }
    return (() => {
      window.removeEventListener("resize", toggleSlider);
    })
  }, [slider, sliderBreakpoint]);

  useEffect(() => {
    if (!!slider && !!sliderRef.current && sliderStarted) {
      const swiper = new Swiper(sliderRef.current, {
        draggable: true,
        auto: typeof sliderAutoplay === "number" ? sliderAutoplay : undefined,
        navigation: {
          prev: Array.from(sliderRef.current?.querySelectorAll("[data-direction=prev]")),
          next: Array.from(sliderRef.current?.querySelectorAll("[data-direction=next]"))
        },
      });
      swiper.start();
      return (() => {
        swiper.stop();
      })
    }
  }, [slider, sliderStarted, sliderRef.current]);

  return (
    <>
      <InspectorControls>
        <PanelBody>
          <TabPanel
            className="query-related-tab-panel"
            activeClass="active-tab"
            tabs={[
              {
                name: "query",
                title: "Requête",
              },
              {
                name: "layout",
                title: "Affichage",
              },
              {
                name: "slider",
                title: "Slider",
              },
            ]}
          >
            {(tab) => (
              <div>
                <h3>{tab.title}</h3>
                {tab.name === "layout" && (
                  <QueryRelatedLayoutControls
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                )}
                {tab.name === "query" && (
                  <QueryRelatedQueryControls
                    attributes={attributes}
                    setAttributes={setAttributes}
                    currentPost={currentPost}
                    posts={postContexts}
                  />
                )}
                {tab.name === "slider" && (
                  <QueryRelatedSliderControls
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                )}
              </div>
            )}
          </TabPanel>
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        {postContexts && postContexts.length > 0 ?
          <div
            data-sg-slider={slider ? sliderBreakpoint : undefined}
            className={`sg-query-related${slider ? " sg-swiper" : ""}${sliderStarted ? " sg-swiper--started" : ""}`}
            ref={sliderRef}
          >
            <ul
              className={`sg-query-related__list ${classNames} ${className ? className : ""} ${slider ? "sg-swiper__wrapper" : ""}`}
            >
              {
                postContexts.map((postContext) => (
                  <BlockContextProvider
                    key={postContext.postId}
                    value={postContext}
                  >
                    {postContext.postId ===
                      (activeBlockContextId || postContexts[0]?.postId) ? (
                      <RelatedPostInnerBlocks
                        className={slider ? "sg-swiper__slide" : undefined}
                      />
                    ) : null}

                    <MemoizedPostTemplateBlockPreview
                      className={slider ? "sg-swiper__slide" : undefined}
                      blocks={blocks}
                      blockContextId={postContext.postId}
                      setActiveBlockContextId={setActiveBlockContextId}
                      isHidden={
                        postContext.postId ===
                        (activeBlockContextId || postContexts[0]?.postId)
                      }
                    />
                  </BlockContextProvider>
                ))
              }
            </ul>
            {
              /**
               * 
               * Navigation is enabled, then display the nav buttons
               * 
               */
              !!sliderDisplayNavElements && !!slider &&
              <>
                <button
                  className="sg-swiper__nav sg-icon-cheveron-left"
                  data-direction="prev"
                />
                <button
                  className="sg-swiper__nav sg-icon-cheveron-right"
                  data-direction="next"
                />
              </>
            }
          </div> :

          /**
           * 
           * If the query return 0 results, then display a placeholder that show query options
           * 
           * 
           */
          <div className="sg-query-related__empty">
            <h3>{__('SG Boucle de Post liés')}</h3>
            <p>{__('Aucun post trouvé')}</p>
            <QueryRelatedQueryControls
              attributes={attributes}
              setAttributes={setAttributes}
              currentPost={currentPost}
              posts={postContexts}
            />
          </div>
        }
      </div>
    </>
  );
};

export default Edit;

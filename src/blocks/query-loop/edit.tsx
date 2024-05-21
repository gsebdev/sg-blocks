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
import { TabPanel } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { useInstanceId } from '@wordpress/compose';


/**
 * 
 * 
 * Internal dependencies
 * 
 */
import { getClassNames } from "../block-utilities/sg-blocks-helpers";
import Swiper from "sg-swiper";
import LoopLayoutControls from "./inspector-controls/LoopLayoutControls";
import LoopQueryControls from "./inspector-controls/LoopQueryControls";
import LoopSliderControls from "./inspector-controls/LoopSliderControls";


export interface SGQueryBlockAttributes {
  queryPostType: string;
  queryTaxonomy: string | { [taxonomy: string]: string[]};
  postNumber: number;
  excludedIds: string[];
  gap: Record<string, number>;
  margin: Record<string, Record<string, number | { x: number; y: number }>>;
  padding: Record<string, Record<string, number | { x: number; y: number }>>;
  columns: Record<string, number | null | undefined>;
  contentAlignement: string;
  slider: boolean;
  sliderBreakpoint: number;
  sliderAutoplay: boolean | number;
  sliderDisplayNavElements: boolean;
  sliderNoLimitEdges: boolean;
  className: string;
  queryId: number;
  order: string;
  relatedQuery: boolean;
  orderBy: string;
  queryTaxonomyTerms: any[];
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
  attributes: SGQueryBlockAttributes;
  setAttributes: (attribute: Partial<SGQueryBlockAttributes>) => void;
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

  return (
    <>
      {
        isHidden ?
          null :
          <li
            {...blockPreviewProps}
            className={blockPreviewProps.className + " " + className}
            tabIndex={0}
            role="button"
            onClick={handleOnClick}
            onKeyDown={handleOnClick}
          />
      }
    </>

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
    queryPostType,
    queryTaxonomy,
    postNumber,
    excludedIds,
    slider,
    sliderBreakpoint,
    sliderDisplayNavElements,
    sliderNoLimitEdges,
    order,
    orderBy,
    relatedQuery,
    queryTaxonomyTerms
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

  /***
   * 
   * Retrieve the posts based on block settings
   * 
   */

  const queriedPosts = useSelect(
    (select: (store: string) => CoreStore) => {
      const { getEntityRecords } = select("core");

      if (!queryPostType || (relatedQuery && !currentPost)) return [];

      const posts = getEntityRecords("sg", "related_posts", {
        query_post_type: queryPostType,
        query_taxonomy: queryTaxonomy,
        number_of_posts: postNumber ? postNumber : -1,
        related_post_id: relatedQuery && currentPost.id ? currentPost.id : undefined,
        order: order,
        orderby: orderBy,
        excluded_ids: excludedIds,
        per_page: postNumber ? postNumber : -1,
      });

      return posts;
    },
    [queryPostType, queryTaxonomy, postNumber, currentPost.id, excludedIds, order, orderBy, relatedQuery]
  );

  const postContexts = useMemo(
    () =>
      queriedPosts?.map((post: any) => ({
        postType: post.type,
        postId: post.id,
        postTitle: post.title,
        queryId: post.query_id,
      })),
    [queriedPosts]
  );

  useEffect(() => {
    setAttributes({
      queryId: instanceId
    })
  })

  /**
   * 
   * Handle the init of the slider if activated and update it on change settings
   * 
   * 
   */
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
        draggable: false,
        limitToEdges: !sliderNoLimitEdges,
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
  }, [slider, sliderStarted, sliderRef.current, sliderNoLimitEdges]);

  return (
    <>
      <InspectorControls>
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
              {tab.name === "layout" && (
                <LoopLayoutControls
                  attributes={attributes}
                  setAttributes={setAttributes}
                />
              )}
              {tab.name === "query" && (
                <LoopQueryControls
                  attributes={attributes}
                  setAttributes={setAttributes}
                  currentPost={currentPost}
                  posts={postContexts}
                />
              )}
              {tab.name === "slider" && (
                <LoopSliderControls
                  attributes={attributes}
                  setAttributes={setAttributes}
                />
              )}
            </div>
          )}
        </TabPanel>
      </InspectorControls>
      <div {...blockProps}>
        {postContexts && postContexts.length > 0 ?
          <div
            data-sg-slider={slider ? sliderBreakpoint : undefined}
            className={`sg-query-related${slider ? " sg-swiper" : ""}${sliderStarted ? " sg-swiper--started" : ""}`}
            data-slider-init={slider ? "true" : "false"}
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
            <h3>{__('SG Related Post Loop', 'sg-blocks')}</h3>
            <p>{__('No posts found', 'sg-blocks')}</p>
            <LoopQueryControls
              attributes={attributes}
              setAttributes={setAttributes}
              currentPost={currentPost}
            />
          </div>
        }
      </div>
    </>
  );
};

export default Edit;

import React, { useMemo, memo, useState } from "react";
// @ts-ignore
import {
  useBlockProps,
  InspectorControls,
  // @ts-ignore
  BlockContextProvider,
  // @ts-ignore
  __experimentalUseBlockPreview as useBlockPreview,
  useInnerBlocksProps,
} from "@wordpress/block-editor";
// @ts-ignore
import { PanelBody, TabPanel } from "@wordpress/components";
// @ts-ignore
import { useSelect } from "@wordpress/data";
// @ts-ignore
import { __ } from "@wordpress/i18n";
import QueryRelatedLayoutControls from "./insepector-controls/QueryRelatedLayoutControls";
import QueryRelatedQueryControls from "./insepector-controls/QueryRelatedQueryControls";
import { getClassNames } from "../block-utilities/sg-blocks-helpers";
// @ts-ignore

export interface Attributes {
  relatedPostType: string;
  relatedTaxonomy: string;
  postNumber: number;
  excludedIds: string[];
  layout: string;
  gap: Record<string, number>;
  margin: Record<string, Record<string, number | { x: number; y: number }>>;
  padding: Record<string, Record<string, number | { x: number; y: number }>>;
  columns: Record<string, number | null | undefined>;
  contentAlignment: string;
  slider: boolean;
  sliderBreakpoint: number;
  className: string;
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
}

interface EditorStore {
  getCurrentPostAttribute: (attribute: string) => any;
  getCurrentPost: () => any;
}

const TEMPLATE = [["sg/activties-card", {}]];

/**
 * Generates inner blocks properties for the post template.
 *
 * @return {JSX.Element} The JSX element with inner block properties.
 */
const RelatedPostInnerBlocks = ({ className = "" }) => {
  const innerBlocksProps = useInnerBlocksProps({
    template: TEMPLATE,
    className: className,
    __unstableDisableLayoutClassNames: true,
  });
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

const Edit: React.FC<EditProps> = ({ clientId, attributes, setAttributes }) => {
  const {
    className,
    relatedPostType,
    relatedTaxonomy,
    postNumber,
    excludedIds,
    slider,
    sliderBreakpoint,
  } = attributes;

  const [activeBlockContextId, setActiveBlockContextId] = useState(null);

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
      })),
    [queriedRelatedPosts]
  );

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
              </div>
            )}
          </TabPanel>
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <div
          data-sg-slider={slider ? sliderBreakpoint : undefined}
          className={slider ? "sg-slider" : undefined}
        >
          <ul
            className={`${classNames} ${className ? className : ""} ${slider ? "sg-slider__wrapper" : ""
              }`}
            role="list"
          >
            {postContexts &&

              postContexts.map((postContext) => (
                <BlockContextProvider
                  key={postContext.postId}
                  value={postContext}
                >
                  {postContext.postId ===
                    (activeBlockContextId || postContexts[0]?.postId) ? (
                    <RelatedPostInnerBlocks
                      className={slider ? "sg-slider__slide" : undefined}
                    />
                  ) : null}

                  <MemoizedPostTemplateBlockPreview
                    className={slider ? "sg-slider__slide" : undefined}
                    blocks={blocks}
                    blockContextId={postContext.postId}
                    setActiveBlockContextId={setActiveBlockContextId}
                    isHidden={
                      postContext.postId ===
                      (activeBlockContextId || postContexts[0]?.postId)
                    }
                  />
                </BlockContextProvider>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Edit;

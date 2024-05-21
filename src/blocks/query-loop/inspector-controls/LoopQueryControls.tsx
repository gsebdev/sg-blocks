import React from "react";
import { __ } from "@wordpress/i18n";
import {
  FormTokenField,
  PanelBody,
  SelectControl,
  ToggleControl,
  //@ts-ignore
  __experimentalDivider as Divider,
  //@ts-ignore
  __experimentalNumberControl as NumberControl,
  PanelRow,
  TextControl,
  Button,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";

import { SGQueryBlockAttributes } from "../edit";

interface LoopQueryControlsProps {
  attributes: SGQueryBlockAttributes;
  setAttributes: (attributes: any) => void;
  currentPost: any;
  posts?: any[];
}

const EXCLUDED_POST_TYPES = [
  "attachment",
  "nav_menu_item",
  "wp_block",
  "wp_template",
  "wp_template_part",
  "wp_navigation",
];

const ORDER_BY_OPTIONS = [
  { value: "date", label: __("Date", "sg-blocks") },
  { value: "title", label: __("Title", "sg-blocks") },
  { value: "rand", label: __("Random", "sg-blocks") },
  { value: "featured", label: __("Featured", "sg-blocks") },
]

const ORDER_OPTIONS = [
  { value: "asc", label: __("Ascending", "sg-blocks") },
  { value: "desc", label: __("Descending", "sg-blocks") },
]
const LoopQueryControls: React.FC<LoopQueryControlsProps> = ({
  attributes,
  setAttributes,
  currentPost,
  posts
}) => {
  const {
    relatedQuery,
    queryPostType,
    queryTaxonomy,
    order,
    orderBy,
    excludedIds,
    postNumber
  } = attributes;

  /**
   * Get the postypes and taxonomies options
   *
   */
  const postTypesOptions = useSelect(
    (select) => {
      const { getPostTypes } = select("core") as any;

      // get all selectable post types
      let postTypes = getPostTypes({ per_page: -1 })?.filter(
        (postType) => !EXCLUDED_POST_TYPES.includes(postType.slug)
      );

      /**
       * if relatedQuery is set to true
       * get the supported taxonomies of the current post
       */
      if (relatedQuery && currentPost) {
        // get the supported taxonomies of the current post to compare
        const currentPostTaxonomies =
          postTypes?.find((postType) => postType.slug === currentPost.type)
            ?.taxonomies || [];

        // filter the available post types based on the taxonomy supports
        postTypes = postTypes?.filter((postType) =>
          postType.taxonomies.some(
            (tax) => currentPostTaxonomies?.includes(tax) || false
          )
        );
      }

      return postTypes;
    },
    [relatedQuery, queryPostType, currentPost]
  );

  /**
   *
   * Get the Terms options
   *
   *
   */

  const taxonomiesOptions = useSelect(
    (select) => {

      if (!postTypesOptions) return null;

      // if the block is set to be a related query, only return taxonomies slugs (without terms suggestions)
      if (relatedQuery && currentPost) {
        const options = postTypesOptions.find((postType) => postType.slug === currentPost.type)?.taxonomies || [];
        return options;
      }

      if (!relatedQuery) {
        const { getEntityRecords } = select("core") as any;
        const currentPostTypeTaxonomies = postTypesOptions.find(({ slug }) => slug === queryPostType)?.taxonomies ||
          null;

        if (!currentPostTypeTaxonomies) return null;
        const options = currentPostTypeTaxonomies.map((tax) => {
          const terms = getEntityRecords("taxonomy", tax, {
            per_page: -1,
          });
          return { taxonomy: tax, terms };
        });

        return options;
      }

      return null;
    },
    [queryPostType, relatedQuery, currentPost, postTypesOptions]
  );

  return (
    <>
      <PanelBody title={__("Query Options", "sg-blocks")}>
        <ToggleControl
          label={__("Show related posts loop?", "sg-blocks")}
          checked={relatedQuery}
          onChange={(v) => {
            setAttributes({
              relatedQuery: v,
              queryTaxonomy: undefined
            })
          }

          }
        />
        <SelectControl
          label={__("Post type", "sg-blocks")}
          value={queryPostType}
          onChange={(postType: string) =>
            setAttributes({ queryPostType: postType })
          }
          options={postTypesOptions?.map(
            (postType: { name: string; slug: string }) => ({
              value: postType.slug,
              label: postType.name,
            })
          )}
        />
        <NumberControl
          label={__("Number of items", "sg-blocks")}
          value={postNumber}
          onChange={(number: number) =>
            setAttributes({ postNumber: number })
          }
          min={0}
          max={20}
        />
      </PanelBody>
      <PanelBody title={__("Sort by", "sg-blocks")}>
        <SelectControl
          label={__("Sort type", "sg-blocks")}
          value={orderBy}
          onChange={(param: string) =>
            setAttributes({ orderBy: param })
          }
          options={ORDER_BY_OPTIONS}
        />
        <SelectControl
          label={__("Sort order", "sg-blocks")}
          value={order}
          onChange={(param: string) =>
            setAttributes({ order: param })
          }
          options={ORDER_OPTIONS}
        />
      </PanelBody>
      <PanelBody title={__("Filter by Taxonomy", "sg-blocks")}>

        {!!taxonomiesOptions && !relatedQuery &&
          taxonomiesOptions.map((option: { taxonomy: string; terms: string[] }) => (
            <FormTokenField
              value={queryTaxonomy?.[option['taxonomy']] ?? []}
              label={option['taxonomy']?.charAt(0).toUpperCase() + option['taxonomy']?.slice(1)}
              suggestions={option['terms']?.map((term: any) => term.slug)}
              onChange={(terms: string[]) =>
                setAttributes({ queryTaxonomy: { ...(typeof queryTaxonomy === 'object' ? queryTaxonomy : {}), [option['taxonomy']]: terms } })
              }
            />
          ))
        }

        {!!taxonomiesOptions && !!relatedQuery &&
          <SelectControl
            label={"Taxonomy"}
            value={typeof queryTaxonomy === 'string' ? queryTaxonomy : ''}
            onChange={(taxonomy: string) =>
              setAttributes({ queryTaxonomy: taxonomy })
            }
            options={[
              {
                value: "",
                label: "Aucune",
              },
              ...(Array.isArray(taxonomiesOptions)
                ? taxonomiesOptions?.map((taxonomy: string) => ({
                  value: taxonomy,
                  label: taxonomy.charAt(0).toUpperCase() + taxonomy.slice(1),
                }))
                : []),
            ]}
          />
        }
      </PanelBody>
      <PanelBody title={__("Excluded publications", "sg-blocks")}>
        <Divider />
        <PanelRow>
          <TextControl
            label={__("Excluded IDs", 'sg-blocks')}
            placeholder="Ex: 1, 2, 3"
            value={excludedIds?.join(', ') ?? ''}
            onChange={(excluded: string) =>
              setAttributes({ excludedIds: excluded.split(', ') })
            }
          />
        </PanelRow>
        {posts &&
          <div>
            {posts.map((post) => {
              return (
                <PanelRow key={post.postId}>
                  <span>
                    {post.postTitle}
                    <Button
                      isDestructive
                      icon="remove"
                      onClick={() => setAttributes({ excludedIds: [...(excludedIds ?? []), post.postId] })}
                    />
                  </span>
                </PanelRow>
              );
            })}
          </div>
        }

      </PanelBody>
    </>
  );
};
export default LoopQueryControls;

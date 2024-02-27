import React, { useEffect } from "react";
/**
 * Wordpress dependencies
 */
import {
  SelectControl,
  PanelBody,
  PanelRow,
  //@ts-ignore
  __experimentalNumberControl as NumberControl,
  //@ts-ignore
  __experimentalDivider as Divider,
  TextControl,
  Button
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";

/**
 * Internal dependecies
 */
import { CoreStore } from "../edit";

const QueryRelatedQueryControls = ({
  attributes,
  setAttributes,
  currentPost,
  posts
}) => {
  const { postNumber, relatedPostType, relatedTaxonomy, excludedIds } = attributes;
  const { type } = currentPost;

  const [postTypesOptions, taxonomiesOptions] = useSelect(
    (select: (store: string) => CoreStore) => {
      const { getPostTypes } = select("core");

      // get all available post types with details
      const allPostTypes = getPostTypes({ per_page: -1 });
      const selectedRelatedPostTypeTaxonomies =
        allPostTypes?.find(({ slug }) => slug === relatedPostType)
          ?.taxonomies || null;

      // get the supported taxonomies of the current post
      const currentPostTaxonomies =
        allPostTypes?.find((postType) => postType.slug === type)?.taxonomies ||
        [];

      // filter the available post types based on the taxonomy supports
      const postTypesOptions = allPostTypes?.filter((postType) =>
        postType.taxonomies.some(
          (tax) => currentPostTaxonomies?.includes(tax) || false
        )
      );

      // filter the available taxonomies based on the post type taxonomies supports
      const taxonomiesOptions = selectedRelatedPostTypeTaxonomies
        ? currentPostTaxonomies.filter((taxonomy: string) =>
          selectedRelatedPostTypeTaxonomies.includes(taxonomy)
        )
        : [];

      return [postTypesOptions, taxonomiesOptions];
    },

    [currentPost, relatedPostType]
  );

  // set default values when options changes
  useEffect(() => {
    if (!relatedPostType || !postTypesOptions?.map(({ slug }) => slug).includes(relatedPostType)) {
      setAttributes({ relatedPostType: postTypesOptions ? postTypesOptions[0]?.slug : undefined });
    }
    if (!relatedTaxonomy || !taxonomiesOptions?.includes(relatedTaxonomy)) {
      setAttributes({ relatedTaxonomy: taxonomiesOptions ? taxonomiesOptions[0] : undefined });
    }
  }, [postTypesOptions, taxonomiesOptions]);


  return (
    <>
      <PanelBody>
        <PanelRow>
          <SelectControl
            label={"Post Type"}
            value={relatedPostType}
            onChange={(postType: string) =>
              setAttributes({ relatedPostType: postType })
            }
            options={postTypesOptions?.map(
              (postType: { name: string; slug: string }) => ({
                value: postType.slug,
                label: postType.name,
              })
            )}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label={"Taxonomy"}
            value={relatedTaxonomy}
            onChange={(taxonomy: string) =>
              setAttributes({ relatedTaxonomy: taxonomy })
            }
            options={taxonomiesOptions?.map((taxonomy: string) => ({
              value: taxonomy,
              label: taxonomy.charAt(0).toUpperCase() + taxonomy.slice(1),
            }))}
          />
        </PanelRow>
        <PanelRow>
          <NumberControl
            label={"Nombre d'éléments"}
            value={postNumber}
            onChange={(number: number) =>
              setAttributes({ postNumber: number })
            }
            min={0}
            max={20}
          />
        </PanelRow>
        <Divider />
        {
          posts &&
          <>
          <PanelRow>
            <TextControl
              label={"IDs exclus"}
              placeholder="Ex: 1, 2, 3"
              value={excludedIds?.join(', ') ?? ''}
              onChange={(excluded: string) =>
                setAttributes({ excludedIds: excluded.split(', ') })
              }
            />
          </PanelRow>
          {
            posts.map((post) => {
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
            })
          }
          <div></div>
          </>
          
        }
      </PanelBody>
    </>
  );
};

export default QueryRelatedQueryControls;

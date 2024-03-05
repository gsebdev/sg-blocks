import React from "react";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";

import {
  SelectControl,
  PanelBody,
  ToggleControl,
  Spinner,
} from "@wordpress/components";
import {
  // @ts-ignore
  __experimentalToggleGroupControl as ToggleGroupControl,
  // @ts-ignore
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import BreakpointTabs from "../block-components/BreakpointTabs";
import SpacingPanel from "../block-components/SpacingPanel";
import { getSpacingClassname } from "../block-utilities/sg-blocks-helpers";

const FONT_SIZES = ["xs", "s", "sm", "m", "l", "xl"];

const SPACING_OPTIONS = [
  {
    title: "Gap",
    attribute: "gap",
  },
];

const Edit = (props) => {
  const { attributes, setAttributes } = props;
  const {
    taxonomy,
    fontSize,
    horizontalLayout,
    separator,
    fontHeading,
    linked,
    centerItems
  } = attributes;

  let tax_name;

  switch (taxonomy) {
    case "category":
      tax_name = "categories";
      break;
    case "post_tag":
      tax_name = "tags";
      break;
    default:
      tax_name = taxonomy;
  }

  const { post, taxOptions } = useSelect(select => {
    const { getPostType } = select("core") as any;
    const { getCurrentPost } = select("core/editor") as any;
    const post = getCurrentPost();
    const taxOptions = getPostType(post?.type)?.taxonomies;
    return {
      post,
      taxOptions
    }
  }, []);

  const { terms, isLoading } = useSelect((select) => {
    const { getEditedPostAttribute } = select("core/editor") as any;
    const { getEntityRecords } = select("core") as any;
    const ids = getEditedPostAttribute(tax_name);
    const entities = getEntityRecords("taxonomy", taxonomy, {
      includes: ids,
    });

    if (entities && ids) {
      return {
        isLoading: false,
        terms: entities.filter((t) => ids.includes(t.id)),
      };
    } else {
      return { isLoading: true, terms: null };
    }
  }, [taxonomy]);

  const TermsTag = linked ? 'a' : 'span';

  const blockProps = useBlockProps();
  return (
    <>
      <InspectorControls>
        <PanelBody title="Paramètres" initialOpen={true}>
          <SelectControl
            label="Taxonomie"
            value={taxonomy}
            options={taxOptions?.map((tax) => ({
              label: tax,
              value: tax,
            }))}
            onChange={(value) => {
              setAttributes({ taxonomy: value });
            }}
          />
          <ToggleGroupControl
            label="Taille de police"
            onChange={(newFontSize) => {
              setAttributes({ fontSize: newFontSize });
            }}
            value={fontSize}
            isBlock
          >
            {FONT_SIZES.map((size) => (
              <ToggleGroupControlOption
                value={size}
                label={size.toUpperCase()}
              />
            ))}
          </ToggleGroupControl>
          <ToggleControl
            label="Alignement horizontal"
            checked={horizontalLayout}
            onChange={(newValue) => {
              setAttributes({ horizontalLayout: newValue });
            }}
          />
          <ToggleControl
            label="Texte centré"
            checked={centerItems}
            onChange={(newValue) => {
              setAttributes({ centerItems: newValue });
            }}
          />
          <ToggleControl
            label="Lien vers les catégories ?"
            checked={linked}
            onChange={(newValue) => {
              setAttributes({ linked: newValue });
            }}
          />

          <ToggleControl
            label="Police titre"
            checked={fontHeading}
            onChange={(newValue) => {
              setAttributes({ fontHeading: newValue });
            }}
          />

          {horizontalLayout && (
            <ToggleControl
              label="Ajouter un séparateur"
              checked={separator}
              onChange={(newValue) => {
                setAttributes({ separator: newValue });
              }}
            />
          )}
          <SpacingPanel
            attributes={attributes}
            setAttributes={setAttributes}
            spacingsOptions={SPACING_OPTIONS}
          />
        </PanelBody>
        <BreakpointTabs>
          {(tab) => {
            return (
              <div>
                <SpacingPanel
                  attributes={attributes}
                  setAttributes={setAttributes}
                  breakpoint={tab.name}
                  spacingsOptions={SPACING_OPTIONS}
                />
              </div>
            );
          }}
        </BreakpointTabs>
      </InspectorControls>
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}

      {!isLoading && terms.length === 0 && (
        <div {...blockProps}>
          <p>Ce block est vide car il n'y a aucun(e) {taxonomy}...</p>
        </div>
      )}

      {terms && !isLoading && (
        <ul
          {...blockProps}
          className={`${blockProps.className} sg-term-list f-${fontSize} ${horizontalLayout ? "flx flx-wrap" : ""
            } ${centerItems ? "flx-ctr txt-ctr" : ""} ${getSpacingClassname(attributes)}${fontHeading ? " f-heading" : ""
            }`}
        >
          {terms.map((term, index) => (
            <li
              key={term + index}
              className={`${separator && index > 0 ? "separator" : ""}`}
            >
              <TermsTag
                className={`sg-tags-${taxonomy}`}
                style={term.meta.color ? { color: term.meta.color } : undefined}
              >
                {term.name}
              </TermsTag>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Edit;

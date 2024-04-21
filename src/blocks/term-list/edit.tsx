import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";

import { SelectControl, PanelBody, ToggleControl } from "@wordpress/components";
import {
  // @ts-ignore
  __experimentalToggleGroupControl as ToggleGroupControl,
  // @ts-ignore
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  // @ts-ignore
  __experimentalDivider as Divider,
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
  const { attributes, setAttributes, context } = props;
  const {
    taxonomy,
    fontSize,
    horizontalLayout,
    separator,
    fontHeading,
    linked,
    centerItems,
    gap,
  } = attributes;

  const { postId, postType } = context;

  const [gapClassname, setGapClassname] = useState("");
  const [paddingClassname, setPaddingClassname] = useState("");

  const tax_name = useMemo(() => {
    return taxonomy === "category"
      ? "categories"
      : taxonomy === "post_tag"
      ? "tags"
      : taxonomy;
  }, [taxonomy]);

  const taxOptions = useSelect((select) => {
    const { getPostType } = select("core") as any;
    const taxOptions = getPostType(postType)?.taxonomies;
    return taxOptions;
  }, []);

  const terms = useSelect(
    (select) => {
      const { getEntityRecords, getEntityRecord } = select("core") as any;
      const ids = getEntityRecord("postType", postType, postId)?.[tax_name];

      const entities = getEntityRecords("taxonomy", taxonomy, {
        includes: ids,
      });
      return entities?.filter((t) => ids?.includes(t.id));
    },
    [taxonomy]
  );

  const TermsTag = linked ? "a" : "span";

  const blockProps = useBlockProps({
    className: `sg-term-list f-${fontSize}${
      horizontalLayout ? " flx flx-wrap" : ""
    }${centerItems ? " flx-ctr txt-ctr" : ""}${
      separator ? " has-separator" : ""
    }${gapClassname ? " " + gapClassname : ""}${
      fontHeading ? " f-heading" : ""
    }`,
  });

  useEffect(() => {
    if (separator) {
      setGapClassname(
        getSpacingClassname({
          gap: Object.fromEntries(
            Object.entries(gap).map(([key, val]) => {
              return [
                key,
                {
                  y: val?.["y"] ?? val,
                },
              ];
            })
          ),
        })
      );
      setPaddingClassname(
        getSpacingClassname({
          padding: Object.fromEntries(
            Object.entries(gap).map(([key, val]) => {
              return [
                key,
                {
                  x: val?.["x"] ?? val,
                },
              ];
            })
          ),
        })
      );
    } else {
      setGapClassname(getSpacingClassname(gap));
      setPaddingClassname("");
    }
  }, [gap, separator]);

  useEffect(() => {
    if (taxOptions && !taxonomy) {
      setAttributes({ taxonomy: taxOptions[0] });
    }
  }, [taxOptions]);
  
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
        <Divider />
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

      {!!terms ? (
        <ul {...blockProps}>
          {terms.map((term, index) => (
            <li key={term + index} className={`${paddingClassname}`}>
              <TermsTag
                className={`sg-tags-${taxonomy}`}
                style={term.meta.color ? { ['--color']: term.meta.color } as CSSProperties : undefined}
              >
                {term.name}
              </TermsTag>
            </li>
          ))}
        </ul>
      ) : (
        <div {...blockProps}>
          <p>Aucun tag disponible...</p>
        </div>
      )}
    </>
  );
};

export default Edit;

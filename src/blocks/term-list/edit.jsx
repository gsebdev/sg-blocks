import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

import {
  SelectControl,
  PanelBody,
  ToggleControl,
  Spinner,
} from "@wordpress/components";
import {
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import BreakpointTabs from "../block-components/BreakpointTabs";
import SpacingPanel from "../block-components/SpacingPanel";
import { getSpacingClassname } from "../block-utilities/sg-blocks-helpers";

const fontSizes = ["xs", "s", "sm", "m", "l", "xl"];

const Edit = (props) => {
  const { attributes, setAttributes } = props;
  const {
    taxonomy,
    fontSize,
    horizontalLayout,
    separator,
    fontHeading,
    linked,
  } = attributes;

  const [taxOptions, setTaxOptions] = useState([]);

  const spacingsOptions = [
    {
      title: "Gap",
      attribute: "gap",
    }
  ];

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
  const post = useSelect((select) => select("core/editor").getCurrentPost());

  const { terms, isLoading } = useSelect((select) => {
    const ids = select("core/editor").getEditedPostAttribute(tax_name);
    const entities = select("core").getEntityRecords("taxonomy", taxonomy, {
      includes: ids,
    });

    if (entities && ids) {
      try {
        return {
          isLoading: false,
          terms: entities.filter((t) => ids.includes(t.id)),
        };
      } catch (e) {
        console.error("Error in useSelect: " + e);
        return { isLoading: false, terms: [] };
      }
    } else {
      return { isLoading: true, terms: null };
    }
  });

  useEffect(() => {
    const fetchTax = async () => {
      try {
        const types = await apiFetch({ path: `/wp/v2/types/${post.type}` });
        setTaxOptions(types.taxonomies);
        if (!taxonomy) setAttributes({ taxonomy: types.taxonomies[0] });
      } catch (error) {
        console.error("Error fetching taxonomies: ", error);
      }
    };
    fetchTax();
  }, [post]);

  const blockProps = useBlockProps();
  return (
    <>
      <InspectorControls>
        <PanelBody title="Paramètres" initialOpen={true}>
          <SelectControl
            label="Taxonomie"
            value={taxonomy}
            options={taxOptions.map((tax) => ({
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
            {fontSizes.map((size) => (
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
            spacingsOptions={spacingsOptions}
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
                  spacingsOptions={spacingsOptions}
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
          className={`${blockProps.className} f-${fontSize} ${
            horizontalLayout ? "flx flx-wrap flx-ctr" : ""
          } ${getSpacingClassname(attributes)}${
            fontHeading ? " f-heading" : ""
          }`}
        >
          {terms.map((term, index) => (
            <li
              key={term + index}
              className={`${separator && index > 0 ? "separator" : ""}`}
            >
              <span
                className={`sg-tags-${taxonomy}`}
                style={term.meta.color ? { color: term.meta.color } : undefined}
              >
                {term.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Edit;

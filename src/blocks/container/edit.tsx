import React from "react";

/**
 * Wordpress dependencies
 */
import { useSelect } from "@wordpress/data";
import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps,
} from "@wordpress/block-editor";

import {
  RangeControl,
  PanelBody,
  SelectControl,
  PanelHeader,
  // @ts-ignore
  __experimentalAlignmentMatrixControl as AlignmentMatrixControl,
  Button,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import BreakpointTabs from "../block-components/BreakpointTabs";
import { getClassNames } from "../block-utilities/sg-blocks-helpers";
import SpacingPanel from "../block-components/SpacingPanel";

/**
 * types definitons
 */
interface BlockEditorStore {
  getBlockCount: (clientId: string) => number;
}

/**
 * Defining constants
 */
const TAGNAMES = [
  "div",
  "header",
  "section",
  "article",
  "footer",
  "aside",
  "nav",
  "main"
];

const SPACING_OPTIONS = [
  {
    title: "Marges internes",
    attribute: "padding",
  },
  {
    title: "Marges Externes",
    attribute: "margin",
  },
];

const LAYOUTS = ["grid", "flex", "none"];

const MAX_COLUMNS = 5;

const Edit = (props) => {
  const { attributes, setAttributes, isSelected, clientId } = props;
  const { columns, layout, Tag, className, contentAlignement } = attributes;
  
  const classNames = getClassNames(attributes);
  const blockProps = useBlockProps( {
    className: classNames
  });


  const { children, ...innerBlockProps } = useInnerBlocksProps({
    className: "sg-container__inner"
  }) as any;

  const blockCount = useSelect(
    (select) => {
      const { getBlockCount } = select("core/block-editor") as BlockEditorStore;
      return getBlockCount(clientId);
    },
    [clientId]
  );

  return (
    <>
      <InspectorControls>
        <PanelBody>
          <SelectControl
            label="Type de tag"
            value={Tag}
            options={TAGNAMES.map((tag) => ({ label: tag, value: tag }))}
            onChange={(value) => {
              setAttributes({ Tag: value });
            }}
          />
          <SelectControl
            label="Type disposition"
            value={layout}
            options={LAYOUTS.map((l) => ({ label: l, value: l }))}
            onChange={(value) => {
              setAttributes({ layout: value });
            }}
          />
          {layout === "flex" && (
            <>
              <AlignmentMatrixControl
                label="Alignement des éléments"
                value={contentAlignement}
                onChange={(newAlignment) => {
                  setAttributes({ contentAlignement: newAlignment });
                }}
              />
              <Button
                size={"small" as any}
                variant="secondary"
                onClick={() => {
                  setAttributes({ contentAlignement: "" });
                }}
              >
                Réinitialiser
              </Button>
            </>
          )}
          {layout === "grid" && (
            <RangeControl
              label="Colonnes"
              value={columns.default ?? 0}
              onChange={(value) => {
                setAttributes({
                  columns: { ...columns, default: value },
                });
              }}
              min={1}
              max={MAX_COLUMNS}
            />
          )}
        </PanelBody>

        <SpacingPanel
          attributes={attributes}
          setAttributes={setAttributes}
          spacingsOptions={
            layout === "grid" || layout === "flex"
              ? [
                  ...SPACING_OPTIONS,
                  {
                    title: "Espacement interne",
                    attribute: "gap",
                  },
                ]
              : SPACING_OPTIONS
          }
        />
        <PanelHeader label="Responsive Design" />
        <BreakpointTabs>
          {(tab) => {
            return (
              <div>
                {layout === "grid" && (
                  <PanelBody>
                    <RangeControl
                      label="Colonnes"
                      value={columns[tab.name] ?? 0}
                      onChange={(value) => {
                        setAttributes({
                          columns: { ...columns, [tab.name]: value },
                        });
                      }}
                      min={1}
                      max={MAX_COLUMNS}
                    />
                  </PanelBody>
                )}
                <SpacingPanel
                  breakpoint={tab.name}
                  attributes={attributes}
                  setAttributes={setAttributes}
                  spacingsOptions={
                    layout === "grid" || layout === "flex"
                      ? [
                          ...SPACING_OPTIONS,
                          {
                            title: "Espacement interne",
                            attribute: "gap",
                          },
                        ]
                      : SPACING_OPTIONS
                  }
                />
              </div>
            );
          }}
        </BreakpointTabs>
      </InspectorControls>
      <div
        {...blockProps}
        data-info={`${Tag}${
          classNames.length > 0 && isSelected ? " - " + classNames : ""
        } ${className ?? ""}`}
      >
        <Tag {...innerBlockProps}>
          {children}
          {(isSelected || blockCount === 0) && (
            <InnerBlocks.ButtonBlockAppender />
          )}
        </Tag>
      </div>
    </>
  );
};

export default Edit;

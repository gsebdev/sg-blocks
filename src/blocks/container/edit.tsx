import React, { useEffect } from "react";

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
  CheckboxControl,
  // @ts-ignore
  __experimentalDivider as Divider,
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

const MAX_COLUMNS = 6;

const Edit = (props) => {
  const { attributes, setAttributes, isSelected, clientId, context } = props;
  const { columns, layout, Tag, className, contentAlignement, transition, speed, isParallaxActive } = attributes;
  const { isParallaxActive: isParallaxActiveContext } = context

  const classNames = getClassNames(attributes);
  const blockProps = useBlockProps({
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

  useEffect(() => {
    if(!isParallaxActiveContext && speed !== undefined) setAttributes({ speed: undefined })
    if(isParallaxActiveContext && transition !== undefined) setAttributes({ transition: undefined });
  }, [isParallaxActiveContext, speed]);

  useEffect(() => {
    if(layout === "none") setAttributes({ columns: undefined })
  }, [layout]);

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

          {!isParallaxActiveContext && !isParallaxActive &&
            <CheckboxControl
              label="Transition d'apparition ?"
              checked={!!transition}
              onChange={(t) => setAttributes({ transition: t })}
            />
          }
          {
            !isParallaxActiveContext && 
            <CheckboxControl
                label="Conteneur d'effet parallax"
                checked={!!isParallaxActive}
                onChange={(t) => setAttributes({ isParallaxActive: t })}
              />
          }



          {!!isParallaxActiveContext &&
            <>
              <RangeControl
                label="Vitesse de defilement parallax"
                value={parseInt(speed) || speed || 0}
                onChange={(value) => {
                  setAttributes({ speed: value?.toString() });
                }}
                min={0}
                max={100}
              />
              <Button
                style={{ marginBottom: "15px" }}
                size={"small" as any}
                variant="secondary"
                onClick={() => {
                  setAttributes({ speed: undefined });
                }
                }
              >Réinitialiser la Vitesse
              </Button>
            </>
          }





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
              value={columns?.default || 0}
              onChange={(value) => {
                setAttributes({
                  columns: { ...columns, default: value },
                });
              }}
              min={0}
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
        <Divider />
        <PanelHeader label="Responsive Design" />
        <BreakpointTabs>
          {(tab) => {
            return (
              <div>
                {layout === "grid" && (
                  <PanelBody>
                    <RangeControl
                      label="Colonnes"
                      value={columns?.[tab.name] || 0}
                      onChange={(value) => {
                        setAttributes({
                          columns: { ...columns, [tab.name]: value },
                        });
                      }}
                      min={0}
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
        data-info={`${Tag}${classNames.length > 0 && isSelected ? " - " + classNames : ""
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

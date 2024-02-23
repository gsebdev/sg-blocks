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
} from "@wordpress/components";

import { getClassNames } from "../block-utilities/sg-blocks-helpers";
import SpacingPanel from "../block-components/SpacingPanel";
import { useSelect } from "@wordpress/data";
import { __experimentalAlignmentMatrixControl as AlignmentMatrixControl } from "@wordpress/components";
import { Button } from "@wordpress/components";
import BreakpointTabs from "../block-components/BreakpointTabs";

const Edit = (props) => {
  const { attributes, setAttributes, isSelected } = props;
  const { columns, layout, Tag, className, contentAlignement } = attributes;
  const blockProps = useBlockProps();
  blockProps.className = blockProps.className.replace(className, "");
  const classNames = getClassNames(attributes);
  const { children, ...innerBlockProps } = useInnerBlocksProps({
    className: classNames + " " + className,
  });
  const { blockCount } = useSelect((select) => ({
    blockCount: select("core/block-editor").getBlockCount(props.clientId),
  }));
  const maxColumns = 5;

  const spacingsOptions = [
    {
      title: "Marges internes",
      attribute: "padding",
    },
    {
      title: "Marges Externes",
      attribute: "margin",
    },
  ];
  if (layout === "grid" || layout === "flex")
    spacingsOptions.unshift({
      title: "Espacement interne",
      attribute: "gap",
    });

  const tagNames = [
    "div",
    "header",
    "section",
    "article",
    "footer",
    "aside",
    "nav",
  ];
  const layouts = ["grid", "flex", "none"];

  return (
    <>
      <InspectorControls>
        <PanelBody>
          <SelectControl
            label="Type de tag"
            value={Tag}
            options={tagNames.map((tag) => ({ label: tag, value: tag }))}
            onChange={(value) => {
              setAttributes({ Tag: value });
            }}
          />
          <SelectControl
            label="Type disposition"
            value={layout}
            options={layouts.map((l) => ({ label: l, value: l }))}
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
                size="small"
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
              max={maxColumns}
            />
          )}
        </PanelBody>

        <SpacingPanel
          attributes={attributes}
          setAttributes={setAttributes}
          spacingsOptions={spacingsOptions}
        />
        <PanelHeader>Responsive Design</PanelHeader>
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
                      max={maxColumns}
                    />
                  </PanelBody>
                )}
                <SpacingPanel
                  breakpoint={tab.name}
                  attributes={attributes}
                  setAttributes={setAttributes}
                  spacingsOptions={spacingsOptions}
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

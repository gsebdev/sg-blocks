import React from "react";
import {
  // @ts-ignore
  __experimentalAlignmentMatrixControl as AlignmentMatrixControl,
  SelectControl,
  RangeControl,
  Button,
  PanelHeader,
  PanelBody,
  ToggleControl,
  // @ts-ignore
  __experimentalDivider as Divider,
} from "@wordpress/components";
import SpacingPanel from "../../block-components/SpacingPanel";
import BreakpointTabs from "../../block-components/BreakpointTabs";

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

const QueryRelatedLayoutControls = ({ attributes, setAttributes }) => {
  const { layout, contentAlignement, columns, slider, sliderBreakpoint } =
    attributes;
  return (
    <>
      <PanelBody>
        <ToggleControl
          label="Slider"
          checked={slider}
          onChange={(value: boolean) => {
            setAttributes({ slider: value });
          }}
        />
        <RangeControl
          label="Largeur d'écran en px pour le slider"
          help="Largeur d'écran en dessous de laquelle le slider s'active, laissez 0 pour l'activer tout le temps"
          value={sliderBreakpoint}
          min={0}
          max={2048}
          onChange={(value) => {
            setAttributes({ sliderBreakpoint: value });
          }}
        />
        <Divider />
        {!slider || (slider && sliderBreakpoint && sliderBreakpoint > 0) ? (
          <>
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
          </>
        ) : (
          <></>
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
              {layout === "grid" && (!slider || (slider && sliderBreakpoint && sliderBreakpoint > 0)) ? (
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
              ) : (
                <></>
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
    </>
  );
};

export default QueryRelatedLayoutControls;

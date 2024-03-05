import React from "react";
import {
  RangeControl,
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

const MAX_COLUMNS = 5;

const QueryRelatedLayoutControls = ({ attributes, setAttributes }) => {
  const { columns, slider, sliderBreakpoint } =
    attributes;
  return (
    <>
      <PanelBody>
        <Divider />
        {
          /**
           * 
           * If the block is not a slider be able to set number of columns
           * 
           */
          !slider || (!!slider && !!sliderBreakpoint && sliderBreakpoint > 0) &&
          <>
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
          </>
        }
      </PanelBody>

      <SpacingPanel
        attributes={attributes}
        setAttributes={setAttributes}
        spacingsOptions={
          !slider || (!!slider && !!sliderBreakpoint && sliderBreakpoint > 0)
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
        {

          (tab) => {
            return (
              <div>
                {
                  !slider || (slider && sliderBreakpoint && sliderBreakpoint > 0) &&
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
                }
                <SpacingPanel
                  breakpoint={tab.name}
                  attributes={attributes}
                  setAttributes={setAttributes}
                  spacingsOptions={
                    !slider || (slider && sliderBreakpoint && sliderBreakpoint > 0)
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
          }
        }
      </BreakpointTabs>
    </>
  );
};

export default QueryRelatedLayoutControls;

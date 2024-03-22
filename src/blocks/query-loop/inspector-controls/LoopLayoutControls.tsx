import React from "react";
import {
  RangeControl,
  PanelHeader,
  PanelBody,
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

const LoopLayoutControls = ({ attributes, setAttributes }) => {
  const { columns, slider, sliderBreakpoint } =
    attributes;
  return (
    <>

      {
        /**
        *
        * If the block is not a slider be able to set number of columns
        *
        */
        (!slider || (!!slider && !!sliderBreakpoint && sliderBreakpoint > 0)) &&
        <PanelBody>
          <RangeControl
            label="Colonnes"
            value={columns?.default}
            onChange={(value) => {
              setAttributes({
                columns: { ...columns, default: value === 0 ? undefined : value },
              });
            }}
            min={0}
            max={MAX_COLUMNS}
          />
        </PanelBody>
      }


      <SpacingPanel
        attributes={attributes}
        setAttributes={setAttributes}
        spacingsOptions={[
          ...SPACING_OPTIONS,
          {
            title: "Espacement interne",
            attribute: "gap",
          },
        ]
        }
      />
      <Divider />
      <PanelHeader label="Responsive Design" />
      <BreakpointTabs>
        {

          (tab) => {
            return (
              <div>
                {
                  !!(!slider || (slider && sliderBreakpoint && sliderBreakpoint > 0)) &&
                  <PanelBody>
                    <RangeControl
                      label="Colonnes"
                      value={columns?.[tab.name]}
                      onChange={(value) => {
                        setAttributes({
                          columns: { ...columns, [tab.name]: value === 0 ? undefined : value },
                        });
                      }}
                      min={0}
                      max={MAX_COLUMNS}
                    />
                  </PanelBody>
                }
                <SpacingPanel
                  breakpoint={tab.name}
                  attributes={attributes}
                  setAttributes={setAttributes}
                  spacingsOptions={[
                    ...SPACING_OPTIONS,
                    {
                      title: "Espacement interne",
                      attribute: "gap",
                    },
                  ]
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

export default LoopLayoutControls;

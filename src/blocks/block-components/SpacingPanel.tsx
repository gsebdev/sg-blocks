import React from "react";
import { Button } from "@wordpress/components";
import { RangeControl } from "@wordpress/components";
import { ToggleControl } from "@wordpress/components";
import { PanelRow } from "@wordpress/components";
import { PanelBody } from "@wordpress/components";

interface SpacingPanelProps {
  breakpoint?: string;
  attributes: any;
  setAttributes: (attributes: any) => void;
  spacingsOptions?: {
    title: string;
    attribute: string;
  }[];
}
const SpacingPanel: React.FC<SpacingPanelProps> = ({
  breakpoint = "default",
  attributes,
  setAttributes,
  spacingsOptions = [],
}) => {
  const maxSpacings = 4;

  const onSpacingChange = (
    attributeOpt,
    value,
    breakpoint,
    orientation: "x" | "y" | null = null
  ) => {
    if (value === null || value === undefined) {
      const newVal = { ...attributes[attributeOpt] };
      delete newVal[breakpoint];
      setAttributes({ [attributeOpt]: newVal });
    } else {
      const newVal = orientation
        ? {
            ...attributes[attributeOpt][breakpoint],
            [orientation]: value,
          }
        : value;
      setAttributes({
        [attributeOpt]: {
          ...attributes[attributeOpt],
          [breakpoint]: newVal,
        },
      });
    }
  };

  return (
    <>
      {spacingsOptions?.map((option, id) => {
        const orientationXY =
          attributes[option?.attribute] &&
          typeof attributes[option?.attribute][breakpoint] === "object";

        return (
          <PanelBody
            key={id}
            title={`${option.title}${
              breakpoint === "default"
                ? ""
                : " - écran " + breakpoint.toUpperCase()
            }`}
            initialOpen={false}
          >
            <PanelRow>
              <Button
                size={"small" as any}
                variant="secondary"
                onClick={() => {
                  onSpacingChange(option.attribute, null, breakpoint);
                }}
              >
                Réinitialiser
              </Button>
            </PanelRow>

            <PanelRow>
              <ToggleControl
                label="Valeurs X et Y différentes ?"
                checked={orientationXY}
                onChange={(checked) => {
                  if (checked) {
                    onSpacingChange(option.attribute, 0, breakpoint, "x");
                    onSpacingChange(option.attribute, 0, breakpoint, "y");
                  } else {
                    onSpacingChange(option.attribute, 0, breakpoint);
                  }
                }}
              />
            </PanelRow>
            {!orientationXY ? (
              <RangeControl
                label={option.title}
                value={
                  attributes[option?.attribute] && typeof attributes[option?.attribute][breakpoint] === "number"
                    ? attributes[option.attribute][breakpoint]
                    : 0
                }
                onChange={(value) => {
                  onSpacingChange(option.attribute, value, breakpoint);
                }}
                min={0}
                max={maxSpacings}
              />
            ) : (
              <>
                <RangeControl
                  label={option.title + " X"}
                  value={attributes[option.attribute][breakpoint]?.["x"] ?? 0}
                  onChange={(value) => {
                    onSpacingChange(option.attribute, value, breakpoint, "x");
                  }}
                  min={0}
                  max={maxSpacings}
                />
                <RangeControl
                  label={option.title + " Y"}
                  value={attributes[option.attribute][breakpoint]?.["y"] ?? 0}
                  onChange={(value) => {
                    onSpacingChange(option.attribute, value, breakpoint, "y");
                  }}
                  min={0}
                  max={maxSpacings}
                />
              </>
            )}
          </PanelBody>
        );
      })}
    </>
  );
};

export default SpacingPanel;

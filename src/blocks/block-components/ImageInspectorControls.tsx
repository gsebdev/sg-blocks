import React, { useEffect } from "react";
import {
  FocalPointPicker,
  PanelBody,
  PanelHeader,
  PanelRow,
  RangeControl,
  SelectControl,
  ToggleControl,
  // @ts-ignore
  __experimentalUnitControl as UnitControl,
  // @ts-ignore
  __experimentalDivider as Divider,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import SpacingPanel from "./SpacingPanel";
import BreakpointTabs from "./BreakpointTabs";
import breakpoints from "../breakpoints";
import { generateSrcset } from "../block-utilities/sg-blocks-helpers";

interface Props {
  attributes: any;
  setAttributes: (attributes: any) => void;
  setFocalPoint?: (value: any) => void;
  currentImage: any;
  lightboxOptionsActive?: boolean;
}
/**
 *
 * Constants
 *
 *
 */

const ASPECT_RATIO_CHOICES = [
  "16 / 9",
  "4 / 3",
  "3 / 2",
  "1 / 1",
  "2 / 3",
  "3 / 4",
  "9 / 16",
  "1 / 2",
  "2 / 1",
];

const LIGHTBOX_TRANSITIONS = ["none", "fade", "zoom"];

const SPACING_OPTIONS = [
  {
    title: "Marges externes",
    attribute: "margin",
  },
  {
    title: "Marges internes",
    attribute: "padding",
  },
];


const UNITS = [
  { value: "px", label: "px", default: 0 },
  { value: "%", label: "%", default: 0 },
  { value: "rem", label: "rem", default: 0 },
  { value: "vh", label: "vh", default: 0 },
];


/***
 *
 * The component
 *
 *
 */

const ImageInspectorControls: React.FC<Props> = ({
  attributes,
  setAttributes,
  setFocalPoint,
  currentImage,
  lightboxOptionsActive = true,
}) => {
  const {
    aspectRatio,
    sizes,
    imageSource,
    lightbox,
    lightboxTransition,
    imagePosition,
    fixedHeight,
    fixedWidth,
  } = attributes;

  const { imageSizes } = useSelect(
    (select) => (select("core/block-editor") as any).getSettings(),
    []
  );

  useEffect(() => {
    if (!currentImage) return;
    const source = imageSource ?? "full";
    setAttributes({
      src: currentImage.media_details.sizes[source]?.source_url,
      srcSet: generateSrcset(
        currentImage.media_details.sizes,
        [],
        currentImage.media_details.sizes[source]?.width
      ),
      width: currentImage.media_details.sizes[source]?.width,
      height: currentImage.media_details.sizes[source]?.height,
      sizes: {
        ...sizes,
        default: currentImage.media_details.sizes[source]?.width,
      },
    });
  }, [currentImage, imageSource]);

  const defaultSetFocalPoint = (value) => {
    setAttributes({ imagePosition: value });
  };

  useEffect(() => {
    if (imageSource && !sizes["default"] && currentImage) {
      setAttributes({
        sizes: {
          ...sizes,
          default: currentImage.media_details.sizes[imageSource]?.width,
        },
      });
    }
  }, [imageSource, currentImage]);

  useEffect(() => {
    if (aspectRatio && fixedHeight) {
      setAttributes({
        fixedHeight: undefined,
      });
    }
  }, [aspectRatio]);

  return (
    <PanelBody title="Image">
      <SelectControl
        label="Ratio de l'image"
        placeholder="Choisir un ratio"
        value={aspectRatio ?? undefined}
        options={[
          { label: "aucun", value: "" },
          { label: "original", value: "original" },
          ...ASPECT_RATIO_CHOICES.map((ratio) => ({
            label: ratio,
            value: ratio,
          })),
        ]}
        onChange={(value) => setAttributes({ aspectRatio: value })}
      />
      {(!aspectRatio || aspectRatio === "") && (
        <UnitControl
          label="Hauteur de l'image"
          onChange={(value) => {
            setAttributes({
              fixedHeight: value,
            });
          }}
          value={fixedHeight}
          units={UNITS}
        />
      )}

      <UnitControl
        label="Largeur de l'image"
        onChange={(value) => {
          setAttributes({
            fixedWidth: value,
          });
        }}
        value={fixedWidth}
        units={UNITS}
      />

      <SelectControl
        label="Source de l'image"
        placeholder="Choisir une résolution"
        value={imageSource}
        options={imageSizes.map((size) => ({
          label: size.name,
          value: size.slug,
        }))}
        onChange={(value) => {
          setAttributes({ imageSource: value });
        }}
      />

      {!!lightboxOptionsActive && (
        <>
          <ToggleControl
            label="Agrandir au clic"
            help="Agrandissez l'image dans une lightbox au clic"
            checked={!!lightbox}
            onChange={(value) => setAttributes({ lightbox: value })}
          />
          {lightbox && (
            <SelectControl
              label="Transition ouverture lightbox"
              help="Choisir une transition"
              value={lightboxTransition}
              options={LIGHTBOX_TRANSITIONS.map((transition) => ({
                label: transition,
                value: transition,
              }))}
              onChange={(value) => setAttributes({ lightboxTransition: value })}
            />
          )}
        </>
      )}

      {!!currentImage && (
        <PanelRow>
          <h3>Modifier le point de focus :</h3>
          <FocalPointPicker
            url={currentImage.media_details.sizes["medium"]?.source_url ?? currentImage.media_details.sizes["full"]?.source_url}
            onChange={setFocalPoint ?? defaultSetFocalPoint}
            value={imagePosition}
            // @ts-ignore
            onDrag={setFocalPoint ?? defaultSetFocalPoint}
          />
        </PanelRow>
      )}
      <SpacingPanel
        attributes={attributes}
        setAttributes={setAttributes}
        spacingsOptions={SPACING_OPTIONS}
      />
      <Divider />
      <PanelHeader label="Responsive Design" />
      <BreakpointTabs>
        {(tab) => {
          return (
            <>
              <PanelRow>
                <RangeControl
                  label={
                    "espace occupé (%) par l'image sur écran : " + tab.title
                  }
                  value={sizes[breakpoints[tab.name].toString()]}
                  allowReset
                  min={10}
                  max={100}
                  step={5}
                  onChange={(value) =>
                    setAttributes({
                      sizes: {
                        ...sizes,
                        [breakpoints[tab.name].toString()]: value,
                      },
                    })
                  }
                />
              </PanelRow>
              <SpacingPanel
                breakpoint={tab.name}
                attributes={attributes}
                setAttributes={setAttributes}
                spacingsOptions={SPACING_OPTIONS}
              />
            </>
          );
        }}
      </BreakpointTabs>
    </PanelBody>
  );
};

export default ImageInspectorControls;

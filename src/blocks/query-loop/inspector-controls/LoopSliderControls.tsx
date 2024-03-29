import React, { useState } from "react";
import {
  RangeControl,
  PanelBody,
  ToggleControl,
  CheckboxControl
} from "@wordpress/components";


const LoopSliderControls = ({ attributes, setAttributes }) => {
  const { sliderAutoplay, sliderDisplayNavElements, slider, sliderBreakpoint, sliderNoLimitEdges } =
    attributes;
    
  const [ autoplay, setAutoplay ] = useState<boolean>(!!sliderAutoplay);

  return (
      <PanelBody>
        <ToggleControl
          label="Slider"
          checked={!!slider}
          onChange={(value: boolean) => {
            setAttributes({ slider: value });
          }}
        />
        <RangeControl
          label="Largeur d'écran en px pour pour l'activation du slider"
          help="Largeur d'écran en dessous de laquelle le slider s'active, laissez 0 pour l'activer tout le temps"
          value={sliderBreakpoint}
          min={0}
          max={2048}
          onChange={(value) => {
            setAttributes({ sliderBreakpoint: value });
          }}
        />
        <CheckboxControl 
          label="Afficher les boutons de navigation"
          checked={!!sliderDisplayNavElements}
          onChange={(value: boolean) => {
            setAttributes({ sliderDisplayNavElements: value });
          }}
        />
        <CheckboxControl
        label="Ne pas limiter aux bords"
        help="Autoriser le déplacement de la première et dernière slide jusqu'au milieu du conteneur ?"
        checked={!!sliderNoLimitEdges}
        onChange={(value) => setAttributes({sliderNoLimitEdges: value})}
        />
        <CheckboxControl
          label="Autoplay"
          checked={!!sliderAutoplay}
          onChange={value => setAutoplay(value)}
        />
        <RangeControl 
          label="Duree de l'animation en ms"
          disabled={!autoplay}
          value={sliderAutoplay}
          min={500}
          max={10000}
          onChange={(value) => {
            setAttributes({ sliderAutoplay: value });
          }}
        />
      </PanelBody>
  );
};

export default LoopSliderControls;

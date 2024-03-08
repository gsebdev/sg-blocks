import SgSaveInlineTerms from "./modules/save-inline-terms";
import ImageSelectorBox from "./modules/image-selector-box";
import sgColorPickerInit from "./modules/sg-color-picker";


window.sg = { 
    ...window.sg, 
    SgSaveInlineTerms, 
    ImageSelectorBox,
    sgColorPickerInit
};


import SgSaveInlineTerms from "./modules/save-inline-terms";
import imageField from "./modules/sg-image-field";
import sgColorPickerInit from "./modules/sg-color-picker";


window.sg = { 
    ...window.sg, 
    SgSaveInlineTerms, 
    customFields: {
        ...window.sg?.customFields,
        imageField: window.sg?.customFields?.imageField || imageField
    },
    sgColorPickerInit
};


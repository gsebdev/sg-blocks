import React from "react";
import { createRoot } from "@wordpress/element";
import ImageControl from "../components/ImageControl";
import CustomMediaUploader from "../components/CustomMediaUploader";

const ImageField = (fieldId: string) => {
  window.addEventListener('load', () => {
    const field = document.getElementById(fieldId);
    if (!field) {
      console.error("Field not found");
      return;
    }
    const input: HTMLInputElement | null = field.querySelector('input[hidden]');

    if (!input) {
      console.error("Input not found");
      return;
    }

    const initialValue = input.value;

    const root = field.querySelector(".sg-image-field__handle");
    if (!root) {
      return;
    }

    createRoot(root).render(
      <ImageControl
        id={fieldId}
        value={parseInt(initialValue) || undefined}
        onChange={(value) => {
          input.value = value;
          input.dispatchEvent(new Event("change"));
        }}
        isRoot={true}
        customImageUploader={CustomMediaUploader}
      />
    )
  })
}
export default ImageField;

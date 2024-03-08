import ColorPicker from "simple-color-picker";

const sgColorPickerInit = (selector) => {
  document.addEventListener("DOMContentLoaded", () => {
    const el = document.querySelector(selector);

    if (!el) return;

    const input = el.querySelector("input");

    if (!input) return;

    if (!input.value) {
      input.value = "#FFFFFF";
    }
    input.style.backgroundColor = input.value;
    input.addEventListener('focus', () => {
      el.classList.remove('closed');
    });
    input.addEventListener('blur', () => {
      el.classList.add('closed');
    });

    const colorPicker = new ColorPicker({
      el: el,
      color: input.value,
    });

    colorPicker.onChange((color) => {
      const lastColor = input.value;
      input.value = color;
      if(lastColor !== color) input.dispatchEvent(new Event("change"));
      if (colorPicker.isDark()) {
        input.style.color = "white";
      } else {
        input.style.color = "black";
      }
    });

    input.addEventListener("change", () => {
      input.style.backgroundColor = input.value;
    });
  });
};

export default sgColorPickerInit;

/**
 * Save inline terms when the value of the input fields change.
 *
 * This is a singleton pattern
 *
 * @name saveInlineTerms
 *
 * @return {void}
 */

export default class SgSaveInlineTerms {
  _instance;
  _timeoutId;

  constructor() {
    if (!this._instance) {
      this._instance = this;
      this.init();
    }
    return this._instance;
  }

  init = () => {
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll(".sg_inline_auto_save").forEach((el) => {
        el.querySelector("input")?.addEventListener("change", (e) => {
          if (this._timeoutId) {
            clearTimeout(this._timeoutId);
          }
          this._timeoutId = setTimeout(this.save_term.bind(this, e, el.dataset), 1000);
        });
      });
    });
  };

  save_term = ({target}, {field, tax, term: termId}) => {
    // get nonce for security
    const nonce = document.getElementById("_inline_edit").value;
    
    // get the input value
    let val = "";
    if (target.type === "checkbox" || target.type === "radio") {
      val = target.checked ? "on" : "";
    } else {
      val = target.value;
    }
    termId = typeof termId === "string" ? parseInt(termId) : termId;
    const data = {
      action: "sg-save-inline-" + tax,
      tax_type: "tag",
      tax_ID: termId,
      taxonomy: tax,
      _inline_edit: nonce,
    };

    const formData = new FormData();

    for (const line in data) {
      formData.append(line, data[line]);
    }
    formData.append("meta", field);
    formData.append(field, val);

    fetch(ajaxurl, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        response.json().then((data) => {
          if (data.meta === field && data.term_id === termId) {
            if (target.type === "checkbox" || target.type === "radio") {
              target.checked = data.value === "on";
            } else {
              target.value = data.value;
            }
          } else {
            throw new Error("Server response error");
          }
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
}

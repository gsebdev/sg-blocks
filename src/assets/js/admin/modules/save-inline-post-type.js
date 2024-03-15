/**
 * Save inline terms when the value of the input fields change.
 *
 * This is a singleton pattern
 *
 * @name SgSaveInlinePostType
 *
 * @return {void}
 */

export default class SgSaveInlinePostType {
  _instance;
  _timeoutId;
  _postType;
  _nonce;

  constructor(postType, nonce) {
    if (!this._instance) {
      this._instance = this;
      this._postType = postType;
      this._nonce = nonce;
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
          this._timeoutId = setTimeout(
            this.save.bind(this, e, el.dataset),
            500
          );
        });
      });
    });
  };

  save = ({ target }, { field, postid }) => {
    // get the input value
    let val = "";
    if (target.type === "checkbox" || target.type === "radio") {
      val = target.checked ? "on" : "";
    } else {
      val = target.value;
    }
    postid = typeof postid === "string" ? parseInt(postid) : postid;
    const data = {
      action: "sg-save-inline-" + this._postType,
      post_id: postid,
      field: field,
      value: val,
      nonce: this._nonce,
    };

    const formData = new FormData();

    for (const line in data) {
      formData.append(line, data[line]);
    }
    console.log("save", ajaxurl);
    fetch(ajaxurl, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        response.json();
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
}

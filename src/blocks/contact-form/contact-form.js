/**
 * Initializes the handling of contact forms, including validation and form submission via AJAX.
 *
 * @function
 * @name handleContactForm
 * @memberof module:ContactForm
 * @example
 *   import { handleContactForm } from './your-module-path';
 *   handleContactForm();
 */
export const sgContactFormHandle = () => {
  const { sgContactForms } = window;
  if (!sgContactForms) return;

  /**
   * Sets the error state for a form input.
   *
   * @function
   * @name setError
   * @param {HTMLInputElement} input - The form input element.
   * @param {boolean} [isError=true] - Indicates whether an error occurred.
   * @param {string} [errorMessage=''] - The error message to display.
   * @memberof module:ContactForm~handleContactForm
   * @inner
   */
  const setError = (input, isError = true, errorMessage = "") => {
    const container = input.parentNode;
    if (isError) {
      container.setAttribute("data-error", errorMessage);
    } else {
      container.removeAttribute("data-error");
    }
  };
  /**
   * Resets the values of all inputs in a form.
   *
   * @function
   * @name resetForm
   * @param {HTMLFormElement} form - The form element.
   * @memberof module:ContactForm~handleContactForm
   * @inner
   */
  const resetForm = (form) => {
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.value = "";
      input.textContent = "";
    });
  };
  /**
   * Validates the input values in a form.
   *
   * @function
   * @name validateForm
   * @param {HTMLFormElement} form - The form element.
   * @returns {boolean} - True if the form is valid, false otherwise.
   * @memberof module:ContactForm~handleContactForm
   * @inner
   */
  const validateForm = (form) => {
    const nameInput = form.querySelector('[name="lastname"]');
    const subjectInput = form.querySelector('[name="subject"]');
    const messageInput = form.querySelector('[name="message"]');
    const emailInput = form.querySelector('[name="email"]');
    let valid = true;
    // validation for name (only letters and not empty)
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž\s]+$/.test(nameInput.value)) {
      setError(
        nameInput,
        true,
        "Le nom ne peut contenir que des lettres et ne doit pas être vide"
      );
      valid = false;
    } else {
      setError(nameInput, false);
    }
    // Check if subject and message are not empty
    if (subjectInput.value.length === 0) {
      setError(subjectInput, true, "Le champ est requis");
      valid = false;
    } else {
      setError(subjectInput, false);
    }

    if (messageInput.value.length === 0) {
      setError(messageInput, true, "Le champ est requis");
      valid = false;
    } else {
      setError(messageInput, false);
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      setError(
        emailInput,
        true,
        "Le champ est requis et doit être au format email"
      );
      valid = false;
    } else {
      setError(emailInput, false);
    }
    form.setAttribute("data-valid", valid);
    return valid;
  };
  sgContactForms.forEach((form) => {
    form = document.getElementById(form);
    
    if (!form) return;

    /**
     * Add listener to close the form
     */
    const formContainer = form.closest(".sg-contact-form");
    if (formContainer) {
      formContainer
        .querySelector(".sg-icon-cancel")
        ?.addEventListener("click", () => {
            formContainer.classList.add("closing");
          setTimeout(() => formContainer.remove(), 300);
        });
    }

    form.querySelector("textarea").addEventListener("input", (e) => {
      const textarea = e.target;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (validateForm(form)) {
        const formData = new FormData(form);
        formData.append("action", "sg_contact_form");
        formData.append("nonce", ajax_object.nonce);

        form.setAttribute("data-submit", "loading");

        fetch(ajax_object.ajax_url, {
          method: "POST",
          body: new URLSearchParams(formData),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((response) => {
            if (response.ok) {
              response.json().then(() => {
                form.setAttribute("data-submit", "success");
              });
            } else {
              throw new Error();
            }
          })
          .catch(() => {
            form.setAttribute("data-submit", "error");
          });
      } else {
        if (!form.hasAttribute("data-validated")) {
          form.setAttribute("data-validated", true);
          form.querySelectorAll("input, textarea").forEach((input) => {
            input.addEventListener("input", () => {
              validateForm(form);
            });
          });
        }
      }
    });
  });
};

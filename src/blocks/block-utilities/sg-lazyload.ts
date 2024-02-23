/**
 * Function to load an image and handle its status.
 *
 * @param {HTMLImageElement} image - the image element to be loaded
 * @param {boolean} [placeholder=false] - a boolean or an HTMLImageElement to be used as a placeholder
 * @param {HTMLElement} [container] - the container element for the image
 * @return {Promise<void>} a promise that resolves when the image is loaded successfully, and rejects if there is an error
 */
export const loadImage = (
  image: HTMLImageElement,
  placeholder: boolean = false,
  container?: HTMLElement
) => {
  // if image is already loading
  if (image.classList.contains('loading')) {
    return Promise.resolve();
  }
  else {
    return new Promise<void>((resolve, reject) => {
      const imgParent = container ? container : image.parentElement;
      let _placeholderElement: HTMLImageElement | null = null;
      /**
       * Finish function for handling status and removing loading class from image element.
       *
       * @param {string} status - the status of the function
       * @return {void} 
       */
      const finish = (status: string): void => {
        image.classList.remove("loading");
        if ("success" === status) {
          imgParent?.removeAttribute("data-loaded");
          if (_placeholderElement && _placeholderElement instanceof HTMLImageElement) {
            setTimeout(() => {
              (_placeholderElement as HTMLImageElement).remove();
            }, 1000);
          }
          resolve();
        }
        else {
          reject("error loading image");
        }
      };


      // if image is already loaded
      if ((!image.dataset.src && !image.dataset.srcset)) {
        finish("success");
        return;
      }
      const { src, srcset } = image.dataset;
      image.removeAttribute("data-src");
      image.removeAttribute("data-srcset");
      image.classList.add('loading');

      // if placeholder is true
      if (placeholder === true) {
        _placeholderElement = document.createElement("img");

        if (srcset) {
          _placeholderElement.sizes = "30px";
          _placeholderElement.srcset = srcset;
          _placeholderElement.style.objectPosition = image.style.objectPosition;
          _placeholderElement.addEventListener("load", () => {
            (_placeholderElement as HTMLImageElement).className = "sg-lazyload-placeholder";
            // load real image when placeholder has loaded
            if (src) {
              image.src = src;
            }
            if (srcset) {
              image.srcset = srcset;
            }
          });
          imgParent?.appendChild(_placeholderElement);
        }
      }
      // if no need of a placeholder
      else {
        if (src) {
          image.src = src;
        }
        if (srcset) {
          image.srcset = srcset;
        }
      }
      image.addEventListener("load", () => finish("success"));
      image.addEventListener("error", () => finish("error"));
    });
  }
};
export interface SgLazyLoadElement extends HTMLElement {
  sgLoadCallback?: (el?: SgLazyLoadElement | HTMLElement) => void;
}

const lazyObserver = new IntersectionObserver(
  function (elements, observer) {
    elements.forEach((el) => {
      if (el.isIntersecting) {
        const element = el.target as SgLazyLoadElement;

        // Check if the element has a callback
        if (element.sgLoadCallback) {
          element.sgLoadCallback(element);
        } else {
          // Otherwise try to Load the image when it enters the viewport
          const img: HTMLImageElement | null = element.tagName === "IMG"
            ? (element as HTMLImageElement)
            : element.querySelector("img");
          if (img) loadImage(img, true, element);
        }
        observer.unobserve(element);
      }
    });
  },
  { threshold: 0, rootMargin: "0px 0px 33% 0px" }
);


export const lazyLoad = (element: HTMLElement | null, loadCallback?: (el?: SgLazyLoadElement | HTMLElement) => void) => {
  if (element instanceof HTMLElement) {
    if (loadCallback && typeof loadCallback === 'function') {
      element['sgLoadCallback'] = loadCallback;
    }
    lazyObserver.observe(element);
  }
};

//import Swiper from "sg-swiper";
import Swiper from "sg-swiper";
import { loadImage } from "../block-utilities/sg-lazyload";

export class sgGallery {
  private _gallery: HTMLElement;
  private _imagesContainer: HTMLElement | null;
  private _thumbsContainer: HTMLElement | null;
  private _images: HTMLImageElement[];
  private _auto: number | undefined;
  private _draggable: boolean = false;
  private _galleryObject: Swiper | null = null;
  private _thumbsObject: Swiper | null = null;
  private _slideshow: boolean = false;
  private _lightbox: boolean = false;
  private _legends: boolean = false;

  /**
   * Constructor for the sgGallery class.
   *
   * @param {HTMLElement} element - the HTML element to initialize the gallery
   * @param {sgGalleryProps} props - the properties for the gallery
   */
  constructor(element: HTMLElement, startIndex: number = 0) {
    if (!element) {
      console.error("Cannot initialize gallery: no element provided.");
      return;
    }
    const { lightbox, draggable, legends, slideshowDelay } = element.dataset;
    this._gallery = element;

    this._imagesContainer = element.querySelector(".sg-gallery__images");
    this._thumbsContainer = element.querySelector(".sg-gallery__thumbs");
    this._images = this._imagesContainer
      ? Array.from(
          this._imagesContainer.querySelectorAll(".sg-gallery__img img")
        )
      : [];
    if (this._images.length === 0 || !this._imagesContainer) {
      console.error("Cannot initialize gallery: no images found.");
      return;
    }
    this._slideshow = element.classList.contains("sg-gallery--slideshow");
    this._lightbox = lightbox && lightbox !== "false" ? true : false;
    this._legends = legends === "true" ? true : false;
    if (!this._slideshow) {
      import(
        /* webpackChunkName: "sg-lazyload" */ "../block-utilities/sg-lazyload"
      ).then((module) => {
        this._images.forEach((element) => {
          module.lazyLoad(element.closest("figure"));
        });
      });
    } else {
      this._auto =
        !slideshowDelay || Number.isNaN(parseInt(slideshowDelay))
          ? undefined
          : parseInt(slideshowDelay);
      this._draggable = draggable === "true" ? true : false;
    }
    this._init(startIndex);
  }
  private async _init(startIndex?: number) {
    if (this._slideshow) {
      const { default: Swiper } = await import(
        /* webpackChunkName: "sg-swiper" */ "sg-swiper"
      );
      if (this._thumbsContainer) {
        // create the thumbs slide object
        this._thumbsObject = new Swiper(this._thumbsContainer, {
          //@ts-ignore
          slideLoad: this._loadAllThumbs.bind(this),
          onSlideClick: (index) => {
            if (this._galleryObject) this._galleryObject.index = index;
            if (this._thumbsObject) this._thumbsObject.index = index;
          },
          slideClassName: "sg-gallery__thumb",
          slideStart: startIndex,
          draggable: this._images.length > 1 ? true : false,
          limitToEdges: true
        });
      }
      const navPrev = this._gallery.querySelectorAll(
        '.sg-gallery__nav[data-direction="prev"]'
      );
      const navNext = this._gallery.querySelectorAll(
        '.sg-gallery__nav[data-direction="next"]'
      );
      // create the gallery slider object
      this._galleryObject = new Swiper(this._imagesContainer as HTMLElement, {
        slideLoad: this._load.bind(this),
        navigation:
          this._images.length > 1
            ? {
                prev: [...(navPrev as NodeListOf<HTMLElement>)],
                next: [...(navNext as NodeListOf<HTMLElement>)],
              }
            : undefined,
        auto: this._auto,
        slideClassName: "sg-gallery__img",
        linkedSwipers:
          this._thumbsObject && this._images.length > 1
            ? [this._thumbsObject]
            : undefined,
        slideStart: startIndex,
        draggable: this._images.length > 1 ? this._draggable : false,
        limitToEdges: true
      });
    }
    if (this._lightbox) {
      this._initLightbox();
    }
  }
  _load(slide: HTMLElement) {
    const img: HTMLImageElement | null =
    slide.tagName === "IMG"
      ? (slide as HTMLImageElement)
      : slide.querySelector("img");
    if (img) {
      return loadImage(img, true, slide);
    } else {
      return Promise.resolve();
    }
  }

  _loadAllThumbs() {
    const thumbs = this._thumbsContainer?.querySelectorAll('.sg-gallery__thumb');
    
    if(thumbs) {
      return Promise.all(Array.from(thumbs).map((thumb) => this._load(thumb as HTMLElement)))
    }
    else {
      return Promise.resolve()
    }
  }

  /**
   * A method to destroy the gallery and thumbs objects.
   */
  public destroy() {
    if (this._auto) {
      clearInterval(this._galleryObject?._autoInterval);
    }
    this._galleryObject?.stop();
    this._thumbsObject?.stop();
    this._galleryObject = null;
    this._thumbsObject = null;
  }

  /**
   * A private asynchronous function to get Lightbox.
   */
  private async _initLightbox(): Promise<void> {
    if (this._images && this._images.length > 0) {
      const options = {
        pswpModule: () => import("photoswipe"),
        wheelToZoom: true,
        bgOpacity: 0.9,
        paddingFn: () => {
          return {
            top: 30,
            bottom: 30,
            left: 70,
            right: 70,
          };
        },
      };

      //@ts-ignore
      await import("photoswipe/style.css");
      const { default: PhotoSwipeLightbox } = await import(
        "photoswipe/lightbox"
      );

      // if slideshow is active, add images data
      if (this._slideshow) {
        const imagesData = this._images.map((image) => {
          return {
            caption:
              image.parentElement?.querySelector("figcaption")?.textContent,
            src: image.src || image.dataset.src,
            alt: image.alt,
            srcset: image.srcset || image.dataset.srcset,
            width: image.getAttribute("width"),
            height: image.getAttribute("height"),
          };
        });
        options["dataSource"] = imagesData;
        options["showHideAnimationType"] = "fade";
        if (this._galleryObject) {
          const lightbox = new PhotoSwipeLightbox(options);
          if (this._legends) {
            const { default: PhotoSwipeDynamicCaption } = await import(
              "photoswipe-dynamic-caption-plugin"
            );
            new PhotoSwipeDynamicCaption(lightbox, {
              type: "auto",
              captionContent: (slide) => {
                return slide.data.caption;
              },
            });
          }
          lightbox.init();

          this._galleryObject.slideClick = (index) => {
            lightbox.loadAndOpen(index);
          };
        }
      } else {
        options["gallery"] = `#${this._gallery.id}`;
        options["children"] = ".sg-gallery__img a";
        options["showHideAnimationType"] = "zoom";

        const lightbox = new PhotoSwipeLightbox(options);

        if (this._legends) {
          const { default: PhotoSwipeDynamicCaption } = await import(
            "photoswipe-dynamic-caption-plugin"
          );
          new PhotoSwipeDynamicCaption(lightbox, {
            type: "auto",
          });
        }
        lightbox.init();
      }
    }
  }
}
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sg-gallery").forEach((gallery) => {
    new sgGallery(gallery as HTMLElement);
  });
});

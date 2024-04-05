import Swiper from "sg-swiper";
import { loadImage, lazyLoad } from "../block-utilities/sg-lazyload";

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
  private _slideshowBreakpoint: number | null = null;
  private _lightbox: boolean = false;
  private _legends: boolean = false;
  private _startIndex: number = 0;
  private _lightboxInitialized: boolean = false;
  private _slideshowInitialized: boolean = false;
  private _allImagesLoaded: boolean = false;

  /**
   * Constructor for the sgGallery class.
   *
   * @param {HTMLElement} element - the HTML element to initialize the gallery
   * @param {sgGalleryProps} props - the properties for the gallery
   */
  constructor(element: HTMLElement, startIndex: number = 0) {

    if (!element) return;

    const { lightbox, draggable, legends, slideshowDelay, slideshowBreakpoint } = element.dataset;

    this._gallery = element;
    this._imagesContainer = element.querySelector(".sg-gallery__images");
    this._thumbsContainer = element.querySelector(".sg-gallery__thumbs");

    this._images = this._imagesContainer
      ? Array.from(
        this._imagesContainer.querySelectorAll(".sg-gallery__img img")
      )
      : [];


    if (this._images.length === 0 || !this._imagesContainer) return;

    this._slideshow = element.classList.contains("sg-gallery--slideshow");
    this._lightbox = lightbox && lightbox !== "false" ? true : false;
    this._legends = legends === "true" ? true : false;


    if (this._slideshow) {
      this._auto = Number(slideshowDelay);
      this._slideshowBreakpoint = Number(slideshowBreakpoint);
      this._draggable = draggable === "true" ? true : false;
    } else {
      this._checkAllImagesLoaded();
    }

    this._startIndex = startIndex;

    if (this._lightbox && !this._lightboxInitialized) this._initLightbox();

    if (this._slideshowBreakpoint) {
      window.addEventListener('resize', this._handleResize);
      this._handleResize();
    } else {
      this._initSlideshow();
    }
  }



  /**
   * Initialize the gallery.
   *
   * @return {Promise<void>} a promise with no return value
   */
  private async _initSlideshow() {
    if (this._slideshowInitialized || !this._slideshow) return;

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
        slideStart: this._startIndex,
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
      slideStart: this._startIndex,
      draggable: this._images.length > 1 ? this._draggable : false,
      limitToEdges: true
    });
    this._gallery.classList.add('sg-gallery--slideshow-initialized');
    this._slideshowInitialized = true;
  }

  _handleResize = () => {
    const { innerWidth } = window;
    if (this._slideshowBreakpoint && innerWidth > this._slideshowBreakpoint) {

      this.destroySlideshow();
      this._checkAllImagesLoaded();

    } else {
      this._initSlideshow();
    }
  }

  /**
   * Load an image from the given slide element.
   *
   * @param {HTMLElement} slide - the slide element to load the image from
   * @return {Promise} a Promise that resolves with the loaded image, or resolves without a value if no image is found
   */
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

  _checkAllImagesLoaded() {
    if (!this._allImagesLoaded) {
      this._images.forEach((element) => {
        lazyLoad(element.closest("figure"));
      });
      this._allImagesLoaded = true;
    }
  }

  /**
   * Load all thumbnail images.
   *
   * @return {Promise<void>} A promise that resolves when all thumbnail images are loaded.
   */
  _loadAllThumbs() {
    const thumbs = this._thumbsContainer?.querySelectorAll('.sg-gallery__thumb');

    if (thumbs) {
      return Promise.all(Array.from(thumbs).map((thumb) => this._load(thumb as HTMLElement)))
    }
    else {
      return Promise.resolve()
    }
  }

  /**
   * A method to destroy the gallery and thumbs objects.
   */
  public destroySlideshow() {
    if (this._auto) {
      clearInterval(this._galleryObject?._autoInterval);
    }
    this._galleryObject?.stop();
    this._thumbsObject?.stop();
    this._galleryObject = null;
    this._thumbsObject = null;
    this._slideshowInitialized = false;
    this._gallery.classList.remove('sg-gallery--slideshow-initialized')
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

        this._images.map((image, index) => {
          image.addEventListener("click", () => {
            lightbox.loadAndOpen(index);
          });
        });
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
      this._lightboxInitialized = true;
    }
  }
}


const sgGalleryInit = () => {
  document.querySelectorAll(".sg-gallery").forEach((gallery) => {
    new sgGallery(gallery as HTMLElement);
  });
}

export default sgGalleryInit;

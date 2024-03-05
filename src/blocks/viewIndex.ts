import { lazyLoad } from "./block-utilities/sg-lazyload";
import initMaps from "./map/map";
import sgReservationLinksInit from "./reservation/reservation";
import sgGalleryInit from "./gallery/gallery";
import sgQueryRelatedInit from "./query-related/slide";
import lightboxImageInit from "./block-utilities/sg-lightbox";
import { sgContactFormHandle } from "./contact-form/contact-form";

document.addEventListener("DOMContentLoaded", async () => {
    initMaps();
    sgReservationLinksInit();
    sgGalleryInit();
    sgQueryRelatedInit();
    sgContactFormHandle();
    
    //load lazy images
    document.querySelectorAll(".sg-lazy-image").forEach((image) => {
        lazyLoad(image as HTMLElement);
    });

    document.querySelectorAll(".sg-lightbox-image").forEach((image) => {
        lightboxImageInit(image as HTMLImageElement);
    });
})


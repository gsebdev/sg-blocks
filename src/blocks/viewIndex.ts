import { lazyLoad } from "./block-utilities/sg-lazyload";
import initMaps from "./map/map";
import sgReservationLinksInit from "./reservation/reservation";
import sgGalleryInit from "./gallery/gallery";
import sgQueryRelatedInit from "./query-related/slide";
import lightboxImageInit from "./block-utilities/sg-lightbox";

document.addEventListener("DOMContentLoaded", async () => {
    initMaps();
    sgReservationLinksInit();
    sgGalleryInit();
    sgQueryRelatedInit();
    
    //load lazy images
    document.querySelectorAll(".sg-lazy-image").forEach((image) => {
        lazyLoad(image as HTMLElement);
    });

    document.querySelectorAll(".sg-lightbox-image").forEach((image) => {
        console.log(image)
        lightboxImageInit(image as HTMLImageElement);
    });
})


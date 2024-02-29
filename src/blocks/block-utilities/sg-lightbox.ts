const lightboxImageInit = async (element: HTMLElement) => {
    const options = {
        pswpModule: () => import("photoswipe"),
        wheelToZoom: true,
        bgOpacity: 0.9,
        gallery: `#${element.id}`,
        children: "a",
        showHideAnimationType: element.dataset.transition as any,
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

    const lightbox = new PhotoSwipeLightbox(options);

    lightbox.init();
}

export default lightboxImageInit;
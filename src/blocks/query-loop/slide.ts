import Swiper from "sg-swiper";
interface Slider {
  swiper: Swiper | null;
  breakpoint: number | null;
  el: HTMLElement;
  autoplay: number | null;
  edgesLimit: boolean;
  initialized: boolean;
}


const sgSlidersInit = async () => {
  const { default: Swiper } = await import(
    /* webpackChunkName: "sg-swiper" */ "sg-swiper"
  );
  const sliders: Slider[] = Array.from(
    document.querySelectorAll(".sg-swiper") as NodeListOf<HTMLElement>
  ).map((el) => {
    return {
      swiper: null,
      breakpoint: el.dataset.breakpoint ? parseInt(el.dataset.breakpoint) : null,
      autoplay: el.dataset.autoplay ? parseInt(el.dataset.autoplay) : null,
      edgesLimit: el.dataset.limitEdges === "true",
      el: el,
      initialized: false
    };

  });

  const checkSliders = () => {
    const { innerWidth: size } = window;
    sliders.forEach((slider) => {
      const { el } = slider;
      if (!slider.breakpoint || size <= slider.breakpoint) {

        if (!!slider.swiper?._state.initialized) return;

        el.classList.add("sg-swiper--started");

        if (slider.swiper) {
          slider.swiper.start();
        } else {
          slider.swiper = new Swiper(el as HTMLElement, {
            draggable: true,
            auto: slider.autoplay ? slider.autoplay : undefined,
            limitToEdges: slider.edgesLimit,
            navigation: {
              prev: [...el.querySelectorAll("[data-direction='prev']") as NodeListOf<HTMLElement>],
              next: [...el.querySelectorAll("[data-direction='next']") as NodeListOf<HTMLElement>],
            },
            onSlideClick: (index, element) => {
              const href = element.querySelector("a")?.href;
              if (!!href) window.location.href = href;
            },
          });
        }
      } else {
        if (!!slider.swiper && slider.swiper._state.initialized)
          slider.swiper.stop();
        el.classList.remove("sg-swiper--started");
      }
      if (!slider.initialized) {
        slider.initialized = true;
        slider.el.setAttribute('data-slider-init', 'true');
      }

    });
  };

  const resizeObserver = new ResizeObserver(checkSliders);
  resizeObserver.observe(document.body);

  //checkSliders();
};

export default sgSlidersInit;

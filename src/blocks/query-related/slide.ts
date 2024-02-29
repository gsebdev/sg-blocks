import Swiper from "sg-swiper";
interface Slider {
  swiper: Swiper | null;
  breakpoint: number;
  el: Element;
}

const activateSgSlidersInit = async () => {
  const { default: Swiper } = await import(
    /* webpackChunkName: "sg-swiper" */ "sg-swiper"
  );
  const sliders: Slider[] = Array.from(
    document.querySelectorAll("[data-sg-slider]")
  ).map((el) => {
    return {
      swiper: null,
      breakpoint: parseInt(el.getAttribute("data-sg-slider") ?? "0"),
      el: el,
    };
  });

  window.addEventListener("resize", () => {
    const { innerWidth: size } = window;
    sliders.forEach((slider) => {
      const { el } = slider;
      if (
        (slider.breakpoint === 0 || size <= slider.breakpoint) &&
        (!slider.swiper || !slider.swiper._state.initialized)
      ) {
        el.classList.add("sg-slider-started");
        if (slider.swiper) {
          slider.swiper.start();
        } else {
          slider.swiper = new Swiper(slider.el as HTMLElement, {
            draggable: true
          });
        }
      } else {
        if (slider.swiper && slider.swiper._state.initialized)
          slider.swiper.stop();
        el.classList.remove("sg-slider-started");
      }

    });
  });
};

export default activateSgSlidersInit;

declare global {
  interface Element {
    __scrollCenter__?: number;
    __scrollObserveMaxLimit__?: number;
    __scrollObserveMinLimit__?: number;
    __height__?: number;
    __width__?: number;
    __parallaxElements__?: HTMLElement[];
    __fixedTop__?: number;
    __fixedLeft__?: number;
    __speed__?: number;
    __scrollHandler__?: () => void;
  }
}

export const sgScrollParallax = () => {
  const containers = document.querySelectorAll(".sg-parallax-container") as NodeListOf<HTMLElement>;
  const margin = 10;
  let resizeTimeout: NodeJS.Timeout;

  if (!containers?.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target.__scrollHandler__) {

          if (entry.isIntersecting) {
            entry.target.__parallaxElements__?.forEach((element) => {
              element.style.position = "fixed";
              element.style.top = `${element.__fixedTop__}px`;
              element.style.left = `${element.__fixedLeft__}px`;
              element.style.width = `${element.__width__}px`;
              element.style.height = `${element.__height__}px`;
              element.style.margin = '0px';
            });
            document.addEventListener("scroll", entry.target.__scrollHandler__, { passive: true });
            entry.target.__scrollHandler__();

          } else {
            resetElementsStyles(entry.target as HTMLElement);
            document.removeEventListener("scroll", entry.target.__scrollHandler__);

          }
        }
      });
    },
    {
      threshold: 0,
      rootMargin: `${margin}px`,
    }
  );

  const initContainer = (container: HTMLElement) => {
    const { innerHeight, scrollY } = window;
    const { offsetHeight } = container;
    const { top, left } = container.getBoundingClientRect();
    const offsetTopFromRoot = scrollY + top;
    const deltaWindowHeight = (innerHeight - offsetHeight) / 2;

    container.__scrollCenter__ = offsetTopFromRoot - deltaWindowHeight;
    container.__scrollObserveMaxLimit__ = offsetTopFromRoot + offsetHeight + margin;
    container.__scrollObserveMinLimit__ = offsetTopFromRoot - innerHeight - margin;
    container.__height__ = offsetHeight;
    container.__width__ = container.offsetWidth;
    container.style.height = `${offsetHeight}px`;
    container.style.width = `${container.offsetWidth}px`;

    container.__parallaxElements__?.forEach((element) => {

      const { height, width } = element.getBoundingClientRect();
      element.__fixedTop__ = element.offsetTop + deltaWindowHeight;
      element.__fixedLeft__ = element.offsetLeft + left;
      element.__height__ = height;
      element.__width__ = width;
    });

    observer.observe(container);
  };

  const resetElementsStyles = (container: HTMLElement) => {
    container.__parallaxElements__?.forEach((element) => {
      element.style.position = "";
      element.style.top = "";
      element.style.left = "";
      element.style.width = "";
      element.style.height = "";
      element.style.margin = "";
    })
  }

  const resetContainer = (container) => {
    container.style.height = "";
    container.style.width = "";
    resetElementsStyles(container);
    observer.unobserve(container);
    document.removeEventListener("scroll", container.__scrollHandler__);
  }

  const handleWindowResize = () => {
    containers.forEach((container) => {
      resetContainer(container);
    });
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      containers.forEach((container) => {
        initContainer(container);
      });
    }, 100);
  };



  /**
   *
   * Init each element
   *
   */

  containers.forEach((container) => {
    // Get the elements to observe in the container
    const elements = container.querySelectorAll("[data-speed]") as NodeListOf<HTMLElement>;
    container.__parallaxElements__ = Array.from(elements);

    // Verify if the element has a speed data and store it
    container.__parallaxElements__.filter((element) => {
      const speed = Number(element.dataset.speed);
      if (Number.isNaN(speed) || speed === null || speed >= 100 || speed < 0) return false;
      element.__speed__ = speed;
      return true;
    });


    // Check if somme elements are left to observe
    if (!container.__parallaxElements__?.length) {
      return;
    }

    initContainer(container);


    /**
     * scroll handler function that adjusts the element's position based on scroll depth.
     *
     */
    const scrollHandler = () => {

      const { scrollY } = window;
      const { __scrollCenter__, __scrollObserveMaxLimit__, __scrollObserveMinLimit__ } = container;

      if (__scrollObserveMaxLimit__ === undefined || __scrollObserveMinLimit__ === undefined || __scrollCenter__ === undefined) return;

      // if element is not visible on the screen, remove the scroll handler
      if (
        scrollY < __scrollObserveMinLimit__ ||
        scrollY > __scrollObserveMaxLimit__
      )
        return;

      container.__parallaxElements__?.forEach((element) => {

        // calculate the translateY value according to it's depth
        const translateY = -(scrollY - __scrollCenter__) * (element.__speed__ ?? 100) / 100;

        // apply the translateY value
        element.style.transform = `matrix(1, 0, 0, 1, 0, ${translateY})`;

      })



    };

    container.__scrollHandler__ = scrollHandler;

    // add resize handler
    window.addEventListener("resize", handleWindowResize, { passive: true });
  });
};

const sgReservationLinksInit = () => {
  const links = document.querySelectorAll(".sg-reservation-link[data-src]");
  const handleReservationclick = (e: Event) => {
    e.preventDefault();
    const src = (e.target as HTMLElement)?.getAttribute("data-src") ?? "";

    if (src) {
      const modal = document.createElement("div");
      modal.className = "sg-modal loading";
      modal.onclick = () => {
        modal.remove();
      };
      const wrapper = document.createElement("div");
      wrapper.classList.add("sg-modal__wrapper", "p-3");
      const loader = document.createElement("span");
      loader.className = "loader";
      const iframe = document.createElement("iframe");
      iframe.setAttribute("allowtransparency", "true");
      iframe.src = src;

      wrapper.append(loader, iframe);
      modal.appendChild(wrapper);
      document.body.appendChild(modal);
      iframe.addEventListener("load", () => {
        modal.classList.add("fade-out");
        setTimeout(() => {
          modal.classList.remove("fade-out");
          modal.classList.remove("loading");
        }, 500);
      });
    }
  };
  links.forEach((link) => {
    link.addEventListener("click", handleReservationclick);
  });
};

export default sgReservationLinksInit;
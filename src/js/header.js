window.onload = () => {
  let lastPos = 0;
  const offset = 64;
  const header = document.querySelector(".header");
  const pos = () => window.pageYOffset || document.documentElement.scrollTop;
  const isHide = () => header.classList.contains("hide");

  window.addEventListener("scroll", () => {
    if (pos() > lastPos && !isHide() && pos() > offset) {
      header.classList.add("hide");
    } else if (pos() < lastPos && isHide()) header.classList.remove("hide");

    lastPos = pos();
  });
};

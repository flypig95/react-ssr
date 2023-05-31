!(function () {
  var docEl = document.documentElement;

  function setRem() {
    docEl.style.fontSize = docEl.clientWidth / 19.2 + "px";

    // fix rem influenced by system font-size setting
    var docElFontSize = docEl.style.fontSize.replace(/px/gi, "");
    var computedFontSize = window
      .getComputedStyle(docEl)
      ["font-size"].replace(/px/gi, "");
    docElFontSize != computedFontSize &&
      (docEl.style.fontSize =
        (docElFontSize * docElFontSize) / computedFontSize + "px");
  }

  window.addEventListener("resize", setRem);
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      setRem();
    }
  });

  setRem();
})();

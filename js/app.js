(function(colours) {
  const body = document.body;
  const container = document.querySelector(".container");
  const colorFormat = document.querySelectorAll(".color-format");
  const headline = document.querySelector("p");
  const smbt = document.querySelector(".submit");
  const usersColor = {
    selected: "",
    name: ""
  };
  const words = Object.keys(colours);
  const wordsColor = Object.values(colours);
  const wrapper = document.querySelector(".wrapper");

  (function fill() {
    container.innerHTML = words
      .map(
        elem => `<div class="box" data-paint="${colours[elem]}">${elem}</div>`
      )
      .join("");
  })();

  // container.innerHTML = words.reduce(
  //   (acc, elem) =>
  //     acc + `<div class="box" data-paint="${colours[elem]}">${elem}</div>`,
  //   ""
  // );

  function setContrastColor(color) {
    const arr = color.split("");
    const red = +("0x" + arr.slice(1, 3).join(""));
    const green = +("0x" + arr.slice(3, 5).join(""));
    const blue = +("0x" + arr.slice(5).join(""));
    const luma = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
    return luma > 0.5 ? "#000000" : "#ffffff";
  }

  (function paint() {
    const labels = document.querySelectorAll(".box");
    Array.from(labels, elem => {
      elem.style.backgroundColor = elem.dataset.paint;
      elem.style.color = setContrastColor(elem.dataset.paint);
    });
  })();

  function nodesClassToggle(selector, newName, event) {
    const boxes = document.querySelectorAll(selector);
    Array.from(boxes, elem => elem.classList.remove(newName));
    event.target.classList.add(newName);
  }

  function setSelectColor(event) {
    if (event.target.dataset.paint) {
      usersColor.selected = event.target.dataset.paint;
      usersColor.name = event.target.textContent;
      nodesClassToggle(".box", "box-checked", event);
      body.style.backgroundColor = usersColor.selected;
      body.style.color = setContrastColor(usersColor.selected);
      headline.textContent = `Обранo колір: ${usersColor.name}`;
      colorFormat[0].textContent = usersColor.name;
      colorFormat[1].textContent = usersColor.selected;
      colorFormat[2].textContent = document.body.style.backgroundColor;
      colorFormat[3].textContent = hexToHSL(usersColor.selected);
    }
    return this;
  }

  container.addEventListener("click", setSelectColor);

  function hexToHSL(color) {
    if (color.substring(0, 1) === "#") {
      color = color.substring(1);
    }

    let red = parseInt(color.substring(0, 2), 16) / 255;
    let green = parseInt(color.substring(2, 4), 16) / 255;
    let blue = parseInt(color.substring(4), 16) / 255;

    const min = Math.min(red, green, blue);
    const max = Math.max(red, green, blue);

    let hue = (saturation = 0);
    let lightness = (max + min) / 2;

    if (max !== min) {
      let delta = max - min;
      saturation =
        lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      switch (max) {
        case red:
          hue = (green - blue) / delta + (green < blue ? 6 : 0);
          break;
        case green:
          hue = (blue - red) / delta + 2;
          break;
        case blue:
          hue = (red - green) / delta + 4;
          break;
      }
      hue /= 6;
    }

    saturation = Math.round(saturation * 100);
    lightness = Math.round(lightness * 100);
    hue = Math.round(360 * hue);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
})(namesColor);

import Highway from "@dogstudio/highway";
import { prefetch } from "quicklink";
import { manageScripts } from "./utils";
import { Move } from "./move";
import { Fade } from "./fade";
// import anime from "animejs";

// const p = {
//   x: 10,
//   y: 10,
//   w: 10,
//   h: 10,
// };

// const canvas = document.querySelector("canvas");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// const c = canvas.getContext("2d");
// let img;

// export function nameImg(el) {
//   img = el;
// }

// function animate() {
//   c.clearRect(0, 0, canvas.width, canvas.height);
//   c.drawImage(img, p.x, p.y, p.w, p.h);
// }

// anime({
//   targets: p,
//   x: 30,
//   y: 30,
//   w: 1000,
//   h: 500,
//   duration: 2000,
//   easing: "easeInOutCirc",
//   update: animate,
// });

// window.addEventListener("resize", function () {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });

window.H = new Highway.Core({
  transitions: {
    city: Move,
    home: Fade,
  },
});

window.H.on("NAVIGATE_END", ({ to }) => {
  prefetch({
    el: to.view,
  });

  manageScripts(to);
});

import Highway from "@dogstudio/highway";
import anime from "animejs/lib/anime.es.js";
import { setisBack, opt, setOpt } from "./shared";
import { scrollPos } from "./index";

export class Move extends Highway.Transition {
  in({ from, to, done, trigger }) {
    let e;
    if (trigger === "popstate") {
      setOpt(false);
      from.remove();
      document.querySelector("body").classList.remove("no-scroll");
      done();

      return;
    } else {
      e = trigger.querySelector(".cacahuete");
    }

    if (e) {
      setOpt(e.getBoundingClientRect());
      console.log(e.getBoundingClientRect());
    } else {
      setOpt(false);
    }
    from.remove();
    window.scroll(0, 0);

    const title = to.querySelector(".title span");
    const back = to.querySelector(".home-link");

    anime.set(title, {
      translateY: "100%",
    });
    anime.set(back, { opacity: 0 });

    anime({
      targets: title,
      translateY: 0,
      duration: 1000 / 2,
      easing: "easeInOutCirc",
      delay: 1000 / 2,
    });

    anime({
      targets: back,
      opacity: 1,
      duration: 1000 / 2,
      easing: "easeInOutCirc",
      delay: 1000 / 2,
    });

    if (opt) {
      const img = to.querySelector(".ppp");
      const imgProp = img.getBoundingClientRect();
      const w = (opt.width * 100) / imgProp.width;
      const h = (opt.height * 100) / imgProp.height;

      anime.set(img, {
        width: `${w}%`,
        height: `${h}%`,
        translateX: opt.x,
        translateY: opt.y,
      });

      anime({
        targets: img,
        width: "100%",
        height: "100%",
        translateX: 0,
        translateY: 0,
        duration: 1000,
        easing: "easeInOutCirc",
        complete: () => {
          document.querySelector("body").classList.remove("no-scroll");
          done();
        },
      });
    } else {
      document.querySelector("body").classList.remove("no-scroll");
      done();
    }
  }

  out({ done, from, trigger }) {
    document.querySelector("body").classList.add("no-scroll");
    const title = from.querySelector(".title span");
    const back = from.querySelector(".home-link");
    const img = from.querySelector(".ppp");

    if (trigger === "popstate") {
      done();
      return;
    }

    anime({
      targets: title,
      translateY: "-100%",
      duration: 1000 / 2,
      easing: "easeInOutCirc",
    });

    if (opt.x && trigger !== "popstate") {
      console.log(opt);
      const img = from.querySelector(".ppp");
      const imgProp = img.getBoundingClientRect();
      const w = (opt.width * 100) / imgProp.width;
      const h = (opt.height * 100) / imgProp.height;

      setisBack({ is: true, city: from.dataset.city });

      anime({
        targets: img,
        width: `${w}%`,
        height: `${h}%`,
        translateX: opt.x,
        translateY: opt.y,
        duration: 1000 / 2,
        easing: "easeInOutCirc",
        delay: 500,
      });
    } else {
      anime({
        targets: img,
        opacity: 0,
        duration: 1000 / 2,
        easing: "easeInOutCirc",
        delay: 500,
      });
    }

    anime({
      targets: back,
      opacity: 0,
      duration: 1000 / 2,
      delay: 500,
      easing: "easeInOutCirc",
      complete: () => {
        window.scroll(0, scrollPos || 0);
        done();
      },
    });
  }
}

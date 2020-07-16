import Highway from "@dogstudio/highway";
import anime from "animejs";
import { isBack, setisBack } from "./shared.js";

export let scrollPos = 0;

export function setScrollPos(e) {
  scrollPos = e;
}

export class Fade extends Highway.Transition {
  in({ done, from, to, trigger }) {
    window.scroll(0, scrollPos || 0);
    from.remove();
    const imgs = to.querySelectorAll(".cacahuete img");
    const cityNames = to.querySelectorAll(".city-name span");

    if (isBack.is) {
      const citys = to.querySelectorAll(
        `[data-city]:not([data-city="${isBack.city}"]) .cacahuete img`
      );

      anime.set(citys, { translateY: "-100%", scale: 1.2 });
      anime.set(cityNames, { translateY: "100%" });
      anime({
        targets: citys,
        translateY: 0,
        scale: 1,
        duration: 400,
        delay: anime.stagger(10),
        easing: "easeInOutCirc",
      });

      anime({
        targets: cityNames,
        translateY: 0,
        duration: 400,
        delay: 200 + anime.stagger(10),
        easing: "easeInOutCirc",
        complete: () => {
          document.querySelector("body").classList.remove("no-scroll");
          done();
        },
      });
      setisBack({});
    } else {
      anime.set(imgs, { translateY: "-100%", scale: 1.2 });
      anime.set(cityNames, { translateY: "100%" });

      anime({
        targets: imgs,
        translateY: 0,
        scale: 1,
        duration: 400,
        delay: anime.stagger(10),
        easing: "easeInOutCirc",
      });

      anime({
        targets: cityNames,
        translateY: 0,
        duration: 400,
        delay: 200 + anime.stagger(10),
        easing: "easeInOutCirc",
        complete: () => {
          document.querySelector("body").classList.remove("no-scroll");
          done();
        },
      });
    }
  }

  out({ done, from, trigger }) {
    setScrollPos(window.scrollY);
    document.querySelector("body").classList.add("no-scroll");
    const cityNames = from.querySelectorAll(".city-name span");
    const links = from.querySelectorAll(".link-thumb");

    if (trigger === "popstate") {
      anime({
        targets: links,
        opacity: 0,
        duration: 400,
        delay: anime.stagger(10),
        easing: "easeInOutCirc",
        complete() {
          done();
        },
      });
      return;
    }

    const city = [...trigger.classList]
      .filter((e) => {
        return e !== "link-thumb";
      })
      .join();

    const thumbs = [...links].filter((e) => {
      const classes = [...e.classList];
      return !classes.includes(city);
    });

    const imgs = thumbs.reduce((acc, el) => {
      return [...acc, el.querySelector(".cacahuete img")];
    }, []);

    anime({
      targets: imgs,
      translateY: "-100%",
      duration: 400,
      delay: anime.stagger(10),
      easing: "easeInOutCirc",
    });

    anime({
      targets: cityNames,
      translateY: "-100%",
      duration: 400,
      delay: anime.stagger(10),
      easing: "easeInOutCirc",
      complete: () => {
        done();
      },
    });
  }
}

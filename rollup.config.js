import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const PRODUCTION = !process.env.ROLLUP_WATCH;

export default {
  input: "src/js/index.js",
  output: [
    {
      name: "butterSlider",
      file: "src/js/app.js",
      format: "umd",
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**",
    }),
    PRODUCTION && terser(),
  ],
};

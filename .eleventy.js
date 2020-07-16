module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js/app.js");
  eleventyConfig.addPassthroughCopy("src/js/brest.js");

  return {
    dir: { input: "src", output: "dist", includes: "includes" },
  };
};

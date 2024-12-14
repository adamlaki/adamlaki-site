import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import dateFilter from "./src/filters/date-filter.js";
import w3DateFilter from "./src/filters/w3-date-filter.js";
import htmlMinTransform from "./src/transforms/html-min-transform.js";

const isProduction = process.env.NODE_ENV === "production";

export default config => {
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("w3DateFilter", w3DateFilter);
  config.addFilter("debugger", (...args) => {
    console.log(...args);
    debugger;
  });

  if (isProduction) {
    config.addTransform("htmlmin", htmlMinTransform);
  }

  config.addPlugin(syntaxHighlight);

  config.addPassthroughCopy("./src/img/");
  config.addPassthroughCopy("./src/video/");
  config.addPassthroughCopy("./src/css/");
  config.addPassthroughCopy("./src/fonts/");
  config.addPassthroughCopy("./src/js/");
  config.addPassthroughCopy("./_redirects");

  config.addCollection("bsa", collection => {
    return [...collection.getFilteredByGlob("./src/bite-sized-accessibility/*.md")];
  });

  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist"
    }
  };
};

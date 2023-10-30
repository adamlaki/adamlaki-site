const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addFilter('debugger', (...args) => {
    console.log(...args);
    debugger;
  });

  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  config.addPlugin(syntaxHighlight);

  config.addPassthroughCopy('./src/img/');
  config.addPassthroughCopy('./src/css/');
  config.addPassthroughCopy('./src/fonts/');
  config.addPassthroughCopy('./_redirects');

  config.addCollection('blog', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')];
  });

  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};

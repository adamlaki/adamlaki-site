const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {
  // Add filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addFilter('debugger', (...args) => {
    console.log(...args)
    debugger;
  });

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  // Plugins
  config.addPlugin(syntaxHighlight);

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/img/');
  config.addPassthroughCopy('./src/css/');
  config.addPassthroughCopy('./src/fonts/');

  // Returns blog items, sorted by date order
  config.addCollection('blog', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')];
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
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

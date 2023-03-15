// Filters
const readableDate = require('./src/filters/readableDate.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');

// Plugins
const svgSprite = require('eleventy-plugin-svg-sprite');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');
const purgeCSS = require('./src/transforms/css-purge-inline.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = (eleventyConfig) => {
  // Set directories to pass through to the dist folder
  eleventyConfig.addPassthroughCopy('./src/images/');
  eleventyConfig.addPassthroughCopy('./src/fonts/');
  eleventyConfig.addPassthroughCopy('./src/js/');

  // Add filters
  eleventyConfig.addFilter('readableDate', readableDate);
  eleventyConfig.addFilter('w3DateFilter', w3DateFilter);
  eleventyConfig.addFilter('limit', function (arr, limit) {
    return arr.slice(0, limit);
  });
  eleventyConfig.addFilter('markdownFilter', markdownFilter);

  // Add Shortcodes
  eleventyConfig.addShortcode('icon', require('./src/shortcodes/icon.js'));
  eleventyConfig.addShortcode(
    'picture',
    require('./src/shortcodes/picture.js')
  );

  // Plugins
  eleventyConfig.addPlugin(svgSprite, {
    path: './src/icons', // relative path to SVG directory
    outputFilepath: './dist/icons/icons.svg',
  });

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    eleventyConfig.addTransform('htmlmin', htmlMinTransform);
    eleventyConfig.addTransform('purgeCSS', purgeCSS);
  }

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  eleventyConfig.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};

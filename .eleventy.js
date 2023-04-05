const path = require('path');
const buildSystem = require('@cagov/11ty-build-system');
const { globPlugin } = require('esbuild-plugin-glob');

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

module.exports = (config) => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/fonts/');
  config.addWatchTarget('./src/js/');

  // Add filters
  config.addFilter('readableDate', readableDate);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addFilter('limit', function (arr, limit) {
    return arr.slice(0, limit);
  });
  config.addFilter('markdownFilter', markdownFilter);

  // Add Shortcodes
  config.addShortcode('icon', require('./src/shortcodes/icon.js'));
  config.addShortcode('picture', require('./src/shortcodes/picture.js'));
  config.addShortcode('script', require('./src/shortcodes/script.js'));

  // Plugins
  config.addPlugin(svgSprite, {
    path: './src/icons', // relative path to SVG directory
    outputFilepath: './dist/icons/icons.svg',
  });
  config.addPlugin(buildSystem, {
    processors: {
      esbuild: {
        watch: ['src/js/**/*'],
        options: {
          entryPoints: [path.resolve(__dirname, 'src/js/**/*.js')],
          bundle: true,
          minify: isProduction,
          outdir: 'dist/js',
          splitting: true,
          format: 'esm',
          plugins: [globPlugin()],
        },
      },
    },
  });

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
    config.addTransform('purgeCSS', purgeCSS);
  }

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

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

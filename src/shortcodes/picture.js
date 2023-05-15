const Image = require('@11ty/eleventy-img');
async function pictureShortcode(picture) {
  let src = picture.src ? picture.src : '';
  let alt = picture.alt ? picture.alt : '';
  let widths = picture.widths ? picture.widths : [200, 300];
  let sizes = picture.sizes
    ? picture.sizes
    : 'clamp(10rem, 8.286rem + 8.57vw, 16rem) auto';
  let imgClass = picture.class ? picture.class : '';
  let formats = picture.formats ? picture.formats : ['webp', 'jpg'];
  let loading = picture.loading ? picture.loading : 'lazy';

  if (src.startsWith('//')) {
    src = 'https:' + src;
  }

  let metadata = await Image(src, {
    widths: widths,
    formats: formats,
    outputDir: './dist/images',
    urlPath: '/images',
  });

  let imageAttributes = {
    class: imgClass,
    alt,
    sizes,
    loading: loading,
    decoding: 'async',
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  const pictureCode = Image.generateHTML(metadata, imageAttributes);
  return pictureCode;
}

module.exports = pictureShortcode;

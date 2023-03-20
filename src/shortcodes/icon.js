module.exports = (icon) => {
  let sizes = '';
  let srText = "aria-hidden='true' focusable='false'";

  if (icon.width) {
    sizes = "width='" + icon.width + "' height='" + icon.width + "'";
  }
  if (icon.alt) {
    srText = "aria-label='" + icon.alt + "'";
  }
  return `<svg ${sizes} class="icon" ${srText}><use xlink:href="/icons/icons.svg#svg-${icon.icon}"/></svg>`;
};

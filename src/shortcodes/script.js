const assetHash = Math.random().toString(36).substring(7);

module.exports = ({ src, defer = true, isModule = true, ...props }) => {
  return `
    <script
      src="/js/${src}?${assetHash}"
      ${isModule ? 'type="module"' : ''}
      ${defer ? 'defer' : ''}
      ${Object.keys(props)
        .map((key) => `${key}="${props[key]}"`)
        .join(' ')}
    ></script>
  `;
};

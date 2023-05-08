module.exports = (values) => {
  let vals = [...values]; // this *seems* to prevent collection mutation...
  return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
};

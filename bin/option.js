const unique = (elements) => {
  let set = new Set();
  elements.forEach((item) => set.add(item.href))
  return set.size;
}
const broken = (elements) => {
  const arr = elements.filter((arr) => arr.statusText === 'Fail')
  return arr.length;
};

const showResults = (elements) => {
  const totalLinks = elements.length;
  const uniqueLinks = unique(elements);
  const brokeLinks = broken(elements);
  const resultLinks = {
    total: totalLinks,
    unique: uniqueLinks,
    broke: brokeLinks
  };
  return resultLinks;
}

module.exports = {
  showResults,
};
export default function lowerAll(term) {

  let termArr = term.split('');

  let catcher = [];

  termArr.forEach(item => {
    catcher.push(item.toLowerCase());
  });
  return catcher.join('');
}
export default function lowerAll(term, type) {

  let termArr = term;

  let catcher = [];

  termArr.forEach(item => {
    catcher.push(item.toLowerCase());
  });

  if (type === 'string') {
    return catcher.join('');
  } else {
    return catcher;
  }
  
}
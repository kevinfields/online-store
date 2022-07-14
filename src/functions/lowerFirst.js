export default function lowerFirst(word) {

  let wordArr = word.split('');

  wordArr[0] = wordArr[0].toLowerCase();

  return wordArr.join('');
}
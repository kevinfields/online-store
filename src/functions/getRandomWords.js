const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];



export default function getRandomWords(count) {

  let words;

  if (count && !isNaN(count)) {
    if (count > 0) {
      if (count < 10) {
        words = count;
      } else {
        words = 10;
      }
    } else {
      words = 2;
    }
  } else {
    words = Math.floor(Math.random() * 10) + 2;
  }

  let sentenceArr = [];

  for (let i=0; i<=words; i++) {
    let length = Math.floor(Math.random() * 7) + 1;
    let wordArr = [];
    for (let j=0; j<length; j++) {
      if (j % 2 === 1) {
        wordArr[j] =  vowels[Math.floor(Math.random() * vowels.length)];
      } else {
        wordArr[j] = consonants[Math.floor(Math.random() * consonants.length)];
      }
    }
    if (i === 0) {
      wordArr[0] = wordArr[0].toUpperCase();
      sentenceArr.push(wordArr.join(''));
    } else if (i === words) {
      sentenceArr.push(wordArr.join('') + '.');
    } else {
      sentenceArr.push(wordArr.join('') + ' ');
    }
  }
  return sentenceArr.join('');
}
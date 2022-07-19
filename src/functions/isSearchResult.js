import lowerAll from "./lowerAll"

export default function isSearchResult(search, result) {

  
  let searchArr = lowerAll(search.split(''), 'array');
  let resultArr = lowerAll(result.split(''), 'array');

  const maxScore = searchArr.length * 4;
  let score = 0;

  for (let i=0; i<searchArr.length; i++) {

    if (searchArr[i] === resultArr[i]) {
      score += 4;
    } else if (resultArr.includes(searchArr[i])) {
      score += 1;
      let startIndex = resultArr.indexOf(searchArr[i]);
      if (resultArr[startIndex + 1] === searchArr[i + 1]) {
        score += 1;
        if (resultArr[startIndex + 2] === searchArr[i + 2]) {
          score += 1;
          if (resultArr[startIndex + 3] === searchArr[i + 3]) {
            score += 1;
          }
        }
      }
    }
  }

  return {
    pass: score / maxScore > 0.3,
    score: score,
    maxScore: maxScore,
  }
};
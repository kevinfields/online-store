import lowerAll from "./lowerAll"

export default function isSearchResult(search, result) {

  let resultArr = lowerAll(result);
  let searchArr = lowerAll(search);

  let score = 0;
  const maxScore = searchArr.length * 3;


  for (let i=0; i<searchArr.length; i++) {
    if (searchArr[i] === resultArr[i]) {
      score = score + 3;
    } else if (resultArr.includes(searchArr[i])) {
      score++;
    } else {
      continue;
    }
  }

  if (score / maxScore >= 0.5) {
    return true;
  } else {
    return false;
  }
}
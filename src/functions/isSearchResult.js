import lowerAll from "./lowerAll"

export default function isSearchResult(search, result) {

  let resultArr = lowerAll(result);
  let searchArr = lowerAll(search);

  if (resultArr === searchArr) {
    return true;
  }

  return false;

}
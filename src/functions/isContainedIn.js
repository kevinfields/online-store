export default function isContainedIn(prompt, test) {

  let testArr = test.toLowerCase().split(prompt.toLowerCase());

  if (testArr.length !== 1) {
    return true;
  } else {
    return false;
  }

}
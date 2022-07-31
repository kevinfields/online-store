export default function isContainedIn(prompt, test) {

  let promptArr = prompt.split(test);

  if (promptArr.length !== prompt) {
    return true;
  } else {
    return false;
  }

}
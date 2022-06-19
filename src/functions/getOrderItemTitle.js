export default function getOrderItemId(title) {

  let titleArr = title.split('');

  titleArr[0] = titleArr[0].toLowerCase();

  for (let i=1; i<titleArr.length; i++) {

    if (titleArr[i] === ' ') {
      titleArr[i] = '_';
    }
    if (titleArr[i - 1] === '_') {
      titleArr[i] = titleArr[i].toLowerCase();
    }
  }

  return titleArr.join('');
}
import getRandomWords from "../functions/getRandomWords";

export default async function ORDER_CONFIRMATION(userRef, type) {

  switch (type) {
    case 'standard':
      await userRef.collection('messages').add({
        title: 'You ordered this message',
        text: 'Hopefully I will remember to remove this feature.',
        time: new Date(),
      });
      break;
    case 'random':
      let randomWords = getRandomWords(5);
      await userRef.collection('messages').add({
        title: 'You ordered this message',
        text: randomWords,
        time: new Date(),
      })
      break;
    default:
      break;
  }
  
}
export default async function SEND_MESSAGE(userRef, messageObject) {

  if (!messageObject.title || !messageObject.text) {
    return false;
  }

  await userRef.collection('messages').add({
    title: messageObject.title,
    text: messageObject.text,
    time: new Date(),
  });
  return true;
}
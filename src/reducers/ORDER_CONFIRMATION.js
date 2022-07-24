export default async function ORDER_CONFIRMATION(userRef) {
  await userRef.collection('messages').add({
    title: 'You ordered this message',
    text: 'Hopefully I will remember to remove this feature.',
    time: new Date(),
  })
}
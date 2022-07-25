export default async function DELETE_MESSAGE (messId, userRef) {

  await userRef.collection('messages').doc(messId).delete();
}
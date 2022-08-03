export default async function UPDATE_SEARCH_HISTROY(userRef, searchObj) {

  const time = new Date();
  console.log(time.milliseconds)

  await userRef.collection('search_history').doc(time.milliseconds).set({
    ...searchObj,
  })
}
import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const LoginPage = (props) => {

  const makeAccountIfNone = async (user) => {
    let data;
    await props.usersRef
      .doc(user.uid)
      .get()
      .then((doc) => {
        data = doc.data();
      });

    if (data === undefined) {
      await props.usersRef.doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        theme: props.themeSelect,
        photoURL: user.photoURL,
        rewardPoints: 5,
      })
    }
  }

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider).then((data) => {
      makeAccountIfNone(data.user).then(() => {
        props.onLogin();
      })
    });
  };

  return (
    <div className="page" style={`font-size: ${props.textSize}pt`}>
      <button className='login-button' onClick={() => login()}>Log In or Sign Up</button>
    </div>
  );
};

export default LoginPage;
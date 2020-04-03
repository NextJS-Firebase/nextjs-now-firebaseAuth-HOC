import React, { useContext } from "react";
import { FirebaseContext } from "./_app";
import router from "next/router";
import fetch from "isomorphic-unfetch";
import { login } from "../components/withAuth";

export default () => {
  const { firebase, auth } = useContext(FirebaseContext);
  const authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    auth
      .signInWithPopup(authProvider)
      .then(async authUser => {
        //router.push("/")
        //call the api login route, this will set a cookie
        const response = await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(authUser),
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log(response);
        if (response.status === 200) {
          console.log("response from fetch");
          console.log(response);
          let json = await response.json();
          console.log(json);
          await login({ token: 123 });
        } else {
          console.log("Login failed.");
          // https://github.com/developit/unfetch#caveats
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div>
      <button onClick={() => authenticate("Google")}>
        Sign in with Google
      </button>
    </div>
  );
};

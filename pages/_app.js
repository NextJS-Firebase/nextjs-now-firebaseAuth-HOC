import React, { createContext, useContext } from "react"
import App from "next/app"

require("firebase/firestore")
require("firebase/functions")
require("firebase/storage")
require("firebase/auth")

import db from "../lib/db"

import { ThemeProvider } from "styled-components"
// for now, a hard coded theme.
// if you're pulling from multiple dbs, this might not be the right place
// for the theme provider
const theme = {
  colors: {
    primary: "#0070f3",
  },
  modal: {
    overlayColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fff",
    width: "400px",
    height: "300px",
    padding: "20px",
  },
  footer: {
    backgroundColor: "#0048aa",
    color: "#fff",
    height: "95px",
  },
  media: {
    backgroundColor: "#0048aa",
    color: "#fff",
    maxWidth: "350px",
    imageWidth: "48px",
    h2: {
      fontSize: "1.6rem",
      color: "#fff",
    },
    comment: {
      backgroundColor: "#ccddff",
      padding: "7px",
      color: "#131",
    },
  },
}

const firebase = db(true)
const auth = firebase.auth()
const firestore = firebase.firestore()

const FirebaseContext = createContext(null)
const context = {
  user: { signedIn: false },
  setUser: (user) => {
    user = { ...user }
    console.log(user)
  },
}
const UserContext = createContext(context)
let user = { signedIn: false }
export { FirebaseContext, UserContext, firebase, auth, firestore }
export default class MyApp extends App {
  render() {
    const { Component, pageProps, tenantObject, url } = this.props

    return (
      <FirebaseContext.Provider
        value={{ firebase: firebase, firestore: firestore, auth: auth }}
      >
        <UserContext.Provider value={context}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </UserContext.Provider>
      </FirebaseContext.Provider>
    )
  }
}

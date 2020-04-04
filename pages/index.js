import React, { useEffect } from "react"
import { firebase } from "./_app"
import withAuth, { logout } from "../components/withAuth"
// export async function getServerSideProps({ req, query }) {
//   const user = req && req.session ? req.session.decodedToken : null;
//   // don't fetch anything from firebase if the user is not found
//   // const snap = user && await req.firebaseServer.database().ref('messages').once('value')
//   // const messages = snap && snap.val()
//   const messages = null;
//   return {
//     props: {
//       user: user || null,
//       messages
//     }
//   };
// }

const Index = (props) => {
  const handleLogout = () => {
    firebase.auth().signOut()
    logout()
  }
  useEffect(() => {
    async function getUser() {
      const helloWorld = firebase.functions().httpsCallable("helloWorld")
      helloWorld()
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      // try {
      //   const user = await firebase
      //     .firestore()
      //     .collection("users")
      //     .doc("123")
      //     .get()

      //   if (user.exists) {
      //     const { data } = user.data()
      //     console.log(data)
      //   } else {
      //     // user does not exist
      //     console.log("no such user")
      //   }
      // } catch (e) {
      //   console.log(e)
      // }
    }
    // getUser()
  }, [])

  return (
    <div>
      {console.log(props)}
      <button onClick={handleLogout}>Logout</button>
      <div>
        <form onSubmit={() => console.log("submit")}>
          <input
            type={"text"}
            onChange={() => console.log("change")}
            placeholder={"add message..."}
            value={null}
          />
        </form>
      </div>
    </div>
  )
}
// Note: Get initial props won't work since we're wrapping with an HOC.
// Consider using the swr hook from the Next team.
Index.getInitialProps = async (ctx) => {
  const helloWorld = firebase.functions().httpsCallable("helloWorld")
  let data
  helloWorld()
    .then((response) => {
      data = response
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
  return { data }
}
export default withAuth(Index)

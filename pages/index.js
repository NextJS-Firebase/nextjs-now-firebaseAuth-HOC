import React, { Component } from "react";
import { firebase } from "./_app";
import withAuth, { logout } from "../components/withAuth";
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

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      value: "",
      messages: this.props.messages
    };
  }

  removeDbListener() {
    // firebase.database().ref('messages').off()
    if (this.state.unsubscribe) {
      this.state.unsubscribe();
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var db = firebase.firestore();
    const date = new Date().getTime();
    db.collection("messages")
      .doc(`${date}`)
      .set({
        id: date,
        text: this.state.value
      });
    this.setState({ value: "" });
  }

  handleLogout() {
    firebase.auth().signOut();
    logout();
  }

  render() {
    const { user, value, messages } = this.state;

    return (
      <div>
        <button onClick={this.handleLogout}>Logout</button>
        {user && (
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type={"text"}
                onChange={this.handleChange}
                placeholder={"add message..."}
                value={value}
              />
            </form>
            <ul>
              {messages &&
                Object.keys(messages).map(key => (
                  <li key={key}>{messages[key].text}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
export default withAuth(Index);

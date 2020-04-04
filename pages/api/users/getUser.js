import { firebase } from "../../_app"

export default async (req, res) => {
  const helloWorld = firebase.functions().httpsCallable("helloWorld")
  helloWorld()
    .then((response) => {
      return res.status(200).json(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

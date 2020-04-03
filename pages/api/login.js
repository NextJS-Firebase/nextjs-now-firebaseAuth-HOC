export const config = {
  api: {
    // bodyParser: p rocess.env.NODE_ENV !== "production" -> might be needed for firebase?
    bodyParser: true
  }
};

export default async (req, res) => {
  // console.log('username', username)
  // const url = `https://api.github.com/users/${username}`
  console.log(req.body);
  const { user } = req.body;
  // const { uid, displayName, photoURL, email } = user;

  try {
    // const response = await fetch(url)

    // if (response.ok) {
    //   const { id } = await response.json()
    //   return res.status(200).json({ token: id })
    // } else {
    //   // https://github.com/developit/unfetch#caveats
    //   const error = new Error(response.statusText)
    //   error.response = response
    //   throw error
    // }
    // firebase user with that id?
    // yes -> signin with token

    // no -> return error? redirect to signup page?
    // return res.status(200).json({
    //   token: "0Jt7YO4SfWgOGRInFP4LuQ4R7Si2",
    //   body: req.body
    // });
    return res.status(200).json({ token: 123, user: { ...user } });
  } catch (error) {
    const { response } = error;
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
};

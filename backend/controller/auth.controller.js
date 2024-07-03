const signupUser = async (req, res) => {
    res.send("User signup")
}

const loginUser = async (req, res) => {
    res.send("User login")
}

const logoutUser = async (req, res) => {
    res.send("User logout")
}

export {
    signupUser,
    loginUser,
    logoutUser
}
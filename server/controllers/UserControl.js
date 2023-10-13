const User = require('../Models/User')
const asyncWrap = require('../middleware/async')
const { v4: uuidv4 } = require('uuid');


const login = asyncWrap(async (req, res) => {
    const { email, password } = req.body;
console.log(req.body)
    const check = await User.findOne({ email, password: password });
    if (check) {
        const session = uuidv4();
        return res.status(201).json({ status: "successfull", response: check, session: session })
    }
    else {
        return res.status(200).json({ status: "un-successfull", response: "Incorect User / Password" })
    }
})



const signup = asyncWrap(async (req, res) => {
    const { name, password } = req.body;
    const checkName = await User.findOne({ name })
    if (checkName) {
        return res.json({ status: 1, response: "Name Already Exists" });
    }
    const user = new User({
        password: password,
        name,
        role: "User",
    });
    await user.save();
    const session = uuidv4();
    return res.json({ status: 0, response: user, session: session });
})


module.exports = {
    login, signup
}
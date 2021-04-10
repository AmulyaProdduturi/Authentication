const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

router.post("/test",async(req,res) => {
    try{
    let {email, password, passwordCheck, displayName} = req.body;
    if (!email || !password || !passwordCheck)
    return res.status(400).json({msg: "Not all fields have been entered"});
    if (password.length<5)
    return res.status(400).json({msg: "password needs to be atleast 5 characters long"});
    if (password!=passwordCheck)
    return res
    .status(400)
    .json({msg: "Enter the same password twice"});

    const existingUser =await User.findOne({email: email});
    if (existingUser)
    return res
    .sendStatus(400)
    .json({msg: "Enter the password twice for verification"});
    
    
if(!displayName) displayName = email;

const salt = await bcrypt.genSalt();
const passwordhash = await bcrypt.has(password,salt);

const newUser = new User({
    email,
    password: passwordhash,
    displayName,
});

const savedUser = await newUser.save();
res.json(savedUser);

}catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post("/login", async(req,res) => {
try{
    const {emsil, password} = req.body;
    if(!email || password)
    return res.status(400).json({msg: "Not all fields have been entered"});

    const user = await User.findOne({email: email});
    if(!user)
    return res
    .sendStatus(400)
    .json({msg: "No account with this email has been registered"});

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch)
return res
.status(400).json({msg: "Invalid credentials"});

const token = jwt.sign({id: user_id}, process.env.JWT_SECRET);
res.json({
    token,
    user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email
    }
})
} catch (err){
    res.status(500).json({error: err.message});
}
});

module.exports = router;
 
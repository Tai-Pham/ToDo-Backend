const userModel = require("../model/userModel");
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
        const result = await userModel.create(req.body)
        res.status(201).json({error: false})

    } catch (error) {
        let message = "Something when wrong"
        if(error.code == 11000) {
            message = "This username is taken"
        }
        res.status(400).json({error: true, message: message})
    }
}

exports.login = async (req, res) => {
    const user = await userModel.findOne({username: req.body.username})
    if(user != null) {
        const result = bcryptjs.compareSync(req.body.password, user.password) 

        if(result) {
            //move "MySecret" to a config or .env file in the future
            const token = jwt.sign({userID: user._id}, "MySecret") //2 minutes : {expiresIn: "2 minutes"}
            //console.log(token)
            res.cookie('token', token)

            res.status(200).json({username: user.username})
        } else {
            res.status(400).json({error: true, message: "Password or Username is incorrect"})
        }
        
    } else {
        res.status(400).json({error: true, message: "User does not exist"})
    }
}

exports.validateJWT = (req, res, next) => {

    jwt.verify(req.cookies.token, "MySecret", (err, data) => {
        if(err) {
            res.cookie("token", "")
            res.status(400).json({error: true, message:"Invalid JWT"}) //frontend please redirect them to loginPage
        } else {
            //console.log(data)
            req.body.userID = data.userID
            next()
        }
    })
    
}

// ??? not 100% sure the best way to logout
exports.logout = (req, res,) => {
    res.cookie("token", "")
    res.status(200).json({error: false});
}
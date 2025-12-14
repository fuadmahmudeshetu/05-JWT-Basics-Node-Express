const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
    const {username,password} = req.body
    
    if (!username || !password) {
        throw new CustomAPIError("please provide email and password", 400);
    }

    const id = new Date().getTime()
    
    
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({ msg:'user created success', token})
}

const dashboard = async (req, res) => {

    const authHeader = req.headers.authorization;

    if (!authHeader||!authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provide',401);   
    }

    const token = authHeader.split(' ')[1]
    console.log(token)

    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello, Fuad`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}` })
}

module.exports = {
    login, dashboard
}
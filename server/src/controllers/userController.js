const jwt = require('jsonwebtoken')

const generateJwt = (password) => {
    return jwt.sign(
        {password},
        process.env.SECRET_KEY,
        {expiresIn: process.env.TOKEN_DURATION}
    )
}

class UserController {

    async login(req, res, next) {
        const {password} = req.body
        if (password !== process.env.ADMIN_PASS) {
            return res.status(403).json({message: "Wrong password"})
        }
        const token = generateJwt(password)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.password)
        return res.json({token})
    }
}

module.exports = new UserController()

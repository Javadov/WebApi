const jwt = require('jsonwebtoken')

const generateAccessToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

const authorize = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1]
            const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET)
            next()
        } catch {
            res.status(401).json()
        }
    }
}

module.exports = {generateAccessToken, authorize}
const bcrypt = require('bcryptjs')

const hashedPassword = async (password) => {
    try {
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

module.exports = { hashedPassword, comparePassword }
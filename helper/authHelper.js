import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, 10)

    } catch (error) {
        console.log(`error while hashing ${error}`)
    }
}

export const comparePassword = async (password, hashedPassword) => {

    return await bcrypt.compare(password, hashedPassword)
}
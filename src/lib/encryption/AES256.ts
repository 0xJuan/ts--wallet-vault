import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto'

const ALGORITHM_AES256 = 'aes-256-gcm'
const IV_LENGTH = 12

export const encrypt = (key: string, cleartext: string): string => {
    const salt = randomBytes(8)
    const hash = scryptSync(key, salt, 32)
    const iv = randomBytes(IV_LENGTH)
    const cipher = createCipheriv(ALGORITHM_AES256, hash, iv)
    let encrypted = cipher.update(cleartext, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    const authTag = cipher.getAuthTag()
    return `${salt.toString('hex')}:${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
}

export const decrypt = (key: string, encryptedtext: string): string => {
    const [saltHex, ivHex, authTagHex, encrypted] = encryptedtext.split(':')
    const salt = Buffer.from(saltHex, 'hex')
    const iv = Buffer.from(ivHex, 'hex')
    const authTag = Buffer.from(authTagHex, 'hex')
    const hash = scryptSync(key, salt, 32)
    const decipher = createDecipheriv(ALGORITHM_AES256, hash, iv)
    decipher.setAuthTag(authTag)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

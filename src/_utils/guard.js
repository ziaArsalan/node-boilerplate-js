const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Shields = {
    SALT        : 'e8d3a06b282c67d03a959cf88179c66f',
    ALGORITHM   : 'aes-256-cbc',
    IV_LENGTH   : 16,
    KEY         : 'f23dbbe74fa7853879d1cd480a2ddec2',
    PRIVATE_KEY : '118188eadccb71345738a3b3ad19161e43468959f0635ac0ca3e3c0b1c3c55b8'
}

const generatePassHash = (password) => {
    return crypto.pbkdf2Sync(password, Shields.SALT, 1000, 64, 'sha512').toString('hex')
}

const genrateKey = () => {
    return crypto.randomBytes(4).toString('hex') + '-' + crypto.randomBytes(4).toString('hex') + '-' + crypto.randomBytes(4).toString('hex')
}

const encrypt = (text) => {
    const iv = crypto.randomBytes(Shields.IV_LENGTH);
    const cipher = crypto.createCipheriv(Shields.ALGORITHM, Buffer.from(Shields.KEY), iv);
   
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
   
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

const decrypt = (text) => {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(Shields.ALGORITHM, Buffer.from(Shields.KEY), iv);
   
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
   
    return decrypted.toString();

}

const generateToken = (payload, expires_in) => {
    return jwt.sign(payload, Shields.PRIVATE_KEY, {expiresIn: expires_in})
}

const decodeToken = (token) => {
    return new Promise(resolve => {
        const verifyCallback = (err, data) => {
            if(err)
            resolve({
                success : false,
                error   : err.message
            })
    
            resolve({
                success : true,
                data    : data
            })
        }
        
        jwt.verify(token, Shields.PRIVATE_KEY, verifyCallback)
    })
}

const verifyPass = (pass, passHash) => {
    return generatePassHash(pass) == passHash
}

module.exports = {
    generatePassHash,
    genrateKey,
    encrypt,
    decrypt,
    generateToken,
    decodeToken,
    verifyPass
}

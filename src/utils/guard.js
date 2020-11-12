const crypto = require('crypto')

const Shields = {
    SALT        : 'e8d3a06b282c67d03a959cf88179c66f',
    ALGORITHM   : 'aes-256-cbc',
    IV_LENGTH   : 16,
    KEY         : 'f23dbbe74fa7853879d1cd480a2ddec2'
}

const generatePassHash = (password) => {
    return crypto.pbkdf2Sync(password, Shields.SALT, 1000, 64, 'sha512').toString('hex')
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
    let decipher = crypto.createDecipheriv(Shields.ALGORITHM, Buffer.from(Shields.KEY), iv);
   
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
   
    return decrypted.toString();
}

module.exports = {
    generatePassHash,
    encrypt,
    decrypt
}

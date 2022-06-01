import sha3 from 'crypto-js/aes';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8'

const secrets:string = 'school_boy'

const codeEncrypt =(toEncrytp:string)=>{

return (sha3.encrypt(toEncrytp, secrets)).toString();
}

const codeDecrypt =(toDescrypt:object):string=>{

    return sha3.decrypt(toDescrypt, secrets).toString(Utf8)
}

const characters:string = 'abcdefABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$#~*';
const genRandCode= (length)=>{
    length = parseInt(length);
    let result = ""
    let charactersLength = characters.length;
    for ( var i = 0; i < length ; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}




export {
    genRandCode,
    codeEncrypt,
    codeDecrypt
}



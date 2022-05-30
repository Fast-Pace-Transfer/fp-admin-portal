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
    genRandCode
}
const getCookies = (name) => {
    console.log(document.cookie.replace(`path='/'`,""))
    let result = JSON.parse(document.cookie);
    if(result[name] !== null) return result[name]
    return -1;
}

export default getCookies
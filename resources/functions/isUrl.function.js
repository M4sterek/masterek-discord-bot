const isURL = (urlArg, urlConstructor) => {
    let url
    try {
        url = new urlConstructor(urlArg)
    } catch (error) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
module.exports = { isURL }
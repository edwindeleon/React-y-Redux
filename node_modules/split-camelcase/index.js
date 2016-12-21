module.exports = function (string, options) {
    return string.split(/(?=[A-Z])/g);
};
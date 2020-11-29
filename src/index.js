function deepClone(source) {
    if (source instanceof Object) {
        if (source instanceof Array) {
            const dist = new Array()
            for (let key in source) {
                dist[key] = deepClone(source[key])//因为对象里面可能还有对象，所以要用递归
            }
            return dist
        } else if (source instanceof Function) {
            const dist = function () {
                return source.call(this, ...arguments)
            }
            for (let key in source) {
                dist[key] = deepClone(source[key])//因为对象里面可能还有对象，所以要用递归
            }
            return dist
        }
        else {
            const dist = new Object()
            for (let key in source) {
                dist[key] = deepClone(source[key])//因为对象里面可能还有对象，所以要用递归
            }
            return dist
        }
    }
    return source
}

module.exports = deepClone
class Cloner {
    constructor() {
        this.cache = []
    }
    deepClone(source) {
        if (source instanceof Object) {
            let cachedDist = this.findCached(source)
            if (cachedDist) {
                return cachedDist
            } else {
                let dist
                if (source instanceof Array) {
                    dist = new Array()
                } else if (source instanceof Function) {
                    dist = function () {
                        return source.call(this, ...arguments)
                    }
                } else if (source instanceof RegExp) {
                    dist = new RegExp(source.source, source.flags)
                } else if (source instanceof Date) {
                    dist = new Date(source)
                }
                else {
                    dist = new Object()
                }
                this.cache.push([source, dist])
                for (let key in source) {
                    if (source.hasOwnProperty(key)) {
                        dist[key] = this.deepClone(source[key])//因为对象里面可能还有对象，所以要用递归
                    }
                }
                return dist
            }
        }
        return source
    }
    findCached(source) {
        for (let i = 0; i < this.cache.length; i++) {
            if (this.cache[i][0] === source) {
                return this.cache[i][1]
            }
        }
        return undefined
    }
}




module.exports = Cloner
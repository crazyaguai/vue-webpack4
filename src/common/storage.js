export default {
    setItem(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    getItem(key) {
        let result = window.localStorage.getItem(key)
        try {
            result = JSON.parse(result)
        } catch (error) {
            result = result
        }
        return result
    },
    removeItem(key) {
        window.localStorage.removeItem(key)
    },
    clear() {
        window.localStorage.clear()
    },

    sessionSetItem(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value))
    },
    sessionGetItem(key) {
        let result = window.sessionStorage.getItem(key)
        try {
            result = JSON.parse(result)
        } catch (error) {
            result = result
        }
        return result
    },
    sessionRemoveItem(key) {
        window.sessionStorage.removeItem(key)
    },
    sessionClear() {
        window.sessionStorage.clear()
    }
}

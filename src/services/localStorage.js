/**
 * @param key
 * @returns {[]}
 */
const getJSON = (key) => {
    try {
        const item = localStorage.getItem(key);

        if(item === null) {
            return [];
        }

        return JSON.parse(item);
    } catch(e) {
        console.error('Occured error when parsing JSON from localStorage', e);
        return [];
    }
};

/**
 * @param {string} key
 * @param {Object} value
 */
const setJSON = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
};

const localStorageService = {
    getJSON,
    setJSON
};

export default localStorageService;

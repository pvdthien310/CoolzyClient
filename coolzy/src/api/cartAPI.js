import DatabaseClient from './baseAPI.js'

const baseURL = 'cart/'

const cartApi = {
    getByUserId: async(userId) => {
        const res = DatabaseClient.get('/' + baseURL + userId)
            .catch(err => { return err.response })
        return res;
    },

    insertByUserId: async(userId, newCart) => {
        const res = DatabaseClient.put('/' + baseURL + 'insert/' + userId, newCart)
            .catch(err => { return err.response })
        return res;
    },

    deleteByUserId: async(userId, id) => {
        const res = DatabaseClient.put('/' + baseURL + 'delete/' + userId, { id: id })
            .catch(err => { return err.response })
        return res;
    },

    updateByUserId: async(userId, newCart) => {
        const res = DatabaseClient.put('/' + baseURL + 'update/' + userId, newCart)
            .catch(err => { return err.response })
        return res;
    },
}

export default cartApi
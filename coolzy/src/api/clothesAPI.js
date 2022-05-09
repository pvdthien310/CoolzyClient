import DatabaseClient from './baseAPI.js'

const baseURL = 'clothes'

const clothesApi = {
    getAll: async () => {
        const res = DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res;
    },

    create: async (data) => {
        const res = DatabaseClient.get('/' + baseURL, data)
            .catch(err => { return err.response })
        return res;
    },

    deleteAll: async () => {
        const res = DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res;
    },

    getById: async (id) => {
        const res = DatabaseClient.get('/' + baseURL + '/' + id)
            .catch(err => { return err.response })
        return res;
    },

    getByCategoryId: async (categoryId) => {
        const res = DatabaseClient.get('/' + baseURL + '/category/' + categoryId)
            .catch(err => { return err.response })
        return res;
    }
}

export default clothesApi
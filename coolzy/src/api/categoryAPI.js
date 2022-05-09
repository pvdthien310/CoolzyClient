import DatabaseClient from './baseAPI.js'

const baseURL = 'category'

const categoryApi = {
    getAll: async() => {
        const res = DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res;
    },

    create: async(data) => {
        const res = DatabaseClient.get('/' + baseURL, data)
            .catch(err => { return err.response })
        return res;
    },

    deleteAll: async() => {
        const res = DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res;
    },

    getById: async(id) => {
        const res = DatabaseClient.get('/' + baseURL + '/' + id)
            .catch(err => { return err.response })

        return res;
    },

    getAllId: async() => {
        const res = DatabaseClient.get('/' + baseURL + '/getAll/Id')
            .catch(err => { return err.response })

        return res;
    }
}

export default categoryApi
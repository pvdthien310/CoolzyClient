import DatabaseClient from './baseAPI.js'

const baseURL = 'favorite'

const favoriteAPI = {
    getAll: async () => {
        const res = await DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res.data;
    },
    addFav: async (newFav) => {
        const res = await DatabaseClient.post('/' + baseURL, newFav)
            .catch(err => { return err.response })
        return res
    },
    delete: async (favID) => {
        const res = DatabaseClient.delete('/' + baseURL + '/' + favID, favID)
            .catch(err => { return err.response })
        return res;
    },
    deleteAllFav: async () => {
        const res = await DatabaseClient.delete('/' + baseURL)
            .catch(err => { return err.message })
        return res
    }
}
export default favoriteAPI
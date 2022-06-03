import DatabaseClient from './baseAPI.js'

const baseURL = 'slidedata'

const slidedataAPI = {
    getAll: async () => {
        const res = await DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res.data;
    },
    addSlidedata: async (newSlide) => {
        const res = await DatabaseClient.post('/' + baseURL, newSlide)
            .catch(err => { return err.response })
        return res
    },
}
export default slidedataAPI
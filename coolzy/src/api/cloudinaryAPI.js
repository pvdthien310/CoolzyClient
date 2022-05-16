import DatabaseClient from './baseAPI.js'

const cloudinaryApi = {
    upload: async(data) => {
        console.log(data)
        const res = await DatabaseClient.post('/cloudinary', data);

        return res
    },

}
export default cloudinaryApi
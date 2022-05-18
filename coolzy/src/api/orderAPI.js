import DatabaseClient from './baseAPI.js'

const baseURL = 'order'

const invoiceAPI = {
    getAll: async() => {
        const res = await DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res.data;
    },
    updateOrder: async(data) => {
        const res = await DatabaseClient.post('/' + baseURL + '/' + data._id, data)
            .catch(err => { return err.response })
        return res.data;
    },
    // RevenueByBranch: async (branchID) => {
    //     const res = await DatabaseClient.get('/' + baseURL + '/revenueByBranchID/' + branchID)
    //         .catch(err => { return err.response })
    //     return res;
    // },
    addOrder: async(newOrder) => {
        const res = await DatabaseClient.post('/' + baseURL, newOrder)
            .catch(err => { return err.response })
        return res
    },
    productExisted: async(productId) => {
        const res = await DatabaseClient.post('/' + baseURL + '/productExisted', {
                productId: productId
            })
            .catch(err => { return err.response })
        return res
    }
}
export default invoiceAPI
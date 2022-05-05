import DatabaseClient from './baseAPI.js'

const baseURL = 'account'

const accountApi = {
    getAccountByEmail: async (email) => {
        const res = await DatabaseClient.get('/' + baseURL + '/' + email)
            .catch(err => { return err.response })
        return res;
    },
    checkEmail: async (email) => {
        const res = await DatabaseClient.post('/account/checkEmail/' + email);
        return res.data
    },
    register: async (dataForReg) => {
        const res = DatabaseClient.post('/' + baseURL, dataForReg)
            .catch(err => { return err.response })
        return res;
    },
    getAccountWithID: async (id) => {
        const res = DatabaseClient.get('/' + baseURL + `/${id}`)
            .catch(err => { return err.response })
        return res;
    },
    getAll: async () => {
        const res = DatabaseClient.get('/' + baseURL)
            .catch(err => { return err.response })
        return res;
    },
    updatePasswordForAccount: async (newPassword, userID) => {
        const res = DatabaseClient.put("/" + baseURL + "/updatePassword/" + userID, { password: newPassword })
            .catch(err => { return err.response })
        return res
    },
    deleteAccount: async (accountID) => {
        const res = DatabaseClient.delete("/" + baseURL + "/" + accountID)
            .catch(err => { return err.response })
        return res
    },
    createNewAccount: async (data) => {
        const res = DatabaseClient.post("/" + baseURL, data)
            .catch(err => { return err.response })
        return res
    },
    updateAccount: async (data) => {
        const res = DatabaseClient.put("/" + baseURL + "/" + data._id, data)
            .catch(err => { return err.response })
        return res
    },
}
export default accountApi
import DatabaseClient from './baseAPI.js'

const EmailApi = {
    sendVerify: async(option) => {
        const res = await DatabaseClient.post('sendMail/verify', {
            to: option.to,
            subject: option.subject,
            text: option.text
        });
        return res.data
    },

}

export default EmailApi
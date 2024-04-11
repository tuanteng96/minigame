import http from "./http"

const ContactAPI = {
    send: (body) =>
        http.post('/api/v3/contact23@sendJson', JSON.stringify(body)),
    verify: (body) => http.post('/api/v3/contact23@checkContact', JSON.stringify(body))
}

export default ContactAPI
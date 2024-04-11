import http from "./http"

const BannersAPI = {
    getName: (name) =>
        http.get(`/app/index.aspx?cmd=adv&pos=${name}`),
}

export default BannersAPI
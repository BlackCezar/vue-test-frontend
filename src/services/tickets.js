import API from "./api";

export default class Tickets {
    async list(params) {
        return await API.getRequest('/api/tickets', params)
    }
}
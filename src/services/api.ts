import axios from 'axios'
import { SearchParams } from '@/models/SearchType'


export default class API {
    static getRequest(url: string, params?: SearchParams) {
        if (params) {
            let qs = ''
            let key: keyof SearchParams
            for (key in params) {
                qs += `${key}=${params[key]}`
                qs += '&'
            }
            if (qs) url += `?${qs}`
        }
        return axios(url).then(response => response.data)
    }
}
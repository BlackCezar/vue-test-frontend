import axios from 'axios'
import { Filters, SearchParams } from '@/models/SearchType'
import {stringify} from 'query-string'

export default class API {
    static getRequest(url: string, params?: SearchParams) {
        if (params) {
            let qs = ''
            if (params.filters) {
                const filters = params.filters as Filters
                console.dir(filters.company)
                qs = stringify({
                    ...params,
                    filters: JSON.stringify(filters)
                })
            } else qs = stringify(params)
           
           
            if (qs) url += `?${qs}`
        }
        return axios(url).then(response => response.data)
    }
}
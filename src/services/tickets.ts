import Company from "@/models/Company";
import { SearchParams } from "@/models/SearchType";
import Ticket from "@/models/Ticket";
import API from "./api";

export default class Tickets {
    async list(params: SearchParams): Promise<Ticket[]> {
        return await API.getRequest('/api/tickets', params)
    }
    async companies(): Promise<Company[]> {
        return await API.getRequest('/api/companies')
    }
    getCompanyImage(id: string): string {
        return `/api/companies/${id}/image`
    }
}
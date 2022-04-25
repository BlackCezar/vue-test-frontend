import { ComputedRef } from "vue"

export enum SearchType {
    Cheapest = 'Cheapest', Fastest = 'Fastest', Optimal = 'Optimal'
}

export interface SearchParams {
    limit: string | number,
    skip?: number,
    sort?: SearchType,
    filters: Filters | ComputedRef<Filters>
}

export type Filters = {
    transferCounts: number[]
    company: any
}
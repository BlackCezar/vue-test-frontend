export enum SearchType {
    Cheapest = 'Cheapest', Fastest = 'Fastest', Optimal = 'Optimal'
}

export interface SearchParams {
    limit: string | number,
    sort?: SearchType
}

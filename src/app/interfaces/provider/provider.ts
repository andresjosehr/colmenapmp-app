import { Paginator } from "../paginator/paginator";

export interface Provider {
    id: number,
    name: string,
    region_id: number,
    created_at: string,
    updated_at: string
}


export interface ProvidersPaginated extends Paginator {
    data: Array<Provider>
}
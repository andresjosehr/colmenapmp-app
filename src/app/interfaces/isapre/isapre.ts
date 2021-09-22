import { Paginator } from "../paginator/paginator";

export interface Isapre {
    id?: number,
    name: string,
    logo: string,
    ges: number,
    show_for_seek: number,
    created_at?: string,
    updated_at?: string
}


export interface IsapresPaginated extends Paginator {
    data: Array<Isapre>
}


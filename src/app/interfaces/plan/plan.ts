import { Isapre } from "../isapre/isapre";
import { Paginator, SimplePaginator } from "../paginator/paginator";
import { PlanType } from "../planType/plan-type";

export interface Plan {
    id: number,
    code: string,
    name: string,
    description: string,
    isapre_id: number,
    base_factor: number,
    annual_limit: number,
    providers: Array<{
        id: number
        percentage_ambulatory: number | null
        percentage_hospitable: number | null
        plan_id: number
        provider_id: number
        provider_data: any,
        urgency_amount: number | null
        urgency_unit: string | null
        created_at: string | null
        updated_at: string | null

    }>,
    plan_type_id: number,
    uf_value: number,
    isapre?: Isapre,
    plan_type?: PlanType,
    price: number,
    created_at: string,
    updated_at: string
}


export interface PlanPaginated extends Paginator {
    data: Array<Plan> | null
}

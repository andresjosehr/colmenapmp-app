import { Region } from "../region/region";
import { Provider } from "../provider/provider";
import { PlanType } from "../planType/plan-type";
import { Isapre } from "../isapre/isapre";
import { SuscriptionPrice } from "../suscriptionPrice/suscription-price";

export interface SearchData {
    regions          : Array<Region>,
    providers        : Array<Provider>,
    planTypes        : Array<PlanType>,
    isapres          : Array<Isapre>,
    suscriptionPrices: Array<SuscriptionPrice>,
}


export interface HttpGeneralResponse {
    message          : string,
    errorType        : string,
    response         : any
}

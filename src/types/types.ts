export interface ICurrency {
    id: string,
    symbol: string,
    description: string,
    decimal_places: number
}

export interface IAddress{
    state_id: string,
    state_name: string,
    city_id: string,
    city_name: string
}

export interface IPicture{
    id: string,
    url: string,
}


export interface IItem {
    id: string,
    currency_id: string,
    title:string,
    thumbnail:string,
    price: number,
    address: IAddress,
    condition?: string,
    sold_quantity?:number,
    pictures?: IPicture[],
}


export interface IItemDescription {
    plain_text: string,
}
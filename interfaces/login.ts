

export interface partner{
    id:string
    name:string
    logo:string
    country:string
    is_active:boolean
    email:string
    phone_number:string

}

// login interface
export interface login{
    id:number
    email:string
    role:string
    two_fa_active:boolean
    two_fa_channel:string
    is_active:boolean
    password_changed:boolean
    password_expires_on:boolean
    last_login:string
    partner:partner
}


// 2FA
export interface two_FA{
    qr_image:string
    secret:string
}

export interface two_FA_res{
    verified:boolean
}

// products
export interface product{
    id:string
    name:string
    product_code:string
    logo:string
    description:string
}

// account
export enum accountType{
    main,operational
}
export interface account{
    id:string
    balance:number
    currency:string
    name:string
    
}


// transaction
export interface transaction{
 id: string 
    sending_amount: number
    sending_currency: String
    receiving_amount: number
    receiving_currency: String
    charge: number
    rate: number
    reference: String
    sender_first_name: String
    sender_last_name: String
    sender_address: String 
    sender_source_of_funds: String 
    sender_id_type: String
    sender_id_number: String
    sender_id_other_type_name: String
    payout_channel_id: string,
    beneficiary_name: String
    beneficiary_account_type: String 
    beneficiary_account_number: String
    beneficiary_account_code: String
    created_at: string
    updated_at: string
    paid_on: string
}
export interface transactions{
 response:transaction[]  
}



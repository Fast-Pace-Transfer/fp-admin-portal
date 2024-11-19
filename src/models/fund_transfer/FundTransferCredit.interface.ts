/**
 * @name FundTransferCredit
 * @description
 * Describes the details of a fund transfer credit
 * @memberof FundTransferCredit
 * @property {number} id - The unique identifier of the fund transfer credit
 * @property {string} fp_transfer_reference - The reference for the fund transfer
 * @property {string} type - The type of transfer (e.g., individual, corporate)
 * @property {string} user_id - The unique identifier of the user associated with the transfer
 * @property {string} recipient_id - The unique identifier of the recipient
 * @property {string} payment_method_code - The code for the payment method
 * @property {string} payment_channel_code - The code for the payment channel
 * @property {any | null} payout_details - The details of the payout, if any
 * @property {string} sending_amount - The amount being sent
 * @property {string} sending_currency - The currency of the amount being sent
 * @property {string} fee - The fee for the transfer
 * @property {string} rate - The exchange rate for the transfer
 * @property {string} receiving_currency - The currency in which the recipient receives the amount
 * @property {string} receiving_amount - The amount received by the recipient
 * @property {string} processor - The processor handling the transfer
 * @property {string} processor_reference - The reference provided by the processor
 * @property {string} processor_response - The response from the processor
 * @property {string} status - The status of the transfer (e.g., pending, completed, failed)
 * @property {string} sending_reason - The reason for sending the funds
 * @property {any | null} sending_device_details - The details of the device used to send the funds, if any
 * @property {string} source_of_funds - The source of the funds being sent
 * @property {number} accept_conditions - Indicates whether the conditions were accepted (1 for accepted, 0 for not accepted)
 * @property {string} debit_payment_method_code - The code for the debit payment method
 * @property {string} processed_at - The timestamp when the transfer was processed
 * @property {string} acquirer_reference - The reference provided by the acquirer
 * @property {string} acquirer_response - The response from the acquirer
 * @property {any | null} corporate_product_id - The ID of the corporate product, if any
 * @property {string | null} deleted_at - The timestamp when the transfer was deleted, or null if not deleted
 * @property {string} created_at - The timestamp when the transfer was created
 * @property {string} updated_at - The timestamp when the transfer was last updated
 * @property {any | null} fund_transfer_debit - The details of the fund transfer debit, if any
 * @property {Recipient | null} individual_recipient - The details of the individual recipient, if any
 * @property {any | null} corporate_recipient - The details of the corporate recipient, if any
 * @property {any | null} corporate_product - The details of the corporate product, if any
 */
export interface FundTransferCredit {
    id: number;
    fp_transfer_reference: string;
    type: string;
    user_id: string;
    recipient_id: string;
    payment_method_code: string;
    payment_channel_code: string;
    payout_details: any | null;
    sending_amount: string;
    sending_currency: string;
    fee: string;
    rate: string;
    receiving_currency: string;
    receiving_amount: string;
    processor: string;
    processor_reference: string;
    processor_response: string;
    status: string;
    sending_reason: string;
    sending_device_details: any | null;
    source_of_funds: string;
    accept_conditions: number;
    debit_payment_method_code: string;
    processed_at: string;
    acquirer_reference: string;
    acquirer_response: string;
    corporate_product_id: any | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    fund_transfer_debit: any | null;
    individual_recipient: Recipient | null;
    corporate_recipient: any | null;
    corporate_product: any | null;
}

/**
 * @name Recipient
 * @description
 * Describes the details of a recipient
 * @memberof Recipient
 * @property {string} id - The unique identifier of the recipient
 * @property {string} user_id - The unique identifier of the user associated with the recipient
 * @property {string} name - The name of the recipient
 * @property {string} receiving_currency - The currency in which the recipient receives payments
 * @property {string} payment_method_code - The code for the payment method
 * @property {string} payment_channel_code - The code for the payment channel
 * @property {string} account_number - The account number of the recipient
 * @property {string} relationship - The relationship of the recipient to the user
 * @property {number} active - Indicates whether the recipient is active (1 for active, 0 for inactive)
 * @property {number} save - Indicates whether the recipient is saved (1 for saved, 0 for not saved)
 * @property {string | null} deleted_at - The deletion timestamp of the recipient, or null if not deleted
 * @property {string} created_at - The creation timestamp of the recipient
 * @property {string} updated_at - The last update timestamp of the recipient
 */
export interface Recipient {
    id: string;
    user_id: string;
    name: string;
    receiving_currency: string;
    payment_method_code: string;
    payment_channel_code: string;
    account_number: string;
    relationship: string;
    active: number;
    save: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}
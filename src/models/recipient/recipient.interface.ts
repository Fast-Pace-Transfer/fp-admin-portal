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
 * @property {any | null} customer - The customer information, or null if not available
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
    customer: any | null; // Adjust the type of customer if you have a specific interface for it
}
/**
 * @name FundTransferDebit
 * @description
 * Describes the details of a fund transfer debit
 * @memberof FundTransferDebit
 * @property {string} id - The unique identifier of the fund transfer debit
 * @property {string} fp_acquirer_reference - The reference for the acquirer
 * @property {string} user_id - The unique identifier of the user associated with the transfer
 * @property {string} fund_transfer_credit_id - The unique identifier of the associated fund transfer credit
 * @property {string} debit_payment_method_code - The code for the debit payment method
 * @property {string | null} debit_payment_channel_code - The code for the debit payment channel, or null if not applicable
 * @property {string | null} account_number - The account number, or null if not applicable
 * @property {string} amount - The amount being debited
 * @property {string} currency - The currency of the amount being debited
 * @property {string} acquirer - The acquirer handling the debit
 * @property {string | null} acquirer_reference - The reference provided by the acquirer, or null if not applicable
 * @property {string} acquirer_response - The response from the acquirer
 * @property {string} status - The status of the debit (e.g., pending, processed, failed)
 * @property {string} processed_at - The timestamp when the debit was processed
 * @property {string} created_at - The timestamp when the debit was created
 * @property {string} updated_at - The timestamp when the debit was last updated
 */
export interface FundTransferDebit {
    id: string;
    fp_acquirer_reference: string;
    user_id: string;
    fund_transfer_credit_id: string;
    debit_payment_method_code: string;
    debit_payment_channel_code: string | null;
    account_number: string | null;
    amount: string;
    currency: string;
    acquirer: string;
    acquirer_reference: string | null;
    acquirer_response: string;
    status: string;
    processed_at: string;
    created_at: string;
    updated_at: string;
}
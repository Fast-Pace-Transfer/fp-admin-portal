/**
 * @name Transaction Statistics
 * @description
 * Describes the details of a transaction
 * @memberof Transaction
 * @property {string} id
 * @property {string} account_id
 * @property {string} partner_id
 * @property {string} reference
 * @property {number} amount
 *  @property {string} currency
 * @property {string} status
 * @property {string} sender_name
 * @property {string | null} sender_email
 * @property {string | null} sender_phone_number
 * @property {string} sender_address
 * @property {string} sender_source_of_funds
 * @property {string | null} sending_reason
 * @property {string} sender_id_number
 * @property {string} sender_id_type
 * @property {string} sender_id_issuing_country
 * @property {string} sender_id_issue_date
 * @property {string} sender_id_expiry_date
 * @property {string | null} sender_id_other_type_name
 * @property {string} transaction_type
 * @property {string} beneficiary_name
 * @property {string} phone_number
 * @property {string} network
 * @property {string} channel
 * @property {string} bank_code
 * @property {string} bank_account_number
 * @property {string} otc_code
 * @property {string} paid_on
 * @property {string} created_at
 * @property {Object} account
 * @memberof account
 * @property {string} id
 * @property {string} currency
 * @property {string} name
 * @property {Object} partner
 * @memberof partner
 * @property {string} id
 * @property {string} name
 */
export interface TransactionStatistics {
  dailycount: number;
  monthlycount: number;
  weeklycount: number;
}

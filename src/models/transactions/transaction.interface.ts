/**
 * @name Transactions
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
export interface Transaction {
  id: string;
  account_id: string;
  partner_id: string;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  sender_name: string;
  sender_email: string | null;
  sender_phone_number: string | null;
  sender_address: string;
  sender_source_of_funds: string;
  sending_reason: string | null;
  sender_id_number: string;
  sender_id_type: string;
  sender_id_issuing_country: string;
  sender_id_issue_date: string;
  sender_id_expiry_date: string | null;
  sender_id_other_type_name: string | null;
  transaction_type: string;
  beneficiary_name: string;
  phone_number: string;
  network: string;
  channel: string;
  bank_code: string;
  bank_account_number: string;
  otc_code: string;
  paid_on: string;
  created_at: string;
  account: {
    id: string;
    currency: string;
    name: string;
  };
  partner: {
    id: string;
    name: string;
  };
}

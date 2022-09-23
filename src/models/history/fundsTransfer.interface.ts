/**
 * @name FundsTransferInterface
 * @description Describes the details of a funds transfer
 * @property {string} id - The unique identifier of the funds transfer
 * @property {string} debit_account_id - The unique identifier of the debit account
 * @property {string} credit_account_id - The unique identifier of the credit account
 * @property {number} debit_amount - The amount to be debited
 * @property {number} credit_amount - The amount to be credited
 * @property {number} rate - The rate of the funds transfer
 * @property {string} status - The status of the funds transfer
 * @property {string} created_at - The date the funds transfer was created
 * @property {string} updated_at - The date the funds transfer was last updated
 * @property {number} requested_by - The data of the user who requested the funds transfer
 * @property {string} reference - The reference of the funds transfer
 * @property {Object} pre_fund_account - The data of the pre-fund account
 * @property {string} pre_fund_account_id - The unique identifier of the pre-fund account
 * @property {string} pre_fund_account_currency - The currency of the pre-fund account
 * @property {balance} pre_fund_account_balance - The balance of the pre-fund account
 * @property {Object} operations_account - The data of the operations account
 * @property {string} operations_account_id - The unique identifier of the operations account
 * @property {string} operations_account_currency - The currency of the operations account
 * @property {balance} operations_account_balance - The balance of the operations account
 * @property {Object} user - The data of the user
 * @property {number} id - The unique identifier of the user
 * @property {string} email - The email of the user
 */

export interface FundsTransferInterface {
  id: string;
  debit_account_id: string;
  credit_account_id: string;
  debit_amount: number;
  credit_amount: number;
  rate: number;
  status: string;
  created_at: string;
  updated_at: string;
  requested_by: number;
  reference: string;
  pre_fund_account: {
    id: string;
    currency: string;
    balance: number;
  };
  operations_account: {
    id: string;
    currency: string;
    balance: number;
  };
  user: {
    id: number;
    email: string;
  };
}

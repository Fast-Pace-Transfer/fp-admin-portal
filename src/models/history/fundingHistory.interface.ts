/**
 * @name FundingHistoryInterface
 * @description Describes the details of a funding history
 * @property {string} id - The unique identifier of the funding history
 * @property {string} account_id - The unique identifier of the account
 * @property {number} amount - The amount of the funding history
 * @property {string} reference - The reference of the funding history
 * @property {string} description - The description of the funding history
 * @property {string | null} receipt - The receipt of the funding history
 * @property {number} requested_by - The data of the user who requested the funding history
 * @property {string} funding_type - The type of funding
 * @property {string} status - The status of the funding history
 * @property {string} rejection_message - The rejection reason,
 * @property {string} created_at - The date the funding history was created
 * @property {string} updated_at - The date the funding history was last updated
 * @property {Object} account - The data of the account
 * @property {string} id - The unique identifier of the account
 * @property {string} currency - The currency of the account
 * @property {string} balance - The balance of the account
 */

export interface FundingHistoryInterface {
  id: string;
  account_id: string;
  amount: number;
  reference: string;
  description: string;
  receipt: string | null;
  requested_by: number;
  funding_type: string;
  status: string;
  created_at: string;
  rejection_message: string;
  updated_at: string;
  account: {
    id: string;
    currency: string;
    balance: number;
  };
}

/**
 * @name AccountInterface
 * @description Describes the details of an account
 * @property {string} id - The unique identifier of the account
 * @property {string} currency - The currency of the account
 * @property {string} partner_id - The unique identifier of the partner
 * @property {string | null} name - The name of the account
 * @property {string} symbol - The currency symbol of the account
 * @property {number} balance - The balance of the account
 * @property {string} type - The type of the account
 * @property {string} is_active - The status of the account
 * @property {string} created_at - The date the account was created
 * @property {string} updated_at - The date the account was last updated
 * @property {Object} partner - The data of the partner
 * @memberof partner
 * @property {string} id - The unique identifier of the partner
 * @property {string} name - The name of the partner
 */

export interface AccountInterface {
  id: string;
  currency: string;
  partner_id: string;
  name: string | null;
  symbol: string;
  balance: number;
  type: string;
  is_active: string;
  created_at: string;
  updated_at: string;
  partner: {
    id: string;
    name: string;
  };
}

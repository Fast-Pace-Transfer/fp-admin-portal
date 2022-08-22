/**
 * @name transactionBatch
 * @description Interface for the transaction batch model.
 */

export interface transactionBatchInterface {
  id: number;
  batch_code: string;
  payout_country: string;
  payout_currency: string;
  amount: number;
  transaction_type: string;
  reference: string;
  bank_code: string;
  network: string;
  mobile_wallet: string;
  account_number: string;
  sending_reason: string;
  sending_country: string;
  sender_gender: string;
  sender_name: string;
  sender_address: string;
  sender_source_of_funds: string;
  sender_id_type: string;
  sender_id_number: string;
  sender_id_issue_date: string;
  sender_id_expiry_date: string;
  sender_id_country: string;
  sender_id_other_type_name: string;
  beneficiary_name: string;
  beneficiary_id_type: string;
  beneficiary_id_number: string;
  status: string;
  has_error: boolean;
  validation_error: string;
  batch: {
    id: number;
    batch_code: string;
    batch_file_url: string;
    total_transactions: number;
    error_transactions: number;
    failed_transactions: number;
    created_at: string;
  };
  created_at: string;
  updated_at: string;
}

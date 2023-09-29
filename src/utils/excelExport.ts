import ExcelJS from "exceljs";
import type { Transaction } from "@/models/transactions/transaction.interface"; // Import your transaction model

export async function exportTransactionsAsExcel(
  transactions: Transaction[]
): Promise<void> {
  // Create a new workbook and add a worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Transactions");

  // Define headers
  const headers = [
    "Date & Time",
    "Reference",
    "Transaction Type",
    "Channel",
    "Sender",
    "Recipient",
    "Account Number",
    "Amount",
    "Status",
  ];

  // Add headers to the worksheet
  worksheet.addRow(headers);

  // Add transaction data to the worksheet
  transactions.forEach((transaction) => {
    const row = [
      new Date(transaction.created_at).toLocaleString(),
      transaction.reference,
      transaction.transaction_type,
      transaction.channel,
      transaction.sender_name,
      transaction.beneficiary_name,
      transaction.transaction_type === "bank"
        ? transaction.bank_account_number
        : transaction.phone_number,
      `${transaction.currency} ${transaction.amount}`,
      transaction.status,
    ];
    worksheet.addRow(row);
  });

  // Create a blob containing the Excel data
  const blob = await workbook.xlsx.writeBuffer();

  // Create a URL for the blob
  const blobURL = window.URL.createObjectURL(new Blob([blob]));

  // Create a link element and trigger the download
  const link = document.createElement("a");
  link.href = blobURL;
  link.download = "transactions.xlsx";
  link.click();
}

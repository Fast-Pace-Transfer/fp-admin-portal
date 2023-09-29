<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_transactions">
        <!-- Stats -->
        <!-- s -->
        <!-- End of Stats -->
        <!-- Transaction history table -->
        <div class="transaction_history_table_layout">
          <div class="transaction_history_table">
            <div class="transaction_history_table_header">
              <h2>Transactions</h2>
              <div class="search_box_and_download">
                <div class="search_box">
                  <label for="search">Search: </label>
                  <input type="text" id="search" v-model="keyword" />
                </div>
                <!-- <div class="download_button">
                  <button @click="downloadTransactionsReport()">
                    Download
                  </button>
                </div> -->
              </div>
            </div>
            <div class="table_container">
              <table>
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Reference</th>
                    <th>Transaction Type</th>
                    <th>Channel</th>
                    <th>Sender</th>
                    <th>Recipient</th>
                    <th>Account Number</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody v-if="filteredTransactions.length">
                  <tr
                    v-for="transaction in filteredTransactions"
                    :key="transaction.id"
                  >
                    <td>
                      {{
                        new Date(transaction.created_at)
                          .toLocaleDateString("en-US", options)
                          .replace("/", "-")
                          .replace("/", "-")
                          .replace(",", " ")
                      }}
                    </td>
                    <td>{{ transaction.reference }}</td>
                    <td>{{ transaction.transaction_type }}</td>
                    <td>{{ transaction.channel }}</td>
                    <td>{{ transaction.sender_name }}</td>
                    <td>{{ transaction.beneficiary_name }}</td>
                    <td>
                      {{
                        transaction.transaction_type === "bank"
                          ? transaction.bank_account_number
                          : transaction.phone_number
                      }}
                    </td>
                    <td>{{ transaction.currency }} {{ transaction.amount }}</td>
                    <td
                      class="status success"
                      v-if="transaction.status === 'processed'"
                    >
                      <span>{{ transaction.status }}</span>
                    </td>
                    <td
                      class="status pending"
                      v-if="transaction.status === 'pending'"
                    >
                      <span>{{ transaction.status }}</span>
                    </td>
                    <td
                      class="status error"
                      v-if="transaction.status === 'cancelled'"
                    >
                      <span>{{ transaction.status }}</span>
                    </td>
                    <td
                      class="status error"
                      v-if="transaction.status === 'failed'"
                    >
                      <span>{{ transaction.status }}</span>
                    </td>
                    <td>
                      <button
                        @click="goToViewTransaction(transaction.id)"
                        class="view-individual-transaction-button"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="9" style="text-align: center">
                      No transaction data found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Actual table -->
          </div>
        </div>
        <!-- Transaction history table -->
      </div>
    </section>
    <!-- End of Content -->
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref, onMounted } from "vue";
import type { Transaction } from "@/models/transactions/transaction.interface";
import PageLoader from "@/components/common/PageLoader.vue";
import SidebarView from "@/components/common/SidebarView.vue";
// import { exportTransactionsAsExcel } from "@/utils/excelExport";
import NavbarView from "@/components/common/NavbarView.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { handleAPIError } from "@/utils/handleAPIError";

const options: Intl.DateTimeFormatOptions = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "numeric",
  second: "numeric",
};

// Initial value for transactions
const transactions = ref<Transaction[]>([]);

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Go To View Transactions page
const goToViewTransaction = (id: string) => {
  router.push({
    name: "view-transactions",
    params: { id: id },
  });
};

// Search keyword
const keyword = ref("");

// Initializing filtered transactions
const filteredTransactions = computed(() => {
  let filteredData = transactions.value;

  if (keyword.value) {
    filteredData = searchTransactions(keyword.value);
  }

  return filteredData;
});

function searchTransactions(keyword: string | number): Transaction[] {
  const searchKeyword = String(keyword).toLowerCase();

  return filteredTransactions.value.filter((transaction) => {
    const transactionPropertiesToSearch = [
      transaction.reference,
      transaction.amount,
      transaction.sender_address,
      transaction.sender_name,
      transaction.sender_phone_number,
      transaction.sender_email,
      transaction.beneficiary_name,
      transaction.bank_account_number,
      transaction.network,
      transaction.status,
      transaction.phone_number,
    ];

    return transactionPropertiesToSearch.some((property) => {
      const propertyValue = String(property).toLowerCase();
      return propertyValue.includes(searchKeyword);
    });
  });
}

// Download report
// const downloadTransactionsReport = () => {
//   exportTransactionsAsExcel(filteredTransactions.value);
// };

// Get transactions when component is mounted
onMounted(() => {
  // Set loading status to true
  store.dispatch("isLoading");

  // Get transactions
  axios
    .get("/transactions", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      // Set loading status to false
      store.dispatch("isLoading");

      // Set transactions
      transactions.value = response.data.data.transactions;
    })
    .catch((error) => {
      // Set loading status to false
      store.dispatch("isLoading");

      // Set error
      handleAPIError(error);
    });
});
</script>

<style>
.layout_dashboard {
  height: 100vh;
  display: flex;
}

.layout_dashboard .layout_dashboard_content {
  background: #f6f8fa;
  width: calc(100% - 15.625rem);
  height: 100%;
}

/* Inner Content CSS */

.layout_dashboard_content .dashboard_inner_content_transactions {
  margin-top: 5rem;
  padding: 0 1.875rem;
}

/* Stats CSS*/
.total_statistics_layout {
  display: flex;
  justify-content: center;
}

.total_statistics {
  width: 90%;
}

/* End of Stats CSS*/

/* Table CSS */
.transaction_history_table_layout {
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.transaction_history_table_layout .transaction_history_table {
  width: 90%;
}

.transaction_history_table_layout .transaction_history_table_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.transaction_history_table_layout
  .transaction_history_table_header
  .search_box_and_download {
  display: flex;
  align-items: center;
  gap: 20px;
}

.transaction_history_table_layout
  .transaction_history_table_header
  .search_box_and_download
  button {
  border-style: none;
  height: 35px;
  font-size: 14px;
  padding: 5px 15px;
  color: white;
  background: var(--primary-color);
  cursor: pointer;
}

.transaction_history_table_layout
  .transaction_history_table_header
  .search_box {
  font-size: 16px;
  line-height: 1.42857143;
  color: #333;
  font-weight: normal;
}

.transaction_history_table_layout
  .transaction_history_table_header
  .search_box
  input {
  height: 35px;
  font-size: 16px;
  padding-left: 15px;
}

.transaction_history_table_layout
  .transaction_history_table_header
  .search_box
  input:focus {
  outline: none;
}

.transaction_history_table_layout .transaction_history_table_header h2 {
  color: #423e3b;
}

.transaction_history_table_layout
  .transaction_history_table_header
  .filter_fields_layout {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3rem;
  gap: 30px;
  width: 80%;
}

.transaction_history_table_layout
  .transaction_history_table_header
  .filter_fields_layout
  .filter_fields
  select {
  padding: 8px 13px;
  background: #fff;
  border: 1px solid #e9e9f0;
  color: rgba(21, 30, 63, 0.5);
  font-size: 13px;
}

.transaction_history_table_layout
  .transaction_history_table_header
  .filter_fields_layout
  .filter_fields
  select:focus {
  outline: none;
}

.transaction_history_table_layout
  .transaction_history_table_header
  .filter_fields_layout
  .filter_fields
  select:first-of-type {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.transaction_history_table_layout
  .transaction_history_table_header
  .filter_fields_layout
  .filter_fields
  select:last-of-type {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.transaction_history_table_layout
  .transaction_history_table_header
  .filter_fields_layout
  .filter_fields {
  display: flex;
  color: #151e3f;
}

.transaction_history_table .table_container {
  background: #fff;
  border-radius: 10px;
  padding: 30px 15px;
  margin-top: 30px;
  max-height: 780px;
  overflow-x: scroll;
}

.transaction_history_table table {
  width: 100%;
  border-collapse: collapse;
  padding: 20px 10px;
}

.transaction_history_table table thead tr {
  border-bottom: 2px solid #d7dbec;
  text-align: left;
}

.transaction_history_table table thead tr th {
  color: #423e3b;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  padding-bottom: 5px;
}

.transaction_history_table table tbody tr {
  border-bottom: 2px solid #d7dbec;
  color: #423e3b;
  text-align: left;
}

.transaction_history_table table tbody tr:last-of-type {
  border-bottom: none;
}

.transaction_history_table table td {
  padding: 15px 0;
}

.view-individual-transaction-button {
  border: none;
  padding: 7px 15px;
  cursor: pointer;
  background: var(--primary-color);
  color: #fff;
}

.status span {
  border-radius: 5px;
  padding: 5px 10px;
  color: #2dfd1c;
}

.status.success span {
  color: #2dfd1c;
  background: #2dfd1c1a;
}

.status.error span {
  color: #fd1c25;
  background: #fd1c251a;
}

.status.pending span {
  color: #fdc91c;
  background: #fdc91c1a;
}

/* End of Table CSS */

/* Media Queries */
@media screen and (min-width: 37.5rem) and (max-width: 64rem) {
  .layout_dashboard_content .dashboard_inner_content_transactions {
    padding: 0 0.4rem;
  }
}
</style>

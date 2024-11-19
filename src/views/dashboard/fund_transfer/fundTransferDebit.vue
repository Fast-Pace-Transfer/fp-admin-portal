<template>
  <div class="layout_dashboard">
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content">
        <div class="main_container">
          <div class="card">
            <h2>Fund Transfer Debits</h2>

            <table class="fund-transfer-debits-table">
              <thead>
                <tr>
                  <th>Acquirer Reference</th>
                  <th>User ID</th>
                  <th>Fund Transfer Credit ID</th>
                  <th>Debit Payment Method</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Acquirer</th>
                  <th>Status</th>
                  <th>Processed At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="debitTransfer in fundTransferDebits" :key="debitTransfer.id">
                  <td data-label="Acquirer Reference">{{ debitTransfer.fp_acquirer_reference }}</td>
                  <td data-label="User ID">{{ debitTransfer.user_id }}</td>
                  <td data-label="Fund Transfer Credit ID">{{ debitTransfer.fund_transfer_credit_id }}</td>
                  <td data-label="Debit Payment Method">{{ debitTransfer.debit_payment_method_code }}</td>
                  <td data-label="Amount">{{ debitTransfer.amount }}</td>
                  <td data-label="Currency">{{ debitTransfer.currency }}</td>
                  <td data-label="Acquirer">{{ debitTransfer.acquirer }}</td>
                  <td data-label="Status">{{ debitTransfer.status }}</td>
                  <td data-label="Processed At">{{ debitTransfer.processed_at }}</td>
                  <td data-label="Actions">
                    <button >View</button>
                    <button >Edit</button>
                    <button>Reprocess</button>
                    <button>Status Check</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    <!-- End of Content -->
  </div>
</template>


<style scoped>
.fund-transfer-debits-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
}

.fund-transfer-debits-table th, .fund-transfer-debits-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.fund-transfer-debits-table th {
  background-color: #f4f4f4;
}

.fund-transfer-debits-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.fund-transfer-debits-table tr:hover {
  background-color: #f1f1f1;
}

.fund-transfer-debits-table button {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 3px;
}

.fund-transfer-debits-table button:hover {
  background-color: #0056b3;
}
</style>


<style>
.main_container {
width: 100%;
overflow-x: auto;
}

.card {
background-color: #fff;
padding: 20px;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
margin: 20px;
}

.card h2 {
margin-bottom: 20px;
}

.customers-table {
width: 100%;
border-collapse: collapse;
font-size: 16px;
text-align: left;
}

.customers-table th, .customers-table td {
padding: 12px 15px;
border: 1px solid #ddd;
}

.customers-table th {
background-color: #f4f4f4;
}

.customers-table tr:nth-child(even) {
background-color: #f9f9f9;
}

.customers-table tr:hover {
background-color: #f1f1f1;
}

.customers-table button {
padding: 5px 10px;
margin: 0 5px;
border: none;
background-color: #007bff;
color: white;
cursor: pointer;
border-radius: 3px;
}

.customers-table button:hover {
background-color: #0056b3;
}

@media screen and (max-width: 768px) {
.customers-table thead {
  display: none;
}

.customers-table, .customers-table tbody, .customers-table tr, .customers-table td {
  display: block;
  width: 100%;
}

.customers-table tr {
  margin-bottom: 15px;
}

.customers-table td {
  text-align: right;
  padding-left: 50%;
  position: relative;
}

.customers-table td::before {
  content: attr(data-label);
  position: absolute;
  left: 0;
  width: 50%;
  padding-left: 15px;
  font-weight: bold;
  text-align: left;
}
}

.layout_dashboard {
height: 100vh;
display: flex;
}

.layout_dashboard .layout_dashboard_content {
background: #f6f8fa;
width: calc(100% - 15.625rem);
min-height: 100vh;
margin-left: 15.625rem;
}

.dashboard_inner_content {
margin-top: 5rem;
padding: 0 1.875rem;
display: flex;
gap: 10%;
}

@media screen and (min-width: 37.5rem) and (max-width: 64rem) {
.layout_dashboard_content .dashboard_inner_content {
  flex-direction: column;
  gap: 50px;
}

.layout_dashboard_content
  .dashboard_inner_content
  .dashboard_inner_left_column_content {
  width: 100%;
}

.layout_dashboard_content
  .dashboard_inner_content
  .dashboard_inner_right_column_content {
  width: 100%;
}
}
</style>

<script setup lang="ts">
import type { AccountInterface } from "@/models/accounts/account.interface";
import type { Customer } from "@/models/customer/customer.interface";
import type { Recipient } from "@/models/recipient/recipient.interface";
import { useStore } from "vuex";
import { computed, ref, onMounted, watch } from "vue";
import axios from "axios";
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "@/components/common/NavbarView.vue";
import WalletView from "@/components/common/WalletView.vue";
import GraphContainer from "@/components/GraphContainer.vue";
import StatsCard from "@/components/common/StatsCard.vue";
import { handleAPIError } from "@/utils/handleAPIError";
import { capitalizeFirstLetterInEachWord } from "@/utils/capitalizeFirstLetter";
import { removeSpecialCharacters } from "@/utils/removeSpecialCharacters";
import type { TransactionStatistics } from "@/models/transactions/transactionStatistics.interface";
import { FundTransferDebit } from "@/models/fund_transfer/FundTransferDebit.interface";


// Initialize store
const store = useStore();

// Get token
const token = computed(() => store.getters.getToken);

// Get indicative rate
const indicative_rate = ref(null);

// Get operational account currency
const operational_account_currency = computed(
  () => store.getters.getOperationalAccount[0]
);

const user = computed(() => store.getters.getUser);

// Initial values for operational accounts
const operationalAccount = ref<AccountInterface[]>([]);

// Initial values for prefunding accounts
const prefundingAccounts = ref<AccountInterface[]>([]);

const fundTransferDebits = ref<FundTransferDebit[]>();

function getFundTransferDebits (){
      return axios.get("/api/fund-transfer-debits/all", {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZDg0ZmUxNS1jODU5LTRiZWQtOTMwNS1kN2Y4MmM4MDBkZGYiLCJqdGkiOiJjMzcxNWIyMTAwNDg1OGY1YzMyOGFmOGQ2YTY5ZmY3MmJhMzA4YzE2ZWUwOTRkYWVhOGNjMmE3MTVjYzY4Y2ZlZDBkZjc5ZTA4NDI0NjQ3MiIsImlhdCI6MTczMTk0NjY3OC4xNTMzMTQsIm5iZiI6MTczMTk0NjY3OC4xNTMzMTYsImV4cCI6MTc2MzQ4MjY3OC4xNDY2NjMsInN1YiI6IjlkODRmOWYzLTNmOWYtNDE4OS1hODU0LTc0ODIyYmIzMjcxYSIsInNjb3BlcyI6W119.Hvl9JhKjZLyZhi9xefOBeJClYmOJyEwmjQAvwVDiykjxy6pkcTcGjhHmLZXw9KuyXdmyI3phv3SzYj0zq_XznhMI4c2i7n4d99I_8YvAv4n89g4J6c4e1gh4LPDzT3MTq8dkzhUei7b9eeo470YHVF5cXDsKrfKP7vPAvrzXmxEOPSH0j5FW9KBiBY73YQTVG_MValWT79i4K2dUQlFNLQh2k88duPP1WmrBugn6P7524u5dUpnFig_AVHPOL2NsCqTZjmzqnnaPquCm2yCDmRyxVq56rcXmMEp_gqRtNy_zUD_vNeSNFwFGciVgmBDB2TLNGkRQfMP0n3q2uZxYo18353aFA21D4vhN4CXhtzigYacaGZsgfnrjbF1NGqMQPfMcsJQlil5PghoKbp1aLbR-i-lcMblamK5AjRsQzIP6rfdkn40NKWYVT1y3cZC5ssVkM-r4W0pMvWpRpETNSK0pm8MHbAHqqw0y44rBy7kI7WuzIpR9jsKzjYSiLVr6VsJS09JuWx3cpwGoYbwac-8vGGG5GoTUacD-KsA47gxCfJ8VFfzwnQVB3XgBps_pOKZvGQ3OOJSAxW8oBEukPpQ1UZZok7_IRjGnI-5-PI9jhO1zJVYZTUQ25WC3pZdjU2O4KBPyQvZfPvdsu3JQluNGfWRtHGneYvkg2MbYZZo`,
      },
  });
};


// When component is mounted
onMounted(async () => {
  // Set loading status
  store.dispatch("isLoading");

  // Get prefunding accounts and transactions
  await Promise.all([
  //   getPrefundingAccounts(),
  //   getTransactions(),
  //   getOperationalAccounts(),
  //   getTransactionStatistics(),
   getFundTransferDebits(),
  ])
    .then(function (results) {
      // Stop loading status
      store.dispatch("isLoading");
      // Set prefunding accounts

      //prefundingAccounts.value = results[0].data.data;


      // Get rate
      // if (prefundingAccounts.value.length) {
      //   axios
      //     .get(
      //       `account-transfer/rate/${prefundingAccounts.value[0].currency}/${operational_account_currency.value.currency}`,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${token.value}`,
      //         },
      //       }
      //     )
      //     .then(function (response) {
      //       indicative_rate.value = response.data.data.rate;
      //     });
      // }
      // // Set transaction history
      fundTransferDebits.value = results[0].data.data;

      console.log(results[0].data.data)

    })
    .catch(function (error) {
      // Stop loading status
      store.dispatch("isLoading");

      // Handle error
      handleAPIError(error);
    });
});
</script>



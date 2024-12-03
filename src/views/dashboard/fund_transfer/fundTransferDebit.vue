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
                  <!-- <th>Account Number</th> -->
                  <th>Acquirer</th>
                  <th>Acquirer Reference</th>
                  <th>User ID</th>
                  <th>Fund Transfer Credit ID</th>
                  <th>Debit Payment Method</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Acquirer</th>
                  <th>Status</th>
                  <th>Created At</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="debitTransfer in fundTransferDebits" :key="debitTransfer.id">
                  <!-- <td data-label="Account Number">{{ debitTransfer.account_number }}</td> -->
                  <td data-label="Acquirer">{{ debitTransfer.acquirer }}</td>
                  <td data-label="Acquirer Reference">{{ debitTransfer.fp_acquirer_reference }}</td>
                  <td data-label="User ID">{{ debitTransfer.user_id }}</td>
                  <td data-label="Fund Transfer Credit ID">{{ debitTransfer.fund_transfer_credit_id }}</td>
                  <td data-label="Debit Payment Method">{{ debitTransfer.debit_payment_method_code }}</td>
                  <td data-label="Amount">{{ debitTransfer.amount }}</td>
                  <td data-label="Currency">{{ debitTransfer.currency }}</td>
                  <td data-label="Acquirer">{{ debitTransfer.acquirer }}</td>
                  <td data-label="Status">{{ debitTransfer.status }}</td>
                  <td data-label="Processed At">{{ debitTransfer.created_at }}</td>
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
import { useStore } from "vuex";
import { computed, ref, onMounted, watch } from "vue";
import axios from "axios";
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "@/components/common/NavbarView.vue";
import { handleAPIError } from "@/utils/handleAPIError";
import { FundTransferDebit } from "@/models/fund_transfer/FundTransferDebit.interface";


// Initialize store
const store = useStore();

// Get token
const token = computed(() => store.getters.getToken);

console.log(token);

// Get indicative rate
const indicative_rate = ref(null);

// Get operational account currency
// const operational_account_currency = computed(
//   () => store.getters.getOperationalAccount[0]
// );

const user = computed(() => store.getters.getUser);

const fundTransferDebits = ref<FundTransferDebit[]>();

function getFundTransferDebits (){
      return axios.get("/api/fund-transfer-debits/all", {
      headers: {
        Authorization: `Bearer ${token.value}`,
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



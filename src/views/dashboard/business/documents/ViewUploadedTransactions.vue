<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_view_uploaded_transaction_page">
        <!--View Uploaded Transaction Page -->
        <div class="view_uploaded_transaction_table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference</th>
                <th>Payout Country</th>
                <th>Channel Type</th>
                <th>Channel</th>
                <th>Source of funds</th>
                <th>Sending Reason</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="transactionBatch.length">
              <tr v-for="transaction in transactionBatch" :key="transaction.id">
                <td>{{ formatDate(transaction.created_at, false) }}</td>
                <td>{{ transaction.reference }}</td>
                <td>{{ transaction.payout_country }}</td>
                <td>
                  {{
                    capitalizeFirstLetterInEachWord(
                      transaction.transaction_type
                    )
                  }}
                </td>
                <td>
                  {{
                    transaction.transaction_type.toLowerCase().includes("bank")
                      ? transaction.bank_code
                      : transaction.network
                  }}
                </td>
                <td>
                  {{
                    capitalizeFirstLetterInEachWord(
                      transaction.sender_source_of_funds
                    )
                  }}
                </td>
                <td>
                  {{
                    capitalizeFirstLetterInEachWord(transaction.sending_reason)
                  }}
                </td>
                <td>
                  {{ transaction.payout_currency }}
                  {{ formatAmount(transaction.amount) }}
                </td>
                <td>
                  {{ capitalizeFirstLetterInEachWord(transaction.status) }}
                </td>
                <td>
                  <button
                    class="edit-transaction-button"
                    @click="goToEditTransactionPage(transaction.id)"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="9" style="text-align: center">
                  No transactions found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--View Uploaded Transaction Page  -->
      </div>
    </section>
    <!-- End of Content -->
  </div>
</template>

<script setup lang="ts">
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "@/components/common/NavbarView.vue";
import PageLoader from "@/components/common/PageLoader.vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { handleAPIError } from "@/utils/handleAPIError.js";
import { formatDate } from "@/utils/formatDate.js";
import { formatAmount } from "@/utils/formatAmount.js";
import type { transactionBatchInterface } from "@/models/business/transactionBatch";
import { capitalizeFirstLetterInEachWord } from "@/utils/capitalizeFirstLetter";

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Initialize route
const route = useRoute();

// Initialize transaction batch id
const id = route.params.id;

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Initialize transaction batch
const transactionBatch = ref<transactionBatchInterface[]>([]);

// Go to Edit Transaction page
const goToEditTransactionPage = (transactionId: number) => {
  router.push({
    name: "edit-uploaded-transaction",
    params: {
      transactionId: transactionId,
    },
  });
};

onMounted(() => {
  // Set loading status
  store.dispatch("isLoading");

  // Get transaction batch
  axios
    .get(`batch-items/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      // Stop loading status
      store.dispatch("isLoading");

      // Set transaction batch
      transactionBatch.value = response.data.data.items;
    })
    .catch((error) => {
      // Stop loading status
      store.dispatch("isLoading");

      // Handle error
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

.layout_dashboard_content
  .dashboard_inner_content_view_uploaded_transaction_page {
  margin-top: 3rem;
  padding: 0 1.875rem;
  display: flex;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
}

.layout_dashboard_content
  .dashboard_inner_content_view_uploaded_transaction_page
  .view_uploaded_transaction_table {
  width: 95%;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  padding: 30px 15px 10px 15px;
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.layout_dashboard_content
  .dashboard_inner_content_view_uploaded_transaction_page
  .view_uploaded_transaction_table
  table {
  width: 100%;
  border-collapse: collapse;
  padding: 20px 10px;
}

.layout_dashboard_content
  .dashboard_inner_content_view_uploaded_transaction_page
  .view_uploaded_transaction_table
  table
  thead
  tr {
  border-bottom: 2px solid #d7dbec;
  text-align: left;
}

.layout_dashboard_content
  .dashboard_inner_content_view_uploaded_transaction_page
  .view_uploaded_transaction_table
  table
  thead
  tr
  th {
  color: #423e3b;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  padding-bottom: 5px;
}

.layout_dashboard_content
  .dashboard_inner_content_view_uploaded_transaction_page
  .view_uploaded_transaction_table
  table
  tbody
  tr {
  border-bottom: 2px solid #d7dbec;
  color: #423e3b;
  text-align: left;
}

.layout_dashboard_content
  .dashboard_inner_content_view_uploaded_transaction_page
  .view_uploaded_transaction_table
  table
  tbody
  tr:last-of-type {
  border-bottom: none;
}

.layout_dashboard_content
  .dashboard_inner_content_view_uploaded_transaction_page
  .view_uploaded_transaction_table
  table
  td {
  padding: 15px 0;
}

.layout_dashboard_content
  .dashboard_inner_content_view_uploaded_transaction_page
  .view_uploaded_transaction_table
  table
  td
  .edit-transaction-button {
  border: none;
  padding: 10px 30px;
  border-radius: 3px;
  cursor: pointer;
  background: var(--primary-color);
  color: #fff;
}
</style>

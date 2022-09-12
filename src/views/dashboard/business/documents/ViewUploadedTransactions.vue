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
        <!-- Batch Description -->
        <div class="batch-description">
          <div class="batch-number-and-actions">
            <div class="batch-number-and-small-text">
              <p>
                Batch Number:&nbsp; <span>#{{ id }}</span>
              </p>
              <p>
                Review and edit the data, if any data entry is missing or
                inaccurate.
              </p>
            </div>
            <div class="batch-actions">
              <button class="process-button" @click="processBatch">
                <i class="fa-solid fa-arrows-rotate"></i>&nbsp;Process
              </button>
              <button class="delete-button" @click="deleteBatch">
                <i class="fa-solid fa-trash-can"></i>&nbsp;Delete
              </button>
            </div>
          </div>
          <div class="transactions-status">
            <div class="individual-statuses">
              <span
                >Total transactions:
                <span class="individual-status-value">{{
                  totalTransactions
                }}</span></span
              >
              <span
                >Successful Transactions:
                <span class="individual-status-value">0</span></span
              >
              <span
                >Failed Transactions:
                <span class="individual-status-value">{{
                  failedTransactions
                }}</span></span
              >
              <span
                >Upload Errors:
                <span class="individual-status-value">{{
                  uploadErrors
                }}</span></span
              >
            </div>
          </div>
        </div>
        <!-- End of Batch Description -->
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
            <tbody v-if="tableLoader">
              <tr>
                <td colspan="10">
                  <div class="table_loader_container">
                    <div class="loadingio-spinner-pulse-i4q5amfjxn">
                      <div class="ldio-1xxgpo4blwvi">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <p>Loading table data</p>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="transactionBatch.length">
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
                <td v-if="transaction.has_error">
                  <button
                    class="edit-transaction-button"
                    @click="goToEditTransactionPage(transaction.id)"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="backgroundLoading">
              <tr>
                <td colspan="9" style="text-align: center">
                  <p class="background-loading">
                    Transactions are still loading in the background.
                    <span @click="refreshPage" class="click-to-refresh"
                      >Click here to refresh after 30 seconds</span
                    >
                  </p>
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
        <div class="pagination-elements">
          <div class="number_of_entries">
            <span>
              Showing {{ paginationElements.startIndex }} to
              {{ paginationElements.endIndex }} of
              {{ paginationElements.total }} entries
              {{ paginationElements.currentPage <= 1 }}
            </span>
          </div>
          <div class="pagination_action">
            <button
              class="pagination_action_button"
              @click="goToPreviousPage"
              :disabled="paginationElements.currentPage === 1"
            >
              Previous
            </button>
            <button
              class="pagination_action_button"
              @click="goToNextPage"
              :disabled="
                paginationElements.currentPage >= paginationElements.totalPages
              "
            >
              Next
            </button>
          </div>
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
import { handleAPIError } from "@/utils/handleAPIError";
import { formatDate } from "@/utils/formatDate";
import { formatAmount } from "@/utils/formatAmount";
import type { transactionBatchInterface } from "@/models/business/transactionBatch";
import { capitalizeFirstLetterInEachWord } from "@/utils/capitalizeFirstLetter";
import { Toast } from "@/utils/toast";
import Swal from "sweetalert2";

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

// Initialize total transactions, error and failed transactions
const totalTransactions = ref(0);
const uploadErrors = ref(0);
const failedTransactions = ref(0);

// Set table loading status
const tableLoader = ref(false);

// Background loading
const backgroundLoading = ref(false);

// Set check processing status
const checkProcessing = ref(false);

// Refresh page
const refreshPage = () => {
  router.go(0);
};

// Go to Edit Transaction page
const goToEditTransactionPage = (transactionId: number) => {
  // Set checkProcessing to false
  if (checkProcessing.value) {
    checkProcessing.value = false;
  }
  // Go to edit page
  router.push({
    name: "edit-uploaded-transaction",
    params: {
      transactionId: transactionId,
    },
  });
};

// Get transaction batch items
const getTransactionBatchItems = async () => {
  tableLoader.value = true;
  await axios
    .get(`batch-items/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      params: {
        limit: 50,
      },
    })
    .then((response) => {
      // Stop loading status
      tableLoader.value = false;

      if (response.data.data.items.length) {
        console.log(response.data.data.items.length);
        // Set transaction batch
        transactionBatch.value = response.data.data.items;

        // Set pagination elements
        paginationElements.value = {
          currentPage: response.data.data.meta.current_page,
          totalPages: response.data.data.meta.total_pages,
          total: response.data.data.meta.total,
          startIndex:
            (response.data.data.meta.current_page - 1) *
              response.data.data.meta.count +
            1,
          endIndex:
            response.data.data.meta.current_page *
            response.data.data.meta.count,
          next_page_url: response.data.data.links.next,
          prev_page_url: response.data.data.links.prev,
        };
      } else {
        backgroundLoading.value = true;
      }
    })
    .catch((error) => {
      // Stop loading status
      tableLoader.value = false;

      // Handle error
      handleAPIError(error);
    });
};

// Get transaction batch
const getTransactionBatch = async () => {
  // Start loading status
  store.dispatch("isLoading");

  await axios
    .get(`batch-transaction/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      // Stop loading status
      store.dispatch("isLoading");

      // Set total transactions
      totalTransactions.value = response.data.data.total_transactions;

      // Set upload errors
      uploadErrors.value = response.data.data.error_transactions;

      // Set failed transactions
      failedTransactions.value = response.data.data.failed_transactions;
    })
    .catch((error) => {
      // Stop loading status
      store.dispatch("isLoading");

      // Handle error
      handleAPIError(error);
    });
};

// Initialize pagination elements
const paginationElements = ref({
  currentPage: 1,
  totalPages: 1,
  total: 0,
  startIndex: 0,
  endIndex: 0,
  next_page_url: "",
  prev_page_url: "",
});

// Go to next page
const goToNextPage = async () => {
  if (paginationElements.value.next_page_url) {
    // Start loading status
    store.dispatch("isLoading");
    await axios
      .get(paginationElements.value.next_page_url, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        params: {
          limit: 50,
        },
      })
      .then((response) => {
        // Stop loading status
        store.dispatch("isLoading");

        // Set transaction batch
        transactionBatch.value = response.data.data.items;

        // Set pagination elements
        paginationElements.value = {
          currentPage: response.data.data.meta.current_page,
          totalPages: response.data.data.meta.total_pages,
          total: response.data.data.meta.total,
          startIndex:
            (response.data.data.meta.current_page - 1) *
              response.data.data.meta.count +
            1,
          endIndex:
            response.data.data.meta.current_page *
            response.data.data.meta.count,
          next_page_url: response.data.data.links.next,
          prev_page_url: response.data.data.links.prev,
        };
      })
      .catch((error) => {
        // Stop loading status
        store.dispatch("isLoading");

        // Handle error
        handleAPIError(error);
      });
  }
};

// Go to previous page
const goToPreviousPage = async () => {
  if (paginationElements.value.prev_page_url) {
    // Start loading status
    store.dispatch("isLoading");
    await axios
      .get(paginationElements.value.prev_page_url, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        params: {
          limit: 50,
        },
      })
      .then((response) => {
        // Stop loading status
        store.dispatch("isLoading");

        // Set transaction batch
        transactionBatch.value = response.data.data.items;

        // Set pagination elements
        paginationElements.value = {
          currentPage: response.data.data.meta.current_page,
          totalPages: response.data.data.meta.total_pages,
          total: response.data.data.meta.total,
          startIndex:
            (response.data.data.meta.current_page - 1) *
              response.data.data.meta.count +
            1,
          endIndex:
            response.data.data.meta.current_page *
            response.data.data.meta.count,
          next_page_url: response.data.data.links.next,
          prev_page_url: response.data.data.links.prev,
        };
      })
      .catch((error) => {
        // Stop loading status
        store.dispatch("isLoading");

        // Handle error
        handleAPIError(error);
      });
  }
};

// Delete transaction batch
const deleteBatch = async () => {
  // Set loading status
  store.dispatch("isLoading");

  // Delete transaction batch
  await axios
    .delete(`batch-transaction/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then(() => {
      // Stop loading status
      store.dispatch("isLoading");

      // Show success message
      Swal.fire({
        title: "Success",
        text: "Transaction batch has been deleted",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirect to upload page
        router.push({
          name: "upload-documents",
        });
      });
    })
    .catch((error) => {
      // Stop loading status
      store.dispatch("isLoading");

      // Handle error
      handleAPIError(error);
    });
};

// Process transaction batch
const processBatch = async () => {
  // Set loading status
  store.dispatch("isLoading");

  // Process transaction batch
  await axios
    .post(
      `batch-transaction/process/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    .then((response) => {
      // Stop loading status
      store.dispatch("isLoading");

      // Show processing toast message
      Toast.fire({
        icon: "success",
        title: "Processing transaction batch",
      });

      // Set check processing status
      checkProcessing.value = true;
    })
    .catch((error) => {
      // Stop loading status
      store.dispatch("isLoading");

      // Handle error
      handleAPIError(error);
    });
};

// Check processing status of transaction batch at interval
const checkProcessingStatus = async () => {
  // Set loading status
  tableLoader.value = true;

  // Check processing status of transaction batch
  await axios
    .get(`batch-transaction/processing-status/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      // Stop loading status
      tableLoader.value = false;

      if (response.data.data.status === "processing") {
        // Show processing toast message
        Toast.fire({
          icon: "success",
          title: "Processing transaction batch",
        });

        // Get transaction batch
        getTransactionBatch();

        // Get transaction batch items
        getTransactionBatchItems();
      } else {
        checkProcessing.value = false;

        // Get transaction batch
        getTransactionBatch();

        // Get transaction batch items
        getTransactionBatchItems();

        //Show processed toast message
        Swal.fire({
          title: "Success",
          text: "Transaction batch successfully processed",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    })
    .catch((error) => {
      // Stop loading status
      store.dispatch("isLoading");

      // Handle error
      handleAPIError(error);
    });
};

onMounted(() => {
  // Get transaction batch items
  getTransactionBatchItems();

  // Get transaction batch
  getTransactionBatch();

  // Check processing status of transaction batch at interval
  setInterval(() => {
    if (checkProcessing.value) {
      checkProcessingStatus();
    }
  }, 10000);
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
  flex-direction: column;
  font-family: "Source Sans Pro", sans-serif;
}

.layout_dashboard_content
  .dashboard_inner_content_view_uploaded_transaction_page
  .view_uploaded_transaction_table {
  width: 95%;
  max-height: 600px;
  background: #fff;
  border-radius: 10px;
  padding: 30px 15px 10px 15px;
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: scroll;
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

/* Pagination Elements */
.pagination-elements {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
  padding: 10px;
}

.pagination-elements .number_of_entries {
  font-size: 17px;
  font-weight: bold;
}

.pagination-elements .pagination_action {
  display: flex;
  gap: 1.2rem;
  width: 12%;
}

.pagination-elements .pagination_action .pagination_action_button {
  background-color: #ffffff;
  border: 1px solid #dddddd;
  color: #373e4a;
  padding: 6px 12px;
  cursor: pointer;
}

.pagination-elements .pagination_action .pagination_action_button:disabled {
  cursor: not-allowed;
}

/* Batch Description */

.batch-description .batch-number-and-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.batch-description
  .batch-number-and-actions
  .batch-number-and-small-text
  p:first-of-type {
  font-family: "Lato", sans-serif;
  font-weight: 500;
  font-size: 25px;
}

.batch-description
  .batch-number-and-actions
  .batch-number-and-small-text
  p
  span {
  color: #a5a5a5;
}

.batch-description
  .batch-number-and-actions
  .batch-number-and-small-text
  p:last-of-type {
  font-family: "Roboto", sans-serif;
  color: #423e3b;
  font-size: 12px;
}

.batch-description .batch-actions {
  display: flex;
  gap: 20px;
}

.batch-description .batch-actions button {
  padding: 10px 25px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  font-size: 12px;
}

.batch-description .batch-actions .process-button {
  background: var(--primary-color);
  color: #fff;
}

.batch-description .batch-actions .delete-button {
  color: var(--primary-color);
  background: #fff;
}

/* Transaction Status */
.batch-description .transactions-status {
  background: #fff;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  padding: 15px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}

.batch-description .transactions-status .individual-statuses {
  background: #ebebeb5d;
  padding: 10px 20px;
  display: flex;
  gap: 20px;
  color: #939292;
}

.batch-description
  .transactions-status
  .individual-statuses
  .individual-status-value {
  color: #000;
}

/* Loading CSS */
/* Loading CSS */
@keyframes ldio-1xxgpo4blwvi-1 {
  0% {
    top: 18px;
    height: 64px;
  }
  50% {
    top: 30px;
    height: 40px;
  }
  100% {
    top: 30px;
    height: 40px;
  }
}
@keyframes ldio-1xxgpo4blwvi-2 {
  0% {
    top: 20.999999999999996px;
    height: 58.00000000000001px;
  }
  50% {
    top: 30px;
    height: 40px;
  }
  100% {
    top: 30px;
    height: 40px;
  }
}
@keyframes ldio-1xxgpo4blwvi-3 {
  0% {
    top: 24px;
    height: 52px;
  }
  50% {
    top: 30px;
    height: 40px;
  }
  100% {
    top: 30px;
    height: 40px;
  }
}
.ldio-1xxgpo4blwvi div {
  position: absolute;
  width: 12px;
}
.ldio-1xxgpo4blwvi div:nth-child(1) {
  left: 19px;
  background: #4953b2;
  animation: ldio-1xxgpo4blwvi-1 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation-delay: -0.2s;
}
.ldio-1xxgpo4blwvi div:nth-child(2) {
  left: 44px;
  background: #4953b2;
  animation: ldio-1xxgpo4blwvi-2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation-delay: -0.1s;
}
.ldio-1xxgpo4blwvi div:nth-child(3) {
  left: 69px;
  background: #4953b2;
  animation: ldio-1xxgpo4blwvi-3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation-delay: undefineds;
}

.loadingio-spinner-pulse-i4q5amfjxn {
  width: 100px;
  height: 100px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-1xxgpo4blwvi {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-1xxgpo4blwvi div {
  box-sizing: content-box;
}

.table_loader_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table_loader_container p {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Click to refresh */
.background-loading,
.click-to-refresh {
  font-size: 17px;
}

.click-to-refresh {
  font-weight: bold;
  color: var(--primary-color);
  cursor: pointer;
}
</style>

<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_browse_reports_page">
        <!--Generate Reports Page -->
        <div class="generate-reports-container">
          <h1>Transaction Report</h1>
          <form @submit.prevent="generateTransactionReport">
            <div class="input-elements-container">
              <div class="input-styling">
                <label for="start-date">Start Date</label>
                <input
                  type="date"
                  id="start-date"
                  v-model="transaction_report_state.start_date"
                />
              </div>
              <div class="input-styling">
                <label for="end-date">End Date</label>
                <input
                  type="date"
                  id="end-date"
                  v-model="transaction_report_state.end_date"
                />
              </div>
              <div class="input-styling">
                <label for="type-of-transaction">Transaction Type</label>
                <select
                  id="type-of-transaction"
                  v-model="transaction_report_state.type"
                >
                  <option value="">All</option>
                  <option value="mobile-wallet">Mobile Wallet</option>
                  <option value="bank">Bank</option>
                </select>
              </div>
              <div class="input-styling">
                <label for="status">Status</label>
                <select id="status" v-model="transaction_report_state.status">
                  <option value="">All</option>
                  <option value="processed">Processed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div class="button-styling">
                <button type="submit">Generate</button>
              </div>
            </div>
          </form>
        </div>
        <div class="generate-reports-container">
          <h1>Settlement Report</h1>
          <form @submit.prevent="generateSettlementReport">
            <div class="input-elements-container">
              <div class="input-styling">
                <label for="start-date">Start Date</label>
                <input
                  type="date"
                  id="start-date"
                  v-model="settlement_report_state.start_date"
                />
              </div>
              <div class="input-styling">
                <label for="end-date">End Date</label>
                <input
                  type="date"
                  id="end-date"
                  v-model="settlement_report_state.end_date"
                />
              </div>
              <div class="button-styling">
                <button type="submit">Generate</button>
              </div>
            </div>
          </form>
        </div>
        <!--Generate Reports Page  -->
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
import axios from "axios";
import Swal from "sweetalert2";
import { ref, computed, onMounted, reactive } from "vue";
import { handleAPIError } from "@/utils/handleAPIError";

// Initialize store
const store = useStore();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Get partner_id
const partner_id = computed(() => store.getters.getUser.partner.id);

// Initial state for form
const transaction_report_state = reactive({
  start_date: "",
  end_date: "",
  type: "",
  status: "",
});

const settlement_report_state = reactive({
  start_date: "",
  end_date: "",
});

// Generate reports
const generateReport = async (
  endpoint: string,
  requestData: {
    transaction_type?: string;
    status?: string;
    start_date: string;
    end_date: string;
  },
  reportName: string
) => {
  // Set loading status
  store.dispatch("isLoading");

  try {
    // Make request to generate reports
    const response = await axios.post(endpoint, requestData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      responseType: "blob",
    });

    // Stop loading status
    store.dispatch("isLoading");

    // Create a Blob from the response data
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Create an anchor element
    const a = document.createElement("a");

    // Set the href and download attributes with the report name
    a.href = blobUrl;
    a.download = `${reportName}.xlsx`;

    // Programmatically click the anchor element to trigger the download
    a.click();

    // Clean up by revoking the Blob URL after the download
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    // Stop loading state
    store.dispatch("isLoading");

    // Handle error
    handleAPIError(error);
  }
};

const generateTransactionReport = async () => {
  const endpoint = `export/transactions/${partner_id.value}`;
  const requestData = {
    transaction_type: transaction_report_state.type,
    status: transaction_report_state.status,
    start_date: transaction_report_state.start_date,
    end_date: transaction_report_state.end_date,
  };

  // Define the report name
  const reportName = `TRANSACTION-REPORT-${transaction_report_state.start_date} to ${transaction_report_state.end_date}`;

  await generateReport(endpoint, requestData, reportName);
};

const generateSettlementReport = async () => {
  const endpoint = `export/settlements/${partner_id.value}`;
  const requestData = {
    start_date: settlement_report_state.start_date,
    end_date: settlement_report_state.end_date,
  };

  // Define the report name
  const reportName = `SETTLEMENT-REPORT-${settlement_report_state.start_date} to ${settlement_report_state.end_date}`;

  await generateReport(endpoint, requestData, reportName);
};
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

.layout_dashboard_content .dashboard_inner_content_browse_reports_page {
  margin-top: 5rem;
  padding: 0 1.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  font-family: "Source Sans Pro", sans-serif;
}

/* Generate form styling */
.generate-reports-container {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 1px 3px #00000029;
  padding: 10px;
}

.generate-reports-container .input-elements-container {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.generate-reports-container h1 {
  font-weight: bold;
  font-size: 1.7rem;
  margin-bottom: 10px;
}

.generate-reports-container form {
  width: 100%;
  padding: 10px;
}

.generate-reports-container form .input-styling {
  display: flex;
  flex-direction: column;
  width: 20%;
}

.generate-reports-container form .input-styling label {
  font-size: 1rem;
  margin-bottom: 5px;
}

.generate-reports-container form .input-styling input,
.generate-reports-container form .input-styling select {
  height: 40px;
  padding-left: 10px;
  font-size: 1.1rem;
}

.generate-reports-container form .input-styling input:focus,
.generate-reports-container form .input-styling select:focus {
  outline: none;
}

.generate-reports-container form .button-styling {
  width: 20%;
  display: flex;
  align-items: flex-end;
}

.generate-reports-container form .button-styling button {
  width: 100%;
  border-style: none;
  height: 40px;
  cursor: pointer;
  font-size: 1.1rem;
  background: var(--primary-color);
  color: white;
  border-radius: 3px;
  margin-top: 10px;
}
</style>

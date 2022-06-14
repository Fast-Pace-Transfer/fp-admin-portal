<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_prefunding_account">
        <!-- List of accounts -->
        <div class="list_of_accounts">
          <div class="prefunded_account">
            <WalletView
              :wallet-object="prefundingAccounts"
              :title="'Prefund Account'"
              :type="'pre-fund'"
              :width="`500px`"
              :switchable="false"
              :background-color="`#4953B2`"
              :border-color="`#4953B2`"
              :show-request="true"
              :background-image="`url('src/assets/images/wallet.svg')`"
            />
          </div>
          <div class="operational_accounts">
            <WalletView
              :wallet-object="operationalAccounts[0]"
              :show-request="true"
              :title="`Operational Account - GHS`"
              :type="'operation'"
              :width="`500px`"
              :switchable="operationalAccounts.length > 1 ? true : false"
              :background-color="`#B24949`"
              :border-color="`#B24949`"
              :background-image="`url('src/assets/images/wallet_red.svg')`"
            />
          </div>
        </div>
        <!-- End of list of accounts -->
        <!-- Funding History Table -->
        <div class="table_layout">
          <div class="table">
            <div class="table_header">
              <h2>Funding History</h2>
              <div class="filter_fields_layout">
                <p>Filter by</p>
                <div class="filter_fields">
                  <select>
                    <option>Date</option>
                    <option>Amount</option>
                    <option>Type</option>
                  </select>
                  <select>
                    <option>Date</option>
                    <option>Amount</option>
                    <option>Type</option>
                  </select>
                  <select>
                    <option>Date</option>
                    <option>Amount</option>
                    <option>Type</option>
                  </select>
                  <select>
                    <option>Date</option>
                    <option>Amount</option>
                    <option>Type</option>
                  </select>
                  <select>
                    <option>Date</option>
                    <option>Amount</option>
                    <option>Type</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="table_container">
              <table>
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Reference</th>
                    <th>Amount Debited</th>
                    <th>Funding Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="history in fundingHistory" :key="history.id">
                    <td>
                      {{
                        new Date(history.created_at).toLocaleDateString(
                          "en-US",
                          options
                        )
                      }}
                    </td>
                    <td>{{ history.reference }}</td>
                    <td>{{ history.account.currency }} {{ history.amount }}</td>
                    <td
                      class="status success"
                      v-if="history.status === 'success'"
                    >
                      <span>{{ history.status }}</span>
                    </td>
                    <td
                      class="status pending"
                      v-if="history.status === 'pending'"
                    >
                      <span>{{ history.status }}</span>
                    </td>
                    <td class="status error" v-if="history.status === 'error'">
                      <span>{{ history.status }}</span>
                    </td>
                    <td><i class="fa-solid fa-circle-info"></i></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- End of Funding History Table -->
      </div>
    </section>
    <!-- End of Content -->
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import PageLoader from "@/components/common/PageLoader.vue";
import axios from "axios";
import Swal from "sweetalert2";
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "@/components/common/NavbarView.vue";
import WalletView from "@/components/common/WalletView.vue";

// Interface for wallets
interface PrefundAccount {
  id: string;
  partner_id: string;
  currency: string;
  balance: number;
  type: string;
  name: null | string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  partner: {
    id: string;
    name: string;
  };
}

interface OperationalAccount {
  id: string;
  partner_id: string;
  currency: string;
  balance: number;
  type: string;
  name: null | string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  partner: {
    id: string;
    name: string;
  }[];
}

// Interface for funding history
interface FundingHistory {
  id: string;
  account_id: string;
  amount: number;
  reference: string;
  description: string | null;
  funding_type: string;
  receipt: null | string;
  requested_by: number;
  status: string;
  created_at: string;
  updated_at: string;
  account: {
    id: string;
    currency: string;
    balance: number;
  };
}

const options: Intl.DateTimeFormatOptions = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "numeric",
  second: "numeric",
};

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Initial values for prefunding accounts
const prefundingAccounts = ref<PrefundAccount>();

// Initial values for operational accounts
const operationalAccounts = ref<OperationalAccount[]>([]);

// Initial values for funding history
const fundingHistory = ref<FundingHistory[]>([]);

// Get operational accounts
function getOperationalAccounts() {
  return axios.get("/accounts/operation", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}

// Get prefunding accounts
function getPrefundingAccounts() {
  return axios.get("/accounts/pre-fund", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}

// Get accounts history
function getAccountsHistory() {
  return axios.get("/account-funding/partner", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}

// When component is mounted
onMounted(async () => {
  // Run axios requests
  await store.dispatch("isLoading");
  await Promise.all([
    getPrefundingAccounts(),
    getOperationalAccounts(),
    getAccountsHistory(),
  ])
    .then(function (results) {
      store.dispatch("isLoading");
      prefundingAccounts.value = results[0].data.data;
      operationalAccounts.value = results[1].data.data;
      fundingHistory.value = results[2].data.data;
    })
    .catch(function (error) {
      if (error.response) {
        store.dispatch("isLoading");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.errors.join(" "),
        });
      }
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

.layout_dashboard_content .dashboard_inner_content_prefunding_account {
  margin-top: 5rem;
  padding: 0 5rem;
}

/* List of accounts */
.list_of_accounts {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.list_of_accounts .prefunded_account {
  width: 42%;
}

.list_of_accounts .operational_accounts {
  width: 42%;
}
/* End of list of accounts */

/* Funding History Table */
.table_layout {
  margin-top: 50px;
}

.table_layout .table_header {
  display: flex;
  align-items: center;
}

.table_layout .table_header h2 {
  color: #423e3b;
}

.table_layout .table_header .filter_fields_layout {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3rem;
  gap: 30px;
  width: 80%;
}

.table_layout .table_header .filter_fields_layout .filter_fields select {
  padding: 8px 13px;
  background: #fff;
  border: 1px solid #e9e9f0;
  color: rgba(21, 30, 63, 0.5);
  font-size: 13px;
}

.table_layout .table_header .filter_fields_layout .filter_fields select:focus {
  outline: none;
}

.table_layout
  .table_header
  .filter_fields_layout
  .filter_fields
  select:first-of-type {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.table_layout
  .table_header
  .filter_fields_layout
  .filter_fields
  select:last-of-type {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.table_layout .table_header .filter_fields_layout .filter_fields {
  display: flex;
  color: #151e3f;
}

.table .table_container {
  background: #fff;
  border-radius: 10px;
  padding: 30px 15px 10px 15px;
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.table table {
  width: 100%;
  border-collapse: collapse;
  padding: 20px 10px;
}

.table table thead tr {
  border-bottom: 2px solid #d7dbec;
  text-align: left;
}

.table table thead tr th {
  color: #423e3b;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  padding-bottom: 5px;
}

.table table tbody tr {
  border-bottom: 2px solid #d7dbec;
  color: #423e3b;
  text-align: left;
}

.table table tbody tr:last-of-type {
  border-bottom: none;
}

.table table td {
  padding: 15px 0;
}

/* .status {
  text-align: center;
} */

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
/* End of Funding History Table */
</style>

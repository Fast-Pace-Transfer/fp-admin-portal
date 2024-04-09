<template>
  <div class="layout_dashboard">
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content">
        <div class="dashboard_inner_left_column_content">
          <div class="dashboard_inner_left_column_top_content">
            <WalletView
              v-if="prefundingAccounts.length"
              :width="`500px`"
              :account="prefundingAccounts"
              :type="`pre-fund`"
              :title="`Prefunded Account - ${
                prefundingAccounts[0] ? prefundingAccounts[0].currency : ''
              }`"
              :showRequest="false"
              :switchable="false"
              :background-color="`#4953B2`"
              :border-color="`#4953B2`"
              :background-image="`url(src/assets/images/wallet.svg)`"
            />
            <WalletView
              v-else-if="operationalAccount.length"
              :account="operationalAccount"
              :show-request="user.can_prefund ? true : false"
              :title="`Operational Account - ${operationalAccount[0].currency}`"
              :type="'operation'"
              :width="`500px`"
              :switchable="false"
              :background-color="`#B24949`"
              :border-color="`#B24949`"
              :background-image="`url('src/assets/images/wallet_red.svg')`"
            />
          </div>
          <div class="dashboard_inner_left_column_bottom_content">
            <GraphContainer />
          </div>
        </div>
        <div class="dashboard_inner_right_column_content">
          <!-- Stats card -->
          <StatsCard :stat-array="statArray" />
          <!-- End of stats card -->
          <!-- Settlement rates -->
          <div
            class="dashboard_inner_right_column_content_second_row"
            v-if="prefundingAccounts[0] && operational_account_currency"
          >
            <div class="settlement_rate_title">Indicative Exchange Rate</div>
            <div class="countries_select_box">
              <select>
                <option>
                  {{ prefundingAccounts[0].currency }} -
                  {{ operational_account_currency.currency }}
                </option>
              </select>
            </div>
            <div class="settlement_rate_amount">
              {{ indicative_rate ? indicative_rate : "No Rate Found" }}
            </div>
          </div>
          <!-- End of settlement rates -->
          <!-- Transaction history -->
          <div class="dashboard_inner_right_column_content_third_row">
            <div class="transaction_history_header">
              <h3>Transaction History</h3>
              <div class="durations">
                <p class="duration-title active">Today</p>
                <p class="duration-title">This week</p>
              </div>
            </div>
            <div
              class="transaction_history_content"
              v-if="transactionHistory.length"
            >
              <div
                v-for="transaction in transactionHistory"
                :key="transaction.id"
                class="transaction_history_item"
              >
                <div
                  class="transaction_history_item_icon"
                  v-if="transaction.transaction_type.includes('mobile')"
                >
                  <i class="fa-solid fa-mobile-screen-button"></i>
                </div>
                <div
                  class="transaction_history_item_icon"
                  v-if="transaction.transaction_type.includes('bank')"
                >
                  <i class="fa-solid fa-building-columns"></i>
                </div>
                <div class="transaction_history_item_description">
                  <p class="description_title">
                    {{
                      `${capitalizeFirstLetterInEachWord(
                        removeSpecialCharacters(transaction.transaction_type)
                      )} Transfer`
                    }}
                  </p>
                  <p class="description_date">
                    {{ new Date(transaction.created_at).toDateString() }}
                  </p>
                </div>
                <div class="transaction_history_item_amount">
                  <p>{{ transaction.currency }} {{ transaction.amount }}</p>
                </div>
              </div>
            </div>
            <div class="transaction_history_content" v-else>
              <p class="no-transactions-found">No transactions found</p>
            </div>
          </div>
          <!-- End of transaction history -->
        </div>
      </div>
    </section>
    <!-- End of Content -->
  </div>
</template>

<script setup lang="ts">
import type { AccountInterface } from "@/models/accounts/account.interface";
import type { Transaction } from "@/models/transactions/transaction.interface";
import { useStore } from "vuex";
import { computed, ref, onMounted, watch } from "vue";
import axios from "axios";
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "../../components/common/NavbarView.vue";
import WalletView from "@/components/common/WalletView.vue";
import GraphContainer from "@/components/GraphContainer.vue";
import StatsCard from "@/components/common/StatsCard.vue";
import { handleAPIError } from "@/utils/handleAPIError";
import { capitalizeFirstLetterInEachWord } from "@/utils/capitalizeFirstLetter";
import { removeSpecialCharacters } from "@/utils/removeSpecialCharacters";
import type { TransactionStatistics } from "@/models/transactions/transactionStatistics.interface";

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

// Initial values for transaction history
const transactionHistory = ref<Transaction[]>([]);

const transactionStatistics = ref<TransactionStatistics>();

// Function to fetch prefunding accounts
function getPrefundingAccounts() {
  return axios.get("accounts/pre-fund", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}

function getTransactionStatistics() {
  return axios.get("transactions/stats", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}

// Get prefunding accounts
function getOperationalAccounts() {
  return axios.get("/accounts/operation", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}

// Function to fetch transactions
function getTransactions() {
  return axios.get("transactions", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    params: {
      limit: 3,
    },
  });
}
if (prefundingAccounts.value.length) {
  watch(operational_account_currency, async (newCurrency, oldCurrency) => {
    if (newCurrency) {
      await axios
        .get(
          `account-transfer/rate/${prefundingAccounts.value[0].currency}/${newCurrency.currency}`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        )
        .then(function (response) {
          indicative_rate.value = response.data.data.rate;
        });
    }
  });
}

// When component is mounted
onMounted(async () => {
  // Set loading status
  store.dispatch("isLoading");

  // Get prefunding accounts and transactions
  await Promise.all([
    getPrefundingAccounts(),
    getTransactions(),
    getOperationalAccounts(),
    getTransactionStatistics(),
  ])
    .then(function (results) {
      // Stop loading status
      store.dispatch("isLoading");
      // Set prefunding accounts
      prefundingAccounts.value = results[0].data.data;

      // Get rate
      if (prefundingAccounts.value.length) {
        axios
          .get(
            `account-transfer/rate/${prefundingAccounts.value[0].currency}/${operational_account_currency.value.currency}`,
            {
              headers: {
                Authorization: `Bearer ${token.value}`,
              },
            }
          )
          .then(function (response) {
            indicative_rate.value = response.data.data.rate;
          });
      }
      // Set transaction history
      transactionHistory.value = results[1].data.data.transactions;
      operationalAccount.value = results[2].data.data;
      transactionStatistics.value = results[2].data.data;
    })
    .catch(function (error) {
      // Stop loading status
      store.dispatch("isLoading");

      // Handle error
      handleAPIError(error);
    });
});

const statArray = [
  {
    title: "Daily Transactions",
    amount_of_transactions: transactionStatistics.value
      ? transactionStatistics.value.dailycount
      : "----",
    rise: true,
    drop: false,
  },
  {
    title: "Weekly Transactions",
    amount_of_transactions: transactionStatistics.value
      ? transactionStatistics.value.weeklycount
      : "----",
    rise: false,
    drop: true,
  },
];
</script>

<style>
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

/* Inner Content CSS */

.layout_dashboard_content .dashboard_inner_content {
  margin-top: 5rem;
  padding: 0 1.875rem;
  display: flex;
  gap: 10%;
}

/* Inner Left Content CSS */

.layout_dashboard_content
  .dashboard_inner_content
  .dashboard_inner_left_column_content {
  width: 48%;
  display: flex;
  flex-direction: column;
  gap: 80px;
}

/* End of Inner Left Content CSS */

.layout_dashboard_content
  .dashboard_inner_content
  .dashboard_inner_right_column_content {
  width: 48%;
}

/* Settlement rates CSS */
.dashboard_inner_right_column_content_second_row {
  display: flex;
  margin-top: 35px;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 8px;
  color: #fff;
  background: #4953b2;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
}

.dashboard_inner_right_column_content_second_row .countries_select_box select {
  background: #4953b2;
  color: #fff;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
}

.dashboard_inner_right_column_content_second_row
  .countries_select_box
  select:focus {
  outline: none;
}

.dashboard_inner_right_column_content_third_row {
  margin-top: 80px;
}

/* Transaction history */
.transaction_history_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #d7dbec;
}

.transaction_history_header h3 {
  margin-left: 20px;
  font-size: 24px;
  color: #343434ce;
  font-family: "Lato", sans-serif;
}

.transaction_history_header .durations {
  display: flex;
  gap: 15px;
  margin-right: 50px;
}

.transaction_history_content .no-transactions-found {
  text-align: center;
  font-size: 30px;
  margin-top: 2rem;
}

.transaction_history_content .transaction_history_item {
  display: flex;
  margin: 25px 0;
  padding-bottom: 20px;
  border-bottom: 2px solid #d7dbec;
}

.transaction_history_content .transaction_history_item:last-of-type {
  border-bottom: none;
}

.transaction_history_content
  .transaction_history_item
  .transaction_history_item_icon {
  color: #4953b2;
  background: #fff;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 40px;
  font-size: 30px;
  font-weight: bold;
}

.transaction_history_content
  .transaction_history_item
  .transaction_history_item_description {
  width: 60%;
}

.transaction_history_content
  .transaction_history_item
  .transaction_history_item_description
  .description_title {
  font-size: 1.175rem;
  color: #423e3b;
  font-family: Arial, Helvetica, sans-serif;
}

.transaction_history_content
  .transaction_history_item
  .transaction_history_item_description
  .description_date {
  font-size: 0.8125rem;
  color: #423e3b;
  font-family: Arial, Helvetica, sans-serif;
}

.transaction_history_content
  .transaction_history_item
  .transaction_history_item_amount {
  font-size: 1.25rem;
  color: #423e3b;
}

.duration-title {
  cursor: pointer;
}

.duration-title.active {
  color: var(--primary-color);
  font-weight: bold;
}

/* Media Queries */
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

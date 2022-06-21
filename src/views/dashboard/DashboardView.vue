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
              :width="`500px`"
              :account="prefundingAccounts"
              :type="`pre-fund`"
              :title="`Prefund Account - ${
                prefundingAccounts[0] ? prefundingAccounts[0].currency : ''
              }`"
              :showRequest="false"
              :switchable="false"
              :background-color="`#4953B2`"
              :border-color="`#4953B2`"
              :background-image="`url(src/assets/images/wallet.svg)`"
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
          <div class="dashboard_inner_right_column_content_second_row">
            <div class="settlement_rate_title">Indicative Exchange Rate</div>
            <div class="countries_select_box">
              <select>
                <option>USD - GHS</option>
                <option>GBP - GHS</option>
                <option>EUR - GHS</option>
              </select>
            </div>
            <div class="settlement_rate_amount">GHS 7.79</div>
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
            <div class="transaction_history_content">
              <div class="transaction_history_item">
                <div class="transaction_history_item_icon">+</div>
                <div class="transaction_history_item_description">
                  <p class="description_title">Account Credited by Fast Pace</p>
                  <p class="description_date">Wednesday 30th April</p>
                </div>
                <div class="transaction_history_item_amount">
                  <p>$3,000</p>
                </div>
              </div>
              <div class="transaction_history_item">
                <div class="transaction_history_item_icon">+</div>
                <div class="transaction_history_item_description">
                  <p class="description_title">Account Credited by Fast Pace</p>
                  <p class="description_date">Wednesday 30th April</p>
                </div>
                <div class="transaction_history_item_amount">
                  <p>$3,000</p>
                </div>
              </div>
              <div class="transaction_history_item">
                <div class="transaction_history_item_icon">+</div>
                <div class="transaction_history_item_description">
                  <p class="description_title">Account Credited by Fast Pace</p>
                  <p class="description_date">Wednesday 30th April</p>
                </div>
                <div class="transaction_history_item_amount">
                  <p>$3,000</p>
                </div>
              </div>
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
import { useStore } from "vuex";
import { computed, ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "../../components/common/NavbarView.vue";
import WalletView from "@/components/common/WalletView.vue";
import GraphContainer from "@/components/GraphContainer.vue";
import StatsCard from "@/components/common/StatsCard.vue";

// Initialize store
const store = useStore();

// Get token
const token = computed(() => store.getters.getToken);

// Initial values for prefunding accounts
const prefundingAccounts = ref<AccountInterface[]>([]);

// When component is mounted
onMounted(async () => {
  // Get prefunding accounts
  const response = await axios.get(`/accounts/pre-fund`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  // Set prefunding accounts
  prefundingAccounts.value = response.data.data;
});

const statArray = [
  {
    title: "Daily Transactions",
    amount_of_transactions: "1000",
    rise: true,
    drop: false,
  },
  {
    title: "Weekly Transactions",
    amount_of_transactions: "3000",
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

.transaction_history_content .transaction_history_item {
  display: flex;
  margin: 25px 0;
  padding-bottom: 20px;
  border-bottom: 2px solid #d7dbec;
}

.transaction_history_content .transaction_history_item:nth-of-type(3) {
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
  font-size: 20px;
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
</style>

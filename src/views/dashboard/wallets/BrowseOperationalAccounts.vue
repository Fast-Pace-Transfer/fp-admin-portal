<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_operational_account">
        <!-- Stats -->
        <div class="total_statistics_layout">
          <div class="total_statistics">
            <StatsCard :stat-array="statArray" />
          </div>
        </div>
        <!-- End of Stats -->
        <!-- Transaction history table -->
        <div class="transaction_history_table_layout">
          <div class="transaction_history_table">
            <div class="transaction_history_table_header">
              <h2>Transactions</h2>
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
                    <th>Channel</th>
                    <th>Sender</th>
                    <th>Recipient</th>
                    <th>Account Number</th>
                    <th>Send Amount</th>
                    <th>Receive Amount</th>
                    <th>Rate</th>
                    <th>Fee</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>20-05-2022 11:30:51</td>
                    <td>FP342224</td>
                    <td>Ecobank</td>
                    <td>Albert Olu</td>
                    <td>Francis Nwa</td>
                    <td>144435666</td>
                    <td>$ 200</td>
                    <td>GHS 200</td>
                    <td>7.35</td>
                    <td>£ 2</td>
                    <td>Processed</td>
                    <td><i class="fa-solid fa-circle-info"></i></td>
                  </tr>
                  <tr>
                    <td>20-05-2022 11:30:51</td>
                    <td>FP342224</td>
                    <td>Ecobank</td>
                    <td>Albert Olu</td>
                    <td>Francis Nwa</td>
                    <td>144435666</td>
                    <td>$ 200</td>
                    <td>GHS 200</td>
                    <td>7.35</td>
                    <td>£ 2</td>
                    <td>Processed</td>
                    <td><i class="fa-solid fa-circle-info"></i></td>
                  </tr>
                  <tr>
                    <td>20-05-2022 11:30:51</td>
                    <td>FP342224</td>
                    <td>Ecobank</td>
                    <td>Albert Olu</td>
                    <td>Francis Nwa</td>
                    <td>144435666</td>
                    <td>$ 200</td>
                    <td>GHS 200</td>
                    <td>7.35</td>
                    <td>£ 2</td>
                    <td>Processed</td>
                    <td><i class="fa-solid fa-circle-info"></i></td>
                  </tr>
                  <tr>
                    <td>20-05-2022 11:30:51</td>
                    <td>FP342224</td>
                    <td>Ecobank</td>
                    <td>Albert Olu</td>
                    <td>Francis Nwa</td>
                    <td>144435666</td>
                    <td>$ 200</td>
                    <td>GHS 200</td>
                    <td>7.35</td>
                    <td>£ 2</td>
                    <td>Processed</td>
                    <td><i class="fa-solid fa-circle-info"></i></td>
                  </tr>
                  <tr>
                    <td>20-05-2022 11:30:51</td>
                    <td>FP342224</td>
                    <td>Ecobank</td>
                    <td>Albert Olu</td>
                    <td>Francis Nwa</td>
                    <td>144435666</td>
                    <td>$ 200</td>
                    <td>GHS 200</td>
                    <td>7.35</td>
                    <td>£ 2</td>
                    <td>Processed</td>
                    <td><i class="fa-solid fa-circle-info"></i></td>
                  </tr>
                  <tr>
                    <td>20-05-2022 11:30:51</td>
                    <td>FP342224</td>
                    <td>Ecobank</td>
                    <td>Albert Olu</td>
                    <td>Francis Nwa</td>
                    <td>144435666</td>
                    <td>$ 200</td>
                    <td>GHS 200</td>
                    <td>7.35</td>
                    <td>£ 2</td>
                    <td>Processed</td>
                    <td><i class="fa-solid fa-circle-info"></i></td>
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
import { computed } from "vue";
import PageLoader from "@/components/common/PageLoader.vue";
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "@/components/common/NavbarView.vue";
import StatsCard from "@/components/common/StatsCard.vue";

const statArray = [
  {
    title: "Daily Transactions",
    amount_of_transactions: "1000",
    rise: true,
    drop: false,
  },
  {
    title: "Weekly Transactions",
    amount_of_transactions: "7000",
    rise: false,
    drop: true,
  },
  {
    title: "Monthly Transactions",
    amount_of_transactions: "14000",
    rise: true,
    drop: false,
  },
  {
    title: "Annual Transactions",
    amount_of_transactions: "168000",
    rise: false,
    drop: true,
  },
];

// Initialize store
const store = useStore();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);
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

.layout_dashboard_content .dashboard_inner_content_operational_account {
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
  margin-top: 40px;
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
/* End of Table CSS */
</style>

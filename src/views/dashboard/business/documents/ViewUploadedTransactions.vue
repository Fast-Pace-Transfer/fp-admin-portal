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
                <th>Sending Reason</th>
                <th>Source of funds</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20-05-2022</td>
                <td>#FP3562</td>
                <td>Ghana</td>
                <td>Bank</td>
                <td>CAL Bank</td>
                <td>Health</td>
                <td>Salary</td>
                <td>GHS100</td>
                <td>Pending</td>
                <td>
                  <button class="edit-transaction-button">Edit</button>
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
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { handleAPIError } from "@/utils/handleAPIError.js";

// Initialize store
const store = useStore();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);
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

<template>
  <div class="layout_dashboard">
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_prefunding_account">
        <!-- Prefunding Account -->
        <div class="prefunding_account_and_account_usage">
          <div class="prefunding_account">
            <WalletView
              :width="`100%`"
              :switchable="false"
              :background-color="`#4953B2`"
              :border-color="`#4953B2`"
            />
          </div>
        </div>
        <!-- End of Prefunding Account -->
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
                    <th>Amount Credited</th>
                    <th>Rate</th>
                    <th>Settlement Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>20-05-2022 11:30:51</td>
                    <td>FP342224</td>
                    <td>$3,000</td>
                    <td>GHS 3,000</td>
                    <td>8.5</td>
                    <td class="status pending"><span>Pending</span></td>
                    <td><i class="fa-solid fa-circle-info"></i></td>
                  </tr>
                  <tr>
                    <td>20-05-2022 11:30:51</td>
                    <td>FP342224</td>
                    <td>$3,000</td>
                    <td>GHS 3,000</td>
                    <td>8.5</td>
                    <td class="status success"><span>Processed</span></td>
                    <td><i class="fa-solid fa-circle-info"></i></td>
                  </tr>
                  <tr>
                    <td>20-05-2022 11:30:51</td>
                    <td>FP342224</td>
                    <td>$3,000</td>
                    <td>GHS 3,000</td>
                    <td>8.5</td>
                    <td class="status error"><span>Unpaid</span></td>
                    <td><i class="fa-solid fa-circle-info"></i></td>
                  </tr>
                  <tr>
                    <td>20-05-2022 11:30:51</td>
                    <td>FP342224</td>
                    <td>$3,000</td>
                    <td>GHS 3,000</td>
                    <td>8.5</td>
                    <td class="status success"><span>Processed</span></td>
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
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "@/components/common/NavbarView.vue";
import WalletView from "../../../components/common/WalletView.vue";
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
}

/* Prefunding account and account usage CSS */
.prefunding_account_and_account_usage {
  padding-left: 40px;
}
/* Prefunding account */

.prefunding_account_and_account_usage .prefunding_account {
  width: 32%;
}
/* End of Prefunding account */

/* End of prefunding account and account usage CSS */

/* Funding History Table */
.table_layout {
  padding-left: 40px;
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
  padding: 30px 15px;
  margin-top: 40px;
  width: 80%;
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

.status {
  text-align: center;
}

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

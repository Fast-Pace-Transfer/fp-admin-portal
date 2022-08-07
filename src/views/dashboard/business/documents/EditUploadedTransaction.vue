<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_edit_uploaded_transaction_page">
        <!--Edit Uploaded Transaction Page -->
        <div class="edit-uploaded-transaction-layout">
          <form>
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <select id="payout-country">
                  <option value="">Ghana</option>
                  <option value="">Nigeria</option>
                  <option value="">Kenya</option>
                  <option value="">Uganda</option>
                </select>
              </div>
              <div class="uploaded-transaction-input">
                <label for="reference">Reference</label>
                <input type="text" id="reference" />
              </div>
            </div>
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="channel-type">Channel Type</label>
                <select id="channel-type">
                  <option value="">Select</option>
                  <option value="">Paypal</option>
                  <option value="">Credit Card</option>
                  <option value="">Bank Transfer</option>
                </select>
              </div>
              <div class="uploaded-transaction-input">
                <label for="channel">Channel</label>
                <select id="channel">
                  <option value="">Select</option>
                  <option value="">Paypal</option>
                  <option value="">Credit Card</option>
                  <option value="">Bank Transfer</option>
                </select>
              </div>
            </div>
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="channel">Payout Country</label>
                <input type="text" />
              </div>
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <input type="text" />
              </div>
            </div>
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <input type="text" />
              </div>
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <input type="text" />
              </div>
            </div>
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <input type="text" />
              </div>
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <input type="text" />
              </div>
            </div>
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <input type="text" />
              </div>
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <input type="text" />
              </div>
            </div>
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <input type="text" />
              </div>
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <input type="text" />
              </div>
            </div>
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <input type="text" />
              </div>
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <input type="text" />
              </div>
            </div>
            <div class="edit-uploaded-transaction-button">
              <button class="edit-button">Save</button>
            </div>
          </form>
        </div>
        <!--Edit Uploaded Transaction Page  -->
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
  .dashboard_inner_content_edit_uploaded_transaction_page {
  margin-top: 3rem;
  padding: 0 1.875rem;
  display: flex;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout {
  width: 70%;
  background: #fff;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  form {
  width: 70%;
  padding: 30px 0;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row {
  display: flex;
  justify-content: space-between;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 45%;
  margin-bottom: 15px;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input
  label {
  font-size: 12px;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input
  input,
.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input
  select {
  border: 1px solid #383d6f;
  border-radius: 3px;
  height: 45px;
  font-size: 16px;
  padding-left: 15px;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input
  input:focus,
.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input
  select:focus {
  outline: none;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input
  input:disabled {
  background: #f6f8fa;
  border: 1px solid #383d6f;
  color: #383d6f;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .edit-uploaded-transaction-button {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .edit-uploaded-transaction-button
  button {
  background: #383d6f;
  border: none;
  width: 55%;
  color: #fff;
  height: 45px;
  border-radius: 3px;
  cursor: pointer;
}
</style>

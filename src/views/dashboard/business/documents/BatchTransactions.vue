<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_batch_transaction_page">
        <!--Batch Transaction Page -->
        <div class="batch-transaction-layout">
          <div class="file-info-layout">
            <div class="file-info-icon">
              <i class="fa-solid fa-file-lines"></i>
            </div>
            <div class="file-info-content">
              <p>{{ fileInfo.fileName }}</p>
              <p>{{ fileInfo.fileSize }}</p>
              <div class="file-progress-layout">
                <div class="file-progress-bar"></div>
                <div class="file-progress-text">
                  <p>100%</p>
                </div>
              </div>
            </div>
          </div>
          <div class="batch-info-and-actions-layout">
            <div class="batch-info">
              <p>Batch Number: {{ batchId }}</p>
            </div>
            <div class="batch-actions">
              <button class="batch-button primary" @click="processBatch">
                Process Batch
              </button>
              <button class="batch-button secondary" @click="goToViewBatchPage">
                View Batch
              </button>
            </div>
          </div>
        </div>
        <!--Batch Transaction Page  -->
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

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Initialize route
const route = useRoute();

// Get batch id from route
const batchId = route.params.batchId;

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get file info
const fileInfo = computed(() => store.getters.getFileInfo);

// Get token
const token = computed(() => store.getters.getToken);

// Go to View Batch page
const goToViewBatchPage = () => {
  router.push({
    name: "view-uploaded-transactions",
    params: {
      id: batchId,
    },
  });
};

// Process batch
const processBatch = () => {
  // Log processed to console
  console.log("Processing batch...");
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

.layout_dashboard_content .dashboard_inner_content_batch_transaction_page {
  margin-top: 5rem;
  padding: 0 1.875rem;
  display: flex;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout {
  width: 70%;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .file-info-layout {
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 15px;
  box-shadow: 0px 0px 2px #00000029;
  border-radius: 10px;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .file-info-layout
  .file-info-icon {
  font-size: 50px;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .file-info-layout
  .file-info-content {
  font-family: "Roboto", sans-serif;
  color: #423e3b;
  width: 100%;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .file-info-layout
  .file-info-content
  p:first-of-type {
  font-size: 16px;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .file-info-layout
  .file-info-content
  p:nth-of-type(2) {
  font-size: 12px;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .file-info-layout
  .file-info-content
  .file-progress-layout {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .file-info-layout
  .file-info-content
  .file-progress-layout
  .file-progress-bar {
  height: 5px;
  width: 90%;
  background: #5ca03e;
  border-radius: 10px;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .batch-info-and-actions-layout {
  margin-top: 20px;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .batch-info-and-actions-layout
  .batch-info {
  font-size: 25px;
  color: #5a5a5a;
  font-family: "Source Sans Pro", sans-serif;
  letter-spacing: 0.3px;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .batch-info-and-actions-layout
  .batch-actions {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .batch-info-and-actions-layout
  .batch-actions
  .batch-button {
  cursor: pointer;
  border: none;
  font-size: 12px;
  border-radius: 10px;
  height: 45px;
  padding: 10px 20px;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .batch-info-and-actions-layout
  .batch-actions
  .batch-button.primary {
  background: var(--primary-color);
  color: #fff;
}

.layout_dashboard_content
  .dashboard_inner_content_batch_transaction_page
  .batch-transaction-layout
  .batch-info-and-actions-layout
  .batch-actions
  .batch-button.secondary {
  background: #fff;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}
</style>

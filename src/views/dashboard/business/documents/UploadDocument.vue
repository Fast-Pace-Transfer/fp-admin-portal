<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_upload_document_page">
        <!--Upload Document Page -->
        <div class="upload-document-layout">
          <div class="upload-document-title">
            <h2>Upload Document</h2>
          </div>
          <div class="upload-document-form">
            <form @submit.prevent="uploadTransactions">
              <div class="upload-document-input">
                <label for="document-payout-country">Payout Country</label>
                <select
                  id="document-payout-country"
                  v-model="documentPayoutCountry"
                  required
                >
                  <option value="">Ghana</option>
                  <option value="">Nigeria</option>
                  <option value="">Kenya</option>
                </select>
              </div>
              <div class="upload-document-input">
                <label for="document-payout-method">Payout Method</label>
                <select
                  id="document-payout-method"
                  v-model="documentPayoutMethod"
                  required
                >
                  <option value="">Bank</option>
                  <option value="">Mobile Money</option>
                  <option value="">Cash</option>
                </select>
              </div>
              <div class="upload-document-input">
                <label for="transactions-document">Upload File</label>
                <input
                  type="file"
                  id="transactions-document"
                  accept=".csv"
                  @change="onFileChanged($event)"
                  required
                />
                <p>
                  <i class="fa-solid fa-circle-info"></i> Formats supported
                  include .csv and .xlsx (Size: 2MB)
                </p>
              </div>
              <div class="upload-document-button">
                <button type="submit">Upload</button>
              </div>
            </form>
          </div>
        </div>
        <!--Upload Document Page  -->
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
import { useRouter } from "vue-router";
import { formatFileSize } from "@/utils/formatFileSize";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { handleAPIError } from "@/utils/handleAPIError";
import { routerKey } from "vue-router";

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Initialize refs
const documentPayoutCountry = ref("");
const documentPayoutMethod = ref("");
const document = ref<string | Blob>("");

// On file changed
function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    document.value = target.files[0];
    console.log(document.value);
    console.log(formatFileSize(document.value.size));
    // Clear file info
    store.dispatch("setFileInfo", {});
    // Set file info
    store.dispatch("setFileInfo", {
      fileName: target.files[0].name,
      fileSize: formatFileSize(target.files[0].size),
    });
  }
}

// Submit form data
const uploadTransactions = async () => {
  // Get form data
  const formData = new FormData();
  formData.append("file", document.value);
  formData.append("payout_country", documentPayoutCountry.value);
  formData.append("payout_method", documentPayoutMethod.value);
  console.log(formData);

  // Set loading status
  // store.dispatch("isLoading");

  router.push({ name: "batch-transactions", params: { batchId: "1" } });
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

.layout_dashboard_content .dashboard_inner_content_upload_document_page {
  margin-top: 5rem;
  padding: 0 1.875rem;
  display: flex;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout {
  width: 55%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 3px 6px #00000029;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-title {
  padding: 1.875rem;
  display: flex;
  justify-content: center;
  font-size: 18px;
  color: #5a5a5a;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form {
  display: flex;
  justify-content: center;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  form {
  width: 80%;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 1.875rem;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  label {
  font-size: 12px;
  color: #5a5a5a;
  font-weight: 500;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  select {
  border: 1px solid #383d6f;
  border-radius: 3px;
  height: 45px;
  font-size: 16px;
  padding-left: 15px;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  select:focus {
  outline: none;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  input {
  display: block;
  background-color: #f6f8fa;
  color: #111827;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: 0.5rem;
  height: 45px;
  border-width: 1px;
  border-color: #d1d5db;
  cursor: pointer;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  input::-webkit-file-upload-button {
  background: var(--primary-color);
  color: #fff;
  padding: 15px 16px;
  border: none;
  border-radius: 0.5rem 0 0 0.5rem;
  cursor: pointer;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  input:focus {
  outline: none;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  p {
  font-size: 14px;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-button {
  margin-bottom: 1.875rem;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-button
  button {
  background: #383d6f;
  border: none;
  width: 100%;
  color: #fff;
  font-size: 18px;
  height: 45px;
  border-radius: 3px;
  cursor: pointer;
}
</style>

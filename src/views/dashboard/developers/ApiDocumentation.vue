<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_api_documentation_page">
        <!--API Documentation Page -->
        <div class="api-documentation-page-layout">
          <div class="api-documentation-page-content">
            <h2>API Configuration</h2>
            <div class="generate-api-key-layout">
              <div class="generate-api-key-input">
                <p>API Secret Key</p>
                <input type="text" v-model="apiSecretKey" disabled />
              </div>
              <div class="api-key-buttons">
                <div class="generate-api-key-button">
                  <button @click="generateApiKey">
                    + Generate New API Key
                  </button>
                </div>
                <div class="copy-api-key-button">
                  <button @click="copyApiKey">Copy API Key</button>
                </div>
              </div>
            </div>
            <div class="link-to-documentation-layout">
              <p>Documentation Link:</p>
              <a
                href="https://documenter.getpostman.com/view/17812328/2s9XxvUvZN"
                target="_blank"
                rel="noopener noreferrer"
                >https://documenter.getpostman.com/view/17812328/2s9XxvUvZN</a
              >
            </div>
            <div class="end-point">
              <p>Base URL:</p>
              <p>{{ baseUrl }}</p>
            </div>
          </div>
        </div>
        <!--End of API Documentation Page  -->
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
import { Toast } from "@/utils/toast";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { handleAPIError } from "@/utils/handleAPIError";

// Initialize store
const store = useStore();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Get api secret key
const apiSecretKey = ref("");

// Get base url
const baseUrl = import.meta.env.VITE_PARTNER_API_URL;

// Generate API Key
const generateApiKey = async () => {
  // Set loading status
  store.dispatch("isLoading");

  // Get api secret key
  await axios
    .post(
      "generate-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      // Stop loading status
      store.dispatch("isLoading");

      // Set api secret key
      apiSecretKey.value = response.data.data.access_token;
    })
    .catch((error) => {
      // Stop loading status
      store.dispatch("isLoading");

      // Show error message
      handleAPIError(error);
    });
};

// Generate API Key on mount
onMounted(() => {
  generateApiKey();
});

// Copy to clipboard when input is clicked
const copyApiKey = () => {
  navigator.clipboard.writeText(apiSecretKey.value).then(() => {
    Toast.fire({
      icon: "success",
      title: "API Key copied to clipboard",
    });
  });
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

.layout_dashboard_content .dashboard_inner_content_api_documentation_page {
  margin-top: 5rem;
  padding: 0 1.875rem;
  display: flex;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
}

/* API Documentation CSS */
.api-documentation-page-layout {
  width: 70%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.api-documentation-page-layout .api-documentation-page-content {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.api-documentation-page-layout .api-documentation-page-content h2 {
  font-size: 30px;
  font-weight: 400;
  font-family: "Source Sans Pro", sans-serif;
  color: #5a5a5a;
}

.api-documentation-page-layout
  .api-documentation-page-content
  .generate-api-key-layout {
  width: 100%;
  margin-top: 3rem;
}

.api-documentation-page-layout
  .api-documentation-page-content
  .generate-api-key-layout
  .generate-api-key-input {
  width: 100%;
  display: flex;
  gap: 30px;
  align-items: center;
}

.api-documentation-page-layout
  .api-documentation-page-content
  .generate-api-key-layout
  .generate-api-key-input
  p {
  font-size: 18px;
  font-weight: 400;
  font-family: "Source Sans Pro", sans-serif;
  color: #343434;
}

.api-documentation-page-layout
  .api-documentation-page-content
  .generate-api-key-layout
  .generate-api-key-input
  input {
  height: 50px;
  width: 83%;
  border: 1px solid #e3e3e3;
  padding-left: 25px;
  font-size: 18px;
}

.api-documentation-page-layout
  .api-documentation-page-content
  .generate-api-key-layout
  .generate-api-key-input
  input:focus {
  outline: none;
}

.api-documentation-page-layout
  .api-documentation-page-content
  .generate-api-key-layout
  .api-key-buttons {
  width: 100%;
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.api-documentation-page-layout
  .api-documentation-page-content
  .generate-api-key-layout
  .api-key-buttons
  button {
  height: 30px;
  border-radius: 3px;
  color: #fff;
  padding: 7px;
  border: none;
  cursor: pointer;
}

.api-documentation-page-layout
  .api-documentation-page-content
  .generate-api-key-layout
  .api-key-buttons
  .generate-api-key-button
  button {
  background: var(--primary-color);
}

.api-documentation-page-layout
  .api-documentation-page-content
  .generate-api-key-layout
  .api-key-buttons
  .copy-api-key-button
  button {
  background: #bebdbd;
}

.api-documentation-page-layout
  .api-documentation-page-content
  .link-to-documentation-layout {
  margin: 3rem 0;
  width: 100%;
  display: flex;
  gap: 30px;
}

.api-documentation-page-layout
  .api-documentation-page-content
  .link-to-documentation-layout
  p:first-of-type {
  font-size: 18px;
  font-weight: 400;
  font-family: "Source Sans Pro", sans-serif;
  color: #343434;
}

.api-documentation-page-layout
  .api-documentation-page-content
  .link-to-documentation-layout
  a {
  font-size: 18px;
}

/* Generate API Key CSS */
.end-point {
  width: 100%;
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  gap: 30px;
}
/* End of Endpoint CSS */
</style>

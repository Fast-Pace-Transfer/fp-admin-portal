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
import type { AccountInterface } from "@/models/accounts/account.interface";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Initialize route
const route = useRoute();

// Get route params
const { id, type, currency } = route.params;

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Initial values for prefunding accounts
const prefundingAccounts = ref<AccountInterface[]>([]);

// When component is mounted
onMounted(async () => {
  // Run axios requests
  await store.dispatch("isLoading");
  axios
    .get("/accounts/pre-fund", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((res) => {
      store.dispatch("isLoading");
      prefundingAccounts.value = res.data.data;
    });
});

// Inital states for the form
const initialState = {
  prefundAccount: "",
  operationalAccount: `${currency} - Account`,
  debitAmount: 0,
};

// Submit funds transfer form
const transferFunds = async () => {
  // Get form values
  const data = {
    debit_account_id: initialState.prefundAccount,
    credit_account_id: id,
    debit_amount: initialState.debitAmount,
  };

  // Run axios request
  await store.dispatch("isLoading");
  axios
    .post("/account-transfer", data, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then(() => {
      // Show success message
      // Set loading status
      store.dispatch("isLoading");
      Swal.fire({
        title: "Success",
        text: "Funds Transfer request submitted successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirect to dashboard
        router.push({ name: "browse-accounts" });
      });
    })
    .catch((error) => {
      // Set loading status
      store.dispatch("isLoading");

      // Show error message
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.errors.join(" "),
        });
      }
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
  border: 1px solid red;
}
</style>

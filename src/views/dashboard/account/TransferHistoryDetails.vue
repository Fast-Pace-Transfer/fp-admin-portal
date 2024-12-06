<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_prefunding_account"></div>
    </section>
    <!-- End of Content -->
  </div>
</template>

<script setup lang="ts">
import type { AccountInterface } from "@/models/accounts/account.interface";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import PageLoader from "@/components/common/PageLoader.vue";
import axios from "axios";
import Swal from "sweetalert2";
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "@/components/common/NavbarView.vue";

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Initial values for prefunding accounts
const prefundingAccounts = ref<AccountInterface[]>([]);

// Initial values for operational accounts
const operationalAccounts = ref<AccountInterface[]>([]);

// Get operational account from store
const operationalAccount = computed(() => {
  return store.getters.getOperationalAccount;
});

// Get prefunding accounts
function getPrefundingAccounts() {
  return axios.get("/accounts/pre-fund", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}

// When component is mounted
onMounted(async () => {
  // Run axios requests
  await store.dispatch("isLoading");
  await Promise.all([getPrefundingAccounts()])
    .then(function (results) {
      store.dispatch("isLoading");
      prefundingAccounts.value = results[0].data.data;
    })
    .catch(function (error) {
      if (error.response) {
        store.dispatch("isLoading");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.errors.join(" "),
        });
      }
    });
});
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
  padding: 0 5rem;
}

/* List of accounts */
.list_of_accounts {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.list_of_accounts .prefunded_account {
  width: 42%;
}

.list_of_accounts .operational_accounts {
  width: 42%;
}
/* End of list of accounts */
</style>

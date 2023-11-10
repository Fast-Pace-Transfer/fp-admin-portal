<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_prefunding_account">
        <!-- List of accounts -->
        <div class="list_of_accounts">
          <div class="prefunded_account" v-if="prefundingAccounts.length">
            <WalletView
              :account="prefundingAccounts"
              :title="`Prefund Account - ${
                prefundingAccounts[0] ? prefundingAccounts[0].currency : ''
              }`"
              :type="`${
                prefundingAccounts[0] ? prefundingAccounts[0].type : ''
              }`"
              :width="`500px`"
              :switchable="false"
              :background-color="`#4953B2`"
              :border-color="`#4953B2`"
              :show-request="true"
              :background-image="`url('src/assets/images/wallet.svg')`"
            />
          </div>
          <div class="operational_accounts">
            <WalletView
              :account="operationalAccount"
              :show-request="user.partner.can_prefund ? true : false"
              :title="`Operational Account - ${operationalAccount[0].currency}`"
              :type="'operation'"
              :width="`500px`"
              :switchable="operationalAccounts.length > 1 ? true : false"
              :background-color="`#B24949`"
              :border-color="`#B24949`"
              :background-image="`url('src/assets/images/wallet_red.svg')`"
            />
          </div>
        </div>
        <!-- End of list of accounts -->
        <!-- Funding History Table -->
        <FundingHistoryTable v-show="user.partner.can_prefund" />
        <TransferHistoryTable v-show="user.partner.can_prefund" />
        <SettlementHistoryTable v-show="user.partner.can_prefund" />
        <!-- End of Funding History Table -->
      </div>
    </section>
    <!-- End of Content -->
  </div>
</template>

<script setup lang="ts">
import type { AccountInterface } from "@/models/accounts/account.interface";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import PageLoader from "@/components/common/PageLoader.vue";
import axios from "axios";
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "@/components/common/NavbarView.vue";
import WalletView from "@/components/common/WalletView.vue";
import FundingHistoryTable from "@/components/FundingHistoryTable.vue";
import TransferHistoryTable from "@/components/TransferHistoryTable.vue";
import SettlementHistoryTable from "@/components/SettlementHistoryTable.vue";
import { handleAPIError } from "@/utils/handleAPIError";

// Initialize store
const store = useStore();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

const user = computed(() => store.getters.getUser);

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
      // Stop loading status
      store.dispatch("isLoading");

      // Show error message
      handleAPIError(error);
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

/* Media Queries */

@media screen and (min-width: 37.5rem) and (max-width: 64rem) {
  .list_of_accounts {
    flex-direction: column;
  }

  .layout_dashboard_content .dashboard_inner_content_prefunding_account {
    padding: 0 2rem;
  }
}
</style>

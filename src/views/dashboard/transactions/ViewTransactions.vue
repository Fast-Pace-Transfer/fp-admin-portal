<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_operational_account"></div>
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

.layout_dashboard_content .dashboard_inner_content_view_transaction {
  margin-top: 5rem;
  padding: 0 1.875rem;
}

/* End of Stats CSS*/
</style>

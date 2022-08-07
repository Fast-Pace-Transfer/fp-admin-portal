<template>
  <!-- Sidebar -->
  <section class="layout_dashboard_sidebar">
    <div class="inner_sidebar_content">
      <div class="sidebar_logo">
        <img src="@/assets/images/logo.png" alt="fast pace logo" />
      </div>
      <div class="sidebar_categories">
        <nav class="sidebar_category">
          <p class="sidebar_category_title">Payments</p>
          <ul class="sidebar_category_list">
            <router-link
              v-slot="{ isActive }"
              :to="{ name: 'dashboard' }"
              class="link"
              v-if="['admin', 'finance'].includes(role)"
            >
              <li class="sidebar_category_item" :class="{ active: isActive }">
                <!-- Icon -->
                <div class="sidebar_category_item_icon">
                  <IconDashboard :isActive="isActive" />
                </div>
                <!-- End of Icon -->
                <!-- Link title -->
                <p
                  :class="{ active: isActive }"
                  class="sidebar_category_item_title"
                >
                  Dashboard
                </p>
                <!-- End of Link title -->
              </li>
            </router-link>
            <router-link
              v-slot="{ isActive }"
              :to="{ name: 'browse-accounts' }"
              class="link"
              v-if="['admin', 'finance'].includes(role)"
            >
              <li class="sidebar_category_item" :class="{ active: isActive }">
                <!-- Icon -->
                <div class="sidebar_category_item_icon">
                  <IconAccount :isActive="isActive" />
                </div>
                <!-- End of Icon -->
                <!-- Link title -->
                <p
                  :class="{ active: isActive }"
                  class="sidebar_category_item_title"
                >
                  Accounts
                </p>
                <!-- End of Link title -->
              </li>
            </router-link>
            <router-link
              v-slot="{ isActive }"
              :to="{ name: 'browse-transactions' }"
              class="link"
              v-if="['admin', 'finance', 'dev', 'user'].includes(role)"
            >
              <li class="sidebar_category_item" :class="{ active: isActive }">
                <!-- Icon -->
                <div class="sidebar_category_item_icon">
                  <IconTransactions :isActive="isActive" />
                </div>
                <!-- End of Icon -->
                <!-- Link title -->
                <p
                  :class="{ active: isActive }"
                  class="sidebar_category_item_title"
                >
                  Transactions
                </p>
                <!-- End of Link title -->
              </li>
            </router-link>
          </ul>
        </nav>
        <nav
          class="sidebar_category"
          v-if="['admin', 'finance'].includes(role)"
        >
          <p class="sidebar_category_title">Business</p>
          <ul class="sidebar_category_list">
            <router-link
              v-slot="{ isActive }"
              :to="{ name: 'browse-reports' }"
              class="link"
            >
              <li class="sidebar_category_item" :class="{ active: isActive }">
                <!-- Icon -->
                <div class="sidebar_category_item_icon">
                  <IconReports :isActive="isActive" />
                </div>
                <!-- End of Icon -->
                <!-- Link title -->
                <p
                  :class="{ active: isActive }"
                  class="sidebar_category_item_title"
                >
                  Reports
                </p>
                <!-- End of Link title -->
              </li>
            </router-link>
            <router-link
              v-slot="{ isActive }"
              :to="{ name: 'upload-documents' }"
              class="link"
            >
              <li class="sidebar_category_item" :class="{ active: isActive }">
                <!-- Icon -->
                <div class="sidebar_category_item_icon">
                  <IconFiles :isActive="isActive" />
                </div>
                <!-- End of Icon -->
                <!-- Link title -->
                <p
                  :class="{ active: isActive }"
                  class="sidebar_category_item_title"
                >
                  Documents
                </p>
                <!-- End of Link title -->
              </li>
            </router-link>
          </ul>
        </nav>
        <nav
          class="sidebar_category"
          v-if="['admin', 'finance'].includes(role)"
        >
          <p class="sidebar_category_title">Developers</p>
          <ul class="sidebar_category_list">
            <router-link
              v-slot="{ isActive }"
              :to="{ name: 'api-keys' }"
              class="link"
            >
              <li class="sidebar_category_item" :class="{ active: isActive }">
                <!-- Icon -->
                <div class="sidebar_category_item_icon">
                  <IconApiKeys :isActive="isActive" />
                </div>
                <!-- End of Icon -->
                <!-- Link title -->
                <p
                  :class="{ active: isActive }"
                  class="sidebar_category_item_title"
                >
                  API Documentation
                </p>
                <!-- End of Link title -->
              </li>
            </router-link>
          </ul>
        </nav>
      </div>
    </div>
  </section>
  <!-- End of Sidebar -->
</template>

<script setup lang="ts">
import IconDashboard from "@/components/icons/payments/IconDashboard.vue";
import IconAccount from "@/components/icons/payments/IconAccount.vue";
import IconFiles from "@/components/icons/business/IconFiles.vue";
import IconApiKeys from "../icons/developers/IconApiKeys.vue";
import IconReports from "../icons/business/IconReports.vue";
import IconTransactions from "@/components/icons/payments/IconTransactions.vue";
import { RouterLink } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

// Initialize the store
const store = useStore();

// Get role
const role = computed(() => {
  return store.getters.getRole;
});
</script>

<style>
/* Sidebar css */
.layout_dashboard_sidebar {
  width: 15.625rem;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  background: #fff;
}

.layout_dashboard_sidebar .inner_sidebar_content {
  width: 100%;
}

.layout_dashboard_sidebar .inner_sidebar_content .sidebar_logo {
  width: 100%;
  height: 6.25rem;
  padding: 1.875rem;
}

.layout_dashboard_sidebar .inner_sidebar_content .sidebar_logo img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.layout_dashboard_sidebar .inner_sidebar_content .sidebar_categories {
  width: 100%;
  margin-top: 4rem;
  padding: 0 0 0 1.875rem;
}

.layout_dashboard_sidebar
  .inner_sidebar_content
  .sidebar_categories
  .sidebar_category {
  margin-bottom: 2rem;
}

.layout_dashboard_sidebar
  .inner_sidebar_content
  .sidebar_categories
  .sidebar_category
  .sidebar_category_title {
  font-size: 1.1875rem;
  color: #343434;
}

.layout_dashboard_sidebar
  .inner_sidebar_content
  .sidebar_categories
  .sidebar_category
  .sidebar_category_list {
  margin-top: 1rem;
}

.layout_dashboard_sidebar
  .inner_sidebar_content
  .sidebar_categories
  .sidebar_category
  .sidebar_category_list
  .sidebar_category_item {
  list-style: none;
  display: flex;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 1rem;
}

.layout_dashboard_sidebar
  .inner_sidebar_content
  .sidebar_categories
  .sidebar_category
  .sidebar_category_list
  .sidebar_category_item.active {
  border-right: 0.25rem solid var(--primary-color);
}

.layout_dashboard_sidebar
  .inner_sidebar_content
  .sidebar_categories
  .sidebar_category
  .sidebar_category_list
  .sidebar_category_item
  .sidebar_category_item_icon {
  display: flex;
  height: 0.938rem;
  width: 0.938rem;
}

.layout_dashboard_sidebar
  .inner_sidebar_content
  .sidebar_categories
  .sidebar_category
  .sidebar_category_list
  .sidebar_category_item
  .sidebar_category_item_title {
  font-size: 1rem;
}

.layout_dashboard_sidebar
  .inner_sidebar_content
  .sidebar_categories
  .sidebar_category
  .sidebar_category_list
  .sidebar_category_item
  .sidebar_category_item_title.active {
  color: var(--primary-color);
  font-weight: bold;
}

.link {
  text-decoration: none;
  color: #a5a5a5;
}
</style>

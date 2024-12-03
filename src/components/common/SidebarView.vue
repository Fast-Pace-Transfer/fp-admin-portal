<template>
  <section class="layout_dashboard_sidebar">
    <div class="inner_sidebar_content">
      <!-- Sidebar Logo -->
      <div class="sidebar_logo">
        <img src="@/assets/images/logo.png" alt="fast pace logo" />
      </div>
      <!-- Sidebar Categories -->
      <div class="sidebar_categories">
        <nav class="sidebar_category">
          <ul class="sidebar_category_list">
            <!-- Main Menu Item -->
            <li
              class="sidebar_category_item fp-mobile-toggle"
              :class="{ active: isFPMobileActive }"
              @click.stop="toggleFPMobile"
            >
              <!-- Icon -->
              <div class="sidebar_category_item_icon">
                <IconAccount :isActive="isFPMobileActive" />
              </div>
              <!-- Link title -->
              <p class="sidebar_category_item_title">
                FP MOBILE
                <span class="toggle-icon">
                  {{ isFPMobileActive ? '▼' : '▶' }}
                </span>
              </p>
            </li>

            <!-- Submenu -->
            <ul v-if="isFPMobileActive" class="sidebar_subcategory_list">

                            <!-- Dashboard Link -->
                            <RouterLink
                v-slot="{ isActive }"
                :to="{ name: 'settings' }"
                class="link"
                :key="'settings'"
                @click.stop
              >
                <li class="sidebar_category_item" :class="{ active: isActive }">
                  <div class="sidebar_category_item_icon">
                    <IconDashboard :isActive="isActive" />
                  </div>
                  <p
                    :class="{ active: isActive }"
                    class="sidebar_category_item_title"
                  >
                    Settings
                  </p>
                </li>
              </RouterLink>

              <!-- Dashboard Link -->
              <RouterLink
                v-slot="{ isActive }"
                :to="{ name: 'dashboard' }"
                class="link"
                :key="'dashboard'"
                @click.stop
              >
                <li class="sidebar_category_item" :class="{ active: isActive }">
                  <div class="sidebar_category_item_icon">
                    <IconDashboard :isActive="isActive" />
                  </div>
                  <p
                    :class="{ active: isActive }"
                    class="sidebar_category_item_title"
                  >
                    Dashboard
                  </p>
                </li>
              </RouterLink>

              <!-- Customers Link -->
              <RouterLink
                v-slot="{ isActive }"
                :to="{ name: 'customers' }"
                class="link"
                :key="'customers'"
                @click.stop
              >
                <li class="sidebar_category_item" :class="{ active: isActive }">
                  <div class="sidebar_category_item_icon">
                    <IconAccount :isActive="isActive" />
                  </div>
                  <p
                    :class="{ active: isActive }"
                    class="sidebar_category_item_title"
                  >
                    Customers
                  </p>
                </li>
              </RouterLink>

              <!-- Recipients Link -->
              <RouterLink
                v-slot="{ isActive }"
                :to="{ name: 'recipients' }"
                class="link"
                :key="'recipients'"
                @click.stop
              >
                <li class="sidebar_category_item" :class="{ active: isActive }">
                  <div class="sidebar_category_item_icon">
                    <IconAccount :isActive="isActive" />
                  </div>
                  <p
                    :class="{ active: isActive }"
                    class="sidebar_category_item_title"
                  >
                    Recipients
                  </p>
                </li>
              </RouterLink>

              <!-- Fund Transfer Credit Link -->
              <RouterLink
                v-slot="{ isActive }"
                :to="{ name: 'fund-transfer-credit' }"
                class="link"
                :key="'fund-transfer-credit'"
                @click.stop
              >
                <li class="sidebar_category_item" :class="{ active: isActive }">
                  <div class="sidebar_category_item_icon">
                    <IconAccount :isActive="isActive" />
                  </div>
                  <p
                    :class="{ active: isActive }"
                    class="sidebar_category_item_title"
                  >
                    Fund Transfer Credit
                  </p>
                </li>
              </RouterLink>

              <!-- Fund Transfer Debit Link -->
              <RouterLink
                v-slot="{ isActive }"
                :to="{ name: 'fund-transfer-debit' }"
                class="link"
                :key="'fund-transfer-debit'"
                @click.stop
              >
                <li class="sidebar_category_item" :class="{ active: isActive }">
                  <div class="sidebar_category_item_icon">
                    <IconAccount :isActive="isActive" />
                  </div>
                  <p
                    :class="{ active: isActive }"
                    class="sidebar_category_item_title"
                  >
                    Fund Transfer Debit
                  </p>
                </li>
              </RouterLink>
            </ul>
          </ul>
        </nav>
      </div>
      <!-- Logout Button -->
      <div class="sidebar_logout">
        <button @click="logoutUser" class="btn btn-primary">Logout</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute, RouteRecordName } from 'vue-router';
import { useStore } from 'vuex';

import IconDashboard from '@/components/icons/payments/IconDashboard.vue';
import IconAccount from '@/components/icons/payments/IconAccount.vue';

const store = useStore();
const router = useRouter();
const route = useRoute();

const logoutUser = async () => {
  router.push({ name: 'login' });
};

const role = computed(() => {
  return store.getters.getRole;
});

const fpMobileRoutes: RouteRecordName[] = [
  'settings',
  'dashboard',
  'customers',
  'recipients',
  'fund-transfer-credit',
  'fund-transfer-debit',
];

const isFPMobileToggled = ref(false);

// Initialize the submenu state based on the current route
const initializeMenuState = () => {
  if (route.name != null && fpMobileRoutes.includes(route.name)) {
    isFPMobileToggled.value = true;
  }
};

// Watch for route changes to keep submenu open if navigating to a relevant route
watch(
  () => route.name,
  (newRouteName) => {
    if (newRouteName != null && fpMobileRoutes.includes(newRouteName)) {
      isFPMobileToggled.value = true;
    }
  },
  { immediate: true }
);

const isFPMobileActive = computed(() => {
  return isFPMobileToggled.value;
});

const toggleFPMobile = () => {
  isFPMobileToggled.value = !isFPMobileToggled.value;
};

// Initialize the menu state when the component is mounted
initializeMenuState();
</script>



<style scoped>
/* Existing styles from previous code */
.sidebar_subcategory_list {
  list-style: none;
  padding: 0 0 0 20px;
  margin-top: 10px;
}
</style>

<!-- Styles remain the same as in the original code -->

<style scoped>
.sidebar_category_list {
  list-style: none;
  padding: 0;
}

.sidebar_category_item {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.fp-mobile-toggle {
  user-select: none;
}

.toggle-icon {
  margin-left: 10px;
  font-size: 0.8em;
}

.sidebar_category_item_icon {
  display: flex;
  align-items: center;
}

.sidebar_category_item_title {
  flex-grow: 1;
}

.active {
  font-weight: bold;
}

/* Submenu transition effects */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.sidebar_subcategory_list {
  list-style: none;
  padding: 0 0 0 20px;
  margin-top: 10px;
}
</style>

<style>
/* Existing global styles remain the same as in the previous code */
</style>

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

.layout_dashboard_sidebar .inner_sidebar_content .sidebar_logout {
  margin-top: 6rem;
  display: flex;
  justify-content: center;
}

.layout_dashboard_sidebar .inner_sidebar_content .sidebar_logout button {
  height: 1.875rem;
  width: 60%;
  border: 1px solid var(--primary-color);
  background: transparent;
  cursor: pointer;
  border-radius: 3px;
  color: var(--primary-color);
}

/* .layout_dashboard_sidebar
  .inner_sidebar_content
  .sidebar_categories
  .sidebar_category {
  margin-bottom: 2rem;
} */

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

.sidebar_subcategory_list {
  list-style: none;
  padding: 0 0 0 20px; /* Indent submenu items */
}

.sidebar_subcategory_list .sidebar_category_item {
  margin-bottom: 0.75rem; /* Reduce the margin for a compact submenu look */
}
</style>

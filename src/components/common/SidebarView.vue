<template>
  <!-- Sidebar -->
  <section class="layout_dashboard_sidebar">
    <div class="inner_sidebar_content">
      <!-- Sidebar Logo -->
      <div class="sidebar_logo">
        <img src="@/assets/images/logo.png" alt="fast pace logo" />
      </div>
      <!-- End of Sidebar Logo -->
      <!-- Sidebar Categories -->
      <div class="sidebar_categories">
        <nav class="sidebar_category">
    <ul class="sidebar_category_list">
      <li
        class="sidebar_category_item"
        @click="toggleFPMobile"
        :class="{ active: isFPMobileActive }"
      >
        <!-- Icon -->
        <div class="sidebar_category_item_icon">
          <IconAccount :isActive="isFPMobileActive" />
        </div>
        <!-- End of Icon -->
        <!-- Link title -->
        <p
          :class="{ active: isFPMobileActive }"
          class="sidebar_category_item_title"
        >
          FP MOBILE
        </p>
        <!-- End of Link title -->
      </li>
      <ul v-if="isFPMobileActive">
        <router-link
          v-slot="{ isActive }"
          :to="{ name: 'dashboard' }"
          class="link"
          v-if="['admin', 'finance'].includes('finance')"
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
          :to="{ name: 'customers' }"
          class="link"
          v-if="['admin', 'finance'].includes('admin')"
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
              Customers
            </p>
            <!-- End of Link title -->
          </li>
        </router-link>

        <router-link
          v-slot="{ isActive }"
          :to="{ name: 'recipients' }"
          class="link"
          v-if="['admin', 'finance'].includes('admin')"
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
              Recipients
            </p>
            <!-- End of Link title -->
          </li>
        </router-link>

        <router-link
          v-slot="{ isActive }"
          :to="{ name: 'fund-transfer-credit' }"
          class="link"
          v-if="['admin', 'finance', 'dev', 'user'].includes('admin')"
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
              Fund Transfer Credit
            </p>
            <!-- End of Link title -->
          </li>
        </router-link>

        <router-link
          v-slot="{ isActive }"
          :to="{ name: 'fund-transfer-debit' }"
          class="link"
          v-if="['admin', 'finance', 'dev', 'user'].includes('admin')"
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
              Fund Transfer Debit
            </p>
            <!-- End of Link title -->
          </li>
        </router-link>
      </ul>
    </ul>
  </nav>

        <nav
          class="sidebar_category"
          v-if="['admin', 'finance'].includes(role)"
        >
          <!-- <p class="sidebar_category_title">Developers</p> -->
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
      <!-- End of Sidebar Categories -->

      <!-- Logout Button -->
      <div class="sidebar_logout">
        <button @click="logoutUser" class="btn btn-primary">Logout</button>
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
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
import { computed } from "vue";
import { handleAPIError } from "@/utils/handleAPIError";
import { ref } from "vue";

// Initialize the store
const store = useStore();

// Initialize the router
const router = useRouter();

// Get token from the store
const token = computed(() => {
  return store.getters.getToken;
});

// Batch Capability
const can_upload_batch = computed(() => {
  //return store.getters.getUser.partner.can_upload_batch;
});

// Logout user
const logoutUser = async () => {
  router.push({ name: "login" });
  // await store.dispatch("isLoading");
  // await axios
  //   .get("/logout", {
  //     headers: {
  //       Authorization: `Bearer ${token.value}`,
  //     },
  //   })
  //   .then(() => {
  //     store.dispatch("isLoading");
  //     localStorage.removeItem("vuex");
  //     localStorage.removeItem("selectedOperationalAccountBalance");
  //     store.dispatch("clearOperationalAccount");
  //     router.push({ name: "login" });
  //   })
  //   .catch((error) => {
  //     store.dispatch("isLoading");
  //     handleAPIError(error);
  //   });
};

// Get role
const role = computed(() => {
  return store.getters.getRole;
});

const isFPMobileActive = ref(false);

const toggleFPMobile = () => {
  isFPMobileActive.value = !isFPMobileActive.value;
};
</script>

<style scoped>
.sidebar_category_list {
  list-style: none;
  padding: 0;
}

.sidebar_category_item {
  cursor: pointer;
}

.sidebar_category_item_icon {
  display: inline-block;
  margin-right: 10px;
}

.sidebar_category_item_title {
  display: inline-block;
}

.active {
  font-weight: bold;
}
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
</style>

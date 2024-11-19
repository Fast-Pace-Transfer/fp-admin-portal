<template>
  <div class="navbar">
    <!-- <div class="search_by_keyword_section">
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="Search by keyword"
        class="search_by_keyword_input"
      />
    </div> -->
    <div class="navbar_content_section">
      <AccountSwitch />
      <div class="notifications_and_name_section">
        <!-- <div class="notifications">
          <div class="new_notification"></div>
          <i class="fa-solid fa-bell"></i>
        </div>
        <div class="separation"></div> -->
        <div class="name_section">
          <div class="name-circle">
            <!-- <p>{{ partner_name.charAt(0) }}</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import AccountSwitch from "@/components/common/AccountSwitch.vue";

// Initialize store
const store = useStore();

// Get name of partner
const partner_name = computed(() => {
  // return store.getters.getUser.partner.name;
});
</script>

<style>
/* Navbar CSS */
.navbar {
  width: 100%;
  height: 3.75rem;
  padding: 0 1.875rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}

.navbar .navbar_content_section {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  width: 15%;
  position: relative;
}
.navbar .search_by_keyword_section {
  position: relative;
  width: 30%;
  margin-left: 12.5rem;
  font-family: "Lato", sans-serif;
}
.navbar .search_by_keyword_section input {
  border-style: none;
  border-radius: 0.4375rem;
  height: 2.5rem;
  width: 100%;
  padding: 0.625rem 0.625rem 0.625rem 3.125rem;
}

.navbar .search_by_keyword_section input::placeholder {
  color: #a5a5a5;
}
.navbar .search_by_keyword_section input:focus {
  outline: none;
}
.navbar .search_by_keyword_section i {
  color: #a5a5a5;
  position: absolute;
  top: 0.6375rem;
  left: 1.25rem;
}
.navbar .notifications_and_name_section {
  display: flex;
  gap: 2%;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
}

.navbar .notifications_and_name_section .separation {
  width: 1px;
  height: 1.75rem;
  background: var(--primary-color);
}

.navbar .notifications_and_name_section .notifications {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: #323b5c;
  position: relative;
}

.navbar .notifications_and_name_section .notifications .new_notification {
  width: 0.6875rem;
  height: 0.6875rem;
  background: #ffc06a;
  border-radius: 50%;
  position: absolute;
  top: -0.3125rem;
  right: 0;
}

.navbar .notifications_and_name_section .name_section {
  display: flex;
  align-items: center;
  gap: 0.3125rem;
}

.navbar .notifications_and_name_section .name_section .name-circle {
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: transparent linear-gradient(131deg, #61a147 0%, #383d6f 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 0px 2px #61a147bf;
  color: #fff;
  cursor: pointer;
}

/* End of navbar CSS */
</style>

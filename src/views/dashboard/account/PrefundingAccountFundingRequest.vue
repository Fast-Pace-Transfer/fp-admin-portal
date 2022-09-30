<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_prefunding_account_funding_request">
        <div class="funds_form_layout">
          <div class="funds_form_title">
            <h2>Funds Request Form</h2>
          </div>
          <div class="funds_form">
            <form @submit.prevent="submitFundingRequest">
              <div class="funds_form_input">
                <label for="funds_form_select">Funding Type</label>
                <select
                  id="funds_form_select"
                  v-model="state.funding_type"
                  required
                >
                  <option value="" selected disabled>
                    Select Funding Type
                  </option>
                  <option value="bank_transfer">Bank Deposit</option>
                  <option value="card_payment">Card Payment</option>
                </select>
              </div>
              <div class="funds_form_input">
                <label for="funds_form_input">Reference</label>
                <input
                  type="text"
                  v-model="state.reference"
                  id="funds_form_input"
                  required
                />
              </div>
              <div class="funds_form_input">
                <label for="funds_form_input">Amount</label>
                <input
                  type="number"
                  v-model="state.amount"
                  id="funds_form_input"
                  required
                />
              </div>
              <div class="funds_form_input">
                <label for="funds_form_input">Description</label>
                <input
                  type="text"
                  v-model="state.description"
                  id="funds_form_input"
                  required
                />
              </div>
              <div class="submit_button_container">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- End of Content -->
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "@/components/common/NavbarView.vue";
import PageLoader from "@/components/common/PageLoader.vue";
import axios from "axios";
import Swal from "sweetalert2";
import { handleAPIError } from "@/utils/handleAPIError";

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Initialize route
const route = useRoute();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Initialize state
const state = {
  funding_type: "",
  reference: "",
  amount: "",
  description: "",
};

// Get id from url
const account_id = route.params.id;

// Submit form
const submitFundingRequest = async () => {
  // Initialize loading
  store.dispatch("isLoading");

  // Get form data
  const data = {
    account_id: account_id,
    funding_type: state.funding_type,
    reference: state.reference,
    amount: state.amount,
    description: state.description,
  };

  // Make request
  axios
    .post("/account-funding", data, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      // Set loading status
      store.dispatch("isLoading");
      // Check if response is successful
      if (response.status === 200 || response.status === 201) {
        // Show success message
        Swal.fire({
          title: "Success",
          text: "Funding request submitted successfully",
          icon: "success",
        });
        // Redirect to dashboard
        router.push({ name: "browse-accounts" });
      }
    })
    .catch((error) => {
      // Set loading status
      store.dispatch("isLoading");

      // Show error message
      handleAPIError(error);
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

.layout_dashboard_content
  .dashboard_inner_content_prefunding_account_funding_request {
  margin-top: 5rem;
  padding: 0 1.875rem;
  display: flex;
  justify-content: center;
}

/* Funds Form CSS */
.funds_form_layout {
  padding: 1.875rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
}

.funds_form_layout .funds_form_title {
  font-size: 18px;
  color: #5a5a5a;
}

.funds_form_layout .funds_form {
  margin-top: 40px;
  width: 70%;
}

.funds_form_layout .funds_form .funds_form_input {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.funds_form_layout .funds_form .funds_form_input label {
  font-size: 12px;
  color: #5a5a5a;
}

.funds_form_layout .funds_form .funds_form_input select,
.funds_form_layout .funds_form .funds_form_input input {
  height: 45px;
  border: 1px solid #383d6f;
  border-radius: 5px;
  background: #fff;
  padding-left: 20px;
  font-size: 16px;
}

.funds_form_layout .funds_form .funds_form_input select:focus,
.funds_form_layout .funds_form .funds_form_input input:focus {
  outline: none;
}

.funds_form_layout .funds_form .submit_button_container {
  margin-top: 40px;
}

.funds_form_layout .funds_form .submit_button_container button {
  height: 45px;
  border: 1px solid #383d6f;
  border-radius: 5px;
  background: #383d6f;
  width: 100%;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
/* End of Funds Form CSS */
</style>

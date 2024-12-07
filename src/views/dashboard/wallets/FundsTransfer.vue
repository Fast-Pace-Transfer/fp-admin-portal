<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_operational_account_transfer_request">
        <!--Funds Form -->
        <div class="funds_form_layout">
          <div class="funds_form_title">
            <h2>Funds Transfer Form</h2>
          </div>
          <div class="funds_form">
            <form @submit.prevent="transferFunds">
              <div class="funds_form_input">
                <label for="funds_form_select">Prefund Account</label>
                <select
                  id="funds_form_select"
                  v-model="initialState.prefundAccount"
                  @change="getIndicativeRate"
                >
                  <option value="" selected disabled>Select Account</option>
                  <option
                    v-for="(prefundAccount, index) in prefundingAccounts"
                    :key="index"
                    :value="prefundAccount.id"
                    :data-currency="prefundAccount.currency"
                  >
                    {{ prefundAccount.currency }} - Prefund Account
                  </option>
                </select>
              </div>
              <div class="funds_form_input">
                <label for="funds_form_input">Operational Account</label>
                <input
                  type="text"
                  id="funds_form_input"
                  disabled
                  v-model="initialState.operationalAccount"
                />
                <p v-if="indicative_rate">
                  Today's indicative rate is 1 {{ current_prefund_currency }} =
                  {{ indicative_rate }} {{ currency }}
                </p>
              </div>
              <!-- <div class="rate_calculation">
                <div class="debit_amount">
                  <div class="debit_amount_input">
                    <label for="debit_amount">Debit amount</label>
                    <input type="number" id="debit_amount" />
                  </div>
                  <div class="debit_currency">
                    <p>USD</p>
                  </div>
                </div>
                <div class="credit_amount">
                  <div class="credit_amount_input">
                    <label for="credit_amount">Credit amount</label>
                    <input type="number" id="credit_amount" />
                  </div>
                  <div class="credit_currency">
                    <p>GHS</p>
                  </div>
                </div>
              </div>
              <p class="settlement_rate">at 7.7 GHS settlement rate</p> -->
              <div class="funds_form_input">
                <label for="amount_input"
                  >Amount in
                  {{
                    current_prefund_currency ? current_prefund_currency : "-"
                  }}</label
                >
                <input
                  type="number"
                  id="amount_input"
                  v-model="initialState.debitAmount"
                />
              </div>
              <div class="submit_button_container">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <!--End of Funds Form  -->
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
import { handleAPIError } from "@/utils/handleAPIError";

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Initialize route
const route = useRoute();

// Get route params
const { id, currency } = route.params;

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Initial values for prefunding accounts
const prefundingAccounts = ref<AccountInterface[]>([]);

// Get indicative rate
const indicative_rate = ref(null);

// Initialize current prefund currency
const current_prefund_currency = ref<string | null>("");

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

// Get indicative rate
const getIndicativeRate = async (event: Event) => {
  // Get prefund currency
  const prefund_currency = event.target
    ? (event.target as HTMLSelectElement).options[
        (event.target as HTMLSelectElement).selectedIndex
      ].getAttribute("data-currency")
    : "";
  current_prefund_currency.value = prefund_currency;
  if (prefund_currency) {
    await axios
      .get(`account-transfer/rate/${prefund_currency}/${currency}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then(function (response) {
        indicative_rate.value = response.data.data.rate;
      })
      .catch((error) => {
        handleAPIError(error);
      });
  }
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
  .dashboard_inner_content_operational_account_transfer_request {
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

/* Rate Calculation */
.rate_calculation {
  display: flex;
  gap: 8%;
  margin-top: 40px;
}

.rate_calculation .debit_amount,
.rate_calculation .credit_amount {
  width: 46%;
  position: relative;
}

.rate_calculation .debit_amount .debit_amount_input,
.rate_calculation .credit_amount .credit_amount_input {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.rate_calculation .debit_amount .debit_amount_input label,
.rate_calculation .credit_amount .credit_amount_input label {
  font-size: 12px;
  color: #5a5a5a;
}

.rate_calculation .debit_amount .debit_amount_input input,
.rate_calculation .credit_amount .credit_amount_input input {
  height: 45px;
  border: 1px solid #e3e3e3;
  background: #fff;
  padding-left: 20px;
  border-radius: 5px;
  font-size: 18px;
}

.rate_calculation .debit_amount .debit_amount_input input:focus,
.rate_calculation .credit_amount .credit_amount_input input:focus {
  outline: none;
}

.rate_calculation .debit_amount .debit_currency,
.rate_calculation .credit_amount .credit_currency {
  position: absolute;
  top: 22px;
  right: 0;
  height: 45px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  border: 1px solid #e3e3e3;
}

.settlement_rate {
  text-align: right;
  font-size: 13px;
}
/* End of Rate Calculation */
</style>

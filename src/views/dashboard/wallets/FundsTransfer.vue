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
            <form>
              <div class="funds_form_input">
                <label for="funds_form_select">Prefund Account</label>
                <select
                  id="funds_form_select"
                  v-model="initialState.prefundAccount"
                >
                  <option value="" selected disabled>Select Account</option>
                  <option
                    v-for="(prefundAccount, index) in prefundingAccounts"
                    :key="index"
                  >
                    {{ prefundAccount.currency }} - Prefund Balance
                  </option>
                </select>
              </div>
              <div class="funds_form_input">
                <label for="funds_form_select">Operational Account</label>
                <select
                  id="funds_form_select"
                  v-model="initialState.operationalAccount"
                >
                  <option value="" selected disabled>Select Account</option>
                  <option
                    v-for="operationalAccount in operationalAccounts"
                    :key="operationalAccount.id"
                  >
                    {{ operationalAccount.currency }} - Operational Balance
                  </option>
                </select>
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
                <label for="amount_input">Amount</label>
                <input type="number" id="amount_input" />
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
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// Interfaces for accounts
interface PrefundAccount {
  id: string;
  partner_id: string;
  currency: string;
  balance: number;
  type: string;
  name: null | string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  partner: {
    id: string;
    name: string;
  };
}

interface OperationalAccount {
  id: string;
  partner_id: string;
  currency: string;
  balance: number;
  type: string;
  name: null | string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  partner: {
    id: string;
    name: string;
  }[];
}

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Initial values for prefunding accounts
const prefundingAccounts = ref<PrefundAccount[]>([]);

// Initial values for operational accounts
const operationalAccounts = ref<OperationalAccount[]>([]);

// Get operational accounts
function getOperationalAccounts() {
  return axios.get("/accounts/operation", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}

// Get prefunding accounts
function getPrefundingAccounts() {
  return axios.get("/accounts/pre-fund", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}

// // When component is mounted
// onMounted(async () => {
//   // Run axios requests
//   await store.dispatch("isLoading");
//   await Promise.all([getPrefundingAccounts(), getOperationalAccounts()])
//     .then(function (results) {
//       store.dispatch("isLoading");
//       prefundingAccounts.value = results[0].data.data;
//       operationalAccounts.value = results[1].data.data;
//     })
//     .catch(function (error) {
//       if (error.response) {
//         store.dispatch("isLoading");
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: error.response.data.errors.join(" "),
//         });
//       }
//     });
// });

// Inital states for the form
const initialState = {
  prefundAccount: "",
  operationalAccount: "",
  debitAmount: 0,
  creditAmount: 0,
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

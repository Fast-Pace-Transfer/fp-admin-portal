<template>
  <div class="operational_account_switch_section">
    <select
      v-if="operationalAccounts.length"
      @change="changeOperationalAccount"
    >
      <option
        v-for="operationalAccount in operationalAccounts"
        :key="operationalAccount.id"
        :selected="
          selectedOperationalAccount.id === operationalAccount.id ? true : false
        "
        :data-id="operationalAccount.id"
        :data-currency="operationalAccount.currency"
        :data-balance="operationalAccount.balance"
        :data-type="operationalAccount.type"
        :data-name="operationalAccount.name"
      >
        {{ operationalAccount.currency }} account
      </option>
    </select>
    <select v-else>
      <option value="">Loading...</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";

// Initialize the store
const store = useStore();

// Get token
const token = computed(() => store.getters.getToken);

// Interface for accounts
interface Account {
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
  selected: boolean;
}

// initial state for operational accounts
const operationalAccounts = ref<Account[]>([]);

// Get operational account
const selectedOperationalAccount = computed(() => {
  return store.getters.getSelectedOperationalAccount;
});

// Get operational accounts when mounted
onMounted(() => {
  // Get operational accounts
  axios
    .get("http://localhost:8080/operational-accounts", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      // Set operational accounts
      operationalAccounts.value = response.data;
      store.dispatch("setSelectedOperationalAccount", {
        id: operationalAccounts.value[0].id,
        currency: operationalAccounts.value[0].currency,
        balance: operationalAccounts.value[0].balance,
        type: operationalAccounts.value[0].type,
        name: operationalAccounts.value[0].name,
      });
    })
    .catch((error) => {
      // Show error message
      console.log(error);
    });
});

// Get selected operational account from select element
const changeOperationalAccount = (event: any) => {
  // Get selected account
  const selectedAccount = event.target.options[event.target.selectedIndex];
  console.log(selectedAccount);
  // Get account data
  const accountData = {
    id: selectedAccount.dataset.id,
    currency: selectedAccount.dataset.currency,
    balance: selectedAccount.dataset.balance,
    type: selectedAccount.dataset.type,
    name: selectedAccount.dataset.name,
  };
  // Set selected account
  store.dispatch("setSelectedOperationalAccount", {
    id: accountData.id,
    currency: accountData.currency,
    balance: accountData.balance,
    type: accountData.type,
    name: accountData.name,
  });
};
</script>

<style>
.operational_account_switch_section select {
  height: 2.5rem;
  padding: 9px 0 9px 11px;
  font-family: "Poppins", sans-serif;
  box-shadow: 0px 1px 3px #00000029;
  border-radius: 5px;
  color: var(--primary-color);
  background: #fff;
}

.operational_account_switch_section select:focus {
  outline: none;
}

.name_section_dropdown {
  position: absolute;
  left: 67%;
  top: 130%;
  background: #fff;
  width: 30%;
  padding: 5px 10px;
  box-shadow: 0px 1px 3px #00000029;
}

.name_section_dropdown::before {
  content: " ";
  position: absolute;
  width: 0;
  height: 0;
  top: -10px;
  left: 50%;
  margin-left: -10px;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #fff transparent;
}

.name_section_dropdown li {
  list-style: none;
  text-align: center;
  cursor: pointer;
}
</style>

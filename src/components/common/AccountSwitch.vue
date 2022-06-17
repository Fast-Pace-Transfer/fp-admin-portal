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
          selectedOperationalAccount[0].id === operationalAccount.id
            ? true
            : false
        "
        :data-id="operationalAccount.id"
        :data-currency="operationalAccount.currency"
        :data-balance="operationalAccount.balance"
        :data-type="operationalAccount.type"
        :data-name="operationalAccount.name"
        :data-currency-symbol="operationalAccount.symbol"
      >
        {{ operationalAccount.currency }}
        account
      </option>
    </select>
    <select v-else>
      <option value="">Loading...</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { AccountInterface } from "@/models/accounts/account.interface";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";

// Initialize the store
const store = useStore();

// Get token
const token = computed(() => store.getters.getToken);

// initial state for operational accounts
const operationalAccounts = ref<AccountInterface[]>([]);

// Get operational account
const selectedOperationalAccount = computed(() => {
  return store.getters.getOperationalAccount;
});

// Get operational accounts when mounted
onMounted(() => {
  // Get operational accounts
  axios
    .get("/accounts/operation", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      // Set operational accounts
      operationalAccounts.value = response.data.data;

      // Check if there is a selected account id in LocalStorage
      if (!localStorage.getItem("selectedOperationalAccountBalance")) {
        // Add selected account ID to LocalStorage
        localStorage.setItem(
          "selectedOperationalAccountBalance",
          operationalAccounts.value[0].balance.toString()
        );
        // Add selected account to store
        store.dispatch("setOperationalAccount", {
          id: operationalAccounts.value[0].id,
          currency: operationalAccounts.value[0].currency,
          balance: operationalAccounts.value[0].balance,
          type: operationalAccounts.value[0].type,
          name: operationalAccounts.value[0].name,
          symbol: operationalAccounts.value[0].symbol,
        });
      } else {
        console.log("No selected account");
      }
    })
    .catch((error) => {
      // Show error message
      console.log(error);
    });
});

// Get selected operational account from select element
const changeOperationalAccount = (event: any) => {
  // set selected account in store to null
  store.dispatch("clearOperationalAccount");

  // Get selected account
  const selectedAccount = event.target.options[event.target.selectedIndex];

  // Get account data
  const accountData = {
    id: selectedAccount.dataset.id,
    currency: selectedAccount.dataset.currency,
    balance: Number(selectedAccount.dataset.balance),
    type: selectedAccount.dataset.type,
    name: selectedAccount.dataset.name,
    symbol: selectedAccount.dataset.currencySymbol,
  };
  // Set selected account
  store.dispatch("setOperationalAccount", {
    id: accountData.id,
    currency: accountData.currency,
    balance: accountData.balance,
    type: accountData.type,
    name: accountData.name,
    symbol: accountData.symbol,
  });

  // Add selected account ID to LocalStorage
  localStorage.setItem(
    "selectedOperationalAccountBalance",
    accountData.balance.toString()
  );
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

<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_edit_uploaded_transaction_page">
        <!--Edit Uploaded Transaction Page -->
        <div class="edit-uploaded-transaction-layout" v-if="batchDetails">
          <form @submit.prevent="updateBatchTransaction">
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="payout-country">Payout Country</label>
                <select
                  id="payout-country"
                  @change="getPayoutCurrency"
                  v-model="state.payoutCountry"
                >
                  <option
                    v-for="country in payoutCountries"
                    :key="country.code"
                    :value="country.code"
                    :data-currency="country.currency"
                  >
                    {{ country.flag_emoji }} {{ country.name }}
                  </option>
                </select>
              </div>
              <div class="uploaded-transaction-input">
                <label for="payout-currency">Payout Currency</label>
                <input
                  type="text"
                  id="payout-currency"
                  disabled
                  v-model="payoutCurrency"
                />
              </div>
              <div class="uploaded-transaction-input">
                <label for="payout-amount">Sending Country</label>
                <input
                  type="text"
                  id="payout-amount"
                  v-model="state.sending_country"
                />
              </div>
            </div>
            <div
              class="input-row"
              v-if="
                batchDetails.transaction_type.toLowerCase().includes('bank')
              "
            >
              <div class="uploaded-transaction-input">
                <label for="payout-channel">Payout Channel</label>
                <input
                  type="text"
                  id="payout-channel"
                  v-model="state.payoutChannel"
                />
              </div>
              <div class="uploaded-transaction-input">
                <label for="bank-code">Bank Code</label>
                <input type="text" id="bank-code" v-model="state.bankCode" />
              </div>
              <div class="uploaded-transaction-input">
                <label for="reference">Reference</label>
                <input type="text" id="reference" v-model="state.reference" />
              </div>
            </div>
            <div
              class="input-row"
              v-if="
                batchDetails.transaction_type.toLowerCase().includes('mobile')
              "
            >
              <div class="uploaded-transaction-input">
                <label for="payout-channel">Payout Channel</label>
                <input
                  type="text"
                  id="payout-channel"
                  v-model="state.payoutChannel"
                />
              </div>
              <div class="uploaded-transaction-input">
                <label for="bank-code">Network</label>
                <input type="text" id="bank-code" v-model="state.network" />
              </div>
              <div class="uploaded-transaction-input">
                <label for="reference">Reference</label>
                <input type="text" id="reference" v-model="state.reference" />
              </div>
            </div>
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="sender-name">Sender's Name</label>
                <input
                  type="text"
                  id="sender-name"
                  v-model="state.senderName"
                />
              </div>
              <div class="uploaded-transaction-input">
                <label for="sender-address">Sender's Address</label>
                <input
                  type="text"
                  id="sender-address"
                  v-model="state.senderAddress"
                />
              </div>
              <div class="uploaded-transaction-input">
                <label for="sender-address">Sender's Gender</label>
                <input
                  type="text"
                  id="sender-address"
                  v-model="state.senderGender"
                />
              </div>
            </div>
            <div class="input-row">
              <div
                class="uploaded-transaction-input"
                v-if="batchDetails.sender_id_other_type_name"
              >
                <label for="sender-id-type-other-name"
                  >Sender's ID Type (Other) Name</label
                >
                <input
                  type="text"
                  id="sender-id-type-other-name"
                  v-model="state.senderIdTypeOtherName"
                />
              </div>
              <div v-else class="uploaded-transaction-input">
                <label for="sender-id-type">Sender's ID Type</label>
                <input
                  type="text"
                  id="sender-id-type"
                  v-model="state.senderIdType"
                />
              </div>
              <div class="uploaded-transaction-input">
                <label for="sender-id-number">Sender's ID Number</label>
                <input
                  type="text"
                  id="sender-id-number"
                  v-model="state.senderIdNumber"
                />
              </div>
              <div class="uploaded-transaction-input">
                <label for="sender-id-number">Sender's ID Issue Date</label>
                <input
                  type="text"
                  id="sender-id-number"
                  v-model="state.senderIdIssueDate"
                />
              </div>
            </div>
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="sender-id-type">Sender's ID Expiry Date</label>
                <input
                  type="text"
                  id="sender-id-type"
                  v-model="state.senderIdExpiryDate"
                />
              </div>
              <div class="uploaded-transaction-input">
                <label for="sender-id-number"
                  >Sender's ID Issuing Country</label
                >
                <input
                  type="text"
                  id="sender-id-number"
                  v-model="state.senderIdCountry"
                />
              </div>
              <div class="uploaded-transaction-input">
                <label for="sender-id-type-other-name"
                  >Sender's Sending Reason</label
                >
                <input
                  type="text"
                  id="sender-id-type-other-name"
                  v-model="state.sendingReason"
                />
              </div>
            </div>
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="sender-source-of-funds"
                  >Sender's Source Of Funds</label
                >
                <input
                  type="text"
                  id="sender-source-of-funds"
                  v-model="state.senderSourceOfFunds"
                />
              </div>
              <div
                class="uploaded-transaction-input"
                v-if="
                  batchDetails.transaction_type.toLowerCase().includes('bank')
                "
              >
                <label for="account-number">Account Number</label>
                <input
                  type="text"
                  id="account-number"
                  v-model="state.accountNumber"
                />
              </div>
              <div
                class="uploaded-transaction-input"
                v-if="
                  batchDetails.transaction_type.toLowerCase().includes('mobile')
                "
              >
                <label for="account-number">Mobile Wallet</label>
                <input
                  type="text"
                  id="account-number"
                  v-model="state.mobile_wallet"
                />
              </div>
              <div class="uploaded-transaction-input">
                <label for="payout-amount">Amount</label>
                <input
                  type="text"
                  id="payout-amount"
                  v-model="state.payoutAmount"
                />
              </div>
            </div>
            <div class="input-row">
              <div class="uploaded-transaction-input">
                <label for="beneficiary-name">Beneficiary's Name</label>
                <input
                  type="text"
                  id="beneficiary-name"
                  v-model="state.beneficiaryName"
                />
              </div>
              <div class="uploaded-transaction-input">
                <label for="beneficiary-id-type">Beneficiary's ID Type</label>
                <input
                  type="text"
                  id="beneficiary-id-type"
                  v-model="state.beneficiaryIdType"
                />
              </div>
              <div class="uploaded-transaction-input">
                <label for="beneficiary-id-number">Beneficiary ID Number</label>
                <input
                  type="text"
                  id="beneficiary-id-number"
                  v-model="state.beneficiaryIdNumber"
                />
              </div>
            </div>
            <div class="edit-uploaded-transaction-button">
              <button type="submit" class="edit-button">Save</button>
            </div>
          </form>
        </div>
        <!--Edit Uploaded Transaction Page  -->
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
import { useRoute, useRouter } from "vue-router";
import type { payoutCountriesInterface } from "@/models/business/payoutInterfaces";
import type { transactionBatchInterface } from "@/models/business/transactionBatch";
import axios from "axios";
import { ref, computed, onMounted, reactive } from "vue";
import { handleAPIError } from "@/utils/handleAPIError";
import Swal from "sweetalert2";

// Initialize store
const store = useStore();

// Initialize route
const route = useRoute();

// Initialize router
const router = useRouter();

// Get route params
const { transactionId } = route.params;

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Intitialize payout countries
const payoutCountries = ref<payoutCountriesInterface[]>([]);

// Initialize payout currency
const payoutCurrency = ref<string | null>("");

// Initialize batch details
const batchDetails = ref<transactionBatchInterface>();

// Get payout currency
const getPayoutCurrency = (event: Event) => {
  // Get payout currency on change from select element
  payoutCurrency.value = (event.target as HTMLSelectElement).options[
    (event.target as HTMLSelectElement).selectedIndex
  ].getAttribute("data-currency");
};

// Get payout countries
function getPayoutCountries() {
  return axios.get("countries/payout", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}

// Get batch details
function getBatchDetails() {
  return axios.get(`batch-item/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
}

// On mounted
onMounted(async () => {
  // Set loading status
  await store.dispatch("isLoading");

  // Get payout countries and batch details
  await Promise.all([getPayoutCountries(), getBatchDetails()])
    .then((results) => {
      // Stop loading status
      store.dispatch("isLoading");
      // Set payout countries
      payoutCountries.value = results[0].data.data;
      // Set batch details
      batchDetails.value = results[1].data.data;
      state.payoutCountry = batchDetails.value
        ? batchDetails.value.payout_country
        : "";
      payoutCurrency.value = batchDetails.value
        ? batchDetails.value.payout_currency
        : "";
      state.payoutChannel = batchDetails.value
        ? batchDetails.value.transaction_type
        : "";
      state.bankCode = batchDetails.value ? batchDetails.value.bank_code : "";
      state.network = batchDetails.value ? batchDetails.value.network : "";
      state.accountNumber = batchDetails.value
        ? batchDetails.value.account_number
        : "";
      state.mobile_wallet = batchDetails.value
        ? batchDetails.value.mobile_wallet
        : "";
      state.beneficiaryName = batchDetails.value
        ? batchDetails.value.beneficiary_name
        : "";
      state.beneficiaryIdType = batchDetails.value
        ? batchDetails.value.beneficiary_id_type
        : "";
      state.beneficiaryIdNumber = batchDetails.value
        ? batchDetails.value.beneficiary_id_number
        : "";

      // Set sending country
      state.sending_country = batchDetails.value
        ? batchDetails.value.sending_country
        : "";

      // Set sender source of funds
      state.senderSourceOfFunds = batchDetails.value
        ? batchDetails.value.sender_source_of_funds
        : "";

      // Set amount
      state.payoutAmount = batchDetails.value
        ? batchDetails.value.amount.toString()
        : "";

      // Set reference
      state.reference = batchDetails.value ? batchDetails.value.reference : "";

      // Set sender name
      state.senderName = batchDetails.value
        ? batchDetails.value.sender_name
        : "";

      // Set sender address
      state.senderAddress = batchDetails.value
        ? batchDetails.value.sender_address
        : "";

      // Set sender gender
      state.senderGender = batchDetails.value
        ? batchDetails.value.sender_gender
        : "";

      // Set sender Id type
      state.senderIdType = batchDetails.value
        ? batchDetails.value.sender_id_type
        : "";

      // Set sender Id number
      state.senderIdNumber = batchDetails.value
        ? batchDetails.value.sender_id_number
        : "";

      // Set sender Id issue country
      state.senderIdCountry = batchDetails.value
        ? batchDetails.value.sender_id_country
        : "";

      // Set sender Id issue date
      state.senderIdIssueDate = batchDetails.value
        ? batchDetails.value.sender_id_issue_date
        : "";

      // Set sender Id expiry date
      state.senderIdExpiryDate = batchDetails.value
        ? batchDetails.value.sender_id_expiry_date
        : "";

      // Set sending reason
      state.sendingReason = batchDetails.value
        ? batchDetails.value.sending_reason
        : "";
    })
    .catch((error) => {
      // Stop loading status
      store.dispatch("isLoading");

      // Handle error
      handleAPIError(error);
    });
});

// Initial values for form
const state = reactive({
  payoutCountry: "",
  payoutChannel: "",
  bankCode: "",
  payoutAmount: "",
  network: "",
  mobile_wallet: "",
  sending_country: "",
  reference: "",
  senderName: "",
  senderAddress: "",
  senderGender: "",
  senderIdType: "",
  senderIdNumber: "",
  senderIdIssueDate: "",
  senderIdExpiryDate: "",
  senderIdTypeOtherName: "",
  senderSourceOfFunds: "",
  senderIdCountry: "",
  accountNumber: "",
  beneficiaryName: "",
  beneficiaryIdType: "",
  beneficiaryIdNumber: "",
  sendingReason: "",
});

// Update batch transaction details
const updateBatchTransaction = async () => {
  // Set loading status
  store.dispatch("isLoading");

  // Get form values
  const updated_values = {
    payout_country: state.payoutCountry,
    payout_currency: payoutCurrency.value,
    amount: state.payoutAmount,
    transaction_type: state.payoutChannel,
    reference: state.reference,
    ...(state.bankCode && {
      bank_code: state.bankCode,
    }),
    ...(state.network && {
      network: state.network,
    }),
    ...(state.mobile_wallet && {
      mobile_wallet: state.mobile_wallet,
    }),
    ...(state.accountNumber && {
      account_number: state.accountNumber,
    }),
    sender_name: state.senderName,
    sender_address: state.senderAddress,
    sender_source_of_funds: state.senderSourceOfFunds,
    sender_id_type: state.senderIdType,
    sender_id_number: state.senderIdNumber,
    sender_id_country: state.senderIdCountry,
    ...(state.senderIdTypeOtherName && {
      sender_id_other_type_name: state.senderIdTypeOtherName,
    }),
    beneficiary_name: state.beneficiaryName,
    sending_country: state.sending_country,
    beneficiary_id_type: state.beneficiaryIdType,
    beneficiary_id_number: state.beneficiaryIdNumber,
  };

  // Submit form
  await axios
    .put(`batch-item/${transactionId}`, updated_values, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      // Stop loading status
      store.dispatch("isLoading");

      if (response.data.data.has_error) {
        Swal.fire({
          title: "Error",
          text: response.data.data.validation_error
            ? response.data.data.validation_error.split(",").join(" ")
            : "Invalid Data",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: "Batch transaction updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          // Redirect to batch transaction list
          router.push({
            name: "view-uploaded-transactions",
            params: { id: response.data.data.batch_code },
          });
        });
      }
    })
    .catch((error) => {
      // Stop loading status
      store.dispatch("isLoading");

      // Handle API Error
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
  .dashboard_inner_content_edit_uploaded_transaction_page {
  margin-top: 3rem;
  padding: 0 1.875rem;
  display: flex;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout {
  width: 80%;
  background: #fff;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  form {
  width: 70%;
  padding: 30px 0;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row {
  display: flex;
  justify-content: space-evenly;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 30%;
  margin-bottom: 15px;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input
  label {
  font-size: 12px;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input
  input,
.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input
  select {
  border: 1px solid #383d6f;
  border-radius: 3px;
  height: 45px;
  font-size: 16px;
  padding-left: 15px;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input
  input:focus,
.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input
  select:focus {
  outline: none;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .input-row
  .uploaded-transaction-input
  input:disabled {
  background: #f6f8fa;
  border: 1px solid #383d6f;
  color: #383d6f;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .edit-uploaded-transaction-button {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.layout_dashboard_content
  .dashboard_inner_content_edit_uploaded_transaction_page
  .edit-uploaded-transaction-layout
  .edit-uploaded-transaction-button
  button {
  background: #383d6f;
  border: none;
  width: 55%;
  color: #fff;
  height: 45px;
  border-radius: 3px;
  cursor: pointer;
}
</style>

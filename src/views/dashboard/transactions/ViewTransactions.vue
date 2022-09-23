<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_view_transaction">
        <div class="transaction_details_layout" v-if="transaction">
          <!-- Back Navigation Section -->
          <div class="transaction_details_back_navigation" @click="goBack">
            <div class="transaction_details_back_navigation_icon">
              <i class="fa-solid fa-arrow-left"></i>
            </div>
            <div class="transaction_details_back_navigation_text">
              <span>Transactions</span>
            </div>
          </div>
          <!-- End of Back Navigation Section -->
          <!-- Transaction Details Content -->
          <div class="transaction_details_content">
            <!-- Transaction details header -->
            <div class="transaction_details_content_header">
              <div class="transaction_details_content_header_icon_and_sender">
                <div class="transaction_details_content_header_icon">
                  <i
                    class="fa-solid fa-sack-dollar"
                    v-if="
                      transaction.transaction_type
                        .toLowerCase()
                        .includes('cash')
                    "
                  ></i>
                  <i
                    class="fa-solid fa-building-columns"
                    v-else-if="
                      transaction.transaction_type
                        .toLowerCase()
                        .includes('bank')
                    "
                  ></i>
                  <i
                    class="fa-solid fa-mobile-button"
                    v-else-if="
                      transaction.transaction_type
                        .toLowerCase()
                        .includes('mobile')
                    "
                  ></i>
                </div>
                <div class="transaction_details_content_header_text">
                  <span>{{ transaction.sender_name }} </span>
                  <span>{{ formatDate(transaction.created_at, true) }}</span>
                </div>
              </div>
              <div class="transaction_details_content_amount">
                <span
                  >{{ transaction.currency }}&nbsp;{{
                    formatAmount(transaction.amount)
                  }}</span
                >
              </div>
            </div>
            <!-- End of Transaction details header -->
            <!-- Transaction details content -->
            <div class="transaction_details">
              <div class="specific_transaction_and_payment_details">
                <div class="specific_transaction_details_layout">
                  <h3>Transaction Details</h3>
                  <div class="specific_transaction_details">
                    <div class="specific_transaction_details_label">
                      Reference:
                    </div>
                    <div class="specific_transaction_details_value">
                      <span>{{ transaction.reference }}</span>
                    </div>
                  </div>
                  <div class="specific_transaction_details">
                    <div class="specific_transaction_details_label">
                      Transaction Type:
                    </div>
                    <div class="specific_transaction_details_value">
                      <span>{{
                        capitalizeFirstLetterInEachWord(
                          removeSpecialCharacters(transaction.transaction_type)
                        )
                      }}</span>
                    </div>
                  </div>
                  <div class="specific_transaction_details">
                    <div class="specific_transaction_details_label">
                      Transaction Channel:
                    </div>
                    <div class="specific_transaction_details_value">
                      <span>{{
                        capitalizeFirstLetterInEachWord(transaction.channel)
                      }}</span>
                    </div>
                  </div>
                  <div class="specific_transaction_details">
                    <div class="specific_transaction_details_label">
                      Transaction Status:
                    </div>
                    <div class="specific_transaction_details_value">
                      <span>{{
                        capitalizeFirstLetterInEachWord(transaction.status)
                      }}</span>
                    </div>
                  </div>
                  <div class="specific_transaction_details">
                    <div class="specific_transaction_details_label">
                      Source Of Funds:
                    </div>
                    <div class="specific_transaction_details_value">
                      <span>{{
                        capitalizeFirstLetterInEachWord(
                          transaction.sender_source_of_funds
                        )
                      }}</span>
                    </div>
                  </div>
                  <div class="specific_transaction_details">
                    <div class="specific_transaction_details_label">
                      Sending Reason:
                    </div>
                    <div class="specific_transaction_details_value">
                      <span>{{
                        capitalizeFirstLetterInEachWord(
                          transaction.sending_reason
                            ? transaction.sending_reason
                            : ""
                        )
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="transaction_sender_details_layout">
                  <h3>Sender Details</h3>
                  <div class="transaction_sender_details">
                    <div class="transaction_sender_details_label">
                      Sender's Name:
                    </div>
                    <div class="transaction_sender_details_value">
                      <span>{{ transaction.sender_name }} </span>
                    </div>
                  </div>
                  <div class="transaction_sender_details">
                    <div class="transaction_sender_details_label">
                      Sender's Address:
                    </div>
                    <div class="transaction_sender_details_value">
                      <span>{{ transaction.sender_address }} </span>
                    </div>
                  </div>
                  <div class="transaction_sender_details">
                    <div class="transaction_sender_details_label">
                      Sender's Email:
                    </div>
                    <div class="transaction_sender_details_value">
                      <span>{{ transaction.sender_email }} </span>
                    </div>
                  </div>
                </div>
                <div class="transaction_beneficiary_details_layout">
                  <h3>Beneficiary Details</h3>
                  <div class="transaction_beneficiary_details">
                    <div class="transaction_beneficiary_details_label">
                      Beneficiary's Name:
                    </div>
                    <div class="transaction_beneficiary_details_value">
                      <span>{{ transaction.beneficiary_name }}</span>
                    </div>
                  </div>
                  <div
                    class="transaction_beneficiary_details"
                    v-if="
                      transaction.transaction_type
                        .toLowerCase()
                        .includes('cash') ||
                      transaction.transaction_type
                        .toLowerCase()
                        .includes('mobile')
                    "
                  >
                    <div class="transaction_beneficiary_details_label">
                      Phone Number:
                    </div>
                    <div class="transaction_beneficiary_details_value">
                      <span>+{{ transaction.phone_number }}</span>
                    </div>
                  </div>
                  <div class="transaction_beneficiary_details" v-else>
                    <div class="transaction_beneficiary_details_label">
                      Bank Account Number:
                    </div>
                    <div class="transaction_beneficiary_details_value">
                      <span>{{ transaction.bank_account_number }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End of Transaction details content -->
          </div>
          <!-- Print Details Section -->
          <div class="transaction_details_print_section">
            <div class="transaction_details_print_section_icon">
              <i class="fa-solid fa-print"></i>
            </div>
            <div class="transaction_details_print_section_text">
              <span>Print Details</span>
            </div>
          </div>
          <!-- End of Print Details Section -->
          <!-- Help Section -->
          <div class="transaction_details_help_section">
            <div class="transaction_details_help_section_first_column">
              <p>Need Help</p>
              <p>
                If there is a problem, make sure to contact the support team
                through the support email [support@fastpacetransfer.com]
              </p>
            </div>
            <div class="transaction_details_help_section_second_column">
              <p>
                <i class="fa-solid fa-triangle-exclamation"></i
                >&nbsp;&nbsp;Report Problem
              </p>
            </div>
          </div>
          <!-- End of Help Section -->
        </div>
      </div>
    </section>
    <!-- End of Content -->
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import type { Transaction } from "@/models/transactions/transaction.interface";
import PageLoader from "@/components/common/PageLoader.vue";
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "@/components/common/NavbarView.vue";
import axios from "axios";
import { handleAPIError } from "@/utils/handleAPIError";
import { formatDate } from "@/utils/formatDate";
import { formatAmount } from "@/utils/formatAmount";
import { capitalizeFirstLetterInEachWord } from "@/utils/capitalizeFirstLetter";
import { removeSpecialCharacters } from "@/utils/removeSpecialCharacters";

// Initialize store
const store = useStore();

// Initialize route
const route = useRoute();

// Initialize router
const router = useRouter();

// Get transaction id from route
const transaction_id = route.params.id;

// Get token
const token = computed(() => store.getters.getToken);

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Initialize transaction
const transaction = ref<Transaction>();

const goBack = () => {
  router.push({
    name: "browse-transactions",
  });
};

// Function to get single transaction

// Get single transaction when component is mounted
onMounted(async () => {
  await axios
    .get(`transaction/${transaction_id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      // Set loading status to false
      // store.dispatch("isLoading");

      // Set transactions
      transaction.value = response.data.data;
    })
    .catch((error) => {
      // Set loading status to false
      // store.dispatch("isLoading");

      // Set error
      handleAPIError(error);
    });
});
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

.layout_dashboard_content .dashboard_view_transaction {
  margin-top: 5rem;
  padding: 0 1.875rem;
  display: flex;
  justify-content: center;
}

.dashboard_view_transaction .transaction_details_layout {
  width: 85%;
}

/* Back Navigation Section */
.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_back_navigation {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: max-content;
  margin-bottom: 0.7rem;
  cursor: pointer;
  gap: 10px;
  font-size: 20px;
  color: var(--primary-color);
  font-weight: bold;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content {
  width: 100%;
  background: #fff;
  box-shadow: 0px 0px 2px #3db9fa88;
  border-radius: 3px;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details_content_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e6e6e6;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details_content_header
  .transaction_details_content_header_icon_and_sender {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details_content_header
  .transaction_details_content_header_icon_and_sender
  .transaction_details_content_header_icon {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background: #b24965;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #fff;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details_content_header
  .transaction_details_content_header_text {
  display: flex;
  flex-direction: column;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details_content_header
  .transaction_details_content_header_text
  span:nth-of-type(1) {
  font-weight: 700;
  color: #5a5a5a;
  font-size: 25px;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details_content_header
  .transaction_details_content_header_text
  span:nth-of-type(2) {
  font-weight: 400;
  color: #5a5a5a;
  font-size: 15px;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details_content_header
  .transaction_details_content_amount {
  font-weight: 700;
  color: #5a5a5a;
  font-size: 25px;
}

/* Transaction Details */
.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details {
  padding: 1.5rem;
  display: flex;
  color: #5a5a5a;
  border-bottom: 1px solid #e6e6e6;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .transaction_beneficiary_details_layout,
.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .transaction_sender_details_layout {
  width: 30%;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .specific_transaction_details_layout {
  width: 40%;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .transaction_beneficiary_details_layout
  h3,
.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .transaction_sender_details_layout
  h3,
.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .specific_transaction_details_layout
  h3 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 15px;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .transaction_beneficiary_details_layout
  .transaction_beneficiary_details,
.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .transaction_sender_details_layout
  .transaction_sender_details,
.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .specific_transaction_details_layout
  .specific_transaction_details {
  display: flex;
  font-size: 15px;
  margin-bottom: 0.4rem;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .transaction_beneficiary_details_layout
  .transaction_beneficiary_details
  .transaction_beneficiary_details_label,
.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .transaction_sender_details_layout
  .transaction_sender_details
  .transaction_sender_details_label,
.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .specific_transaction_details_layout
  .specific_transaction_details
  .specific_transaction_details_label {
  width: 40%;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .transaction_beneficiary_details_layout
  .transaction_beneficiary_details
  .transaction_beneficiary_details_value,
.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .transaction_sender_details_layout
  .transaction_sender_details
  .transaction_sender_details_value,
.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_content
  .transaction_details
  .specific_transaction_and_payment_details
  .specific_transaction_details_layout
  .specific_transaction_details
  .specific_transaction_details_value {
  width: 60%;
}

/* Print Section */
.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_print_section {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_print_section
  .transaction_details_print_section_icon {
  font-size: 35px;
  color: var(--primary-color);
}

.dashboard_view_transaction
  .transaction_details_layout
  .transaction_details_print_section
  .transaction_details_print_section_text {
  font-size: 20px;
  color: var(--primary-color);
  font-weight: 500;
}

/* Help Section */
.transaction_details_help_section {
  padding: 1.5rem;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0px 0px 2px #3db9fa88;
  color: #5a5a5a;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction_details_help_section
  .transaction_details_help_section_first_column {
  width: 50%;
}

.transaction_details_help_section
  .transaction_details_help_section_first_column
  p:nth-of-type(1) {
  color: var(--primary-color);
  font-size: 18px;
  font-weight: 500;
}

.transaction_details_help_section
  .transaction_details_help_section_second_column
  p {
  color: var(--primary-color);
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.transaction_details_help_section
  .transaction_details_help_section_second_column
  p
  i {
  color: #c84524;
  font-size: 30px;
}
</style>

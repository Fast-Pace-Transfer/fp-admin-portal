<template>
  <div class="table_layout">
    <div class="table">
      <div class="table_header">
        <h2>Funds Transfer History</h2>
        <div class="filter_fields_layout">
          <p>Filter by</p>
          <div class="filter_fields">
            <select>
              <option>Start Date</option>
            </select>
            <select>
              <option>End Date</option>
            </select>
            <select>
              <option>Status</option>
            </select>
          </div>
        </div>
      </div>
      <div class="table_container">
        <table>
          <thead>
            <tr>
              <th style="width: 15%">Date & Time</th>
              <th style="width: 24%">Reference</th>
              <th style="width: 13%">Debit Amount</th>
              <th style="width: 10%">Rate</th>
              <th style="width: 13%">Credit Amount</th>
              <th style="width: 10%">Status</th>
              <th style="width: 15%">Action</th>
            </tr>
          </thead>
          <tbody v-if="fundsTransferHistory.length">
            <tr v-for="transfer in fundsTransferHistory" :key="transfer.id">
              <td>
                {{
                  new Date(transfer.created_at)
                    .toLocaleDateString("en-US", options)
                    .replace("/", "-")
                    .replace("/", "-")
                    .replace(",", "  ")
                }}
              </td>
              <td>{{ transfer.reference }}</td>
              <td class="bold-fields">
                {{ transfer.pre_fund_account.currency }}
                {{
                  transfer.debit_amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </td>
              <td class="bold-fields">
                {{ transfer.rate ? transfer.rate : "N/A" }}
              </td>
              <td class="bold-fields">
                {{
                  transfer.credit_amount
                    ? `${
                        transfer.operations_account.currency
                      } ${transfer.credit_amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                    : "N/A"
                }}
              </td>
              <td class="status success" v-if="transfer.status === 'approved'">
                <span>{{
                  transfer.status.charAt(0).toUpperCase() +
                  transfer.status.slice(1)
                }}</span>
              </td>
              <td class="status pending" v-if="transfer.status === 'pending'">
                <span>{{
                  transfer.status.charAt(0).toUpperCase() +
                  transfer.status.slice(1)
                }}</span>
              </td>
              <td class="status error" v-if="transfer.status === 'rejected'">
                <span>{{
                  transfer.status.charAt(0).toUpperCase() +
                  transfer.status.slice(1)
                }}</span>
              </td>
              <td class="status error" v-if="transfer.status === 'canceled'">
                <span>{{
                  transfer.status.charAt(0).toUpperCase() +
                  transfer.status.slice(1)
                }}</span>
              </td>
              <td class="actions">
                <span
                  class="view"
                  @click="viewFundsTransferDetails(transfer.id)"
                  >Enquiry</span
                >
                <span
                  class="cancel"
                  v-if="transfer.status === 'pending'"
                  @click="cancelFundsTransfer(transfer.id)"
                  >Cancel</span
                >
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td :colspan="7" style="text-align: center">No data found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FundsTransferInterface } from "@/models/history/fundsTransfer.interface";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

// Initialize the store
const store = useStore();

// Initialize the router
const router = useRouter();

// Get token
const token = computed(() => store.getters.getToken);

// Initial values for funding history
const fundsTransferHistory = ref<FundsTransferInterface[]>([]);

// Options for date formatting
const options: Intl.DateTimeFormatOptions = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "numeric",
  second: "numeric",
};

onMounted(() => {
  // Get funding history
  axios
    .get("/account-transfer", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      fundsTransferHistory.value = response.data.data;
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.errors.join(" "),
      });
    });
});

// View funding details
const viewFundsTransferDetails = (id: string) => {
  // Route to the funding details page
  router.push({
    name: "transfer-history",
    params: { id: id },
  });
};

// Cancel funding
const cancelFundsTransfer = (id: string) => {
  // Prompt user to confirm cancellation
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, cancel it!",
  }).then((result) => {
    // If user confirms cancellation
    if (result.value) {
      // Cancel funding
      axios
        .put(`/account-transfer/${id}`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })
        .then(() => {
          // Get funding history
          axios
            .get("/account-transfer", {
              headers: {
                Authorization: `Bearer ${token.value}`,
              },
            })
            .then((response) => {
              fundsTransferHistory.value = response.data.data;
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response.data.errors.join(" "),
              });
            });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.errors.join(" "),
          });
        });
    }
  });
};
</script>

<style>
.table_layout {
  margin-top: 50px;
}

.table_layout .table_header {
  display: flex;
  align-items: center;
}

.table_layout .table_header h2 {
  color: #423e3b;
}

.table_layout .table_header .filter_fields_layout {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3rem;
  gap: 30px;
  width: 60%;
}

.table_layout .table_header .filter_fields_layout .filter_fields select {
  padding: 8px 13px;
  background: #fff;
  border: 1px solid #e9e9f0;
  color: rgba(21, 30, 63, 0.5);
  font-size: 13px;
}

.table_layout .table_header .filter_fields_layout .filter_fields select:focus {
  outline: none;
}

.table_layout
  .table_header
  .filter_fields_layout
  .filter_fields
  select:first-of-type {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.table_layout
  .table_header
  .filter_fields_layout
  .filter_fields
  select:last-of-type {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.table_layout .table_header .filter_fields_layout .filter_fields {
  display: flex;
  color: #151e3f;
}

.table .table_container {
  background: #fff;
  border-radius: 10px;
  padding: 30px 15px 10px 15px;
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.table table {
  width: 100%;
  border-collapse: collapse;
  padding: 20px 10px;
}

.table table thead tr {
  border-bottom: 2px solid #d7dbec;
  text-align: left;
}

.table table thead tr th {
  color: #423e3b;
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  padding-bottom: 5px;
}

.table table tbody tr {
  border-bottom: 2px solid #d7dbec;
  color: #423e3b;
  text-align: left;
  font-size: 14px;
}

.table table tbody tr:last-of-type {
  border-bottom: none;
}

.table table td {
  padding: 15px 0;
}

/* .status {
  text-align: center;
} */

.status span {
  border-radius: 5px;
  padding: 5px 10px;
  color: #2dfd1c;
}

.status.success span {
  color: #2dfd1c;
  background: #2dfd1c1a;
}

.status.error span {
  color: #fd1c25;
  background: #fd1c251a;
}

.status.pending span {
  color: #fdc91c;
  background: #fdc91c1a;
}

/* Actions row */

.actions span {
  border-radius: 3px;
  padding: 5px 15px;
  cursor: pointer;
}

.actions .view {
  color: #fff;
  background: var(--primary-color);
  margin-right: 10px;
}

.actions .cancel {
  color: #fff;
  background: #b24949;
}

/* Amount */
.bold-fields {
  font-weight: bold;
}
</style>

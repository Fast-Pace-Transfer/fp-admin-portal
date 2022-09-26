<template>
  <div class="table_layout">
    <div class="table">
      <div class="table_header">
        <h2>Account Funding History</h2>
        <div class="filter_fields_layout">
          <p>Filter by</p>
          <div class="filter_fields">
            <form>
              <div class="filter_input">
                <label for="start_date">Start Date</label>
                <input type="date" id="start_date" />
              </div>
              <div class="filter_input">
                <label for="end_date">End Date</label>
                <input type="date" id="end_date" />
              </div>
              <div class="filter_select">
                <select>
                  <option value="" disabled selected>Status</option>
                  <option v-for="(status, index) in statuses" :key="index">
                    {{ status.charAt(0).toUpperCase() + status.slice(1) }}
                  </option>
                </select>
              </div>
              <div class="filter_button">
                <button>Apply</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="table_container">
        <table>
          <thead>
            <tr>
              <th style="width: 20%">Date & Time</th>
              <th style="width: 20%">Reference</th>
              <th style="width: 20%">Amount</th>
              <th style="width: 20%">Funding Status</th>
              <th style="width: 20%">Action</th>
            </tr>
          </thead>
          <tbody v-if="fundingHistory.length">
            <tr v-for="history in fundingHistory" :key="history.id">
              <td>
                {{
                  new Date(history.created_at)
                    .toLocaleDateString("en-US", options)
                    .replace("/", "-")
                    .replace("/", "-")
                    .replace(",", "  ")
                }}
              </td>
              <td>{{ history.reference }}</td>
              <td class="bold-fields">
                {{ history.account.currency }}
                {{
                  history.amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </td>
              <td class="status success" v-if="history.status === 'approved'">
                <span>{{
                  history.status.charAt(0).toUpperCase() +
                  history.status.slice(1)
                }}</span>
              </td>
              <td class="status pending" v-if="history.status === 'pending'">
                <span>{{
                  history.status.charAt(0).toUpperCase() +
                  history.status.slice(1)
                }}</span>
              </td>
              <td class="status error" v-if="history.status === 'rejected'">
                <span
                  >{{
                    history.status.charAt(0).toUpperCase() +
                    history.status.slice(1)
                  }}
                </span>
              </td>
              <td class="actions">
                <a
                  :href="`mailto:support@fastpacetransfer?subject=Funding Request ${history.reference}`"
                  >Enquiry</a
                >
                <span
                  class="cancel"
                  v-if="history.status === 'pending'"
                  @click="cancelFunding(history.id)"
                  >Cancel</span
                >
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td :colspan="5" style="text-align: center">
                No funding data found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FundingHistoryInterface } from "@/models/history/fundingHistory.interface";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

// Initialize the store
const store = useStore();

// Initialize router
const router = useRouter();

// Get token
const token = computed(() => store.getters.getToken);

// Initial values for funding history
const fundingHistory = ref<FundingHistoryInterface[]>([]);

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
    .get("/account-funding/partner", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      fundingHistory.value = response.data.data;
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.errors.join(" "),
      });
    });
});

// List of statuses
const statuses = ["pending", "approved", "rejected"];

// Cancel funding
const cancelFunding = (id: string) => {
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
        .post(`/account-funding/${id}`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })
        .then(() => {
          // Get funding history
          axios
            .get("/account-funding/partner", {
              headers: {
                Authorization: `Bearer ${token.value}`,
              },
            })
            .then((response) => {
              fundingHistory.value = response.data.data;
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
  width: 80%;
}

.table_layout .table_header .filter_fields_layout .filter_fields form {
  display: flex;
}

.table_layout
  .table_header
  .filter_fields_layout
  .filter_fields
  form
  .filter_button {
  display: flex;
  align-items: flex-end;
  margin-left: 10px;
}

.table_layout
  .table_header
  .filter_fields_layout
  .filter_fields
  form
  .filter_button
  button {
  height: 36px;
  font-size: 13px;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 8px 13px;
  background: #6fda45;
  cursor: pointer;
}

.table_layout
  .table_header
  .filter_fields_layout
  .filter_fields
  form
  .filter_select {
  display: flex;
  align-items: flex-end;
}

.table_layout
  .table_header
  .filter_fields_layout
  .filter_fields
  form
  .filter_select
  select {
  padding: 8px 13px;
  background: #fff;
  border: 1px solid #e9e9f0;
  color: rgba(21, 30, 63, 0.5);
  font-size: 13px;
  height: 36px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.table_layout
  .table_header
  .filter_fields_layout
  .filter_fields
  form
  .filter_input {
  display: flex;
  flex-direction: column;
}

.table_layout
  .table_header
  .filter_fields_layout
  .filter_fields
  form
  .filter_input
  input {
  padding: 8px 13px;
  background: #fff;
  border: 1px solid #e9e9f0;
  color: rgba(21, 30, 63, 0.5);
  font-size: 13px;
}

#start_date {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.table_layout
  .table_header
  .filter_fields_layout
  .filter_fields
  form
  .filter_input
  label {
  font-size: 11px;
  color: rgba(21, 30, 63, 0.5);
}

.table_layout
  .table_header
  .filter_fields_layout
  .filter_fields
  form
  select:focus {
  outline: none;
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
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  padding-bottom: 5px;
}

.table table tbody tr {
  border-bottom: 2px solid #d7dbec;
  color: #423e3b;
  text-align: left;
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

.actions a {
  text-decoration: none;
  color: #fff;
  background: var(--primary-color);
  border-radius: 3px;
  padding: 5px 15px;
  cursor: pointer;
}

.actions .cancel {
  color: #fff;
  background: #b24949;
}

/* Amount */
.bold-fields {
  font-weight: bold;
}

@media screen and (min-width: 37.5rem) and (max-width: 64rem) {
  .table_layout .table_header {
    flex-direction: column;
    gap: 15px;
  }

  .table_layout .table_header .filter_fields_layout {
    width: 100%;
  }
}
</style>

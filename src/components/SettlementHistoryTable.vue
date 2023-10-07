<template>
  <div class="table_layout">
    <div class="table">
      <div class="table_header">
        <h2>Settlement History</h2>
      </div>
      <div class="table_container">
        <table>
          <thead>
            <tr>
              <th style="width: 15%">Date & Time</th>
              <th style="width: 24%">Settlement Amount</th>
              <th style="width: 13%">Settlement Rate</th>
              <th style="width: 10%">Cedi Equivalent</th>
              <th style="width: 10%">Status</th>
            </tr>
          </thead>
          <tbody v-if="settlements.length">
            <tr v-for="settlement in settlements" :key="settlement.id">
              <td>
                {{
                  new Date(settlement.created_at)
                    .toLocaleDateString("en-US", options)
                    .replace("/", "-")
                    .replace("/", "-")
                    .replace(",", "  ")
                }}
              </td>
              <td>
                {{
                  settlement.settlement_currency +
                  " " +
                  settlement.settlement_amount
                }}
              </td>
              <td class="bold-fields">
                {{ settlement.settlement_rate }}
              </td>
              <td class="bold-fields">
                {{ settlement.cedi_equivalent }}
              </td>
              <td
                class="status success"
                v-if="settlement.status === 'approved'"
              >
                <span>{{
                  settlement.status.charAt(0).toUpperCase() +
                  settlement.status.slice(1)
                }}</span>
              </td>
              <td class="status pending" v-if="settlement.status === 'pending'">
                <span>{{
                  settlement.status.charAt(0).toUpperCase() +
                  settlement.status.slice(1)
                }}</span>
              </td>
              <td class="status error" v-if="settlement.status === 'rejected'">
                <span>{{
                  settlement.status.charAt(0).toUpperCase() +
                  settlement.status.slice(1)
                }}</span>
              </td>
              <td class="status error" v-if="settlement.status === 'canceled'">
                <span>{{
                  settlement.status.charAt(0).toUpperCase() +
                  settlement.status.slice(1)
                }}</span>
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

interface Settlement {
  id: number;
  cedi_equivalent: number;
  created_at: string;
  settlement_amount: number;
  settlement_currency: string;
  settlement_rate: number;
  status: string;
}

// Initial values for funding history
const settlements = ref<Settlement[]>([]);

// Options for date formatting
const options: Intl.DateTimeFormatOptions = {
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "numeric",
  second: "numeric",
};

// Get partner_id
const partner_id = computed(() => store.getters.getUser.partner.id);

onMounted(() => {
  // Get funding history
  axios
    .get(`/account-settlements/${partner_id.value}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      settlements.value = response.data.data;
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

.actions a {
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

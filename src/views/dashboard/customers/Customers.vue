<template>
    <div class="layout_dashboard">
      <!-- Sidebar -->
      <SidebarView />
      <!-- End of sidebar -->
      <!-- Content -->
      <section class="layout_dashboard_content">
        <NavbarView />
        <div class="dashboard_inner_content">
          <div class="main_container">
            <div class="card">
              <h2>Customers</h2>
              <table class="customers-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Resident Country</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in customers" :key="user.id">
                    <td data-label="First Name">{{ user.first_name }}</td>
                    <td data-label="Last Name">{{ user.last_name }}</td>
                    <td data-label="Email">{{ user.email }}</td>
                    <td data-label="Phone Number">{{ user.phone_number }}</td>
                    <td data-label="Resident Country">{{ user.resident_country }}</td>
                    <td data-label="Actions">
                      <button>View</button>
                      <button>Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <!-- End of Content -->
    </div>
  </template>

<style>
.main_container {
  width: 100%;
  overflow-x: auto;
}

.card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 20px;
}

.card h2 {
  margin-bottom: 20px;
}

.customers-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  text-align: left;
}

.customers-table th, .customers-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.customers-table th {
  background-color: #f4f4f4;
}

.customers-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.customers-table tr:hover {
  background-color: #f1f1f1;
}

.customers-table button {
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 3px;
}

.customers-table button:hover {
  background-color: #0056b3;
}

@media screen and (max-width: 768px) {
  .customers-table thead {
    display: none;
  }

  .customers-table, .customers-table tbody, .customers-table tr, .customers-table td {
    display: block;
    width: 100%;
  }

  .customers-table tr {
    margin-bottom: 15px;
  }

  .customers-table td {
    text-align: right;
    padding-left: 50%;
    position: relative;
  }

  .customers-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-weight: bold;
    text-align: left;
  }
}

.layout_dashboard {
  height: 100vh;
  display: flex;
}

.layout_dashboard .layout_dashboard_content {
  background: #f6f8fa;
  width: calc(100% - 15.625rem);
  min-height: 100vh;
  margin-left: 15.625rem;
}

.dashboard_inner_content {
  margin-top: 5rem;
  padding: 0 1.875rem;
  display: flex;
  gap: 10%;
}

@media screen and (min-width: 37.5rem) and (max-width: 64rem) {
  .layout_dashboard_content .dashboard_inner_content {
    flex-direction: column;
    gap: 50px;
  }

  .layout_dashboard_content
    .dashboard_inner_content
    .dashboard_inner_left_column_content {
    width: 100%;
  }

  .layout_dashboard_content
    .dashboard_inner_content
    .dashboard_inner_right_column_content {
    width: 100%;
  }
}
</style>

<script setup lang="ts">
  import type { AccountInterface } from "@/models/accounts/account.interface";
  import type { Customer } from "@/models/customer/customer.interface";
  import { useStore } from "vuex";
  import { computed, ref, onMounted, watch } from "vue";
  import axios from "axios";
  import SidebarView from "@/components/common/SidebarView.vue";
  import NavbarView from "@/components/common/NavbarView.vue";
  import WalletView from "@/components/common/WalletView.vue";
  import GraphContainer from "@/components/GraphContainer.vue";
  import StatsCard from "@/components/common/StatsCard.vue";
  import { handleAPIError } from "@/utils/handleAPIError";
  import { capitalizeFirstLetterInEachWord } from "@/utils/capitalizeFirstLetter";
  import { removeSpecialCharacters } from "@/utils/removeSpecialCharacters";
  import type { TransactionStatistics } from "@/models/transactions/transactionStatistics.interface";


  // Initialize store
  const store = useStore();
  
  // Get token
  const token = computed(() => store.getters.getToken);
  
  // Get indicative rate
  const indicative_rate = ref(null);
  
  // Get operational account currency
  const operational_account_currency = computed(
    () => store.getters.getOperationalAccount[0]
  );
  
  const user = computed(() => store.getters.getUser);
  
  // Initial values for operational accounts
  const operationalAccount = ref<AccountInterface[]>([]);
  
  // Initial values for prefunding accounts
  const prefundingAccounts = ref<AccountInterface[]>([]);
  
 // Initial values for transaction history
  
  const transactionStatistics = ref<TransactionStatistics>();

  const customers = ref<Customer[]>();

  function getCustomers (){
        return axios.get("/api/customers", {
        headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5ZDViZmI5Zi01NThlLTQ0NjUtODczNC00ZjNmYzM2MjI4MDAiLCJqdGkiOiJjN2NkZGYwYTcxNzkzOWFhNjljYzU0YTVkOWNlMjE3NTZkOWFjNzFlOWQ3ODBjOTM5ZWFiNGZiNzAyODI5YTUwOWY1YmEwNzhmOTIyMmUyYiIsImlhdCI6MTczMTkyNjMzMC44NjAwNzgsIm5iZiI6MTczMTkyNjMzMC44NjAwODEsImV4cCI6MTc2MzQ2MjMzMC44MTg2MzcsInN1YiI6IjlkNWJmYzU3LWJlYTEtNGRmMC05Y2I5LTYwYWM5OTliYTNmYyIsInNjb3BlcyI6W119.i0XJyp-SnK63vnxddPi8KAl0wzQD9bYWERzvxtl2QII-i-VoHIfqc01FDrTdtpr0PHYA5VqLkdO80dG95SPLOl3V7DchWUm-taK8bq9iw9uc4F91bHIap6PxwvZYXeZl60GnhGxWTnUtXsYDYfoF7nHDg85269DWWY7kH5ZMvryLgcQU_SUS0up0ta_rP8fUDXcCut5S3u1PkjqLjyJWTEE4S_WcMfx2P0SJufcjc0d-uCwSr0ZMY2qBAISVj5v3pLNABBr9ClD9rcnthEcM27BVZvrgQ-njPPAke6UsYBxYe0o2BgMpODmfC74iQ0mjJIm_-ryr02G6uFRgGbznaOmDlX0L8QWJN1WxBK8iakz5sTerwC1PLpahAHse9-bg7_E5BKK38ySkWlYKZTUUHa42mueHQnIWLJ1yoO8UYCJKi_CtPHeKPWb0h4Zhr5g5Ockg_WBTou-m5E7tOmCG6u7l1ZqfWdAEb7EEq8SI8__7lMVoF1i2IzFmsEYuHReSuKalm1hH-Ct3_P6P2BbxmobI6hlqsfIpfPkzqy-neISt3OSLd56YrBj5tjEy33nV3FufQ_9Ggp-PUCq5SeJHt6R9YCAD0IBkODnXQ5d9mdkKfhoan7nRNyRuS37z-5YCm7pceovTGomx8W3tFwaa3lTNrngqPp2tVJyI2YRczio`,
        },
    });
  };
  


//   if (prefundingAccounts.value.length) {
//     watch(operational_account_currency, async (newCurrency, oldCurrency) => {
//       if (newCurrency) {
//         await axios
//           .get(
//             `account-transfer/rate/${prefundingAccounts.value[0].currency}/${newCurrency.currency}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token.value}`,
//               },
//             }
//           )
//           .then(function (response) {
//             indicative_rate.value = response.data.data.rate;
//           });
//       }
//     });
//   }
  
  
  // When component is mounted
  onMounted(async () => {
    // Set loading status
    store.dispatch("isLoading");
  
    // Get prefunding accounts and transactions
    await Promise.all([
    //   getPrefundingAccounts(),
    //   getTransactions(),
    //   getOperationalAccounts(),
    //   getTransactionStatistics(),
      getCustomers(),
    ])
      .then(function (results) {
        // Stop loading status
        store.dispatch("isLoading");
        // Set prefunding accounts

        //prefundingAccounts.value = results[0].data.data;


        // Get rate
        // if (prefundingAccounts.value.length) {
        //   axios
        //     .get(
        //       `account-transfer/rate/${prefundingAccounts.value[0].currency}/${operational_account_currency.value.currency}`,
        //       {
        //         headers: {
        //           Authorization: `Bearer ${token.value}`,
        //         },
        //       }
        //     )
        //     .then(function (response) {
        //       indicative_rate.value = response.data.data.rate;
        //     });
        // }
        // // Set transaction history
        // transactionHistory.value = results[1].data.data.transactions;
        // operationalAccount.value = results[2].data.data;
        // transactionStatistics.value = results[3].data.data;
        // console.log(results[3].data.data);
        customers.value = results[0].data.data;

        console.log(results[0].data.data)

      })
      .catch(function (error) {
        // Stop loading status
        store.dispatch("isLoading");
  
        // Handle error
        handleAPIError(error);
      });
  });
  

</script>
  
  
  
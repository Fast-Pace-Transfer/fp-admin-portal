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
            <!-- Card for Creating Entities -->
            <div class="card">
              <h2>Create New Entities</h2>
              <div class="button-group">
                <button @click="createRate">Create Rate</button>
                <button @click="createFee">Create Fee</button>
                <button @click="createPaymentChannel">Create Payment Channel</button>
                <button @click="createPaymentMethod">Create Payment Method</button>
                <button @click="createProcessor">Create Processor</button>
                <button @click="createAcquirer">Create Acquirer</button>
                <button @click="createCountry">Create Country</button>
              </div>
            </div>
            <!-- Card for Displaying Data -->
            <div class="card">
              <h2>Data Overview</h2>
              <!-- Replace this with your data display component or HTML -->
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Entity Type</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Sample data row -->
                  <tr v-for="(item, index) in dataItems" :key="index">
                    <td>{{ item.type }}</td>
                    <td>{{ item.name }}</td>
                    <td>
                      <button @click="editItem(item)">Edit</button>
                      <button @click="deleteItem(item)">Delete</button>
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
  
  <style scoped>
  /* Existing styles ... */
  
  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .button-group button {
    padding: 10px 15px;
    margin: 5px 0;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 3px;
  }
  
  .button-group button:hover {
    background-color: #0056b3;
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .data-table th,
  .data-table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
  }
  
  .data-table th {
    background-color: #f4f4f4;
  }
  
  .data-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .data-table tr:hover {
    background-color: #f1f1f1;
  }
  
  .data-table button {
    padding: 5px 10px;
    margin: 0 5px;
    border: none;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    border-radius: 3px;
  }
  
  .data-table button:hover {
    background-color: #218838;
  }
  </style>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  import SidebarView from "@/components/common/SidebarView.vue";
  import NavbarView from "@/components/common/NavbarView.vue";
  import axios from "axios";
  import { handleAPIError } from "@/utils/handleAPIError";
  
  // Initialize store
  const store = useStore();
  
  // Get token
  const token = computed(() => store.getters.getToken);
  
  // Data items for display in the table
  const dataItems = ref([
    // Sample data; replace with actual data fetched from your API
    { type: "Rate", name: "USD to EUR" },
    { type: "Fee", name: "Transaction Fee" },
    // ... more items
  ]);
  
  // Methods for creating entities
  function createRate() {
    // Implement your logic to create a rate
    console.log("Create Rate clicked");
  }
  
  function createFee() {
    // Implement your logic to create a fee
    console.log("Create Fee clicked");
  }
  
  function createPaymentChannel() {
    // Implement your logic to create a payment channel
    console.log("Create Payment Channel clicked");
  }
  
  function createPaymentMethod() {
    // Implement your logic to create a payment method
    console.log("Create Payment Method clicked");
  }
  
  function createProcessor() {
    // Implement your logic to create a processor
    console.log("Create Processor clicked");
  }
  
  function createAcquirer() {
    // Implement your logic to create an acquirer
    console.log("Create Acquirer clicked");
  }
  
  function createCountry() {
    // Implement your logic to create a country
    console.log("Create Country clicked");
  }
  
  // Methods for handling data items
  function editItem(item: any) {
    // Implement your logic to edit an item
    console.log("Edit clicked for", item);
  }
  
  function deleteItem(item: any) {
    // Implement your logic to delete an item
    console.log("Delete clicked for", item);
  }
  
  // Fetch data items when component is mounted
  onMounted(async () => {
    try {
      store.dispatch("isLoading");
      const response = await axios.get("/api/data-items", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      dataItems.value = response.data.data;
    } catch (error) {
      handleAPIError(error);
    } finally {
      store.dispatch("isLoading");
    }
  });
  </script>
  
  
  <style scoped>
  .fund-transfer-credits-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 18px;
    text-align: left;
  }
  
  .fund-transfer-credits-table th,
  .fund-transfer-credits-table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
  }
  
  .fund-transfer-credits-table th {
    background-color: #f4f4f4;
  }
  
  .fund-transfer-credits-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .fund-transfer-credits-table tr:hover {
    background-color: #f1f1f1;
  }
  
  .fund-transfer-credits-table button {
    padding: 5px 10px;
    margin: 0 5px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 3px;
  }
  
  .fund-transfer-credits-table button:hover {
    background-color: #0056b3;
  }
  </style>
  
  <style>
  .main_container {
    width: 100%;
    overflow-x: auto;
  }
  
  .card {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  
  .customers-table th,
  .customers-table td {
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
  
    .customers-table,
    .customers-table tbody,
    .customers-table tr,
    .customers-table td {
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
  

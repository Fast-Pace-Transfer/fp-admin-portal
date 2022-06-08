<template>
  <div class="graph_layout">
    <div class="graph_layout_header">
      <div class="graph_layout_header_title_and_average">
        <h3>Individual Transactions</h3>
        <p>Avg. 50,309</p>
      </div>
      <div class="graph_layout_header_select_element">
        <select>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 60 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>
    </div>
    <!-- <div class="graph_component">
      <BarCharts />
    </div> -->
  </div>
</template>

<script setup lang="ts"></script>

<style>
.graph_layout {
  border: 1px solid red;
}

.graph_layout .graph_layout_header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.graph_layout .graph_layout_header .graph_layout_header_title_and_average h3 {
  margin-bottom: 10px;
  color: #343434;
  font-size: 20px;
}

.graph_layout .graph_layout_header .graph_layout_header_title_and_average p {
  color: #4953b2;
  font-size: 15px;
  font-weight: bold;
}

.graph_layout .graph_layout_header .graph_layout_header_select_element select {
  height: 32px;
  border: 1px solid #d7dae2;
  border-radius: 4px;
  background: #fff;
  color: #383d6f;
  font-size: 12px;
  box-shadow: 0 2px 3px #0000000d;
}

.graph_layout
  .graph_layout_header
  .graph_layout_header_select_element
  select:focus {
  outline: none;
}
</style>

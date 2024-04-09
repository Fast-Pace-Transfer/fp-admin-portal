<template>
  <div class="dashboard_inner_right_column_stats_content">
    <div class="refresh-icon">
      <i class="fa-solid fa-rotate-right"></i>
    </div>
    <h4 class="title">{{ statsObject.title }}</h4>
    <p class="amount_of_transactions">
      {{
        statsObject.amount_of_transactions.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  statsObject: {
    type: Object,
    required: true,
  },
});
</script>

<style>
.dashboard_inner_right_column_stats_content {
  width: 50%;
  padding-left: 1.25rem;
  border-right: 1px solid #a5a5a58e;
  position: relative;
}

.dashboard_inner_right_column_stats_content:last-of-type {
  border-right: none;
}

.dashboard_inner_right_column_stats_content .title {
  color: #343434;
  font-size: 1.175rem;
  margin-bottom: 1.25rem;
  font-family: "Poppins", sans-serif;
  font-weight: normal;
}

.dashboard_inner_right_column_stats_content .amount_of_transactions {
  color: #343434;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 30px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}

.dashboard_inner_right_column_stats_content .bottom_stats {
  display: flex;
  gap: 0.3125rem;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
}

.dashboard_inner_right_column_stats_content
  .bottom_stats
  .bottom_stats_percentage,
.dashboard_inner_right_column_stats_content .bottom_stats .bottom_stats_icon {
  font-size: 15px;
}

.dashboard_inner_right_column_stats_content
  .bottom_stats
  .bottom_stats_percentage.drop,
.dashboard_inner_right_column_stats_content
  .bottom_stats
  .bottom_stats_icon.drop {
  color: #ff4e5a;
  font-weight: 600;
}

.dashboard_inner_right_column_stats_content
  .bottom_stats
  .bottom_stats_percentage.rise,
.dashboard_inner_right_column_stats_content
  .bottom_stats
  .bottom_stats_icon.rise {
  color: #32d513;
}

/* Refresh Icon */
.dashboard_inner_right_column_stats_content .refresh-icon {
  border: 1px solid red;
  position: absolute;
}
</style>

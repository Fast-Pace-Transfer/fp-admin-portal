<template>
  <div class="dashboard_inner_right_column_stats_content">
    <h4 class="title">{{ statsObject.title }}</h4>
    <p class="amount_of_transactions">
      {{
        statsObject.amount_of_transactions.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }}
    </p>
    <div class="bottom_stats">
      <div
        class="bottom_stats_percentage"
        :class="[{ rise: statsObject.rise }, { drop: statsObject.drop }]"
      >
        1.3%
      </div>
      <div
        class="bottom_stats_icon"
        :class="[{ rise: statsObject.rise }, { drop: statsObject.drop }]"
      >
        <i v-if="statsObject.rise" class="fa-solid fa-arrow-up"></i>
        <i v-else class="fa-solid fa-arrow-down"></i>
      </div>
      <div class="bottom_stats_text" v-if="statsObject.rise">
        rise in last hour
      </div>
      <div class="bottom_stats_text" v-if="statsObject.drop">
        drop in last hour
      </div>
    </div>
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
  padding-left: 20px;
  border-right: 1px solid #a5a5a58e;
}

.dashboard_inner_right_column_stats_content:last-of-type {
  border-right: none;
}

.dashboard_inner_right_column_stats_content .title {
  color: #343434;
  font-size: 1.175rem;
  margin-bottom: 20px;
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
  gap: 5px;
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
</style>

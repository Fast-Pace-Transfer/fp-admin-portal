<template>
  <div class="dashboard_inner_right_column_content_first_row">
    <StatsValue
      v-for="stats in props.statArray"
      :key="stats.title"
      :stats-object="stats"
    />
  </div>
</template>

<script lang="ts" setup>
import StatsValue from "@/components/common/StatsValue.vue";
// Props interface for stats
interface Props {
  statArray: Array<{
    title: string;
    amount_of_transactions: number | string;
    rise: boolean;
    drop: boolean;
  }>;
}

const props = defineProps<Props>();
</script>

<style>
.dashboard_inner_right_column_content_first_row {
  display: flex;
  box-shadow: 0px 0px 2px #00000029;
  border: 1px solid #a5a5a58e;
  border-radius: 0.9375rem;
  height: 10.5rem;
  padding: 10px 20px 15px 0;
}
</style>

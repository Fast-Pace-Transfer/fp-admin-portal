<template>
  <div class="chart_container"><canvas id="myChart"></canvas></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Chart from "chart.js/auto";
import { Legend } from "chart.js";
Chart.register(Legend);

onMounted(() => {
  const ctx = document.getElementById("myChart") as HTMLCanvasElement;
  ctx.getContext("2d");

  // Initialize chart
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          data: [6, 4, 2, 3, 5, 3, 4],
          backgroundColor: ["#4953B2"],
          borderColor: ["#4953B2"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 12,
          grid: {
            drawBorder: false,
            color: "#EAF0F4",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  myChart;
});
</script>

<style>
.chart_container {
  height: 100%;
  width: 100%;
}
</style>

<template>
  <div>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="Plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, h, PropType } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PluginOptionsByType,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "BarChart",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 200,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {},
    },
    plugins: {
      type: Object as PropType<PluginOptionsByType<"bar">>,
      default: () => {},
    },
  },
  setup(props) {
    const chartData = {
      labels: ["January", "February", "March"],
      datasets: [{ data: [40, 20, 12] }],
    };

    const chartOptions = { responsive: true };
    return {
      chartOptions,
      chartData,
      chartID: props.chartId,
      datasetIdKey: "dataset-id",
      Plugins: props.plugins,
      width: props.width,
        height: props.height,
    };
  },
});
</script>

<style scoped></style>

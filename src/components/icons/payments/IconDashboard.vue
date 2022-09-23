<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.67 44.29">
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <g id="noun-dashboard-1237026">
          <path
            id="Path_1052"
            data-name="Path 1052"
            class="cls-1"
            :class="{ active: isActive }"
            d="M23.7,0h20V14.09h-20Z"
          />
          <path
            id="Path_1053"
            data-name="Path 1053"
            class="cls-1"
            :class="{ active: isActive }"
            d="M0,26.48H20V0H0Z"
          />
          <path
            id="Path_1054"
            data-name="Path 1054"
            class="cls-1"
            :class="{ active: isActive }"
            d="M23.7,17.81h20V44.29h-20Z"
          />
          <path
            id="Path_1055"
            data-name="Path 1055"
            class="cls-1"
            :class="{ active: isActive }"
            d="M0,30.2H20V44.29H0Z"
          />
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  isActive: {
    type: Boolean,
  },
});
</script>

<style>
.cls-1 {
  fill: #a5a5a5;
}

.cls-1.active {
  fill: var(--primary-color);
}
</style>

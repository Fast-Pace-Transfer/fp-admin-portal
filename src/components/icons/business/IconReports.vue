<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.37 25.21">
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" data-name="Layer 1">
        <path
          id="Path_1176"
          data-name="Path 1176"
          class="cls-1"
          :class="{ active: isActive }"
          d="M5.2,11.24H7.94a1.11,1.11,0,0,0,1-1.19,1.09,1.09,0,0,0-1-1H5.2a1.1,1.1,0,0,0-1,1.18A1.11,1.11,0,0,0,5.2,11.24Z"
        />
        <path
          id="Path_1177"
          data-name="Path 1177"
          class="cls-1"
          :class="{ active: isActive }"
          d="M18.08,2.74h0A3.28,3.28,0,0,0,14.8,0H6a1.1,1.1,0,0,0-.79.33l-4.9,5A1.09,1.09,0,0,0,0,6.1V18.64a3.29,3.29,0,0,0,2.74,3.24v.05A3.28,3.28,0,0,0,6,25.21h12a3.28,3.28,0,0,0,3.29-3.28V6A3.29,3.29,0,0,0,18.08,2.74Zm-13.15,1V5.21H3.5ZM2.19,18.64V7.4H4.93A2.19,2.19,0,0,0,7.12,5.21v-3H14.8a1.11,1.11,0,0,1,1.1,1.1h0V18.64a1.11,1.11,0,0,1-1.1,1.1H3.28a1.11,1.11,0,0,1-1.1-1.1h0Zm17,3.29a1.1,1.1,0,0,1-1.1,1.1H6a1.11,1.11,0,0,1-1.1-1.1h9.87a3.29,3.29,0,0,0,3.29-3.29V4.93A1.1,1.1,0,0,1,19.18,6h0Z"
        />
        <path
          id="Path_1178"
          data-name="Path 1178"
          class="cls-1"
          :class="{ active: isActive }"
          d="M5.2,14.53h7.68a1.1,1.1,0,0,0,0-2.2H5.2a1.1,1.1,0,0,0,0,2.2Z"
        />
        <path
          id="Path_1179"
          data-name="Path 1179"
          class="cls-1"
          :class="{ active: isActive }"
          d="M5.2,17.82h7.68a1.1,1.1,0,1,0,.18-2.2H5.2A1.1,1.1,0,1,0,5,17.82Z"
        />
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

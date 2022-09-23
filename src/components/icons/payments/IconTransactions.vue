<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.42 13.09">
    <g id="Layer_2" data-name="Layer 2">
      <g id="OBJECTS">
        <g id="Group_604" data-name="Group 604">
          <g id="noun-send-1322943">
            <path
              id="Path_1221"
              data-name="Path 1221"
              class="cls-1"
              :class="{ active: isActive }"
              d="M6.27,12.69a.4.4,0,0,1-.39.4H5.82A6.63,6.63,0,0,1,0,6.57,6.64,6.64,0,0,1,6.71,0a6.64,6.64,0,0,1,6.71,6.57,6.62,6.62,0,0,1-5.81,6.52h0a.39.39,0,0,1-.44-.34V5.21c0-.12.07-.15.15-.06L9.07,6.87a.44.44,0,0,0,.63,0,.45.45,0,0,0,0-.63L7.09,3.67a.54.54,0,0,0-.78,0L3.72,6.25a.45.45,0,0,0,0,.63.44.44,0,0,0,.63,0L6.11,5.15c.08-.09.15-.06.15.06Z"
            />
          </g>
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

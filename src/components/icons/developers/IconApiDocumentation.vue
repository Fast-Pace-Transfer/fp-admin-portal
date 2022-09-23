<template>
  <template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.57 37.15">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g id="noun-api-documentation-4257259">
            <path
              id="Path_1063"
              data-name="Path 1063"
              class="cls-1"
              :class="{ active: isActive }"
              d="M37.42,10.53H31.16v-9A1.52,1.52,0,0,0,29.65,0H3.85A1.52,1.52,0,0,0,2.33,1.51V19.73H4v-18H29.45v8.83H28.22V3.2H5.27V18.27h14v2.38H0v2.89a1.53,1.53,0,0,0,1.51,1.51H19.27V35.59a1.56,1.56,0,0,0,1.56,1.56H42a1.55,1.55,0,0,0,1.55-1.56V16.82ZM19.27,23.34H1.71v-1H19.27ZM7.05,10.24V9.59h4v.65Zm7.32-4.57-2.3.91,2.3.93v.86L11.3,7.07v-1l3.07-1.27ZM41.86,35.45H21V12.24H36.68l0,0V16.7h0a.64.64,0,0,0,.64.66h4.35l.12.12Z"
            />
            <path
              id="Path_1064"
              data-name="Path 1064"
              class="cls-1"
              :class="{ active: isActive }"
              d="M24.79,21.12H38.13V22H24.79Z"
            />
            <path
              id="Path_1065"
              data-name="Path 1065"
              class="cls-1"
              :class="{ active: isActive }"
              d="M24.79,16.7h5.83v.85H24.79Z"
            />
            <path
              id="Path_1066"
              data-name="Path 1066"
              class="cls-1"
              :class="{ active: isActive }"
              d="M24.79,25.54H38.13v.86H24.79Z"
            />
            <path
              id="Path_1067"
              data-name="Path 1067"
              class="cls-1"
              :class="{ active: isActive }"
              d="M24.79,30H38.13v.85H24.79Z"
            />
          </g>
        </g>
      </g>
    </svg>
  </template>
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

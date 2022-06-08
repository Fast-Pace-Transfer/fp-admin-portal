<template>
  <div
    class="account_design"
    :style="{
      width: width,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
    }"
  >
    <div class="title">
      <p>{{ title }}</p>
    </div>
    <div class="account_balance">
      <p>{{ balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</p>
    </div>
    <div class="account_change" v-if="switchable">
      <p>Switch</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "Prefunded Balance",
  },
  balance: {
    type: String,
    default: "$ 24,556",
  },
  width: {
    type: String,
    default: "100%",
  },
  backgroundColor: {
    type: String,
  },
  borderColor: {
    type: String,
  },
  switchable: {
    type: Boolean,
  },
});
</script>

<style>
.account_design {
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  position: relative;
  height: 12.75rem;
  background-repeat: no-repeat;
  background-image: url("@/assets/images/wallet.svg");
  background-position: right -132px bottom -80px;
  position: relative;
}

.account_design .title {
  font-size: 20px;
  color: #fff;
  padding: 20px;
}

.account_design .account_balance {
  font-size: 40px;
  color: #fff;
  padding: 0 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
}

.account_design .account_change {
  position: absolute;
  top: 12px;
  right: 30px;
  color: var(--primary-color);
  font-size: 12px;
  background: #fff;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  padding: 3px 10px;
}
</style>

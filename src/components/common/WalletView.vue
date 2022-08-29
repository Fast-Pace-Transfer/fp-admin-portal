<template>
  <div
    class="account_design"
    :style="{
      width: width,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      backgroundImage: backgroundImage,
    }"
  >
    <div class="title">
      <p>{{ title }}</p>
    </div>
    <div class="account_balance">
      <p v-if="account[0]">
        {{ account[0].symbol }}&nbsp;
        {{
          account[0].balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
      </p>
    </div>
    <div class="account_change" v-if="switchable">
      <p>Switch</p>
    </div>
  </div>
  <div class="request_or_transfer_funds" v-if="showRequest && account[0]">
    <p
      v-if="type === 'operation'"
      @click="reRoute(account[0].id, type, account[0].currency)"
    >
      {{ account[0].currency }} Funds Request
      <i class="fa-solid fa-circle-right"></i>
    </p>
    <p
      v-if="type === 'pre-fund'"
      @click="reRoute(account[0].id, type, account[0].currency)"
    >
      {{ account[0].currency }} Funds Request
      <i class="fa-solid fa-circle-right"></i>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { AccountInterface } from "@/models/accounts/account.interface";
import { useRouter } from "vue-router";
const prop = defineProps({
  account: {
    type: Array<AccountInterface>,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  showRequest: {
    type: Boolean,
    required: true,
  },
  backgroundColor: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true,
  },
  borderColor: {
    type: String,
    required: true,
  },
  switchable: {
    type: Boolean,
    required: true,
  },
});
// Initialize router
const router = useRouter();
const reRoute = (id: string, type: string, currency: string) => {
  if (type !== "pre-fund") {
    router.push({
      name: "transfer-funds",
      params: {
        id: id,
        type: type,
        currency: currency,
      },
    });
  } else {
    router.push({
      name: "funding-request",
      params: {
        id: id,
        type: type,
        currency: currency,
      },
    });
  }
};
</script>

<style>
.account_design {
  border-style: solid;
  border-width: 1px;
  border-radius: 15px;
  position: relative;
  height: 15.75rem;
  background-repeat: no-repeat;
  background-position: right -132px bottom -100px;
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
  margin-top: 30px;
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

.request_or_transfer_funds {
  text-align: right;
  padding: 10px 0;
  color: #383d6f;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
  width: 500px;
}

.request_or_transfer_funds p {
  width: 40%;
  cursor: pointer;
}
</style>

<template>
  <div class="layout">
    <PageLoader v-if="loading" />
    <!-- Left content -->
    <div class="layout_left_content">
      <div class="layout_left_inner_content">
        <!-- Logo -->
        <div class="layout_logo">
          <img src="@/assets/images/logo.png" alt="Vue logo" />
        </div>
        <!-- End of Logo -->
        <!-- Login Form -->
        <div class="form_container">
          <!-- Title -->
          <h2 class="form_title">Set Up Two Factor Authentication</h2>
          <!-- End of title -->
          <!-- Small text -->
          <p class="welcome-text">
            Scan the QR code with your authenticator app to setup two factor
            authentication. If you can't scan the code, you can enter the code
            manually.
          </p>
          <!-- End of Small text -->
          <!-- QR container -->
          <div class="qr_container">
            <!-- QR code -->
            <p>{{ setup2FA.secret }}</p>
            <!-- QR code -->
            <!-- QR Image -->
            <div class="qr_image" v-html="setup2FA.qr_image"></div>
            <!-- QR Image -->
          </div>
          <!-- End of QR Container -->
          <!-- Registration button -->
          <div class="button_container">
            <button type="submit" @click="goToVerificationPage">Set Up</button>
          </div>
          <!-- End of Registration button -->
        </div>
        <!-- End of Login Form -->
        <!-- <p class="terms">Term of use & Privacy policy</p> -->
      </div>
    </div>
    <!-- Right content -->
    <div class="layout_right_content">
      <div class="layout_right_inner_content">
        <TwoFactorAuthSetupSVG />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TwoFactorAuthSetupSVG from "../../components/icons/auth/TwoFactorAuthSetupSVG.vue";
import PageLoader from "@/components/common/PageLoader.vue";
import axios from "axios";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { handleAPIError } from "@/utils/handleAPIError";

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Create interface for 2FA setup
interface Setup2FA {
  secret: string;
  qr_image: string;
}
const setup2FA = ref<Setup2FA>({
  secret: "",
  qr_image: "",
});

// When component is mounted
onMounted(() => {
  store.dispatch("isLoading");
  axios
    .post(
      "/api/auth/two-factor/enable",
      {},
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    )
    .then((response) => {
      store.dispatch("isLoading");
      setup2FA.value = response.data.data;
    })
    .catch((error) => {
      handleAPIError(error);
    });
});

// Route to verification page
const goToVerificationPage = () => {
  router.push({
    name: "2fa-verify",
  });
};
</script>

<style>
.form_title {
  text-align: center;
  margin-bottom: 1rem;
}

.qr_container {
  border: 1px solid #e6e6e6;
  margin-top: 20px;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
}

.qr_container p {
  margin-bottom: 1rem;
  font-weight: bold;
}

.qr_container .qr_image {
  width: 200px;
  height: 200px;
  background: #e6e6e6;
  border-radius: 5px;
}

.button_container {
  margin-top: 20px;
}

.button_container button {
  background: var(--primary-color);
  color: #fff;
  border: 1px solid #151e3f;
  height: 40px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  border-radius: 3px;
}
</style>

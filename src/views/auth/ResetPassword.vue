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
        <!-- Reset Password Form -->
        <div class="form_container">
          <!-- Small text -->
          <h2 class="reset-password-text">Reset Your Password</h2>
          <!-- End of Small text -->
          <!-- Form -->
          <form @submit.prevent="changePassword">
            <!-- Input -->
            <div class="input_container">
              <label for="new_password">New Password</label>
              <input
                id="new_password"
                type="password"
                v-model="state.new_password"
                required
              />
            </div>
            <!-- End of Input -->
            <!-- Input -->
            <div class="input_container">
              <label for="confirm_password">Confirm New Password</label>
              <input
                id="confirm_password"
                type="password"
                v-model="state.confirm_password"
                required
              />
            </div>
            <!-- End of Input -->
            <!-- Button -->
            <div class="button_container">
              <button type="submit">Reset Password</button>
            </div>
            <!-- End of Button -->
          </form>
          <!-- End of Form -->
        </div>
        <!-- End of Reset Password Form -->
        <!-- <p class="terms">Term of use & Privacy policy</p> -->
      </div>
    </div>
    <!-- Right content -->
    <div class="layout_right_content">
      <div class="layout_right_inner_content">
        <ChangePasswordSVG />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChangePasswordSVG from "../../components/icons/auth/ChangePasswordSVG.vue";
import PageLoader from "@/components/common/PageLoader.vue";
import axios from "axios";
import Swal from "sweetalert2";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Initialize state
const state = {
  new_password: "",
  confirm_password: "",
};

// Initialize loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Submit form
const changePassword = async () => {
  // Check if passwords match
  if (state.new_password !== state.confirm_password) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Passwords do not match!",
    });
  } else {
    // Get the form data
    const data = {
      password: state.new_password,
      password_confirmation: state.confirm_password,
    };

    // Set loading status
    store.dispatch("isLoading");

    // Send the form data to the server
    await axios
      .post("/change-password", data, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((response) => {
        // If the response is successful
        if (response.status === 200) {
          store.dispatch("isLoading");

          // Show success message
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Password changed successfully!",
          });

          // Redirect to login page
          router.push({ name: "login" });
        }
      })
      .catch((error) => {
        // If the response is unsuccessful
        if (error.response) {
          store.dispatch("isLoading");

          // Show error message
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.errors.join(" "),
          });
        }
      });
  }
};
</script>

<style>
.reset-password-text {
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}
</style>

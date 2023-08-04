<template>
  <div class="layout">
    <PageLoader v-if="loading" />
    <!-- Left content -->
    <div class="layout_left_content">
      <div class="layout_left_inner_content">
        <!-- Logo -->
        <div class="layout_logo">
          <img src="@/assets/images/logo.png" alt="fast pace logo" />
        </div>
        <!-- End of Logo -->
        <!-- Login Form -->
        <div class="form_container">
          <!-- Small text -->
          <p class="welcome-text">
            Welcome back! Please enter your account details.
          </p>
          <!-- End of Small text -->
          <!-- Form -->
          <form @submit.prevent="submitLoginForm">
            <!-- Input -->
            <div class="input_container">
              <label for="email">Email</label>
              <input id="email" type="email" v-model="state.email" required />
            </div>
            <!-- End of Input -->
            <!-- Input -->
            <div class="input_container">
              <label for="password">Password</label>
              <input
                id="password"
                type="password"
                v-model="state.password"
                required
              />
            </div>
            <!-- End of Input -->
            <!-- Reset password text -->
            <p class="forgot-password">Forgot password</p>
            <!-- End of Reset password text -->
            <!-- Button -->
            <div class="button_container">
              <button type="submit">Sign In</button>
            </div>
            <!-- End of Button -->
          </form>
          <!-- End of Form -->
        </div>
        <!-- End of Login Form -->
        <!-- <p class="terms">Term of use & Privacy policy</p> -->
      </div>
    </div>
    <!-- Right content -->
    <div class="layout_right_content">
      <div class="layout_right_inner_content">
        <LoginSVG />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginSVG from "@/components/icons/auth/LoginSVG.vue";
import PageLoader from "@/components/common/PageLoader.vue";
import axios from "axios";
import { handleAPIError } from "@/utils/handleAPIError";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";

// Initial values for login form
const state = {
  email: "",
  password: "",
};

// Initialize the store
const store = useStore();

// Initialize router
const router = useRouter();

// Get loading status
const loading = computed(() => {
  return store.getters.getLoadingStatus;
});

// Submit login form
const submitLoginForm = async () => {
  // Set loading status
  store.dispatch("isLoading");
  // Get the form data
  const loginData = {
    email: state.email,
    password: state.password,
  };

  // Set CSRF token
  await axios.get(`${import.meta.env.VITE_CSRF_URL}/sanctum/csrf-cookie`);

  // Send the form data to the server
  await axios
    .post("/login", loginData)
    .then((response) => {
      // If the response is successful
      if (response.status === 200) {
        store.dispatch("isLoading");

        // Set token
        store.dispatch("setToken", response.data.data.token.access_token);

        // Set user data
        const userData = {
          id: response.data.data.id,
          email: response.data.data.email,
          role: response.data.data.role,
          two_fa_active: response.data.data.two_fa_active,
          partner: {
            id: response.data.data.partner.id,
            name: response.data.data.partner.name,
            can_upload_batch: response.data.data.partner.can_upload_batch,
          },
        };
        store.dispatch("setUserData", userData);

        // Set role
        store.dispatch("setRole", response.data.data.role);
        // Redirect to change password view
        if (response.data.data.password_changed !== null) {
          if (response.data.data.two_fa_active === true) {
            // Redirect to 2FA verification view
            router.push({ name: "2fa-verify" });
          } else {
            // Redirect to 2FA setup view
            router.push({ name: "2fa-setup" });
          }
        } else {
          router.push({ name: "change-password" });
        }
      }
    })
    .catch((error) => {
      store.dispatch("isLoading");
      handleAPIError(error);
    });
};
</script>
<style>
.layout {
  height: 100vh;
  display: flex;
}

.layout .layout_left_content {
  width: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  padding-top: 105px;
  padding-bottom: 10px;
}

.layout .layout_left_content .layout_left_inner_content {
  width: 62.4%;
  padding: 0 50px;
}

.layout .layout_left_content .layout_left_inner_content .layout_logo {
  height: 120px;
  width: 100%;
  padding: 30px;
}

.layout .layout_left_content .layout_left_inner_content .layout_logo img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.layout .layout_left_content .layout_left_inner_content .form_container {
  width: 100%;
  margin-top: 20px;
}

.layout
  .layout_left_content
  .layout_left_inner_content
  .form_container
  .welcome-text {
  font-family: "Open Sans", sans-serif;
  color: #4d4f5c;
  text-align: center;
  opacity: 0.5;
}

.layout .layout_left_content .layout_left_inner_content .form_container form {
  margin-top: 35px;
}

.layout
  .layout_left_content
  .layout_left_inner_content
  .form_container
  form
  .input_container {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.layout
  .layout_left_content
  .layout_left_inner_content
  .form_container
  form
  .input_container:nth-of-type(1) {
  margin-bottom: 20px;
}

.layout
  .layout_left_content
  .layout_left_inner_content
  .form_container
  form
  .input_container
  input {
  height: 40px;
  border: 1px solid #e3e3e3;
  border-radius: 3px;
  padding: 10px 40px;
  background: #fff;
  font-size: 14px;
  color: #343434;
}

.layout
  .layout_left_content
  .layout_left_inner_content
  .form_container
  form
  .input_container
  input:focus {
  outline: none;
}

.layout
  .layout_left_content
  .layout_left_inner_content
  .form_container
  form
  .input_container
  label {
  color: #5a5a5a;
  font-size: 12px;
}

.layout
  .layout_left_content
  .layout_left_inner_content
  .form_container
  form
  .forgot-password {
  margin-top: 10px;
  font-size: 12px;
  cursor: pointer;
  color: #151e3f;
}

.layout
  .layout_left_content
  .layout_left_inner_content
  .form_container
  form
  .button_container {
  margin-top: 30px;
}

.layout
  .layout_left_content
  .layout_left_inner_content
  .form_container
  form
  .button_container
  button {
  background: var(--primary-color);
  color: #fff;
  border: 1px solid #151e3f;
  height: 40px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  border-radius: 3px;
}

.layout .layout_left_content .layout_left_inner_content .terms {
  font-size: 12px;
  text-align: center;
  margin-top: 210px;
}

.layout .layout_right_content {
  width: 50%;
  background: var(--primary-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.layout .layout_right_content .layout_right_inner_content {
  width: 80%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

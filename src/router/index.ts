import store from "../store/index";
import { computed, h, resolveComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import DashboardView from "@/views/dashboard/DashboardView.vue";

// Navigation Guards

const token = computed(() => {
  return store.getters.getToken;
});

const role = computed(() => {
  return store.getters.getRole;
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/auth/login",
    },
    {
      path: "/auth/login",
      name: "login",
      component: LoginView,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/auth/change-password",
      name: "change-password",
      component: () => import("../views/auth/ResetPassword.vue"),
      meta: {
        title: "Change Password",
        requiresAuth: true,
      },
    },
    {
      path: "/auth/2fa/setup",
      name: "2fa-setup",
      component: () => import("../views/auth/TwoFactorAuthSetup.vue"),
      meta: {
        title: "2FA Setup",
        requiresAuth: true,
      },
    },
    {
      path: "/auth/2fa/verify",
      name: "2fa-verify",
      component: () => import("../views/auth/TwoFactorAuthVerify.vue"),
      meta: {
        title: "2FA Verification",
        requiresAuth: true,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: {
        title: "Dashboard",
        requiresAuth: true,
        checkRole: ["admin", "finance", "user", "developer"],
      },
    },
    {
      path: "/prefunded-account",
      name: "prefunded-account",
      component: {
        render: () => h(resolveComponent("router-view")),
      },
      children: [
        {
          path: "",
          name: "browse-prefunded-account",
          component: () =>
            import("@/views/dashboard/account/BrowsePrefundingAccount.vue"),
          meta: {
            title: "Browse Prefunded Accounts",
            requiresAuth: true,
            checkRole: ["admin", "finance", "user"],
          },
        },
        {
          path: "request-funding",
          name: "request-funding",
          component: () =>
            import(
              "@/views/dashboard/account/PrefundingAccountFundingRequest.vue"
            ),
          meta: {
            title: "Request Funding",
            requiresAuth: true,
            checkRole: ["admin", "finance", "user"],
          },
        },
      ],
    },
    {
      path: "/operational-accounts",
      name: "accounts",
      component: {
        render: () => h(resolveComponent("router-view")),
      },
      children: [
        {
          path: "",
          name: "browse-operational-accounts",
          component: () =>
            import("@/views/dashboard/wallets/BrowseOperationalAccounts.vue"),
          meta: {
            title: "Browse Operational Accounts",
            requiresAuth: true,
            checkRole: ["admin", "finance", "user"],
          },
        },
        {
          path: "transfer-funds",
          name: "transfer-funds",
          component: () =>
            import("@/views/dashboard/wallets/AccountFunding.vue"),
          meta: {
            title: "Transfer Funds",
            requiresAuth: true,
            checkRole: ["admin", "finance", "user"],
          },
        },
      ],
    },
  ],
});

router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title = `${toRoute.meta.title} | Fast Pace Transfer`;
  if (toRoute.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!token.value) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

// router.beforeEach((toRoute, fromRoute, next) => {
//   window.document.title = `${toRoute.meta.title} | Fast Pace Transfer`;
//   if (toRoute.matched.some((record) => record.meta.checkRole)) {
//     if (
//       toRoute.meta.checkRole instanceof Array &&
//       toRoute.meta.checkRole !== null
//     ) {
//       if (!toRoute.meta.checkRole.includes(role.value)) {
//         next({ path: "/:catchAll(.*)" });
//       } else {
//         next();
//       }
//     }
//   } else {
//     next();
//   }
// });

export default router;

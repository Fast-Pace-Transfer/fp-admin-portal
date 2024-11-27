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
        checkRole: ["admin", "finance"],
      },
    },
    {
      path: "/accounts",
      name: "accounts",
      component: {
        render: () => h(resolveComponent("router-view")),
      },
      children: [
        {
          path: "",
          name: "browse-accounts",
          component: () => import("@/views/dashboard/account/AccountsView.vue"),
          meta: {
            title: "Browse Accounts",
            requiresAuth: true,
            checkRole: ["admin", "finance"],
          },
        },
        {
          path: "transfer-funds/:id/:type/:currency",
          name: "transfer-funds",
          component: () =>
            import("@/views/dashboard/wallets/FundsTransfer.vue"),
          meta: {
            title: "Transfer Funds",
            requiresAuth: true,
            checkRole: ["admin", "finance"],
          },
        },
        {
          path: "funding-request/:id/:type/:currency",
          name: "funding-request",
          component: () =>
            import(
              "@/views/dashboard/account/PrefundingAccountFundingRequest.vue"
            ),
          meta: {
            title: "Funding Request",
            requiresAuth: true,
            checkRole: ["admin", "finance"],
          },
        },
        {
          path: "funding-history/:id",
          name: "funding-history",
          component: () =>
            import("@/views/dashboard/account/FundingHistoryDetails.vue"),
          meta: {
            title: "Funding History",
            requiresAuth: true,
            checkRole: ["admin", "finance"],
          },
        },
        {
          path: "transfer-history/:id",
          name: "transfer-history",
          component: () =>
            import("@/views/dashboard/account/TransferHistoryDetails.vue"),
          meta: {
            title: "Transfer History",
            requiresAuth: true,
            checkRole: ["admin", "finance"],
          },
        },
      ],
    },
    {
      path: "/transactions",
      name: "transactions",
      component: {
        render: () => h(resolveComponent("router-view")),
      },
      children: [
        {
          path: "",
          name: "browse-transactions",
          component: () =>
            import("@/views/dashboard/transactions/BrowseTransactions.vue"),
          meta: {
            title: "Browse Transactions",
            requiresAuth: true,
            checkRole: ["admin", "finance", "user", "dev"],
          },
        },
        {
          path: "view/:id",
          name: "view-transactions",
          component: () =>
            import("@/views/dashboard/transactions/ViewTransactions.vue"),
          meta: {
            title: "View Transaction",
            requiresAuth: true,
            checkRole: ["admin", "finance", "user", "dev"],
          },
        },
      ],
    },

    {
      path: "/customers",
      name: "customers",
      component: () => import("@/views/dashboard/customers/Customers.vue"),
    },

    {
      path: "/recipients",
      name: "recipients",
      component: () => import("@/views/dashboard/recipients/Recipients.vue"),
    },

    {
      path: "/fund-transfer-credit",
      name: "fund-transfer-credit",
      component: () => import("@/views/dashboard/fund_transfer/fundTransferCredit.vue"),
    },

    {
      path: "/fund-transfer-debit",
      name: "fund-transfer-debit",
      component: () => import("@/views/dashboard/fund_transfer/fundTransferDebit.vue"),
    },

    // API Routes
    {
      path: "/api-docs",
      name: "api",
      component: {
        render: () => h(resolveComponent("router-view")),
      },
      children: [
        {
          path: "",
          name: "api-keys",
          component: () =>
            import("@/views/dashboard/developers/ApiDocumentation.vue"),
          meta: {
            title: "API Documentation",
            requiresAuth: true,
            checkRole: ["admin", "finance", "dev"],
          },
        },
      ],
    },
    //Reports
    {
      path: "/reports",
      name: "reports",
      component: {
        render: () => h(resolveComponent("router-view")),
      },
      children: [
        {
          path: "",
          name: "generate-reports",
          component: () =>
            import("@/views/dashboard/business/reports/GenerateReports.vue"),
          meta: {
            title: "Browse Reports",
            requiresAuth: true,
            checkRole: ["admin", "finance", "user", "dev"],
          },
        },
        {
          path: "view/:id",
          name: "view-report",
          component: () =>
            import("@/views/dashboard/business/reports/ViewReport.vue"),
          meta: {
            title: "View Report",
            requiresAuth: true,
            checkRole: ["admin", "finance", "user", "dev"],
          },
        },
      ],
    },
    // Documents
    {
      path: "/documents",
      name: "documents",
      component: {
        render: () => h(resolveComponent("router-view")),
      },
      children: [
        {
          path: "",
          name: "upload-documents",
          component: () =>
            import("@/views/dashboard/business/documents/UploadDocument.vue"),
          meta: {
            title: "Upload Documents",
            requiresAuth: true,
            checkRole: ["admin"],
          },
        },
        {
          path: "batch-transactions/:batchId",
          name: "batch-transactions",
          component: () =>
            import(
              "@/views/dashboard/business/documents/BatchTransactions.vue"
            ),
          meta: {
            title: "Batch Transactions",
            requiresAuth: true,
            checkRole: ["admin"],
          },
        },
        {
          path: "view/:id",
          name: "view-uploaded-transactions",
          component: () =>
            import(
              "@/views/dashboard/business/documents/ViewUploadedTransactions.vue"
            ),
          meta: {
            title: "View Uploaded Transactions",
            requiresAuth: true,
            checkRole: ["admin"],
          },
        },
        {
          path: "edit/:transactionId",
          name: "edit-uploaded-transaction",
          component: () =>
            import(
              "@/views/dashboard/business/documents/EditUploadedTransaction.vue"
            ),
          meta: {
            title: "Edit Uploaded Transaction",
            requiresAuth: true,
            checkRole: ["admin"],
          },
        },
      ],
    },
  ],
});

// Check if user is logged in
router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title = `${toRoute.meta.title} | Fast Pace Transfer`;
  if (toRoute.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // if (!token.value) {
    //   next({ name: "dashboard" });
    // } else {
    //   next();
    // }
    next();

  } else {
    next();
  }
});

// Check if user has the correct roles
router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title = `${toRoute.meta.title} | Fast Pace Transfer`;
  if (toRoute.matched.some((record) => record.meta.checkRole)) {
    // if (
    //   toRoute.meta.checkRole instanceof Array &&
    //   toRoute.meta.checkRole !== null
    // ) {
    //   if (!toRoute.meta.checkRole.includes(role.value)) {
    //     next({ path: "/:catchAll(.*)" });
    //   } else {
    //     next();
    //   }
    // }
    next();

  } else {
    next();
  }
});

export default router;

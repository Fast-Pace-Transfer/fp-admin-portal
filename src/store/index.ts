import { createStore } from "vuex";
import type { AccountInterface } from "@/models/accounts/account.interface";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    loading: false,
    token: "",
    user: {},
    role: "",
    operationalAccount: [] as AccountInterface[],
  },
  plugins: [
    createPersistedState({
      paths: ["token", "user", "role", "operationalAccount"],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  mutations: {
    isLoading(state) {
      state.loading = !state.loading;
    },

    setToken(state, payload) {
      state.token = payload;
    },

    setRole(state, payload) {
      state.role = payload;
    },

    setUserData(state, payload) {
      state.user = payload;
    },

    setOperationalAccount(state, payload) {
      state.operationalAccount.push(payload);
    },

    clearOperationalAccount(state) {
      state.operationalAccount = [];
    },
  },

  actions: {
    isLoading(state) {
      state.commit("isLoading");
    },

    setToken(state, payload) {
      state.commit("setToken", payload);
    },

    setRole(state, payload) {
      state.commit("setRole", payload);
    },

    setUserData(state, payload) {
      state.commit("setUserData", payload);
    },

    setOperationalAccount(state, payload) {
      state.commit("setOperationalAccount", payload);
    },

    clearOperationalAccount(state) {
      state.commit("clearOperationalAccount");
    },
  },
  modules: {},

  getters: {
    getLoadingStatus: (state) => state.loading,
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getRole: (state) => state.role,
    getOperationalAccount: (state) => state.operationalAccount,
  },
});

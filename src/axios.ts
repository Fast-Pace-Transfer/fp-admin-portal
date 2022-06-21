import axios from "axios";
axios.defaults.baseURL = "https://fp-partner-api.devsnode.xyz/api/v0/dashboard";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.withCredentials = true;

<template>
  <div class="layout_dashboard">
    <PageLoader v-if="loading" />
    <!-- Sidebar -->
    <SidebarView />
    <!-- End of sidebar -->
    <!-- Content -->
    <section class="layout_dashboard_content">
      <NavbarView />
      <div class="dashboard_inner_content_upload_document_page">
        <!--Upload Document Page -->
        <div class="upload-document-layout">
          <div class="upload-document-title">
            <h2>Upload Document</h2>
            <p>
              <i class="fa-solid fa-circle-info"></i>
              To ensure accurate processing of uploaded transactions, please
              click on these links
              <a :href="cashSampleFile" download="cash_sample">cash sample</a
              >,&nbsp;
              <a :href="bankSampleFile" download="bank_sample">bank sample</a
              >,&nbsp;
              <a :href="mobileWalletSampleFile" download="mobile_wallet_sample"
                >mobile wallet sample</a
              >
              to download the sample files.
            </p>
          </div>
          <div class="upload-document-form">
            <form @submit.prevent="uploadTransactions">
              <div class="upload-document-input">
                <label for="document-payout-country">Payout Country</label>
                <select
                  id="document-payout-country"
                  v-model="documentPayoutCountry"
                  required
                  @change="getPayoutMethods"
                >
                  <option value="" selected disabled>
                    Select Payout Country
                  </option>
                  <option
                    v-for="country in payoutCountries"
                    :key="country.code"
                    :value="country.code"
                  >
                    {{ country.flag_emoji }} {{ country.name }}
                  </option>
                </select>
              </div>
              <div class="upload-document-input">
                <label for="document-payout-method">Payout Method</label>
                <select
                  id="document-payout-method"
                  v-model="documentPayoutMethod"
                  required
                >
                  <option value="" selected disabled>
                    Select Payout Method
                  </option>
                  <option
                    v-for="method in payoutMethods"
                    :key="method.code"
                    :value="method.id"
                  >
                    {{ method.name }}
                  </option>
                </select>
              </div>
              <div class="upload-document-input">
                <label for="transactions-document">Upload File</label>
                <input
                  type="file"
                  id="transactions-document"
                  accept=".csv"
                  @change="onFileChanged($event)"
                  required
                />
                <p>
                  <i class="fa-solid fa-circle-info"></i> File format supported
                  is .csv extension (Max Size: 100MB)
                </p>
              </div>
              <div class="upload-document-button">
                <button type="submit">Upload</button>
              </div>
            </form>
          </div>
        </div>
        <!--Upload Document Page  -->
      </div>
    </section>
    <!-- End of Content -->
  </div>
</template>

<script setup lang="ts">
import SidebarView from "@/components/common/SidebarView.vue";
import NavbarView from "@/components/common/NavbarView.vue";
import PageLoader from "@/components/common/PageLoader.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { formatFileSize } from "@/utils/formatFileSize";
import axios from "axios";
import type {
  payoutCountriesInterface,
  payoutMethodsInterface,
} from "@/models/business/payoutInterfaces";
import { ref, computed, onMounted } from "vue";
import { handleAPIError } from "@/utils/handleAPIError";

// Initialize store
const store = useStore();

// Initialize router
const router = useRouter();

// Get loading status
const loading = computed(() => store.getters.getLoadingStatus);

// Get token
const token = computed(() => store.getters.getToken);

// Initialize refs
const documentPayoutCountry = ref("");
const documentPayoutMethod = ref("");
const document = ref<string | Blob>("");

// On file changed
function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    document.value = target.files[0];
    console.log(document.value);
    console.log(formatFileSize(document.value.size));
    // Clear file info
    store.dispatch("setFileInfo", {});
    // Set file info
    store.dispatch("setFileInfo", {
      fileName: target.files[0].name,
      fileSize: formatFileSize(target.files[0].size),
    });
  }
}

// Submit form data
const uploadTransactions = async () => {
  // Get form data
  const formData = new FormData();
  formData.append("batch_file", document.value);
  formData.append("payout_country", documentPayoutCountry.value);
  formData.append("payout_method_id", documentPayoutMethod.value);

  // Set loading status
  store.dispatch("isLoading");

  // Upload file
  await axios
    .post(`batch-transaction`, formData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // Set loading status
      store.dispatch("isLoading");

      // Redirect to batch transaction page
      router.push({
        name: "view-uploaded-transactions",
        params: { id: response.data.data.batch_code },
      });
    })
    .catch((error) => {
      // Set loading status
      store.dispatch("isLoading");
      // Handle error
      handleAPIError(error);
    });
};

// Intitialize payout countries
const payoutCountries = ref<payoutCountriesInterface[]>([]);

// Intitialize payout methods
const payoutMethods = ref<payoutMethodsInterface[]>([]);

// Initialize bank sample file
const bankSampleFile = ref<string>("");

// Initialize cash sample file
const cashSampleFile = ref<string>("");

// Initialize mobile wallet sample file
const mobileWalletSampleFile = ref<string>("");

// Get bank sample file
const getBankSampleFile = async () => {
  await axios
    .get(`samples/bank`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      bankSampleFile.value = response.data.data;
    })
    .catch((error) => {
      handleAPIError(error);
    });
};

// Get cash sample file
const getCashSampleFile = async () => {
  await axios
    .get(`samples/cash`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      cashSampleFile.value = response.data.data;
    })
    .catch((error) => {
      handleAPIError(error);
    });
};

// Get mobile wallet sample file
const getMobileWalletSampleFile = async () => {
  await axios
    .get(`samples/mobileWallet`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      mobileWalletSampleFile.value = response.data.data;
    })
    .catch((error) => {
      handleAPIError(error);
    });
};

// Get payout countries
const getPayoutCountries = async () => {
  // Set loading status
  store.dispatch("isLoading");
  // Get payout countries
  await axios
    .get("countries/payout", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
    .then((response) => {
      // Stop loading status
      store.dispatch("isLoading");
      // Set payout countries
      payoutCountries.value = response.data.data;
    })
    .catch((error) => {
      // Stop loading status
      store.dispatch("isLoading");
      // Handle error
      handleAPIError(error);
    });
};

// Get payout methods
const getPayoutMethods = async () => {
  if (documentPayoutCountry.value) {
    // Set loading status
    store.dispatch("isLoading");
    // Get payout methods
    await axios
      .get(`payout-methods/${documentPayoutCountry.value}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((response) => {
        // Stop loading status
        store.dispatch("isLoading");
        // Set payout methods
        payoutMethods.value = response.data.data;
      })
      .catch((error) => {
        // Stop loading status
        store.dispatch("isLoading");
        // Handle error
        handleAPIError(error);
      });
  }
};

// When component mounted
onMounted(async () => {
  // Get payout countries
  await getPayoutCountries();

  // Get bank sample file
  await getBankSampleFile();

  // Get cash sample file
  await getCashSampleFile();

  // Get mobile wallet sample file
  await getMobileWalletSampleFile();
});
</script>

<style>
.layout_dashboard {
  height: 100vh;
  display: flex;
}

.layout_dashboard .layout_dashboard_content {
  background: #f6f8fa;
  width: calc(100% - 15.625rem);
  height: 100%;
}
/* Inner Content CSS */

.layout_dashboard_content .dashboard_inner_content_upload_document_page {
  margin-top: 5rem;
  padding: 0 1.875rem;
  display: flex;
  justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout {
  width: 55%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 3px 6px #00000029;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-title {
  padding: 1.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  color: #5a5a5a;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-title
  p {
  width: 70%;
  text-align: center;
  font-size: 14px;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form {
  display: flex;
  justify-content: center;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  form {
  width: 80%;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 1.875rem;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  label {
  font-size: 12px;
  color: #5a5a5a;
  font-weight: 500;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  select {
  border: 1px solid #383d6f;
  border-radius: 3px;
  height: 45px;
  font-size: 16px;
  padding-left: 15px;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  select:focus {
  outline: none;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  input {
  display: block;
  background-color: #f6f8fa;
  color: #111827;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: 0.5rem;
  height: 45px;
  border-width: 1px;
  border-color: #d1d5db;
  cursor: pointer;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  input::-webkit-file-upload-button {
  background: var(--primary-color);
  color: #fff;
  padding: 15px 16px;
  border: none;
  border-radius: 0.5rem 0 0 0.5rem;
  cursor: pointer;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  input:focus {
  outline: none;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-form
  .upload-document-input
  p {
  font-size: 14px;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-button {
  margin-bottom: 1.875rem;
}

.layout_dashboard_content
  .dashboard_inner_content_upload_document_page
  .upload-document-layout
  .upload-document-button
  button {
  background: #383d6f;
  border: none;
  width: 100%;
  color: #fff;
  font-size: 18px;
  height: 45px;
  border-radius: 3px;
  cursor: pointer;
}

@media screen and (min-width: 37.5rem) and (max-width: 64rem) {
  .layout_dashboard_content
    .dashboard_inner_content_upload_document_page
    .upload-document-layout {
    width: 100%;
  }
}
</style>

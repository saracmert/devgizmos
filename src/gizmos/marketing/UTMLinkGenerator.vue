<script setup>
import { ref } from 'vue'

const url = ref('')
const campaignID = ref('')
const campaignSource = ref('')
const campaignMedium = ref('')
const campaignName = ref('')
const campaignTerm = ref('')
const campaignContent = ref('')

const urlOutput = ref('')
const copied = ref(false)

function generate() {
    if (!isValidUrl(url.value)) {
        alert("Invalid URL!");
        return;
    }
    if (!campaignSource.value) {
        alert("Campaign Source parameter cannot be empty.");
        return;
    }
    if (!campaignMedium.value) {
        alert("Campaign Medium parameter cannot be empty.");
        return;
    }
    if (!campaignName.value) {
        alert("Campaign Name parameter cannot be empty.");
        return;
    }

    const tempUrl = new URL(url.value);
    const params = tempUrl.searchParams;

    params.set("utm_source", campaignSource.value);
    params.set("utm_medium", campaignMedium.value);
    params.set("utm_campaign", campaignName.value);

    if (campaignID.value) params.set("utm_id", campaignID.value);
    if (campaignTerm.value) params.set("utm_term", campaignTerm.value);
    if (campaignContent.value) params.set("utm_content", campaignContent.value);

    tempUrl.search = params.toString();
    urlOutput.value = tempUrl.toString();
    copied.value = false;
}

function isValidUrl(str) {
    try {
        new URL(str);
        return true;
    } catch {
        return false;
    }
}

async function copyToClipboard() {
    if (!urlOutput.value) return;
    try {
        await navigator.clipboard.writeText(urlOutput.value);
        copied.value = true;
        setTimeout(() => copied.value = false, 1500);
    } catch {
        copied.value = false;
    }
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>UTM Link Generator</h1>
                <span>
                    You can create campaign links for Google Analytics using the UTM Link Generator Gizmo.
                </span>
            </div>
        </div>
        <div class="row justify-content-center h-100 mt-3">
            <div class="col-lg-6 col-12">
                <div class="mb-3">
                    <p class="text-danger">* Required properties</p>
                </div>
                <div class="mb-3">
                    <label for="txtURL" class="form-label">URL</label>
                    <input type="text" class="form-control" id="txtURL" placeholder="The full website URL (e.g. https://www.example.com/products)" v-model="url">
                </div>
                <div class="mb-3">
                    <label for="txtCampaignSource" class="form-label">Campaign Source</label>
                    <input type="text" class="form-control" id="txtCampaignSource" placeholder="The referrer (e.g. google, newsletter)" v-model="campaignSource">
                </div>
                <div class="mb-3">
                    <label for="txtCampaignMedium" class="form-label">Campaign Medium</label>
                    <input type="text" class="form-control" id="txtCampaignMedium" placeholder="Marketing medium (e.g. cpc, banner, email)" v-model="campaignMedium">
                </div>
                <div class="mb-3">
                    <label for="txtCampaignName" class="form-label">Campaign Name</label>
                    <input type="text" class="form-control" id="txtCampaignName" placeholder="Product, promo code, or slogan (e.g. spring_sale)" v-model="campaignName">
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="mb-3">
                    <p class="text-muted">Optional properties</p>
                </div>
                <div class="mb-3">
                    <label for="txtCampaignID" class="form-label">Campaign ID</label>
                    <input type="text" class="form-control" id="txtCampaignID" placeholder="The ads campaign id." v-model="campaignID">
                </div>
                <div class="mb-3">
                    <label for="txtCampaignTerm" class="form-label">Campaign Term</label>
                    <input type="text" class="form-control" id="txtCampaignTerm" placeholder="Identify the paid keywords" v-model="campaignTerm">
                </div>
                <div class="mb-3">
                    <label for="txtCampaignContent" class="form-label">Campaign Content</label>
                    <input type="text" class="form-control" id="txtCampaignContent" placeholder="Use to differentiate ads" v-model="campaignContent">
                </div>
            </div>
            <div class="col-12">
                <button class="btn btn-primary" @click="generate">Generate</button>
            </div>
            <div class="col-12 mt-3" v-if="urlOutput">
                <div class="card border p-3 mb-3">
                    <div class="card-body">
                        <h5 class="card-title">
                            <pre class="mb-2"><code>{{ urlOutput }}</code></pre>
                            <button class="btn btn-outline-secondary btn-sm" @click="copyToClipboard">
                                <span v-if="!copied">Copy</span>
                                <span v-else>Copied!</span>
                            </button>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

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
        alert(t('utmLinkGenerator.errorInvalidUrl'));
        return;
    }
    if (!campaignSource.value) {
        alert(t('utmLinkGenerator.errorSourceRequired'));
        return;
    }
    if (!campaignMedium.value) {
        alert(t('utmLinkGenerator.errorMediumRequired'));
        return;
    }
    if (!campaignName.value) {
        alert(t('utmLinkGenerator.errorNameRequired'));
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
                <h1>{{ getGizmoTitle('UTMLinkGenerator') }}</h1>
                <span>
                    {{ getGizmoDescription('UTMLinkGenerator') }}
                </span>
            </div>
        </div>
        <div class="row justify-content-center h-100 mt-3">
            <div class="col-lg-6 col-12">
                <div class="mb-3">
                    <p class="text-danger">{{ t('utmLinkGenerator.required') }}</p>
                </div>
                <div class="mb-3">
                    <label for="txtURL" class="form-label">{{ t('utmLinkGenerator.url') }}</label>
                    <input type="text" class="form-control" id="txtURL" :placeholder="t('utmLinkGenerator.urlPlaceholder')" v-model="url">
                </div>
                <div class="mb-3">
                    <label for="txtCampaignSource" class="form-label">{{ t('utmLinkGenerator.campaignSource') }}</label>
                    <input type="text" class="form-control" id="txtCampaignSource" :placeholder="t('utmLinkGenerator.campaignSourcePlaceholder')" v-model="campaignSource">
                </div>
                <div class="mb-3">
                    <label for="txtCampaignMedium" class="form-label">{{ t('utmLinkGenerator.campaignMedium') }}</label>
                    <input type="text" class="form-control" id="txtCampaignMedium" :placeholder="t('utmLinkGenerator.campaignMediumPlaceholder')" v-model="campaignMedium">
                </div>
                <div class="mb-3">
                    <label for="txtCampaignName" class="form-label">{{ t('utmLinkGenerator.campaignName') }}</label>
                    <input type="text" class="form-control" id="txtCampaignName" :placeholder="t('utmLinkGenerator.campaignNamePlaceholder')" v-model="campaignName">
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="mb-3">
                    <p class="text-muted">{{ t('utmLinkGenerator.optional') }}</p>
                </div>
                <div class="mb-3">
                    <label for="txtCampaignID" class="form-label">{{ t('utmLinkGenerator.campaignID') }}</label>
                    <input type="text" class="form-control" id="txtCampaignID" :placeholder="t('utmLinkGenerator.campaignIDPlaceholder')" v-model="campaignID">
                </div>
                <div class="mb-3">
                    <label for="txtCampaignTerm" class="form-label">{{ t('utmLinkGenerator.campaignTerm') }}</label>
                    <input type="text" class="form-control" id="txtCampaignTerm" :placeholder="t('utmLinkGenerator.campaignTermPlaceholder')" v-model="campaignTerm">
                </div>
                <div class="mb-3">
                    <label for="txtCampaignContent" class="form-label">{{ t('utmLinkGenerator.campaignContent') }}</label>
                    <input type="text" class="form-control" id="txtCampaignContent" :placeholder="t('utmLinkGenerator.campaignContentPlaceholder')" v-model="campaignContent">
                </div>
            </div>
            <div class="col-12">
                <button class="btn btn-primary" @click="generate">{{ t('utmLinkGenerator.generate') }}</button>
            </div>
            <div class="col-12 mt-3" v-if="urlOutput">
                <div class="card border p-3 mb-3">
                    <div class="card-body">
                        <h5 class="card-title">
                            <pre class="mb-2"><code>{{ urlOutput }}</code></pre>
                            <button class="btn btn-outline-secondary btn-sm" @click="copyToClipboard">
                                <span v-if="!copied">{{ t('utmLinkGenerator.copy') }}</span>
                                <span v-else>{{ t('utmLinkGenerator.copied') }}</span>
                            </button>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
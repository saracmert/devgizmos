<script setup>
import { ref } from 'vue'

const url = ref()
const campaignID = ref()
const campaignSource = ref()
const campaignMedium = ref()
const campaignName = ref()
const campaignTerm = ref()
const campaignContent = ref()

let urlOutput = ref()

function generate() {
    if (url.value == undefined || url.value == "" || !validURL(url.value)) {
        alert("Invalid URL!");
        return;
    }
    else if (campaignSource.value == undefined || campaignSource.value == "") {
        alert("Campaign Source parameter cannot be empty.");
        return;
    }
    else if (campaignMedium.value == undefined || campaignMedium.value == "") {
        alert("Campaign Medium parameter cannot be empty.");
        return;
    }
    else if (campaignName.value == undefined || campaignName.value == "") {
        alert("Campaign Name parameter cannot be empty.");
        return;
    }

    let utmParams = new URLSearchParams(new URL(url.value).search);
    utmParams.append("utm_source", campaignSource.value);
    utmParams.append("utm_medium", campaignMedium.value);
    utmParams.append("utm_campaign", campaignName.value);

    if (campaignID.value != undefined && campaignID != "") {
        utmParams.append("utm_id", campaignID.value);
    }

    if (campaignTerm.value != undefined && campaignTerm != "") {
        utmParams.append("utm_term", campaignTerm.value);
    }

    if (campaignContent.value != undefined && campaignContent != "") {
        utmParams.append("utm_content", campaignContent.value);
    }

    var tempUri = new URL(url.value);
    tempUri.search = utmParams;
    this.urlOutput = tempUri.toString();
    window.initCopy();
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>UTM Link Generator</h1>
                <span>You can create campaign links for Google Analytics using the UTM Link Generator Gizmo.</span>
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
                    <input type="text" class="form-control" id="txtCampaignName" placeholder="Product, promo code, or slogan (e.g. spring_sale) One of campaign name or campaign id are required." v-model="campaignName">
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
                <button class="btn btn-primary" @click="generate()">Generate</button>
            </div>

            <div class="col-12 mt-3" v-if="urlOutput">
                <div class="card border p-3 mb-3">
                    <div class="card-body">
                        <h5 class="card-title"><pre><code>{{ urlOutput }}</code></pre></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
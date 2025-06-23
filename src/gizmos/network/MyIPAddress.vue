<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'
import L from 'leaflet'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

const ipInfo = ref(null)
const loader = ref(true)
const error = ref(null)
let map

// Kopyalama fonksiyonu
const copyText = async (text) => {
    try {
        await navigator.clipboard.writeText(text)
    } catch {}
}

onMounted(async () => {
    try {
        const res = await fetch('/ipinfo')
        if (!res.ok) throw new Error('Network error')
        ipInfo.value = await res.json()
        loader.value = false

        if (ipInfo.value.latitude && ipInfo.value.longitude) {
            map = L.map('ip-map').setView([ipInfo.value.latitude, ipInfo.value.longitude], 10)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map)
            L.marker([ipInfo.value.latitude, ipInfo.value.longitude]).addTo(map)
        }
    } catch (e) {
        error.value = t('myIpAddress.error')
        loader.value = false
    }
})
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>{{ getGizmoTitle('MyIPAddress') }}</h1>
                <span>{{ getGizmoDescription('MyIPAddress') }}</span>
            </div>
        </div>
        <div class="row justify-content-center h-100 mt-3">
            <div class="col-12" v-if="loader">
                <div class="progress mt-3">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
                </div>
            </div>
            <div class="col-12" v-else-if="error">
                <div class="alert alert-danger">{{ error }}</div>
            </div>
            <div class="col-12" v-else>
                <div class="card mb-3 shadow">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.ip') }}:</strong>
                                    <span class="me-2">{{ ipInfo.ip }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" @click="copyText(ipInfo.ip)" title="Copy">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.userAgent') }}:</strong>
                                    <span class="me-2">{{ ipInfo.userAgent }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" @click="copyText(ipInfo.userAgent)" title="Copy">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.http') }}:</strong>
                                    <span class="me-2">{{ ipInfo.httpProtocol }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" @click="copyText(ipInfo.httpProtocol)" title="Copy">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.tls') }}:</strong>
                                    <span class="me-2">{{ ipInfo.tlsVersion }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" @click="copyText(ipInfo.tlsVersion)" title="Copy">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.country') }}:</strong>
                                    <span class="me-2">{{ ipInfo.country }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" @click="copyText(ipInfo.country)" title="Copy">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.city') }}:</strong>
                                    <span class="me-2">{{ ipInfo.city }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" @click="copyText(ipInfo.city)" title="Copy">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.region') }}:</strong>
                                    <span class="me-2">{{ ipInfo.region }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" @click="copyText(ipInfo.region)" title="Copy">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.timezone') }}:</strong>
                                    <span class="me-2">{{ ipInfo.timezone }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" @click="copyText(ipInfo.timezone)" title="Copy">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.asn') }}:</strong>
                                    <span class="me-2">{{ ipInfo.asn }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" @click="copyText(ipInfo.asn)" title="Copy">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.colo') }}:</strong>
                                    <span class="me-2">{{ ipInfo.colo }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" @click="copyText(ipInfo.colo)" title="Copy">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.postalCode') }}:</strong>
                                    <span class="me-2">{{ ipInfo.postalCode }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" @click="copyText(ipInfo.postalCode)" title="Copy">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <div class="mb-2 d-flex align-items-center" v-if="ipInfo.latitude && ipInfo.longitude">
                                    <strong class="me-2">{{ t('myIpAddress.location') }}:</strong>
                                    <span class="me-2">{{ ipInfo.latitude }}, {{ ipInfo.longitude }}</span>
                                    <button class="btn btn-outline-secondary btn-sm" @click="copyText(ipInfo.latitude + ', ' + ipInfo.longitude)" title="Copy">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-6" v-if="ipInfo.latitude && ipInfo.longitude">
                                <div id="ip-map" style="height:300px;width:100%;border-radius:8px;border:1px solid #ccc;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <span>{{ t('myIpAddress.poweredBy', { provider: 'Cloudflare' }) }}</span>
            </div>
        </div>
    </div>
</template>

<style>
@import "leaflet/dist/leaflet.css";
</style>
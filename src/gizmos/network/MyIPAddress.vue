<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'
import L from 'leaflet'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

const ipInfo = ref(null)
const loader = ref(true)
const error = ref(null)
let map

onMounted(async () => {
    try {
        const res = await fetch('/ipinfo')
        if (!res.ok) throw new Error('Network error')
        ipInfo.value = await res.json()
        loader.value = false

        // Harita için koordinatlar varsa, DOM güncellendikten sonra haritayı oluştur
        if (ipInfo.value.latitude && ipInfo.value.longitude) {
            await nextTick()
            if (!map) {
                map = L.map('ip-map').setView([ipInfo.value.latitude, ipInfo.value.longitude], 10)
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors'
                }).addTo(map)

                var blueIcon = new L.Icon({
                    iconUrl: '/img/marker-icon-2x-blue.png',
                    shadowUrl: '/img/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });
                L.marker([ipInfo.value.latitude, ipInfo.value.longitude], { icon: blueIcon }).addTo(map)
            }
        }
    } catch (e) {
        console.error('Error fetching IP info:', e)
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
                <div class="alert alert-info mt-2" role="alert">
                    <strong>{{ t('myIpAddress.privacyNoticeTitle') }}</strong>
                    {{ t('myIpAddress.privacyNotice') }}
                </div>
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
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.ip') }}:</strong>
                                    <span class="me-2">{{ ipInfo.ip }}</span>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.userAgent') }}:</strong>
                                    <span class="me-2">{{ ipInfo.userAgent }}</span>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.http') }}:</strong>
                                    <span class="me-2">{{ ipInfo.httpProtocol }}</span>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.tls') }}:</strong>
                                    <span class="me-2">{{ ipInfo.tlsVersion }}</span>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.asn') }}:</strong>
                                    <span class="me-2">{{ ipInfo.asn }}</span>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.asOrganization') }}:</strong>
                                    <span class="me-2">{{ ipInfo.asOrganization }}</span>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.country') }}:</strong>
                                    <span class="me-2">{{ ipInfo.country }}</span>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.city') }}:</strong>
                                    <span class="me-2">{{ ipInfo.city }}</span>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.region') }}:</strong>
                                    <span class="me-2">{{ ipInfo.region }}</span>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.timezone') }}:</strong>
                                    <span class="me-2">{{ ipInfo.timezone }}</span>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.colo') }}:</strong>
                                    <span class="me-2">{{ ipInfo.colo }}</span>
                                </div>
                                <div class="mb-2 d-flex align-items-center">
                                    <strong class="me-2">{{ t('myIpAddress.postalCode') }}:</strong>
                                    <span class="me-2">{{ ipInfo.postalCode }}</span>
                                </div>
                                <div class="mb-2 d-flex align-items-center" v-if="ipInfo.latitude && ipInfo.longitude">
                                    <strong class="me-2">{{ t('myIpAddress.location') }}:</strong>
                                    <span class="me-2">{{ ipInfo.latitude }}, {{ ipInfo.longitude }}</span>
                                </div>
                            </div>
                            <div class="col-md-6" v-if="ipInfo.latitude && ipInfo.longitude">
                                <div id="ip-map" style="height:400px;width:100%;border-radius:8px;border:1px solid #ccc;"></div>
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
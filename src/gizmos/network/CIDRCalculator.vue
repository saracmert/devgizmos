<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

const input = ref('192.168.1.0/24')
const networkAddress = ref('')
const broadcastAddress = ref('')
const firstHost = ref('')
const lastHost = ref('')
const mask = ref('')
const maskBits = ref(0)
const hostCount = ref(0)
const error = ref('')

function parseCIDR(cidr) {
  try {
    error.value = ''
    let [ip, bits] = cidr.split('/')
    bits = Number(bits)
    if (
      !/^(\d{1,3}\.){3}\d{1,3}$/.test(ip) ||
      bits < 1 || bits > 32
    ) {
      throw new Error('Invalid CIDR format')
    }
    const ipParts = ip.split('.').map(Number)
    if (ipParts.some(x => x < 0 || x > 255)) throw new Error('Invalid IP')
    const maskNum = (0xFFFFFFFF << (32 - bits)) >>> 0
    maskBits.value = bits
    mask.value = [
      (maskNum >>> 24) & 255,
      (maskNum >>> 16) & 255,
      (maskNum >>> 8) & 255,
      maskNum & 255
    ].join('.')
    const ipNum = (
      (ipParts[0] << 24) |
      (ipParts[1] << 16) |
      (ipParts[2] << 8) |
      ipParts[3]
    ) >>> 0
    const network = ipNum & maskNum
    const broadcast = network | (~maskNum >>> 0)
    networkAddress.value = [
      (network >>> 24) & 255,
      (network >>> 16) & 255,
      (network >>> 8) & 255,
      network & 255
    ].join('.')
    broadcastAddress.value = [
      (broadcast >>> 24) & 255,
      (broadcast >>> 16) & 255,
      (broadcast >>> 8) & 255,
      broadcast & 255
    ].join('.')
    hostCount.value = bits === 32 ? 1 : bits === 31 ? 2 : Math.max(0, (2 ** (32 - bits)) - 2)
    firstHost.value = bits > 30
      ? networkAddress.value
      : [
          ((network >>> 24) & 255),
          ((network >>> 16) & 255),
          ((network >>> 8) & 255),
          ((network & 255) + 1)
        ].join('.')
    lastHost.value = bits > 30
      ? broadcastAddress.value
      : [
          ((broadcast >>> 24) & 255),
          ((broadcast >>> 16) & 255),
          ((broadcast >>> 8) & 255),
          ((broadcast & 255) - 1)
        ].join('.')
  } catch (e) {
    error.value = e.message
    networkAddress.value = ''
    broadcastAddress.value = ''
    firstHost.value = ''
    lastHost.value = ''
    mask.value = ''
    maskBits.value = 0
    hostCount.value = 0
  }
}

parseCIDR(input.value)

const resultList = computed(() => [
  { label: "Network Address", value: networkAddress.value },
  { label: "Broadcast Address", value: broadcastAddress.value },
  { label: "Subnet Mask", value: mask.value + ' (/' + maskBits.value + ')' },
  { label: "First Host", value: firstHost.value },
  { label: "Last Host", value: lastHost.value },
  { label: "Host Count", value: hostCount.value }
])
</script>

<template>
  <div class="container-fluid my-4">
    <h2 class="mb-3">{{ getGizmoTitle('CIDRCalculator') }}</h2>
    <p>
      {{ getGizmoDescription('CIDRCalculator') }}
    </p>
    <input v-model="input" class="form-control mb-3" :placeholder="t('cidrCalculator.inputPlaceholder')" @input="parseCIDR(input)" />
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div class="row mt-3 g-3" v-else>
        <div class="col-md-4" v-for="item in resultList" :key="item.label">
            <div class="card h-100 shadow-sm border-primary">
                <div class="card-body">
                    <h5 class="card-title mb-1">{{ t('cidrCalculator.' + item.key) }}</h5>
                    <p class="card-text fs-5 fw-semibold">{{ item.value }}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
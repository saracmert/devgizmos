<script setup>
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import CRC32 from 'crc-32'
import adler32 from 'adler-32'
import md5 from 'js-md5'
import sha1 from 'js-sha1'
import sha256 from 'js-sha256'
import { sha512 } from 'js-sha512'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'

const { t } = useI18n()
const encodeInput = ref('')
const checksumOutput = ref('')
const algorithm = ref('CRC32')
const { copy } = useClipboard({ encodeInput })
const file = ref(null)
const fileName = ref('')
const inputMode = ref('text')
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

function handleFileChange(e) {
  const uploadedFile = e.target.files[0]
  if (!uploadedFile) return
  fileName.value = uploadedFile.name
  const reader = new FileReader()
  reader.onload = function(event) {
    const content = event.target.result
    encodeInput.value = new Uint8Array(content)
  }
  reader.readAsArrayBuffer(uploadedFile)
}

function generate() {
  let result = ''
  let input = encodeInput.value

  switch (algorithm.value) {
    case 'CRC32':
      if (input instanceof Uint8Array) {
        result = CRC32.buf(input) >>> 0
      } else {
        result = CRC32.str(input) >>> 0
      }
      result = result.toString(16).toUpperCase()
      break
    case 'Adler32':
      if (input instanceof Uint8Array) {
        result = adler32.buf(input)
      } else {
        result = adler32.str(input)
      }
      result = result.toString(16).toUpperCase()
      break
    case 'MD5':
      if (input instanceof Uint8Array) {
        result = md5(input)
      } else {
        result = md5(input)
      }
      result = result.toUpperCase()
      break
    case 'SHA1':
      if (input instanceof Uint8Array) {
        result = sha1(input)
      } else {
        result = sha1(input)
      }
      result = result.toUpperCase()
      break
    case 'SHA256':
      if (input instanceof Uint8Array) {
        result = sha256(input)
      } else {
        result = sha256(input)
      }
      result = result.toUpperCase()
      break
    case 'SHA512':
      if (input instanceof Uint8Array) {
        result = sha512(input)
      } else {
        result = sha512(input)
      }
      result = result.toUpperCase()
      break
    default:
      result = 'Unsupported algorithm'
  }
  checksumOutput.value = result
}

function resetInput() {
  encodeInput.value = ''
  file.value = null
  fileName.value = ''
}
</script>

<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col mb-3">
        <h1>{{ getGizmoTitle('ChecksumCalculator') }}</h1>
        <span>
          {{ getGizmoDescription('ChecksumCalculator') }}
        </span>
      </div>
    </div>
    <div class="row justify-content-center h-100 mt-3">
      <div class="col-12">
        <div class="mb-3">
          <label for="algorithm" class="form-label">{{ t('checksum.algorithm') }}</label>
          <select v-model="algorithm" class="form-select" id="algorithm">
            <option value="CRC32">CRC32</option>
            <option value="Adler32">Adler-32</option>
            <option value="MD5">MD5</option>
            <option value="SHA1">SHA1</option>
            <option value="SHA256">SHA256</option>
            <option value="SHA512">SHA512</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">{{ t('checksum.inputType') }}</label>
          <div>
            <input type="radio" id="textMode" value="text" v-model="inputMode" @change="resetInput">
            <label for="textMode">&nbsp;{{ t('checksum.text') }}</label>
            <input type="radio" id="fileMode" value="file" v-model="inputMode" @change="resetInput" class="ms-3">
            <label for="fileMode">&nbsp;{{ t('checksum.file') }}</label>
          </div>
        </div>
        <div v-if="inputMode === 'text'" class="mb-3">
          <label for="txtInput" class="form-label">{{ t('checksum.inputString') }}</label>
          <textarea v-model="encodeInput" class="form-control" id="txtInput" rows="5"></textarea>
        </div>
        <div v-else class="mb-3">
          <label for="fileInput" class="form-label">{{ t('checksum.selectFile') }}</label>
          <input type="file" class="form-control" id="fileInput" ref="file" @change="handleFileChange">
          <div v-if="fileName" class="mt-2">
            <strong>{{ t('checksum.selectedFile') }}</strong> {{ fileName }}
          </div>
        </div>
        <button class="btn btn-primary" @click="generate()" :disabled="inputMode === 'text' ? !encodeInput : !fileName">{{ t('checksum.generate') }}</button>
      </div>
      <div class="col-12 mt-3">
        <textarea v-model="checksumOutput" class="form-control" rows="2" disabled />
        <button class="btn btn-primary mt-2" @click="copy(checksumOutput)">{{ t('generic.copy') }}</button>
      </div>
    </div>
  </div>
</template>
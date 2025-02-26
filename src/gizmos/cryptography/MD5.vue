<script setup>
import { ref } from 'vue'
import { md5 } from 'js-md5'
import { useClipboard } from '@vueuse/core'

const encodeInput = ref('')
const uppercase = ref()
const md5Output = ref()
const { copy } = useClipboard({ encodeInput })

function generate() {
    md5Output.value = (uppercase.value ? md5(encodeInput.value).toUpperCase() : md5(encodeInput.value));
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>MD5 Hash Generator</h1>
                <span>You can use the Guid Generator Gizmo to quickly generate a MD5 Hash.</span>
            </div>
        </div>
        <div class="row justify-content-center h-100 mt-3">
            <div class="col-12">                
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="uppercase" id="cbUppercase">
                    <label class="form-check-label" for="cbUppercase">
                        Uppercase
                    </label>
                </div>
                <div class="mb-3">
                    <label for="txtInput" class="form-label">Input String:</label>
                    <textarea v-model="encodeInput" class="form-control" id="txtInput" rows="5"></textarea>
                </div>
                <button class="btn btn-primary" @click="generate()">Generate</button>
            </div>
            <div class="col-12 mt-3">
                <textarea v-model="md5Output" class="form-control" rows="6" disabled />
                <button class="btn btn-primary mt-2" @click="copy(md5Output)">Copy</button>
            </div>
        </div>
    </div>
</template>
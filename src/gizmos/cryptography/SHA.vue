<script setup>
import { ref } from 'vue'
import { sha512, sha384, sha512_256, sha512_224 } from 'js-sha512'
import { useClipboard } from '@vueuse/core'

const encodeInput = ref('')
const uppercase = ref()
const sha512Output = ref()
const sha384Output = ref()
const sha512_256Output = ref()
const sha512_224Output = ref()
const { copy } = useClipboard({ encodeInput })

function generate() {
    sha512Output.value = (uppercase.value ? sha512(encodeInput.value).toUpperCase() : sha512(encodeInput.value));
    sha384Output.value = (uppercase.value ? sha384(encodeInput.value).toUpperCase() : sha384(encodeInput.value));
    sha512_256Output.value = (uppercase.value ? sha512_256(encodeInput.value).toUpperCase() : sha512_256(encodeInput.value));
    sha512_224Output.value = (uppercase.value ? sha512_224(encodeInput.value).toUpperCase() : sha512_224(encodeInput.value));
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>SHA Hash Generator</h1>
                <span>You can use the Guid Generator Gizmo to quickly generate a SHA-512, SHA-384, SHA-512/224, SHA-512/256 Hash.</span>
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

            <div class="col-3 mt-3">
                <h2>SHA-512</h2>
                <textarea v-model="sha512Output" class="form-control" rows="6" disabled />
                <button class="btn btn-primary mt-2" @click="copy(sha512Output)">Copy</button>
            </div>
            <div class="col-3 mt-3">
                <h2>SHA-384</h2>
                <textarea v-model="sha384Output" class="form-control" rows="6" disabled />
                <button class="btn btn-primary mt-2" @click="copy(sha384Output)">Copy</button>
            </div>
            <div class="col-3 mt-3">
                <h2>SHA-512/256</h2>
                <textarea v-model="sha512_256Output" class="form-control" rows="6" disabled />
                <button class="btn btn-primary mt-2" @click="copy(sha512_256Output)">Copy</button>
            </div>
            <div class="col-3 mt-3">
                <h2>SHA-512/224</h2>
                <textarea v-model="sha512_224Output" class="form-control" rows="6" disabled />
                <button class="btn btn-primary mt-2" @click="copy(sha512_224Output)">Copy</button>
            </div>
        </div>
    </div>
</template>
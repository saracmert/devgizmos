<script setup>
import { ref } from 'vue'
import { zxcvbn } from '@zxcvbn-ts/core'
import PasswordItem from '../../components/AppPasswordItem.vue'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

const numbers = ref(true)
const lowercase = ref(true)
const uppercase = ref(true)
const symbols = ref(true)
const extendedSymbols = ref(false)
const similarCharacters = ref(false)
const length = ref(12)
const count = ref(12)
const items = ref([])

function generate() {
    var number = '3456789';
    var lower = 'abcdefghjkmnpqrstuvwxy';
    var upper = lower.toUpperCase();
    var symbol = '!@#$%&*_?[]-+.';
    var extendedSymbol = ',-:;<=>^{}~()';
    var similar = 'O0il1|2Z';

    var characters = [];

    if (numbers.value) characters = characters.concat(number.split(''));
    if (lowercase.value) characters = characters.concat(lower.split(''));
    if (uppercase.value) characters = characters.concat(upper.split(''));
    if (symbols.value) characters = characters.concat(symbol.split(''));
    if (extendedSymbols.value) characters = characters.concat(extendedSymbol.split(''));
    if (similarCharacters.value) characters = characters.concat(similar.split(''));

    items.value = [];
    for (var j = 0; j < count.value; j++) {
        var generatedPassword = "";
        for (var i = 0; i < length.value; i++) {
            var arr = new Uint32Array(1);
            crypto.getRandomValues(arr);
            generatedPassword += characters[Math.floor((arr[0] * Math.pow(2,-32)) * characters.length)];
        }
        items.value.push(zxcvbn(generatedPassword))
    }
}
generate()
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>{{ getGizmoTitle('PasswordGenerator') }}</h1>
                <span>{{ getGizmoDescription('PasswordGenerator') }}</span>
            </div>
        </div>
        <div class="row justify-content-center h-100 mt-3">
            <div class="col-2">
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="numbers" id="cbNumbers" @change="generate()">
                    <label class="form-check-label" for="cbNumbers" v-html="t('password.numbers')"></label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="lowercase" id="cbLowercase" @change="generate()">
                    <label class="form-check-label" for="cbLowercase" v-html="t('password.lowercase')"></label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="uppercase" id="cbUppercase" @change="generate()">
                    <label class="form-check-label" for="cbUppercase" v-html="t('password.uppercase')"></label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="symbols" id="cbSymbols" @change="generate()">
                    <label class="form-check-label" for="cbSymbols" v-html="t('password.symbols')"></label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="extendedSymbols" id="cbExtendedSymbols" @change="generate()">
                    <label class="form-check-label" for="cbExtendedSymbols" v-html="t('password.extendedSymbols')"></label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="similarCharacters" id="cbSimilarCharacters" @change="generate()">
                    <label class="form-check-label" for="cbSimilarCharacters" v-html="t('password.similarCharacters')"></label>
                </div>
                <div class="mb-3">
                    {{ t('password.length') }}: <input type="number" class="form-control" v-model="length" @change="generate()" />
                </div>
                <div class="mb-3">
                    {{ t('password.count') }}: <input type="number" class="form-control" v-model="count" @change="generate()" />
                </div>
                <button class="btn btn-primary" @click="generate()">{{ t('password.regenerate') }}</button>
            </div>
            <div class="col-10">
                <div class="row">
                    <PasswordItem v-for="item in items" :password="item.password" :score="item.score" />
                </div>
            </div>
        </div>
    </div>
</template>
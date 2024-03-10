<script setup>
import { ref } from 'vue'

const numbers = ref(true)
const lowercase = ref(true)
const uppercase = ref(true)
const symbols = ref(true)
const extendedSymbols = ref(false)
const length = ref(16)

const passwordOutput = ref()

function generate() {
    var number = '1234567890';
    var lower = 'abcdefghijklmnopqrstuvwxyz';
    var upper = lower.toUpperCase();
    var symbol = '!@#$%&*()_?[]-+.';
    var extendedSymbol = ',-:;<=>^{|}~';

    var characters = [];

    if (numbers.value) {
        characters = characters.concat(number.split(''));
    }
    if (lowercase.value) {
        characters = characters.concat(lower.split(''));
    }
    if (uppercase.value) {
        characters = characters.concat(upper.split(''));
    }
    if (symbols.value) {
        characters = characters.concat(symbol.split(''));
    }
    if (extendedSymbols.value) {
        characters = characters.concat(extendedSymbol.split(''));
    }

    console.log(characters)

    var generatedPassword = "";
    for (var i = 0; i < length.value; i++) {
        generatedPassword += characters[Math.floor(Math.random() * characters.length)];
    }

    passwordOutput.value = generatedPassword;
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>Password Generator</h1>
                <span>You can use the Password Generator Gizmo to quickly generate a secure password.</span>
            </div>
        </div>
        <div class="row justify-content-center h-100 mt-3">
            <div class="col-2">
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="numbers" id="cbNumbers">
                    <label class="form-check-label" for="cbNumbers">
                        Numbers
                    </label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="lowercase" id="cbLowercase">
                    <label class="form-check-label" for="cbLowercase">
                        Lowercase
                    </label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="uppercase" id="cbUppercase">
                    <label class="form-check-label" for="cbUppercase">
                        Uppercase
                    </label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="symbols" id="cbSymbols">
                    <label class="form-check-label" for="cbSymbols">
                        Symbols<br />(!@#$%&*()_?[]-+.)
                    </label>
                </div>
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="extendedSymbols" id="cbExtendedSymbols">
                    <label class="form-check-label" for="cbExtendedSymbols">
                        Extended Symbols<br />(,-.:;<=>^{|}~)
                    </label>
                </div>
                <div class="mb-3">
                    Length: <input type="number" class="form-control" v-model="length" />
                </div>
                <button class="btn btn-primary" @click="generate()">Generate</button>
            </div>
            <div class="col-10">
                <textarea v-model="passwordOutput" class="form-control" rows="14" disabled />
            </div>
        </div>
    </div>
</template>
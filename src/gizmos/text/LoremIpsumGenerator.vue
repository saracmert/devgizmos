<script setup>
import { ref } from 'vue'
import Jabber from 'jabber';

const paragraphCount = ref(3)
const wordCount = ref(50)

const lipsumOutput = ref()
const jabber = new Jabber();

function generate() {
    lipsumOutput.value = "";
    for (var i = 0; i < paragraphCount.value; i++) {
        lipsumOutput.value += jabber.createParagraph(wordCount.value) + "\n\n";
    }
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>Lorem Ipsum Generator</h1>
                <span>You can use the Lorem Ipsum Generator Gizmo to generate Lorem Ipsum texts.</span>
            </div>
        </div>
        <div class="row justify-content-center h-100 mt-3">
            <div class="col-2">
                <div class="mb-3">
                    Word count: <input type="number" class="form-control" v-model="wordCount" />
                </div>
                <div class="mb-3">
                    Paragraph count: <input type="number" class="form-control" v-model="paragraphCount" />
                </div>

                <button class="btn btn-primary" @click="generate()">Generate</button>
            </div>
            <div class="col-10">
                <textarea v-model="lipsumOutput" class="form-control" rows="14" disabled />
            </div>
        </div>
    </div>
</template>
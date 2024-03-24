<script setup>
import { ref } from 'vue'
import Jabber from 'jabber';

const emailCount = ref(10)
const domain = ref("fakemail.com")

const lipsumOutput = ref()
const jabber = new Jabber();

function generate() {
    lipsumOutput.value = "";
    for (var i = 0; i < emailCount.value; i++) {
        lipsumOutput.value += jabber.createEmail(domain.value) + "\n";
    }
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>Fake E-mail Address Generator</h1>
                <span>You can use the Fake E-mail Address Generator Gizmo to generate dummy e-mail addresses.</span>
            </div>
        </div>
        <div class="row justify-content-center h-100 mt-3">
            <div class="col-2">
                <div class="mb-3">
                    E-mail count: <input type="number" class="form-control" v-model="emailCount" />
                </div>
                <div class="mb-3">
                    E-mail domain: <input type="text" class="form-control" v-model="domain" />
                </div>

                <button class="btn btn-primary" @click="generate()">Generate</button>
            </div>
            <div class="col-10">
                <textarea v-model="lipsumOutput" class="form-control" rows="14" disabled />
            </div>
        </div>
    </div>
</template>
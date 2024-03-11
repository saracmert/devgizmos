<script setup>
import { ref } from 'vue'

const ipOutput = ref("Loading...")
const ipDetails = ref("")
const loader = ref(true)

fetch('https://www.devgizmos.com/cdn-cgi/trace')
    .then(response => response.text())
    .then(data => ipDetails.value = data)
    .then(function() {
            var lines = ipDetails.value.split('\n').map(s => s.split('='));
            ipOutput.value = "";
            for (var i = 0; i < lines.length; i++) {
                switch (lines[i][0]) {
                    case "ip":
                        ipOutput.value += `IP Address: ${lines[i][1]}\n\n`;
                        break;
                    case "uag":
                        ipOutput.value += `User Agent String: ${lines[i][1]}\n`;
                        break;
                    case "http":
                        ipOutput.value += `HTTP: ${lines[i][1].toUpperCase()}\n`;
                        break;
                    case "tls":
                        ipOutput.value += `TLS: ${lines[i][1]}\n`;
                        break;
                }
            }
            loader.value = false;
        })

</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>My IP Address</h1>
                <span>You can use the My IP Address Gizmo to get your public IP address.</span>
            </div>
        </div>
        <div class="row justify-content-center h-100 mt-3">
            <div class="col-12">
                <textarea v-model="ipOutput" class="form-control" rows="6" disabled />
            </div>
            <div class="col-12 mt-3">
                <span>Powered by <a href="https://www.cloudflare.com/" target="_blank">Cloudflare</a></span>
            </div>
            <div class="col-12" v-if="loader">
                <div class="progress mt-3">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                </div>
            </div>
        </div>
    </div>
</template>
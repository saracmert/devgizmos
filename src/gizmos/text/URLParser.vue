<script setup>
import { ref } from 'vue'

const inputUrl = ref('')
const parsed = ref(null)
const error = ref('')

function parseUrl() {
    error.value = ''
    parsed.value = null
    try {
        if (!inputUrl.value) {
            error.value = 'Please enter a URL.'
            return
        }
        const url = new URL(inputUrl.value)
        parsed.value = {
            href: url.href,
            protocol: url.protocol,
            username: url.username,
            password: url.password,
            host: url.host,
            hostname: url.hostname,
            port: url.port,
            pathname: url.pathname,
            search: url.search,
            searchParams: Array.from(url.searchParams.entries()),
            hash: url.hash,
            origin: url.origin,
        }
    } catch (e) {
        error.value = 'Invalid URL!'
    }
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>URL Parser</h1>
                <span>
                    You can use the URL Parser Gizmo to parse and inspect any URL. See its protocol, host, path, query parameters, and more.
                </span>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-8 col-12">
                <div class="mb-3">
                    <label for="urlInput" class="form-label">URL</label>
                    <input
                        id="urlInput"
                        type="text"
                        class="form-control"
                        v-model="inputUrl"
                        placeholder="https://www.example.com:8080/path?foo=bar#section"
                        @keyup.enter="parseUrl"
                    />
                </div>
                <button class="btn btn-primary" @click="parseUrl">Parse</button>
                <span v-if="error" class="text-danger ms-3">{{ error }}</span>
            </div>
        </div>
        <div class="row mt-4" v-if="parsed">
            <div class="col-lg-8 col-12">
                <div class="card border-0">
                    <div class="card-header">
                        <h3>Parsed URL Details</h3>
                    </div>
                    <div class="card-body">
                        <div class="row mb-2">
                            <div class="col-5 col-md-4 fw-semibold text-secondary">Full URL</div>
                            <div class="col-7 col-md-8 text-break">{{ parsed.href }}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-5 col-md-4 fw-semibold text-secondary">Protocol</div>
                            <div class="col-7 col-md-8">{{ parsed.protocol }}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-5 col-md-4 fw-semibold text-secondary">Username</div>
                            <div class="col-7 col-md-8">{{ parsed.username || '-' }}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-5 col-md-4 fw-semibold text-secondary">Password</div>
                            <div class="col-7 col-md-8">{{ parsed.password ? '••••••' : '-' }}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-5 col-md-4 fw-semibold text-secondary">Host</div>
                            <div class="col-7 col-md-8">{{ parsed.host }}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-5 col-md-4 fw-semibold text-secondary">Hostname</div>
                            <div class="col-7 col-md-8">{{ parsed.hostname }}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-5 col-md-4 fw-semibold text-secondary">Port</div>
                            <div class="col-7 col-md-8">{{ parsed.port || '-' }}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-5 col-md-4 fw-semibold text-secondary">Pathname</div>
                            <div class="col-7 col-md-8 text-break">{{ parsed.pathname }}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-5 col-md-4 fw-semibold text-secondary">Search</div>
                            <div class="col-7 col-md-8 text-break">{{ parsed.search || '-' }}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-5 col-md-4 fw-semibold text-secondary">Query Params</div>
                            <div class="col-7 col-md-8">
                                <div v-if="parsed.searchParams.length">
                                    <ul class="list-unstyled mb-0">
                                        <li v-for="[key, value] in parsed.searchParams" :key="key" class="mb-1">
                                            <span class="badge bg-secondary me-1">{{ key }}</span>
                                            <span class="text-monospace">{{ value }}</span>
                                        </li>
                                    </ul>
                                </div>
                                <span v-else>-</span>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-5 col-md-4 fw-semibold text-secondary">Hash</div>
                            <div class="col-7 col-md-8">{{ parsed.hash || '-' }}</div>
                        </div>
                        <div class="row">
                            <div class="col-5 col-md-4 fw-semibold text-secondary">Origin</div>
                            <div class="col-7 col-md-8">{{ parsed.origin }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
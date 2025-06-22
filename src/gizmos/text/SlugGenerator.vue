<script setup>
import { ref, watch } from 'vue'

const input = ref('')
const slug = ref('')
const format = ref('kebab')
const language = ref('tr')

// Character maps for supported languages
const charMaps = {
    tr: {
        ş: 's', Ş: 's',
        ı: 'i', İ: 'i',
        ç: 'c', Ç: 'c',
        ö: 'o', Ö: 'o',
        ü: 'u', Ü: 'u',
        ğ: 'g', Ğ: 'g'
    },
    de: {
        ä: 'ae', ö: 'oe', ü: 'ue',
        Ä: 'ae', Ö: 'oe', Ü: 'ue',
        ß: 'ss'
    },
    fr: {
        à: 'a', â: 'a', æ: 'ae', ç: 'c', é: 'e', è: 'e', ê: 'e', ë: 'e',
        ï: 'i', î: 'i', ô: 'o', œ: 'oe', ù: 'u', û: 'u', ü: 'u', ÿ: 'y'
    },
    es: {
        á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', ü: 'u', ñ: 'n'
    },
    default: {}
}

// Replace special characters according to selected language
function toAscii(text, lang) {
    const map = { ...charMaps.default, ...charMaps[lang] }
    return text.replace(/./g, ch => map[ch] || ch)
}

function generateSlug() {
    let text = toAscii(input.value, language.value)
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-zA-Z0-9\s_-]/g, '') // Remove invalid chars
        .trim()

    switch (format.value) {
        case 'kebab':
            slug.value = text
                .toLowerCase()
                .replace(/[\s_]+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '')
            break
        case 'snake':
            slug.value = text
                .toLowerCase()
                .replace(/[\s-]+/g, '_')
                .replace(/_+/g, '_')
                .replace(/^_+|_+$/g, '')
            break
        case 'dot':
            slug.value = text
                .toLowerCase()
                .replace(/[\s_-]+/g, '.')
                .replace(/\.+/g, '.')
                .replace(/^\.+|\.+$/g, '')
            break
        case 'upper':
            slug.value = text
                .toUpperCase()
                .replace(/[\s_-]+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '')
            break
        default:
            slug.value = text
                .toLowerCase()
                .replace(/[\s_]+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '')
    }
}

watch([input, format, language], generateSlug)
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>Slug Generator</h1>
                <span>
                    You can use the Slug Generator Gizmo to convert your text into a SEO and URL-friendly slug. Turkish, German, French, and Spanish characters are automatically converted.
                </span>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-8 col-12">
                <div class="mb-3">
                    <label for="slugInput" class="form-label">Text</label>
                    <input
                        id="slugInput"
                        type="text"
                        class="form-control"
                        v-model="input"
                        placeholder="Type your text here"
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">Slug Format</label>
                    <select class="form-select" v-model="format">
                        <option value="kebab">kebab-case (default)</option>
                        <option value="snake">snake_case</option>
                        <option value="dot">dot.case</option>
                        <option value="upper">UPPER-CASE</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Language</label>
                    <select class="form-select" v-model="language">
                        <option value="tr">Turkish</option>
                        <option value="de">German</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="default">Other</option>
                    </select>
                </div>
                <div v-if="slug" class="card border-0 mt-3">
                    <div class="card-header">
                        <h3>Generated Slug</h3>
                    </div>
                    <div class="card-body">
                        <code class="fs-5">{{ slug }}</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
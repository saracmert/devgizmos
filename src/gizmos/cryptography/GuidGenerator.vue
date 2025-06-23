<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

const count = ref(1)
const uppercase = ref()
const guidsOutput = ref()

function generate() {
    var guids = [];
    for (var i = 0; i < count.value; i++) {
        var guid = generateGuid();
        guids.push((uppercase.value ? guid.toUpperCase() : guid));
    }
    guidsOutput.value = guids.join("\n");
}

function generateGuid() {
    const ho = (n, p) => n.toString(16).padStart(p, 0);
    const view = new DataView(new ArrayBuffer(16));
    crypto.getRandomValues(new Uint8Array(view.buffer));
    view.setUint8(6, (view.getUint8(6) & 0xf) | 0x40);
    view.setUint8(8, (view.getUint8(8) & 0x3f) | 0x80);
    return `${ho(view.getUint32(0), 8)}-${ho(view.getUint16(4), 4)}-${ho(view.getUint16(6), 4)}-${ho(view.getUint16(8), 4)}-${ho(view.getUint32(10), 8)}${ho(view.getUint16(14), 4)}`;
}
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>{{ getGizmoTitle('GuidGenerator') }}</h1>
                <span>{{ getGizmoDescription('GuidGenerator') }}</span>
            </div>
        </div>
        <div class="row justify-content-center h-100 mt-3">
            <div class="col-2">                
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" v-model="uppercase" id="cbUppercase">
                    <label class="form-check-label" for="cbUppercase">
                        {{ t('guid.uppercase') }}
                    </label>
                </div>
                <div class="mb-3">
                    {{ t('guid.count') }}: <input type="number" id="txtCount" class="form-control" v-model="count" />
                </div>
                <button class="btn btn-primary" @click="generate()">{{ t('guid.generate') }}</button>
            </div>
            <div class="col-10">
                <textarea v-model="guidsOutput" class="form-control" rows="6" disabled />
            </div>
        </div>
    </div>
</template>
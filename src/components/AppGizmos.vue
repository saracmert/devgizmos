<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import GizmoCategory from './AppGizmoCategory.vue'

const { t, tm } = useI18n()

const categories = computed(() => tm('gizmos.categories', { returnObjects: true }))
const quickSearchInput = ref('')
</script>

<template>
  <h1>
    {{ t('gizmos.title') }}
    <small class="text-muted">{{ t('gizmos.pronunciation') }}</small>
  </h1>
  <div class="col-lg-12 px-0">
    <p>
      <strong>Devgizmos</strong> {{ t('gizmos.intro') }}
    </p>
    <p>
      <span v-html="t('gizmos.gizmoTerm')"></span>
    </p>
    <p class="fs-5">
      <strong>{{ t('gizmos.offlineTitle') }}</strong>
      <br />{{ t('gizmos.offlineDesc') }}
    </p>
    <p class="fs-5">
      <strong>{{ t('gizmos.openSourceTitle') }}</strong>
      <br />{{ t('gizmos.openSourceDesc') }}
    </p>
    <p class="fs-5">
      <strong>{{ t('gizmos.noAds') }}</strong>
      <br /><span v-html="t('gizmos.support')"></span>
      <br /><small class="text-muted fs-6 fst-italic">{{ t('gizmos.supportDesc') }}</small>
    </p>
    <p class="fs-6 text-muted">
      <strong>{{ t('gizmos.roadmapTitle') }}</strong>
      <br />{{ t('gizmos.roadmapDesc') }}
    </p>
  </div>

  <div class="row">
    <div class="mt-3 mb-3">
      <label for="txtQuickSearch" class="form-label fw-bold">{{ t('gizmos.quickSearch') }}</label>
      <input type="text" v-model="quickSearchInput" class="form-control border-primary" id="txtQuickSearch" :placeholder="t('gizmos.quickSearchPlaceholder')" autofocus>
    </div>
  </div>

  <div class="row">
    <GizmoCategory v-for="category in categories" :text="category.title" :items="category.items" :filter="quickSearchInput" />
  </div>
</template>
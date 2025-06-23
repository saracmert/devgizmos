<script setup>
import { ref } from 'vue'
import { format } from 'sql-formatter'
import { useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

const sqlInput = ref('')
const formattedSql = ref('')
const sqlDialect = ref('mysql')
const { copy } = useClipboard({ source: formattedSql })

function beautify() {
  try {
    formattedSql.value = format(sqlInput.value || '', { language: sqlDialect.value })
  } catch (e) {
    formattedSql.value = t('sqlBeautifier.error')
  }
}
</script>

<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col mb-3">
        <h1>{{ getGizmoTitle('SQLBeautifier') }}</h1>
        <span>{{ getGizmoDescription('SQLBeautifier') }}</span>
      </div>
    </div>
    <div class="row justify-content-center h-100 mt-3">
      <div class="col-12">
        <div class="mb-3">
          <label for="sqlDialect" class="form-label">{{ t('sqlBeautifier.dialect') }}</label>
          <select v-model="sqlDialect" class="form-select" id="sqlDialect">
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="sql">SQL Server (MsSQL)</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="sqlInput" class="form-label">{{ t('sqlBeautifier.input') }}</label>
          <textarea v-model="sqlInput" class="form-control" id="sqlInput" rows="7" :placeholder="t('sqlBeautifier.placeholder')"></textarea>
        </div>
        <button class="btn btn-primary" @click="beautify()" :disabled="!sqlInput">{{ t('sqlBeautifier.beautify') }}</button>
      </div>
      <div class="col-12 mt-3">
        <label class="form-label">{{ t('sqlBeautifier.output') }}</label>
        <textarea v-model="formattedSql" class="form-control" rows="7" readonly />
        <button class="btn btn-secondary mt-2" @click="copy(formattedSql)">{{ t('sqlBeautifier.copy') }}</button>
      </div>
    </div>
  </div>
</template>
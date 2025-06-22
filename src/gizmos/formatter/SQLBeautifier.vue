<script setup>
import { ref } from 'vue'
import { format } from 'sql-formatter'
import { useClipboard } from '@vueuse/core'

const sqlInput = ref('')
const formattedSql = ref('')
const sqlDialect = ref('mysql')
const { copy } = useClipboard({ source: formattedSql })

function beautify() {
  try {
    formattedSql.value = format(sqlInput.value || '', { language: sqlDialect.value })
  } catch (e) {
    formattedSql.value = 'Error: Invalid SQL'
  }
}
</script>

<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col mb-3">
        <h1>SQL Beautifier</h1>
        <span>Format your SQL queries for better readability. Supports MySQL, PostgreSQL and SQL Server.</span>
      </div>
    </div>
    <div class="row justify-content-center h-100 mt-3">
      <div class="col-12">
        <div class="mb-3">
          <label for="sqlDialect" class="form-label">SQL Dialect:</label>
          <select v-model="sqlDialect" class="form-select" id="sqlDialect">
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="sql">SQL Server (MsSQL)</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="sqlInput" class="form-label">SQL Input:</label>
          <textarea v-model="sqlInput" class="form-control" id="sqlInput" rows="7" placeholder="Paste your SQL here"></textarea>
        </div>
        <button class="btn btn-primary" @click="beautify()" :disabled="!sqlInput">Beautify</button>
      </div>
      <div class="col-12 mt-3">
        <label class="form-label">Beautified SQL:</label>
        <textarea v-model="formattedSql" class="form-control" rows="7" readonly />
        <button class="btn btn-secondary mt-2" @click="copy(formattedSql)">Copy</button>
      </div>
    </div>
  </div>
</template>
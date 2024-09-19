<script setup>
import GizmoItem from './AppGizmoItem.vue'
</script>

<script>
export default {
  props: {
    text: String,
    items: Array,
    filter: String
  },
  computed: {
    filteredItems() {
        return this.items.filter(item => (item.title.toLowerCase().indexOf(this.filter.toLocaleLowerCase()) != -1) || (item.description.toLowerCase().indexOf(this.filter.toLocaleLowerCase()) != -1));
    }
  }
}
</script>

<template>
  <template v-if="!filteredItems || !filteredItems.length">
    <!-- No results found. -->
  </template>
  <template v-else>
    <div class="col-12 mb-3">    
      <h3>{{ text }}</h3>
      <hr class="col-12 mb-3 mt-0 mx-0">
      <div class="container-fluid p-0">
        <div class="row">
          <GizmoItem v-for="item in filteredItems" :title="item.title" :description="item.description" :gizmo="item.gizmo"/>
        </div>
      </div>
    </div>
  </template>
</template>
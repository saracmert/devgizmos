<script>
export default {
  props: {
    title: String,
    description: String,
    gizmo: String
  }
}
</script>

<template>
  <div class="col-4">    
    <div class="card border p-3 mb-3">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ description }}</p>
        <a v-bind:href="'#/' + gizmo" class="btn btn-primary">Go</a>
      </div>
    </div>
  </div>
</template>
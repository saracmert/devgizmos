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
  <div class="col-4 col-xs-12 col-sm-6 col-md-6 mb-3">
    <div class="card border p-3 h-100">
      <div class="card-body">
        <h4 class="card-title">{{ title }}</h4>
        <p class="card-text">{{ description }}</p>
        <a v-bind:href="'/' + gizmo" class="btn btn-primary">Try {{ title }} Gizmo</a>
      </div>
    </div>
  </div>
</template>

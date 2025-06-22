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
  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-2 mb-3 d-flex align-items-stretch">
    <div class="card border p-3 w-100">
      <div class="card-body d-flex flex-column">
        <h4 class="card-title">{{ title }}</h4>
        <p class="card-text">{{ description }}</p>
        <p class="mt-auto align-self-start">
          <a v-bind:href="'/' + gizmo" class="btn btn-sm btn-primary">Try {{ title }} Gizmo</a>
        </p>
      </div>
    </div>
  </div>
</template>

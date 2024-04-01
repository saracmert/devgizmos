<script>
export default {
  props: {
    password: String,
    score: Number
  }
}
</script>

<template>
  <div class="col-4">    
    <div class="card border p-3 mb-3">
      <div class="card-body">
        <h5 class="card-title"><pre><code>{{ password }}</code></pre></h5>
        <p class="card-text"><strong>zxcvbn Score:</strong> {{ score }}</p>
        <div class="progress text-center" style="height: 20px;">
            <div role="progressbar" class="progress-bar progress-bar-striped progress-bar-animated" :style="{width: (score * 25) + '%'}" :class="[progress-bar, progress-bar-striped,  score == 1 ? 'bg-danger' : score == 2 ? 'bg-warning' : score == 3 ? 'bg-info' : score == 4 ? 'bg-success' : '']">
                zxcvbn score: {{ score }}
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
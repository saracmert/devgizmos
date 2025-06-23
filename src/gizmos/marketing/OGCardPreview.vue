<script setup>
import { ref, computed } from 'vue'

const url = ref('')
const loading = ref(false)
const error = ref('')
const og = ref({})
const twitter = ref({})
const structuredData = ref([])

const requiredOgTags = [
  { name: 'og:title', label: 'og:title' },
  { name: 'og:description', label: 'og:description' },
  { name: 'og:image', label: 'og:image' }
]

const infoOgTags = [
  { name: 'og:site_name', label: 'og:site_name' },
  { name: 'og:url', label: 'og:url' },
  { name: 'og:type', label: 'og:type' }
]

const requiredTwitterTags = [
  { name: 'twitter:card', label: 'twitter:card' },
  { name: 'twitter:title', label: 'twitter:title' },
  { name: 'twitter:description', label: 'twitter:description' },
  { name: 'twitter:image', label: 'twitter:image' }
]

const infoTwitterTags = [
  { name: 'twitter:site', label: 'twitter:site' },
  { name: 'twitter:creator', label: 'twitter:creator' }
]

const emptyOgTags = computed(() =>
  Object.entries(og.value)
    .filter(([k, v]) => v === '' && !infoOgTags.some(t => t.name === k))
    .map(([k]) => k)
)
const missingOgTags = computed(() =>
  requiredOgTags
    .filter(tag => !og.value[tag.name])
    .map(tag => tag.label)
)
const infoEmptyOgTags = computed(() =>
  infoOgTags
    .filter(tag => tag.name in og.value && og.value[tag.name] === '')
    .map(tag => tag.label)
)

const emptyTwitterTags = computed(() =>
  Object.entries(twitter.value)
    .filter(([k, v]) => v === '' && !infoTwitterTags.some(t => t.name === k))
    .map(([k]) => k)
)
const missingTwitterTags = computed(() =>
  requiredTwitterTags
    .filter(tag => !twitter.value[tag.name])
    .map(tag => tag.label)
)
const infoEmptyTwitterTags = computed(() =>
  infoTwitterTags
    .filter(tag => tag.name in twitter.value && twitter.value[tag.name] === '')
    .map(tag => tag.label)
)

async function fetchMeta() {
  error.value = ''
  og.value = {}
  twitter.value = {}
  structuredData.value = []
  if (!url.value) {
    error.value = 'Please enter a URL.'
    return
  }
  loading.value = true
  try {
    const resp = await fetch(`https://devgizmos.com/corsProxy?url=${encodeURIComponent(url.value)}`)
    const data = await resp.json()
    if (resp.ok) {
      og.value = data.og || {}
      twitter.value = data.twitter || {}
      structuredData.value = data.structuredData || []
      if (
        Object.keys(og.value).length === 0 &&
        Object.keys(twitter.value).length === 0 &&
        structuredData.value.length === 0
      ) {
        error.value = 'No Open Graph, X Card or structured data meta tags found.'
      }
    } else {
      error.value = data.error || 'Failed to fetch meta tags.'
    }
  } catch (e) {
    error.value = 'Network error or invalid response.'
  }
  loading.value = false
}

function formatJson(obj) {
  return JSON.stringify(obj, null, 2)
}

function copyTags(tags) {
  const text = Object.entries(tags)
    .map(([k, v]) =>
      k.startsWith('og:')
        ? `<meta property="${k}" content="${v}">`
        : `<meta name="${k}" content="${v}">`
    )
    .join('\n')
  navigator.clipboard.writeText(text)
}

function getDomain(link) {
  try {
    return new URL(link).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function getFavicon(link) {
  try {
    const domain = new URL(link).hostname.replace(/^www\./, '')
    const origin = new URL(link).origin
    const favicon = `${origin}/favicon.ico`
    if (favicon.endsWith('.ico')) {
      return `https://icons.duckduckgo.com/ip3/${domain}.ico`
    }
    return favicon
  } catch {
    return ''
  }
}

function getStructuredCardComponent(item) {
  if (!item || !item['@type']){
    return StructuredDataRawCard;
  }

  const type = Array.isArray(item['@type']) ? item['@type'][0] : item['@type'];
  if (type === 'ProductGroup') return ProductGroupCard;
  if (type === 'Product') return ProductCard;
  if (type === 'Event') return EventCard;
  if (type === 'Recipe') return RecipeCard;
  if (type === 'Article' || type === 'NewsArticle' || type === 'BlogPosting') return ArticleCard;
  return StructuredDataRawCard;
}

const ProductGroupCard = {
  props: ['data'],
  computed: {
    imageUrl() {
      if (this.data.image) {
        if (typeof this.data.image === 'string') return this.data.image
        if (Array.isArray(this.data.image)) return this.data.image[0]
        if (typeof this.data.image === 'object' && Array.isArray(this.data.image.contentUrl)) return this.data.image.contentUrl[0]
        if (typeof this.data.image === 'object' && typeof this.data.image.contentUrl === 'string') return this.data.image.contentUrl
      }
      return ''
    }
  },
  template: `
    <div class="card border-success shadow-sm mb-2">
      <div class="card-body d-flex flex-row">
        <div v-if="imageUrl" class="me-3" style="min-width:120px;">
          <img :src="imageUrl"
               alt="Product Group Image"
               style="width:120px;height:120px;object-fit:contain;border-radius:8px;background:#fafafa;">
        </div>
        <div>
          <div class="fw-bold fs-5 mb-1">{{ data.name || 'Product Group Name' }}</div>
          <div class="mb-2 text-muted" v-if="data.brand">
            Brand: <span>{{ typeof data.brand === 'object' ? data.brand.name : data.brand }}</span>
          </div>
          <div class="mb-2" v-if="data.description">{{ data.description }}</div>
          <div class="mb-2" v-if="data.hasVariant && Array.isArray(data.hasVariant)">
            <strong>Variants:</strong>
            <ul>
              <li v-for="(variant, i) in data.hasVariant" :key="i">
                {{ variant.name || variant.sku || variant }}
              </li>
            </ul>
          </div>
          <div class="mb-2" v-if="data.additionalProperty && Array.isArray(data.additionalProperty)">
            <strong>Additional Properties:</strong>
            <ul>
              <li v-for="(prop, i) in data.additionalProperty" :key="i">
                {{ prop.name || prop.propertyID }}: {{ prop.value || prop.unitText }}
              </li>
            </ul>
          </div>
          <div class="mb-2" v-if="data.isRelatedTo">
            <strong>Related:</strong>
            <span v-if="Array.isArray(data.isRelatedTo)">
              <span v-for="(rel, i) in data.isRelatedTo" :key="i">
                <a v-if="typeof rel === 'string'" :href="rel" target="_blank" rel="noopener">{{ rel }}</a>
                <span v-else>{{ rel.name || rel }}</span>
                <span v-if="i < data.isRelatedTo.length - 1">, </span>
              </span>
            </span>
            <span v-else>
              <a v-if="typeof data.isRelatedTo === 'string'" :href="data.isRelatedTo" target="_blank" rel="noopener">{{ data.isRelatedTo }}</a>
              <span v-else>{{ data.isRelatedTo.name || data.isRelatedTo }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `
}

const ProductCard = {
  props: ['data'],
  computed: {
    // Resim kaynağı structuredData'da ImageObject ise ilk contentUrl'i al
    imageUrl() {
      if (this.data.image) {
        if (typeof this.data.image === 'string') return this.data.image
        if (Array.isArray(this.data.image)) return this.data.image[0]
        if (typeof this.data.image === 'object' && Array.isArray(this.data.image.contentUrl)) return this.data.image.contentUrl[0]
        if (typeof this.data.image === 'object' && typeof this.data.image.contentUrl === 'string') return this.data.image.contentUrl
      }
      return ''
    }
  },
  template: `
    <div class="card border-success shadow-sm mb-2">
      <div class="card-body d-flex flex-row">
        <div v-if="imageUrl" class="me-3" style="min-width:120px;">
          <img :src="imageUrl"
               alt="Product Image"
               style="width:120px;height:120px;object-fit:contain;border-radius:8px;background:#fafafa;">
        </div>
        <div>
          <div class="fw-bold fs-5 mb-1">{{ data.name || 'Product Name' }}</div>
          <div class="mb-2 text-muted" v-if="data.brand">
            Brand: <span>{{ typeof data.brand === 'object' ? data.brand.name : data.brand }}</span>
          </div>
          <div class="mb-2" v-if="data.sku">
            <strong>SKU: </strong> {{ data.sku }}
          </div>
          <div class="mb-2" v-if="data.audience">
            <strong>Audience: </strong>
            <span v-if="typeof data.audience === 'object'">
              <span v-if="data.audience.name">{{ data.audience.name }}</span>
              <span v-if="data.audience.suggestedGender"> ({{ data.audience.suggestedGender }})</span>
            </span>
            <span v-else>{{ data.audience }}</span>
          </div>
          <div class="mb-2" v-if="data.aggregateRating">
            <strong>Rating: </strong>
            <span v-if="data.aggregateRating.ratingValue">
              {{ data.aggregateRating.ratingValue }} / {{ data.aggregateRating.bestRating || 5 }}
              <span v-if="data.aggregateRating.reviewCount">({{ data.aggregateRating.reviewCount }} reviews)</span>
            </span>
          </div>
          <div class="mb-2" v-if="data.review && Array.isArray(data.review)">
            <strong>Reviews:</strong>
            <ul>
              <li v-for="(review, i) in data.review.slice(0, 5)" :key="i">
                <span v-if="review.author">{{ typeof review.author === 'object' ? review.author.name : review.author }}: </span>
                <span v-if="review.reviewRating">Rating: {{ review.reviewRating.ratingValue }}</span>
                <span v-if="review.reviewBody"><br />{{ review.reviewBody }}</span>
              </li>
              <li v-if="data.review.length > 5" class="text-muted">...and {{ data.review.length - 5 }} more</li>
            </ul>
          </div>
          <div class="mb-2" v-if="data.additionalProperty && Array.isArray(data.additionalProperty)">
            <strong>Additional Properties:</strong>
            <ul>
              <li v-for="(prop, i) in data.additionalProperty" :key="i">
                {{ prop.name || prop.propertyID }}: {{ prop.value || prop.unitText }}
              </li>
            </ul>
          </div>
          <div class="mb-2" v-if="data.isRelatedTo">
            <strong>Related: </strong>
            <br />
            <span v-if="Array.isArray(data.isRelatedTo)">
              <span v-for="(rel, i) in data.isRelatedTo" :key="i">
                <a v-if="typeof rel === 'string'" :href="rel" target="_blank" rel="noopener">{{ rel }}</a><br />
              </span>
            </span>
            <span v-else>
              <a v-if="typeof data.isRelatedTo === 'string'" :href="data.isRelatedTo" target="_blank" rel="noopener">{{ data.isRelatedTo }}</a>
              <span v-else>{{ data.isRelatedTo.name || data.isRelatedTo }}</span>
            </span>
          </div>
          <div class="mb-2" v-if="data.description">{{ data.description }}</div>
          <div v-if="data.offers">
            <span class="badge bg-primary p-2 fs-6">
              {{ data.offers.priceCurrency || '$' }}{{ data.offers.price }}
            </span>
            <span class="ms-2 text-muted" v-if="data.offers.availability">
              {{ data.offers.availability === 'https://schema.org/InStock' ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `
}

const EventCard = {
  props: ['data'],
  template: `
    <div class="card border-info shadow-sm mb-2">
      <div class="card-body">
        <div class="fw-bold fs-5 mb-1">{{ data.name || 'Event Name' }}</div>
        <div class="mb-2" v-if="data.startDate">
          <span>📅</span> {{ data.startDate }}
        </div>
        <div class="mb-2" v-if="data.location">
          <span>📍</span>
          {{ typeof data.location === 'object' ? data.location.name : data.location }}
        </div>
        <div class="mb-2" v-if="data.description">{{ data.description }}</div>
      </div>
    </div>
  `
}

const RecipeCard = {
  props: ['data'],
  template: `
    <div class="card border-warning shadow-sm mb-2">
      <div class="card-body">
        <div class="fw-bold fs-5 mb-1">{{ data.name || 'Recipe Name' }}</div>
        <div class="mb-2" v-if="data.image">
          <img :src="Array.isArray(data.image) ? data.image[0] : data.image"
               alt="Recipe Image"
               style="width:100px;height:100px;object-fit:cover;border-radius:8px;background:#fafafa;">
        </div>
        <div class="mb-2" v-if="data.recipeIngredient">
          <strong>Ingredients:</strong>
          <ul>
            <li v-for="(ing, i) in data.recipeIngredient" :key="i">{{ ing }}</li>
          </ul>
        </div>
        <div class="mb-2" v-if="data.recipeInstructions">
          <strong>Instructions:</strong>
          <div v-if="Array.isArray(data.recipeInstructions)">
            <ol>
              <li v-for="(step, i) in data.recipeInstructions" :key="i">
                {{ typeof step === 'string' ? step : step.text }}
              </li>
            </ol>
          </div>
          <div v-else>{{ data.recipeInstructions }}</div>
        </div>
      </div>
    </div>
  `
}

const ArticleCard = {
  props: ['data'],
  template: `
    <div class="card border-primary shadow-sm mb-2">
      <div class="card-body">
        <div class="fw-bold fs-5 mb-1">{{ data.headline || data.name || 'Article Title' }}</div>
        <div class="mb-2 text-muted" v-if="data.author">
          <span>✍️</span>
          {{ typeof data.author === 'object' ? data.author.name : data.author }}
        </div>
        <div class="mb-2" v-if="data.datePublished">
          <span>📅</span> {{ data.datePublished }}
        </div>
        <div class="mb-2" v-if="data.image">
          <img :src="Array.isArray(data.image) ? data.image[0] : data.image"
               alt="Article Image"
               style="width:100px;height:100px;object-fit:cover;border-radius:8px;background:#fafafa;">
        </div>
        <div class="mb-2" v-if="data.description">{{ data.description }}</div>
      </div>
    </div>
  `
}

const StructuredDataRawCard = {
  props: ['data'],
  template: `
    <div class="card border-secondary shadow-sm mb-2">
      <div class="card-body">
        <div class="fw-bold fs-6 mb-2">Structured Data ({{ data['@type'] || 'Unknown' }})</div>
        <pre class="p-2 rounded" style="font-size:0.95em; max-height:300px; overflow:auto;">{{ JSON.stringify(data, null, 2) }}</pre>
      </div>
    </div>
  `
}
</script>

<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col mb-3">
        <h1>Open Graph & X Card Preview</h1>
        <span>
          You can use the Open Graph & X Card Preview Gizmo to preview and generate Open Graph and X Card meta tags for your web pages.
        </span>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-lg-6 col-12">
        <div class="mb-3">
          <label class="form-label">URL</label>
          <input class="form-control" v-model="url" placeholder="https://example.com" @keyup.enter="fetchMeta" />
        </div>
        <button class="btn btn-primary" @click="fetchMeta" :disabled="loading">
          {{ loading ? 'Loading...' : 'Fetch Meta Tags' }}
        </button>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        <div v-if="emptyOgTags.length" class="alert alert-warning mt-3">
          <strong>Warning:</strong> The following Open Graph tags are present but empty:
          <ul class="mb-0">
            <li v-for="tag in emptyOgTags" :key="tag"><code>{{ tag }}</code></li>
          </ul>
        </div>
        <div v-if="missingOgTags.length" class="alert alert-warning mt-3">
          <strong>Warning:</strong> The following required Open Graph tags are missing:
          <ul class="mb-0">
            <li v-for="tag in missingOgTags" :key="tag"><code>{{ tag }}</code></li>
          </ul>
        </div>
        <div v-if="infoEmptyOgTags.length" class="alert alert-info mt-3">
          <strong>Info:</strong> The following optional Open Graph tags are present but empty:
          <ul class="mb-0">
            <li v-for="tag in infoEmptyOgTags" :key="tag"><code>{{ tag }}</code></li>
          </ul>
          These tags are not required, but filling them can improve your card's appearance.
        </div>
        <div v-if="emptyTwitterTags.length" class="alert alert-warning mt-3">
          <strong>Warning:</strong> The following Twitter Card tags are present but empty:
          <ul class="mb-0">
            <li v-for="tag in emptyTwitterTags" :key="tag"><code>{{ tag }}</code></li>
          </ul>
        </div>
        <div v-if="missingTwitterTags.length" class="alert alert-warning mt-3">
          <strong>Warning:</strong> The following required Twitter Card tags are missing:
          <ul class="mb-0">
            <li v-for="tag in missingTwitterTags" :key="tag"><code>{{ tag }}</code></li>
          </ul>
        </div>
        <div v-if="infoEmptyTwitterTags.length" class="alert alert-info mt-3">
          <strong>Info:</strong> The following optional Twitter Card tags are present but empty:
          <ul class="mb-0">
            <li v-for="tag in infoEmptyTwitterTags" :key="tag"><code>{{ tag }}</code></li>
          </ul>
          These tags are not required, but filling them can improve your card's appearance on X (Twitter).
        </div>
        <div v-for="(item, idx) in structuredData" :key="idx" class="mb-3">
          <hr />
          <component :is="getStructuredCardComponent(item)" :data="item" />
        </div>
      </div>
      <div class="col-lg-6 col-12 mt-3 mt-lg-0">
        <div
          class="og-card-preview shadow-sm mt-4"
          v-if="og['og:title'] || og['og:description'] || og['og:image'] || og['og:site_name'] || twitter['twitter:card']"
        >
          <div class="og-card-image" v-if="og['og:image'] || twitter['twitter:image']">
            <img :src="og['og:image'] || twitter['twitter:image']" alt="Preview Image" />
          </div>
          <div class="og-card-content">
            <div class="og-card-site mb-1">
              <img v-if="getFavicon(url)" :src="getFavicon(url)" class="og-card-favicon" alt="favicon" />
              <span>{{ og['og:site_name'] || getDomain(url) }}</span>
            </div>
            <div class="og-card-title">{{ og['og:title'] || twitter['twitter:title'] || 'Preview Title' }}</div>
            <div class="og-card-desc">{{ og['og:description'] || twitter['twitter:description'] || 'Preview description...' }}</div>
            <div class="og-card-url">{{ og['og:url'] || url }}</div>
          </div>
        </div>
        <div v-else-if="Object.keys(og).length === 0 && Object.keys(twitter).length === 0 && !error && !loading"
          class="text-muted mt-3">
          No meta tags to preview yet.
        </div>
        <div v-if="Object.keys(og).length">
          <div class="mb-2 fw-semibold d-flex align-items-center">
            Open Graph Tags
            <button class="btn btn-primary btn-sm ms-auto" @click="copyTags(og)">Copy</button>
          </div>
          <textarea
            class="form-control mb-3"
            rows="7"
            readonly
            :value="Object.entries(og).map(([k,v]) => `<meta property=&quot;${k}&quot; content=&quot;${v}&quot;>`).join('\n')"
          ></textarea>
        </div>
        <div v-if="Object.keys(twitter).length">
          <div class="mb-2 fw-semibold d-flex align-items-center">
            X Card Tags
            <button class="btn btn-primary btn-sm ms-auto" @click="copyTags(twitter)">Copy</button>
          </div>
          <textarea
            class="form-control mb-3"
            rows="7"
            readonly
            :value="Object.entries(twitter).map(([k,v]) => `<meta name=&quot;${k}&quot; content=&quot;${v}&quot;>`).join('\n')"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.og-card-preview {
    border-radius: 12px;
    border: 1px solid #e3e3e3;
    background: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-width: 500px;
    min-width: 280px;
    min-height: 140px;
}

.og-card-image {
    width: 100%;
    height: 180px;
    background: #f3f3f3;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.og-card-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.og-card-content {
    padding: 16px 18px 12px 18px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.og-card-site {
    font-size: 0.95rem;
    color: #888;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 2px;
}

.og-card-favicon {
    width: 18px;
    height: 18px;
    border-radius: 3px;
    margin-right: 3px;
    background: #eee;
    object-fit: contain;
}

.og-card-title {
    font-weight: 600;
    font-size: 1.15rem;
    margin-bottom: 2px;
    color: #222;
}

.og-card-desc {
    font-size: 1rem;
    color: #444;
    margin-bottom: 6px;
    min-height: 22px;
}

.og-card-url {
    font-size: 0.93rem;
    color: #aaa;
    word-break: break-all;
}
</style>
<script setup>
import { ref } from 'vue'
import GizmoCategory from './AppGizmoCategory.vue'
const quickSearchInput = ref('')
</script>

<script>
export default {
  data() {
    return {
      categories: [
        {
          title: 'Text Gizmos',
          items: [
            {
              title: 'Diff Checker',
              description: 'You can use the Diff Checker Gizmo to view the differences between 2 codes.',
              gizmo: 'DiffChecker'
            },
            {
              title: 'String Builder',
              description: 'Automatic StringBuilder escaper code generation.',
              gizmo: 'StringBuilder'
            },
            {
              title: 'Case Converter',
              description: 'You can use the Case Converter Gizmo to convert your texts to diffrent case formats.',
              gizmo: 'CaseConverter'
            },
            {
              title: 'Lorem Ipsum Generator',
              description: 'You can use the Lorem Ipsum Generator Gizmo to generate Lorem Ipsum texts.',
              gizmo: 'LoremIpsumGenerator'
            },
            {
              title: 'Fake E-mail Address Generator',
              description: 'You can use the Fake E-mail Address Generator Gizmo to generate dummy e-mail addresses.',
              gizmo: 'FakeEmailGenerator'
            }
          ]
        },
        {
          title: 'Cryptography Gizmos',
          items: [
            {
              title: 'Guid Generator',
              description: 'You can use the Guid Generator Gizmo to quickly generate a compliant version 4 GUID.',
              gizmo: 'GuidGenerator'
            },
            {
              title: 'Password Generator',
              description: 'You can use the Password Generator Gizmo to quickly generate a secure password.',
              gizmo: 'PasswordGenerator'
            }
          ]
        },
        {
          title: 'Formatter Gizmos',
          items: [
            {
              title: 'JSON Beautifier',
              description: 'Beautify your JSON files.',
              gizmo: 'JSONBeautifier'
            }
          ]
        },
        {
          title: 'Encode - Decode Gizmos',
          items: [
            {
              title: 'Base64',
              description: 'You can use the Base64 Gizmo to encode or decode text, and convert files to Base64 strings.',
              gizmo: 'Base64'
            },
            {
              title: 'URL Encoder / Decoder',
              description: 'You can use the URL Encoder / Decoder Gizmo to encode or decode URL strings.',
              gizmo: 'URL'
            }
          ]
        },
        {
          title: 'Network Gizmos',
          items: [
            {
              title: 'My IP Address',
              description: 'You can use the My IP Address Gizmo to get your public IP address.',
              gizmo: 'MyIPAddress'
            }
          ]
        },
        {
          title: 'Marketing Gizmos',
          items: [
            {
              title: 'UTM Link Generator',
              description: 'You can create campaign links for Google Analytics using the UTM Link Generator Gizmo.',
              gizmo: 'UTMLinkGenerator'
            }
          ]
        }
      ]
    }
  }
}
</script>

<template>
  <h1>
    Gizmo
    <small class="text-muted">/ˈɡɪzmoʊ/</small>
  </h1>
  <div class="col-lg-12 px-0">
    <p>According to the definition on <a href="https://en.wikipedia.org/wiki/Gizmo" target="_blank">Wikipedia</a>,
      “Gizmo” is a gadget, especially one whose real name is unknown or forgotten.</p>
    <p>It's called “<a href="https://eksisozluk.com/zamazingo--61113" target="_blank">zamazingo</a>”, “<a
        href="https://eksisozluk.com/zimbirti--60489" target="_blank">zımbırtı</a>” or “<a
        href="https://eksisozluk.com/dalgametre--93562" target="_blank">dalgametre</a>” in Turkish.</p>
    <p class="fs-4">Devgizmos, an open-source project, brings together tools frequently needed during software
      development. It aims to facilitate the development process by providing a collection of essential tools for
      developers.</p>
    <p class="fs-4">Whether you’re working on web applications, mobile apps, or desktop software, Devgizmos offers a
      range of utilities to enhance your productivity and streamline your workflow. 🚀</p>
  </div>

  <div class="row">
    <div class="mt-3 mb-3">
      <label for="txtQuickSearch" class="form-label fw-bold">Quick Search:</label>
      <input type="text" v-model="quickSearchInput" class="form-control border-primary" id="txtQuickSearch" placeholder="Enter your keyword" autofocus>
    </div>
  </div>

  <div class="row">
    <GizmoCategory v-for="category in categories" :text="category.title" :items="category.items" :filter="quickSearchInput" />
  </div>
</template>
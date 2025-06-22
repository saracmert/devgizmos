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
            },
            {
              title: 'URL Parser',
              description: 'You can use the URL Parser Gizmo to parse and inspect any URL. See its protocol, host, path, query parameters, and more.',
              gizmo: 'URLParser'
            },
            {
              title: 'Slug Generator',
              description: 'You can use the Slug Generator Gizmo to convert your text into a SEO and URL-friendly slug. Turkish, German, French, and Spanish characters are automatically converted.',
              gizmo: 'SlugGenerator'
            },
            {
              title: 'Text Deduplicator',
              description: 'You can use the Text Deduplicator Gizmo to remove duplicate lines or words from your text. Choose deduplication mode, case sensitivity, output format, and more.',
              gizmo: 'TextDeduplicator'
            },
            {
              title: 'Text Sorter & Reverser',
              description: 'You can use the Text Sorter & Reverser Gizmo to sort, reverse, deduplicate, or clean up your text lines with flexible options.',
              gizmo: 'TextSorterReverser'
            },
            {
              title: 'ASCII - Unicode Converter',
              description: 'You can use the ASCII - Unicode Converter Gizmo to convert text to ASCII or Unicode format, and vice versa.',
              gizmo: 'AsciiUnicodeConverter'
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
            },
            {
              title: 'MD5 Hash Generator',
              description: 'You can use the Guid Generator Gizmo to quickly generate a MD5 Hash.',
              gizmo: 'MD5'
            },
            {
              title: 'SHA Hash Generator',
              description: 'You can use the Guid Generator Gizmo to quickly generate a SHA-512, SHA-384, SHA-512/224, SHA-512/256 Hash.',
              gizmo: 'SHA'
            },
            {
              title: 'Checksum Calculator',
              description: 'You can use the Checksum Calculator Gizmo to calculate CRC32, Adler-32, MD5, SHA1, SHA256, SHA512 checksums from text or file.',
              gizmo: 'ChecksumCalculator'
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
            },
            {
              title: 'HTML Beautifier',
              description: 'Beautify your HTML codes.',
              gizmo: 'HTMLBeautifier'
            },
            {
              title: 'HTML Minifier',
              description: 'Minify your HTML codes.',
              gizmo: 'HTMLMinifier'
            },
            {
              title: 'SQL Beautifier',
              description: 'Format your SQL queries for better readability. Supports MySQL, PostgreSQL and SQL Server.',
              gizmo: 'SQLBeautifier'
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
            },
            {
              title: 'JWT Decoder',
              description: 'Paste a JWT (JSON Web Token) to decode its header and payload. Signature is not verified. No data is sent to a server; decoding is done locally in your browser.',
              gizmo: 'JWT'
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
            },
            {
              title: 'CIDR Calculator',
              description: 'You can use the CIDR Calculator Gizmo to analyze your given IP address in CIDR notation and easily calculate details such as network address, broadcast address, first and last usable IP, subnet mask, and total host count.',
              gizmo: 'CIDRCalculator'
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
        },
        {
          title: 'Validator Gizmos',
          items: [
            {
              title: 'Regex Tester',
              description: 'Enter a JavaScript regular expression and test it against a target string. Supports all JS regex flags and named groups.',
              gizmo: 'RegexTester'
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
    <p>
      <strong>Devgizmos</strong> is an open-source project that brings together a wide range of essential tools for developers, all in one place. Whether you’re working on web, mobile, or desktop projects, Devgizmos helps you boost your productivity and streamline your workflow.
    </p>
    <p>
      The term <a href="https://en.wikipedia.org/wiki/Gizmo" target="_blank">“gizmo”</a> refers to a gadget, especially one whose real name is unknown or forgotten. In Turkish, it’s also called <a href="https://eksisozluk.com/zamazingo--61113" target="_blank">zamazingo</a>, <a href="https://eksisozluk.com/zimbirti--60489" target="_blank">zımbırtı</a>, or <a href="https://eksisozluk.com/dalgametre--93562" target="_blank">dalgametre</a>.
    </p>
    <p class="fs-5">
      <strong>Devgizmos is fully offline-first and privacy-focused.</strong>
      <br />All tools run entirely in your browser, so your data never leaves your device. This makes Devgizmos more secure than most alternatives and ideal for sensitive or private work.
    </p>
    <p class="fs-5">
      The project is <strong>constantly updated</strong> and <strong>open source.</strong>
      <br />Anyone can contribute or suggest new features. Thanks to its open nature, Devgizmos evolves with the needs of the developer community.
    </p>
    <p class="fs-5">
      <strong>You will never see ads here.</strong> If you’d like to support the project and help cover domain and Cloudflare costs, <a href="https://www.buymeacoffee.com/mertsarac" target="_blank">you can buy us a coffee</a> ☕.
    </p>
    <p class="fs-6 text-muted">
      <strong>Roadmap:</strong> We are continuously adding new gizmos and improving existing ones based on user feedback. You can follow the progress and contribute on our GitHub page.
    </p>
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
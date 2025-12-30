<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t("einvoice_viewer.title") }}</h4>
            <p class="card-subtitle">{{ $t("einvoice_viewer.description") }}</p>
          </div>
          <div class="card-body">
            <!-- Input Section -->
            <div class="mb-4">
              <div class="row">
                <div class="col-md-6">
                  <!-- File Upload -->
                  <div class="mb-3">
                    <label for="fileInput" class="form-label">{{ $t("einvoice_viewer.upload_file") }}</label>
                    <input 
                      id="fileInput"
                      ref="fileInput"
                      type="file" 
                      class="form-control" 
                      accept=".xml,.ubl" 
                      @change="handleFileUpload"
                    >
                  </div>
                </div>
                <div class="col-md-6">
                  <!-- Render Mode Selection -->
                  <div class="mb-3">
                    <label for="renderMode" class="form-label">{{ $t("einvoice_viewer.render_mode") }}</label>
                    <select id="renderMode" v-model="renderMode" class="form-select">
                      <option value="custom">{{ $t("einvoice_viewer.custom_style") }}</option>
                      <option value="gib">{{ $t("einvoice_viewer.gib_style") }}</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <!-- XML Paste Area -->
              <div class="mb-3">
                <label for="xmlContent" class="form-label">{{ $t("einvoice_viewer.paste_xml") }}</label>
                <textarea 
                  id="xmlContent"
                  v-model="xmlContent" 
                  class="form-control font-monospace" 
                  rows="8" 
                  :placeholder="$t('einvoice_viewer.xml_placeholder')"
                ></textarea>
              </div>

              <!-- Action Buttons -->
              <div class="d-flex gap-2">
                <button 
                  type="button" 
                  class="btn btn-primary" 
                  :disabled="!xmlContent.trim() || isProcessing"
                  @click="processInvoice"
                >
                  <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2"></span>
                  {{ $t("einvoice_viewer.process") }}
                </button>
                <button 
                  type="button" 
                  class="btn btn-outline-secondary" 
                  @click="clearAll"
                >
                  {{ $t("einvoice_viewer.clear") }}
                </button>
              </div>
            </div>

            <!-- Error Display -->
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              <strong>{{ $t("einvoice_viewer.error") }}:</strong> {{ errorMessage }}
            </div>

            <!-- Success Display -->
            <div v-if="htmlOutput && !errorMessage" class="alert alert-success" role="alert">
              {{ $t("einvoice_viewer.success") }}
            </div>

            <!-- HTML Output -->
            <div v-if="htmlOutput" class="mt-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5>{{ $t("einvoice_viewer.preview") }}</h5>
                <div class="btn-group">
                  <button 
                    type="button" 
                    class="btn btn-sm btn-outline-primary"
                    @click="downloadHtml"
                  >
                    {{ $t("einvoice_viewer.download") }}
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-sm btn-outline-secondary"
                    @click="copyHtml"
                  >
                    {{ $t("einvoice_viewer.copy") }}
                  </button>
                </div>
              </div>
              
              <!-- iframe for safe HTML display -->
              <div class="border border-2 rounded" style="height: 600px;">
                <iframe 
                  ref="previewFrame"
                  :srcdoc="htmlOutput" 
                  style="width: 100%; height: 100%; border: none;"
                  title="E-Invoice Preview"
                  charset="UTF-8"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

// Reactive state
const xmlContent = ref('')
const renderMode = ref('custom')
const htmlOutput = ref('')
const errorMessage = ref('')
const isProcessing = ref(false)
const fileInput = ref(null)
const previewFrame = ref(null)

// Default XSLT for GIB rendering (basic fallback)
const defaultXslt = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
                xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
                xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
                xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"
                xmlns:ubltr="urn:oasis:names:specification:ubl:schema:xsd:TurkishCustomizationExtensionComponents"
                xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
                exclude-result-prefixes="cac cbc ext ubltr ds">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>E-Fatura</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .invoice-header { border-bottom: 2px solid #333; margin-bottom: 20px; }
          .invoice-title { font-size: 24px; font-weight: bold; text-align: center; }
          .party-info { display: flex; justify-content: space-between; margin: 20px 0; }
          .party { border: 1px solid #ccc; padding: 15px; width: 45%; }
          .invoice-lines { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .invoice-lines th, .invoice-lines td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          .invoice-lines th { background-color: #f5f5f5; }
          .totals { margin-top: 20px; text-align: right; }
        </style>
      </head>
      <body>
        <xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>
  
  <xsl:template match="*[local-name()='Invoice']">
    <div class="invoice-header">
      <div class="invoice-title">FATURA</div>
      <div style="text-align: center; margin-top: 10px;">
        <strong>Fatura No: </strong><xsl:value-of select="cbc:ID"/>
        <br/>
        <strong>Tarih: </strong><xsl:value-of select="cbc:IssueDate"/>
      </div>
    </div>
    
    <div class="party-info">
      <div class="party">
        <h4>Satıcı Bilgileri</h4>
        <xsl:apply-templates select="cac:AccountingSupplierParty"/>
      </div>
      <div class="party">
        <h4>Alıcı Bilgileri</h4>
        <xsl:apply-templates select="cac:AccountingCustomerParty"/>
      </div>
    </div>
    
    <xsl:apply-templates select="cac:InvoiceLine"/>
    <xsl:apply-templates select="cac:LegalMonetaryTotal"/>
  </xsl:template>
  
  <xsl:template match="cac:AccountingSupplierParty | cac:AccountingCustomerParty">
    <div>
      <strong><xsl:value-of select="cac:Party/cac:PartyName/cbc:Name"/></strong><br/>
      <xsl:value-of select="cac:Party/cac:PostalAddress/cbc:StreetName"/><br/>
      <xsl:value-of select="cac:Party/cac:PostalAddress/cbc:CityName"/> / 
      <xsl:value-of select="cac:Party/cac:PostalAddress/cbc:PostalZone"/><br/>
      VKN: <xsl:value-of select="cac:Party/cac:PartyIdentification/cbc:ID[@schemeID='VKN']"/>
    </div>
  </xsl:template>
  
  <xsl:template match="cac:InvoiceLine">
    <xsl:if test="position() = 1">
      <table class="invoice-lines">
        <tr>
          <th>Sıra</th>
          <th>Açıklama</th>
          <th>Miktar</th>
          <th>Birim</th>
          <th>Birim Fiyat</th>
          <th>Tutarı</th>
        </tr>
        <xsl:for-each select="../cac:InvoiceLine">
          <tr>
            <td><xsl:value-of select="cbc:ID"/></td>
            <td><xsl:value-of select="cac:Item/cbc:Name"/></td>
            <td><xsl:value-of select="cbc:InvoicedQuantity"/></td>
            <td><xsl:value-of select="cbc:InvoicedQuantity/@unitCode"/></td>
            <td><xsl:value-of select="cac:Price/cbc:PriceAmount"/></td>
            <td><xsl:value-of select="cbc:LineExtensionAmount"/></td>
          </tr>
        </xsl:for-each>
      </table>
    </xsl:if>
  </xsl:template>
  
  <xsl:template match="cac:LegalMonetaryTotal">
    <div class="totals">
      <table style="margin-left: auto;">
        <tr><td><strong>Mal Hizmet Toplam Tutarı:</strong></td><td><xsl:value-of select="cbc:LineExtensionAmount"/> <xsl:value-of select="cbc:LineExtensionAmount/@currencyID"/></td></tr>
        <tr><td><strong>KDV Tutarı:</strong></td><td><xsl:value-of select="cbc:TaxInclusiveAmount - cbc:TaxExclusiveAmount"/> <xsl:value-of select="cbc:TaxInclusiveAmount/@currencyID"/></td></tr>
        <tr><td><strong>Vergiler Dahil Toplam Tutarı:</strong></td><td><xsl:value-of select="cbc:TaxInclusiveAmount"/> <xsl:value-of select="cbc:TaxInclusiveAmount/@currencyID"/></td></tr>
        <tr><td><strong>Ödenecek Tutar:</strong></td><td><strong><xsl:value-of select="cbc:PayableAmount"/> <xsl:value-of select="cbc:PayableAmount/@currencyID"/></strong></td></tr>
      </table>
    </div>
  </xsl:template>
</xsl:stylesheet>`

// File upload handler
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      xmlContent.value = e.target.result
    }
    // Explicitly read as UTF-8 text
    reader.readAsText(file, 'UTF-8')
  }
}

// Clear all content
const clearAll = () => {
  xmlContent.value = ''
  htmlOutput.value = ''
  errorMessage.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Extract embedded XSLT from invoice XML
const extractEmbeddedXslt = (xmlDoc) => {
  const embeddedElements = xmlDoc.getElementsByTagNameNS('urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2', 'EmbeddedDocumentBinaryObject')
  
  for (let i = 0; i < embeddedElements.length; i++) {
    const element = embeddedElements[i]
    const mimeCode = element.getAttribute('mimeCode')
    const filename = element.getAttribute('filename') || ''
    
    if ((mimeCode === 'application/xml' || 
         mimeCode === 'application/CSTAdata+xml' || 
         mimeCode === 'application/soap+xml') && 
        filename.toLowerCase().includes('xslt')) {
      try {
        const base64Content = element.textContent || element.innerHTML
        // Decode base64 and properly handle UTF-8 encoding
        const binaryString = atob(base64Content.trim())
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        const decodedContent = new TextDecoder('utf-8').decode(bytes)
        return decodedContent
      } catch (e) {
        console.warn('Failed to decode embedded XSLT:', e)
      }
    }
  }
  
  return null
}

// Clean XML content (remove BOM and everything before first <)
const cleanXmlContent = (xmlString) => {
  const firstTagIndex = xmlString.indexOf('<')
  return firstTagIndex > 0 ? xmlString.substring(firstTagIndex) : xmlString
}

// Transform XML using XSLT
const transformXmlToHtml = async (xmlString, xsltString) => {
  try {
    // Clean both XML and XSLT
    const cleanXml = cleanXmlContent(xmlString)
    const cleanXslt = cleanXmlContent(xsltString)
    
    // Parse XML and XSLT
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(cleanXml, 'text/xml')
    const xsltDoc = parser.parseFromString(cleanXslt, 'text/xml')
    
    // Check for parsing errors
    const xmlError = xmlDoc.getElementsByTagName('parsererror')[0]
    const xsltError = xsltDoc.getElementsByTagName('parsererror')[0]
    
    if (xmlError) {
      throw new Error('XML parsing error: ' + xmlError.textContent)
    }
    if (xsltError) {
      throw new Error('XSLT parsing error: ' + xsltError.textContent)
    }
    
    // Create XSLT processor
    const xsltProcessor = new XSLTProcessor()
    xsltProcessor.importStylesheet(xsltDoc)
    
    // Transform
    const resultDoc = xsltProcessor.transformToFragment(xmlDoc, document)
    
    // Convert to HTML string
    const serializer = new XMLSerializer()
    let htmlResult = serializer.serializeToString(resultDoc)
    
    // Fix charset and ensure UTF-8 encoding
    htmlResult = htmlResult.replace(/charset=utf-16/gi, 'charset=UTF-8')
    htmlResult = htmlResult.replace(/charset="utf-16"/gi, 'charset="UTF-8"')
    
    // Ensure HTML has proper DOCTYPE and charset meta tag
    if (!htmlResult.includes('<!DOCTYPE')) {
      htmlResult = '<!DOCTYPE html>' + htmlResult
    }
    
    // Add charset meta if not present
    if (!htmlResult.includes('charset=')) {
      htmlResult = htmlResult.replace(
        /<head[^>]*>/i, 
        '<head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'
      )
    }
    
    return htmlResult
  } catch (error) {
    console.error('XSLT transformation error:', error)
    throw error
  }
}

// Process invoice XML
const processInvoice = async () => {
  if (!xmlContent.value.trim()) {
    errorMessage.value = 'Lütfen XML içeriği girin veya dosya yükleyin.'
    return
  }
  
  isProcessing.value = true
  errorMessage.value = ''
  htmlOutput.value = ''
  
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlContent.value, 'text/xml')
    
    // Check for XML parsing errors
    const parserError = xmlDoc.getElementsByTagName('parsererror')[0]
    if (parserError) {
      throw new Error('Geçersiz XML formatı: ' + parserError.textContent)
    }
    
    let xsltContent = ''
    
    if (renderMode.value === 'custom') {
      // Try to extract embedded XSLT
      const embeddedXslt = extractEmbeddedXslt(xmlDoc)
      if (embeddedXslt) {
        xsltContent = embeddedXslt
      } else {
        // Fallback to default XSLT
        xsltContent = defaultXslt
      }
    } else {
      // Use default GIB style
      xsltContent = defaultXslt
    }
    
    // Transform XML to HTML
    const htmlResult = await transformXmlToHtml(xmlContent.value, xsltContent)
    
    if (!htmlResult || htmlResult.trim() === '') {
      throw new Error('XSLT dönüşümü başarısız oldu.')
    }
    
    htmlOutput.value = htmlResult
    
    // Scroll to result
    await nextTick()
    if (previewFrame.value) {
      previewFrame.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    
  } catch (error) {
    console.error('Invoice processing error:', error)
    errorMessage.value = error.message || 'Fatura işlenirken bir hata oluştu.'
    
    // If custom mode failed, try GIB mode as fallback
    if (renderMode.value === 'custom') {
      try {
        const htmlResult = await transformXmlToHtml(xmlContent.value, defaultXslt)
        htmlOutput.value = htmlResult
        errorMessage.value = ''
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError)
      }
    }
  } finally {
    isProcessing.value = false
  }
}

// Download HTML
const downloadHtml = () => {
  if (!htmlOutput.value) return
  
  const blob = new Blob([htmlOutput.value], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'einvoice.html'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Copy HTML to clipboard
const copyHtml = async () => {
  if (!htmlOutput.value) return
  
  try {
    await navigator.clipboard.writeText(htmlOutput.value)
    // Could add a toast notification here
  } catch (err) {
    console.error('Failed to copy HTML:', err)
    // Fallback: select and copy
    const textArea = document.createElement('textarea')
    textArea.value = htmlOutput.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}
</script>

<style scoped>
.font-monospace {
  font-family: 'SF Mono', Monaco, 'Inconsolata', 'Fira Code', 'Fira Mono', 'Droid Sans Mono', 'Source Code Pro', monospace;
}

.card-subtitle {
  color: #6c757d;
  font-size: 0.9rem;
}

iframe {
  background: white;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>
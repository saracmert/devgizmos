<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ $t("qr_code_generator.title") }}</h4>
            <p class="card-subtitle">{{ $t("qr_code_generator.description") }}</p>
          </div>
          <div class="card-body">
            <div class="row">
              <!-- Input Section -->
              <div class="col-lg-6">
                <div class="mb-4">
                  <label for="qrType" class="form-label">{{ $t("qr_code_generator.content_type") }}</label>
                  <select id="qrType" v-model="qrType" class="form-select" @change="generateQR">
                    <option value="text">{{ $t("qr_code_generator.text") }}</option>
                    <option value="url">{{ $t("qr_code_generator.url") }}</option>
                    <option value="email">{{ $t("qr_code_generator.email") }}</option>
                    <option value="phone">{{ $t("qr_code_generator.phone") }}</option>
                    <option value="sms">{{ $t("qr_code_generator.sms") }}</option>
                    <option value="wifi">{{ $t("qr_code_generator.wifi") }}</option>
                    <option value="vcard">{{ $t("qr_code_generator.vcard") }}</option>
                  </select>
                </div>

                <!-- Text Input -->
                <div v-if="qrType === 'text'" class="mb-4">
                  <label for="textInput" class="form-label">{{ $t("qr_code_generator.text_content") }}</label>
                  <textarea 
                    id="textInput"
                    v-model="textContent" 
                    class="form-control" 
                    rows="4" 
                    :placeholder="$t('qr_code_generator.text_placeholder')"
                    @input="generateQR"
                  ></textarea>
                </div>

                <!-- URL Input -->
                <div v-if="qrType === 'url'" class="mb-4">
                  <label for="urlInput" class="form-label">{{ $t("qr_code_generator.url_content") }}</label>
                  <input 
                    id="urlInput"
                    v-model="urlContent" 
                    type="url" 
                    class="form-control" 
                    :placeholder="$t('qr_code_generator.url_placeholder')"
                    @input="generateQR"
                  >
                </div>

                <!-- Email Input -->
                <div v-if="qrType === 'email'" class="mb-4">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="emailInput" class="form-label">{{ $t("qr_code_generator.email_address") }}</label>
                      <input 
                        id="emailInput"
                        v-model="emailAddress" 
                        type="email" 
                        class="form-control" 
                        :placeholder="$t('qr_code_generator.email_placeholder')"
                        @input="generateQR"
                      >
                    </div>
                    <div class="col-md-6">
                      <label for="emailSubject" class="form-label">{{ $t("qr_code_generator.email_subject") }}</label>
                      <input 
                        id="emailSubject"
                        v-model="emailSubject" 
                        type="text" 
                        class="form-control" 
                        :placeholder="$t('qr_code_generator.email_subject_placeholder')"
                        @input="generateQR"
                      >
                    </div>
                  </div>
                </div>

                <!-- Phone Input -->
                <div v-if="qrType === 'phone'" class="mb-4">
                  <label for="phoneInput" class="form-label">{{ $t("qr_code_generator.phone_number") }}</label>
                  <input 
                    id="phoneInput"
                    v-model="phoneNumber" 
                    type="tel" 
                    class="form-control" 
                    :placeholder="$t('qr_code_generator.phone_placeholder')"
                    @input="generateQR"
                  >
                </div>

                <!-- SMS Input -->
                <div v-if="qrType === 'sms'" class="mb-4">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="smsNumber" class="form-label">{{ $t("qr_code_generator.phone_number") }}</label>
                      <input 
                        id="smsNumber"
                        v-model="smsNumber" 
                        type="tel" 
                        class="form-control" 
                        :placeholder="$t('qr_code_generator.phone_placeholder')"
                        @input="generateQR"
                      >
                    </div>
                    <div class="col-md-6">
                      <label for="smsMessage" class="form-label">{{ $t("qr_code_generator.sms_message") }}</label>
                      <input 
                        id="smsMessage"
                        v-model="smsMessage" 
                        type="text" 
                        class="form-control" 
                        :placeholder="$t('qr_code_generator.sms_placeholder')"
                        @input="generateQR"
                      >
                    </div>
                  </div>
                </div>

                <!-- WiFi Input -->
                <div v-if="qrType === 'wifi'" class="mb-4">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="wifiSSID" class="form-label">{{ $t("qr_code_generator.wifi_ssid") }}</label>
                      <input 
                        id="wifiSSID"
                        v-model="wifiSSID" 
                        type="text" 
                        class="form-control" 
                        :placeholder="$t('qr_code_generator.wifi_ssid_placeholder')"
                        @input="generateQR"
                      >
                    </div>
                    <div class="col-md-6">
                      <label for="wifiPassword" class="form-label">{{ $t("qr_code_generator.wifi_password") }}</label>
                      <input 
                        id="wifiPassword"
                        v-model="wifiPassword" 
                        type="text" 
                        class="form-control" 
                        :placeholder="$t('qr_code_generator.wifi_password_placeholder')"
                        @input="generateQR"
                      >
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-6">
                      <label for="wifiSecurity" class="form-label">{{ $t("qr_code_generator.wifi_security") }}</label>
                      <select id="wifiSecurity" v-model="wifiSecurity" class="form-select" @change="generateQR">
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">{{ $t("qr_code_generator.wifi_no_password") }}</option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <div class="form-check mt-4">
                        <input 
                          id="wifiHidden" 
                          v-model="wifiHidden" 
                          class="form-check-input" 
                          type="checkbox"
                          @change="generateQR"
                        >
                        <label class="form-check-label" for="wifiHidden">
                          {{ $t("qr_code_generator.wifi_hidden") }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- vCard Input -->
                <div v-if="qrType === 'vcard'" class="mb-4">
                  <div class="row">
                    <div class="col-md-6">
                      <label for="vcardFirstName" class="form-label">{{ $t("qr_code_generator.vcard_first_name") }}</label>
                      <input 
                        id="vcardFirstName"
                        v-model="vcardFirstName" 
                        type="text" 
                        class="form-control" 
                        @input="generateQR"
                      >
                    </div>
                    <div class="col-md-6">
                      <label for="vcardLastName" class="form-label">{{ $t("qr_code_generator.vcard_last_name") }}</label>
                      <input 
                        id="vcardLastName"
                        v-model="vcardLastName" 
                        type="text" 
                        class="form-control" 
                        @input="generateQR"
                      >
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-6">
                      <label for="vcardPhone" class="form-label">{{ $t("qr_code_generator.vcard_phone") }}</label>
                      <input 
                        id="vcardPhone"
                        v-model="vcardPhone" 
                        type="tel" 
                        class="form-control" 
                        @input="generateQR"
                      >
                    </div>
                    <div class="col-md-6">
                      <label for="vcardEmail" class="form-label">{{ $t("qr_code_generator.vcard_email") }}</label>
                      <input 
                        id="vcardEmail"
                        v-model="vcardEmail" 
                        type="email" 
                        class="form-control" 
                        @input="generateQR"
                      >
                    </div>
                  </div>
                  <div class="mt-2">
                    <label for="vcardOrganization" class="form-label">{{ $t("qr_code_generator.vcard_organization") }}</label>
                    <input 
                      id="vcardOrganization"
                      v-model="vcardOrganization" 
                      type="text" 
                      class="form-control" 
                      @input="generateQR"
                    >
                  </div>
                  <div class="mt-2">
                    <label for="vcardPhoto" class="form-label">{{ $t("qr_code_generator.vcard_photo") }}</label>
                    <input 
                      id="vcardPhoto"
                      type="file" 
                      class="form-control" 
                      accept="image/jpeg,image/jpg,image/png"
                      @change="handlePhotoUpload"
                    >
                    <div class="form-text">{{ $t("qr_code_generator.vcard_photo_help") }}</div>
                    <div class="alert alert-warning mt-2" role="alert">
                      <small>
                        <strong>{{ $t("qr_code_generator.photo_limitation") }}:</strong>
                        {{ $t("qr_code_generator.photo_limitation_desc") }}
                      </small>
                    </div>
                    <div class="alert alert-info mt-2" role="alert">
                      <small>
                        <strong>💡 {{ $t("qr_code_generator.photo_tips") }}:</strong><br>
                        • {{ $t("qr_code_generator.photo_tip_1") }}<br>
                        • {{ $t("qr_code_generator.photo_tip_2") }}<br>
                        • {{ $t("qr_code_generator.photo_tip_3") }}
                      </small>
                    </div>
                    <div v-if="vcardPhotoPreview" class="mt-2">
                      <img :src="vcardPhotoPreview" alt="Photo Preview" class="img-thumbnail" style="max-width: 100px; max-height: 100px;">
                      <button type="button" class="btn btn-sm btn-outline-danger ms-2" @click="removePhoto">
                        {{ $t("qr_code_generator.remove_photo") }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- QR Code Settings -->
                <div class="card mt-4">
                  <div class="card-header">
                    <h6 class="mb-0">{{ $t("qr_code_generator.settings") }}</h6>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-4">
                        <label for="qrSize" class="form-label">{{ $t("qr_code_generator.size") }}</label>
                        <select id="qrSize" v-model="qrSize" class="form-select" @change="generateQR">
                          <option value="128">128x128</option>
                          <option value="256">256x256</option>
                          <option value="512">512x512</option>
                          <option value="1024">1024x1024</option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label for="qrForeground" class="form-label">{{ $t("qr_code_generator.foreground_color") }}</label>
                        <input 
                          id="qrForeground"
                          v-model="qrForeground" 
                          type="color" 
                          class="form-control form-control-color"
                          @change="generateQR"
                        >
                      </div>
                      <div class="col-md-4">
                        <label for="qrBackground" class="form-label">{{ $t("qr_code_generator.background_color") }}</label>
                        <input 
                          id="qrBackground"
                          v-model="qrBackground" 
                          type="color" 
                          class="form-control form-control-color"
                          @change="generateQR"
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- QR Code Display and Download -->
              <div class="col-lg-6">
                <div class="card">
                  <div class="card-header">
                    <h6 class="mb-0">{{ $t("qr_code_generator.preview") }}</h6>
                  </div>
                  <div class="card-body text-center">
                    <div v-if="qrCodeSVG" class="mb-3">
                      <div v-html="qrCodeSVG"></div>
                    </div>
                    <div v-else class="mb-3">
                      <div class="d-flex align-items-center justify-content-center" style="height: 256px;">
                        <span class="text-muted">{{ $t("qr_code_generator.enter_content") }}</span>
                      </div>
                    </div>

                    <div v-if="qrCodeSVG" class="d-grid gap-2">
                      <button 
                        class="btn btn-primary" 
                        @click="downloadSVG"
                      >
                        <i class="bi bi-download me-2"></i>
                        {{ $t("qr_code_generator.download_svg") }}
                      </button>
                      <button 
                        class="btn btn-outline-primary" 
                        @click="downloadPNG"
                      >
                        <i class="bi bi-download me-2"></i>
                        {{ $t("qr_code_generator.download_png") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'

// Reactive state
const qrType = ref('text')
const qrSize = ref('256')
const qrForeground = ref('#000000')
const qrBackground = ref('#ffffff')
const qrCodeSVG = ref('')

// Content variables
const textContent = ref('')
const urlContent = ref('')
const emailAddress = ref('')
const emailSubject = ref('')
const phoneNumber = ref('')
const smsNumber = ref('')
const smsMessage = ref('')
const wifiSSID = ref('')
const wifiPassword = ref('')
const wifiSecurity = ref('WPA')
const wifiHidden = ref(false)
const vcardFirstName = ref('')
const vcardLastName = ref('')
const vcardPhone = ref('')
const vcardEmail = ref('')
const vcardOrganization = ref('')
const vcardPhotoBase64 = ref('')
const vcardPhotoPreview = ref('')

// Generate QR content based on type
const generateQRContent = () => {
  switch (qrType.value) {
    case 'text':
      return textContent.value
    
    case 'url':
      return urlContent.value
    
    case 'email':
      const subject = emailSubject.value ? `?subject=${encodeURIComponent(emailSubject.value)}` : ''
      return `mailto:${emailAddress.value}${subject}`
    
    case 'phone':
      return `tel:${phoneNumber.value}`
    
    case 'sms':
      const message = smsMessage.value ? `?body=${encodeURIComponent(smsMessage.value)}` : ''
      return `sms:${smsNumber.value}${message}`
    
    case 'wifi':
      const security = wifiSecurity.value === 'nopass' ? 'nopass' : wifiSecurity.value
      const password = wifiSecurity.value === 'nopass' ? '' : wifiPassword.value
      const hidden = wifiHidden.value ? 'true' : 'false'
      return `WIFI:T:${security};S:${wifiSSID.value};P:${password};H:${hidden};;`
    
    case 'vcard':
      const vcardLines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${vcardFirstName.value} ${vcardLastName.value}`,
        `N:${vcardLastName.value};${vcardFirstName.value};;;`
      ]
      
      if (vcardPhone.value) vcardLines.push(`TEL:${vcardPhone.value}`)
      if (vcardEmail.value) vcardLines.push(`EMAIL:${vcardEmail.value}`)
      if (vcardOrganization.value) vcardLines.push(`ORG:${vcardOrganization.value}`)
      if (vcardPhotoBase64.value) vcardLines.push(`PHOTO;ENCODING=BASE64;TYPE=JPEG:${vcardPhotoBase64.value}`)
      
      vcardLines.push('END:VCARD')
      return vcardLines.join('\n')
    
    default:
      return ''
  }
}

// Generate QR Code
const generateQR = async () => {
  const content = generateQRContent()
  if (!content.trim()) {
    qrCodeSVG.value = ''
    return
  }

  try {
    // Use different error correction levels based on content type
    const errorLevel = qrType.value === 'vcard' && vcardPhotoBase64.value ? 'L' : 'M'
    
    const options = {
      type: 'svg',
      width: parseInt(qrSize.value),
      color: {
        dark: qrForeground.value,
        light: qrBackground.value
      },
      errorCorrectionLevel: errorLevel
    }

    qrCodeSVG.value = await QRCode.toString(content, options)
  } catch (error) {
    console.error('QR Code generation error:', error)
    
    // If it's a vCard with photo, suggest removing the photo
    if (qrType.value === 'vcard' && vcardPhotoBase64.value) {
      alert('QR code data is too large. Try removing the photo or using a smaller image.')
    } else {
      alert('QR code data is too large. Please reduce the content size.')
    }
    
    qrCodeSVG.value = ''
  }
}

// Download SVG
const downloadSVG = () => {
  if (!qrCodeSVG.value) return

  const blob = new Blob([qrCodeSVG.value], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `qrcode-${qrType.value}.svg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Download PNG
const downloadPNG = async () => {
  if (!qrCodeSVG.value) return

  try {
    const content = generateQRContent()
    const options = {
      type: 'image/png',
      width: parseInt(qrSize.value),
      color: {
        dark: qrForeground.value,
        light: qrBackground.value
      },
      errorCorrectionLevel: 'M'
    }

    const dataURL = await QRCode.toDataURL(content, options)
    const link = document.createElement('a')
    link.href = dataURL
    link.download = `qrcode-${qrType.value}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('PNG download error:', error)
  }
}

// Handle photo upload for vCard
const handlePhotoUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Check file size (max 5KB for QR code efficiency)
  if (file.size > 5000) {
    alert('Photo size should be less than 5KB for optimal QR code generation.')
    event.target.value = ''
    return
  }

  // Check file type
  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    alert('Please select a JPEG or PNG image.')
    event.target.value = ''
    return
  }

  try {
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      vcardPhotoPreview.value = e.target.result
    }
    reader.readAsDataURL(file)

    // Convert to base64 for vCard (JPEG format preferred)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Resize to max 32x32 to keep QR code very small
      const maxSize = 32
      let { width, height } = img
      
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = (height * maxSize) / width
          width = maxSize
        } else {
          width = (width * maxSize) / height
          height = maxSize
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      // Use nearest neighbor for better small image quality
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(img, 0, 0, width, height)
      
      // Convert to base64 (JPEG format with very low quality for size optimization)
      const base64 = canvas.toDataURL('image/jpeg', 0.1).split(',')[1]
      
      // Check if the resulting base64 is small enough for QR code
      if (base64.length > 400) {
        alert('Photo is still too large after compression. QR codes have very limited data capacity. Consider using a vCard without photo.')
        event.target.value = ''
        return
      }
      
      vcardPhotoBase64.value = base64
      generateQR()
    }
    
    img.src = URL.createObjectURL(file)
  } catch (error) {
    console.error('Photo upload error:', error)
    alert('Error processing photo. Please try a different image.')
    event.target.value = ''
  }
}

// Remove photo
const removePhoto = () => {
  vcardPhotoBase64.value = ''
  vcardPhotoPreview.value = ''
  const fileInput = document.getElementById('vcardPhoto')
  if (fileInput) fileInput.value = ''
  generateQR()
}

// Initialize with default content
onMounted(() => {
  textContent.value = 'Hello, World!'
  generateQR()
})
</script>

<style scoped>
.card-subtitle {
  color: #6c757d;
  font-size: 0.9rem;
}

.form-control-color {
  max-width: 100px;
}

svg {
  max-width: 100%;
  height: auto;
}
</style>
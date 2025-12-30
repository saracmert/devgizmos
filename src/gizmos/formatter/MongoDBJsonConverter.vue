<script setup>
import loader from "@monaco-editor/loader"
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'
import { onMounted } from 'vue'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

function convertMongoDBJson(mongoJson) {
    try {
        // Remove comments and clean up the JSON string
        let cleanJson = mongoJson.trim()
        
        // Convert MongoDB specific types to standard JSON
        
        // 1. ISODate("...") -> "..."
        cleanJson = cleanJson.replace(/ISODate\s*\(\s*"([^"]+)"\s*\)/g, '"$1"')
        
        // 2. ObjectId("...") -> "..."
        cleanJson = cleanJson.replace(/ObjectId\s*\(\s*"([^"]+)"\s*\)/g, '"$1"')
        
        // 3. NumberInt(123) -> 123
        cleanJson = cleanJson.replace(/NumberInt\s*\(\s*(\d+)\s*\)/g, '$1')
        
        // 4. NumberLong(123) -> 123
        cleanJson = cleanJson.replace(/NumberLong\s*\(\s*(\d+)\s*\)/g, '$1')
        
        // 5. NumberDecimal("123.45") -> 123.45
        cleanJson = cleanJson.replace(/NumberDecimal\s*\(\s*"([^"]+)"\s*\)/g, '$1')
        
        // 6. BinData(type, "base64data") -> "base64data" 
        cleanJson = cleanJson.replace(/BinData\s*\(\s*\d+\s*,\s*"([^"]+)"\s*\)/g, '"$1"')
        
        // 7. Timestamp(t, i) -> t
        cleanJson = cleanJson.replace(/Timestamp\s*\(\s*(\d+)\s*,\s*\d+\s*\)/g, '$1')
        
        // 8. RegExp("pattern", "flags") -> "/pattern/flags"
        cleanJson = cleanJson.replace(/RegExp\s*\(\s*"([^"]+)"\s*,\s*"([^"]*)"\s*\)/g, '"/$1/$2"')
        
        // 9. RegExp("pattern") -> "/pattern/"
        cleanJson = cleanJson.replace(/RegExp\s*\(\s*"([^"]+)"\s*\)/g, '"/$1/"')
        
        // 10. DBRef("collection", ObjectId("...")) -> {"$ref": "collection", "$id": "..."}
        cleanJson = cleanJson.replace(/DBRef\s*\(\s*"([^"]+)"\s*,\s*ObjectId\s*\(\s*"([^"]+)"\s*\)\s*\)/g, '{"$$ref": "$1", "$$id": "$2"}')
        
        // 11. MinKey() -> {"$minKey": 1}
        cleanJson = cleanJson.replace(/MinKey\s*\(\s*\)/g, '{"$$minKey": 1}')
        
        // 12. MaxKey() -> {"$maxKey": 1}
        cleanJson = cleanJson.replace(/MaxKey\s*\(\s*\)/g, '{"$$maxKey": 1}')
        
        // 13. Code("function() {...}") -> "function() {...}"
        cleanJson = cleanJson.replace(/Code\s*\(\s*"([^"]+)"\s*\)/g, '"$1"')
        
        // 14. undefined -> null
        cleanJson = cleanJson.replace(/\bundefined\b/g, 'null')
        
        // 15. Remove trailing commas before closing brackets/braces
        cleanJson = cleanJson.replace(/,(\s*[\]}])/g, '$1')
        
        // Validate if the result is valid JSON
        JSON.parse(cleanJson)
        
        return cleanJson
    } catch (e) {
        throw new Error(`Conversion failed: ${e.message}`)
    }
}

function formatJson(jsonString) {
    try {
        const parsed = JSON.parse(jsonString)
        return JSON.stringify(parsed, null, 2)
    } catch (e) {
        return jsonString // Return as-is if parsing fails
    }
}

onMounted(() => {
    loader.init().then((monaco) => {
        var editorConfig = {
            language: 'json',
            theme: 'vs-dark',
            wordWrap: 'on'
        }

        var editor1 = monaco.editor.create(document.getElementById("editor1"), editorConfig)
        var editor2 = monaco.editor.create(document.getElementById("editor2"), { ...editorConfig, readOnly: true })

        editor1.onDidChangeModelContent(function () {
            const input = editor1.getValue().trim()
            if (!input) {
                editor2.setValue('')
                return
            }
            
            try {
                const convertedJson = convertMongoDBJson(input)
                const formattedJson = formatJson(convertedJson)
                editor2.setValue(formattedJson)
            } catch (error) {
                editor2.setValue(t('mongodbJsonConverter.conversionError') + ': ' + error.message)
            }
        })
    })
})
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>{{ getGizmoTitle('MongoDBJsonConverter') }}</h1>
                <span>{{ getGizmoDescription('MongoDBJsonConverter') }}</span>
                
                <!-- Info Alert -->
                <div class="alert alert-info mt-3" role="alert">
                    <h6 class="alert-heading">{{ $t('mongodbJsonConverter.supportedTypes') }}:</h6>
                    <ul class="mb-0 small">
                        <li><code>ISODate("2023-01-01T00:00:00.000Z")</code> → <code>"2023-01-01T00:00:00.000Z"</code></li>
                        <li><code>ObjectId("507f1f77bcf86cd799439011")</code> → <code>"507f1f77bcf86cd799439011"</code></li>
                        <li><code>NumberInt(123)</code> → <code>123</code></li>
                        <li><code>NumberLong(456)</code> → <code>456</code></li>
                        <li><code>NumberDecimal("123.45")</code> → <code>123.45</code></li>
                        <li><code>BinData(0, "base64...")</code> → <code>"base64..."</code></li>
                        <li><code>RegExp("pattern", "flags")</code> → <code>"/pattern/flags"</code></li>
                        <li><code>undefined</code> → <code>null</code></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row justify-content-center h-100">
            <div class="col-6">
                <h5 class="mb-2">{{ $t('mongodbJsonConverter.mongoInput') }}</h5>
                <div id="editor1" class="editor w-100"></div>
            </div>
            <div class="col-6">
                <h5 class="mb-2">{{ $t('mongodbJsonConverter.jsonOutput') }}</h5>
                <div id="editor2" class="editor w-100"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.editor {
    height: 500px;
}

.alert ul {
    list-style-type: disc;
    padding-left: 1.5rem;
}

.alert code {
    background-color: rgba(0,0,0,0.1);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
}
</style>
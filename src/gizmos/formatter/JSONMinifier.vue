<script setup>
import loader from "@monaco-editor/loader"
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'
import { onMounted } from 'vue'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

function validateJSON(json) {
    try {
        JSON.parse(json);
    } catch (e) {
        return false;
    }
    return true;
}

onMounted(() => {
    loader.init().then((monaco) => {
        var editorConfig = {
            language: 'json',
            theme: 'vs-dark',
            wordWrap: 'on'
        }

        var editor1 = monaco.editor.create(document.getElementById("editor1"), editorConfig);
        var editor2 = monaco.editor.create(document.getElementById("editor2"), { ...editorConfig, readOnly: true });

        editor1.onDidChangeModelContent(function () {
            if (validateJSON(editor1.getValue())) {
                // Minify JSON by removing all extra spaces and newlines
                var minifiedJson = JSON.stringify(JSON.parse(editor1.getValue()));
                editor2.setValue(minifiedJson);
            } else {
                editor2.setValue(t('jsonMinifier.invalidInput'));
            }
        });
    });
});
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>{{ getGizmoTitle('JSONMinifier') }}</h1>
                <span>{{ getGizmoDescription('JSONMinifier') }}</span>
            </div>
        </div>
        <div class="row justify-content-center h-100">
            <div class="col-6">
                <div id="editor1" class="editor w-100"></div>
            </div>
            <div class="col-6">
                <div id="editor2" class="editor w-100"></div>
            </div>
        </div>
    </div>
</template>
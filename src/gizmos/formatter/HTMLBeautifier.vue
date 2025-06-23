<script setup>
import { useI18n } from 'vue-i18n'
import { useGizmoI18n } from '../../composables/gizmo-i18n'
import loader from "@monaco-editor/loader"
import { onMounted } from 'vue'

const { t } = useI18n()
const { getGizmoTitle, getGizmoDescription } = useGizmoI18n()

onMounted(async () => {
    loader.init().then((monaco) => {
        var editorConfig = {
            language: 'html',
            theme: 'vs-dark',
            wordWrap: 'on'
        }

        var editor1 = monaco.editor.create(document.getElementById("editor1"), editorConfig);
        var editor2 = monaco.editor.create(document.getElementById("editor2"), { ...editorConfig, readOnly: true });

        editor1.onDidChangeModelContent(function () {
            editor2.updateOptions({ readOnly: false });
            editor2.setValue(editor1.getValue());
            setTimeout(() => {
                editor2.getAction('editor.action.formatDocument').run().then(() => {
                    editor2.updateOptions({ readOnly: true });
                });
            }, 50);
        });
    });
});
</script>

<template>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col mb-3">
                <h1>{{ getGizmoTitle('HTMLBeautifier') }}</h1>
                <span>{{ getGizmoDescription('HTMLBeautifier') }}</span>
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